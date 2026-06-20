// Array em memória que simula um banco de dados
let tasks = [];

// Variável para gerar IDs únicos automaticamente
let nextId = 1;

/**
 * Retorna todas as tarefas
 */
const list = () => tasks;

/**
 * Busca uma tarefa pelo ID
 */
const findById = (id) => {
    return tasks.find(t => t.id === id);
};

/**
 * Cria uma nova tarefa
 * @param {Object} data - Dados da tarefa (ex: title, done)
 */
const create = (data) => {
    // Cria um novo objeto com ID único + dados recebidos
    const newTask = { id: nextId++, ...data };

    // Adiciona no "banco"
    tasks.push(newTask);

    return newTask;
};

/**
 * Atualiza uma tarefa existente
 */
const update = (id, data) => {
    // Procura o índice da tarefa
    const index = tasks.findIndex(t => t.id === id);

    // Se não encontrou, retorna null
    if (index === -1) return null;

    // Atualiza apenas os campos enviados
    tasks[index] = { ...tasks[index], ...data };

    return tasks[index];
};

/**
 * Remove uma tarefa
 */
const remove = (id) => {
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) return false;

    // Remove do array
    tasks.splice(index, 1);

    return true;
};

// Exporta os métodos para outras camadas
module.exports = { list, findById, create, update, remove };