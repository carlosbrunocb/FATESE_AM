/**
 * =========================================================
 * ARQUIVO DE ROTAS - API DE LIVROS
 * =========================================================
 * Este arquivo é responsável por definir os endpoints
 * (rotas) disponíveis da API.
 * 
 * Aqui conectamos:
 * 
 * Cliente HTTP → Rota → Middleware → Controller
 * 
 * Exemplo:
 * GET /livros
 *        ↓
 * controller.listarLivros
 * 
 * As rotas seguem o padrão REST.
 * =========================================================
 */

// Importa o framework Express
const express = require('express');

const autenticaJWT = require('../middlewares/autenticaJWT');

// Cria um objeto Router do Express.
// O Router permite organizar as rotas em módulos separados.
const router = express.Router();

// Middleware responsável por validar os dados enviados
// no corpo da requisição antes de salvar/atualizar.
// Exemplo: verificar se título e autor foram enviados.
const validaLivro = require('../middlewares/validaLivro');

// Importa o controller.
// O controller contém a lógica que será executada
// quando cada rota for chamada.
const controller = require('../controllers/livroController');


/**
 * =========================================================
 * ROTAS GET
 * =========================================================
 */

/**
 * GET /livros/fornecedor
 * ---------------------------------------------------------
 * Simula integração com um fornecedor externo.
 * 
 * Objetivo:
 * Demonstrar consumo/conversão de dados XML.
 * 
 * Exemplo:
 * GET http://localhost:3000/livros/fornecedor
 */
router.get('/livros/fornecedor', controller.buscarFornecedor);


/**
 * GET /livros
 * ---------------------------------------------------------
 * Lista todos os livros cadastrados.
 * 
 * Também suporta:
 * - paginação
 * - retorno em JSON
 * - retorno em XML
 * 
 * Exemplo:
 * GET /livros?page=1&limit=10
 */
router.get('/livros', controller.listarLivros);


/**
 * GET /livros/:id
 * ---------------------------------------------------------
 * Busca um livro específico pelo ID.
 * 
 * O ":id" é um parâmetro de rota.
 * 
 * Exemplo:
 * GET /livros/64f8ab123456789
 */
router.get('/livros/:id', controller.buscarLivroPorId);


/**
 * =========================================================
 * ROTAS DELETE
 * =========================================================
 */

/**
 * DELETE /livros/:id
 * ---------------------------------------------------------
 * Remove um livro do banco de dados.
 * 
 * Exemplo:
 * DELETE /livros/64f8ab123456789
 */
router.delete('/livros/:id', controller.deletarLivro);


/**
 * =========================================================
 * ROTAS POST
 * =========================================================
 */

/**
 * POST /livros
 * ---------------------------------------------------------
 * Cria um novo livro.
 * 
 * Fluxo:
 * 1. Middleware validaLivro valida os dados
 * 2. Controller executa a lógica de criação
 * 
 * Exemplo de body:
 * {
 *   "titulo": "Clean Code",
 *   "autor": "Robert C. Martin",
 *   "ano": 2008
 * }
 */
router.post(
    '/livros',
    autenticaJWT,
    validaLivro,
    controller.criarLivro
);

/**
 * POST /livros/:id/comprar
 * ---------------------------------------------------------
 * Efetua a venda de um livro.
 */
router.post('/livros/:id/comprar', controller.comprarLivro);


/**
 * =========================================================
 * ROTAS PUT
 * =========================================================
 */

/**
 * PUT /livros/:id
 * ---------------------------------------------------------
 * Atualiza um livro existente.
 * 
 * Fluxo:
 * 1. Middleware validaLivro valida os dados
 * 2. Controller atualiza o registro
 * 
 * Exemplo:
 * PUT /livros/64f8ab123456789
 */
router.put(
    '/livros/:id',
    autenticaJWT,
    validaLivro,
    controller.atualizarLivro
);


/**
 * =========================================================
 * EXPORTAÇÃO DAS ROTAS
 * =========================================================
 * Disponibiliza o router para ser utilizado no app.js
 * 
 * Exemplo:
 * app.use('/api', router);
 * =========================================================
 */
module.exports = router;