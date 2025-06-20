/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação e informações do usuário autenticado
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       description: Dados para autenticação
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "gueff@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "math"
 *     responses:
 *       200:
 *         description: Token JWT retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: O email não existe
 *       401:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna informações do usuário autenticado com base no token JWT
 *     tags: [Auth]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "joao@gmail.com"
 *                 nivel:
 *                   type: string
 *                   example: "1"
 *       401:
 *         description: Token inválido ou não informado
 *       500:
 *         description: Erro interno do servidor
 */
