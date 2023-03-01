import express from 'express'
import health from './health'
import prueba from './prueba'
import deudores from './deudores'
import compras from './compras'
import misCompras from  './personal/mis-compras'
import instituciones from  './personal/instituciones'

const app = express()

app.use(
    health,
    prueba,
    deudores,
    compras,
    misCompras,
    instituciones
)

export default app