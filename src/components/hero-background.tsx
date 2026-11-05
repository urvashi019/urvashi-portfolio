"use client";

import { useEffect, useRef, useState } from "react";

const vertexShader = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const fragmentShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_light;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

float bayer4(vec2 p) {
  float x = mod(p.x, 4.0);
  float y = mod(p.y, 4.0);
  if (y < 1.0) {
    if (x < 1.0) return 0.0;
    if (x < 2.0) return 8.0;
    if (x < 3.0) return 2.0;
    return 10.0;
  }
  if (y < 2.0) {
    if (x < 1.0) return 12.0;
    if (x < 2.0) return 4.0;
    if (x < 3.0) return 14.0;
    return 6.0;
  }
  if (y < 3.0) {
    if (x < 1.0) return 3.0;
    if (x < 2.0) return 11.0;
    if (x < 3.0) return 1.0;
    return 9.0;
  }
  if (x < 1.0) return 15.0;
  if (x < 2.0) return 7.0;
  if (x < 3.0) return 13.0;
  return 5.0;
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / 2.0);
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 warp = vec2(
    fbm(p * 1.35 + vec2(u_time * 0.42, 1.7)),
    fbm(p * 1.35 + vec2(4.3, -u_time * 0.34))
  );
  float broadClouds = fbm(p * 1.45 + warp * 1.7 + vec2(u_time * 0.14, 0.0));
  float fluid = fbm(p * 1.95 + warp * 2.35 + vec2(-u_time * 0.2, u_time * 0.08));
  float veins = 0.5 + 0.5 * sin(fluid * 6.0 + warp.x * 2.5 + p.y * 1.4);
  float signal = clamp(fluid * 0.56 + broadClouds * 0.36 + veins * 0.08, 0.0, 1.0);

  vec3 deep = mix(vec3(0.035, 0.003, 0.007), vec3(0.76, 0.9, 0.96), u_light);
  vec3 mid = mix(vec3(0.34, 0.006, 0.02), vec3(0.25, 0.57, 0.73), u_light);
  vec3 bright = mix(vec3(0.82, 0.03, 0.045), vec3(0.1, 0.4, 0.61), u_light);
  vec3 color = mix(deep, mid, smoothstep(0.14, 0.78, signal));
  color = mix(color, bright, smoothstep(0.48, 0.9, signal));
  float dotShade = mix(0.78, 1.0, bayer4(cell) / 15.0);
  color *= dotShade;

  float fromTop = 1.0 - uv.y;
  float alpha = 1.0 - smoothstep(0.36, 0.78, fromTop);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

type WebGLStatus =
  | "initializing"
  | "running"
  | "paused"
  | "reduced motion"
  | "fallback"
  | "context lost";

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Unable to create a WebGL shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader compilation error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [status, setStatus] = useState<WebGLStatus>("initializing");
  const [frameTime, setFrameTime] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    let inView = false;
    let tabVisible = document.visibilityState === "visible";
    let animationFrame = 0;
    let lastFrameTime = 0;
    let lastDebugUpdate = 0;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let positionLocation = -1;
    let resolutionLocation: WebGLUniformLocation | null = null;
    let timeLocation: WebGLUniformLocation | null = null;
    let lightLocation: WebGLUniformLocation | null = null;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let themeObserver: MutationObserver | null = null;

    const reportFailure = (error: unknown) => {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Unable to initialize the hero WebGL effect; using the static background.",
          error,
        );
      }
      setCanvasReady(false);
      setStatus("fallback");
    };

    const resize = () => {
      if (!gl) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(container.clientWidth * ratio));
      const height = Math.max(1, Math.round(container.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const setupProgram = () => {
      if (!gl) throw new Error("WebGL is unavailable.");

      const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
      const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
      const nextProgram = gl.createProgram();
      if (!nextProgram) {
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        throw new Error("Unable to create a WebGL program.");
      }

      gl.attachShader(nextProgram, vertex);
      gl.attachShader(nextProgram, fragment);
      gl.linkProgram(nextProgram);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(nextProgram) || "Unable to link WebGL shaders.";
        gl.deleteProgram(nextProgram);
        throw new Error(message);
      }

      const nextBuffer = gl.createBuffer();
      const nextPositionLocation = gl.getAttribLocation(nextProgram, "a_position");
      if (!nextBuffer || nextPositionLocation < 0) {
        gl.deleteBuffer(nextBuffer);
        gl.deleteProgram(nextProgram);
        throw new Error("Unable to create the WebGL vertex buffer.");
      }

      gl.useProgram(nextProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, nextBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(nextPositionLocation);
      gl.vertexAttribPointer(nextPositionLocation, 2, gl.FLOAT, false, 0, 0);

      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      program = nextProgram;
      buffer = nextBuffer;
      positionLocation = nextPositionLocation;
      resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      timeLocation = gl.getUniformLocation(program, "u_time");
      lightLocation = gl.getUniformLocation(program, "u_light");
    };

    const draw = (now: number) => {
      if (
        !gl ||
        !program ||
        !buffer ||
        !resolutionLocation ||
        !timeLocation ||
        !lightLocation
      ) {
        return;
      }

      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, reducedMotion ? 0 : (now - startTime) * 0.00002);
      gl.uniform1f(lightLocation, document.documentElement.classList.contains("light") ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (lastFrameTime && now - lastDebugUpdate > 500) {
        setFrameTime(Math.round(now - lastFrameTime));
        lastDebugUpdate = now;
      }
      lastFrameTime = now;

      if (!reducedMotion && inView && tabVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        animationFrame = 0;
      }
    };

    let startTime = performance.now();
    const updateAnimation = () => {
      if (reducedMotion) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        setStatus("reduced motion");
        draw(performance.now());
        return;
      }

      if (inView && tabVisible) {
        if (!animationFrame) {
          startTime = performance.now();
          setStatus("running");
          animationFrame = window.requestAnimationFrame(draw);
        }
      } else {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        setStatus("paused");
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      setCanvasReady(false);
      setStatus("context lost");
      if (process.env.NODE_ENV === "development") {
        console.warn("The hero WebGL context was lost; waiting for restoration.");
      }
    };

    const onContextRestored = () => {
      try {
        setupProgram();
        resize();
        setCanvasReady(true);
        updateAnimation();
      } catch (error) {
        reportFailure(error);
      }
    };

    const onVisibilityChange = () => {
      tabVisible = document.visibilityState === "visible";
      updateAnimation();
    };

    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      updateAnimation();
    };

    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      if (!gl) throw new Error("The browser did not provide a WebGL context.");

      setupProgram();
      inView = (() => {
        const rect = container.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
      })();
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updateAnimation();
      });
      observer.observe(container);

      resizeObserver = new ResizeObserver(() => {
        resize();
        if (reducedMotion) draw(performance.now());
      });
      resizeObserver.observe(container);
      themeObserver = new MutationObserver(() => {
        draw(performance.now());
        updateAnimation();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);
      document.addEventListener("visibilitychange", onVisibilityChange);
      motionPreference.addEventListener("change", onMotionChange);
      window.addEventListener("resize", resize);

      resize();
      setCanvasReady(true);
      setStatus(reducedMotion ? "reduced motion" : "running");
      draw(performance.now());
    } catch (error) {
      reportFailure(error);
    }

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", resize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (gl && program) gl.deleteProgram(program);
      if (gl && buffer) gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-background" aria-hidden="true">
      <div className="hero-background-static" />
      <canvas
        ref={canvasRef}
        className="hero-background-canvas"
        data-ready={canvasReady}
      />
      {process.env.NODE_ENV === "development" && (
        <div className="hero-debug">
          WebGL: {status} · frame: {frameTime === null ? "--" : `${frameTime} ms`}
        </div>
      )}
    </div>
  );
}
