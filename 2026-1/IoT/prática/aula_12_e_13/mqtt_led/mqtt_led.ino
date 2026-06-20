// =========================================================================
// PROJETO IOT - LEITURA REAL DHT11 E CONTROLE DE LED VIA MQTT
// Placa: ESP32
// =========================================================================

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h> // 1. Inclui a biblioteca do sensor DHT

// =========================================================================
// CONFIGURAÇÕES DO SENSOR DHT11
// =========================================================================
#define DHTPIN 4      // Pino digital onde o pino de DADOS do DHT11 está conectado (GPIO 4)
#define DHTTYPE DHT11 // Define o modelo do sensor (Pode ser alterado para DHT22)

DHT dht(DHTPIN, DHTTYPE); // Cria o objeto para controlar o sensor

// =========================================================================
// CONFIGURAÇÕES DE REDE E MQTT
// =========================================================================
const char* ssid = "LIVE TIM_CB_2G";
const char* password = "CBruno365cb";

const char* mqtt_broker = "broker.hivemq.com";
const int mqtt_port = 1883;

// Tópicos MQTT (Únicos para o aluno)
const char* topic_pub = "aula12/iot/RA12345/temperatura"; 
const char* topic_sub = "aula12/iot/RA12345/led";         

// Definição de Hardware e Variáveis Globais
const int pinoLED = 2; // Pino do LED embutido no ESP32

// Controle de tempo para envio (sem usar delay)
unsigned long tempoUltimoEnvio = 0; 
const long intervaloEnvio = 5000; // Envia a cada 5 segundos

WiFiClient espClient;
PubSubClient client(espClient);

// =========================================================================
// FUNÇÃO CALLBACK: Executada quando chega mensagem para o LED
// =========================================================================
void callback(char* topic, byte* payload, unsigned int length) {
  String mensagem = "";
  for (int i = 0; i < length; i++) {
    mensagem += (char)payload[i];
  }
  
  if (mensagem == "1") {
    digitalWrite(pinoLED, HIGH);
    Serial.println("Comando via MQTT: LED LIGADO");
  } else if (mensagem == "0") {
    digitalWrite(pinoLED, LOW);
    Serial.println("Comando via MQTT: LED DESLIGADO");
  }
}

// =========================================================================
// FUNÇÃO DE CONEXÃO WI-FI
// =========================================================================
void setup_wifi() {
  delay(10);
  Serial.print("\nConectando-se ao Wi-Fi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi Conectado!");
}

// =========================================================================
// FUNÇÃO DE CONEXÃO/RECONEXÃO MQTT
// =========================================================================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    String clientId = "ESP32Client-RA12345-" + String(random(0, 1000));
    
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado!");
      client.subscribe(topic_sub); // Assina o tópico do LED
    } else {
      Serial.print("Falhou, erro=");
      Serial.print(client.state());
      Serial.println(" Tentando em 5 seg...");
      delay(5000);
    }
  }
}

// =========================================================================
// SETUP
// =========================================================================
void setup() {
  Serial.begin(115200); 

  pinMode(pinoLED, OUTPUT);
  digitalWrite(pinoLED, LOW);

  // 2. Inicializa o sensor DHT11
  dht.begin();
  Serial.println("Sensor DHT11 Inicializado.");

  setup_wifi();

  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
}

// =========================================================================
// LOOP PRINCIPAL
// =========================================================================
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long tempoAtual = millis();
  
  // 3. Lógica de Leitura e Envio a cada 5 segundos
  if (tempoAtual - tempoUltimoEnvio >= intervaloEnvio) {
    tempoUltimoEnvio = tempoAtual; 
    
    // Lê a temperatura em Celsius
    float temperatura = dht.readTemperature();
    
    // Verifica se a leitura falhou (muito importante para hardware real!)
    if (isnan(temperatura)) {
      Serial.println("Falha ao ler o sensor DHT11!");
      return; // Interrompe este ciclo do if e tenta novamente depois
    }
    
    // Converte o valor Float para String (o '1' indica uma casa decimal)
    String tempString = String(temperatura, 1);
    
    // Publica no MQTT
    client.publish(topic_pub, tempString.c_str());
    
    Serial.print("Temperatura lida e publicada: ");
    Serial.print(tempString);
    Serial.println(" °C");
  }
}