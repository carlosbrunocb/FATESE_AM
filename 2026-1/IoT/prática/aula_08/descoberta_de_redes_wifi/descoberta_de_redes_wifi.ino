// Inclui a biblioteca WiFi do ESP32
#include "WiFi.h"

void setup() {

  Serial.begin(115200); // Inicializa serial
  WiFi.mode(WIFI_STA); // Define como estação
  WiFi.disconnect(true); // Garante desconexão
  delay(100); // Estabiliza o rádio

}

void loop() {
  Serial.println("Escaneando redes...");
  int n = WiFi.scanNetworks();
  if (n == 0) {
    Serial.println("Nenhuma rede encontrada.");
  } else {

    Serial.printf("%d redes encontradas:\n", n);

    for (int i = 0; i < n; ++i) {
      Serial.printf("%d: %s (%d dBm)\n", i + 1,
                    WiFi.SSID(i).c_str(), WiFi.RSSI(i));
    }
  }

  delay(5000);
}
