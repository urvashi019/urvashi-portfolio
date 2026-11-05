import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = "Urvashi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 24% 18%, #8f1621 0%, transparent 52%), linear-gradient(145deg, #180609 0%, #090303 78%)",
          color: "#f7efec",
          padding: "76px 84px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#e5b6b5",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          ECE · EMBEDDED SYSTEMS · PCB DESIGN
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {DATA.name}
          </div>
          <div
            style={{
              color: "#c5aaa7",
              fontFamily: "Arial, sans-serif",
              fontSize: 25,
            }}
          >
            ECE Student &amp; Hardware Builder
          </div>
        </div>
        <div
          style={{
            width: 120,
            height: 3,
            background: "#d9444f",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
