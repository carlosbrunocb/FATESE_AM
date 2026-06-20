// Simulação temporária de um banco de dados (BD) utilizando um array em memória.
// Na prática, esta variável seria substituída pela conexão com um BD real (ex: PostgreSQL, MongoDB).
const users = [{ id: 1, name: 'João' }];

// Definição da classe de serviço (Service Layer).
// A responsabilidade desta camada é conter a LÓGICA DE NEGÓCIO da aplicação,
// isolando a manipulação de dados do controlador de rotas.
class UserService {

    // Método responsável por buscar todos os usuários.
    getAll() {
        // Lógica de Negócio: Aqui seria feita a chamada ao repositório ou ORM
        // para buscar a lista completa de usuários no banco de dados.
        return users; // Retorna o array de usuários simulado.
    }

    // Método responsável por criar um novo usuário.
    create(userData) {
        // Lógica de Negócio:
        // 1. Poderia haver validação dos dados de entrada (userData).
        // 2. Cria um novo objeto de usuário com um ID incremental simulado.
        const newUser = { id: users.length + 1, ...userData };
        // 3. Simula a inserção do novo usuário no "banco de dados" (array).
        users.push(newUser);
        // Retorna o objeto do usuário recém-criado.
        return newUser;
    }

    // Método responsável por buscar um usuário específico pelo ID.
    getById(id) {
        // Lógica de Negócio:
        // Converte o ID (que geralmente vem como string da URL) para um número inteiro.
        const userId = parseInt(id);
        // Simula a busca no "banco de dados" (array) pelo ID correspondente.
        return users.find(u => u.id === userId);
    }
}

// Exporta uma única instância (objeto) da classe UserService,
// tornando seus métodos disponíveis para outras partes da aplicação (ex: controllers/rotas).
module.exports = new UserService();