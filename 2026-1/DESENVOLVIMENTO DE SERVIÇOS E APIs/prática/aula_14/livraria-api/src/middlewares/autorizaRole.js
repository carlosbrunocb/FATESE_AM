// src/middlewares/autorizaRole.js
const autorizaRole = (rolesPermitidas) => {
    return (req, res, next) => {
        // req.usuario foi injetado pelo middleware anterior (autenticaJWT)
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ erro: "Usuário não identificado." });
        }

        // Verifica se o array de cargos permitidos inclui o cargo do utilizador atual
        if (!rolesPermitidas.includes(usuario.role)) {
            // 403 Forbidden: Sei quem és, mas não tens permissão.
            return res.status(403).json({ 
                erro: "Acesso Negado. O teu perfil não tem permissão para realizar esta ação." 
            });
        }

        next(); // Autorizado! Segue para o Controller.
    };
};

module.exports = autorizaRole;