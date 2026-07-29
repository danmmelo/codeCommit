/*
===============================================================================
Parameter Store Service

Este arquivo é responsável por toda a comunicação com o AWS Systems Manager
Parameter Store.

Funções disponíveis:

getParameter()
- AWS API: GetParameter
- Busca um único parâmetro.
- Exemplo:
  /inventory-service/prod/db/password

-------------------------------------------------------------------------------

getParameters()
- AWS API: GetParameters
- Busca vários parâmetros em uma única chamada.
- Exemplo:
  [
    "/inventory-service/prod/db/username",
    "/inventory-service/prod/db/password"
  ]

-------------------------------------------------------------------------------

getParametersByPath()
- AWS API: GetParametersByPath
- Busca todos os parâmetros dentro de um caminho.
- Muito utilizado para carregar configurações completas de uma aplicação.

Exemplo:

/inventory-service/prod/

Retorna:

/inventory-service/prod/db/host
/inventory-service/prod/db/user
/inventory-service/prod/db/password

-------------------------------------------------------------------------------

putParameter()
- AWS API: PutParameter
- Cria um novo parâmetro ou atualiza um existente.
- Suporta String e SecureString.

-------------------------------------------------------------------------------

deleteParameter()
- AWS API: DeleteParameter
- Remove um parâmetro do Parameter Store.

===============================================================================
*/

const {
    GetParameterCommand,
    GetParametersCommand,
    GetParametersByPathCommand,
    PutParameterCommand,
    DeleteParameterCommand
} = require("@aws-sdk/client-ssm");

const { ssmClient } = require("../config/aws");

/**
 * Busca um único parâmetro
 * @param {string} name Nome do parâmetro
 * @param {boolean} decrypt Se deve descriptografar SecureString
 */
async function getParameter(name, decrypt = true) {

    const command = new GetParameterCommand({
        Name: name,
        WithDecryption: decrypt
    });

    const response = await ssmClient.send(command);

    return response.Parameter;
}

/**
 * Busca vários parâmetros
 * @param {Array} names Lista de parâmetros
 * @param {boolean} decrypt Descriptografar SecureString
 */
async function getParameters(names, decrypt = true) {

    const command = new GetParametersCommand({
        Names: names,
        WithDecryption: decrypt
    });

    const response = await ssmClient.send(command);

    return response.Parameters;
}

/**
 * Busca todos os parâmetros de um caminho
 * Exemplo:
 * /inventory-service/prod/
 */
async function getParametersByPath(path, decrypt = true) {

    const command = new GetParametersByPathCommand({
        Path: path,
        Recursive: true,
        WithDecryption: decrypt
    });

    const response = await ssmClient.send(command);

    return response.Parameters;
}

/**
 * Cria ou atualiza um parâmetro
 */
async function putParameter(name, value, type = "String") {

    const command = new PutParameterCommand({

        Name: name,

        Value: value,

        Type: type,

        Overwrite: true

    });

    return await ssmClient.send(command);

}

/**
 * Remove um parâmetro
 */
async function deleteParameter(name) {

    const command = new DeleteParameterCommand({

        Name: name

    });

    return await ssmClient.send(command);

}

module.exports = {

    getParameter,

    getParameters,

    getParametersByPath,

    putParameter,

    deleteParameter

};