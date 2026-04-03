"use client";
import { useState } from "react";

const SERVICES = [
  {
    id: "rf",
    title: "RF Lifting",
    subtitle: "Sejas & Ķermeņa",
    gradient: "linear-gradient(160deg, #0a1f48 0%, #0d2454 60%, #1a3a6e 100%)",
    bgImage: "/rf-lifting.jpg",
    bgPosition: "center 70%",
    accentColor: "rgba(227,212,190,0.9)",
    areas: ["Kājas", "Ikri", "Vēders", "Sēžamvieta", "Rokas"],
    comingSoon: false,
  },
  {
    id: "wrap",
    title: "Zelta Ietīšana",
    subtitle: "Ķermeņa Procedūra",
    gradient: "linear-gradient(160deg, #2a1a00 0%, #5c3d00 50%, #8a5e00 100%)",
    bgImage: "/gold-wrap.jpg",
    bgPosition: "center center",
    accentColor: "rgba(227,212,190,0.9)",
    areas: ["Pilns ķermenis", "Vēders", "Kājas", "Rokas"],
    comingSoon: false,
  },
  {
    id: "laser",
    title: "Lāzera Depilācija",
    subtitle: "Drīzumā",
    gradient: "linear-gradient(160deg, #1a0a2e 0%, #2d1054 50%, #3d1a6e 100%)",
    bgImage: "/laser.jpg",
    bgPosition: "center center",
    accentColor: "rgba(200,180,255,0.8)",
    areas: ["Rokas", "Pilnas kājas", "Mugura", "Paduses", "Bikini", "Pilns bikini"],
    comingSoon: true,
  },
];

interface Props {
  onBook: () => void;
}

export default function ServiceCards({ onBook }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<Record<string, string>>({});

  return (
    <section style={{ background: "#fff", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
              color: "var(--gold)",
              letterSpacing: "0.15em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
            }}
          >
            ✦ &nbsp; Mūsu Pakalpojumi &nbsp; ✦
          </div>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--gold)",
              margin: "1.2rem auto",
            }}
          />
          <h2
            style={{
              fontFamily: "'La Luxes Serif', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--navy)",
              lineHeight: 1.15,
            }}
          >
            Izvēlies procedūru
          </h2>
        </div>

        <div className="service-visual-grid">
          {SERVICES.map((service) => {
            const isHovered = hovered === service.id;
            const picked = selectedArea[service.id];

            return (
              <div
                key={service.id}
                className="service-visual-card"
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: service.gradient,
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  boxShadow: isHovered
                    ? "0 24px 64px rgba(10,31,72,0.35)"
                    : "0 4px 24px rgba(10,31,72,0.12)",
                  cursor: service.comingSoon ? "default" : "pointer",
                }}
              >
                {/* Background image (fades in on hover) */}
                {service.bgImage && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: service.bgPosition ?? "center",
                      opacity: isHovered ? 0.45 : 0.2,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                )}

                {/* Texture overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isHovered
                      ? "rgba(0,0,0,0.45)"
                      : "rgba(0,0,0,0.15)",
                    transition: "background 0.4s ease",
                  }}
                />

                {/* Coming soon badge */}
                {service.comingSoon && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      right: "1.2rem",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "20px",
                      padding: "0.3rem 0.9rem",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                      zIndex: 2,
                    }}
                  >
                    Drīzumā
                  </div>
                )}

                {/* Default label (visible when not hovered) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "2rem",
                    zIndex: 2,
                    opacity: isHovered ? 0 : 1,
                    transform: isHovered ? "translateY(8px)" : "translateY(0)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {service.subtitle}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'La Luxes Serif', serif",
                      fontSize: "2rem",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#fff",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Hover content */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "2rem",
                    zIndex: 2,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'La Luxes Serif', serif",
                      fontSize: "1.7rem",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#fff",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {service.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                      marginBottom: "1.4rem",
                    }}
                  >
                    Izvēlies zonu
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.6rem" }}>
                    {service.areas.map((area) => {
                      const isPicked = picked === area;
                      return (
                        <button
                          key={area}
                          onClick={() =>
                            setSelectedArea((prev) => ({
                              ...prev,
                              [service.id]: isPicked ? "" : area,
                            }))
                          }
                          style={{
                            padding: "0.38rem 0.85rem",
                            borderRadius: "20px",
                            border: isPicked
                              ? `1px solid ${service.accentColor}`
                              : "1px solid rgba(255,255,255,0.25)",
                            background: isPicked
                              ? "rgba(255,255,255,0.22)"
                              : "rgba(255,255,255,0.08)",
                            color: isPicked ? service.accentColor : "rgba(255,255,255,0.8)",
                            fontSize: "0.72rem",
                            fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            backdropFilter: "blur(6px)",
                          }}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={onBook}
                    style={{
                      alignSelf: "flex-start",
                      padding: "0.65rem 1.6rem",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      color: "#fff",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                      cursor: "pointer",
                      transition: "background 0.25s ease, border-color 0.25s ease",
                      backdropFilter: "blur(6px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.26)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                    }}
                  >
                    Rezervēt vizīti
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
