const xml2js = require('xml2js');
const Livro = require('../models/Livro');

const listarTodos = async () => { return await Livro.findAll(); };

// A função precisa de ser assíncrona para ir à base de dados
const listarTodosComoXML = async () => {
    const builder = new xml2js.Builder({ rootName: 'biblioteca', headless: true });
    const livros = await listarTodos(); // Vai buscar os registos à base de dados
    
    // Converte as instâncias do Sequelize para objetos simples do JavaScript
    const livrosFormatados = livros.map(livro => livro.toJSON());
    
    return builder.buildObject({ livro: livrosFormatados });
};

// Simular consumo de Web Service legado (SOAP/XML)
const buscarLivrosFornecedor = async () => {
    const xmlFornecedor = `<fornecedor><livro id="99"><titulo>O Guia do Mochileiro</titulo></livro></fornecedor>`;
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        const res = await parser.parseStringPromise(xmlFornecedor);
        return res.fornecedor.livro;
    } catch (err) {
        throw new Error('Falha ao integrar com o fornecedor.');
    }
};

// Criar novo livro
const criar = async (dadosLivro) => { return await Livro.create(dadosLivro); };

// Buscar por ID
const buscarPorId = async (id) => { return await Livro.findByPk(id); };

// Atualizar livro
const atualizar = async (id, dadosAtualizados) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;
    await livro.update(dadosAtualizados);
    return livro;
};

// Deletar livro
const deletar = async (id) => {
    const removidos = await Livro.destroy({ where: { id } });
    return removidos > 0;
};

// // Simulando nosso "banco de dados" em memória
// let livros = [
//     { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
//     { id: 2, titulo: '1984', autor: 'George Orwell', ano: 1949 }
// ]

// let proximoId = 3;

// Listar todos os livros

// const criar = (dadosLivro) => {
//     // Aplica regras de negócio (ex: gerar ID)
//     const novoLivro = {
//         id: proximoId++,
//         titulo: dadosLivro.titulo,
//         autor: dadosLivro.autor,
//         ano: dadosLivro.ano
//     };

//     livros.push(novoLivro);
//     return novoLivro;
// };

// const atualizar = (id, dadosAtualizados) => {
//     const index = livros.findIndex(l => l.id === parseInt(id));

//     // Se não encontrou, retorna null para o Controller lidar com o erro 404
//     if (index === -1) return null;

//     // Atualiza os dados
//     livros[index] = { ...livros[index], ...dadosAtualizados };
//     return livros[index];
// };

// // Exportar dados em XML (Content Negotiation)
// const listarTodosComoXML = () => {
//     const builder = new xml2js.Builder({ rootName: 'biblioteca', headless: true });
//     return builder.buildObject({ livro: livros });
// };

module.exports = {
    listarTodos,
    listarTodosComoXML,
    buscarLivrosFornecedor,
    criar,
    atualizar
};