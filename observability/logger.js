function log(req, message) {

    console.log(
        `[${new Date().toISOString()}] [${req.requestId}] ${message}`
    );

}

module.exports = { log };