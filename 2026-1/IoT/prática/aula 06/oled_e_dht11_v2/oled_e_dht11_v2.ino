#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

// Configurações do Display OLED
#define LARGURA_TELA 128
#define ALTURA_TELA 64
#define ENDERECO_OLED 0x3C
Adafruit_SSD1306 display(LARGURA_TELA, ALTURA_TELA, &Wire, -1);

// Configurações do DHT11
#define PINO_DHT 4
#define TIPO_DHT DHT11
DHT dht(PINO_DHT, TIPO_DHT);

// Timer para não travar o loop
unsigned long tempoAnterior = 0;
const long intervaloLeitura = 2000;

void setup() {
  Serial.begin(115200);

  // Inicializa o Sensor
  dht.begin();

  // Inicializa o Display OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, ENDERECO_OLED)) {
    Serial.println("Falha ao inicializar o OLED!");
    for (;;);
  }

  // Mensagem inicial
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(20, 20);
  display.println("A carregar...");
  display.display();
  delay(2000);
}

void loop() {
  unsigned long agora = millis();
  
  if (agora - tempoAnterior >= intervaloLeitura) {
    tempoAnterior = agora;

    // Leitura dos dados
    float umid = dht.readHumidity();
    float temp = dht.readTemperature();

    // Verifica se a leitura falhou
    if (isnan(umid) || isnan(temp)) {
      Serial.println("Falha na leitura do DHT!");
      
      // Aviso no OLED em caso de erro
      display.clearDisplay();
      display.setCursor(0, 10);
      display.println("Erro no Sensor!");
      display.display();
      return;
    }

    // 1. Debug no Serial Monitor
    Serial.print("Temp: ");
    Serial.print(temp);
    Serial.print(" *C | Umid: ");
    Serial.print(umid);
    Serial.println(" %");

    // 2. Atualização do Display OLED
    display.clearDisplay(); // Limpa o buffer

    // Cabeçalho
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("MONITOR DE AMBIENTE");
    display.drawFastHLine(0, 12, 128, SSD1306_WHITE); // Linha divisória

    // Exibição da Temperatura
    display.setCursor(0, 25);
    display.print("Temperatura:");
    display.setTextSize(2); // Fonte maior para o valor
    display.setCursor(0, 38);
    display.print(temp, 1); // 1 casa decimal
    display.write(247);     // Símbolo de grau (°)
    display.print("C");

    // Exibição da Humidade
    display.setTextSize(1);
    display.setCursor(85, 25);
    display.print("Umid:");
    display.setTextSize(2);
    display.setCursor(85, 38);
    display.print((int)umid); // Valor inteiro
    display.print("%");

    display.display(); // Envia para o tela
  }
}