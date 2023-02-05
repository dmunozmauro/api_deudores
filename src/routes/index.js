import express from 'express'
import healthRoute from './health-route'
import prueba from './prueba'

const app = express()

app.use(
    healthRoute,
    prueba
)

export default app