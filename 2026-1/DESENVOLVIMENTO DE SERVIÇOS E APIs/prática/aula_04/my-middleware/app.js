const express = require('express');
const morgan = require('morgan');
const app = express();

// 1. Built-in Middleware (Parser de JSON)
app.use(express.json());

// 2. Third-party Middleware (Logger de requisições)
app.use(morgan('dev'));

// 3. Custom Middleware (Global)
app.use((req, res, next) => {
    console.log(`Acessou: ${req.method} ${req.url}`);
    next(); // Importante: passa a vez!
});

// Rota (Middleware Final)
app.get('/', (req, res) => {
    res.send('Hello Middleware!');
});

// Porta do servidor
const PORT = 3000;

/**
 * Inicializa o servidor
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});