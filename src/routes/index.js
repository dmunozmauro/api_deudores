import express from 'express'
import health from './health'
import prueba from './prueba'
import deudores from './deudores'
import compras from './compras'
import misCompras from  './personal/mis-compras'
import instituciones from  './personal/instituciones'
import situacionFinanciera from  './personal/situacion-financiera'

const app = express()

app.use(
    health,
    prueba,
    deudores,
    compras,
    misCompras,
    instituciones,
    situacionFinanciera
)

export default app