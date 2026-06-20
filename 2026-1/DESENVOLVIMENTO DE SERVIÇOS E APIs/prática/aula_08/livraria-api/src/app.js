const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/livroRoutes'); // Apontando direto para as rotas de livro

const app = express();

// Middlewares globais
app.use(express.json());
app.use(logger); // Aplica o log em TUDO

// Rotas da aplicação
app.use('/api', routes);

// Middleware global de tratamento de erros (DEVE SER O ÚLTIMO MIDDLEWARE DECLARADO)
app.use(errorHandler);

// ------------------
// + Realiza a população do Banco de Dados
const sequelize = require('./config/database');
const Livro = require('./models/Livro');

sequelize.sync({ force: false }).then(async () => {
    const count = await Livro.count();
    if (count === 0) {
        await Livro.bulkCreate([
            { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
            { titulo: '1984', autor: 'George Orwell', ano: 1949 },
            { titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', ano: 1605 }
        ]);
        console.log('✅ Seed completado!');
    }
}).catch(err => {
    console.error('❌ Erro:', err);
});

module.exports = app;