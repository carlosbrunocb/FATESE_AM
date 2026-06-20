const express = require('express');

// Cria um roteador isolado
const router = express.Router();

// Importa o controller
const controller = require('../controllers/tasks.controller');

/**
 * Mapeamento de rotas:
 * Cada rota chama um método do controller
 */

// Listar todas as tarefas
router.get('/', controller.getAll);

// Buscar por ID
router.get('/:id', controller.getById);

// Criar tarefa
router.post('/', controller.create);

// Atualizar tarefa
router.put('/:id', controller.update);

// Remover tarefa
router.delete('/:id', controller.remove);

// Exporta o roteador
module.exports = router;