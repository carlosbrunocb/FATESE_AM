// Função para construir a mensagem
function saudarUsuario(nome) {
    return 'Olá, ' + nome + '!';
}

// Função principal que processa a entrada e exibe a saudação
function processarSaudacao() {
    // 1. Captura o valor do input
    const nome = document.getElementById("nomeInput").value;
    
    // 2. Constrói a mensagem usando a função saudarUsuario
    const mensagem = saudarUsuario(nome);
    
    // 3. Exibe a mensagem em um alerta
    alert(mensagem);
    
    // 4. Exibe a mensagem no console
    console.log(mensagem);
    
    // 5. Exibe a mensagem em um elemento HTML
    document.getElementById("mensagemSaudacao").textContent = mensagem;
}