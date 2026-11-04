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
  float time = u_time;
  vec2 warp = vec2(
    fbm(p * 1.35 + vec2(time * 0.42, 1.7)),
    fbm(p * 1.35 + vec2(4.3, -time * 0.34))
  );
  float broadClouds = fbm(p * 1.45 + warp * 1.7 + vec2(time * 0.14, 0.0));
  float fluid = fbm(p * 1.95 + warp * 2.35 + vec2(-time * 0.2, time * 0.08));
  float veins = 0.5 + 0.5 * sin(fluid * 6.0 + warp.x * 2.5 + p.y * 1.4);
  float signal = clamp(fluid * 0.56 + broadClouds * 0.36 + veins * 0.08, 0.0, 1.0);

  vec3 deep = mix(vec3(0.045, 0.002, 0.008), vec3(0.08, 0.25, 0.36), u_light);
  vec3 mid = mix(vec3(0.34, 0.006, 0.02), vec3(0.2, 0.5, 0.68), u_light);
  vec3 bright = mix(vec3(0.82, 0.03, 0.045), vec3(0.48, 0.76, 0.9), u_light);
  vec3 color = mix(deep, mid, smoothstep(0.14, 0.78, signal));
  color = mix(color, bright, smoothstep(0.48, 0.9, signal));
  float dotShade = mix(0.78, 1.0, bayer4(cell) / 15.0);
  color *= dotShade;

  float fromTop = 1.0 - uv.y;
  float alpha = 1.0 - smoothstep(0.36, 0.78, fromTop);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      console.warn("WebGL is unavailable; using the static hero background.");
      return;
    }

    let program: WebGLProgram;
    let positionLocation: number;
    let resolutionLocation: WebGLUniformLocation | null;
    let timeLocation: WebGLUniformLocation | null;
    let lightLocation: WebGLUniformLocation | null;
    let animationFrame = 0;
    let inView = false;
    let tabVisible = document.visibilityState === "visible";
    let startTime = performance.now();

    try {
      const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
      const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
      const linkedProgram = gl.createProgram();
      if (!linkedProgram) {
        throw new Error("Unable to create a WebGL program.");
      }

      gl.attachShader(linkedProgram, vertex);
      gl.attachShader(linkedProgram, fragment);
      gl.linkProgram(linkedProgram);
      if (!gl.getProgramParameter(linkedProgram, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(linkedProgram) || "Unable to link WebGL shaders.");
      }

      program = linkedProgram;
      positionLocation = gl.getAttribLocation(program, "a_position");
      resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      timeLocation = gl.getUniformLocation(program, "u_time");
      lightLocation = gl.getUniformLocation(program, "u_light");

      const buffer = gl.createBuffer();
      if (!buffer) {
        throw new Error("Unable to create a WebGL vertex buffer.");
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = Math.max(1, Math.round(container.clientWidth * ratio));
        const height = Math.max(1, Math.round(container.clientHeight * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      const draw = (now: number) => {
        if (!inView || !tabVisible || motionPreference.matches) {
          animationFrame = 0;
          return;
        }
        resize();
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, (now - startTime) * 0.00002);
        gl.uniform1f(lightLocation, document.documentElement.classList.contains("light") ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrame = window.requestAnimationFrame(draw);
      };

      const updateAnimation = () => {
        if (inView && tabVisible && !motionPreference.matches && !animationFrame) {
          startTime = performance.now();
          animationFrame = window.requestAnimationFrame(draw);
        } else if ((!inView || !tabVisible || motionPreference.matches) && animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      };

      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updateAnimation();
      });
      observer.observe(container);

      const onVisibilityChange = () => {
        tabVisible = document.visibilityState === "visible";
        updateAnimation();
      };
      const onMotionChange = () => {
        updateAnimation();
        if (motionPreference.matches) {
          setCanvasReady(false);
        } else {
          setCanvasReady(true);
        }
      };
      const themeObserver = new MutationObserver(() => updateAnimation());
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibilityChange);
      motionPreference.addEventListener("change", onMotionChange);
      canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        setCanvasReady(false);
        console.warn("The hero WebGL context was lost; using the static background.");
      });

      resize();
      setCanvasReady(true);

      return () => {
        observer.disconnect();
        themeObserver.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        motionPreference.removeEventListener("change", onMotionChange);
        window.cancelAnimationFrame(animationFrame);
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
      };
    } catch (error) {
      console.error("Unable to initialize the hero WebGL effect; using the static background.", error);
    }
  }, []);

  return (
    <div ref={containerRef} className="hero-background" aria-hidden="true">
      <div className="hero-background-static" />
      <canvas
        ref={canvasRef}
        className="hero-background-canvas"
        data-ready={canvasReady}
      />
    </div>
  );
}
