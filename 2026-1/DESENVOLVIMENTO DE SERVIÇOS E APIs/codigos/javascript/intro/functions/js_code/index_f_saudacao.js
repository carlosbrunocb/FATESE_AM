// Declaração de função
function saudacao() {
    alert('Olá!');
}

// Com parâmetros
function saudarUsuario(nome) {
    return 'Olá, ' + nome + '!';
}

// Chamada da função e exibição no console
saudacao(); // Exibe alerta

const mensagem = saudarUsuario('Carlos');
console.log(mensagem); // Exibe "Olá, Carlos!" no console