import express from 'express'
import { misCompras } from '../../service/'

const app = express()
const router = express.Router()
app.use('/mis-compras', router)

router.get('/obtener-compras', misCompras.obtenerCompras)

export default app