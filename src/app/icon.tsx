import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/** "MD." monogram favicon — ink square, paper letters, vermilion period. */
const font = await readFile(join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf"));

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111111",
        color: "#F5F4F0",
        fontFamily: "Geist",
        fontSize: 102,
        letterSpacing: "-0.06em",
        paddingBottom: 6,
      }}
    >
      MD<span style={{ color: "#E34234" }}>.</span>
    </div>,
    {
      ...size,
      fonts: [{ name: "Geist", data: font, style: "normal", weight: 600 }],
    },
  );
}
