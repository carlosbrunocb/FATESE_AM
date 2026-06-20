const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'livraria_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'senha123',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false, // Desativa logs SQL no terminal
        define: {
            freezeTableName: false,
            underscored: false,
            timestamps: true
        },
        pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
    }
);

module.exports = sequelize;