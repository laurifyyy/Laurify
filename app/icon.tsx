import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const font = readFileSync(join(process.cwd(), "public/LaLuxes-regular.otf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          fontFamily: "La Luxes Serif",
          fontSize: 30,
          fontWeight: 400,
          color: "#000000",
          letterSpacing: "3px",
        }}
      >
        LA
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "La Luxes Serif",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}
