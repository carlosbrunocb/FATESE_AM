// Importa a biblioteca Mongoose,
// responsável por conectar e manipular o MongoDB no Node.js
const mongoose = require('mongoose');

// Configuração de compatibilidade do Mongoose.
// O strictQuery controla como filtros de busca são interpretados.
// true = apenas campos definidos no schema serão aceitos nas consultas.
mongoose.set('strictQuery', true);

// Função assíncrona responsável por realizar a conexão com o banco MongoDB
const connectDB = async () => {

    // Recupera a URI de conexão salva nas variáveis de ambiente.
    // Exemplo:
    // mongodb://localhost:27017/meubanco
    // ou conexão do MongoDB Atlas.
    const uri = process.env.MONGODB_URI;

    try {

        // Realiza a conexão com o banco de dados.
        // await faz o sistema "esperar" a conexão acontecer.
        await mongoose.connect(uri, {

            // Tempo máximo de espera para encontrar o servidor MongoDB.
            // Se ultrapassar 5 segundos, gera erro.
            serverSelectionTimeoutMS: 5000
        });

        // Mensagem exibida no terminal caso a conexão funcione.
        console.log('🍃 MongoDB Conectado!');

    } catch (err) {

        // Caso aconteça algum erro na conexão,
        // exibe a mensagem de erro no terminal.
        console.error('❌ Erro:', err.message);

        // Encerra a aplicação com código de erro.
        // Isso evita que a API continue rodando sem banco conectado.
        process.exit(1);
    }
};

// Exporta a função para ser utilizada em outros arquivos.
// Exemplo: app.js ou server.js
module.exports = connectDB;