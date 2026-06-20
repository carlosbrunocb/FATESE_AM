def test_integra_soma_e_log(tmp_path):
    # 1. Arrange (Preparação)
    from src.calculadora import Calculadora
    from src.log import Logger

    # Cria um caminho de arquivo único e temporário para este teste
    arquivo_teste = tmp_path / "historico_teste.txt"
    print(f"\nO ARQUIVO ESTÁ AQUI: {arquivo_teste}")
    
    # Instancia o Logger real apontando para o diretório temporário
    logger = Logger(caminho=str(arquivo_teste))
    calc = Calculadora(logger=logger)

    # 2. Act (Ação)
    resultado = calc.somar(2, 3)

    # 3. Assert (Verificação)
    assert resultado == 5
    
    # Verifica se o arquivo foi realmente criado e escrito
    conteudo_arquivo = arquivo_teste.read_text()
    assert "2 + 3 = 5" in conteudo_arquivo