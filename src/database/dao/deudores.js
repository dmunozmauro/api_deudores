import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_deudor = async (deudor) => {
    let query = `select td.deudor from tal_deudores td where td.deudor = '${deudor}'`

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_deudores = async (deudor, t) => {
    let query = `insert into tal_deudores(deudor) values($1)`

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [deudor]
    });
}