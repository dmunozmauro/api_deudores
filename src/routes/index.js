import express from 'express'
import health from './health'
import prueba from './prueba'
import deudores from './deudores'
import compras from './compras'

const app = express()

app.use(
    health,
    prueba,
    deudores,
    compras
)

export default app