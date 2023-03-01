import { sequel } from "../.."
import { QueryTypes } from 'sequelize'

export const obtenerSituacion = async () => {
    let query = `select * from tal_situacion_personal tsp`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}