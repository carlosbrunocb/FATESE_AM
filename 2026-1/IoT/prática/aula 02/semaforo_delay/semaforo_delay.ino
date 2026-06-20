// =======================================================
// Projeto: Semáforo Simples com ESP32
// Versão 1: Usando delay()
// Arquivo: semaforo_delay.ino
//
// Características desta versão:
// - Código simples e fácil de entender
// - Utiliza delay() para controlar o tempo
// - PROBLEMA: delay() é bloqueante
//
// Isso significa que enquanto o delay está executando,
// o ESP32 não consegue realizar outras tarefas.
// Em projetos IoT reais isso é um problema.
//
// Em versões futuras veremos como resolver isso.
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


// -------------------------------------------------
// Função setup()
// Executa apenas UMA vez quando o ESP32 inicia
// -------------------------------------------------
void setup() {

  // Configura cada pino como saída
  // OUTPUT significa que o ESP32 enviará energia
  // para ligar ou desligar os LEDs
  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarelo, OUTPUT);
  pinMode(ledVermelho, OUTPUT);
}


// -------------------------------------------------
// Função loop()
// Executa repetidamente enquanto o ESP32 estiver ligado
// -------------------------------------------------
void loop() {

  // ==============================
  // Fase 1 - Verde (Siga)
  // ==============================

  digitalWrite(ledVerde, HIGH);     // Liga o LED verde
  digitalWrite(ledAmarelo, LOW);    // Garante que o amarelo esteja desligado
  digitalWrite(ledVermelho, LOW);   // Garante que o vermelho esteja desligado

  delay(3000); // Espera 3 segundos


  // ==============================
  // Fase 2 - Amarelo (Atenção)
  // ==============================

  digitalWrite(ledVerde, LOW);      // Desliga o verde
  digitalWrite(ledAmarelo, HIGH);   // Liga o amarelo

  delay(1000); // Espera 1 segundo


  // ==============================
  // Fase 3 - Vermelho (Pare)
  // ==============================

  digitalWrite(ledAmarelo, LOW);    // Desliga o amarelo
  digitalWrite(ledVermelho, HIGH);  // Liga o vermelho

  delay(3000); // Espera 3 segundos


  // Depois dessa fase o loop reinicia
  // e o semáforo volta ao verde
}