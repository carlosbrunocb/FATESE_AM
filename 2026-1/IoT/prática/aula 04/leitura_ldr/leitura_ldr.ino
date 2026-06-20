// Pino onde está o nó do divisor de tensão
const int pino_AO = 32;
const int pino_DO = 13;

void setup() {
  Serial.begin(115200);
  pinMode(pino_AO, INPUT);
  pinMode(pino_DO, INPUT);
}

void loop() {
  // 1. Leitura bruta (0 a 4095)
  int leitura_AO = analogRead(pino_AO);
  int leitura_DO = digitalRead(pino_DO);

  // 2. Conversão para porcentagem (aprox.)
  // Assumindo montagem: +Luz -> +Tensão
  float porcentagem = (leitura_AO / 4095.0) * 100.0;
  
  Serial.print("LDR Bruto: ");
  Serial.print(leitura_AO);
  Serial.print(" | Luz: ");
  Serial.print(porcentagem);
  Serial.println("%");

  if (leitura_DO == HIGH ) 
    Serial.println("Está escuro"); 
  else Serial.println("Está claro");
  
  delay(500);
}