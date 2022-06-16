
## Descrição

Api utilizando framework nestjs, swagger, typeorm e class validator.<br>
Necessário copiar o arquivo '.env_example' para '.env' e preencher com informações para conectar ao banco de dados.

## Passos seguidos para construir a api

```bash
# Criando api
# https://docs.nestjs.com/
$ npm i -g @nestjs/cli
$ nest new api-nest
? Which package manager would you ❤️  to use? (Use arrow keys)
❯ npm
  yarn
  pnpm

# https://docs.nestjs.com/techniques/configuration  
$ npm i --save @nestjs/config

# Swagger
# https://docs.nestjs.com/openapi/introduction
$ npm install --save @nestjs/swagger swagger-ui-express
# Para acessar a documentação: http://localhost:3000/api

# Typeorm
# https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm
# https://docs.nestjs.com/techniques/database
$ npm install --save @nestjs/typeorm typeorm mysql2
# *necessário cria o banco de dados apenas
CREATE SCHEMA `api-nest` DEFAULT CHARACTER SET utf8;

# Class validator
# https://docs.nestjs.com/pipes#class-validator
$ npm i --save class-validator class-transformer
```

## Criar um novo recurso

```bash
$ nest g resource %RESOURCE_NAME%
❯ REST API 
  GraphQL (code first) 
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```