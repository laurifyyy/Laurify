"use client";

import { useState, useEffect, useRef } from "react";
import { dictionaries, type Lang } from "./i18n";

const SERVICE_PRICES = ["€185", "€240", "€160", "€95", "€890", "€380"];

export default function LaurifyHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lang, setLang] = useState<Lang>("lv");
  const heroRef = useRef<HTMLDivElement>(null);

  const dict = dictionaries[lang];
  const services = dict.services.items.map((item, i) => ({
    ...item,
    price: SERVICE_PRICES[i],
    icon: "✦",
  }));
  const testimonials = dict.testimonials.items;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    setActiveTestimonial(0);
  }, [lang]);

  const navScrolled = scrollY > 60;

  const navLinks = [
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.testimonials, href: "#testimonials" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  const contactInfo = [
    { label: dict.contact.address, value: "12 Elizabetes iela, Riga, LV-1010" },
    { label: dict.contact.phone, value: "+371 67 123 456" },
    { label: dict.contact.email, value: "hello@laurify.com" },
    { label: dict.contact.hours, value: dict.contact.hoursValue },
  ];

  return (
    <div
      style={{
        fontFamily: "'Gabriel Sans', sans-serif",
        backgroundColor: "var(--cream)",
        color: "var(--dark)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @font-face {
          font-family: 'La Luxes Serif';
          src: url('/LaLuxes-regular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Gabriel Sans';
          src: url('/fonts/GabrielSans-Trial-Thin.woff') format('woff');
          font-weight: 200;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Gabriel Sans';
          src: url('/fonts/GabrielSans-Trial-Light.woff') format('woff');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Gabriel Sans';
          src: url('/fonts/GabrielSans-Trial-Normal.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Gabriel Sans';
          src: url('/fonts/GabrielSans-Trial-Medium.woff') format('woff');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Gabriel Sans';
          src: url('/fonts/GabrielSans-Trial-Bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #F5F4E4;
          --beige: #E3D4BE;
          --beige-mid: #C9BBA8;
          --navy: #0A1F48;
          --navy-mid: #0D2454;
          --gold: #E3D4BE;
          --gold-light: #F0EAE0;
          --taupe: #605952;
          --dark: #29211B;
          --white: #FFFFFF;
        }

        html { scroll-behavior: smooth; }

        .sans { font-family: 'Gabriel Sans', sans-serif; }

        .nav-link {
          font-family: 'Gabriel Sans', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: inherit;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        .nav-link:hover { color: var(--gold); }

        .btn-primary {
          display: inline-block;
          font-family: 'Gabriel Sans', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          background: var(--navy);
          color: var(--cream);
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--gold);
          color: var(--navy);
          transform: translateY(-1px);
        }

        .btn-outline {
          display: inline-block;
          font-family: 'Gabriel Sans', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 0.9rem 2.2rem;
          background: transparent;
          color: var(--navy);
          border: 1px solid var(--navy);
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
        }
        .btn-outline:hover {
          background: var(--navy);
          color: var(--cream);
        }

        .btn-light {
          display: inline-block;
          font-family: 'Gabriel Sans', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(245,244,228,0.4);
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
        }
        .btn-light:hover {
          background: var(--cream);
          color: var(--navy);
          border-color: var(--cream);
        }

        .service-card {
          padding: 2.5rem;
          border: 1px solid var(--beige-mid);
          background: var(--white);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }
        .service-card:hover { border-color: var(--navy); background: var(--navy); }
        .service-card:hover .card-content { color: var(--cream); }
        .service-card:hover .card-price { color: var(--gold-light); }
        .service-card:hover .card-icon { color: var(--gold); }
        .card-content { transition: color 0.4s; display: flex; flex-direction: column; height: 100%; }
        .card-icon { font-size: 1.2rem; color: var(--gold); margin-bottom: 1.2rem; display: block; transition: color 0.4s; }
        .card-price { transition: color 0.4s; }

        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .divider {
          width: 40px;
          height: 1px;
          background: var(--gold);
          margin: 1.2rem 0;
        }
        .divider-center { margin: 1.2rem auto; }

        .testimonial-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--beige-mid);
          cursor: pointer;
          transition: background 0.3s;
          border: none;
        }
        .testimonial-dot.active { background: var(--gold); }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-animate { animation: fadeUp 1.2s ease forwards; }
        .hero-animate-delay { animation: fadeUp 1.2s ease 0.3s forwards; opacity: 0; }
        .hero-animate-delay-2 { animation: fadeUp 1.2s ease 0.6s forwards; opacity: 0; }
        .hero-animate-delay-3 { animation: fadeUp 1.2s ease 0.9s forwards; opacity: 0; }

        .ornament { color: var(--gold); letter-spacing: 0.15em; font-size: 0.7rem; }

        .lang-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Gabriel Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.25rem 0.2rem;
          transition: color 0.3s;
        }
        .lang-sep {
          font-family: 'Gabriel Sans', sans-serif;
          font-size: 0.55rem;
          opacity: 0.3;
        }

        @media (max-width: 768px) {
          .hero-headline { font-size: 3rem !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .mobile-hidden { display: none !important; }
        }

        input, textarea {
          width: 100%;
          padding: 0.9rem 1rem;
          border: 1px solid var(--beige-mid);
          background: transparent;
          font-family: 'Gabriel Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--navy);
          outline: none;
          transition: border-color 0.3s;
          margin-bottom: 1rem;
        }
        input::placeholder, textarea::placeholder { color: #a09890; }
        input:focus, textarea:focus { border-color: var(--gold); }
        textarea { resize: vertical; min-height: 120px; }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: navScrolled ? "1rem 3rem" : "1.8rem 3rem",
          background: navScrolled ? "rgba(245,244,228,0.97)" : "transparent",
          borderBottom: navScrolled ? "1px solid var(--beige)" : "none",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'La Luxes Serif', serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: navScrolled ? "var(--navy)" : "var(--cream)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          LAURIFY
        </a>

        <div
          className="mobile-hidden"
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{ color: navScrolled ? "var(--navy)" : "var(--cream)" }}
            >
              {item.label}
            </a>
          ))}

          {/* Language switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
            {(["lv", "en", "ru"] as const).map((l, i) => (
              <span key={l} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <span style={{ display: "inline-block", width: "1px", height: "10px", background: navScrolled ? "rgba(10,31,72,0.3)" : "rgba(245,244,228,0.3)", margin: "0 0.1rem" }} />}
                <button
                  className="lang-btn"
                  onClick={() => setLang(l)}
                  style={{
                    color: lang === l
                      ? "var(--gold)"
                      : navScrolled
                      ? "var(--navy)"
                      : "rgba(245,244,228,0.6)",
                    fontWeight: lang === l ? 500 : 300,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <a
            href="#contact"
            className="nav-link"
            style={{
              color: navScrolled ? "var(--navy)" : "var(--cream)",
              border: `1px solid ${navScrolled ? "var(--navy)" : "rgba(245,244,228,0.5)"}`,
              padding: "0.55rem 1.4rem",
            }}
          >
            {dict.nav.bookNow}
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: navScrolled ? "var(--navy)" : "var(--cream)",
            fontSize: "1.4rem",
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          background: `linear-gradient(160deg, #0A1F48 0%, #0C2250 60%, #0A1F48 100%)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(227,212,190,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(227,212,190,0.08) 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        {/* Decorative vertical line */}
        <div
          className="mobile-hidden"
          style={{
            position: "absolute",
            right: "12%",
            top: "10%",
            bottom: "10%",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, rgba(227,212,190,0.4), transparent)",
          }}
        />

        {/* Large decorative letter */}
        <div
          className="mobile-hidden"
          style={{
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'La Luxes Serif', serif",
            fontSize: "clamp(12rem, 18vw, 22rem)",
            fontWeight: 400,
            color: "rgba(227,212,190,0.06)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          L
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 3rem",
            width: "100%",
            paddingTop: "8rem",
            paddingBottom: "6rem",
          }}
        >
          <div className="hero-animate ornament sans" style={{ color: "var(--gold)", fontStyle: "italic", letterSpacing: "0.08em", fontSize: "0.85rem", fontWeight: 300 }}>
            {dict.hero.tagline}
          </div>

          <h1
            className="hero-animate-delay hero-headline"
            style={{
              fontFamily: "'La Luxes Serif', serif",
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "var(--cream)",
              marginTop: "1.5rem",
              maxWidth: "700px",
              fontStyle: "italic",
            }}
          >
            {dict.hero.headline1}
            <br />
            <span style={{ fontStyle: "normal", fontWeight: 500 }}>
              {dict.hero.headline2}
            </span>
          </h1>

          <p
            className="hero-animate-delay-2 sans"
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1.9,
              color: "rgba(245,244,228,0.75)",
              marginTop: "1.8rem",
              maxWidth: "400px",
            }}
          >
            {dict.hero.subtext}
          </p>

          <div
            className="hero-animate-delay-3"
            style={{
              display: "flex",
              gap: "1.2rem",
              marginTop: "2.8rem",
              flexWrap: "wrap",
            }}
          >
            <a href="#contact" className="btn-primary">
              {dict.hero.cta1}
            </a>
            <a href="#services" className="btn-light">
              {dict.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div
            className="hero-animate-delay-3"
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              ["10+", dict.hero.stat1],
              ["2,400+", dict.hero.stat2],
              ["4.98", dict.hero.stat3],
            ].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'La Luxes Serif', serif",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  className="sans"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(245,244,228,0.5)",
                    marginTop: "0.4rem",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="sans"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(245,244,228,0.4)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>{dict.hero.scroll}</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(245,244,228,0.4), transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        style={{
          background: "var(--cream)",
          padding: "8rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div className="ornament sans">✦ &nbsp; {dict.services.ornament} &nbsp; ✦</div>
            <div className="divider divider-center" />
            <h2
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.15,
                color: "var(--navy)",
              }}
            >
              {dict.services.title}
            </h2>
            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "#605952",
                marginTop: "1rem",
                maxWidth: "440px",
                margin: "1rem auto 0",
                lineHeight: 1.8,
              }}
            >
              {dict.services.subtitle}
            </p>
          </div>

          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              background: "transparent",
            }}
          >
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="card-content">
                  <span className="card-icon">{service.icon}</span>
                  <h3
                    style={{
                      fontFamily: "'Gabriel Sans', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="sans"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: "inherit",
                      opacity: 0.7,
                      flexGrow: 1,
                    }}
                  >
                    {service.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid rgba(227,212,190,0.3)",
                      paddingTop: "1rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    <span
                      className="sans card-price"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                        color: "var(--taupe)",
                      }}
                    >
                      {service.price}
                    </span>
                    <span
                      className="sans"
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                      }}
                    >
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="#contact" className="btn-outline">
              {dict.services.bookBtn}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          background: "var(--navy)",
          padding: "8rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227,212,190,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="about-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
        >
          <div>
            <div className="ornament sans" style={{ color: "var(--gold)" }}>
              ✦ &nbsp; {dict.about.ornament} &nbsp; ✦
            </div>
            <div className="divider" style={{ background: "var(--gold)" }} />
            <h2
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: "var(--cream)",
                marginBottom: "1.8rem",
              }}
            >
              {dict.about.headline1}
              <br />
              <span style={{ fontStyle: "normal", fontWeight: 500 }}>
                {dict.about.headline2}
              </span>
            </h2>

            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 400,
                lineHeight: 1.95,
                color: "rgba(245,244,228,0.65)",
                marginBottom: "1.2rem",
              }}
            >
              {dict.about.p1}
            </p>
            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 400,
                lineHeight: 1.95,
                color: "rgba(245,244,228,0.65)",
                marginBottom: "2.5rem",
              }}
            >
              {dict.about.p2}
            </p>

            <a href="#contact" className="btn-light">
              {dict.about.cta}
            </a>
          </div>

          <div style={{ position: "relative" }}>
            {/* Decorative image placeholder with pattern */}
            <div
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, #0A1F48 0%, #0D2454 100%)",
                border: "1px solid rgba(227,212,190,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Abstract geometric decoration */}
              <div
                style={{
                  position: "absolute",
                  inset: "2rem",
                  border: "1px solid rgba(227,212,190,0.15)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "3.5rem",
                  border: "1px solid rgba(227,212,190,0.08)",
                }}
              />
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  style={{
                    fontFamily: "'La Luxes Serif', serif",
                    fontSize: "5rem",
                    fontWeight: 400,
                    color: "rgba(227,212,190,0.3)",
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  L
                </div>
                <div
                  className="sans"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(227,212,190,0.4)",
                  }}
                >
                  Est. 2014 · Riga
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div
              style={{
                position: "absolute",
                bottom: "-2rem",
                left: "-2.5rem",
                background: "var(--gold)",
                padding: "1.5rem 2rem",
                maxWidth: "200px",
              }}
            >
              <div
                style={{
                  fontFamily: "'La Luxes Serif', serif",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "var(--navy)",
                  lineHeight: 1,
                }}
              >
                100%
              </div>
              <div
                className="sans"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  marginTop: "0.4rem",
                  opacity: 0.75,
                }}
              >
                {dict.about.tag}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        style={{
          background: "var(--beige)",
          padding: "8rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'La Luxes Serif', serif",
            fontSize: "clamp(10rem, 20vw, 24rem)",
            fontWeight: 400,
            color: "rgba(10,31,72,0.03)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          "
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <div className="ornament sans">✦ &nbsp; {dict.testimonials.ornament} &nbsp; ✦</div>
          <div className="divider divider-center" />
          <h2
            style={{
              fontFamily: "'La Luxes Serif', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--navy)",
              marginBottom: "4rem",
            }}
          >
            {dict.testimonials.title}
          </h2>

          <div
            style={{
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "var(--navy)",
                transition: "all 0.6s ease",
              }}
            >
              &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
            </p>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--navy)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "0.85rem",
                color: "var(--gold)",
                marginBottom: "0.8rem",
              }}
            >
              {testimonials[activeTestimonial].initials}
            </div>
            <div
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "var(--navy)",
              }}
            >
              {testimonials[activeTestimonial].name}
            </div>
            <div
              className="sans"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#605952",
                marginTop: "0.3rem",
              }}
            >
              {testimonials[activeTestimonial].role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeTestimonial ? "active" : ""}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          background: "var(--cream)",
          padding: "8rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div className="ornament sans">✦ &nbsp; {dict.contact.ornament} &nbsp; ✦</div>
            <div className="divider divider-center" />
            <h2
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--navy)",
              }}
            >
              {dict.contact.title}
            </h2>
          </div>

          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'La Luxes Serif', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--navy)",
                  marginBottom: "1.5rem",
                }}
              >
                {dict.contact.infoTitle}
              </h3>

              {contactInfo.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    marginBottom: "1.5rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid var(--beige)",
                  }}
                >
                  <div
                    className="sans"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    className="sans"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "var(--navy)",
                      whiteSpace: "pre-line",
                      lineHeight: 1.7,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "'La Luxes Serif', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--navy)",
                  marginBottom: "1.5rem",
                }}
              >
                {dict.contact.formTitle}
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                <input type="text" placeholder={dict.contact.firstName} />
                <input type="text" placeholder={dict.contact.lastName} />
              </div>
              <input type="email" placeholder={dict.contact.emailPlaceholder} />
              <input type="tel" placeholder={dict.contact.phonePlaceholder} />
              <select
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  border: "1px solid var(--beige-mid)",
                  background: "transparent",
                  fontFamily: "'Gabriel Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#605952",
                  outline: "none",
                  marginBottom: "1rem",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>{dict.contact.selectService}</option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>{s.title}</option>
                ))}
              </select>
              <textarea placeholder={dict.contact.notes} />

              <button className="btn-primary" style={{ width: "100%", border: "none" }}>
                {dict.contact.submitBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "var(--navy)",
          padding: "4rem 3rem",
          borderTop: "1px solid rgba(227,212,190,0.15)",
        }}
      >
        <div
          className="footer-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'La Luxes Serif', serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--cream)",
                marginBottom: "1rem",
              }}
            >
              LAURIFY
            </div>
            <p
              className="sans"
              style={{
                fontSize: "0.78rem",
                fontWeight: 400,
                lineHeight: 1.9,
                color: "rgba(245,244,228,0.45)",
                maxWidth: "220px",
              }}
            >
              {dict.footer.tagline}
            </p>
          </div>

          {[dict.footer.col1, dict.footer.col2, dict.footer.col3].map(({ title, links }) => (
            <div key={title}>
              <div
                className="sans"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.2rem",
                }}
              >
                {title}
              </div>
              {links.map((link) => (
                <div key={link} style={{ marginBottom: "0.6rem" }}>
                  <a
                    href="#"
                    className="sans"
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 400,
                      color: "rgba(245,244,228,0.45)",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,244,228,0.45)")}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "3rem auto 0",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(227,212,190,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="sans"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "rgba(245,244,228,0.3)",
            }}
          >
            {dict.footer.copyright}
          </span>
          <span
            className="sans"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "rgba(245,244,228,0.3)",
            }}
          >
            {dict.footer.legal}
          </span>
        </div>
      </footer>
    </div>
  );
}
