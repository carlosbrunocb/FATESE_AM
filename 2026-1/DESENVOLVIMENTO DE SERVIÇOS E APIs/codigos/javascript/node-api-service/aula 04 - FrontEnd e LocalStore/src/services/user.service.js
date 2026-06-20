const AppError = require('../errors/AppError');
const db = require('../utils/database.util'); // Importa o bd

const DB_KEY = 'users';

// Definição da classe de serviço (Service Layer).
// A responsabilidade desta camada é conter a LÓGICA DE NEGÓCIO da aplicação,
// isolando a manipulação de dados do controlador de rotas.
class UserService {

    // Método responsável por buscar todos os usuários.
    getAll() {
        // Lógica de Negócio: Aqui seria feita a chamada ao repositório ou ORM
        // para buscar a lista completa de usuários no banco de dados.
        return db.getData(DB_KEY); // Retorna o array de usuários simulado.
    }

    // Método responsável por criar um novo usuário.
    create(userData) {
        if (!userData.email) {
            // Lança um erro 400 (Bad Request)
            throw new AppError('O campo e-mail é obrigatório.', 400);
        }

        // 1. Busca os usuários usando o utilitário
        const users = db.getData(DB_KEY);

        // 2. Lógica de negócio (Gerar ID)
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUser = { id: lastId + 1, ...userData };

        // 3. Adiciona na lista
        users.push(newUser);

        // 4. Salva usando o utilitário
        db.saveData(DB_KEY, users);

        return newUser;
    }

    // Método responsável por buscar um usuário específico pelo ID.
    getById(id) {

        // Converter o ID (string) para número (inteiro)
        const idNumber = parseInt(id);

        // Busca os dados atualizados
        const users = db.getData(DB_KEY);

        // Lógica de Negócio:
        // Converte o ID (que geralmente vem como string da URL) para um número inteiro.
        const user = users.find(u => u.id === idNumber);

        if (!user) {
            // Lança um erro 404 (Not Found)
            throw new AppError('Usuário não encontrado.', 404);
        }
        // Simula a busca no "banco de dados" (array) pelo ID correspondente.
        return user;
    }
}

// Exporta uma única instância (objeto) da classe UserService,
// tornando seus métodos disponíveis para outras partes da aplicação (ex: controllers/rotas).
module.exports = new UserService();