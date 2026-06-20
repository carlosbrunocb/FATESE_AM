// =======================================================
// Projeto: Semáforo com Botão de Pedestre
// Arquivo: semaforo_pedestres.ino
//
// Objetivo:
// Simular um semáforo inteligente onde o pedestre pode
// apertar um botão para solicitar a travessia.
//
// Quando o botão é pressionado:
// 1) O semáforo de carros pisca verde (alerta)
// 2) Passa para amarelo
// 3) Fica vermelho para carros e verde para pedestres
// 4) Após alguns segundos, volta ao estado inicial
//
// Observação:
// Este código ainda usa delay(), portanto o sistema
// fica bloqueado durante as fases do semáforo.
// Em projetos IoT reais podemos melhorar usando millis().
// =======================================================


// --------------------------------------------------
// Pinos do Semáforo de Carros
// --------------------------------------------------

// LED Verde dos carros (Siga)
const int carVerde = 19;

// LED Amarelo dos carros (Atenção)
const int carAmarelo = 18;

// LED Vermelho dos carros (Pare)
const int carVermelho = 5;


// --------------------------------------------------
// Pinos do Semáforo de Pedestres
// --------------------------------------------------

// LED Verde para pedestres (Pode atravessar)
const int pedVerde = 21;

// LED Vermelho para pedestres (Não atravesse)
const int pedVermelho = 22;


// --------------------------------------------------
// Pino do botão de pedestre
// --------------------------------------------------

// Quando o pedestre pressiona o botão,
// ele solicita a travessia
const int btnPedestre = 4;


// --------------------------------------------------
// Função setup()
// Executa apenas uma vez quando o ESP32 liga
// --------------------------------------------------
void setup() {

  // Configura os LEDs como saída
  pinMode(carVerde, OUTPUT);
  pinMode(carAmarelo, OUTPUT);
  pinMode(carVermelho, OUTPUT);

  pinMode(pedVerde, OUTPUT);
  pinMode(pedVermelho, OUTPUT);

  // Configura o botão como entrada com resistor interno
  // INPUT_PULLUP mantém o pino em HIGH quando o botão
  // não está pressionado
  pinMode(btnPedestre, INPUT_PULLUP);


  // --------------------------------------------------
  // Estado Inicial do sistema
  // --------------------------------------------------
  // Carros podem passar
  digitalWrite(carVerde, HIGH);

  // Pedestres devem esperar
  digitalWrite(pedVermelho, HIGH);
}


// --------------------------------------------------
// Função loop()
// Executa continuamente enquanto o ESP32 estiver ligado
// --------------------------------------------------
void loop() {

  // Verifica se o botão foi pressionado
  // Com INPUT_PULLUP:
  // HIGH = botão solto
  // LOW  = botão pressionado
  if (digitalRead(btnPedestre) == LOW) {

    // Pequena pausa para evitar ruído do botão
    // chamada de "debounce"
    delay(50);

    // Confirma se o botão ainda está pressionado
    if (digitalRead(btnPedestre) == LOW) {

      // ==========================================
      // 1. Alerta: Piscar LED verde dos carros
      // ==========================================
      // Isso avisa os motoristas que o sinal irá fechar
      // 5 piscadas de 200 ms

      for (int i = 0; i < 5; i++) {

        digitalWrite(carVerde, LOW);
        delay(100);

        digitalWrite(carVerde, HIGH);
        delay(100);
      }


      // ==========================================
      // 2. Transição: Amarelo
      // ==========================================
      // Indica que o semáforo está mudando

      digitalWrite(carVerde, LOW);
      digitalWrite(carAmarelo, HIGH);

      delay(1000); // espera 1 segundo


      // ==========================================
      // 3. Travessia de Pedestres
      // ==========================================
      // Carros param e pedestres podem atravessar

      digitalWrite(carAmarelo, LOW);
      digitalWrite(carVermelho, HIGH);

      digitalWrite(pedVermelho, LOW);
      digitalWrite(pedVerde, HIGH);

      delay(3000); // tempo de travessia


      // ==========================================
      // 4. Retorno ao estado inicial
      // ==========================================

      digitalWrite(carVermelho, LOW);
      digitalWrite(carVerde, HIGH);

      digitalWrite(pedVerde, LOW);
      digitalWrite(pedVermelho, HIGH);


      // ==========================================
      // 5. Cooldown
      // ==========================================
      // Pequena pausa antes de aceitar
      // uma nova solicitação de pedestre

      delay(3000);
    }
  }
}