const prompt = require('prompt-sync')()

const hora = prompt('Digite a hora do dia: ');

if (hora < 12)
    console.log(`${hora}, Bom dia!`);
else if (hora < 18)
    console.log(`${hora}, Boa Tarde!`);
else
    console.log(`${hora}, Boa Noite!`);