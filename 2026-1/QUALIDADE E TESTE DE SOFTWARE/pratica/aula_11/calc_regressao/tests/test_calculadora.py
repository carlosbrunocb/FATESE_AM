# tests/test_calculadora.py
import pytest
from src.calculadora import somar, dividir, multiplicar

# Testes de Funcionalidades Existentes (Segurança de Regressão)
def test_soma_positiva():
    assert somar(2, 3) == 5

def test_multiplicacao():
    assert multiplicar(10, 5) == 50

# Teste que irá falhar devido ao Bug de Regressão (Soma Negativa)
def test_soma_negativa():
    assert somar(-2, -3) == -5

# Teste que irá falhar e precisa de correção (Cenário de Erro)
def test_divisao_por_zero():
    # O objetivo é que o código retorne None ou uma mensagem em vez de quebrar
    assert dividir(10, 0) == "Erro: Divisão por zero"