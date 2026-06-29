const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send(`
        <h1>Aplicação Node.js</h1>
        <p>Servidor rodando na porta ${PORT}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});