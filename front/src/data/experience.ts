export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summaryEs: string;
  summaryEn: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "DNVR.co",
    role: "CTO / Full-Stack & Cloud Engineer",
    period: "2022 — Actualidad",
    summaryEs:
      "Diseño e implementación de un servicio de mailing escalable, integrando AWS SES/SQS, microservicios en Spring Boot y frontends en React/Next.js. También he liderado la incorporación de LLMs y chatbots para automatizar soporte y flujos internos.",
    summaryEn:
      "Design and implementation of a scalable mailing platform, integrating AWS SES/SQS, Spring Boot microservices and React/Next.js frontends. I also led the adoption of LLMs and chatbots to automate support and internal workflows.",
    stack: ["React", "Next.js", "Spring Boot", "AWS", "LLMs", "PostgreSQL"],
  },
  {
    company: "Otros proyectos y clientes",
    role: "Full-Stack Developer",
    period: "2019 — 2022",
    summaryEs:
      "Desarrollo de aplicaciones web y móviles, APIs REST y automatización de procesos usando React, Node.js y Python. Experiencia trabajando con bases de datos relacionales y no relacionales en distintos entornos de cliente.",
    summaryEn:
      "Development of web and mobile applications, REST APIs and process automation using React, Node.js and Python. Experience working with relational and non-relational databases across different client environments.",
    stack: ["React", "Node.js", "Python", "Oracle", "MongoDB"],
  },
];