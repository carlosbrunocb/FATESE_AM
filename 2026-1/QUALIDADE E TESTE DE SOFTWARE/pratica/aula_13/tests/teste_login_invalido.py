from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from dotenv import load_dotenv

import os

# Carrega .env
load_dotenv()

# Variáveis
URL = os.getenv("LOGIN_PAGE")
USUARIO = os.getenv("USUARIO")

# Inicia navegador
driver = webdriver.Chrome()
driver.maximize_window()

# Abre página
driver.get(URL)

# Preenche login inválido
driver.find_element(By.ID, "usuario").send_keys(USUARIO)

driver.find_element(By.ID, "senha").send_keys("999")

# Espera botão
wait = WebDriverWait(driver, 10)

botao = wait.until(
    EC.element_to_be_clickable((By.ID, "login-btn"))
)

# Clique
botao.click()

# Espera mensagem aparecer
mensagem = wait.until(
    EC.presence_of_element_located((By.ID, "mensagem"))
)

# Validação
assert "inválidos" in mensagem.text

print("Teste inválido passou!")

driver.quit()