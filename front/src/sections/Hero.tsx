import React from "react";
import type { Language } from "../App";

interface HeroProps {
  language: Language;
}

const copy = {
  en: {
    badge: "Available for remote & hybrid roles",
    titleLine1: "Hi, I'm Carlos",
    titleLine2: "Full-Stack Developer",
    pill: "5+ years building web & mobile apps",
    subtitle:
      "I design and build scalable products using React, Node.js, Java / Spring Boot and AWS. I love clean UIs, good DX and automating workflows.",
    primaryCta: "Let's talk",
    secondaryCta: "Download CV (coming soon)",
    location:
      "Santiago, Chile · Currently focused on mailing, microservices and AI-powered automation.",
    currentlyWorkingOn: "Currently working on",
    currentlyWorkingTitle: "Mailing platform · Microservices · AI assistants",
  },
  es: {
    badge: "Disponible para roles remotos e híbridos",
    titleLine1: "Hola, soy Carlos",
    titleLine2: "Desarrollador Full-Stack",
    pill: "5+ años construyendo apps web y mobile",
    subtitle:
      "Diseño y desarrollo productos escalables usando React, Node.js, Java / Spring Boot y AWS. Me preocupan las UIs limpias, la DX y la automatización.",
    primaryCta: "Conversemos",
    secondaryCta: "Descargar CV (pronto)",
    location:
      "Santiago, Chile · Trabajando con mailing, microservicios y soluciones AI para automatizar procesos.",
    currentlyWorkingOn: "Actualmente enfocado en",
    currentlyWorkingTitle:
      "Plataforma de mailing · Microservicios · Asistentes con IA",
  },
} as const;

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = copy[language] ?? copy.en;

  const handleContactClick = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section" id="hero">
      <div
        className="section__inner"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2.3fr)",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* Texto principal */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148, 163, 184, 0.4)",
              background: "rgba(15,23,42,0.85)",
              backdropFilter: "blur(14px)",
              fontSize: 11,
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#22c55e",
                boxShadow: "0 0 14px rgba(34,197,94,0.9)",
              }}
            />
            <span>{t.badge}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 4vw, 2.9rem)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span>{t.titleLine1}</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(120deg, #38bdf8, #a855f7, #f97316)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.titleLine2}
            </span>
          </h1>

          <p
            style={{
              marginTop: 16,
              marginBottom: 18,
              fontSize: 14,
              color: "var(--text-muted)",
              maxWidth: 520,
            }}
          >
            {t.subtitle}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <button
              type="button"
              onClick={handleContactClick}
              className="button-primary"
              style={{ paddingInline: 18 }}
            >
              {t.primaryCta}
            </button>
            <button
              type="button"
              className="button-secondary"
              style={{ borderRadius: 999 }}
            >
              {t.secondaryCta}
            </button>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.5)",
              background: "rgba(15,23,42,0.9)",
              fontSize: 11,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,0.5)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at 30% 20%, #38bdf8, #0f172a)",
              }}
            >
              {/* Mini avatar circular */}
              🐱
            </span>
            <span>{t.pill}</span>
          </div>
        </div>

        {/* Tarjeta con foto al estilo Alex Stark */}
        <div
          style={{
            justifySelf: "center",
            width: "100%",
            maxWidth: 340,
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "999px",
              padding: 4,
              background:
                "conic-gradient(from 160deg, #22c55e, #38bdf8, #a855f7, #22c55e)",
            }}
          >
            <div
              className="card"
              style={{
                borderRadius: "999px",
                padding: 22,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "999px",
                  margin: "0 auto 14px",
                  background:
                    "radial-gradient(circle at 30% 20%, #38bdf8, #0f172a 55%, #22c55e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                }}
              >
                <img
                  src="/images/profile.jpeg"
                  alt="Perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "999px",
                  }}
                />
              </div>
              <h2 style={{ fontSize: 18, marginBottom: 4 }}>Carlos Alvarado</h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                React · Node · Spring Boot · AWS
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                {t.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
