const express = require("express");

const router = express.Router();

const secretsService = require("../services/secretsService");
const snsService = require("../services/snsService");
const eventBridgeService = require("../services/eventBridgeService");

/*
===============================================================================

AWS Secrets Manager Routes

Responsável por expor endpoints REST para gerenciamento
dos Secrets armazenados no AWS Secrets Manager.

===============================================================================
*/

/*
===============================================================================

POST /secrets

Cria um novo Secret.

Body

{
    "name":"lab/database",
    "value":{
        "username":"admin",
        "password":"Password123!"
    }
}

===============================================================================
*/

router.post("/", async (req, res) => {

    try {

        const { name, value } = req.body;

        if (!name || !value) {

            return res.status(400).json({

                success: false,

                message: "Name and value are required."

            });

        }

        const response = await secretsService.createSecret(

            name,

            value

        );

        try {

            await snsService.publishSecretCreatedMessage(name);

        } catch (snsError) {

            console.error("Falha ao publicar mensagem no SNS:", snsError.message);

        }

        res.json({

            success: true,

            data: response

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

/*
===============================================================================

GET /secrets

Lista todos os Secrets.

===============================================================================
*/

router.get("/", async (req, res) => {

    try {

        const secrets = await secretsService.listSecrets();

        console.log("GET /secrets");

        res.json({

            success: true,

            data: secrets

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

/*
===============================================================================

GET /secrets/:name

Busca um Secret pelo nome.

===============================================================================
*/

router.get("/secret", async (req, res) => {

    try {

        const { name } = req.query;

        const secret = await secretsService.getSecret(name);

        res.json({
            success: true,
            data: secret
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

/*
===============================================================================

PUT /secrets/:name

Atualiza um Secret.

===============================================================================
*/

router.put("/secret", async (req, res) => {

    try {

        const { name } = req.query;

        const response = await secretsService.updateSecret(

            name,

            req.body

        );

        res.json({

            success: true,

            data: response

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

/*
===============================================================================

DELETE /secrets/:name

Remove um Secret.

===============================================================================
*/

router.delete("/secret", async (req, res) => {

    try {

        const { name } = req.query;

        const response = await secretsService.deleteSecret(

            name

        );

        try {

            await eventBridgeService.publishSecretDeletedEvent(name);

        } catch (ebError) {

            console.error("Falha ao publicar evento no EventBridge:", ebError.message);

        }

        res.json({

            success: true,

            data: response

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

console.log("Arquivo secrets.js carregado");

module.exports = router;