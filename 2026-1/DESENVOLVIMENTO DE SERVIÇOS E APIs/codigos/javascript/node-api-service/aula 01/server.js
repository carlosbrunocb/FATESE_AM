// 1. Importar o express
const express = require('express');

// 2. Criar a "aplicação" (nosso servidor)
const app = express();

// 3. Definir a porta que o servidor vai rodar
const PORT = 3000;

// 4. Criar nossa primeira Rota (Endpoint)
// Método: GET | Recurso: / (raiz)
app.get('/', (request, response) => {
  // 'request' (req) = O que o cliente enviou
  // 'response' (res) = O que vamos devolver
  
  response.send('Hello World! Oi Turma');
});

// 5. "Ligar" o servidor para ouvir requisições
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});