const validaLivro = (req, res, next) => {

  // 1. Desestrutura dados do corpo da requisição
  const { titulo, autor, ano } = req.body;

  // 2. Verifica se algum campo obrigatório está faltando
  if (!titulo || !autor || !ano) {

    // 3. SHORT-CIRCUIT: Encerra com erro 400 
    return res.status(400).json({
      erro: 'Dados inválidos',
      mensagem: 'Os campos são obrigatórios.'
    });
  }

  // 4. Sucesso: Passa o controle para o Controller 
  next();
}

module.exports = validaLivro;