// Importa a biblioteca Mongoose,
// utilizada para modelar e manipular dados no MongoDB.
const mongoose = require('mongoose');

// Criação do Schema (estrutura da coleção).
// O Schema define:
// - quais campos existirão
// - tipos de dados
// - validações
// - regras do documento
const LivroSchema = new mongoose.Schema({

    // Campo: título do livro
    titulo: {

        // Tipo do dado
        type: String,

        // Campo obrigatório.
        // Se não for enviado, retorna a mensagem personalizada.
        required: [true, 'Título é obrigatório'],

        // Remove espaços extras no início e no fim do texto.
        trim: true,

        // Quantidade mínima de caracteres.
        minlength: 2
    },

    // Campo: autor do livro
    autor: {
        type: String,

        // Campo obrigatório
        required: [true, 'Autor é obrigatório'],

        // Remove espaços desnecessários
        trim: true
    },

    // Campo: ano de publicação
    ano: {

        // Tipo numérico
        type: Number,

        // Campo obrigatório
        required: true,

        // Valor mínimo permitido
        min: 0,

        // Valor máximo permitido
        max: 2100
    },

    // Campo: gêneros do livro
    // Exemplo:
    // ["Fantasia", "Aventura"]
    generos: {

        // Array de strings
        type: [String],

        // Valor padrão caso nada seja informado
        default: []
    },

    // Objeto interno com informações adicionais
    detalhes: {

        // Quantidade de páginas
        paginas: {

            // Número inteiro
            type: Number,

            // Não aceita valores menores que 1
            min: 1
        },

        // Nome da editora
        editora: {
            type: String,

            // Remove espaços extras
            trim: true
        }
    },

    // Idioma do livro
    idioma: {
        type: String,

        // Aceita apenas os valores definidos na lista
        enum: ['Português', 'Inglês', 'Espanhol'],

        // Valor padrão
        default: 'Português'
    },

    // ISBN do livro
    isbn: {
        type: String,

        // Não permite ISBN repetido no banco
        unique: true,

        // sparse:true permite múltiplos documentos sem ISBN.
        // O unique só será aplicado quando o campo existir.
        sparse: true
    }

}, {

    // Cria automaticamente:
    // createdAt -> data de criação
    // updatedAt -> data da última atualização
    timestamps: true,

    // Remove o campo "__v" criado pelo Mongoose.
    // Esse campo controla versão interna do documento.
    versionKey: false
});

// Exporta o model para ser utilizado em outros arquivos.
// O MongoDB criará automaticamente a coleção "livros".
module.exports = mongoose.model('Livro', LivroSchema);