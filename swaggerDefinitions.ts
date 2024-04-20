/**
 * @swagger
 * tags:
 *  - name: User
 *    description: User management
 *  - name: Category
 *    description: Category management
 *  - name: Task
 *    description: Category management
 * 
 * paths:
 *  /login:
 *      post:
 *         tags:
 *          - User
 *         requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *         responses:
 *             '200':
 *                description: Login successful
 *
 * components:
 *  schemas:
 *     UserLogin:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 * 
*/