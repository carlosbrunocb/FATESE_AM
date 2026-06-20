from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from dotenv import load_dotenv

import os

# Carrega .env
load_dotenv()

# URL
URL = os.getenv("LOGIN_PAGE")

# Navegador
driver = webdriver.Chrome()
driver.maximize_window()

# Abre página
driver.get(URL)

# Espera
wait = WebDriverWait(driver, 10)

# Verifica elementos
usuario = wait.until(
    EC.presence_of_element_located((By.ID, "usuario"))
)

senha = wait.until(
    EC.presence_of_element_located((By.ID, "senha"))
)

botao = wait.until(
    EC.presence_of_element_located((By.ID, "login-btn"))
)

# Assertions
assert usuario
assert senha
assert botao

print("Todos elementos encontrados!")

driver.quit()