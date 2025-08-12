# Projeto SaneaSP

## Integrantes

- Davy Oliveira Ribeiro
- Matheus Augusto Santos Gueff
- Pedro Silva Martins   
- Ryan Carlo Negretti Pereira

## Hospedagem
O backend do SaneaSP está hospedado no link abaixo, com conexão ao banco de dados Postgree fornecido pela plataforma Render
Todas as migrations foram feitas para o banco de dados com inclusão de alguns dados

#### Backend do projeto
- https://backend-saneasp.onrender.com
  
##### Rotas possíveis:

- https://backend-saneasp.onrender.com/denuncia
- https://backend-saneasp.onrender.com/tag (protegida)
- https://backend-saneasp.onrender.com/user

#### Documentação Swagger
[Link para a documentação Swagger do projeto](https://backend-saneasp.onrender.com/api-docs)

## FrontEnd do projeto
🔗 [Repositório FrontEnd](https://github.com/MathGueff/FrontEnd-SaneaSP.git)

## Como rodar o projeto

Clone o repositório
``` bash
git clone https://github.com/RyanCNP/Backend-SaneaSP.git
```

Instale as dependências
``` bash
npm install
```
Defina as variáveis de ambiente
``` bash
PORT = 3000

SECRET_KEY = sua_chave_secreta

DEV_DATABASE_URL = url_de_acesso_para_database
```

Para iniciar o projeto em desenvolvimento
``` bash
npm run dev
```

Para ter acesso à páginas do site

| Email do usuário | Senha | Nível de acesso |
|------------------|-------|-----------------|
| pedro@gmail.com  | pedro | 0               |
| gueff@gmail.com  | math  | 1               |

## Comandos:

#### Inicialização do projeto

Para rodar o projeto localmente
``` bash
npm run dev
```

Para iniciar a compilação do projeto para js
``` bash
npm run build
```

Para iniciar o projeto compilado
``` bash
npm run start
```

#### Migrations

Para criar uma nova migration

```
npm run migration-create <name>
```

Para iniciar as migrações
```
npm run migrate
```

Para desfazer as migrações
```
npm run migrate:undo
```

Para desfazer todas as migrações
```
npm run migrate:undo:all
```
