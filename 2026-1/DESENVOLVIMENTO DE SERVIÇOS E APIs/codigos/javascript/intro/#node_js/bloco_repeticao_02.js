const prompt = require('prompt-sync')()

const valor = prompt('Digite um valor inteiro: ');

let contador = 0;

console.log(`Contando de 0 a ${valor}!`)
while(contador <= valor) {
    console.log(contador)
    contador++;
}

console.log(`Contando de ${parseInt(valor) + parseInt(1)} a ${2*valor}!`)
for(let i = parseInt(valor) + parseInt(1); i <= 2*valor; i++) {
  console.log(i)
}