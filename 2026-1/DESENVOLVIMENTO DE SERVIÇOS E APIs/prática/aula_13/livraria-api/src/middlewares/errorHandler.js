// Middleware Especial: recebe 4 argumentos
const errorHandler = (err, req, res, next) => {

    // 1. Loga o erro para o desenvolvedor (console do servidor)
    console.error(err.stack);

    // 2. Retorna uma resposta segura para o cliente
    res.status(500).json({
        erro: "Erro Interno no Servidor",
        mensagem: "Algo deu errado. Tente novamente mais tarde."
    });
};

module.exports = errorHandler;