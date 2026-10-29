import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { identity } from "@/content/profile";

export const alt = `${identity.fullName} — ${identity.jobTitle}, Suisse romande`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  ink: "#111111",
  paper: "#F5F4F0",
  vermilion: "#E34234",
  steel: "#8A8A8A",
} as const;

// Read at module scope so the image stays statically generated at build time.
const fontsDir = join(process.cwd(), "src/assets/fonts");
const [sans, mono, portrait] = await Promise.all([
  readFile(join(fontsDir, "Geist-SemiBold.ttf")),
  readFile(join(fontsDir, "GeistMono-Medium.ttf")),
  readFile(join(process.cwd(), "public/images/portrait/me.png")),
]);
const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 72,
        gap: 56,
        background: COLORS.paper,
        color: COLORS.ink,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", fontSize: 44, letterSpacing: "-0.04em" }}>
            MD<span style={{ color: COLORS.vermilion }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Geist Mono",
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.steel,
            }}
          >
            <div style={{ width: 12, height: 12, background: COLORS.vermilion }} />
            Développeur d&apos;applications — Suisse romande
          </div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>
            Concevoir avec
          </div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>
            précision.
          </div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>
            Développer avec
          </div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>
            intention<span style={{ color: COLORS.vermilion }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `2px solid ${COLORS.ink}`,
            paddingTop: 24,
            fontSize: 28,
            letterSpacing: "-0.02em",
          }}
        >
          <div style={{ display: "flex" }}>{identity.fullName}</div>
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 18,
              letterSpacing: "0.1em",
              color: COLORS.steel,
            }}
          >
            {identity.location.city}, {identity.location.region} — CH
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) requires a native <img> */}
      <img
        src={portraitSrc}
        alt=""
        width={300}
        height={486}
        style={{ objectFit: "cover", borderLeft: `6px solid ${COLORS.vermilion}` }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, style: "normal", weight: 600 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
