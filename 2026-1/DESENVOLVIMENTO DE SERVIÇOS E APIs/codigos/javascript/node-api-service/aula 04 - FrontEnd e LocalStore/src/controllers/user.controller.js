// 1. Importar o módulo 'userService', que contém toda a LÓGICA DE NEGÓCIO
// (o código de manipulação de dados que você criou anteriormente).
const userService = require('../services/user.service');

// Definição da classe de controlador (Controller Layer).
// A responsabilidade desta camada é processar as requisições HTTP (req) e enviar as respostas (res).
class UserController {

    // Método assíncrono para listar todos os usuários (GET /users).
    async getAll(req, res) {

        // Chama o método 'getAll' do Service para obter a lista de usuários.
        const users = userService.getAll();
        res.json({ success: true, data: users });
    }

    // Método assíncrono para criar um novo usuário (POST /users).
    async create(req, res, next) { // Next é adicionado

        try {
            // Lógica de sucesso
            const newUser = userService.create(req.body);
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            // Se der erro, DELEGUE!
            next(error);
        }
    }

    // Método assíncrono para buscar um usuário pelo ID (GET /users/:id).
    async getById(req, res) {

        // O parâmetro 'id' da URL é acessado via 'req.params'.
        // Ex: Se a URL for /users/10, 'req.params.id' será '10'.
        // Chama o método 'getById' do Service para buscar o usuário.
        const user = userService.getById(req.params.id);

        // Verifica se o usuário foi encontrado (tratamento de erro).
        if (!user) {
            // Se não encontrar, retorna o status HTTP 404 (Not Found - Não Encontrado)
            // e uma mensagem de erro.
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        // Se encontrar, retorna o usuário com o status 200 (OK - padrão).
        res.json({ success: true, data: user });
    }
}

// Exporta uma única instância da classe UserController para ser usada no arquivo de rotas.
module.exports = new UserController();