function validateUserCreation(req, res, next) {
  // Acessa o 'name' e 'email' do req.body
  // (Isso só funciona se app.use(express.json()) foi executado antes)
  const { name, email } = req.body;

  // Verifica-se alguma das informações está faltando
  if (!name || !email) {
    // Se faltar: É BARRADO A ENTRADA
    // Envia-se uma resposta de erro (400 Bad Request)
    // E NÃO É CHAMADO next()!
    return res.status(400).json({
      success: false,
      message: 'Nome e email são obrigatórios.'
    });
  }

  // Se passou na validação: DEIXE PASSAR
  // Chama-se next() para ir para o Controller
  next();
}

module.exports = { validateUserCreation };