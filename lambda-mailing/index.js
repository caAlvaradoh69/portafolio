// index.mjs
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.SES_REGION || process.env.AWS_REGION || "us-east-1",
});

export const handler = async (event) => {
  console.log("Event recibido:", JSON.stringify(event));

  // Si viene de API Gateway HTTP API, el body normalmente es string
  let payload;
  try {
    payload = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch (e) {
    console.error("Error parseando body:", e);
    return response(400, { message: "Body inválido (no es JSON)" });
  }

  const defaultFrom = process.env.DEFAULT_FROM; // ej: no-reply@tudominio.com

  const {
    from,
    to,
    subject,
    htmlBody,
    textBody,
  } = payload || {};

  const finalFrom = from || defaultFrom;

  if (!finalFrom || !to || !subject || (!htmlBody && !textBody)) {
    return response(400, {
      message: "Faltan campos obligatorios: from/defaultFrom, to, subject, htmlBody o textBody",
    });
  }

  const toAddresses = Array.isArray(to) ? to : [to];

  const params = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        ...(textBody && { Text: { Data: textBody, Charset: "UTF-8" } }),
        ...(htmlBody && { Html: { Data: htmlBody, Charset: "UTF-8" } }),
      },
      Subject: { Data: subject, Charset: "UTF-8" },
    },
    Source: finalFrom,
  };

  try {
    const command = new SendEmailCommand(params);
    const sesResponse = await ses.send(command);
    console.log("SES response:", sesResponse);

    return response(200, {
      message: "Correo enviado",
      sesMessageId: sesResponse.MessageId,
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return response(500, {
      message: "Error enviando correo",
      error: error.message || "unknown",
    });
  }
};

// Helper para respuestas con CORS
const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // luego puedes limitar a tu dominio
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  },
  body: JSON.stringify(body),
});