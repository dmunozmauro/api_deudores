import express from 'express'
import healthRoute from './health-route'
import prueba from './prueba'
import deudores from './deudores'

const app = express()

app.use(
    healthRoute,
    prueba,
    deudores
)

export default app