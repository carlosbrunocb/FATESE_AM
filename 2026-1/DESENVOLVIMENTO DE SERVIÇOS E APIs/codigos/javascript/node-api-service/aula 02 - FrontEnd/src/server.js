// 1. IMPORTAÇÕES PRINCIPAIS

// Importar o 'express', o principal framework Node.js que é usado
// para construir servidores web e definir rotas de API.
const express = require('express');

// Importar o módulo 'path', nativo do Node.js. Ele auxília a
// construir caminhos de arquivos e diretórios de forma segura,
// independentemente do sistema operacional (ex: Windows, Linux, macOS).
// Usado isso para "servir" nosso front-end (HTML, CSS).
const path = require('path');

// Importars as definições de rotas do arquivo 'user.routes.js'.
// Isso é uma boa prática chamada "separação de responsabilidades":
// o server.js cuida da configuração geral, e os arquivos de rotas
// cuidam dos endpoints específicos da API.
const userRoutes = require('./routes/user.routes');

// 2. INICIALIZAÇÃO DA APLICAÇÃO
// Criação da instância principal da nossa aplicação Express.
// A variável 'app' é o coração do servidor; é nela que
// configura-se os "middlewares" e as rotas.
const app = express();

// 3. DEFINIÇÃO DA PORTA
// Definimos a porta lógica para o servidor que irá 'escutar' por conexões.
// Quando você acessa 'http://localhost:3000', o '3000' é esta porta.
// (Em produção, isso geralmente vem de variáveis de ambiente: process.env.PORT)
const PORT = 3000;

// 4. CONFIGURAÇÃO DE MIDDLEWARES
// Middlewares são "funções no meio" que processam requisições
// ANTES que elas cheguem às nossas rotas (endpoints).

// Middleware [1]: `express.json()`
// Este é um middleware essencial. Ele "lê" o corpo (body) de requisições
// que vêm no formato JSON (como em um POST ou PUT de um front-end)
// e o transforma em um objeto JavaScript acessível via `req.body`.
app.use(express.json());

// Middleware [2]: `express.static()`
// Este middleware "serve" arquivos estáticos (como HTML, CSS, imagens
// e o JavaScript do front-end) diretamente da pasta 'public'.
// `path.join(__dirname, 'public')` cria um caminho absoluto para essa
// pasta. É isso que permite que o `http://localhost:3000/` carregue
// o `index.html` e o `style.css` automaticamente.
app.use(express.static(path.join(__dirname, 'public')));

// 5. MONTAGEM DAS ROTAS DA API
// Aqui, "montamos" nossas rotas de API. Dizemos ao Express:
// "Qualquer requisição que comece com o prefixo '/api',
// deve ser gerenciada pelo nosso `userRoutes` (que importamos lá em cima)".
//
// Exemplos:
// - Requisição `GET /api/users` -> Chama a rota `GET /users` do `userRoutes`
// - Requisição `POST /api/users` -> Chama a rota `POST /users` do `userRoutes`
//
// Isso separa nosso front-end (servido na raiz '/') da nossa API (servida em '/api').
app.use('/api', userRoutes);

// 6. INICIALIZAÇÃO DO SERVIDOR
// Este é o comando que efetivamente 'liga' o servidor.
// O método `.listen()` 'amarra' o servidor à porta que definimos (PORT)
// e fica aguardando por requisições HTTP.
//
// A função `() => {...}` é um "callback" que é executado
// *assim que* o servidor estiver pronto e rodando.
app.listen(PORT, () => {
    // Exibe uma mensagem amigável no console, indicando que tudo deu certo.
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Front-end disponível em http://localhost:${PORT}`);
});