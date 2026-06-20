// src/middlewares/autenticaJWT.js
const jwt = require('jsonwebtoken');

const autenticaJWT = (req, res, next) => {
    // 1. Pega o header de autorização (Bearer Token)
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
    }

    // 2. Extrai apenas o token (remove a palavra "Bearer ")
    const token = authHeader.replace('Bearer ', '');

    try {
        // 3. Verifica se o token é válido e foi assinado com nosso JWT_SECRET
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Salva as informações do usuário na requisição para uso futuro
        req.usuario = decodificado;
        
        // 5. Permite o acesso à rota
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};

module.exports = autenticaJWT;