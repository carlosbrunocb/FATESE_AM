class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Passa a mensagem para a classe Error (pai)
    
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Garante o nome correto

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;