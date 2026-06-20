const AppError = require('../errors/AppError');
const usersDB = []; // Nosso "banco" em memória

// Definição da classe de serviço (Service Layer).
// A responsabilidade desta camada é conter a LÓGICA DE NEGÓCIO da aplicação,
// isolando a manipulação de dados do controlador de rotas.
class UserService {

    // Método responsável por buscar todos os usuários.
    getAll() {
        // Lógica de Negócio: Aqui seria feita a chamada ao repositório ou ORM
        // para buscar a lista completa de usuários no banco de dados.
        return usersDB; // Retorna o array de usuários simulado.
    }

    // Método responsável por criar um novo usuário.
    create(userData) {
        if (!userData.email) {
            // Lança um erro 400 (Bad Request)
            throw new AppError('O campo e-mail é obrigatório.', 400);
        }

        // Lógica de Negócio:
        // 1. Poderia haver validação dos dados de entrada (userData).
        // 2. Cria um novo objeto de usuário com um ID incremental simulado.
        const newUser = { id: usersDB.length + 1, ...userData };
        // 3. Simula a inserção do novo usuário no "banco de dados" (array).
        usersDB.push(newUser);
        // Retorna o objeto do usuário recém-criado.
        return newUser;
    }

    // Método responsável por buscar um usuário específico pelo ID.
    getById(id) {

        // Converter o ID (string) para número (inteiro)
        const idNumber = parseInt(id);
        // Lógica de Negócio:
        // Converte o ID (que geralmente vem como string da URL) para um número inteiro.
        const user = usersDB.find(u => u.id === idNumber);
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