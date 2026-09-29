# Syntax Wear

Aplicação de e-commerce focada em calçados, com frontend em React e backend em Node.js + Fastify + Prisma. O projeto foi estruturado para refletir uma loja real, com autenticação, catálogo, carrinho, pedidos e integração com banco PostgreSQL hospedado em Supabase.

## Visão geral

A proposta do projeto é demonstrar um e-commerce funcional com foco em:

- catálogo de produtos com filtros;
- autenticação com JWT + cookies;
- login com Google;
- cadastro de usuários;
- carrinho e checkout;
- pedidos com controle de estoque;
- API REST com documentação e validações;
- arquitetura separada entre frontend e backend.

## Stack principal

### Frontend
- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- React Hook Form
- Zod

### Backend
- Node.js
- Fastify
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Google Auth Library

## Estrutura do repositório

```text
Syntax Wear/
├── syntax-wear-api/
│   ├── prisma/
│   ├── src/
│   ├── tests/
│   ├── docs/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── syntax-wear-shop-online/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── problema-render-produtos-producao.md
└── README.md (opcional, se você quiser manter um resumo geral no raiz)
```

## Como executar localmente

### 1) Backend

Entre na pasta do backend:

```bash
cd syntax-wear-api
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com as variáveis necessárias, por exemplo:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="sua_chave_secreta"
GOOGLE_CLIENT_ID="seu_client_id"
NODE_ENV="development"
PORT=4000
HOST=0.0.0.0
```

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Execução em produção:

```bash
npm run start
```

Testes:

```bash
npm run test:run
```

### 2) Frontend

Entre na pasta do frontend:

```bash
cd syntax-wear-shop-online
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
VITE_API_URL="http://localhost:4000"
VITE_GOOGLE_CLIENT_ID="seu_client_id"
```

Inicie o app localmente:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

## Fluxo principal da aplicação

- O frontend renderiza catálogo, filtros, carrinho e autenticidade.
- O backend expõe rotas de produtos, usuários, categorias, autenticação e pedidos.
- O Prisma conecta o app ao PostgreSQL.
- Os cookies HTTP-only e o JWT controlam o acesso do usuário.
- A API valida dados com Zod e retorna respostas padronizadas.

## Funcionalidades atuais

- catálogo de produtos e categorias;
- página de detalhes do produto;
- filtros por categoria e gênero;
- carrinho de compras;
- login e cadastro de usuários;
- autenticação com Google;
- criação e consulta de pedidos;
- controle de estoque em transação;
- proteção de rotas e validação de erros.

## Status do projeto

O projeto está em uma fase de revisão e estabilização para apresentação. O foco principal foi:

- corrigir problemas de produção e infraestrutura;
- ajustar autenticação e cookies em domínios diferentes;
- validar variáveis de ambiente;
- proteger a API contra erros e logs sensíveis;
- revisar a transação de estoque e o checkout real;
- organizar a documentação da etapa de checkup.

## Limitações e observações

- O front e o back são projetos independentes, e devem ser executados separadamente.
- A integração com Stripe foi adiada para uma etapa posterior.
- Ainda é importante revisar documentação, testes e mensagens finais antes da apresentação.
- O ambiente de produção depende das variáveis corretas do Render/Supabase e do Vercel.

## Scripts úteis

### Backend

```bash
npm run dev
npm run build
npm run test:run
npm run prisma:generate
npm run prisma:migrate
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

