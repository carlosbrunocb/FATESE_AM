const { LocalStorage } = require('node-localstorage');
const path = require('path');

// Configuração do local onde os arquivos serão salvos
// __dirname = src/utils
// ../   = src
const dbPath = path.join(__dirname, '../local-store');
const localStorage = new LocalStorage(dbPath);

/**
 * Busca dados de uma "tabela" (chave) específica.
 * @param {string} key - O nome da coleção (ex: 'users', 'products')
 * @returns {Array} - O array de dados
 */
function getData(key) {
    const dataString = localStorage.getItem(key);
    // Se não existir dados, retorna array vazio para não quebrar o código
    return dataString ? JSON.parse(dataString) : [];
}

/**
 * Salva dados em uma "tabela" (chave) específica.
 * @param {string} key - O nome da coleção (ex: 'users')
 * @param {Array} data - O array de dados para salvar
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

module.exports = {
    getData,
    saveData
};