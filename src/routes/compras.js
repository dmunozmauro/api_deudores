import express from 'express'
import { compras } from '../service'

const app = express()
const router = express.Router()
app.use('/compras', router)

router.post('/insertar-compras', compras.insertar_compras)
router.get('/consultar-compras', compras.consultar_compras)
router.delete('/eliminar-compras', compras.eliminar_compras)
router.get('/compras-no-asociadas', compras.compras_no_asociadas)

export default app