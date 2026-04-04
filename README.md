# Syntax Wear Shop Online

Frontend de uma loja virtual fictícia de calçados, desenvolvido com React, TypeScript e Vite. O projeto entrega uma experiência de catálogo com navegação por rotas, páginas institucionais, fluxo visual de autenticação, carrinho persistido no navegador e cálculo de frete por CEP.

## Visão geral

O projeto simula a interface de um e-commerce de calçados com foco em:

- catálogo de produtos com dados mockados
- páginas públicas e institucionais
- navegação com rotas file-based
- formulário de cadastro com validação
- carrinho lateral com persistência em `localStorage`
- cálculo de entrega com consulta ao ViaCEP

## Principais funcionalidades

- Home com banner principal, categorias em destaque e galeria visual.
- Listagem de produtos a partir de mocks locais.
- Página de detalhes do produto com preço, desconto no PIX, parcelamento e botão para adicionar ao carrinho.
- Filtro de catálogo por categoria via rota dinâmica.
- Carrinho lateral com incremento, decremento, remoção de itens e persistência no navegador.
- Página de cadastro com `react-hook-form` e validação com `zod`.
- Máscaras e validações de CPF e celular.
- Cálculo de frete por CEP usando a API pública do ViaCEP e uma tabela local de custo por região.
- Páginas institucionais como "Sobre" e "Nossas lojas".
- Telas de login e cadastro com interface pronta para futura integração com backend/autenticação real.

## Stack utilizada

- React 19
- TypeScript
- Vite 7
- TanStack Router
- Tailwind CSS v4
- React Hook Form
- Zod
- React Icons

## Estrutura do projeto

```text
.
|-- public/
|-- scripts/
|-- src/
|   |-- assets/         # Imagens e fontes
|   |-- components/     # Componentes reutilizáveis da interface
|   |-- contexts/       # Contexto global do carrinho
|   |-- interfaces/     # Tipagens da aplicação
|   |-- mocks/          # Dados estáticos de produtos e categorias
|   |-- pages/          # Rotas file-based do TanStack Router
|   |-- styles/         # Estilos globais e tokens do tema
|   |-- utils/          # Formatação e validações auxiliares
|   |-- App.tsx
|   |-- main.tsx
|   `-- router-tree-gen.ts
|-- index.html
|-- vite.config.ts
`-- package.json
```

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial com hero, categorias e galeria |
| `/products` | Listagem completa de produtos |
| `/products/$productId` | Detalhes de um produto específico |
| `/products/category/$category` | Produtos filtrados por categoria |
| `/about` | Página institucional sobre a marca |
| `/our-stores` | Página institucional das lojas físicas |
| `/sign-in` | Tela de login |
| `/sign-up` | Tela de cadastro |

## Como executar o projeto

### Pré-requisitos

- Node.js em versão LTS
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal a URL local da aplicação, normalmente `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Detalhes técnicos relevantes

- As rotas são definidas em `src/pages` e a árvore é gerada automaticamente em `src/router-tree-gen.ts` pelo plugin do TanStack Router.
- O alias `@` aponta para `src`, configurado em `vite.config.ts`.
- O carrinho é gerenciado por contexto React e persistido em `localStorage` na chave `@SyntaxWear:cart`.
- O catálogo usa dados estáticos em `src/mocks/productsInfo.ts`.
- O cálculo de frete depende de consulta à API pública `https://viacep.com.br/ws/{cep}/json/`.
- O tema global, cores e fontes estão centralizados em `src/styles/globals.css`.

## Limitações atuais

- Não existe backend integrado para autenticação, pedidos ou checkout.
- O botão de login com Google é apenas visual neste momento.
- Os produtos e categorias vêm de mocks locais, sem API real.
- O cálculo de frete depende de conexão com internet e da disponibilidade do ViaCEP.
- O botão "Fechar pedido" no carrinho ainda não conclui uma compra.

## Scripts disponíveis

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run preview` | Serve localmente a build gerada |
| `npm run lint` | Executa a análise estática com ESLint |

## Possíveis próximos passos

- Integrar catálogo e autenticação com API real.
- Implementar fluxo completo de checkout.
- Adicionar testes automatizados.
- Persistir usuários e pedidos.
- Melhorar estados de loading, erro e feedback visual em operações assíncronas.
