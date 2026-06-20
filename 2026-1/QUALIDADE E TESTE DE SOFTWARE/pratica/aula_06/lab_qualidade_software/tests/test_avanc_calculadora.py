import pytest
from src.calculadora import calcular_preco_final

# Desafio 1: Exatamente no limite (sem desconto)
def test_valor_exatamente_cem_nao_deve_ter_desconto():
    assert calcular_preco_final(100) == 100

# Desafio 2: Valor Negativo (Lançamento de Erro)
def test_valor_negativo_deve_lancar_erro():
    with pytest.raises(ValueError):
        calcular_preco_final(-10)

# Desafio 3: Valor Zero (Elemento Neutro)
def test_valor_zero_deve_retornar_zero():
    assert calcular_preco_final(0) == 0