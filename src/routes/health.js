import express from 'express'

const app = express()

app.get('/health', (req, res) => {
    res.json({health: 'Prueba sistema correcto'})
})


export default app