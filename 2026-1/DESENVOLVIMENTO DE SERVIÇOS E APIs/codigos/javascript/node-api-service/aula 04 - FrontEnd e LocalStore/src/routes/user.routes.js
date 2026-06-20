// Importar a função 'Router' do Express para criar um novo objeto de roteamento.
const { Router } = require('express');
// Importar o módulo 'userController', que contém a lógica para lidar com as requisições HTTP
// (a 'ponte' entre a requisição e o UserService).
const userController = require('../controllers/user.controller');
// Importar o validador
const { validateUserCreation } = require('../middlewares/validation.middleware');

// Inicializar o objeto 'router', que usaremos para definir todos os caminhos (endpoints).
const router = Router();

// --- Definição dos Endpoints (Rotas) ---

// Rota 1: GET /users
// Rota GET (sem validação de body)
// Quando uma requisição GET for enviada para '/users', a função 'getAll' do userController será executada.
// Objetivo: Listar todos os usuários.
router.get('/users', userController.getAll);

// Rota 2: POST /users
// Adicionado o middleware ANTES do controller
// Quando uma requisição POST for enviada para '/users', a função 'create' do userController será executada.
// Objetivo: Criar um novo usuário.
router.post(
    '/users',
    validateUserCreation, // Executa PRIMEIRO
    userController.create // Executa se o PRIMEIRO CHAMAR o next()
);

// Rota 3: GET /users/:id
// Rota para buscar um usuário específico.
// O ':id' é um parâmetro de rota (variável dinâmica) que será capturado em 'req.params.id' no controller.
// Objetivo: Buscar um usuário pelo seu ID.
router.get('/users/:id', userController.getById);

// 4. Exportar o objeto 'router' configurado para que o arquivo principal (server.js) possa utilizá-lo.
module.exports = router;