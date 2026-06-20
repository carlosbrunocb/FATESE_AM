const UsuarioModel = require('../models/Usuario');

const buscarPorEmail = async (email) => {
    // Para o login, precisamos da senha, então buscamos o documento normal do Mongoose
    return await UsuarioModel.findOne({ email }); 
};

const salvar = async (dadosUsuario) => {
    const novoUsuario = new UsuarioModel(dadosUsuario);
    return await novoUsuario.save(); // Salva e mantém as propriedades do Mongoose (ativando o seu toJSON)
};

module.exports = { buscarPorEmail, salvar };