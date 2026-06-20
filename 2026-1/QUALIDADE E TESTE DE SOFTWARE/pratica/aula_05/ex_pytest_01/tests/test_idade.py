from src.sistema import eh_maior_de_idade

# Red (Vermelho) Pequeno teste para uma funcionalidade que ainda não existe.
# Teste inicial falhará se a função eh_maior_de_idade não tiver sido implementada (Fase Red)
def test_deve_retornar_true_se_maior_ou_igual_a_18():
    # Arrange (Preparação)
    idade = 20
    # Act (Ação) & Assert (Verificação)
    assert eh_maior_de_idade(idade) is True