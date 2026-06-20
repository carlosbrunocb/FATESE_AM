// 1. Importar o módulo 'express', que é o framework web para Node.js
const express = require('express');
// Importar as rotas específicas de usuário definidas em outro arquivo
const userRoutes = require('./routes/user.routes');

// 2. Inicializar a aplicação Express, que será a nossa instância de servidor
const app = express();

// 3. Definir a porta em que o servidor web irá escutar por requisições
const PORT = 3000;

// Middleware para ler e parsear (converter) o corpo das requisições que chegam em formato JSON
// Isso permite que possamos acessar dados JSON enviados no corpo das requisições (ex: POST, PUT)
app.use(express.json());

// 4. Configurar a aplicação para usar as rotas de usuário importadas.
// Todas as rotas definidas em userRoutes serão acessíveis através do prefixo '/api'
// Exemplo: Se em userRoutes houver uma rota '/users', o caminho completo será '/api/users'
app.use('/api', userRoutes);


// 5. Iniciar o servidor Express na porta definida (PORT)
app.listen(PORT, () => {
    // Exibe uma mensagem no console quando o servidor estiver pronto e escutando
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});