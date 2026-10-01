import { ImageResponse } from "next/og";

import { homeTitle, siteUrl } from "@/data/seo";

export const alt = homeTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #071a37 0%, #0c2b5b 58%, #123e7a 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "72px 82px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 22px)",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            background: "#d4a72c",
            display: "flex",
            height: 7,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 760,
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#f1cc68",
              display: "flex",
              fontSize: 23,
              fontWeight: 700,
              letterSpacing: 5,
              marginBottom: 26,
              textTransform: "uppercase",
            }}
          >
            Site oficial
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            CMEBE
          </div>
          <div
            style={{
              color: "#e8eef8",
              display: "flex",
              fontSize: 36,
              lineHeight: 1.22,
              marginTop: 22,
            }}
          >
            Conselho de Ministros Evangélicos do Brasil e do Exterior
          </div>
          <div
            style={{
              borderLeft: "4px solid #d4a72c",
              color: "#f1cc68",
              display: "flex",
              fontSize: 25,
              fontStyle: "italic",
              marginTop: 34,
              paddingLeft: 18,
            }}
          >
            Tudo pelo Reino
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.96)",
            border: "5px solid rgba(212,167,44,0.85)",
            borderRadius: 999,
            boxShadow: "0 24px 70px rgba(0,0,0,0.32)",
            display: "flex",
            height: 250,
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            width: 250,
          }}
        >
          <img
            alt=""
            src={`${siteUrl}/cmebe-logo.jpeg`}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
