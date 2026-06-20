const express = require('express');
const router = express.Router();
const validaLivro = require('../middlewares/validaLivro');
const controller = require('../controllers/livroController');

// Rota pública (apenas leitura)
router.get('/livros', controller.listarLivros);

// Rotas protegidas que recebem dados (Middlewares em ação)
router.post('/livros', validaLivro, controller.criarLivro);
router.put('/livros/:id', validaLivro, controller.atualizarLivro);

module.exports = router;