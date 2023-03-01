import { sequel } from "../.."
import { QueryTypes } from 'sequelize'

export const misCompras = async (id_institucion) => {
    let query = `select 
                    tmc.id as id_compra,
                    tmc.producto,
                    tmc.valor,
                    tmc.cantidad_cuotas,
                    tmc.cuotas_pagadas,
                    tmc.valor_cuota
                    from tal_mis_compras tmc
                    inner join rel_mis_compras_instituciones rmci on rmci.id_mis_compras = tmc.id
                    where rmci.id_institucion = $1`;

    return await sequel.query(query, { type: QueryTypes.SELECT, bind: [id_institucion] });
}
