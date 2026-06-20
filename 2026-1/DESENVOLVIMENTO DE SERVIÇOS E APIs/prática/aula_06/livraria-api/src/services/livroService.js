// Simulando nosso "banco de dados" em memória
let livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
  { id: 2, titulo: '1984', autor: 'George Orwell', ano: 1949 }
]

let proximoId = 3;

const listarTodos = () => {
    return livros;
};

const criar = (dadosLivro) => {
    // Aplica regras de negócio (ex: gerar ID)
    const novoLivro = {
        id: proximoId++,
        titulo: dadosLivro.titulo,
        autor: dadosLivro.autor,
        ano: dadosLivro.ano
    };
    
    livros.push(novoLivro);
    return novoLivro;
};

const atualizar = (id, dadosAtualizados) => {
    const index = livros.findIndex(l => l.id === parseInt(id));
    
    // Se não encontrou, retorna null para o Controller lidar com o erro 404
    if (index === -1) return null; 

    // Atualiza os dados
    livros[index] = { ...livros[index], ...dadosAtualizados };
    return livros[index];
};

module.exports = {
    listarTodos,
    criar,
    atualizar
};