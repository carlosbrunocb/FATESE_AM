// =======================================================
// Projeto: Semáforo Inteligente com ESP32
// Versão 2: Controle de tempo usando millis()
// Arquivo: semaforo_millis.ino
//
// Vantagens desta versão:
// - NÃO usa delay()
// - O código NÃO fica bloqueado
// - O ESP32 pode executar várias tarefas ao mesmo tempo
//
// Isso é essencial em projetos IoT, onde precisamos:
// - Ler sensores
// - Enviar dados pela rede
// - Atualizar displays
// - Responder a eventos
// =======================================================


// ------------------------------
// Definição dos pinos dos LEDs
// ------------------------------

// LED verde representa "Siga"
const int ledVerde = 19;

// LED amarelo representa "Atenção"
const int ledAmarelo = 18;

// LED vermelho representa "Pare"
const int ledVermelho = 5;


// --------------------------------------------------
// Variáveis para controle de tempo e estado
// --------------------------------------------------

// Guarda o momento em que o último estado começou
unsigned long tempoAnterior = 0;

// Variável que guarda o estado atual do semáforo
// 0 = Verde
// 1 = Amarelo
// 2 = Vermelho
int estadoSemaforo = 0;


// --------------------------------------------------
// Tempo de cada fase do semáforo (em milissegundos)
// --------------------------------------------------

// 3000 ms = 3 segundos
const long intervaloVerde = 3000;

// 1000 ms = 1 segundo
const long intervaloAmarelo = 1000;

// 3000 ms = 3 segundos
const long intervaloVermelho = 3000;


// --------------------------------------------------
// Função setup()
// Executa apenas uma vez quando o ESP32 inicia
// --------------------------------------------------
void setup() {

  // Configura os pinos como saída
  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarelo, OUTPUT);
  pinMode(ledVermelho, OUTPUT);

}


// --------------------------------------------------
// Função loop()
// Executa continuamente enquanto o ESP32 estiver ligado
// --------------------------------------------------
void loop() {

  // millis() retorna o tempo (em milissegundos)
  // desde que o ESP32 foi ligado
  unsigned long tempoAtual = millis();


  // =================================================
  // Máquina de Estados do Semáforo
  // =================================================
  // Cada estado representa uma fase do semáforo


  // ==============================
  // ESTADO 0 - Verde (Siga)
  // ==============================
  if (estadoSemaforo == 0) {

    digitalWrite(ledVerde, HIGH);     // Liga o verde
    digitalWrite(ledVermelho, LOW);   // Garante que o vermelho esteja desligado

    // Verifica se já passou o tempo do verde
    if (tempoAtual - tempoAnterior >= intervaloVerde) {

      tempoAnterior = tempoAtual; // Reinicia o cronômetro
      estadoSemaforo = 1;         // Muda para o próximo estado (amarelo)

      digitalWrite(ledVerde, LOW); // Desliga o verde
    }
  }


  // ==============================
  // ESTADO 1 - Amarelo (Atenção)
  // ==============================
  else if (estadoSemaforo == 1) {

    digitalWrite(ledAmarelo, HIGH); // Liga o amarelo

    // Verifica se já passou o tempo do amarelo
    if (tempoAtual - tempoAnterior >= intervaloAmarelo) {

      tempoAnterior = tempoAtual;
      estadoSemaforo = 2; // Vai para o vermelho

      digitalWrite(ledAmarelo, LOW); // Desliga o amarelo
    }
  }


  // ==============================
  // ESTADO 2 - Vermelho (Pare)
  // ==============================
  else if (estadoSemaforo == 2) {

    digitalWrite(ledVermelho, HIGH); // Liga o vermelho

    // Verifica se já passou o tempo do vermelho
    if (tempoAtual - tempoAnterior >= intervaloVermelho) {

      tempoAnterior = tempoAtual;
      estadoSemaforo = 0; // Volta para o verde

      digitalWrite(ledVermelho, LOW); // Desliga o vermelho
    }
  }


  // =================================================
  // O loop continua rodando livremente aqui!
  // =================================================
  // Diferente do delay(), o ESP32 NÃO fica parado.
  //
  // Isso significa que poderíamos aqui:
  //
  // - Ler sensores
  // - Verificar um botão de pedestre
  // - Enviar dados via Wi-Fi
  // - Atualizar um display
  //
  // Tudo ao mesmo tempo!
}


// --------------------------------------------------
// Observações importantes para aula
// --------------------------------------------------

// ✔ Estrutura pronta para adicionar botão de pedestre
// ✔ Não existe travamento do sistema
// ✔ Loop executa milhares de vezes por segundo
// ✔ Técnica muito usada em projetos IoT reais