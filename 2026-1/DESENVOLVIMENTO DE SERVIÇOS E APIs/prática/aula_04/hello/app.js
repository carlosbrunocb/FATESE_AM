const express = require('express');

// Inicializa a aplicação
const app = express();

// Define a rota raiz '/'
app.get('/', (req, res) => {
    return res.send('Hello, Express! \n Olá Alunos!');
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('http://localhost:3000');
});