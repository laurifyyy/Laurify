"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const ITEMS = [
  { type: "image" as const, src: "/gallery/g1.jpg" },
  { type: "video" as const, src: "/gallery/g2.mp4" },
  { type: "video" as const, src: "/gallery/g3.mp4" },
  { type: "video" as const, src: "/gallery/g4.mp4" },
  { type: "video" as const, src: "/gallery/g5.mp4" },
  { type: "video" as const, src: "/gallery/g6.mp4" },
  { type: "video" as const, src: "/gallery/g7.mp4" },
];

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const clamped = (index + ITEMS.length) % ITEMS.length;
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    videoRefs.current.forEach((v) => {
      if (v) { v.pause(); v.currentTime = 0; }
    });
    setCurrent(clamped);
  }, []);

  // autoplay video or auto-advance image
  useEffect(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);

    const item = ITEMS[current];

    if (item.type === "video") {
      const v = videoRefs.current[current];
      if (!v) return;
      v.play().catch(() => {});

      const onEnded = () => {
        autoAdvanceTimer.current = setTimeout(() => goTo(current + 1), 3000);
      };
      v.addEventListener("ended", onEnded);
      return () => {
        v.removeEventListener("ended", onEnded);
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      };
    } else {
      // image: show for 5 seconds then advance
      autoAdvanceTimer.current = setTimeout(() => goTo(current + 1), 5000);
      return () => {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      };
    }
  }, [current, goTo]);

  const prev = (current - 1 + ITEMS.length) % ITEMS.length;
  const next = (current + 1) % ITEMS.length;

  return (
    <section
      id="gallery"
      style={{
        background: "var(--navy)",
        padding: "8rem 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 2rem" }}>
        <div
          className="sans"
          style={{
            color: "rgba(227,212,190,0.6)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ✦ &nbsp; Mūsu Galerija &nbsp; ✦
        </div>
        <div style={{ width: "40px", height: "1px", background: "rgba(227,212,190,0.3)", margin: "1.2rem auto" }} />
        <h2
          style={{
            fontFamily: "'La Luxes Serif', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--cream)",
            lineHeight: 1.15,
          }}
        >
          Aikulises
        </h2>
      </div>

      {/* Carousel track */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "0 2rem",
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Iepriekšējais"
          style={{
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(227,212,190,0.3)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(227,212,190,0.8)",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          ‹
        </button>

        {/* Three visible items */}
        <div
          className="gallery-track"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
            touchStartX.current = null;
          }}
        >
          {[prev, current, next].map((idx, pos) => {
            const item = ITEMS[idx];
            const isActive = pos === 1;
            return (
              <div
                key={`${idx}-${pos}`}
                className="gallery-item-wrap"
                onClick={() => !isActive && goTo(idx)}
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: isActive ? "default" : "pointer",
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  boxShadow: isActive ? "0 24px 60px rgba(0,0,0,0.5)" : "none",
                }}
              >
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={`Galerija ${idx + 1}`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                ) : (
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    src={item.src}
                    muted
                    playsInline
                    controls={isActive}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Nākamais"
          style={{
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(227,212,190,0.3)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(227,212,190,0.8)",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "2.5rem" }}>
        {ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Attēls ${i + 1}`}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: i === current ? "var(--gold)" : "rgba(227,212,190,0.3)",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
