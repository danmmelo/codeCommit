const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: process.env.AWS_REGION });

async function sendSecretCreatedMessage(secretName) {
  const command = new SendMessageCommand({
    QueueUrl: process.env.SECRET_CREATED_QUEUE_URL,
    MessageBody: JSON.stringify({
      event: "SecretCreated",
      secretName,
      timestamp: new Date().toISOString(),
    }),
  });

  return client.send(command);
}

module.exports = { sendSecretCreatedMessage };