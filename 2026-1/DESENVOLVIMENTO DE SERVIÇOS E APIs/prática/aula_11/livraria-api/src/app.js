/**
 * ============================================================================
 * ARQUIVO PRINCIPAL DA APLICAÇÃO EXPRESS
 * ============================================================================
 * Este arquivo é responsável por:
 * 
 * 1. Criar a aplicação Express
 * 2. Configurar middlewares globais
 * 3. Registrar as rotas da API
 * 4. Configurar o tratamento centralizado de erros
 * 
 * Em arquiteturas Node.js com Express, este arquivo normalmente funciona
 * como o "núcleo" da aplicação web.
 * ============================================================================
 */

// Importa o framework Express
const express = require('express');

// Middleware personalizado de log das requisições
// Exemplo: registrar método HTTP, rota acessada e horário
const logger = require('./middlewares/logger');

// Middleware global de tratamento de erros
// Captura erros lançados pelos controllers/services
const errorHandler = require('./middlewares/errorHandler');

// Importa as rotas relacionadas ao módulo de livros
const routes = require('./routes/livroRoutes'); 

// Cria a instância principal da aplicação Express
const app = express();

/**
 * ============================================================================
 * MIDDLEWARES GLOBAIS
 * ============================================================================
 */

/**
 * Middleware nativo do Express para interpretar JSON
 * 
 * Sem esta linha, o Express não conseguiria ler:
 * req.body
 * 
 * Exemplo de JSON recebido:
 * {
 *   "titulo": "Clean Code",
 *   "autor": "Robert C. Martin"
 * }
 */
app.use(express.json());

/**
 * Middleware de log
 * 
 * Executa antes das rotas e pode ser usado para:
 * - auditoria
 * - monitoramento
 * - debugging
 * - métricas de acesso
 */
app.use(logger); 

/**
 * ============================================================================
 * ROTAS DA API
 * ============================================================================
 * 
 * Todas as rotas definidas em livroRoutes terão o prefixo:
 * /api
 * 
 * Exemplos:
 * GET    /api/livros
 * POST   /api/livros
 * PUT    /api/livros/:id
 * DELETE /api/livros/:id
 */
app.use('/api', routes);

/**
 * ============================================================================
 * MIDDLEWARE GLOBAL DE ERROS
 * ============================================================================
 * 
 * IMPORTANTE:
 * Este middleware deve ficar SEMPRE no final.
 * 
 * O Express executa os middlewares em sequência.
 * 
 * Quando um controller chama:
 * next(error)
 * 
 * o fluxo é redirecionado para este middleware.
 * 
 * Isso centraliza:
 * - mensagens de erro
 * - códigos HTTP
 * - logs
 * - tratamento de exceções
 */
app.use(errorHandler);

/**
 * Exporta a aplicação configurada.
 * 
 * O servidor HTTP será iniciado em outro arquivo,
 * normalmente chamado:
 * 
 * - server.js
 * - index.js
 * - app.js
 */
module.exports = app;