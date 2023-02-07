import express from 'express'
import { compras } from '../service'

const app = express()
const router = express.Router()
app.use('/compras', router)

router.post('/insertar-compras', compras.insertar_compras)
router.put('/editar-compras', compras.editar_compras)
router.get('/consultar-compras', compras.consultar_compras)
router.get('/consulta-compra/:id', compras.consulta_compra)
router.delete('/eliminar-compras', compras.eliminar_compras)
router.delete('/eliminar-compra-deudor', compras.eliminar_compra_deudor)
router.get('/compras-no-asociadas', compras.compras_no_asociadas)
router.get('/compras-realizadas-deudor/:id', compras.compras_realizadas_deudor)

export default app