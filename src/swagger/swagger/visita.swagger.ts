export const visitaPaths = {
  '/visitas': {
    get: {
      tags: ['Visitas'],
      summary: 'Listar todas as visitas',
      responses: {
        200: { description: 'Lista retornada com sucesso' },
      },
    },
    post: {
      tags: ['Visitas'],
      summary: 'Criar uma nova visita',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Visita' },
          },
        },
      },
      responses: {
        201: { description: 'Visita criada com sucesso' },
      },
    },
  },
  '/visitas/{id}': {
    get: {
      tags: ['Visitas'],
      summary: 'Obter visita por ID',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: {
        200: { description: 'Visita encontrada' },
      },
    },
    put: {
      tags: ['Visitas'],
      summary: 'Atualizar visita',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: {
        200: { description: 'Visita atualizada' },
      },
    },
    delete: {
      tags: ['Visitas'],
      summary: 'Excluir visita',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: {
        204: { description: 'Visita excluída' },
      },
    },
  },
};

export const visitaSchema = {
  Visita: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      motivo: { type: 'string' },
      conclusao: { type: 'string' },
      data_inicio: { type: 'string', format: 'date-time' },
      data_final: { type: 'string', format: 'date-time' },
      fk_registro: { type: 'integer' },
    },
  },
};
