const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({
  region: "us-east-2",
});

exports.handler = async (event) => {
  console.log("Event recibido:", event);

  let payload = event;

  if (event.body) {
    try {
      payload = JSON.parse(event.body);
    } catch (err) {
      console.error("JSON inválido");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "JSON inválido" }),
      };
    }
  }

  const { from, to, subject, htmlBody, textBody } = payload;

  if (!subject || !to || (!htmlBody && !textBody)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Payload inválido" }),
    };
  }

  const params = {
    Source: from || "dnverco4@gmail.com",
    Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
    Message: {
      Subject: { Data: subject },
      Body: {
        ...(htmlBody && { Html: { Data: htmlBody } }),
        ...(textBody && { Text: { Data: textBody } }),
      },
    },
  };

  try {
    const data = await ses.send(new SendEmailCommand(params));
    console.log("Enviado:", data);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173", // o "*"
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({ messageId: data.MessageId }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error enviando" }),
    };
  }
};