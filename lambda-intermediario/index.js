const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambda = new LambdaClient({
  region: process.env.REGION || "us-east-2",
});

exports.handler = async (event) => {
  console.log("Evento recibido en intermediario:", JSON.stringify(event));

  let body;
  try {
    body = event.body ? JSON.parse(event.body) : event;
  } catch (e) {
    return httpResponse(400, { error: "Body debe ser JSON válido" });
  }

  const { type, payload } = body || {};

  if (!type || !payload) {
    return httpResponse(400, {
      error: "Debes enviar 'type' y 'payload'. Ej: { type: 'mail' | 'chat', payload: {...} }",
    });
  }

  try {
    switch (type) {
      case "mail":
        return await proxyToLambda(process.env.MAILER_LAMBDA_NAME, payload);

      case "chat":
        return await proxyToLambda(process.env.CHATBOT_LAMBDA_NAME, payload);

      default:
        return httpResponse(400, { error: `Tipo no soportado: ${type}` });
    }
  } catch (err) {
    console.error("Error en intermediario:", err);
    return httpResponse(500, { error: "Error interno en el intermediario" });
  }
};

async function proxyToLambda(functionName, payload) {
  if (!functionName) {
    return httpResponse(500, {
      error: "Nombre de función destino no configurado en variables de entorno",
    });
  }

  const command = new InvokeCommand({
    FunctionName: functionName,
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  const result = await lambda.send(command);

  const raw = result.Payload
    ? Buffer.from(result.Payload).toString("utf8")
    : "";

  let inner;
  try {
    inner = raw ? JSON.parse(raw) : {};
  } catch {
    inner = raw;
  }

  const statusCode = typeof inner?.statusCode === "number" ? inner.statusCode : 200;

  const body =
    typeof inner?.body === "string"
      ? inner.body
      : JSON.stringify(inner ?? {});

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,x-api-key",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body,
  };
}

function httpResponse(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,x-api-key",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(bodyObj),
  };
}