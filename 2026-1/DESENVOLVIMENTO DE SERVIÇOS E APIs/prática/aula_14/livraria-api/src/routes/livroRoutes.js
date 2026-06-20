/**
 * ============================================================================
 * ARQUIVO DE ROTAS - API DE LIVROS
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const autenticaJWT = require('../middlewares/autenticaJWT');
const autorizaRole = require('../middlewares/autorizaRole');
const validaLivro = require('../middlewares/validaLivro');
const controller = require('../controllers/livroController');

router.get('/livros/fornecedor', controller.buscarFornecedor);

router.get('/livros', controller.listarLivros);

router.get('/livros/:id', controller.buscarLivroPorId);

router.post(
    '/livros',
    autenticaJWT,
    autorizaRole(['ADMIN']),
    validaLivro,
    controller.criarLivro
);

router.post(
    '/livros/:id/comprar', 
    autenticaJWT,
    autorizaRole(['CLIENTE', 'ADMIN']),
    controller.comprarLivro
);

router.put(
    '/livros/:id',
    autenticaJWT,
    autorizaRole(['ADMIN']),
    validaLivro,
    controller.atualizarLivro
);

router.delete(
    '/livros/:id', 
    autenticaJWT,
    autorizaRole(['ADMIN']),
    controller.deletarLivro
);

module.exports = router;