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

        // Define o cabeçalho HTTP "Vary".
        // Informa que a resposta pode mudar
        // dependendo do header Accept enviado pelo cliente.
        res.set('Vary', 'Accept');

        // Recupera o header Accept.
        // Exemplo:
        // application/json
        // application/xml
        const accept = req.headers['accept'] || '';

        /**
         * Verifica se o cliente pediu um formato suportado.
         *
         * Caso não seja JSON nem XML,
         * retorna erro HTTP 406.
         *
         * 406 = Not Acceptable
         */
        if (
            accept &&
            !(accept.includes('application/json') ||
              accept.includes('application/xml'))
        ) {
            return res.status(406).send('Not Acceptable');
        }

        /**
         * Negociação de conteúdo para XML.
         *
         * Se o cliente solicitar XML:
         * - chama o service
         * - define o content-type
         * - envia XML
         */
        if (accept.includes('application/xml')) {

            // Busca dados em XML.
            const xmlData = await livroService.listarTodosComoXML();

            // Define o tipo de resposta.
            res.type('application/xml');

            // Retorna XML.
            return res.status(200).send(xmlData);
        }

        /**
         * Resposta padrão em JSON.
         */

        // Recupera parâmetros da URL.
        // Exemplo:
        // /livros?page=2&limit=10
        const { page = 1, limit = 20 } = req.query;

        // Busca livros paginados.
        const livros = await livroService.listarTodos({

            // Converte string para número.
            page: Number(page),
            limit: Number(limit)
        });

        // Retorna resposta JSON.
        return res.status(200).json(livros);

    } catch (error) {

        // Encaminha erro para o middleware global.
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
 * Exporta os controllers
 * para utilização nas rotas.
 */
module.exports = {
    listarLivros,
    buscarFornecedor,
    criarLivro,
    atualizarLivro,
    buscarLivroPorId,
    deletarLivro
};