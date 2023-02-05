import dotenv from 'dotenv'
import path from 'path'

console.log('Vamos a revisar el ambiente...', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'local') {
    console.log("Estamos en local")
    dotenv.config()
}

if (process.env.NODE_ENV === 'development') {
    console.log("Estamos en development")
    dotenv.config({path: path.resolve(__dirname, '../..', '.env.development')})
}

if (process.env.NODE_ENV === 'test') {
    console.log("Estamos en test")
    dotenv.config({path: path.resolve(__dirname, '../..', '.env.test')})
}

if (process.env.NODE_ENV === 'production') {
    console.log("Estamos en production")
    dotenv.config({path: path.resolve(__dirname, '../..', '.env.production')})
}