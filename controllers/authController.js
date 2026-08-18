const cognitoService = require("../services/cognitoService");
const logger = require("../logger/logger");
/*
===============================================================================

Amazon Cognito Controller

===============================================================================
*/


async function login(req, res) {

    logger.info(req, "Login started");

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            logger.warn(req, "Username or password not provided");

            return res.status(400).json({

                success: false,

                message: "Username and password are required."

            });

        }

        const response = await cognitoService.login(username, password);

        if (response.ChallengeName === "NEW_PASSWORD_REQUIRED") {

            logger.info(req, "User must change temporary password");

            return res.json({

                success: false,

                challenge: response.ChallengeName,

                session: response.Session

            });

        }

        logger.info(req, "Login successful");

        return res.json({

            success: true,

            tokens: response.AuthenticationResult

        });

    } catch (error) {

        logger.error(req, error);

        return res.status(500).json({

            success: false,

            name: error.name,

            message: error.message,

            metadata: error.$metadata

        });

    }

}

async function newPassword(req, res) {

    logger.info(req, "New password challenge started");

    try {

        const {

            username,

            newPassword,

            session

        } = req.body;

        if (!username || !newPassword || !session) {

            logger.warn(req, "Missing parameters");

            return res.status(400).json({

                success: false,

                message: "Username, newPassword and session are required."

            });

        }

        const authentication =
            await cognitoService.respondToNewPasswordChallenge(

                username,

                newPassword,

                session

            );

        logger.info(req, "Password successfully changed");

        return res.json({

            success: true,

            message: "Password changed successfully.",

            tokens: authentication

        });

    } catch (error) {

        logger.error(req, error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {

    login,

    newPassword

};