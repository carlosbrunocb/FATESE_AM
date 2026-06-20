/**
 * =========================================================
 * ARQUIVO PRINCIPAL DO SERVIDOR (server.js / app.js)
 * =========================================================
 * 
 * Este arquivo é o ponto de entrada da aplicação.
 * Sua responsabilidade é:
 * 
 * 1) Carregar variáveis de ambiente (.env)
 * 2) Importar a aplicação Express
 * 3) Conectar ao banco MongoDB
 * 4) Iniciar o servidor HTTP
 * 
 * Fluxo de inicialização:
 * 
 * .env → conexão MongoDB → servidor Express → rotas da API
 * 
 * =========================================================
 */


/**
 * Carrega automaticamente as variáveis do arquivo .env
 * para dentro do objeto process.env
 * 
 * Exemplo:
 * MONGODB_URI=mongodb://localhost:27017/biblioteca
 * 
 * Depois poderá ser acessado com:
 * process.env.MONGODB_URI
 */
require('dotenv').config();


/**
 * Importa a aplicação Express configurada no arquivo app.js
 * 
 * O app.js normalmente contém:
 * - middlewares
 * - rotas
 * - tratamento de erros
 */
const app = require('./app');


/**
 * Importa a função responsável pela conexão com o MongoDB
 * utilizando Mongoose.
 * 
 * O arquivo database.js encapsula toda a lógica de conexão.
 */
const connectDB = require('./config/database');

// No seu server.js, adicione a importação:
const inicializarBanco = require('./config/seed');


/**
 * Porta onde o servidor ficará disponível.
 * 
 * Exemplo de acesso:
 * http://localhost:3000
 */
const PORT = 3000;


/**
 * =========================================================
 * INICIALIZAÇÃO DA APLICAÇÃO
 * =========================================================
 * 
 * O servidor HTTP só será iniciado após a conexão com
 * o MongoDB ser concluída com sucesso.
 * 
 * Isso evita:
 * 
 * ❌ API funcionando sem banco
 * ❌ erros de consulta logo ao iniciar
 * ❌ requisições falhando por falta de conexão
 * 
 * =========================================================
 */
connectDB().then(async () => {

    // CHAMADA DO SEED: Isso limpa o banco e cria os 5 livros antes do servidor subir
    try {
        await inicializarBanco();
    } catch (error) {
        console.error("Erro ao inicializar o banco:", error);
    }

    /**
     * Inicializa o servidor Express
     * 
     * app.listen():
     * - abre a porta HTTP
     * - deixa a API acessível externamente
     */
    app.listen(PORT, () => {

        /**
         * Mensagem exibida no terminal quando
         * o servidor iniciar corretamente.
         */
        console.log(`🚀 Servidor rodando na porta ${PORT}`);

        /**
         * Endpoint principal da API
         */
        console.log(`Acesse: http://localhost:${PORT}/api/livros`);
    });

});


/**
 * =========================================================
 * EXEMPLO DE EXECUÇÃO
 * =========================================================
 * 
 * node server.js
 * 
 * ou utilizando nodemon:
 * 
 * npm run dev
 * 
 * =========================================================
 */


/**
 * =========================================================
 * BOAS PRÁTICAS UTILIZADAS
 * =========================================================
 * 
 * ✅ Separação de responsabilidades
 * ✅ Inicialização controlada do servidor
 * ✅ Uso de variáveis de ambiente
 * ✅ Conexão assíncrona com banco
 * ✅ Estrutura escalável
 * 
 * =========================================================
 */