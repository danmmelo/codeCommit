const { SSMClient } = require("@aws-sdk/client-ssm");
const { KMSClient } = require("@aws-sdk/client-kms");
const { ACMClient } = require("@aws-sdk/client-acm");
const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
const {
    CognitoIdentityProviderClient
} = require("@aws-sdk/client-cognito-identity-provider");


const region = process.env.AWS_REGION || "us-east-1";

module.exports = {

    kmsClient: new KMSClient({ region }),

    acmClient: new ACMClient({ region }),

    secretsClient: new SecretsManagerClient({ region }),

    cognitoClient: new CognitoIdentityProviderClient({ region }),

    ssmClient: new SSMClient({ region })

};