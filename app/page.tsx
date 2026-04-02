"use client";

import { useState, useEffect, useRef } from "react";

const services = [
  {
    title: "Signature Facial",
    description:
      "A bespoke treatment tailored to your skin's unique needs, using rare botanical extracts and gold-infused serums.",
    duration: "90 min",
    price: "€185",
    icon: "✦",
  },
  {
    title: "Precision Hair Artistry",
    description:
      "Cut, color, and style curated by our master colorists trained in Parisian ateliers.",
    duration: "120 min",
    price: "€240",
    icon: "✦",
  },
  {
    title: "Ritual Body Sculpt",
    description:
      "A full-body contouring experience combining deep-tissue techniques with warm amber oil therapy.",
    duration: "75 min",
    price: "€160",
    icon: "✦",
  },
  {
    title: "Lash & Brow Design",
    description:
      "Architectural precision meets softness — defining your gaze with an artist's eye.",
    duration: "60 min",
    price: "€95",
    icon: "✦",
  },
  {
    title: "Bridal Atelier",
    description:
      "An all-day luxury preparation ritual for your most important chapter, tailored from first consultation to final veil.",
    duration: "Full Day",
    price: "€890",
    icon: "✦",
  },
  {
    title: "The Laurify Ritual",
    description:
      "Our signature three-hour immersive experience — face, body, and spirit restored in sequence.",
    duration: "180 min",
    price: "€380",
    icon: "✦",
  },
];

const testimonials = [
  {
    quote:
      "Laurify is unlike any salon I have visited in Europe. The quiet luxury, the attention to every micro-detail — I felt sculpted, not just styled.",
    name: "Isabelle M.",
    role: "Fashion Director, Paris",
    initials: "IM",
  },
  {
    quote:
      "My skin has never looked this way before. The Signature Facial changed how I understand self-care. I will not go anywhere else.",
    name: "Elara V.",
    role: "Entrepreneur, Riga",
    initials: "EV",
  },
  {
    quote:
      "From the moment I walked in, everything was considered. The scent, the light, the touch. This is what true luxury feels like.",
    name: "Natasha R.",
    role: "Interior Designer, Stockholm",
    initials: "NR",
  },
];

export default function LaurifyHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const navScrolled = scrollY > 60;

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        backgroundColor: "#FDFAF6",
        color: "#0D1B2A",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #FDFAF6;
          --beige: #EDE3D3;
          --beige-mid: #D6C9B6;
          --navy: #0D1B2A;
          --navy-mid: #1A2E42;
          --gold: #C5A97A;
          --gold-light: #E8D5B0;
          --white: #FFFFFF;
        }

        html { scroll-behavior: smooth; }

        .sans { font-family: 'Jost', sans-serif; }

        .nav-link {
          font-family: 'Jost', sans-serif;
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
          font-family: 'Jost', sans-serif;
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
          font-family: 'Jost', sans-serif;
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
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(253,250,246,0.4);
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
        }
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--navy);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s ease;
          z-index: 0;
        }
        .service-card:hover::before { transform: scaleY(1); }
        .service-card:hover { border-color: var(--navy); }
        .service-card:hover .card-content { color: var(--cream); }
        .service-card:hover .card-price { color: var(--gold-light); }
        .service-card:hover .card-icon { color: var(--gold); }
        .card-content { position: relative; z-index: 1; transition: color 0.4s; }
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
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          color: var(--navy);
          outline: none;
          transition: border-color 0.3s;
          margin-bottom: 1rem;
        }
        input::placeholder, textarea::placeholder { color: #9aa0a6; }
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
          background: navScrolled ? "rgba(253,250,246,0.97)" : "transparent",
          borderBottom: navScrolled ? "1px solid var(--beige)" : "none",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 300,
            letterSpacing: "0.15em",
            color: navScrolled ? "var(--navy)" : "var(--cream)",
          }}
        >
          LAURIFY
        </div>

        <div
          className="mobile-hidden"
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
        >
          {["Services", "About", "Testimonials", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              style={{ color: navScrolled ? "var(--navy)" : "var(--cream)" }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-link"
            style={{
              color: navScrolled ? "var(--navy)" : "var(--cream)",
              border: `1px solid ${navScrolled ? "var(--navy)" : "rgba(253,250,246,0.5)"}`,
              padding: "0.55rem 1.4rem",
            }}
          >
            Book Now
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
          background: `linear-gradient(160deg, var(--navy) 0%, #1A2E42 50%, #243347 100%)`,
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
            backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(197,169,122,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(197,169,122,0.08) 0%, transparent 50%)`,
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
              "linear-gradient(to bottom, transparent, rgba(197,169,122,0.4), transparent)",
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
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(12rem, 18vw, 22rem)",
            fontWeight: 300,
            color: "rgba(197,169,122,0.06)",
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
          <div className="hero-animate ornament sans" style={{ color: "var(--gold)" }}>
            ✦ &nbsp; Luxury Beauty Atelier &nbsp; ✦
          </div>

          <h1
            className="hero-animate-delay hero-headline"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--cream)",
              marginTop: "1.5rem",
              maxWidth: "700px",
              fontStyle: "italic",
            }}
          >
            Where Beauty
            <br />
            <span style={{ fontStyle: "normal", fontWeight: 500 }}>
              Becomes Art
            </span>
          </h1>

          <p
            className="hero-animate-delay-2 sans"
            style={{
              fontSize: "0.9rem",
              fontWeight: 300,
              letterSpacing: "0.05em",
              lineHeight: 1.9,
              color: "rgba(237,227,211,0.75)",
              marginTop: "1.8rem",
              maxWidth: "400px",
            }}
          >
            An intimate sanctuary where every ritual is composed with intention.
            Experience beauty redefined through precision, care, and artistry.
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
              Reserve Your Visit
            </a>
            <a href="#services" className="btn-light">
              Explore Services
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
              ["10+", "Years of Artistry"],
              ["2,400+", "Clients Served"],
              ["4.98", "Average Rating"],
            ].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.2rem",
                    fontWeight: 300,
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
                    color: "rgba(237,227,211,0.5)",
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
            color: "rgba(237,227,211,0.4)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Scroll</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(237,227,211,0.4), transparent)",
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
            <div className="ornament sans">✦ &nbsp; Our Offerings &nbsp; ✦</div>
            <div className="divider divider-center" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.15,
                color: "var(--navy)",
              }}
            >
              Curated Services
            </h2>
            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "#5a6472",
                marginTop: "1rem",
                maxWidth: "440px",
                margin: "1rem auto 0",
                lineHeight: 1.8,
              }}
            >
              Each treatment is a considered experience — from the first touch to the final flourish.
            </p>
          </div>

          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5px",
              background: "var(--beige-mid)",
            }}
          >
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="card-content">
                  <span className="card-icon">{service.icon}</span>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      marginBottom: "0.8rem",
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
                      marginBottom: "1.5rem",
                    }}
                  >
                    {service.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid rgba(197,169,122,0.3)",
                      paddingTop: "1rem",
                    }}
                  >
                    <span
                      className="sans card-price"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 300,
                        color: "var(--gold)",
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
              Book a Treatment
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
            background: "radial-gradient(circle, rgba(197,169,122,0.06) 0%, transparent 70%)",
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
              ✦ &nbsp; Our Philosophy &nbsp; ✦
            </div>
            <div className="divider" style={{ background: "var(--gold)" }} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: "var(--cream)",
                marginBottom: "1.8rem",
              }}
            >
              Beauty as a
              <br />
              <span style={{ fontStyle: "normal", fontWeight: 500 }}>
                Daily Ceremony
              </span>
            </h2>

            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.95,
                color: "rgba(237,227,211,0.65)",
                marginBottom: "1.2rem",
              }}
            >
              Laurify was founded on the belief that beauty is not a correction —
              it is a revelation. Our atelier was created as a counterpoint to
              the rushed, transactional salon experience. Here, time slows.
            </p>
            <p
              className="sans"
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.95,
                color: "rgba(237,227,211,0.65)",
                marginBottom: "2.5rem",
              }}
            >
              Each practitioner holds a minimum of 8 years of specialist
              training. We source only the finest European and botanical
              ingredients, and every appointment is preceded by a personal
              consultation.
            </p>

            <a href="#contact" className="btn-light">
              Our Story
            </a>
          </div>

          <div style={{ position: "relative" }}>
            {/* Decorative image placeholder with pattern */}
            <div
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, #1A2E42 0%, #243347 100%)",
                border: "1px solid rgba(197,169,122,0.25)",
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
                  border: "1px solid rgba(197,169,122,0.15)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "3.5rem",
                  border: "1px solid rgba(197,169,122,0.08)",
                }}
              />
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "5rem",
                    fontWeight: 300,
                    color: "rgba(197,169,122,0.3)",
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
                    color: "rgba(197,169,122,0.4)",
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
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 300,
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
                Natural Botanicals
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
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(10rem, 20vw, 24rem)",
            fontWeight: 300,
            color: "rgba(13,27,42,0.03)",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          "
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <div className="ornament sans">✦ &nbsp; Client Words &nbsp; ✦</div>
          <div className="divider divider-center" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--navy)",
              marginBottom: "4rem",
            }}
          >
            What Our Guests Say
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
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "var(--navy)",
                transition: "all 0.6s ease",
              }}
            >
              "{testimonials[activeTestimonial].quote}"
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
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem",
                color: "var(--gold)",
                marginBottom: "0.8rem",
              }}
            >
              {testimonials[activeTestimonial].initials}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
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
                color: "#7a8490",
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
            <div className="ornament sans">✦ &nbsp; Reserve Your Visit &nbsp; ✦</div>
            <div className="divider divider-center" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--navy)",
              }}
            >
              Begin Your Ritual
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
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--navy)",
                  marginBottom: "1.5rem",
                }}
              >
                Contact & Hours
              </h3>

              {[
                {
                  label: "Address",
                  value: "12 Elizabetes iela, Riga, LV-1010",
                },
                { label: "Phone", value: "+371 67 123 456" },
                { label: "Email", value: "hello@laurify.com" },
                {
                  label: "Hours",
                  value: "Mon–Sat: 9:00–20:00\nSun: 10:00–17:00",
                },
              ].map(({ label, value }) => (
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
                      fontWeight: 300,
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
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--navy)",
                  marginBottom: "1.5rem",
                }}
              >
                Send a Message
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Phone Number" />
              <select
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  border: "1px solid var(--beige-mid)",
                  background: "transparent",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.85rem",
                  color: "#5a6472",
                  outline: "none",
                  marginBottom: "1rem",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled selected>Select a Service</option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>{s.title}</option>
                ))}
              </select>
              <textarea placeholder="Any additional notes or requests..." />

              <button className="btn-primary" style={{ width: "100%", border: "none" }}>
                Submit Request
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
          borderTop: "1px solid rgba(197,169,122,0.15)",
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
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                letterSpacing: "0.15em",
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
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(237,227,211,0.45)",
                maxWidth: "220px",
              }}
            >
              An intimate luxury beauty atelier in the heart of Riga. Beauty as a ceremony.
            </p>
          </div>

          {[
            {
              title: "Services",
              links: ["Signature Facial", "Hair Artistry", "Body Sculpt", "Bridal Atelier"],
            },
            {
              title: "Atelier",
              links: ["Our Story", "The Team", "Press", "Gift Cards"],
            },
            {
              title: "Follow",
              links: ["Instagram", "Pinterest", "LinkedIn", "Newsletter"],
            },
          ].map(({ title, links }) => (
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
                      fontWeight: 300,
                      color: "rgba(237,227,211,0.45)",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,227,211,0.45)")}
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
            borderTop: "1px solid rgba(197,169,122,0.1)",
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
              color: "rgba(237,227,211,0.3)",
            }}
          >
            © 2026 Laurify. All rights reserved.
          </span>
          <span
            className="sans"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "rgba(237,227,211,0.3)",
            }}
          >
            Privacy · Terms · Cookie Policy
          </span>
        </div>
      </footer>
    </div>
  );
}