/*
===============================================================================

AWS Secrets Manager Service

Responsável pela comunicação com o AWS Secrets Manager.

Fluxo

Node.js

↓

Secrets Service

↓

AWS SDK

↓

AWS Secrets Manager

===============================================================================
*/

const {
    GetSecretValueCommand,
    CreateSecretCommand,
    ListSecretsCommand,
    UpdateSecretCommand,
    DeleteSecretCommand
} = require("@aws-sdk/client-secrets-manager");

const {
    secretsClient
} = require("../config/aws");

/*
===============================================================================

getSecret()

AWS API

GetSecretValue

Recupera um Secret armazenado no AWS Secrets Manager.

Recebe

secretName

Retorna

Objeto JSON contendo o Secret.

===============================================================================
*/

async function getSecret(secretName) {

    console.log("================================");
    console.log("AWS Secrets Manager");
    console.log("Secret:", secretName);
    console.log("================================");

    const command = new GetSecretValueCommand({

        SecretId: secretName

    });

    const response = await secretsClient.send(command);

    /*
    O Secrets Manager pode armazenar:

    SecretString

    ou

    SecretBinary

    Neste laboratório utilizaremos SecretString.
    */

    if (!response.SecretString) {

        throw new Error("SecretString not found.");

    }

    return JSON.parse(response.SecretString);

}

/*
===============================================================================

Futuras funções

createSecret()

updateSecret()

deleteSecret()

listSecrets()

===============================================================================
*/

/*
===============================================================================

createSecret()

AWS API

CreateSecret

Cria um novo Secret no AWS Secrets Manager.

===============================================================================
*/

async function createSecret(secretName, secretValue) {

    const command = new CreateSecretCommand({

        Name: secretName,

        SecretString: JSON.stringify(secretValue)

    });

    return await secretsClient.send(command);

}

/*
===============================================================================

listSecrets()

AWS API

ListSecrets

Lista todos os Secrets armazenados.

===============================================================================
*/

async function listSecrets() {

    const command = new ListSecretsCommand({});

    const response = await secretsClient.send(command);

    return response.SecretList;

}

/*
===============================================================================

updateSecret()

AWS API

UpdateSecret

Atualiza um Secret existente.

===============================================================================
*/

async function updateSecret(secretName, secretValue) {

    const command = new UpdateSecretCommand({

        SecretId: secretName,

        SecretString: JSON.stringify(secretValue)

    });

    return await secretsClient.send(command);

}

/*
===============================================================================

deleteSecret()

AWS API

DeleteSecret

Remove um Secret.

===============================================================================
*/

async function deleteSecret(secretName) {

    const command = new DeleteSecretCommand({

        SecretId: secretName,

        ForceDeleteWithoutRecovery: true

    });

    return await secretsClient.send(command);

}


module.exports = {

    getSecret,

    createSecret,

    listSecrets,

    updateSecret,

    deleteSecret

};