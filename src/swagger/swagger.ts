import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "SaneaSP", version: "1.0.0" },
    components: {
      securitySchemes: {
        TokenAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [{ TokenAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/swagger/*.ts"],
};

export function setupSwagger(app: Express) {
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
