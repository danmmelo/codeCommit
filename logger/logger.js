const pino = require("pino");

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime
});

function buildLog(req, message) {

    return {

        requestId: req.requestId,

        method: req.method,

        path: req.originalUrl,

        ip: req.ip,

        message

    };

}

module.exports = {

    info(req, message) {

        logger.info(buildLog(req, message));

    },

    warn(req, message) {

        logger.warn(buildLog(req, message));

    },

    error(req, error) {

        logger.error({

            requestId: req.requestId,

            method: req.method,

            path: req.originalUrl,

            ip: req.ip,

            message: error.message,

            stack: error.stack

        });

    }

};