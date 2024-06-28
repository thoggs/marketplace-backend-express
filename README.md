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
│   ├── app/
│   │   ├── hooks/
│   │   │   └── usePagination.ts
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   │   ├── authController.ts
│   │   │   │   ├── healthController.ts
│   │   │   │   ├── productController.ts
│   │   │   │   └── userController.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── errorHandler.ts
│   │   │   │   └── responseFormatter.ts
│   │   ├── models/
│   │   │   ├── index.ts
│   │   │   ├── product.ts
│   │   │   └── user.ts
│   ├── bootstrap/
│   │   └── app.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── passport.ts
│   ├── dto/
│   │   ├── errorCodes.ts
│   │   └── responseDto.ts
│   ├── routes/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── health.ts
│   │   ├── product.ts
│   │   └── users.ts
│   ├── utils/
│   │   ├── formatSequelizeError.ts
│   │   ├── generateAccessToken.ts
│   │   ├── validationErrorBuilder.ts
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
- npm ou yarn(Recomendado v4+, instruções de instalação logo abaixo)
- Banco de dados MySQL
- Docker (apenas para inicialização rápida)
- Docker Compose (apenas para inicialização rápida)

### Instalação do Yarn

Unix/macOS:

```bash
corepack enable && corepack prepare yarn@stable --activate
```

## Inicialização Rápida

Subir o projeto com Docker:

### 1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/thoggs/zhavia-marketplace-backend.git && cd zhavia-marketplace-backend && docker-compose up -d
```

### 2. Execute as Migrations e Seeders:

Dentro da pasta do projeto, execute o comando abaixo para criar as tabelas no banco de dados e popular.

```bash
yarn && npx sequelize-cli db:seed:all
```

### 3. Acesse o Projeto:

> O projeto estará disponível em http://localhost:8083/api/{endpoint}

## Descrição da API

### Endpoints:

### **Auth** (Autenticação)

- **POST /auth/signin**: autentica um usuário e retorna um token de acesso.
- **POST /auth/signup**: registra um novo usuário e retorna um token de acesso.
- **POST /github-signin**: autentica um usuário com o GitHub e retorna um token de acesso.

### **Users** (Usuários)

- **GET /api/users**: retorna uma lista paginada de todos os usuarios registrados. É possível personalizar a
  página e a quantidade de resultados exibidos na lista adicionando os seguintes parâmetros à URL:
    - **page**: número da página a ser exibida.
        - Exemplo: `http://localhost:8083/api/users?page=2` exibe a segunda página de resultados.

    - **pageSize**: quantidade de resultados exibidos por página.
        - Exemplo: `http://localhost:8083/api/users?perPage=5&page=3` exibe a terceira página com até 5
          usuários por página.

    - **searchTerm**: termo de pesquisa para filtrar resultados.
        - Será executado `LIKE` no banco de dados pelo termo informado.
        - Exemplo: `http://localhost:8083/api/users?searchTerm=John` filtra resultados contendo "John".
    - **sorting**: ordena os resultados por uma coluna específica.
        - Exemplo: `http://localhost:8083/api/users?sorting=sorting=[{"id":"firstName","desc":false}]`

- **GET /api/users/{id}**: retorna informações detalhadas sobre um usuário específico.

- **POST /api/users**: cria um novo registro de usuário.

- **PUT /api/users/{id}**: atualiza as informações de um usuário existente.

- **DELETE /api/users/{id}**: exclui um registro de usuário existente.

### **Products** (Produtos)

- **GET /api/products**: retorna uma lista paginada de todos os produtos registrados. É possível personalizar a
  página e a quantidade de resultados exibidos na lista adicionando os seguintes parâmetros à URL:
    - **page**: número da página a ser exibida.
        - Exemplo: `http://localhost:8083/api/products?page=2` exibe a segunda página de resultados.

    - **pageSize**: quantidade de resultados exibidos por página.
        - Exemplo: `http://localhost:8083/api/products?perPage=5&page=3` exibe a terceira página com até 5
          produtos por página.

    - **searchTerm**: termo de pesquisa para filtrar resultados.
        - Será executado um `LIKE` no banco de dados pelo termo informado.
        - Exemplo: `http://localhost:8083/api/products?searchTerm=John` filtra resultados contendo "John".
    - **sorting**: ordena os resultados por uma coluna específica.
        - Exemplo: `http://localhost:8083/api/products?sorting=sorting=[{"id":"name","desc":false}]`

### **Health** (Status)

- **GET /health**: retorna o status da aplicação.

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
# Application configuration
PORT=8083

# Database configuration
DB_NAME=nome_do_banco_de_dados
DB_USER=usuario_do_banco_de_dados
DB_PASS=senha_do_banco_de_dados
DB_HOST=url_do_banco_de_dados
DB_PORT=porta_do_banco_de_dados
DB_DIALECT=dialeto_do_banco_de_dados

# JWT configuration
JWT_SECRET=jwt_senha_secreta
JWT_ISSUER=jwt_issuer
JWT_AUDIENCE=jwt_audience
JWT_EXPIRES_IN=jwt_tempo_de_expiracao

# Github configuration
GITHUB_API_URL=https://api.github.com/user
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
- **passport-jwt**: Estratégia de autenticação JWT para Passport
- **Bcrypt.js**: Biblioteca para criptografia de senhas
- **Axios**: Cliente HTTP para Node.js
- **GitHub OAuth**: Autenticação OAuth com GitHub
- **Docker**: Plataforma de contêineres

## License

Project license [Apache-2.0](https://opensource.org/license/apache-2-0)
