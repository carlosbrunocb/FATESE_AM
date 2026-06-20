
volatile bool intrusaoDetectada = false;
TaskHandle_t TaskAlarme;

#define pinoPIR 27
#define pinoAlarme 26

void tocarSirene(void *parameter) {
    for(;;) { // Loop infinito da Task
        if (intrusaoDetectada) {
            // Toca alarme intermitente
            digitalWrite(pinoAlarme, HIGH);
            vTaskDelay(200 / portTICK_PERIOD_MS);
            digitalWrite(pinoAlarme, LOW);
            vTaskDelay(200 / portTICK_PERIOD_MS);
        } else {
            digitalWrite(pinoAlarme, LOW);
            vTaskDelay(100 / portTICK_PERIOD_MS);
        }
    }
}

// ISR: Executada automaticamente quando PIR detecta movimento
void IRAM_ATTR detectouMovimento() {
    // Apenas altera o estado - rápido e direto
    intrusaoDetectada = true;
}

void setup() {
    // Inicialização serial
    Serial.begin(115200);

    // Configuração dos pinos
    pinMode(pinoPIR, INPUT);
    pinMode(pinoAlarme, OUTPUT);

    // Configura interrupção no GPIO 27
    attachInterrupt(digitalPinToInterrupt(pinoPIR), detectouMovimento, RISING);

    // Criação da Task no FreeRTOS
    // @param:
    //   - tocarSirene: Função da Task
    //   - "Task_Sirene": Nome da tarefa
    //   - 10000: tamanhdo da Stack (memoria em palavras)
    //   - NULL: Parâmetro da task
    //   - 1: Prioridade
    //   - &TaskAlarme: Handle (“ponteiro” para controlar a task)
    xTaskCreate(tocarSirene, "Task_Sirene", 10000, NULL, 1, &TaskAlarme);
}

void loop() {
    if (intrusaoDetectada) {
        Serial.println("ALERTA: Intrusão Detectada!");
        // Simula envio de dados pesado
        delay(5000);
        intrusaoDetectada = false;
    }
    delay(10);
}