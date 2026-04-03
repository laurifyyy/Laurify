"use client";


import { useState, useEffect, useRef } from "react";
import { dictionaries, type Lang } from "./i18n";
import ServiceCards from "./components/ServiceCards";


export default function LaurifyHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lang, setLang] = useState<Lang>("lv");
  const [bookingOpen, setBookingOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const dict = dictionaries[lang];
  const testimonials = dict.testimonials.items;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

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
    { label: dict.contact.address, value: "Vienības gatve 109, Rīga, LV-1058" },
    { label: dict.contact.phone, value: "+371 20 169 091" },
    { label: dict.contact.email, value: "beauty@laurify.lv" },
    { label: dict.contact.hours, value: dict.contact.hoursValue },
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
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

        .sans { font-family: var(--font-raleway), 'Raleway', sans-serif; }

        .nav-link {
          font-family: var(--font-raleway), 'Raleway', sans-serif;
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
        .nav-book-btn {
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(245,244,228,0.5);
          color: var(--cream);
          padding: 0.55rem 1.4rem;
          background: transparent;
        }
        .nav-book-btn[data-scrolled="true"] {
          border-color: var(--navy);
          color: var(--navy);
        }
        .nav-book-btn:hover {
          background: var(--gold);
          color: var(--navy);
          border-color: var(--gold);
        }

        .btn-primary {
          display: inline-block;
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          border-radius: 8px;
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
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 0.9rem 2.2rem;
          background: transparent;
          color: var(--navy);
          border: 1px solid var(--navy);
          border-radius: 8px;
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
          font-family: var(--font-raleway), 'Raleway', sans-serif;
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

        @keyframes scrollWheel {
          0% { opacity: 1; transform: translateY(0); }
          80% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(0); }
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
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.25rem 0.2rem;
          transition: color 0.3s;
        }
        .lang-sep {
          font-family: var(--font-raleway), 'Raleway', sans-serif;
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

        .form-field {
          position: relative;
          margin-bottom: 2rem;
        }
        .form-field input,
        .form-field textarea {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid var(--beige-mid);
          background: transparent;
          padding: 1.6rem 0 0.9rem;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 0.9rem;
          color: var(--navy);
          outline: none;
          display: block;
          transition: border-color 0.3s;
        }
        .form-field textarea {
          resize: none;
          min-height: 80px;
        }
        .form-field label {
          position: absolute;
          top: 1.6rem;
          left: 0;
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-size: 0.85rem;
          color: #a09890;
          transition: all 0.22s ease;
          pointer-events: none;
          letter-spacing: 0.03em;
        }
        .form-field input:focus ~ label,
        .form-field input:not(:placeholder-shown) ~ label,
        .form-field textarea:focus ~ label,
        .form-field textarea:not(:placeholder-shown) ~ label {
          top: 0.15rem;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--taupe);
        }
        .form-field::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--navy);
          transition: width 0.3s ease;
        }
        .form-field:focus-within::after { width: 100%; }
        .custom-dropdown {
          position: relative;
          margin-bottom: 2rem;
        }
        .custom-dropdown-label {
          display: block;
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--taupe);
          margin-bottom: 0.5rem;
        }
        .custom-dropdown-trigger {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid var(--beige-mid);
          background: transparent;
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-size: 0.9rem;
          color: var(--navy);
          outline: none;
          padding: 0.6rem 1.5rem 0.6rem 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: border-color 0.3s;
          text-align: left;
        }
        .custom-dropdown-trigger:focus,
        .custom-dropdown-trigger.open { border-color: var(--navy); }
        .custom-dropdown-trigger .placeholder { color: #a09890; }
        .custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid var(--beige-mid);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(10,31,72,0.10);
          z-index: 100;
          overflow: hidden;
          animation: dropdownIn 0.18s ease;
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .custom-dropdown-item {
          font-family: var(--font-raleway), 'Raleway', sans-serif;
          font-size: 0.85rem;
          color: var(--navy);
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid var(--beige);
        }
        .custom-dropdown-item:last-child { border-bottom: none; }
        .custom-dropdown-item:hover { background: var(--cream); }
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
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", "/"); }}
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

          <button
            className="nav-book-btn"
            data-scrolled={navScrolled ? "true" : "false"}
            onClick={() => setBookingOpen(true)}
          >
            {dict.nav.bookNow}
          </button>
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
              ["5+", dict.hero.stat1],
              ["2,400+", dict.hero.stat2],
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
        <a
          href="#services"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <span className="sans" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,228,0.35)" }}>
            {dict.hero.scroll}
          </span>
          {/* Mouse outline */}
          <div style={{
            width: "22px",
            height: "34px",
            border: "1.5px solid rgba(245,244,228,0.35)",
            borderRadius: "11px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
          }}>
            {/* Scroll wheel dot */}
            <div style={{
              width: "3px",
              height: "6px",
              background: "rgba(245,244,228,0.6)",
              borderRadius: "2px",
              animation: "scrollWheel 1.6s ease-in-out infinite",
            }} />
          </div>
        </a>
      </section>

      {/* SERVICE VISUAL CARDS */}
      <ServiceCards onBook={() => setBookingOpen(true)} />

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
            {/* About photo */}
            <div
              style={{
                aspectRatio: "3/4",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(227,212,190,0.25)",
                borderRadius: "12px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-photo.jpg"
                alt="Laurify luxury beauty"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(100%)",
                  display: "block",
                }}
              />
            </div>

            {/* Floating accent card */}
            <div
              style={{
                position: "absolute",
                bottom: "-2rem",
                left: "-2.5rem",
                background: "var(--gold)",
                padding: "1.5rem 2rem",
                maxWidth: "220px",
              }}
            >
              <div
                style={{
                  fontFamily: "'La Luxes Serif', serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--navy)",
                  lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}
              >
                Laura
              </div>
              <div
                className="sans"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  opacity: 0.75,
                  lineHeight: 1.6,
                }}
              >
                Zīmola īpašniece & radītāja
                <br />
                Sertificēta speciāliste
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="instagram-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="ornament sans">✦ &nbsp; Instagram &nbsp; ✦</div>
            <div className="divider divider-center" />
            <a
              href="https://www.instagram.com/laurifybeauty/"
              target="_blank"
              rel="noopener noreferrer"
              className="sans"
              style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--taupe)", textDecoration: "none", textTransform: "uppercase" }}
            >
              @laurifybeauty
            </a>
          </div>
          <div style={{ borderRadius: "12px", overflow: "hidden" }}
            ref={(el) => { if (el && !el.querySelector("behold-widget")) { const w = document.createElement("behold-widget"); w.setAttribute("feed-id", "DHP5OeHgnKYnID01B0lS"); el.appendChild(w); } }}
          />
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

      {/* GOOGLE REVIEWS */}
      <section style={{ background: "var(--cream)", padding: "6rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="ornament sans">✦ &nbsp; Google Atsauksmes &nbsp; ✦</div>
            <div className="divider divider-center" />
          </div>
          <div className="elfsight-app-ae42c5ea-d37a-4cea-bf30-483fbe494c96" data-elfsight-app-lazy />
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
                      marginBottom: "0.9rem",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
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
              <p className="sans" style={{ fontSize: "0.85rem", lineHeight: 1.9, color: "var(--taupe)", marginBottom: "2.5rem" }}>
                {dict.contact.bookingDesc}
              </p>
              <button
                className="btn-primary"
                style={{ border: "none", width: "100%" }}
                onClick={() => setBookingOpen(true)}
              >
                {dict.contact.submitBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PLANDOK BOOKING MODAL */}
      {bookingOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setBookingOpen(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,31,72,0.7)", backdropFilter: "blur(6px)" }} />
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(10,31,72,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.5rem", borderBottom: "1px solid var(--beige)" }}>
              <span style={{ fontFamily: "'La Luxes Serif', serif", fontSize: "1.2rem", color: "var(--navy)", fontStyle: "italic" }}>Rezervēt vizīti</span>
              <button
                onClick={() => setBookingOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--taupe)", fontSize: "1.4rem", lineHeight: 1, padding: "0.2rem 0.4rem" }}
                aria-label="Aizvērt"
              >
                ×
              </button>
            </div>
            <iframe
              src="https://book.plandok.com/lv/partner/laurify-beauty-syreax"
              style={{ width: "100%", height: "600px", border: "none", display: "block" }}
              title="Laurify rezervācija"
            />
          </div>
        </div>
      )}

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
            gridTemplateColumns: "1fr",
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
                marginBottom: "1.5rem",
              }}
            >
              {dict.footer.tagline}
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                {
                  href: "https://www.instagram.com/laurifybeauty/",
                  label: "Instagram @laurifybeauty",
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/laurifybeauty.jelgava/",
                  label: "Instagram @laurifybeauty.jelgava",
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.facebook.com/laurifybeauty",
                  label: "Facebook",
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
              ].map(({ href, label, svg }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: "var(--cream)",
                    background: "rgba(245,244,228,0.1)",
                    border: "1px solid rgba(245,244,228,0.2)",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--navy)";
                    e.currentTarget.style.background = "var(--gold)";
                    e.currentTarget.style.borderColor = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--cream)";
                    e.currentTarget.style.background = "rgba(245,244,228,0.1)";
                    e.currentTarget.style.borderColor = "rgba(245,244,228,0.2)";
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

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
