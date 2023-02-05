import express from 'express'
import { compras } from '../service'

const app = express()
const router = express.Router()
app.use('/compras', router)

router.post('/insertar-compras', compras.insertar_compras)
router.get('/consultar-compras', compras.consultar_compras)
router.delete('/eliminar-compras', compras.eliminar_compras)

export default app