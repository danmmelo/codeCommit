const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { getParameter } = require("./parameterStore");

const client = new SQSClient({ region: process.env.AWS_REGION });

let cachedQueueUrl = null;

async function getQueueUrl() {

  if (cachedQueueUrl) {
    return cachedQueueUrl;
  }

  const param = await getParameter(process.env.SQS_QUEUE_URL_PARAM, false);

  cachedQueueUrl = param.Value;

  return cachedQueueUrl;

}

async function sendSecretCreatedMessage(secretName) {

  const queueUrl = await getQueueUrl();

  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({
      event: "SecretCreated",
      secretName,
      timestamp: new Date().toISOString(),
    }),
  });

  return client.send(command);

}

module.exports = { sendSecretCreatedMessage };