import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BUSINESS, formatAddress, localityPhrase } from "@/lib/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BUSINESS.name}, barbier ${localityPhrase()}`;

/**
 * Image Open Graph partagée par toutes les pages (Facebook, WhatsApp, iMessage,
 * X). La photo du salon est lue sur le disque et intégrée en data URI : aucune
 * requête réseau au moment de la génération, donc rien qui puisse échouer au
 * build. Si la lecture échoue, on retombe sur un fond uni plutôt que sur une
 * erreur.
 */
async function loadBackground(): Promise<string | null> {
  try {
    const file = await readFile(
      path.join(process.cwd(), "public", "images", "image-background.jpg")
    );
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const background = await loadBackground();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0c0c0c",
          fontFamily: "sans-serif",
        }}
      >
        {background && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={background}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(12, 12, 12, 0.72)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 80px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            Barbier {localityPhrase()}
          </div>

          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 18,
              textTransform: "uppercase",
            }}
          >
            Christian
          </div>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            Cutz
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 30,
              color: "#d4d4d4",
            }}
          >
            Coupe · Barbe · Dégradé · Teinture · Nattes
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 26,
              color: "#a3a3a3",
            }}
          >
            {formatAddress()} · {BUSINESS.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size
  );
}
