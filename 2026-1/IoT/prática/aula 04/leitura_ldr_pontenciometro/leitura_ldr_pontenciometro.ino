// Definição dos pinos
const int pinoPot = 34; // Potenciômetro (Analog Input Only)
const int pinoLDR = 32; // LDR (Divisor de Tensão)

void setup() {
  // 1. Inicializa comunicação Serial
  Serial.begin(115200);

  // 2. Configura pinos como entrada
  pinMode(pinoPot, INPUT);
  pinMode(pinoLDR, INPUT);
}

void loop() {
  // 3. Leitura dos sensores (0 - 4095)
  int valorPot = analogRead(pinoPot);
  int valorLDR = analogRead(pinoLDR);

  // 4. Exibição Formatada: "Pot: 2000 | LDR: 1500"
  Serial.print("Pot: ");
  Serial.print(valorPot);
  Serial.print(" | LDR: ");
  Serial.println(valorLDR);

  delay(500); // Atualiza a cada meio segundo
}