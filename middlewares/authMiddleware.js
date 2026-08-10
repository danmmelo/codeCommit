module.exports = function createAuthMiddleware(secret) {
  return function authMiddleware(req, res, next) {
    const gatewaySecret = req.headers["x-gateway-secret"];

    if (gatewaySecret !== secret) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  };
};