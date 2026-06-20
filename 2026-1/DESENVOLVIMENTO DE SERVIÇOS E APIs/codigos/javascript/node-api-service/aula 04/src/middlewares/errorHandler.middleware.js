function errorHandler(err, req, res, next) {
    
    // Loga o erro no console (essencial para debug)
    console.error('ERRO DETECTADO:', err.message);
    
    // Define um status code padrão (Erro Interno do Servidor)
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Ocorreu um erro interno no servidor.'
    });
 }
 
 module.exports = errorHandler;