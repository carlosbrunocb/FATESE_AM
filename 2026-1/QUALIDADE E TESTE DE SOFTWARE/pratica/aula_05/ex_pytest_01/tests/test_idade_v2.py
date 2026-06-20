import pytest

from src.sistema_v2 import eh_maior_de_idade

@pytest.mark.parametrize("idade, esperado", [
    (18, True),
    (17, False),
    (21, True)
    ])

def test_fronteira_idade(idade, esperado):
    assert eh_maior_de_idade(idade) is esperado

def test_idade_negativa_erro():
    with pytest.raises(ValueError):
        eh_maior_de_idade(-5)