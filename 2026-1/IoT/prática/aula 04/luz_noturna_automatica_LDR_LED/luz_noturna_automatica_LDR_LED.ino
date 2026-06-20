const int pinoLDR = 32;
const int pinoLED = 2;
const int LIMIAR = 2000; // Ajuste este valor!

void setup() {
Serial.begin(115200);
pinMode(pinoLED, OUTPUT);
  pinMode(pinoLDR, INPUT);
}

void loop() {
  int luz = analogRead(pinoLDR);
  
  // Lógica de Decisão
  if (luz > LIMIAR) {
    digitalWrite(pinoLED, HIGH); // Escuro -> Liga
    Serial.println("Noite: LED ON");
  } else {
    digitalWrite(pinoLED, LOW);  // Claro -> Desliga
    Serial.println("Dia: LED OFF");
  }
  delay(500);
}