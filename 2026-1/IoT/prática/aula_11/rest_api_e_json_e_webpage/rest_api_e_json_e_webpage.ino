// ======================================================
// Aula 11 - Redes, APIs REST e IoT com ESP32
// Projeto: Dashboard Web de Clima
//
// Objetivos da aula:
// - Conectar o ESP32 no Wi-Fi
// - Consumir uma API REST da internet
// - Ler dados em formato JSON
// - Criar um servidor Web no ESP32
// - Exibir dados em HTML no navegador
// ======================================================

// Biblioteca para conexão Wi-Fi do ESP32
#include <WiFi.h>

// Biblioteca para realizar requisições HTTP
#include <HTTPClient.h>

// Biblioteca para criar um servidor Web HTTP
#include <WebServer.h>

// Biblioteca para manipular JSON
#include <ArduinoJson.h>

// ======================================================
// CONFIGURAÇÃO DA REDE WI-FI
// ======================================================

// Nome da rede Wi-Fi
const char* ssid = "LIVE TIM_CB_2G";

// Senha da rede Wi-Fi
const char* password = "CBruno365cb";

// ======================================================
// API DE CLIMA (Open-Meteo)
// ======================================================

// URL da API REST
// A API retorna informações climáticas em JSON
//
// Coordenadas utilizadas:
// Latitude:  -3.119
// Longitude: -60.021
//
// Cidade aproximada: Manaus/AM
//
const char* urlApi =
  "http://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.021&current=temperature_2m,relative_humidity_2m";

// ======================================================
// SERVIDOR WEB
// ======================================================

// Cria um servidor HTTP na porta 80
//
// Porta 80 = padrão Web (HTTP)
//
WebServer server(80);

// ======================================================
// VARIÁVEIS GLOBAIS
// ======================================================

// Armazena temperatura recebida da API
float temperatura = 0;

// Armazena umidade recebida da API
int umidade = 0;

// ======================================================
// CONTROLE DE TEMPO COM MILLIS()
// ======================================================

// Armazena o instante da última requisição
unsigned long tempoAnterior = 0;

// Intervalo entre requisições HTTP
//
// 15000 ms = 15 segundos
//
const long intervaloRequisicao = 15000;

// ======================================================
// PROTÓTIPOS DAS FUNÇÕES
// ======================================================

// Consulta dados da API
void consultarClima();

// Função da rota principal "/"
void rotaRaiz();

// Gera a página HTML
String gerarHTML();

// ======================================================
// SETUP
// Executa apenas uma vez
// ======================================================

void setup() {

  // Inicializa comunicação Serial
  Serial.begin(115200);

  Serial.println("Conectando ao Wi-Fi...");

  // Define ESP32 como estação Wi-Fi
  //
  // WIFI_STA = conecta em um roteador
  //
  WiFi.mode(WIFI_STA);

  // Inicia conexão com rede Wi-Fi
  WiFi.begin(ssid, password);

  // Aguarda conexão com a rede
  while (WiFi.status() != WL_CONNECTED) {

    delay(500);

    Serial.print(".");
  }

  Serial.println("\nWi-Fi conectado!");

  // Exibe IP do ESP32
  //
  // Esse IP será usado no navegador
  //
  Serial.print("IP do ESP32: ");
  Serial.println(WiFi.localIP());

  // ====================================================
  // CONFIGURAÇÃO DAS ROTAS WEB
  // ====================================================

  // Quando acessar "/"
  // executar a função rotaRaiz()
  //
  server.on("/", rotaRaiz);

  // Inicializa servidor HTTP
  server.begin();

  Serial.println("Servidor Web iniciado!");
}

// ======================================================
// LOOP PRINCIPAL
// Executa continuamente
// ======================================================

void loop() {

  // Mantém servidor Web funcionando
  //
  // Processa requisições HTTP recebidas
  //
  server.handleClient();

  // Obtém tempo atual desde que ESP32 iniciou
  unsigned long tempoAtual = millis();

  // Verifica se já passou o intervalo definido
  //
  // Técnica NÃO BLOQUEANTE
  //
  // Melhor que usar delay()
  //
  if (tempoAtual - tempoAnterior >= intervaloRequisicao) {

    // Atualiza marcador de tempo
    tempoAnterior = tempoAtual;

    // Consulta API de clima
    consultarClima();
  }
}

// ======================================================
// CONSULTA API REST
// ======================================================

void consultarClima() {

  // Verifica se Wi-Fi está conectado
  if (WiFi.status() == WL_CONNECTED) {

    // Cria cliente HTTP
    HTTPClient http;

    // Tempo máximo de espera da resposta
    http.setTimeout(5000);

    // Inicia conexão HTTP com API
    http.begin(urlApi);

    Serial.println("\nConsultando API...");

    // Realiza requisição GET
    //
    // GET = solicitar dados
    //
    int codigoHttp = http.GET();

    // ==================================================
    // SUCESSO HTTP
    // ==================================================

    // HTTP_CODE_OK = código 200
    //
    // Significa:
    // requisição realizada com sucesso
    //
    if (codigoHttp == HTTP_CODE_OK) {

      // Obtém resposta da API
      //
      // A resposta vem em formato JSON
      //
      String payload = http.getString();

      Serial.println("\n===== JSON RECEBIDO =====");

      // Exibe JSON bruto no terminal
      Serial.println(payload);

      // ==================================================
      // PROCESSAMENTO DO JSON
      // ==================================================

      // Cria documento JSON
      DynamicJsonDocument doc(1024);

      // Converte texto JSON em objeto manipulável
      DeserializationError erro =
        deserializeJson(doc, payload);

      // ==================================================
      // JSON PROCESSADO COM SUCESSO
      // ==================================================

      if (!erro) {

        // Lê temperatura do JSON
        //
        // Caminho:
        // current -> temperature_2m
        //
        temperatura =
          doc["current"]["temperature_2m"];

        // Lê umidade do JSON
        umidade =
          doc["current"]["relative_humidity_2m"];

        Serial.println("\n===== DADOS CLIMÁTICOS =====");

        Serial.print("Temperatura: ");
        Serial.println(temperatura);

        Serial.print("Umidade: ");
        Serial.println(umidade);

      } else {

        // Erro ao interpretar JSON
        Serial.print("Erro JSON: ");
        Serial.println(erro.c_str());
      }

    } else {

      // Erro HTTP
      Serial.print("Erro HTTP: ");
      Serial.println(codigoHttp);
    }

    // Finaliza conexão HTTP
    http.end();
  }
}

// ======================================================
// GERAÇÃO DA PÁGINA HTML
// ======================================================

String gerarHTML() {

  // Variável que armazenará HTML completo
  String html = "";

  // ====================================================
  // ESTRUTURA HTML
  // ====================================================

  html += "<!DOCTYPE html>";
  html += "<html lang='pt-BR'>";

  // ====================================================
  // CABEÇALHO HTML
  // ====================================================

  html += "<head>";

  // Codificação UTF-8
  html += "<meta charset='UTF-8'>";

  // Responsividade para celular
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";

  // Título da página
  html += "<title>Dashboard IoT</title>";

  // ====================================================
  // CSS EMBUTIDO
  // ====================================================

  html += "<style>";

  // Estilo da página
  html += "body{";
  html += "font-family:Arial;";
  html += "background:#0f172a;";
  html += "color:white;";
  html += "text-align:center;";
  html += "padding-top:50px;";
  html += "}";

  // Cartão central
  html += ".card{";
  html += "background:#1e293b;";
  html += "width:300px;";
  html += "margin:auto;";
  html += "padding:20px;";
  html += "border-radius:12px;";
  html += "}";

  // Título principal
  html += "h1{color:#38bdf8;}";

  // Estilo dos valores climáticos
  html += ".valor{";
  html += "font-size:32px;";
  html += "margin:20px;";
  html += "}";

  html += "</style>";

  html += "</head>";

  // ====================================================
  // CORPO DA PÁGINA
  // ====================================================

  html += "<body>";

  html += "<div class='card'>";

  html += "<h1>Clima em Manaus</h1>";

  // Temperatura
  html += "<div class='valor'>";
  html += "🌡 ";
  html += String(temperatura);
  html += " °C";
  html += "</div>";

  // Umidade
  html += "<div class='valor'>";
  html += "💧 ";
  html += String(umidade);
  html += " %";
  html += "</div>";

  html += "</div>";

  html += "</body>";
  html += "</html>";

  // Retorna HTML pronto
  return html;
}

// ======================================================
// ROTA PRINCIPAL "/"
// ======================================================

void rotaRaiz() {

  // Envia página HTML para navegador
  //
  // 200 = sucesso HTTP
  // text/html = tipo do conteúdo
  //
  server.send(200, "text/html", gerarHTML());
}