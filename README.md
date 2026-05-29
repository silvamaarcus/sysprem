# Sysprem — Sistema de Cadastro de Clientes

Aplicação frontend desenvolvida como desafio técnico para a vaga de Desenvolvedor Frontend na **Sysprem**. O sistema permite gerenciar clientes (pessoas físicas e jurídicas) por meio de uma interface moderna com autenticação via token JWT.

---

## Sumário

- [Sysprem — Sistema de Cadastro de Clientes](#sysprem--sistema-de-cadastro-de-clientes)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias e Dependências](#tecnologias-e-dependências)
    - [Dependências de produção](#dependências-de-produção)
    - [Dependências de desenvolvimento](#dependências-de-desenvolvimento)
  - [Arquitetura do Projeto](#arquitetura-do-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Como Clonar e Rodar Localmente](#como-clonar-e-rodar-localmente)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Autor](#autor)

---

## Sobre o Projeto

O **Sysprem** é um sistema de cadastro de clientes que consome uma API REST externa. Ele permite que o usuário faça login, visualize a lista de clientes cadastrados, crie novos clientes e edite clientes existentes.

---

## Funcionalidades

- Autenticação com e-mail e senha (JWT armazenado no `localStorage`)
- Redirecionamento automático para `/login` quando o token expira ou é inválido
- Listagem de clientes em tabela
- Cadastro de novo cliente (Pessoa Física ou Jurídica)
- Edição de cliente existente
- Máscaras automáticas para CPF, CNPJ, telefone e moeda
- Validação de formulários com feedback de erro em tempo real

---

## Tecnologias e Dependências

### Dependências de produção

| Dependência | Versão | Para que serve |
|---|---|---|
| `next` | 16.x | Framework React com roteamento baseado em arquivos, SSR e App Router |
| `react` / `react-dom` | 19.x | Biblioteca principal para construção de interfaces |
| `@mui/material` | 9.x | Biblioteca de componentes UI seguindo o Material Design |
| `@mui/icons-material` | 9.x | Ícones do Material Design para uso com MUI |
| `@mui/material-nextjs` | 9.x | Integração oficial do MUI com o App Router do Next.js |
| `@emotion/react` | 11.x | Engine de estilos CSS-in-JS usada internamente pelo MUI |
| `@emotion/styled` | 11.x | API de componentes estilizados baseada no Emotion |
| `@emotion/cache` | 11.x | Cache de estilos do Emotion, necessário para SSR com MUI |
| `axios` | 1.x | Cliente HTTP para consumo da API REST |
| `react-hook-form` | 7.x | Gerenciamento de estado e validação de formulários de forma performática |
| `@hookform/resolvers` | 5.x | Integração do React Hook Form com bibliotecas de schema (ex.: Zod) |
| `zod` | 3.x | Validação e tipagem de schemas em tempo de execução |
| `@tanstack/react-query` | 5.x | Gerenciamento de estado assíncrono, cache e sincronização de dados do servidor |

### Dependências de desenvolvimento

| Dependência | Versão | Para que serve |
|---|---|---|
| `typescript` | 5.x | Superset tipado do JavaScript |
| `tailwindcss` | 4.x | Framework CSS utilitário para estilização rápida |
| `@tailwindcss/postcss` | 4.x | Plugin PostCSS para processar o Tailwind CSS |
| `eslint` | 9.x | Linter para identificar problemas no código |
| `eslint-config-next` | 16.x | Configurações de ESLint recomendadas pelo Next.js |
| `eslint-plugin-simple-import-sort` | 13.x | Plugin ESLint para ordenar imports automaticamente |
| `prettier` | 3.x | Formatador de código para manter estilo consistente |
| `prettier-plugin-tailwindcss` | 0.8.x | Plugin do Prettier para ordenar classes do Tailwind |
| `husky` | 9.x | Gerencia git hooks (ex.: executar lint antes do commit) |
| `lint-staged` | 17.x | Executa scripts apenas nos arquivos staged no git |
| `git-commit-msg-linter` | 5.x | Garante que as mensagens de commit sigam o padrão Conventional Commits |
| `babel-plugin-react-compiler` | 1.x | Plugin para o compilador experimental do React |
| `@types/node` / `@types/react` / `@types/react-dom` | — | Tipos TypeScript para Node.js e React |

---

## Arquitetura do Projeto

```
sysprem/
├── app/                        # App Router do Next.js (rotas e páginas)
│   ├── layout.tsx              # Layout raiz: aplica providers globais (MUI, React Query) e fontes
│   ├── page.tsx                # Rota "/" — redireciona para /clients ou /login
│   ├── globals.css             # Estilos globais e diretivas do Tailwind CSS
│   ├── login/
│   │   └── page.tsx            # Página de autenticação (/login)
│   └── clients/
│       ├── page.tsx            # Listagem de clientes (/clients)
│       ├── new/
│       │   └── page.tsx        # Formulário de criação de cliente (/clients/new)
│       └── [id]/
│           └── page.tsx        # Formulário de edição de cliente (/clients/:id)
│
├── components/                 # Componentes reutilizáveis de UI
│   ├── Header/
│   │   └── index.tsx           # Cabeçalho da aplicação com navegação
│   ├── ClientTable/
│   │   └── index.tsx           # Tabela que exibe a lista de clientes
│   ├── ClientForm/
│   │   └── index.tsx           # Formulário completo de criação/edição de cliente
│   ├── Form/
│   │   └── index.tsx           # Componentes primitivos de campo de formulário
│   └── Loading/
│       └── index.tsx           # Indicador de carregamento (spinner)
│
├── providers/                  # Configuração de providers de contexto React
│   ├── MuiThemeProvider.tsx    # Provider do tema do MUI com suporte a SSR via Emotion
│   └── QueryProvider.tsx       # Provider do TanStack React Query (QueryClient)
│
├── services/                   # Camada de comunicação com a API
│   ├── api.ts                  # Instância do Axios com baseURL, interceptors de auth e 401
│   ├── auth.ts                 # Funções de autenticação (login)
│   └── clients.ts              # Funções CRUD de clientes (listar, criar, atualizar)
│
├── schemas/
│   └── clientSchema.ts         # Schema de validação Zod para o formulário de cliente
│
├── types/                      # Definições de tipos TypeScript
│   ├── auth.ts                 # Tipos para credenciais e resposta de autenticação
│   └── client.ts               # Tipos para a entidade Client e ClientFormData
│
├── utils/                      # Funções utilitárias puras
│   ├── masks.ts                # Aplicação de máscaras (CPF, CNPJ, telefone)
│   ├── formatCpfCnpj.ts        # Formatação de CPF/CNPJ para exibição
│   └── currency.ts             # Formatação de valores monetários
│
├── public/                     # Arquivos estáticos servidos diretamente
├── next.config.ts              # Configurações do Next.js
├── tsconfig.json               # Configurações do TypeScript
├── eslint.config.mjs           # Configurações do ESLint
├── postcss.config.mjs          # Configurações do PostCSS / Tailwind
└── package.json                # Dependências e scripts do projeto
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão **18** ou superior
- [npm](https://www.npmjs.com/) versão **9** ou superior
- Acesso a uma instância da API Sysprem (necessário para `NEXT_PUBLIC_API_URL`)

---

## Como Clonar e Rodar Localmente

**1. Clone o repositório**

```bash
git clone https://github.com/silvamaarcus/sysprem.git
cd sysprem
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e preencha com os valores corretos:

```bash
cp .env.example .env.local
```

Edite `.env.local` e defina a URL da API (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

**4. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API REST consumida pelo sistema | `https://api.sysprem.com.br` |

> Variáveis prefixadas com `NEXT_PUBLIC_` são expostas no bundle do cliente (browser). Nunca coloque segredos nessas variáveis.

Consulte o arquivo [.env.example](.env.example) para ver o modelo de configuração.

---

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera o build de produção otimizado |
| `npm run start` | Inicia o servidor em modo de produção (requer build) |
| `npm run lint` | Executa o ESLint em todos os arquivos |
| `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `npm run format` | Formata todos os arquivos com o Prettier |

## Autor
**Marcus Silva**