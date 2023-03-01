import { sequel } from "../.."
import { QueryTypes } from 'sequelize'

export const misCompras = async (id_institucion) => {
    let query = `select 
                    tmc.id as id_compra,
                    initcap(tmc.producto) as producto,
                    tmc.valor,
                    tmc.cantidad_cuotas,
                    tmc.cuotas_pagadas,
                    tmc.valor_cuota
                    from tal_mis_compras tmc
                    inner join rel_mis_compras_instituciones rmci on rmci.id_mis_compras = tmc.id
                    where rmci.id_institucion = $1
                    order by tmc.producto asc`;

    return await sequel.query(query, { type: QueryTypes.SELECT, bind: [id_institucion] });
}
