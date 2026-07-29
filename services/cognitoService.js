/*
===============================================================================

Amazon Cognito Service

Responsável por toda comunicação com o Amazon Cognito.

Fluxo

Browser

↓

Route (/auth/login)

↓

Cognito Service

↓

AWS SDK

↓

Amazon Cognito

===============================================================================
*/

const crypto = require("crypto");

const {
    InitiateAuthCommand,
    ChangePasswordCommand,
    RespondToAuthChallengeCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const { cognitoClient } = require("../config/aws");
const { getCognitoConfig } = require("../config/cognitoConfig");

/*
===============================================================================

generateSecretHash()

Gera o SECRET_HASH exigido quando o App Client
possui Client Secret.

===============================================================================
*/

async function generateSecretHash(username) {

    const config = await getCognitoConfig();

    return crypto
        .createHmac(
            "sha256",
            config.clientSecret
        )
        .update(
            username + config.clientId
        )
        .digest("base64");

}

/*
===============================================================================

login()

===============================================================================
*/

async function login(username, password) {

    const config = await getCognitoConfig();

    const command = new InitiateAuthCommand({

        AuthFlow: "USER_PASSWORD_AUTH",

        ClientId: config.clientId,

        AuthParameters: {

            USERNAME: username,

            PASSWORD: password,

            SECRET_HASH: await generateSecretHash(username)

        }

    });

    console.log("================================");
    console.log("AWS_REGION:", process.env.AWS_REGION);
    console.log("USER_POOL_ID:", config.userPoolId);
    console.log("CLIENT_ID:", config.clientId);
    console.log("AUTH_FLOW:", "USER_PASSWORD_AUTH");
    console.log("================================");

    console.log("===== COMMAND INPUT =====");
    console.log(JSON.stringify(command.input, null, 2));
    console.log("=========================");

    try {

        console.log("Enviando requisição ao Cognito...");

        const response = await cognitoClient.send(command);

        console.log("Resposta do Cognito:");

        console.dir(response, { depth: null });

        return response;

    } catch (error) {

        console.log("===== ERRO DO COGNITO =====");

        console.dir(error, { depth: null });

        console.log("===========================");

        throw error;

    }

}

/*
===============================================================================

changePassword()

===============================================================================
*/

async function changePassword(accessToken, oldPassword, newPassword) {

    const command = new ChangePasswordCommand({

        AccessToken: accessToken,

        PreviousPassword: oldPassword,

        ProposedPassword: newPassword

    });

    return await cognitoClient.send(command);

}

/*
===============================================================================

respondToNewPasswordChallenge()

===============================================================================
*/

async function respondToNewPasswordChallenge(
    username,
    newPassword,
    session
) {

    const config = await getCognitoConfig();

    const command = new RespondToAuthChallengeCommand({

        ClientId: config.clientId,

        ChallengeName: "NEW_PASSWORD_REQUIRED",

        Session: session,

        ChallengeResponses: {

            USERNAME: username,

            NEW_PASSWORD: newPassword,

            SECRET_HASH: await generateSecretHash(username)

        }

    });

    const response = await cognitoClient.send(command);

    return response.AuthenticationResult;

}

module.exports = {

    login,

    changePassword,

    respondToNewPasswordChallenge

};