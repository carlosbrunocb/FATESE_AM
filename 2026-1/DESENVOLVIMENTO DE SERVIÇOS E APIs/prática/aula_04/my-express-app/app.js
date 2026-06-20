const express = require('express');

// Importa as rotas
const tasksRoutes = require('./routes/tasks.routes');

// Cria a aplicação
const app = express();

// Middleware para interpretar JSON no body
app.use(express.json());

/**
 * Rota base da API
 * Tudo que começa com /tasks será direcionado para tasksRoutes
 */
app.use('/tasks', tasksRoutes);

// Porta do servidor
const PORT = 3000;

/**
 * Inicializa o servidor
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});