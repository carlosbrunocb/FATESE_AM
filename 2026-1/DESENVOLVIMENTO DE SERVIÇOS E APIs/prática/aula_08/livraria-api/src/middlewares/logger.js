// Middleware que intercepta todas as requisições
const logger = (req, res, next) => {

  // 1. Captura o momento exato da requisição
  const dataHora = new Date().toISOString();

  // 2. Exibe no console: [DATA] MÉTODO URL
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);

  // 3. IMPORTANTE: Passa o controle para o próximo passo 
  next();
}
module.exports = logger;
