#include <WiFi.h>
#include <WebServer.h>

// 1. Credenciais WiFi
const char* ssid = "LIVE TIM_CB_2G";
const char* password = "CBruno365cb";

// 2. Instâncias do servidor
WebServer server(80);
const int pinoLED = 2;

// Protótipos das funções
void rotaRaiz();
void rotaLigar();
void rotaDesligar();
String gerarHTML();

// 3. Setup do ESP32
void setup() {
  Serial.begin(115200);
  pinMode(pinoLED, OUTPUT);
  digitalWrite(pinoLED, LOW);

  // Conexão WiFi
  Serial.print("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // IP do servidor
  Serial.println("\nConectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  // Configura rotas
  server.on("/", HTTP_GET, rotaRaiz);
  server.on("/ligar", HTTP_GET, rotaLigar);
  server.on("/desligar", HTTP_GET, rotaDesligar);

  server.begin();
  Serial.println("Servidor iniciado");
}

void loop() {
  server.handleClient();
}

// 4. Função para gerar HTML
String gerarHTML() {
  String html = "<!DOCTYPE html><html>";
  html += "<head><meta charset=\"UTF-8\"><title>ESP32 WebServer</title></head>";
  html += "<body><h1>Painel de Controle IoT</h1>";
  html += "<a href=\"/ligar\">LIGAR</a><br>";
  html += "<a href=\"/desligar\">DESLIGAR</a>";
  html += "</body></html>";
  return html;
}

// Handlers para as rotas
void rotaRaiz() {
  server.send(200, "text/html", gerarHTML());
}

void rotaLigar() {
  digitalWrite(pinoLED, HIGH);
  Serial.println("Comando via Web: LIGAR");
  server.send(200, "text/html", gerarHTML());
}

void rotaDesligar() {
  digitalWrite(pinoLED, LOW);
  Serial.println("Comando via Web: DESLIGAR");
  server.send(200, "text/html", gerarHTML());
}