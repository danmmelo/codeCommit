const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { getParameter } = require("./parameterStore");

const client = new SNSClient({ region: process.env.AWS_REGION });

let cachedTopicArn = null;

async function getTopicArn() {

  if (cachedTopicArn) {
    return cachedTopicArn;
  }

  const param = await getParameter(process.env.SNS_TOPIC_ARN_PARAM, false);

  cachedTopicArn = param.Value;

  return cachedTopicArn;

}

async function publishSecretCreatedMessage(secretName) {

  const topicArn = await getTopicArn();

  const command = new PublishCommand({
    TopicArn: topicArn,
    Message: JSON.stringify({
      event: "SecretCreated",
      secretName,
      timestamp: new Date().toISOString(),
    }),
  });

  return client.send(command);

}

module.exports = { publishSecretCreatedMessage };
