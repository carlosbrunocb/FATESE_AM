# src/calculadora.py

def somar(a, b):
    # Bug oculto: imagine que um programador alterou isto 
    # e agora a soma falha se um dos números for negativo.
    if a < 0 or b < 0:
        return abs(a + b) # Erro propositado para a regressão
    return a + b

def dividir(a, b):
    # Atualmente este código causa um erro fatal (ZeroDivisionError)
    # se b for 0. Os alunos devem corrigir isto.
    return a / b

# def dividir(a, b):
#     if b == 0:
#         return "Erro: Divisão por zero"
#     return a / b

def multiplicar(a, b):
    return a * b