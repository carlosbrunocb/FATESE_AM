class Calculadora:
    def __init__(self, logger):
        # Injeção de Dependência do Logger
        self.logger = logger

    def somar(self, a, b):
        resultado = a + b
        # Efeito colateral: Escrever no disco
        self.logger.log(f"{a} + {b} = {resultado}")

        return resultado