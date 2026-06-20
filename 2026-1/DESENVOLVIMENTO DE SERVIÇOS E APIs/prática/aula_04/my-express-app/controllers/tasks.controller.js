// Importa a camada de serviço (regra de negócio)
const service = require('../services/tasks.service');

/**
 * GET /tasks
 * Retorna todas as tarefas
 */
function getAll(req, res) {
    return res.status(200).json(service.list());
}

/**
 * GET /tasks/:id
 * Retorna uma tarefa específica
 */
function getById(req, res) {
    const id = Number(req.params.id);

    const task = service.findById(id);

    // Validação: se não encontrou
    if (!task) {
        return res.status(404).json({ msg: 'Task não encontrada' });
    }

    return res.status(200).json(task);
}

/**
 * POST /tasks
 * Cria uma nova tarefa
 */
function create(req, res) {
    const { title, done } = req.body;

    // Validação de entrada
    if (!title) {
        return res.status(400).json({ msg: 'Title é obrigatório' });
    }

    const newTask = service.create({ title, done });

    return res.status(201).json(newTask);
}

/**
 * PUT /tasks/:id
 * Atualiza uma tarefa
 */
function update(req, res) {
    const id = Number(req.params.id);

    const updatedTask = service.update(id, req.body);

    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task não encontrada' });
    }

    return res.status(200).json(updatedTask);
}

/**
 * DELETE /tasks/:id
 * Remove uma tarefa
 */
function remove(req, res) {
    const id = Number(req.params.id);

    const removed = service.remove(id);

    if (!removed) {
        return res.status(404).json({ msg: 'Task não encontrada' });
    }

    return res.status(204).send();
}

// Exporta os métodos para as rotas
module.exports = { getAll, getById, create, update, remove };