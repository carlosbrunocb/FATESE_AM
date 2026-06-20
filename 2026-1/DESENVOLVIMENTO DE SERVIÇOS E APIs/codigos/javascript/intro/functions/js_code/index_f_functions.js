// Funções de exemplo
// Função declarativa
function somar(a, b) {
    return a + b;
}

// Função anônima (expressão de função)
const multiplicar = function (a, b) {
    return a * b;
};

var end_SOMAR = somar;

// Arrow function
const subtrair = (a, b) => a - b;

// Exibindo os resultados no HTML
document.addEventListener('DOMContentLoaded', () => {
    // Exibe o resultado da função somar
    // const resultadoSomar = somar(5, 3);
    // const resultadoSomar = end_SOMAR(5, 3);
    // document.getElementById('resultado-somar').textContent = resultadoSomar;
    document.getElementById('resultado-somar').textContent = end_SOMAR(5, 3);

    // Exibe o resultado da função multiplicar
    const resultadoMultiplicar = multiplicar(5, 3);
    document.getElementById('resultado-multiplicar').textContent = resultadoMultiplicar;

    // Exibe o resultado da função subtrair
    const resultadoSubtrair = subtrair(5, 3);
    document.getElementById('resultado-subtrair').textContent = resultadoSubtrair;
});