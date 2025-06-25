/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints relacionados aos usuários
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos os usuários com filtros opcionais
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtra por nome
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filtra por email
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         description: Filtra por CPF
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/nome/{nome}:
 *   get:
 *     summary: Busca usuário(s) pelo nome exato
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário para busca
 *     responses:
 *       200:
 *         description: Usuário(s) encontrado(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Usuário encontrado"
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Nenhum usuário encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
