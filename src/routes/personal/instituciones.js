import express from 'express'
import { instituciones } from '../../service/'

const app = express()
const router = express.Router()
app.use('/instituciones', router)

router.get('/obtener-instituciones', instituciones.obtenerInstituciones)

export default app