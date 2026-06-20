// src/repositories/livroRepository.js
const LivroModel = require('../models/Livro');

const buscarTodos = async (skip, limit, titulo) => {
    let filtro = {};
    if (titulo) {
        // Busca parcial ignorando maiúsculas/minúsculas (Regex)
        filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    const [items, total] = await Promise.all([
        LivroModel.find(filtro).skip(skip).limit(limit).lean(),
        LivroModel.countDocuments(filtro)
    ]);
    return { items, total };
};

const salvar = async (dadosLivro) => {
    const novoLivro = new LivroModel(dadosLivro);
    return await novoLivro.save();
};

const buscarPorId = async (id) => {
    return await LivroModel.findById(id).lean();
};

const atualizar = async (id, dadosAtualizados) => {
    return await LivroModel.findByIdAndUpdate(id, dadosAtualizados, {
        new: true,
        runValidators: true
    });
};

const deletar = async (id) => {
    return await LivroModel.findByIdAndDelete(id);
};

// Novo método específico para atualizar estoque na venda
const atualizarEstoque = async (id, novoEstoque) => {
    return await LivroModel.findByIdAndUpdate(id, { estoque: novoEstoque }, { new: true });
};

module.exports = {
    buscarTodos,
    salvar,
    buscarPorId,
    atualizar,
    deletar,
    atualizarEstoque
};