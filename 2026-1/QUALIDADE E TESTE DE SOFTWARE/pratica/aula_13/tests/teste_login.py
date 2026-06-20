from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from dotenv import load_dotenv

from pathlib import Path

import os
import time

# # Caminho base do projeto
# BASE_DIR = Path(__file__).resolve().parent.parent

# # Carrega .env
# load_dotenv(BASE_DIR / ".env")

# # Variáveis
# URL = os.getenv("LOGIN_PAGE")

# 1. Pega o diretório onde este script (teste_login.py) está e sobe um nível (para aula_13)
BASE_DIR = Path(__file__).resolve().parent.parent

# 2. Carrega o .env localizado na raiz do projeto
load_dotenv(BASE_DIR / ".env")

# 3. Monta o caminho relativo até o arquivo HTML
caminho_html = BASE_DIR / "webpage" / "login" / "index.html"

# 4. Converte o caminho para o formato de URL (file:///) que o Selenium entende
URL = caminho_html.as_uri()

USUARIO = os.getenv("USUARIO")

SENHA = os.getenv("SENHA")

print("URL:", URL)

# Navegador
driver = webdriver.Chrome()

driver.maximize_window()

# Abre página
driver.get(URL)

# Espera explícita
wait = WebDriverWait(driver, 10)

# Campo usuário
campo_usuario = wait.until(
    EC.presence_of_element_located((By.ID, "usuario"))
)

campo_usuario.send_keys(USUARIO)

# Campo senha
campo_senha = wait.until(
    EC.presence_of_element_located((By.ID, "senha"))
)

campo_senha.send_keys(SENHA)

# Botão
botao = wait.until(
    EC.element_to_be_clickable((By.ID, "login-btn"))
)

# Clique
botao.click()

# Espera mensagem
mensagem = wait.until(
    EC.presence_of_element_located((By.ID, "mensagem"))
)

# Verifica título
assert "Qualidade de Software" in driver.title

print("Teste passou com sucesso!")

# Screenshot
driver.save_screenshot(
    str(BASE_DIR / "screenshots/login_sucesso.png")
)

input("ENTER para finalizar")

driver.quit()