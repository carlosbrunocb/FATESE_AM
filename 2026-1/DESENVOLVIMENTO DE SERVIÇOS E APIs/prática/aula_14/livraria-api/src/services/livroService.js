// src/services/livroService.js
const xml2js = require('xml2js');
// IMPORTANTE: O Service agora importa o Repository e não mais o Model!
const livroRepository = require('../repositories/livroRepository');

const listarTodos = async ({ page = 1, limit = 20, titulo = '' }) => {
    const skip = (page - 1) * limit;
    const { items, total } = await livroRepository.buscarTodos(skip, limit, titulo);

    return {
        items,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

const listarTodosComoXML = async () => {
    const resultado = await listarTodos({ page: 1, limit: 100 });
    const livrosArray = resultado.items;
    const livrosLimpos = JSON.parse(JSON.stringify(livrosArray));

    const builder = new xml2js.Builder({
        rootName: 'biblioteca',
        headless: true
    });

    return builder.buildObject({ livro: livrosLimpos });
};

const buscarLivrosFornecedor = async () => {
    const xmlFornecedor = `
        <fornecedor>
            <livro id="99">
                <titulo>O Guia do Mochileiro</titulo>
            </livro>
        </fornecedor>
    `;
    const parser = new xml2js.Parser({ explicitArray: false });

    try {
        const res = await parser.parseStringPromise(xmlFornecedor);
        return res.fornecedor.livro;
    } catch (err) {
        throw new Error('Falha ao integrar com o fornecedor.');
    }
};

const criar = async (dadosLivro) => {
    // REGRA DE NEGÓCIO: Não permitir livros lançados no futuro
    const anoAtual = new Date().getFullYear();
    if (dadosLivro.ano > anoAtual) {
        throw new Error("O ano de lançamento não pode estar no futuro.");
    }

    // Repassa a gravação para o Repositório
    return await livroRepository.salvar(dadosLivro);
};

const buscarPorId = async (id) => {
    return await livroRepository.buscarPorId(id);
};

const atualizar = async (id, dadosAtualizados) => {
    return await livroRepository.atualizar(id, dadosAtualizados);
};

const deletar = async (id) => {
    const removido = await livroRepository.deletar(id);
    return !!removido;
};

// NOVA FUNÇÃO: Regra de Negócio de Venda
const realizarVenda = async (id) => {
    // 1. Busca o livro no banco
    const livro = await livroRepository.buscarPorId(id);

    // 2. Verifica se o livro existe
    if (!livro) {
        throw new Error('Livro não encontrado');
    }

    // 3. Regra de Negócio: Verifica se há estoque
    if (livro.estoque <= 0) {
        throw new Error('Livro esgotado! Não é possível realizar a venda.');
    }

    // 4. Calcula o novo estoque
    const novoEstoque = livro.estoque - 1;

    // 5. Manda o repositório atualizar apenas o estoque no banco
    const livroAtualizado = await livroRepository.atualizarEstoque(id, novoEstoque);

    return livroAtualizado;
};

module.exports = {
    listarTodos,
    listarTodosComoXML,
    buscarLivrosFornecedor,
    criar,
    buscarPorId,
    atualizar,
    deletar,
    realizarVenda
};