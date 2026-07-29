const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

/*
===============================================================================

Amazon Cognito Routes

Responsável apenas por registrar as rotas da API.

Fluxo

Browser
    │
    ▼
Express Route
    │
    ▼
Auth Controller
    │
    ▼
Cognito Service
    │
    ▼
AWS SDK
    │
    ▼
Amazon Cognito

===============================================================================
*/

/**
 * POST /auth/login
 *
 * Body
 * {
 *   "username":"user@email.com",
 *   "password":"Password123!"
 * }
 */
router.post("/login", authController.login);

/**
 * POST /auth/new-password
 *
 * Body
 * {
 *   "username":"user@email.com",
 *   "newPassword":"NovaSenha123!",
 *   "session":"..."
 * }
 */
router.post("/new-password", authController.newPassword);

module.exports = router;