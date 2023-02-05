import express from 'express'
import { deudores } from '../service'

const app = express()
const router = express.Router()
app.use('/deudores', router)

router.post('/insertar-deudores', deudores.insertar_deudores)
router.get('/consultar-deudores', deudores.consultar_deudores)

export default app