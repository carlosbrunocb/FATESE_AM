// src/config/seed.js
const Livro = require('../models/Livro');

const inicializarBanco = async () => {
    try {
        // 1. Limpa a coleção de livros (remove o banco anterior/dados antigos)
        await Livro.deleteMany({});
        console.log('🗑️ Banco de dados limpo com sucesso!');

        // 2. Dados dos 5 livros para a aula
        const livrosIniciais = [
            { 
                titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, estoque: 10, 
                generos: ["Fantasia"], detalhes: { paginas: 1200, editora: "HarperCollins" } 
            },
            { 
                titulo: "1984", autor: "George Orwell", ano: 1949, estoque: 5, 
                generos: ["Distopia"], detalhes: { paginas: 328, editora: "Companhia das Letras" } 
            },
            { 
                titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, estoque: 15, 
                generos: ["Clássico"], detalhes: { paginas: 256, editora: "Principis" } 
            },
            { 
                titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937, estoque: 8, 
                generos: ["Fantasia"], detalhes: { paginas: 310, editora: "HarperCollins" } 
            },
            { 
                titulo: "Admirável Mundo Novo", autor: "Aldous Huxley", ano: 1932, estoque: 0, 
                generos: ["Ficção Científica"], detalhes: { paginas: 312, editora: "Antofágica" } 
            }
        ];

        // 3. Insere os livros no banco
        await Livro.insertMany(livrosIniciais);
        console.log('📚 Banco de dados populado com 5 livros iniciais!');

    } catch (error) {
        console.error('❌ Erro ao inicializar dados:', error);
    }
};

module.exports = inicializarBanco;