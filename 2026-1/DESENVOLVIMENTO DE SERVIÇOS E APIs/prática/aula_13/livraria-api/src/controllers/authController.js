// src/controllers/authController.js
const authService = require('../services/authService');

const registrarUsuario = async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Nome, e-mail e senha são obrigatórios." });
        }

        // Validação do tamanho da senha ANTES de ir para o Service/Bcrypt
        if (senha.length < 6) {
            return res.status(400).json({ erro: "A senha deve conter no mínimo 6 caracteres." });
        }

        // Se usar o seu Schema, precisamos garantir o lean(false) ou salvar direto
        await authService.registrar(nome, email, senha);
        
        res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

const loginUsuario = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
        }

        const token = await authService.login(email, senha);
        
        res.status(200).json({ 
            mensagem: "Login realizado com sucesso!",
            token: token 
        });
    } catch (error) {
        res.status(401).json({ erro: error.message }); // 401 = Unauthorized
    }
};

module.exports = { registrarUsuario, loginUsuario };