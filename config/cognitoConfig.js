/*
===============================================================================

Cognito Configuration

Responsável por carregar a configuração do Cognito
a partir do AWS Secrets Manager.

Fluxo

Application

↓

cognitoConfig

↓

Secrets Manager

===============================================================================
*/

const { getSecret } = require("../services/secretsService");

let cachedConfig = null;

async function getCognitoConfig() {

    // Retorna do cache se já foi carregado
    if (cachedConfig) {
        return cachedConfig;
    }

    const secretName = process.env.COGNITO_SECRET_NAME;

    if (!secretName) {
        throw new Error("COGNITO_SECRET_NAME not configured.");
    }

    console.log("Loading Cognito configuration...");

    cachedConfig = await getSecret(secretName);

    console.log("Cognito configuration loaded successfully.");

    return cachedConfig;
}

module.exports = {
    getCognitoConfig
};