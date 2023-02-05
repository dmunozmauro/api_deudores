export default Object.freeze({
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    pool: Object.freeze({
        max: Number(process.env.POOL_MAX) || 5,
        min: Number(process.env.POOL_MIN) || 0,
        idle: Number(process.env.POOL_IDLE) || 30000,
        acquire: Number(process.env.POOL_ACQUIRE) || 1000
    })
})