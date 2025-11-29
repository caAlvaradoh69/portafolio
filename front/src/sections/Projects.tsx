import React from "react";
import { projects } from "../data/projects";
import type { Language } from "../App";

interface ProjectsProps {
  language: Language;
}

const copy = {
  en: {
    title: "Featured projects",
    subtitle: "A sample of things I’ve built recently.",
    seeMore: "See more →",
  },
  es: {
    title: "Proyectos destacados",
    subtitle: "Una muestra de lo que he construido recientemente.",
    seeMore: "Ver más →",
  },
} as const;

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const t = copy[language] ?? copy.en;

  return (
    <section className="section" id="projects">
      <div className="section__inner">
        <h2 className="section__title">{t.title}</h2>
        <p className="section__subtitle">{t.subtitle}</p>

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {projects.map((project) => (
            <article key={project.nameEs} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
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
                    {language === "en" ? project.nameEn : project.nameEs}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                {language === "en"
                  ? project.descriptionEn
                  : project.descriptionEs}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {project.tags?.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12,
                      color: "var(--primary)",
                    }}
                  >
                    {t.seeMore}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
