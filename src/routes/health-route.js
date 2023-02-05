import express from 'express'

const app = express()

/**
 * @swagger
 * /health:
 *  get:
 *      tags: 
 *          - Health
 *      summary: Health
 *      description: Health Check para AWS
 *      responses:
 *          200:
 *              description: Devuelve mensaje OK.
 *          500:
 *              description: Devuelve mensaje de No OK.
 */
app.get('/health', (req, res) => {
    res.json({health: 'Okey CAP - Capacitación'})
})

export default app