const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digita um valor inteiro: ', (valor) => {

    let contador = 0;

    console.log(`Contando de 0 a ${valor}!`)
    while(contador <= valor) {
        console.log(contador)
        contador++;
    }

    rl.close();
});
