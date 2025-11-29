import React, { useState } from "react";
import type { Language } from "../App";

type Status = "idle" | "sending" | "sent" | "error";

interface ContactProps {
  language: Language;
}

const copy = {
  en: {
    title: "Contact",
    subtitle:
      "If you liked my work and want to talk about a project, an opportunity or just say hi, feel free to reach out.",
    formTitle: "Send me a message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    buttonIdle: "Send message",
    buttonSending: "Sending...",
    buttonSent: "Message sent! Thanks 🙌",
    buttonError: "Something went wrong. Try again",
    helperText:
      "I usually respond within 1–2 business days. The message will go straight to my mailbox using AWS (API Gateway + Lambda + SES).",
  },
  es: {
    title: "Contacto",
    subtitle:
      "Si te gustó mi trabajo y quieres hablar sobre un proyecto, una oportunidad o simplemente saludar, conversemos.",
    formTitle: "Envíame un mensaje",
    nameLabel: "Nombre",
    emailLabel: "Email",
    messageLabel: "Mensaje",
    buttonIdle: "Enviar mensaje",
    buttonSending: "Enviando...",
    buttonSent: "¡Mensaje enviado! Gracias 🙌",
    buttonError: "Algo salió mal. Inténtalo nuevamente",
    helperText:
      "Suelo responder dentro de 1–2 días hábiles. El mensaje llega directo a mi correo usando AWS (API Gateway + Lambda + SES).",
  },
} as const;

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const [status, setStatus] = useState<Status>("idle");

  const t = copy[language] ?? copy.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const payload = {
      to: ["dnverco4@gmail.com"],
      subject: name
        ? `Nuevo mensaje desde el portafolio – ${name}`
        : "Nuevo mensaje desde el portafolio",
      htmlBody: `
          <h1>Nuevo mensaje desde el portafolio</h1>
          <p><strong>Nombre:</strong> ${name || "No indicado"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      textBody: `Nuevo mensaje desde el portafolio

Nombre: ${name || "No indicado"}
Email: ${email}

Mensaje:
${message}
        `,
    };

    try {
      const response = await fetch(
        "https://a9yhi89yij.execute-api.us-east-2.amazonaws.com/dev/mailing/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section__inner">
        <h2 className="section__title">{t.title}</h2>

        <div className="contact-grid">
          {/* Lado izquierdo: tarjeta con info y redes */}
          <div className="contact-card">
            <div className="contact-card__badge">Let&apos;s talk</div>
            <h3 className="contact-card__title">
              {language === "en"
                ? "Ready to build something great together?"
                : "¿Listo para construir algo increíble juntos?"}
            </h3>
            <p className="contact-card__subtitle">{t.subtitle}</p>

            <div className="contact-methods">
              <a
                className="contact-pill"
                href="https://wa.me/56967055892?text=Hola!%20Vi%20tu%20portafolio%20y%20quiero%20hablar."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-pill__icon" aria-hidden="true">
                  💬
                </span>
                <span className="contact-pill__text">
                  WhatsApp
                  <span className="contact-pill__hint">
                    {language === "en" ? "Quick chat" : "Respuesta rápida"}
                  </span>
                </span>
              </a>

              <a
                className="contact-pill"
                href="https://www.linkedin.com/in/carlos-felipe-alvarado-hernandez-64a2111ba"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-pill__icon" aria-hidden="true">
                  🔗
                </span>
                <span className="contact-pill__text">
                  LinkedIn
                  <span className="contact-pill__hint">
                    {language === "en"
                      ? "Let&apos;s connect"
                      : "Conectemos profesionalmente"}
                  </span>
                </span>
              </a>

              <a
                className="contact-pill"
                href="https://github.com/caAlvaradoh69"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-pill__icon" aria-hidden="true">
                  🐙
                </span>
                <span className="contact-pill__text">
                  GitHub
                  <span className="contact-pill__hint">
                    {language === "en"
                      ? "See some of my work"
                      : "Mira parte de mi código"}
                  </span>
                </span>
              </a>
            </div>

            <p className="contact-helper">{t.helperText}</p>
          </div>

          {/* Lado derecho: formulario */}
          <div className="contact-form-wrapper">
            <h3 className="contact-form__title">{t.formTitle}</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__field">
                <label htmlFor="name">{t.nameLabel}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={
                    language === "en"
                      ? "How should I call you?"
                      : "¿Cómo te llamas?"
                  }
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">{t.emailLabel}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={
                    language === "en"
                      ? "your@email.com"
                      : "tu-correo@example.com"
                  }
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">{t.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={
                    language === "en"
                      ? "Tell me about your idea, project or challenge."
                      : "Cuéntame de tu idea, proyecto o desafío."
                  }
                />
              </div>

              <button
                type="submit"
                className="button-primary contact-form__button"
                disabled={status === "sending"}
              >
                {status === "idle" && t.buttonIdle}
                {status === "sending" && t.buttonSending}
                {status === "sent" && t.buttonSent}
                {status === "error" && t.buttonError}
              </button>

              {status === "error" && (
                <p className="contact-form__status contact-form__status--error">
                  {language === "en"
                    ? "There was an error sending your message. Please try again."
                    : "Hubo un error al enviar tu mensaje. Intenta nuevamente."}
                </p>
              )}
              {status === "sent" && (
                <p className="contact-form__status contact-form__status--success">
                  {language === "en"
                    ? "All good! Your message is already in my inbox."
                    : "¡Listo! Tu mensaje ya está en mi bandeja de entrada."}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
