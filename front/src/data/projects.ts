export interface Project {
  nameEs: string;
  nameEn: string;
  period?: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
  highlight?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    nameEs: "Plataforma de Mailing Escalable",
    nameEn: "Mailing Platform",
    period: "2024 — Actualidad",
    descriptionEs:
      "Servicio de mailing modular basado en microservicios, preparado para manejar envíos masivos y por demanda, con colas SQS, AWS SES y monitoreo de métricas clave.",
    descriptionEn:
      "Modular mailing platform built on microservices, ready for bulk and on-demand sending, using SQS queues, AWS SES and monitoring for key delivery metrics.",
    tags: ["Spring Boot", "AWS SES", "SQS", "PostgreSQL", "Docker"],
  },
  {
    nameEs: "Integraciones para Seguros",
    nameEn: "Integrations for insurance company",
    descriptionEs:
      "APIs y servicios que conectan distintas fuentes de datos (polizas, cotizaciones, clientes) para simplificar el flujo entre brokers, aseguradoras y sistemas internos.",
    descriptionEn:
      "APIs and services that connect different data sources (policies, quotes, customers) to simplify the flow between brokers, insurers and internal systems.",
    tags: ["Java", "Spring Boot", "Oracle", "REST APIs"],
  },
  {
    nameEs: "Automatización de Procesos con Python y AWS",
    nameEn: "Workflows using Python and AWS",
    descriptionEs:
      "Scripts y lambdas en Python para limpiar datos, generar reportes y automatizar tareas repetitivas, reduciendo trabajo manual y errores operativos.",
    descriptionEn:
      "Python scripts and AWS Lambdas to clean data, generate reports and automate repetitive tasks, reducing manual work and operational errors.",
    tags: ["Python", "AWS Lambda", "DynamoDB"],
  },
  {
    nameEs: "Cliente Web tipo Outlook en Next.js",
    nameEn: "Mailing web client",
    descriptionEs:
      "Interfaz de correo inspirada en Outlook Web, construida en Next.js y pensada para integrarse con APIs de mailing propias. Diseño responsive, filtros, búsqueda y bandejas personalizadas.",
    descriptionEn:
      "Outlook Web–inspired mail client built with Next.js, designed to plug into custom mailing APIs. Responsive layout with filters, search and custom folders.",
    tags: ["Next.js", "React", "Tailwind", "UI/UX"],
  },
  {
    nameEs: "Integraciones con IA",
    nameEn: "AI tools, integrations",
    descriptionEs:
      "Bots conversacionales conectados a datos internos utilizando LLMs, orientados a automatizar respuestas frecuentes y procesos internos de soporte.",
    descriptionEn:
      "Conversational bots connected to internal data using LLMs, focused on automating FAQs and internal support workflows.",
    tags: ["Python", "LLMs", "AWS Lambda"],
  },
];