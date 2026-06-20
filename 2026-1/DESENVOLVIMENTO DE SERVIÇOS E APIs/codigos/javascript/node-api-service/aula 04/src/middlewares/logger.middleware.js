function logger(req, res, next) {


  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Essencial para não travar a requisição!


}
module.exports = logger;

function logger(req, res, next) {
  // Obtém a data/hora atual em formato ISO
  const timestamp = new Date().toISOString();
  
  // Obtém o método HTTP (GET, POST, etc.)
  const method = req.method;
  
  // Obtém a URL original que o cliente pediu
  const url = req.url;

  // Loga a informação no console do servidor
  console.log(
    `[${timestamp}] ${method} ${url}`
  );

  // ESSENCIAL: Passa o controle para o próximo
  // e sem isso a requisição é travada
  next();
}

module.exports = logger;