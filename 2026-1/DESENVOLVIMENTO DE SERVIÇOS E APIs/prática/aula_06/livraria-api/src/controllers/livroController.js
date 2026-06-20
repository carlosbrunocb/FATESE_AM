const livroService = require('../services/livroService');

const listarLivros = (req, res, next) => {
    try {
        const livros = livroService.listarTodos();
        res.status(200).json(livros);
    } catch (error) {
        next(error); // Repassa o erro para o errorHandler
    }
};

const criarLivro = (req, res, next) => {
    try {
        // ✅ Validação já ocorreu no middleware `validaLivro`!
        // O req.body chega aqui 100% confiável
        const { titulo, autor, ano } = req.body;

        // Foco total na Regra de Negócio terceirizada para o Service
        const novoLivro = livroService.criar({ titulo, autor, ano });
        
        res.status(201).json(novoLivro);
    } catch (error) {
        next(error);
    }
};

const atualizarLivro = (req, res, next) => {
    try {
        const id = req.params.id;
        const { titulo, autor, ano } = req.body;

        const livroAtualizado = livroService.atualizar(id, { titulo, autor, ano });

        if (!livroAtualizado) {
            return res.status(404).json({ mensagem: "Livro não encontrado." });
        }

        res.status(200).json(livroAtualizado);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listarLivros,
    criarLivro,
    atualizarLivro
};