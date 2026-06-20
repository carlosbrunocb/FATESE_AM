const express = require('express')
const livroRoutes = require('./routes/livroRoutes')

const app = express()
const PORT = 3000

// Middleware nativo para reconhecer requisições com corpo em JSON
app.use(express.json())

// Plugar as rotas da livraria no caminho base '/api'
app.use('/api', livroRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Acesse: http://localhost:${PORT}/api/livros`)
})