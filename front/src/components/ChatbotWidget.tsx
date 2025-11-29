import React, { useState } from "react";
import type { Language } from "../App";

type Sender = "user" | "bot";

interface Message {
  id: number;
  from: Sender;
  text: string;
}

interface ChatbotWidgetProps {
  language: Language;
}

const CHATBOT_API_URL =
  "https://a9yhi89yij.execute-api.us-east-2.amazonaws.com/dev/chatbot";

const initialMessages: Record<Language, Message[]> = {
  en: [
    {
      id: 1,
      from: "bot",
      text: "Hi! I'm Carlos's assistant. I can tell you about his experience, stack and projects. What would you like to know?",
    },
  ],
  es: [
    {
      id: 1,
      from: "bot",
      text: "¡Hola! Soy el asistente de Carlos. Puedo contarte sobre su experiencia, stack y proyectos. ¿Qué te gustaría saber?",
    },
  ],
};

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    initialMessages[language] ?? initialMessages.en
  );
  const [input, setInput] = useState("");

  // Si el usuario cambia el idioma mientras el chat está vacío, reseteamos el mensaje inicial
  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages(initialMessages[language] ?? initialMessages.en);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "user",
      text: question,
    };

    // Mensaje temporal de "pensando..."
    const loadingId = Date.now() + 1;
    const loadingMessage: Message = {
      id: loadingId,
      from: "bot",
      text:
        language === "en"
          ? "Let me think about that for a second… 🤔"
          : "Déjame pensar un segundo… 🤔",
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");

    // Llamada real al backend IA
    const reply = await askBackend(question, language);

    // Reemplazamos el mensaje de “pensando” por la respuesta real
    setMessages((prev) =>
      prev.map((m) => (m.id === loadingId ? { ...m, text: reply } : m))
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const t = language === "en" ? enCopy : esCopy;

  return (
    <>
      <button
        type="button"
        className="chatbot-button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={t.buttonAriaLabel}
      >
        <span className="chatbot-button__icon" aria-hidden="true">
          🤖
        </span>
        <span className="chatbot-button__label">{t.buttonLabel}</span>
      </button>

      {isOpen && (
        <section className="chatbot-panel" aria-label={t.panelAriaLabel}>
          <header className="chatbot-panel__header">
            <div>
              <p className="chatbot-panel__title">{t.headerTitle}</p>
              <p className="chatbot-panel__subtitle">{t.headerSubtitle}</p>
            </div>
            <button
              type="button"
              className="chatbot-panel__close"
              onClick={handleToggle}
              aria-label={t.closeAriaLabel}
            >
              ✕
            </button>
          </header>

          <div className="chatbot-panel__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "user"
                    ? "chatbot-message chatbot-message--user"
                    : "chatbot-message chatbot-message--bot"
                }
              >
                <div className="chatbot-message__bubble">{message.text}</div>
              </div>
            ))}
          </div>

          <form className="chatbot-panel__form" onSubmit={handleSubmit}>
            <input
              className="chatbot-panel__input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
            />
            <button
              type="submit"
              className="chatbot-panel__submit"
              disabled={!input.trim()}
            >
              {t.sendLabel}
            </button>
          </form>
        </section>
      )}
    </>
  );
};

const enCopy = {
  buttonLabel: "Ask my AI assistant",
  buttonAriaLabel: "Open AI assistant chat",
  panelAriaLabel: "Chat with Carlos's AI assistant",
  headerTitle: "AI Assistant",
  headerSubtitle: "Ask about my stack, projects or experience.",
  closeAriaLabel: "Close chat",
  inputPlaceholder: "Ask something about my skills, projects, stack...",
  sendLabel: "Send",
} as const;

const esCopy = {
  buttonLabel: "Habla con mi asistente IA",
  buttonAriaLabel: "Abrir chat del asistente IA",
  panelAriaLabel: "Chat con el asistente IA de Carlos",
  headerTitle: "Asistente IA",
  headerSubtitle: "Pregúntame sobre mi stack, proyectos o experiencia.",
  closeAriaLabel: "Cerrar chat",
  inputPlaceholder: "Pregunta algo sobre mi experiencia, proyectos o stack...",
  sendLabel: "Enviar",
} as const;

// ==== Lógica de backend + fallback local ====

async function askBackend(
  question: string,
  language: Language
): Promise<string> {
  try {
    const res = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        language,
      }),
    });

    if (!res.ok) {
      console.error("Chatbot backend error:", res.status, res.statusText);
      // Fallback a respuesta local
      return getBotReply(question, language);
    }

    let data = await res.json();
    data = JSON.parse(data.body);
    if (data && typeof data.reply === "string") {
      return data.reply;
    }

    // Fallback si la forma del JSON no es la esperada
    return getBotReply(question, language);
  } catch (error) {
    console.error("Chatbot backend exception:", error);
    // Fallback a respuesta local
    return getBotReply(question, language);
  }
}

function getBotReply(question: string, language: Language): string {
  const q = question.toLowerCase();

  const answers = language === "en" ? enAnswers : esAnswers;

  if (q.includes("stack") || q.includes("tech") || q.includes("tecnolog")) {
    return answers.stack;
  }
  if (
    q.includes("experience") ||
    q.includes("experiencia") ||
    q.includes("años")
  ) {
    return answers.experience;
  }
  if (
    q.includes("project") ||
    q.includes("proyecto") ||
    q.includes("portfolio") ||
    q.includes("portafolio")
  ) {
    return answers.projects;
  }
  if (q.includes("aws")) {
    return answers.aws;
  }
  if (
    q.includes("contact") ||
    q.includes("contacto") ||
    q.includes("linkedin") ||
    q.includes("email")
  ) {
    return answers.contact;
  }

  return answers.fallback;
}

const enAnswers = {
  stack:
    "I mainly work with React/Next.js, Node.js, Spring Boot, TypeScript, PostgreSQL/Oracle and AWS services like Lambda, API Gateway, SQS and SES.",
  experience:
    "I have around 5 years of experience building web and mobile apps, integrating cloud services and lately AI tools (LLMs, chatbots and Python automations).",
  projects:
    "In this portfolio you can see projects related to scalable mailing platforms, Outlook-style email clients in Next.js, microservices with Spring Boot and data automations with Python.",
  aws: "I use AWS for mailing (SES), queues (SQS), Lambdas behind API Gateway and other services to build scalable backends.",
  contact:
    "You can contact me through the contact section of this portfolio, where you'll find my WhatsApp and LinkedIn links.",
  fallback:
    "I am a first prototype of Carlos's assistant. Try asking about his stack, years of experience, AWS work or a specific project in the portfolio.",
} as const;

const esAnswers = {
  stack:
    "Trabajo principalmente con React/Next.js, Node.js, Spring Boot, TypeScript, PostgreSQL/Oracle y servicios de AWS como Lambda, API Gateway, SQS y SES.",
  experience:
    "Tengo alrededor de 5 años de experiencia desarrollando aplicaciones web y mobile, integrando servicios en la nube y, últimamente, herramientas de IA (LLMs, chatbots y automatización con Python).",
  projects:
    "En este portafolio puedes ver proyectos de plataformas de mailing escalable, clientes tipo Outlook en Next.js, microservicios con Spring Boot y automatizaciones de datos con Python.",
  aws: "Uso AWS para el envío de correos (SES), colas (SQS), Lambdas detrás de API Gateway y otros servicios para construir backends escalables.",
  contact:
    "Puedes contactarme desde la sección de contacto de este portafolio, donde encontrarás enlaces a mi WhatsApp y LinkedIn.",
  fallback:
    "Soy un primer prototipo del asistente de Carlos. Intenta preguntarme por su stack, años de experiencia, trabajo con AWS o algún proyecto del portafolio.",
} as const;
