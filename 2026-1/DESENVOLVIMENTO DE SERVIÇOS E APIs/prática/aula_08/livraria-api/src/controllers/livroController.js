const livroService = require('../services/livroService');

const listarLivros = async (req, res, next) => {
    try {
        res.set('Vary', 'Accept');
        const accept = req.headers['accept'] || '';

        // 406 se o cliente pedir um formato não suportado
        if (accept && !(accept.includes('application/json') ||
            accept.includes('application/xml'))) {
            return res.status(406).send('Not Acceptable');
        }

        // Negociação para XML
        if (accept.includes('application/xml')) {
            const xmlData = await livroService.listarTodosComoXML();
            res.type('application/xml');
            return res.status(200).send(xmlData);
        }

        // Padrão: JSON
        const livros = await livroService.listarTodos();
        return res.status(200).json(livros);

    } catch (error) {
        next(error); // Repassa o erro para o errorHandler
    }
};

const criarLivro = async (req, res, next) => {
    try {
        // ✅ Validação já ocorreu no middleware `validaLivro`!
        // O req.body chega aqui 100% confiável
        const { titulo, autor, ano } = req.body;

        // Foco total na Regra de Negócio terceirizada para o Service
        const novoLivro = await livroService.criar({ titulo, autor, ano });

        return res.status(201).json(novoLivro);
    } catch (error) {
        next(error);
    }
};

const buscarFornecedor = async (req, res, next) => {
    try {
        const dadosConvertidos = await livroService.buscarLivrosFornecedor();
        return res.status(200).json({ origem: 'Fornecedor Legado', dados: dadosConvertidos });
    } catch (error) {
        next(error);
    }
};

// Adicionar o 'async' à assinatura da função
const atualizarLivro = async (req, res, next) => { 
    try {
        const id = req.params.id;
        const { titulo, autor, ano } = req.body;

        // Adicionar o 'await' na chamada ao serviço
        const livroAtualizado = await livroService.atualizar(id, { titulo, autor, ano }); 

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
    buscarFornecedor,
    criarLivro,
    atualizarLivro
};