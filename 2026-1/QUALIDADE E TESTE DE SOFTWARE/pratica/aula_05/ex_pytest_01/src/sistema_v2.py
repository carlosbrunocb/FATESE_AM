# Refatoração
def eh_maior_de_idade(idade: int) -> bool:
    # Validação adicionada para passar no novo teste (Refactor)
    if idade < 0:
        raise ValueError("Idade não pode ser negativa")
    return idade >= 18