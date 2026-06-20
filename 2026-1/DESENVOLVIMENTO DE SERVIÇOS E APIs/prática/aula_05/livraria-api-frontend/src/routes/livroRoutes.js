const express = require('express')
const router = express.Router()
const livroController = require('../controllers/livroController')

// Definindo os endpoints (URIs) e conectando aos métodos do Controller
router.get('/livros', livroController.listarLivros)
router.get('/livros/:id', livroController.buscarLivroPorId)
router.post('/livros', livroController.criarLivro)
router.put('/livros/:id', livroController.atualizarLivro)
router.delete('/livros/:id', livroController.deletarLivro)

module.exports = router