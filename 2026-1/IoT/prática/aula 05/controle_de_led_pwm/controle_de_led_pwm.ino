// Exemplo 1: Controle de Brilho de LED com PWM (Fading)

const int ledPin = 18;

void setup() {

  pinMode(ledPin, OUTPUT);
  // Em cores recentes do ESP32 (Arduino), analogWrite() é suportado
}

void loop() {

  // Sobe o brilho
  for (int brilho = 0; brilho <= 255; brilho++) {
    analogWrite(ledPin, brilho);
    delay(10);
  }

  // Desce o brilho
  for (int brilho = 255; brilho >= 0; brilho--) {
    analogWrite(ledPin, brilho);
    delay(10);
  }
}