def test_assertivas_comuns():
    # Verificando igualdade
    assert 1 + 1 == 2
    # Verificando strings
    assert "Pytest" in "Curso de Pytest"
    # Verificando listas e tamanho
    lista = [1, 2, 3]
    assert len(lista) == 3
    assert lista != [3, 2, 1] # Ordem importapyt