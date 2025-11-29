export interface Project {
  name: string;
  period?: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
  highlight?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    name: "Plataforma de Mailing Escalable",
    period: "2024 — Actualidad",
    descriptionEs:
      "Servicio de mailing modular basado en microservicios, preparado para manejar envíos masivos y por demanda, con colas SQS, AWS SES y monitoreo de métricas clave.",
    descriptionEn:
      "Modular mailing platform built on microservices, ready for bulk and on-demand sending, using SQS queues, AWS SES and monitoring for key delivery metrics.",
    tags: ["Spring Boot", "AWS SES", "SQS", "PostgreSQL", "Docker"],
  },
  {
    name: "Integraciones para Seguros",
    descriptionEs:
      "APIs y servicios que conectan distintas fuentes de datos (polizas, cotizaciones, clientes) para simplificar el flujo entre brokers, aseguradoras y sistemas internos.",
    descriptionEn:
      "APIs and services that connect different data sources (policies, quotes, customers) to simplify the flow between brokers, insurers and internal systems.",
    tags: ["Java", "Spring Boot", "Oracle", "REST APIs"],
  },
  {
    name: "Automatización de Procesos con Python y AWS",
    descriptionEs:
      "Scripts y lambdas en Python para limpiar datos, generar reportes y automatizar tareas repetitivas, reduciendo trabajo manual y errores operativos.",
    descriptionEn:
      "Python scripts and AWS Lambdas to clean data, generate reports and automate repetitive tasks, reducing manual work and operational errors.",
    tags: ["Python", "AWS Lambda", "DynamoDB"],
  },
  {
    name: "Cliente Web tipo Outlook en Next.js",
    descriptionEs:
      "Interfaz de correo inspirada en Outlook Web, construida en Next.js y pensada para integrarse con APIs de mailing propias. Diseño responsive, filtros, búsqueda y bandejas personalizadas.",
    descriptionEn:
      "Outlook Web–inspired mail client built with Next.js, designed to plug into custom mailing APIs. Responsive layout with filters, search and custom folders.",
    tags: ["Next.js", "React", "Tailwind", "UI/UX"],
  },
  {
    name: "Chatbots con LLMs y Python",
    descriptionEs:
      "Bots conversacionales conectados a datos internos utilizando LLMs, orientados a automatizar respuestas frecuentes y procesos internos de soporte.",
    descriptionEn:
      "Conversational bots connected to internal data using LLMs, focused on automating FAQs and internal support workflows.",
    tags: ["Python", "LLMs", "AWS Lambda"],
  },
];