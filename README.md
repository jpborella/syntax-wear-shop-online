# Syntax Wear Shop Online

Projeto de e-commerce em construção, com foco em arquitetura moderna de front-end e evolução para um backend completo.

Este repositório foi pensado para mostrar consistência de entrega por commits, organização de código e visão de produto de ponta a ponta.

## Visão para recrutadores

O objetivo deste projeto e demonstrar na pratica:

- Construção de interface responsiva para e-commerce
- Estruturação de rotas e componentes reutilizaveis
- Boas praticas de formularios com validacao tipada
- Gerenciamento de estado global de carrinho com persistencia
- Planejamento de evolucao para backend com autenticacao, seguranca, testes e documentacao

## O que ja foi entregue 
Baseado no historico de commits, o projeto ja possui:

- Setup completo com Vite + React + TypeScript
- Identidade visual inicial, fontes e variaveis de tema
- Header, Hero, Categories, Gallery, Footer e componentes de apoio
- Navegacao com TanStack Router e rotas organizadas por arquivos
- Paginas principais: Home, Produtos, Detalhes do produto, Sobre e Nossas Lojas
- Fluxo de autenticacao no front (Sign In e Sign Up)
- Formularios com React Hook Form + Zod
- Lista de produtos e cartoes de produto com mock local
- Carrinho com contexto global, incremento/decremento e remocao
- Persistencia do carrinho em localStorage
- Menu mobile e formulario de CEP para calculo/validacao

## Roadmap backend (proximos passos)

Etapas planejadas para os proximos commits:

1. Configurar o Prisma e Supabase usando MCP - Parte 1
2. Configurar o Prisma e Supabase usando MCP - Parte 2
3. Criar listagem de produtos no backend
4. Instalar Scalar e Swagger para documentacao da API
5. Criar autenticacao (cadastro + JWT)
6. Criar autenticacao (login)
7. Implementar tratamento de erros e validacao
8. Criar busca de produto por ID e criacao de produto
9. Implementar update e delete com soft delete
10. Criar CRUD de categorias (GetAll e GetByID)
11. Criar CRUD de categorias (Update, Create e Delete)
12. Criar CRUD de pedidos
13. Aplicar melhorias de seguranca com apoio de IA
14. Criar testes para os CRUDs com Vitest
15. Documentar processo de debug de testes no Vitest
16. Implementar testes com mocks no Vitest
17. Criar testes para CRUD de pedidos (Orders) com Vitest

## Stack atual

- React 19
- TypeScript
- Vite
- TanStack Router
- React Hook Form + Zod
- Tailwind CSS (dependencia instalada para evolucao de UI)

## Como executar localmente

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

## Status do projeto

- Front-end: em desenvolvimento ativo
- Backend: planejado (roadmap definido)
- Testes automatizados: planejados para etapa de backend