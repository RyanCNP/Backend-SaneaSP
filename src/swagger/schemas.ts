/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Poluição"
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 10
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "joao@gmail.com"
 *         senha:
 *           type: string
 *           example: "123456"
 *         telefone:
 *           type: string
 *           example: "15988888888"
 *         cpf:
 *           type: string
 *           example: "12345678910"
 *         cep:
 *           type: string
 *           example: "18000-000"
 *           description: "CEP do usuário"
 *         logradouro:
 *           type: string
 *           example: "Rua das Flores"
 *           description: "Nome da rua do endereço"
 *         bairro:
 *           type: string
 *           example: "Centro"
 *           description: "Bairro do endereço"
 *         cidade:
 *           type: string
 *           example: "Sorocaba"
 *           description: "Cidade do endereço"
 *         numero:
 *           type: string
 *           example: "123"
 *           description: "Número da residência"
 *         complemento:
 *           type: string
 *           example: "Apto 45"
 *           description: "Complemento do endereço"
 *     Denuncia:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 45
 *         titulo:
 *           type: string
 *           example: "Vazamento de esgoto"
 *         descricao:
 *           type: string
 *           example: "Há um vazamento de esgoto na Rua das Flores há 3 dias"
 *         cep:
 *           type: string
 *           example: "18000-000"
 *           description: "CEP do local da reclamação"
 *         logradouro:
 *           type: string
 *           example: "Rua das Flores"
 *           description: "Nome da rua do local da reclamação"
 *         bairro:
 *           type: string
 *           example: "Centro"
 *           description: "Bairro do local da reclamação"
 *         cidade:
 *           type: string
 *           example: "Sorocaba"
 *           description: "Cidade do local da reclamação"
 *         numero:
 *           type: string
 *           example: "123"
 *           description: "Número do local da reclamação"
 *         complemento:
 *           type: string
 *           example: "Apto 45"
 *           description: "Complemento do local da reclamação"
 *         status:
 *           type: number
 *           example: 0
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-06-20T14:30:00Z"
 *         idUsuario:
 *           type: number
 *           example: 10
 *         Imagens:
 *           type: array
 *           items:
 *             type: string
 *             example: "imagem.png"
 *         Tags:
 *           type: array
 *           items:
 *             type: number
 *             example: 1
 */
