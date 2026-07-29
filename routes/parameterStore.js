const express = require("express");

const router = express.Router();

const parameterService = require("../services/parameterStore");

/*
===============================================================================
Parameter Store Routes

Responsável por expor endpoints REST para o AWS Systems Manager
Parameter Store.

Fluxo:

Cliente
   │
   ▼
Express Route
   │
   ▼
Parameter Store Service
   │
   ▼
AWS SDK
   │
   ▼
AWS Systems Manager

===============================================================================
*/


/*
===============================================================================
GET /ssm/parameter

Busca um único parâmetro.

Exemplo:

GET /ssm/parameter?name=/inventory-service/prod/db/password

===============================================================================
*/

router.get("/parameter", async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {

            return res.status(400).json({
                error: "Parameter name is required."
            });

        }

        const parameter = await parameterService.getParameter(name);

        res.json(parameter);

    } catch (error) {

    console.error("========== AWS ERROR ==========");
    console.error(error);
    console.error("===============================");

    res.status(500).json({
        message: error.message,
        name: error.name,
        code: error.Code || error.code,
        metadata: error.$metadata
    });
}

});


/*
===============================================================================
POST /ssm/parameters

Busca vários parâmetros.

Body:

{
    "names":[
        "/inventory-service/prod/db/username",
        "/inventory-service/prod/db/password"
    ]
}

===============================================================================
*/

router.post("/parameters", async (req, res) => {

    try {

        const { names } = req.body;

        if (!names) {

            return res.status(400).json({

                error: "Names array is required."

            });

        }

        const parameters =
            await parameterService.getParameters(names);

        res.json(parameters);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


/*
===============================================================================
GET /ssm/path

Busca todos os parâmetros de um caminho.

Exemplo:

GET /ssm/path?path=/inventory-service/prod/

===============================================================================
*/

router.get("/path", async (req, res) => {

    try {

        const { path } = req.query;

        if (!path) {

            return res.status(400).json({

                error: "Path is required."

            });

        }

        const parameters =
            await parameterService.getParametersByPath(path);

        res.json(parameters);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;