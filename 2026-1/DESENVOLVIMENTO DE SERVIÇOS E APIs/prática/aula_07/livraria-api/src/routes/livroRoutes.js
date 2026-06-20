const express = require('express');
const router = express.Router();
const validaLivro = require('../middlewares/validaLivro');
const controller = require('../controllers/livroController');

// NOVA ROTA: Busca dados do fornecedor
// Deve vir antes de rotas com :id para evitar conflitos
router.get('/livros/fornecedor', controller.buscarFornecedor);

// Rota pública com Content Negotiation
// Suporta JSON (padrão) e XML via Accept header
router.get('/livros', controller.listarLivros);

// Rotas protegidas com validação
// Rotas protegidas que recebem dados (Middlewares em ação)
router.post('/livros', validaLivro, controller.criarLivro);
router.put('/livros/:id', validaLivro, controller.atualizarLivro);

module.exports = router;