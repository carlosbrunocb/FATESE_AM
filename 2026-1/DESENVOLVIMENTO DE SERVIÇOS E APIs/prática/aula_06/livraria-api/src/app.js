const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/livroRoutes'); // Apontando direto para as rotas de livro

const app = express();

// Middlewares globais
app.use(express.json());
app.use(logger); // Aplica o log em TUDO

// Rotas da aplicação
app.use('/api', routes);

// Middleware global de tratamento de erros (DEVE SER O ÚLTIMO MIDDLEWARE DECLARADO)
app.use(errorHandler);

module.exports = app;