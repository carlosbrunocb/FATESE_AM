// Define uma constante chamada LED associada ao pino 2 do ESP32
// Esse pino será usado para controlar o LED
const int LED = 2;


// A função setup() executa apenas UMA vez quando o ESP32 liga ou reinicia
void setup() {

    // Define o pino do LED como saída (OUTPUT)
    // Isso significa que o ESP32 poderá enviar energia para o LED
    pinMode(LED, OUTPUT);

    // Inicializa a comunicação serial com o computador
    // 115200 é a velocidade de comunicação (baud rate)
    // Usamos isso para enviar mensagens para o Monitor Serial
    Serial.begin(115200);
}


// A função loop() executa continuamente enquanto o ESP32 estiver ligado
void loop() {

    // Envia uma mensagem para o Monitor Serial
    // Muito útil para testes e depuração do código
    Serial.println("Hello World ESP32!");

    // Liga o LED (HIGH envia 3.3V para o pino)
    digitalWrite(LED, HIGH);

    // Espera 500 milissegundos (0.5 segundo)
    delay(500);

    // Desliga o LED (LOW envia 0V para o pino)
    digitalWrite(LED, LOW);

    // Espera mais 500 milissegundos
    delay(500);
}