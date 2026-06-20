#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Configurações do Display OLED
#define LARGURA_TELA 128 
#define ALTURA_TELA 64 
#define ENDERECO_OLED 0x3C // Endereço comum para displays 0.96"

// Inicializa o display usando os pinos padrão do ESP32 (SDA: 21, SCL: 22)
Adafruit_SSD1306 display(LARGURA_TELA, ALTURA_TELA, &Wire, -1);

// Definição dos pinos
const int pinoPot = 34; 
const int pinoLED = 18;  

void setup() {
  Serial.begin(115200);
  
  pinMode(pinoPot, INPUT);
  pinMode(pinoLED, OUTPUT);

  // Inicializa o Display OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, ENDERECO_OLED)) {
    Serial.println(F("Falha ao iniciar o OLED SSD1306"));
    for(;;); // Trava o programa se o display não for encontrado
  }

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(0, 10);
  display.println("Sistema Iniciado!");
  display.display();
  delay(1000);
}

void loop() {
  // 1. Leitura do valor bruto
  int valorADC = analogRead(pinoPot);

  // 2. Cálculos e Mapeamento
  float voltagem = (valorADC * 3.3) / 4095.0;
  int brilhoPWM = map(valorADC, 0, 4095, 0, 255);
  int porcentagem = map(valorADC, 0, 4095, 0, 100);

  // 3. Ação no LED
  analogWrite(pinoLED, brilhoPWM);

  // 4. Exibição no Monitor Serial
  Serial.printf("ADC: %d | V: %.2fV | Brilho: %d%%\n", valorADC, voltagem, porcentagem);

  // 5. Atualização do Display OLED
  display.clearDisplay(); // Limpa a tela para a nova escrita
  
  // Título
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("CONTROLE DE BRILHO");
  display.drawFastHLine(0, 10, 128, SSD1306_WHITE); // Linha decorativa

  // Exibindo a Voltagem
  display.setTextSize(1);
  display.setCursor(0, 25);
  display.print("Tensao: ");
  display.setTextSize(2); // Texto maior para os valores
  display.print(voltagem, 2);
  display.println(" V");

  // Exibindo a Porcentagem
  display.setTextSize(1);
  display.setCursor(0, 45);
  display.print("Brilho: ");
  display.setTextSize(2);
  display.print(porcentagem);
  display.println(" %");

  display.display(); // Envia os dados para a tela de fato

  delay(100); // Resposta rápida para o display não "engasgar"
}