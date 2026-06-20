// Arquivo: src/models/Livro.js
const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'livros',
    timestamps: true // Cria createdAt e updatedAt
});
module.exports = Livro;