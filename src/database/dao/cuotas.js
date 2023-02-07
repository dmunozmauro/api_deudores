import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const insertar_cuotas = async (cantidad_cuotas, cuotas_pagadas, valor_cuota, t) => {
    let query = `insert into tal_cuotas(cantidad_cuotas, cuotas_pagadas, valor_cuota) values($1, $2, $3) returning id`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [cantidad_cuotas, cuotas_pagadas, valor_cuota]
    });
}
