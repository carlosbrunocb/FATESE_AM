// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API da Livraria Acadêmica',
            version: '1.0.0',
            description: 'Documentação interativa dos serviços e endpoints da Livraria.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Insira o token JWT gerado no login.',
                },
            },
        },
        // ====================================================================
        // PATHS: Aqui definimos todas as rotas usando JavaScript Puro!
        // Vantagem: Imune a erros de formatação e espaços em branco.
        // ====================================================================
        paths: {
            '/auth/registrar': {
                post: {
                    summary: 'Registra um novo usuário (CLIENTE)',
                    tags: ['Autenticação'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['nome', 'email', 'senha'],
                                    properties: {
                                        nome: { type: 'string', example: 'João da Silva' },
                                        email: { type: 'string', example: 'joao@email.com' },
                                        senha: { type: 'string', example: '123456' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Usuário registrado com sucesso.' },
                        '400': { description: 'Erro de validação ou e-mail já existente.' }
                    }
                }
            },
            '/auth/login': {
                post: {
                    summary: 'Realiza login no sistema',
                    tags: ['Autenticação'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email', 'senha'],
                                    properties: {
                                        email: { type: 'string', example: 'admin@teste.com' },
                                        senha: { type: 'string', example: '123456' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': { 
                            description: 'Login bem-sucedido. Retorna o token JWT.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: { token: { type: 'string' } }
                                    }
                                }
                            }
                        },
                        '401': { description: 'Credenciais inválidas.' }
                    }
                }
            },
            '/livros': {
                get: {
                    summary: 'Retorna a lista de livros cadastrados',
                    tags: ['Livros'],
                    parameters: [
                        { in: 'query', name: 'titulo', schema: { type: 'string' }, description: 'Busca parcial por título' },
                        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Página atual' },
                        { in: 'query', name: 'limit', schema: { type: 'integer', default: 20 }, description: 'Itens por página' }
                    ],
                    responses: {
                        '200': { description: 'Lista de livros retornada com sucesso.' }
                    }
                },
                post: {
                    summary: 'Cria um novo livro (Apenas ADMIN)',
                    tags: ['Livros'],
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['titulo', 'autor', 'ano', 'estoque'],
                                    properties: {
                                        titulo: { type: 'string', example: 'O Guia do Mochileiro das Galáxias' },
                                        autor: { type: 'string', example: 'Douglas Adams' },
                                        ano: { type: 'integer', example: 1979 },
                                        estoque: { type: 'integer', example: 42 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': { description: 'Livro criado com sucesso.' },
                        '401': { description: 'Token ausente.' },
                        '403': { description: 'Acesso negado (Não é ADMIN).' }
                    }
                }
            },
            '/livros/{id}': {
                get: {
                    summary: 'Busca um livro específico pelo ID',
                    tags: ['Livros'],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        '200': { description: 'Dados do livro encontrados.' },
                        '404': { description: 'Livro não encontrado.' }
                    }
                },
                put: {
                    summary: 'Atualiza os dados de um livro',
                    tags: ['Livros'],
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        titulo: { type: 'string' },
                                        autor: { type: 'string' },
                                        ano: { type: 'integer' },
                                        estoque: { type: 'integer' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': { description: 'Livro atualizado com sucesso.' }
                    }
                },
                delete: {
                    summary: 'Exclui um livro do catálogo',
                    tags: ['Livros'],
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        '204': { description: 'Livro excluído com sucesso.' }
                    }
                }
            },
            '/livros/{id}/comprar': {
                post: {
                    summary: 'Efetua a compra de um livro',
                    tags: ['Livros'],
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        '200': { description: 'Venda realizada com sucesso.' },
                        '400': { description: 'Livro esgotado.' }
                    }
                }
            },
            '/livros/fornecedor': {
                get: {
                    summary: 'Simula a integração com fornecedor',
                    tags: ['Livros'],
                    responses: {
                        '200': { 
                            description: 'XML com os dados do fornecedor.',
                            content: {
                                'application/xml': {
                                    schema: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    // Deixamos o array apis vazio, pois não precisamos mais que o Swagger busque comentários nos arquivos
    apis: [], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;