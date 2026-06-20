// Definição do pino analógico
const int pinoPot = 34; // Potenciômetro no GPIO 34

void setup() {
  Serial.begin(115200);
  pinMode(pinoPot, INPUT);
  Serial.println("Iniciando leitura do potenciômetro...");
}

void loop() {
  // 1. Leitura do valor bruto (0 a 4095)
  int valorADC = analogRead(pinoPot);

  // 2. Conversão para Tensão (Regra de três: 4095 = 3.3V)
  float voltagem = (valorADC * 3.3) / 4095.0;

  // 3. Exibição no Serial Monitor
  Serial.print("ADC: ");
  Serial.print(valorADC);
  Serial.print(" | Tensão: ");
  Serial.print(voltagem);
  Serial.println(" V");

  delay(500);
}