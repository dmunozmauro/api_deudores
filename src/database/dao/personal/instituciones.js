import { sequel } from "../.."
import { QueryTypes } from 'sequelize'

export const obtenerInstituciones = async () => {
    let query = `select * from tal_instituciones`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}
