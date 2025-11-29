import React from "react";
import { experience } from "../data/experience";
import type { Language } from "../App";

interface ExperienceProps {
  language: Language;
}

const copy = {
  en: {
    title: "Experience",
    subtitle: "Recent roles and the kind of work I’ve been doing.",
  },
  es: {
    title: "Experiencia",
    subtitle: "Roles recientes y el tipo de trabajo que he estado haciendo.",
  },
} as const;

export const Experience: React.FC<ExperienceProps> = ({ language }) => {
  const t = copy[language] ?? copy.en;

  return (
    <section className="section" id="experience">
      <div className="section__inner">
        <h2 className="section__title">{t.title}</h2>
        <p className="section__subtitle">{t.subtitle}</p>
        <div style={{ display: "grid", gap: 16 }}>
          {experience.map((exp) => (
            <article key={exp.company} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 15,
                      margin: 0,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      margin: 0,
                      color: "var(--text-muted)",
                    }}
                  >
                    {exp.company}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                {language === "en" ? exp.summaryEn : exp.summaryEs}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {exp.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
