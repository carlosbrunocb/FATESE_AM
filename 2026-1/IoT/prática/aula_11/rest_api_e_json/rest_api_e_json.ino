// Aula 11 - Redes e APIs
// App: Consulta de Clima com JSON e REST

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Credenciais Wi-Fi para o ambiente simulado Wokwi
const char* ssid = "LIVE TIM_CB_2G";
const char* password = "CBruno365cb";


// URL da API Open-Meteo configurada para as coordenadas de Manaus/AM
const char* urlApi = "http://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.021&current=temperature_2m,relative_humidity_2m";

// Variáveis para temporização não-bloqueante
unsigned long tempoAnterior = 0;
const long intervaloRequisicao = 15000;

void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.println("Conectando ao Wi-Fi...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi conectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  unsigned long tempoAtual = millis();
  // Requisição periódica
  if (tempoAtual - tempoAnterior >= intervaloRequisicao) {
    tempoAnterior = tempoAtual;

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.setTimeout(5000);
      http.begin(urlApi);

      Serial.println("\nRealizando requisição HTTP...");
      int codigoHttp = http.GET();

      if (codigoHttp == HTTP_CODE_OK) {
        Serial.println("Resposta recebida!");

        String payload = http.getString();
        JsonDocument doc;
        DeserializationError erro = deserializeJson(doc, payload);
        
        if (!erro) {
          float temp = doc["current"]["temperature_2m"];
          int umid = doc["current"]["relative_humidity_2m"];

          Serial.println("\n===== JSON RECEBIDO =====");
          Serial.println(payload);

          Serial.println("===== DADOS CLIMÁTICOS =====");
          Serial.printf("Temp: %.1f °C, Umid: %d %%\n", temp, umid);
        } else {
          Serial.print("Erro JSON: ");
          Serial.println(erro.c_str());
        }
      }
      http.end();
    }
  }
}
