import express from 'express'
import { prueba } from '../service'

const app = express()
const router = express.Router()
app.use('/prueba', router)

router.get('/', prueba.pruebaServices)

export default app