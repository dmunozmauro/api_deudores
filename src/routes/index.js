import express from 'express'
import healthRoute from './health-route'


const app = express()

app.use(
    healthRoute,
)

export default app