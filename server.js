require("./observability/tracing")

require("dotenv").config();

const logger = require("./logger/logger");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

const authMiddleware = require("./middlewares/authMiddleware");

// ======================================================
// Servidor iniciado
// ======================================================

`const logger = require("../logger/logger");`

logger.info("Application starting...");

// ======================================================
// Middleware
// ======================================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const loggingMiddleware = require("./middlewares/loggingMiddleware");

const requestIdMiddleware = require("./middlewares/requestIdMiddleware");

app.use(requestIdMiddleware);

app.use(loggingMiddleware);

app.use(express.static("public"));


// ======================================================
// Routes
// ======================================================

// Já implementadas
const parameterRoutes = require("./routes/parameterStore");

const secretRoutes = require("./routes/secrets");

// Em desenvolvimento
// const kmsRoutes = require("./routes/kms");
// const secretRoutes = require("./routes/secrets");
// const certRoutes = require("./routes/certificates");

const authRoutes = require("./routes/auth");

// ======================================================
// Register Routes
// ======================================================

// Módulo concluído
app.use("/ssm", parameterRoutes);

// Próximo módulo
app.use("/auth", authRoutes);

// Em desenvolvimento
// app.use("/kms", kmsRoutes);
// app.use("/secrets", secretRoutes);
// app.use("/acm", certRoutes);

// ======================================================
// Health Check
// ======================================================

app.use("/secrets", authMiddleware, secretRoutes);

app.get("/api", (req, res) => {

    res.json({

        application: "Node.js",

        status: "Running",

        port: PORT,

        serverTime: new Date().toLocaleString(),

        environment: process.env.NODE_ENV || "Development"

    });

});

// ======================================================
// Home Page
// ======================================================

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html");

});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "aws-secure-inventory-portal",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

// ======================================================
// Start Server
// ======================================================

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);





});