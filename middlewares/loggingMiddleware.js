const logger = require("../observability/logger");

function loggingMiddleware(req, res, next) {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        logger.log(
            req,
            `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration} ms`
        );

    });

    next();
}

module.exports = loggingMiddleware;