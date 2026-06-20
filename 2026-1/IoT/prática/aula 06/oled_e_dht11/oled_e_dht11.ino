#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

// Configurações do Display OLED
#define LARGURA_TELA 128
#define ALTURA_TELA 64
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

  // Inicializa o Display OLED (Endereço I2C padrão: 0x3C)
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("Falha ao inicializar o OLED!");
    for (;;)
      ;  // Trava o sistema se o display falhar
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println("Sistema Iniciado!");
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
      return;
    }

    // Debug no Serial Monitor
    Serial.print("Temp: ");
    Serial.print(temp);
    Serial.println(" *C");
  }
}