
import express from 'express'
import { situacionFinanciera } from '../../service/'

const app = express()
const router = express.Router()
app.use('/situacion-financiera', router)

router.get('/obtener-informacion', situacionFinanciera.obtenerSituacion)

export default app