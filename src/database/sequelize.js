import { database as dbConfig } from '../config'
import { Sequelize } from 'sequelize'

export let sequelize

if (process.env.NODE_ENV === 'local') {
    sequelize = new Sequelize(dbConfig)
} else {
    sequelize = new Sequelize({
        dialect: 'postgres',
        timezone: '-03:00',
        pool: {
            max: Number(process.env.POOL_MAX) || 5,
            min: Number(process.env.POOL_MIN) || 0,
            idle: Number(process.env.POOL_IDLE) || 30000,
            acquire: Number(process.env.POOL_ACQUIRE) || 1000
          }        
    })
    sequelize.beforeConnect(async (config) => {        
        console.log(`USER = ${secret.username}`)
        config.host = process.env.HOST
        config.username = process.env.DB_USER
        config.password = process.env.DB_PASSWORD
        config.database = process.env.DATABASE
        config.port = process.env.PORT
    })
}

sequelize.afterConnect(async (conn, _opt) => {
    const searchPath = process.env.SCHEMA
    console.log(`Seteando esquema ${searchPath}... `)
    try {
        await conn.query(`SET search_path = ${searchPath} `)
    } catch (err) {
        console.error('Error seteando esquema', err)
    }
})

export { Sequelize }

export default { sequelize, Sequelize }