// Nosso \"Banco de Dados\" temporário
let livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
  { id: 2, titulo: '1984', autor: 'George Orwell', ano: 1949 }
]

// GET /api/livros
exports.listarLivros = (req, res) => {
  return res.status(200).json(livros)
}

// GET /api/livros/:id
exports.buscarLivroPorId = (req, res) => {
  const id = parseInt(req.params.id)
  const livro = livros.find(l => l.id === id)

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado.' })
  }
  return res.status(200).json(livro)
}

// POST /livros
exports.criarLivro = (req, res) => {
  const { titulo, autor, ano } = req.body

  if (!titulo || !autor || !ano) {
    return res.status(400).json({ mensagem: 'Título, autor e ano são obrigatórios.' })
  }

  const novoLivro = {
    id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
    titulo, autor, ano
  }

  livros.push(novoLivro)
  return res.status(201).json(novoLivro)
}

// PUT /livros/:id
exports.atualizarLivro = (req, res) => {
  const id = parseInt(req.params.id)
  const { titulo, autor, ano } = req.body

  const index = livros.findIndex(l => l.id === id)
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado para atualização.' })
  }

  livros[index] = { id, titulo, autor, ano }
  return res.status(200).json(livros[index])
}

// DELETE /livros/:id
exports.deletarLivro = (req, res) => {
  const id = parseInt(req.params.id)
  const index = livros.findIndex(l => l.id === id)
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado para exclusão.' })
  }

  livros.splice(index, 1)
  return res.status(204).send()
}