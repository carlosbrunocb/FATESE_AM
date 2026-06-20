import pytest

# Testando se uma exceção é lançada
def test_deve_falhar_com_zero():
    with pytest.raises(ValueError):
        dividir(10, 0)

# Parametrização (Testar múltiplos casos)
@pytest.mark.parametrize("entrada, esperado", [(2, True), (3, False), (4, True)])

def test_eh_par(entrada, esperado):
    assert eh_par(entrada) == esperado