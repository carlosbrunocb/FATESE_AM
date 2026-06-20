const express = require('express')
const path = require('path')
const livroRoutes = require('./routes/livroRoutes')

const app = express()
const PORT = 3000

// Middleware nativo para reconhecer requisições com corpo em JSON
app.use(express.json())

// Configuração para servir a página estática (Front-end)
// Isso faz o Express olhar para a pasta 'public' quando acessarmos '/'
app.use(express.static(path.join(__dirname, '../public')))

// Plugar as rotas da livraria no caminho base '/api'
app.use('/api', livroRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Acesse a interface em: http://localhost:${PORT}`)
    console.log(`API rodando em: http://localhost:${PORT}/api/livros`)
})