/**
 * @swagger
 * tags:
 *   - name: Reclamacoes
 *     description: Endpoints relacionados às reclamações
 */

/**
 * @swagger
 * /reclamacao:
 *   get:
 *     summary: Lista todas as reclamações com filtros opcionais
 *     tags: [Reclamacoes]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Filtra pelo título da reclamação
 *       - in: query
 *         name: descricao
 *         schema:
 *           type: string
 *         description: Filtra pela descrição da reclamação
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtra pela data da reclamação (formato ISO 8601)
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *         description: Filtra pelo status da reclamação
 *       - in: query
 *         name: pontuacao
 *         schema:
 *           type: number
 *         description: Filtra pela pontuação da reclamação
 *       - in: query
 *         name: cep
 *         schema:
 *           type: string
 *         description: Filtra pelo CEP da reclamação
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtra pela cidade da reclamação
 *       - in: query
 *         name: bairro
 *         schema:
 *           type: string
 *         description: Filtra pelo bairro da reclamação
 *       - in: query
 *         name: rua
 *         schema:
 *           type: string
 *         description: Filtra pela rua da reclamação
 *       - in: query
 *         name: numero
 *         schema:
 *           type: string
 *         description: Filtra pelo número da residência/endereço
 *       - in: query
 *         name: complemento
 *         schema:
 *           type: string
 *         description: Filtra pelo complemento do endereço
 *     responses:
 *       200:
 *         description: Lista de reclamações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamacao'
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /reclamacao/usuario:
 *   get:
 *     summary: Lista todas as reclamações do usuário autenticado
 *     tags: [Reclamacoes]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Lista de reclamações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamacao'
 *       401:
 *         description: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reclamacao/{id}:
 *   get:
 *     summary: Busca uma reclamação por ID
 *     tags: [Reclamacoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da reclamação
 *     responses:
 *       200:
 *         description: Reclamação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamacao'
 *       404:
 *         description: Reclamação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reclamacao:
 *   post:
 *     summary: Cria uma nova reclamação
 *     tags: [Reclamacoes]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reclamacao'
 *     responses:
 *       201:
 *         description: Reclamação criada com sucesso
 *       401:
 *         description: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reclamacao/{id}:
 *   put:
 *     summary: Atualiza uma reclamação existente
 *     tags: [Reclamacoes]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da reclamação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reclamacao'
 *     responses:
 *       200:
 *         description: Reclamação atualizada com sucesso
 *       404:
 *         description: Reclamação não encontrada
 *       401:
 *         description: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reclamacao/{id}:
 *   delete:
 *     summary: Remove uma reclamação pelo ID
 *     tags: [Reclamacoes]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da reclamação
 *     responses:
 *       200:
 *         description: Reclamação removida com sucesso
 *       404:
 *         description: Reclamação não encontrada
 *       401:
 *         description: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 */
