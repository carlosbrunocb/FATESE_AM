/* Exemplo 2: Controle de Posição com Servomotor (ESP32) */
// Biblioteca que facilita o PWM de servo no ESP32

#include <ESP32Servo.h>

Servo meuServo;
const int pinoServo = 19;

void setup() {
  // Vincula o pino do ESP32 ao objeto de servo (gera PWM adequado)
  meuServo.attach(pinoServo);
}

void loop() {  
  // Fechada (0°)
  meuServo.write(0);
  delay(2000);
  // Aberta (45°)
  meuServo.write(45);
  delay(2000);
  // Aberta (90°)
  meuServo.write(90);
  delay(2000);
  // Aberta (135°)
  meuServo.write(135);
  delay(2000);
  // Abertura total (180°)
  meuServo.write(180);
  delay(2000);
}