// src/models/Livro.js
const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Título é obrigatório'],
        trim: true,
        minlength: 2
    },
    autor: {
        type: String,
        required: [true, 'Autor é obrigatório'],
        trim: true
    },
    ano: {
        type: Number,
        required: true,
        min: 0,
        max: 2100
    },
    // NOVO CAMPO: ESTOQUE
    estoque: {
        type: Number,
        required: true,
        min: [0, 'O estoque não pode ser negativo'],
        default: 0
    },
    generos: {
        type: [String],
        default: []
    },
    detalhes: {
        paginas: {
            type: Number,
            min: 1
        },
        editora: {
            type: String,
            trim: true
        }
    },
    idioma: {
        type: String,
        enum: ['Português', 'Inglês', 'Espanhol'],
        default: 'Português'
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Livro', LivroSchema);