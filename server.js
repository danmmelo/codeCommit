const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

// Permite servir arquivos estáticos
app.use(express.static('public'));

// API que retorna as informações
app.get('/api', (req, res) => {
    res.json({
        application: "Node.js",
        status: "Running",
        port: PORT,
        serverTime: new Date().toLocaleString(),
        environment: process.env.NODE_ENV || "Development"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});