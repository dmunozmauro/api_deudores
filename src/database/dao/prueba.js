import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const prueba_dao = async () => {
    let query = `select * from deudores`

    return await sequel.query(query, {
        type: QueryTypes.SELECT
    });
}