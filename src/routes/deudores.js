import express from 'express'
import { deudores } from '../service'

const app = express()
const router = express.Router()
app.use('/deudores', router)

router.post('/insertar-deudores', deudores.insertar_deudores)
router.get('/consultar-deudores', deudores.consultar_deudores)
router.delete('/eliminar-deudores', deudores.eliminar_deudores)

// relaciones
router.put('/actualizar-relacion-deudor-compra', deudores.rel_deudor_compra)

export default app