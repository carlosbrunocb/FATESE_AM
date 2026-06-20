class MyClass {
    // O construtor é um método especial que é utilizado
    // quando uma nova instância da classe é criada.
    constructor() {
        // Inicializa a propriedade 'count' do objeto com o valor 0.
        // O 'this' se refere à instância atual da classe.
        this.count = 0;
    }

    // O método 'myFunction' será chamado a cada clique no botão.
    myFunction() {
        // Incrementa o valor de 'count' em 1 a cada vez que a função é executada.
        this.count++;

        // Usa um operador ternário para verificar se 'count' é par ou ímpar.
        // Se 'count' for par (resto da divisão por 2 é 0), 'emoji' recebe o código do rosto triste.
        // Se for ímpar, 'emoji' recebe o código do rosto feliz.
        const emoji = (this.count % 2 === 0) ? '&#128546;' : '&#128515;';
        const text = (this.count % 2 === 0) ?
            `Classe: &lt;MyClass&gt;<br> Objeto: myInstance<br>` :
            `Método: myInstance.myFunction()<br>`;

        // Encontra o elemento HTML com o id "demo" e atualiza seu conteúdo.
        document.getElementById("demo").innerHTML =
            `Parágrafo Mudado. <br>
            <span>
                ${text}                
                >> ${emoji} <<
            </span>`;
    }
}


// Cria uma nova instância (objeto) da classe MyClass.
// O nome 'myInstance' é usado no HTML para chamar o método da classe.
const myInstance = new MyClass();