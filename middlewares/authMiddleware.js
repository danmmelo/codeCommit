module.exports = function authMiddleware(req, res, next) {
  const gatewaySecret = req.headers["x-gateway-secret"];

  if (gatewaySecret !== process.env.GATEWAY_SECRET) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  next();
};