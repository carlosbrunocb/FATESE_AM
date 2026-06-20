const xml2js = require('xml2js');

// Simulando nosso "banco de dados" em memória
let livros = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
    { id: 2, titulo: '1984', autor: 'George Orwell', ano: 1949 }
]

let proximoId = 3;

const listarTodos = () => livros;

// Exportar dados em XML (Content Negotiation)
const listarTodosComoXML = () => {
    const builder = new xml2js.Builder({ rootName: 'biblioteca', headless: true });
    return builder.buildObject({ livro: livros });
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

const criar = (dadosLivro) => {
    // Aplica regras de negócio (ex: gerar ID)
    const novoLivro = {
        id: proximoId++,
        titulo: dadosLivro.titulo,
        autor: dadosLivro.autor,
        ano: dadosLivro.ano
    };

    livros.push(novoLivro);
    return novoLivro;
};

const atualizar = (id, dadosAtualizados) => {
    const index = livros.findIndex(l => l.id === parseInt(id));

    // Se não encontrou, retorna null para o Controller lidar com o erro 404
    if (index === -1) return null;

    // Atualiza os dados
    livros[index] = { ...livros[index], ...dadosAtualizados };
    return livros[index];
};

module.exports = {
    listarTodos, 
    listarTodosComoXML, 
    buscarLivrosFornecedor,
    criar,
    atualizar
};