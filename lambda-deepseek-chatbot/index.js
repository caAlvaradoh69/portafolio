const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;


export const handler = async (event) => {
  try {
    console.log(event);
    
    // const body = JSON.parse(event || "{}");
    const { message, language = "es" } = event;

    if (!message || typeof message !== "string") {
      return jsonResponse(400, { error: "El campo 'message' es requerido" });
    }

    const systemPrompt =
      language === "en"
        ? "You are an AI assistant embedded in Carlos's developer portfolio. Answer ONLY about his experience, tech stack, AWS work, mailing platform projects and related topics. Be concise and friendly."
        : "Eres un asistente IA embebido en el portafolio de Carlos. Responde SOLO sobre su experiencia, stack tecnológico, trabajo con AWS, proyectos de mailing y temas relacionados. Sé conciso y cercano.";

    // Llamada al endpoint /chat/completions de DeepSeek
    const dsResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!dsResponse.ok) {
      const errorText = await dsResponse.text();
      console.error("DeepSeek API error:", dsResponse.status, errorText);

      const fallback =
        language === "en"
          ? "There was a problem contacting the AI service. Please try again later."
          : "Hubo un problema al contactar el servicio de IA. Intenta nuevamente más tarde.";

      return jsonResponse(502, { reply: fallback });
    }

    const data = await dsResponse.json();

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      (language === "en"
        ? "I couldn't generate a proper answer, sorry."
        : "No pude generar una respuesta adecuada, lo siento.");

    return jsonResponse(200, { reply });
  } catch (err) {
    console.error("Lambda error:", err);

    const fallback =
      language === "en"
        ? "Unexpected error on the server."
        : "Error inesperado en el servidor.";

    return jsonResponse(500, { reply: fallback });
  }
};

function jsonResponse(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      // CORS para permitir que tu front llame a esta API
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(bodyObj),
  };
}