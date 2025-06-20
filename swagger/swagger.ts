const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "SaneaSP API",
    description: "Documentação da API do SaneaSP",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    {
      name: "Login",
      description: "Endpoints relacionados à autenticação",
    },
    {
      name: "Usuário",
      description: "Gerenciamento de usuários",
    },
    {
      name: "Reclamações",
      description: "Cadastro e controle de reclamações",
    },
    {
      name: "Categorias",
      description: "Categorias de doenças e problemas",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", 
      name: "authorization", 
      description: "Token de Acesso gerado após o login",
    },
  },
  security: [
    {
      apiKeyAuth: [],
    },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../app.ts"]; // ou ./src/app.ts, dependendo do seu caminho real

swaggerAutogen(outputFile, endpointsFiles, doc);
