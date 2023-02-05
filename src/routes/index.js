import express from 'express'
import healthRoute from './health-route'
import prueba from './prueba'
import deudores from './deudores'
import compras from './compras'

const app = express()

app.use(
    healthRoute,
    prueba,
    deudores,
    compras
)

export default app