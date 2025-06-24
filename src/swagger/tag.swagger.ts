/**
 * @swagger
 * tags:
 *   - name: Tags
 *     description: Endpoints relacionados às tags
 */

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: Lista todas as tags com filtros
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tags retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tag'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 */

/**
 * @swagger
 * /tag/total:
 *   get:
 *     summary: Conta o total de tags
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     responses:
 *       200:
 *         description: Total de tags retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: Busca tag por ID
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Tag encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag não encontrada
 */

/**
 * @swagger
 * /tag/nome/{nome}:
 *   get:
 *     summary: Busca tag pelo nome exato
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag não encontrada
 */

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag criada
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Atualiza uma tag
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag atualizada
 *       404:
 *         description: Tag não encontrada
 */

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Remove uma tag
 *     tags: [Tags]
 *     security: [ { TokenAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Tag removida
 *       404:
 *         description: Tag não encontrada
 */
