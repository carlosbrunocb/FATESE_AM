const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite a hora do dia: ', (hora) => {

    if (hora < node12)
        console.log(`${hora}, Bom dia!`);
    else if (hora < 18)
        console.log(`${hora}, Boa Tarde!`);
    else
        console.log(`${hora}, Boa Noite!`);

    rl.close();
});
