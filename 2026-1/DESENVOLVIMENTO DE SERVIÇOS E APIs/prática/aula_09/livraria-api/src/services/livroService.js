// Importa a biblioteca xml2js,
// utilizada para converter objetos JavaScript em XML
// e também interpretar XML para objetos JS.
const xml2js = require('xml2js');

// Importa o Model Livro.
// Esse model representa a coleção "livros" no MongoDB.
const Livro = require('../models/Livro');

/**
 * Lista livros com paginação.
 *
 * @param {Object} params - Parâmetros de paginação
 * @param {number} params.page - Página atual
 * @param {number} params.limit - Quantidade de itens por página
 *
 * @returns {Object} Dados paginados
 */
const listarTodos = async ({ page = 1, limit = 20 }) => {

    // Calcula quantos registros devem ser ignorados.
    // Exemplo:
    // página 2 com limite 20 => pula 20 registros
    const skip = (page - 1) * limit;

    // Executa as consultas em paralelo para melhor desempenho.
    const [items, total] = await Promise.all([

        // Busca livros com paginação.
        Livro.find()
            .skip(skip)
            .limit(limit)

            // Retorna objetos JS simples,
            // reduzindo overhead do Mongoose.
            .lean(),

        // Conta total de documentos da coleção.
        Livro.countDocuments()
    ]);

    // Retorna resultado estruturado.
    return {
        items,
        total,
        page,

        // Calcula total de páginas.
        pages: Math.ceil(total / limit)
    };
};

/**
 * Retorna todos os livros no formato XML.
 *
 * Exemplo de saída:
 * <biblioteca>
 *   <livro>...</livro>
 * </biblioteca>
 */
const listarTodosComoXML = async () => {

    // 1. Busca os dados do banco de dados (o seu listarTodos retorna { items, total, ... })
    const resultado = await listarTodos({ page: 1, limit: 100 }); 
    const livrosArray = resultado.items; 

    // 2. LIMPEZA DOS DADOS (A SOLUÇÃO)
    // Transforma tudo em texto JSON e de volta para objeto puro.
    // Isso força o `ObjectId` e campos de `Date` a virarem texto simples.
    const livrosLimpos = JSON.parse(JSON.stringify(livrosArray)); 

    // 3. Configura o construtor do XML
    const builder = new xml2js.Builder({

        // Nome da tag raiz
        rootName: 'biblioteca',

        // Remove cabeçalho XML
        // <?xml version="1.0"?>
        headless: true
    });

    // 4. Envolve o array na chave 'livro'
    // Isso ensina o xml2js a criar <livro>...</livro> para cada item, em vez de <0> e <1>
    return builder.buildObject({ livro: livrosLimpos });
};

/**
 * Simula integração com fornecedor externo.
 *
 * Neste exemplo:
 * - Recebe XML
 * - Faz parsing
 * - Retorna objeto JS
 */
const buscarLivrosFornecedor = async () => {

    // XML simulado vindo de fornecedor externo.
    const xmlFornecedor = `
        <fornecedor>
            <livro id="99">
                <titulo>O Guia do Mochileiro</titulo>
            </livro>
        </fornecedor>
    `;

    // Configuração do parser XML.
    const parser = new xml2js.Parser({

        // Evita transformar tudo em arrays.
        explicitArray: false
    });

    try {

        // Converte XML em objeto JavaScript.
        const res = await parser.parseStringPromise(xmlFornecedor);

        // Retorna o livro do fornecedor.
        return res.fornecedor.livro;

    } catch (err) {

        // Tratamento de erro de integração.
        throw new Error('Falha ao integrar com o fornecedor.');
    }
};

/**
 * Cria um novo livro no banco de dados.
 *
 * @param {Object} dadosLivro - Dados do livro
 * @returns {Object} Livro criado
 */
const criar = async (dadosLivro) => {

    // Insere documento na coleção.
    return await Livro.create(dadosLivro);
};

/**
 * Busca um livro pelo ID.
 *
 * @param {string} id - ID do documento MongoDB
 * @returns {Object|null} Livro encontrado
 */
const buscarPorId = async (id) => {

    // Busca pelo _id.
    return await Livro.findById(id).lean();
};

/**
 * Atualiza um livro existente.
 *
 * @param {string} id - ID do livro
 * @param {Object} dadosAtualizados - Novos dados
 *
 * @returns {Object|null} Documento atualizado
 */
const atualizar = async (id, dadosAtualizados) => {

    return await Livro.findByIdAndUpdate(

        // Documento alvo
        id,

        // Dados para atualização
        dadosAtualizados,

        {
            // Retorna documento atualizado
            new: true,

            // Executa validações do schema
            runValidators: true
        }
    );
};

/**
 * Remove um livro do banco.
 *
 * @param {string} id - ID do livro
 * @returns {boolean} true se removeu com sucesso
 */
const deletar = async (id) => {

    // Remove documento pelo ID.
    const removido = await Livro.findByIdAndDelete(id);

    // Retorna true se encontrou e removeu.
    return removido !== null;
};

// Exporta os serviços para utilização
// em controllers e rotas da aplicação.
module.exports = {
    listarTodos,
    listarTodosComoXML,
    buscarLivrosFornecedor,
    criar,
    buscarPorId,
    atualizar,
    deletar
};