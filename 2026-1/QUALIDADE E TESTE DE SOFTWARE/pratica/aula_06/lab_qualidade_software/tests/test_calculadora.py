from src.calculadora import calcular_preco_final

def test_deve_aplicar_dez_por_cento_de_desconto_em_cem_reais():
    # Arrange (Preparação)
    valor_compra = 200
    esperado = 180

    # Act (Ação)
    resultado = calcular_preco_final(valor_compra)
    
    # Assert (Verificação)
    assert resultado == esperado