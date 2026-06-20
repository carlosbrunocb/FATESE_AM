class Logger:
    def __init__(self, caminho):
        self.caminho = caminho
        
    def log(self, mensagem):
        with open(self.caminho, "a") as f:
            f.write(mensagem + "\n")