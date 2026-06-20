// Importar o módulo 'express', que é o framework web para Node.js
const express = require('express');

// Importar as rotas específicas de usuário definidas em outro arquivo
const userRoutes = require('./routes/user.routes');

// Importar o logger
const logger = require('./middlewares/logger.middleware');

// Importar o error Handler
const errorHandler = require('./middlewares/errorHandler.middleware');

// Inicializar a aplicação Express, que será a nossa instância de servidor
const app = express();

// Definir a porta em que o servidor web irá escutar por requisições
const PORT = 3000;

// Middlewares Globais (Inicio)
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api', userRoutes);

// Error Handler (TEM QUE SER O ÚLTIMO, antes do app.listen)
// O Express só entende que é tratamento de erro se for definido DEPOIS das rotas.
app.use(errorHandler);

// Iniciar o servidor Express na porta definida (PORT)
app.listen(PORT, () => {
    // Exibe uma mensagem no console quando o servidor estiver pronto e escutando
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});