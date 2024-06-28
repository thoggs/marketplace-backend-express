# Zhavia Marketplace

<p align="center" width="100%">
    <img width="22%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" alt="Node.js Logo">
    <img width="22%" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="Express.js Logo">
</p>

## Descrição

Este é um projeto de backend utilizando Node.js, TypeScript, Express e Sequelize. Ele inclui a configuração inicial do
projeto, modelos básicos e endpoints para manipulação de dados em um banco de dados MySQL.

## Estrutura do Projeto

```
project-root/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── passport.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── healthController.ts
│   │   └── userController.ts
│   ├── dto/
│   │   ├── errorCodes.ts
│   │   └── responseDto.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── responseFormatter.ts
│   ├── models/
│   │   ├── index.ts
│   │   └── user.ts
│   ├── routes/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── health.ts
│   ├── utils/
│   │   ├── formatSequelizeError.ts
│   │   ├── generateAccessToken.ts
│   │   ├── ValidationErrorBuilder.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── .env
│   └── ...
├── Dockerfile
├── docker-compose.yml
└── ...
```

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Banco de dados MySQL

## Inicialização Rápida

Subir o projeto com Docker:

### 1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/thoggs/movie-vault-backend.git && cd movie-vault-backend && docker-compose up -d
```

### 2. Execute as Migrations e Seeders:

```bash
docker-compose exec app npx sequelize-cli db:migrate && docker-compose exec app npx sequelize-cli db:seed:all
```

> O projeto estará disponível em http://localhost:8083/api/{endpoint}

## Descrição da API

### Endpoints:

### 1. **Auth** (Autenticação)

- **POST /auth/login**: autentica um usuário e retorna um token de acesso.
- **POST /auth/signup**: registra um novo usuário e retorna um token de acesso.

### 2. **Users** (Usuários)

- **GET /api/users**: retorna uma lista paginada de todos os usuarios registrados. É possível personalizar a
  página e a quantidade de resultados exibidos na lista adicionando os seguintes parâmetros à URL:
    - **page**: número da página a ser exibida.
        - Exemplo: `http://localhost:8083/api/users?page=2` exibe a segunda página de resultados.

    - **perPage**: quantidade de resultados exibidos por página.
        - Exemplo: `http://localhost:8083/api/users?perPage=5&page=3` exibe a terceira página com até 5
          usuários por página.

    - **searchTerm**: termo de pesquisa para filtrar resultados.
        - Será usado um `LIKE` no banco de dados pelo termo informado.
        - Exemplo: `http://localhost:8083/api/users?searchTerm=John` filtra resultados contendo "John".

- **GET /api/users/{id}**: retorna informações detalhadas sobre um usuário específico.

- **POST /api/users**: cria um novo registro de usuário.

- **PUT /api/users/{id}**: atualiza as informações de um usuário existente.

- **DELETE /api/users/{id}**: exclui um registro de usuário existente.

## Configuração para Desenvolvimento

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/thoggs/movie-vault-backend.git
cd movie-vault-backend
```

### Passo 2: Instalar Dependências

```bash
npm install
# ou
yarn install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env` na raiz do projeto e adicione suas configurações do banco de dados:

```env
DB_NAME=nome_do_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=127.0.0.1
PORT=3000
```

### Passo 5: Rodar o Projeto

Para rodar o projeto em modo de desenvolvimento:

```bash
yarn dev
# ou
npm run dev
```

Para rodar o projeto em modo de produção:

```bash
npm run build
# ou
yarn build
node dist/index.js
```

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **TypeScript**: Superconjunto tipado de JavaScript
- **Express**: Framework para Node.js
- **Sequelize**: ORM para Node.js
- **MySQL**: Banco de dados relacional

## License

Project license [Apache-2.0](https://opensource.org/license/apache-2-0)
