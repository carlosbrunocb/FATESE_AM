// src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

const registrar = async (nome, email, senha) => {
    // 1. Verifica se o e-mail já existe
    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
        throw new Error('E-mail já cadastrado.');
    }

    // 2. Criptografa a senha (Hash)
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // 3. Salva no banco
    const novoUsuario = await usuarioRepository.salvar({
        nome,
        email,
        senha: senhaCriptografada
    });

    return novoUsuario;
};

const login = async (email, senha) => {
    // 1. Busca usuário pelo e-mail
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) {
        throw new Error('Credenciais inválidas.');
    }

    // 2. Compara a senha enviada com a senha criptografada do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error('Credenciais inválidas.');
    }

    // 3. Gera o Token JWT (válido por 1 hora)
    const token = jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
};

module.exports = { registrar, login };