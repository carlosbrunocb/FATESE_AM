// Importa o service responsável pelas regras de negócio.
// O controller NÃO acessa diretamente o banco de dados.
// Ele apenas recebe a requisição HTTP,
// chama o service e devolve a resposta.
const livroService = require('../services/livroService');

/**
 * Controller responsável por listar livros.
 *
 * Possui:
 * - Paginação
 * - Content Negotiation (JSON/XML)
 * - Tratamento de formato não suportado
 */
const listarLivros = async (req, res, next) => {
    try {
        // 1. Cabeçalho de negociação de conteúdo
        res.set('Vary', 'Accept');
        const accept = req.headers['accept'] || '';

        // 2. Valida se o formato é suportado
        if (accept && !(accept.includes('application/json') || accept.includes('application/xml'))) {
            return res.status(406).send('Not Acceptable');
        }

        // =======================================================
        // 3. NOVO: Captura os Query Parameters da URL (Para o Swagger)
        // Ex: /api/livros?page=1&limit=10&titulo=Senhor
        // =======================================================
        const { page, limit, titulo } = req.query;

        // 4. Se o cliente pediu XML (Módulo 3)
        if (accept.includes('application/xml')) {
            // Pode manter a versão simplificada do XML ou adaptar para receber o título também
            const xml = await livroService.listarTodosComoXML();
            res.set('Content-Type', 'application/xml');
            return res.status(200).send(xml);
        }

        // 5. Se for JSON (Padrão) - Enviamos os filtros para o Service (Aula 14)
        const dados = await livroService.listarTodos({ 
            page: Number(page) || 1, 
            limit: Number(limit) || 20,
            titulo: titulo // Envia a palavra buscada para o Repositório filtrar
        });

        // Retorna a resposta padronizada
        return res.status(200).json(dados);

    } catch (error) {
        next(error);
    }
};

/**
 * Controller responsável por criar um livro.
 */
const criarLivro = async (req, res, next) => {

    try {

        /**
         * req.body contém os dados enviados pelo cliente.
         *
         * Exemplo:
         * {
         *   "titulo": "Dom Casmurro",
         *   "autor": "Machado de Assis"
         * }
         */

        // Cria o livro usando a camada Service.
        const novoLivro = await livroService.criar(req.body);

        // Retorna HTTP 201 (Created).
        return res.status(201).json(novoLivro);

    } catch (error) {

        // Repassa erro ao middleware global.
        next(error);
    }
};

/**
 * Controller que simula integração
 * com fornecedor legado via XML.
 */
const buscarFornecedor = async (req, res, next) => {

    try {

        // Busca dados convertidos do XML.
        const dadosConvertidos =
            await livroService.buscarLivrosFornecedor();

        // Retorna JSON estruturado.
        return res.status(200).json({
            origem: 'Fornecedor Legado',
            dados: dadosConvertidos
        });

    } catch (error) {

        next(error);
    }
};

/**
 * Controller responsável por atualizar um livro.
 */
const atualizarLivro = async (req, res, next) => {

    try {

        // Recupera ID da URL.
        //
        // Exemplo:
        // PUT /livros/123
        const id = req.params.id;

        // Recupera dados enviados no body.
        const { titulo, autor, ano } = req.body;

        // Atualiza livro no banco.
        const livroAtualizado =
            await livroService.atualizar(id, {
                titulo,
                autor,
                ano
            });

        /**
         * Caso o ID não exista,
         * retorna HTTP 404.
         */
        if (!livroAtualizado) {

            return res.status(404).json({
                mensagem: "Livro não encontrado."
            });
        }

        // Retorna livro atualizado.
        res.status(200).json(livroAtualizado);

    } catch (error) {

        next(error);
    }
};

/**
 * Controller responsável por buscar livro pelo ID.
 */
const buscarLivroPorId = async (req, res, next) => {

    try {

        // Recupera ID da URL.
        const id = req.params.id;

        // Busca livro.
        const livro = await livroService.buscarPorId(id);

        // Se não existir, retorna 404.
        if (!livro) {

            return res.status(404).json({
                mensagem: "Livro não encontrado."
            });
        }

        // Retorna livro encontrado.
        return res.status(200).json(livro);

    } catch (error) {

        next(error);
    }
};

/**
 * Controller responsável por deletar livro.
 */
const deletarLivro = async (req, res, next) => {

    try {

        // Recupera ID da URL.
        const id = req.params.id;

        // Executa remoção.
        const deletado =
            await livroService.deletar(id);

        // Se não encontrou livro.
        if (!deletado) {

            return res.status(404).json({
                mensagem: "Livro não encontrado."
            });
        }

        /**
         * HTTP 204 = No Content
         *
         * Indica:
         * - operação executada com sucesso
         * - sem conteúdo de retorno
         */
        return res.status(204).send();

    } catch (error) {

        next(error);
    }
};

/**
 * Controller responsável por realizar a venda de um livro.
 */
const comprarLivro = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        // O Controller não faz ideia de como o estoque é checado ou salvo.
        // Ele apenas delega para o Service.
        const livroComprado = await livroService.realizarVenda(id);
        
        res.status(200).json({
            mensagem: "Venda realizada com sucesso!",
            estoqueRestante: livroComprado.estoque,
            livro: livroComprado.titulo
        });
    } catch (error) {
        // Se a regra de negócio (Service) jogar um erro de falta de estoque ou livro não encontrado, cai aqui (HTTP 400 - Bad Request ou outro dependendo da sua gestão global)
        res.status(400).json({ erro: error.message });
    }
};

// Atualize o exports no final do arquivo:
module.exports = { 
    listarLivros, 
    criarLivro, 
    buscarFornecedor, 
    atualizarLivro, 
    buscarLivroPorId, 
    deletarLivro, 
    comprarLivro 
};