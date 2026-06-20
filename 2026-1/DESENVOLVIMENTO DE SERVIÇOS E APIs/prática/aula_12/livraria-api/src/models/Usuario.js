/**
 * =========================================================
 * MODELO DE USUÁRIO (User Model)
 * =========================================================
 * Este arquivo define a estrutura (Schema) da coleção de 
 * usuários no banco de dados MongoDB utilizando o Mongoose.
 * * Ele não apenas define os campos, mas também aplica 
 * validações, normalização de dados e regras de segurança.
 * =========================================================
 */
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    
    // Nome do usuário
    nome: { 
        type: String, 
        required: [true, 'O nome é obrigatório'], // Impede o cadastro sem nome
        trim: true, // Remove espaços acidentais no início e no fim (ex: " João " vira "João")
        maxlength: [100, 'O nome não pode ter mais de 100 caracteres'] // Limite de segurança
    },
    
    // E-mail de acesso (utilizado para login)
    email: { 
        type: String, 
        required: [true, 'O e-mail é obrigatório'], 
        unique: true, // Cria um índice no MongoDB garantindo que não haverá e-mails duplicados
        trim: true,
        lowercase: true // Normalização: converte tudo para minúscula antes de salvar (João@Email.com vira joao@email.com)
    },
    
    // Senha criptografada (Hash)
    senha: { 
        type: String, 
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha deve conter no mínimo 6 caracteres']
        /**
         * ⚠️ Dica de Segurança:
         * Como usaremos o Bcrypt para gerar um hash da senha antes de salvar, 
         * este hash sempre terá cerca de 60 caracteres. Para garantir que o usuário 
         * digitou uma senha com no mínimo 6 caracteres, faça essa validação também 
         * no Controller, antes da criptografia acontecer!
         */
    },
    
    // Controle de Permissões (RBAC - Role-Based Access Control)
    role: {
        type: String,
        enum: ['usuario', 'admin'], // Trava o campo: aceita APENAS esses valores exatos
        default: 'usuario' // Se o front-end não enviar este campo, o sistema assume 'usuario' por padrão
    },
    
    // Controle de status da conta (Soft Delete / Exclusão Lógica)
    ativo: {
        type: Boolean,
        default: true // Permite "desativar" o usuário sem deletar seus dados, preservando o histórico de compras/vendas
    }
}, { 
    // Configurações globais do Schema
    timestamps: true, // Cria automaticamente as colunas 'createdAt' (criado em) e 'updatedAt' (atualizado em)
    versionKey: false // Remove o campo '__v' gerado por padrão pelo Mongoose para controle interno de versão
});


/**
 * =========================================================
 * MÉTODO DE SEGURANÇA (Interceptador de Resposta)
 * =========================================================
 * Sobrescreve o método padrão do Mongoose que converte o 
 * documento para JSON.
 * * Por que isso é vital?
 * Toda vez que o Express usar `res.json(usuario)`, este 
 * método será acionado automaticamente. Ele remove a senha 
 * do objeto antes de enviá-lo para a requisição HTTP.
 * Isso garante que a senha (mesmo criptografada) NUNCA 
 * vaze para o cliente (Frontend, Postman ou Insomnia).
 */
UsuarioSchema.methods.toJSON = function() {
    const usuario = this.toObject(); // Converte o documento Mongoose complexo para um objeto JavaScript puro
    delete usuario.senha;            // Deleta a propriedade de senha do objeto
    return usuario;                  // Retorna o objeto limpo para a API
};

// Exporta o modelo para ser utilizado nos Repositórios
module.exports = mongoose.model('Usuario', UsuarioSchema);