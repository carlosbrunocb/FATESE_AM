# def calcular_preco_final(valor):
#     # Lógica mínima: se maior que 100, desconta 10%
#     if valor > 100:
#         return valor * 0.9
#     return valor

# Definição de Constantes (Evita Números Mágicos)
LIMITE_DESCONTO = 100
PERCENTUAL_DESCONTO = 0.9

def calcular_preco_final(valor):
    if valor > LIMITE_DESCONTO:
    # Regra de negócio fica clara na leitura
        return valor * PERCENTUAL_DESCONTO
    return valor