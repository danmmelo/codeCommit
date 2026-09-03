const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");
const { getParameter } = require("./parameterStore");

const client = new EventBridgeClient({ region: process.env.AWS_REGION });

let cachedBusName = null;

async function getBusName() {

  if (cachedBusName) {
    return cachedBusName;
  }

  const param = await getParameter(process.env.EVENTBRIDGE_BUS_NAME_PARAM, false);

  cachedBusName = param.Value;

  return cachedBusName;

}

async function publishSecretDeletedEvent(secretName) {

  const busName = await getBusName();

  const command = new PutEventsCommand({
    Entries: [
      {
        EventBusName: busName,
        Source: "inventory-portal.secrets",
        DetailType: "SecretDeleted",
        Detail: JSON.stringify({
          secretName,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });

  return client.send(command);

}

module.exports = { publishSecretDeletedEvent };