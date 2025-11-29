import React from "react";
import type { Language } from "../App";

interface AboutProps {
  language: Language;
}

const copy = {
  en: {
    title: "About me",
    subtitle: "A bit of context on who I am and how I like to work.",
    paragraph1:
      "I'm a full-stack developer from Chile, with a strong focus on building products end‑to‑end: from the data model and APIs to the UI and deployment on AWS.",
    paragraph2:
      "I enjoy working closely with stakeholders, understanding real problems and iterating quickly. My sweet spot is mixing clean code, good UX, and automation.",
    listTitle: "What I’ve been focusing on lately",
    items: [
      "Mailing platforms and communication workflows at scale.",
      "Microservices in Java / Spring Boot and Node.js with clean, testable architecture.",
      "AWS: Lambda, API Gateway, SES, SQS and other services to keep infra lean and cost‑efficient.",
      "Integrating AI assistants and chatbots into existing products.",
    ],
  },
  es: {
    title: "Sobre mí",
    subtitle: "Un poco de contexto sobre quién soy y cómo trabajo.",
    paragraph1:
      "Soy desarrollador full‑stack de Chile, con foco en construir productos de punta a punta: desde el modelo de datos y APIs hasta la interfaz y el despliegue en AWS.",
    paragraph2:
      "Me gusta trabajar cerca del negocio, entender problemas reales y iterar rápido. Mi zona cómoda está entre código limpio, buena UX y automatización.",
    listTitle: "En qué he estado enfocado últimamente",
    items: [
      "Plataformas de mailing y flujos de comunicación a escala.",
      "Microservicios en Java / Spring Boot y Node.js con arquitectura limpia y testeable.",
      "AWS: Lambda, API Gateway, SES, SQS y otros servicios para mantener la infraestructura simple y eficiente en costos.",
      "Integrar asistentes y chatbots con IA en productos existentes.",
    ],
  },
} as const;

export const About: React.FC<AboutProps> = ({ language }) => {
  const t = copy[language] ?? copy.en;

  return (
    <section className="section" id="about">
      <div className="section__inner">
        <h2 className="section__title">{t.title}</h2>
        <p className="section__subtitle">{t.subtitle}</p>
        <div
          className="card"
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>{t.paragraph1}</p>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>{t.paragraph2}</p>

          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              {t.listTitle}
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text-muted)",
              }}
            >
              {t.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
