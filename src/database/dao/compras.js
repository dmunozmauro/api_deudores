import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_compras = async (producto) => {
    let query = `select tc.producto from tal_compras tc where tc.producto = '${producto}'`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_compras = async (producto, valor, es_servicio, cantidad_cuotas, cuotas_pagadas, valor_cuota, t) => {
    let query = `insert into tal_compras(producto, valor, es_servicio, cantidad_cuotas, cuotas_pagadas, valor_cuota) values($1, $2, $3, $4, $5, $6)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [producto, valor, es_servicio, cantidad_cuotas, cuotas_pagadas, valor_cuota]
    });
}

export const editar_compras = async (id, compra, valor, es_servicio, cantidad_cuotas, cuotas_pagadas, valor_cuota, t) => {
    let query = `update tal_compras set producto = $2, valor = $3, es_servicio = $4, cantidad_cuotas = $5, cuotas_pagadas = $6, valor_cuota = $7 where id = $1`;

    return await sequel.query(query, {
        type: QueryTypes.UPDATE,
        transaction: t,
        bind: [id, compra, valor, es_servicio, cantidad_cuotas, cuotas_pagadas, valor_cuota]
    });
}

export const obtener_deudor = async (id) => {
    let query = `select rdc.id_deudor from rel_deudores_compras rdc where rdc.id_compra = $1`;

    return await sequel.query(query, {
        type: QueryTypes.SELECT,
        bind: [id]
    });
}

export const consultar_compras = async () => {
    let query = `select
                    tc.id,
                    tc.producto,
                    tc.valor,
                    tc.es_servicio,
                    tc.cantidad_cuotas,
                    tc.cuotas_pagadas,
                    tc.ultima_fecha_pago,
                    case
                        when tc.valor_cuota is not null then tc.valor_cuota 
                        else tc.valor
                        end as valor_cuota
                from tal_compras tc 
                order by tc.producto asc`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const consulta_compra = async (id) => {
    let query = `select
                    tc.id,
                    tc.producto,
                    tc.valor,
                    tc.es_servicio,
                    tc.cantidad_cuotas,
                    tc.cuotas_pagadas,
                    tc.ultima_fecha_pago,
                    case
                        when tc.valor_cuota is not null then tc.valor_cuota 
                        else tc.valor
                        end as valor_cuota
                from tal_compras tc 
                where tc.id = $1
                order by tc.producto asc`;
    return await sequel.query(query, { type: QueryTypes.SELECT, bind: [id] });
}

export const eliminar_compras = async (id, t) => {
    let query = `delete from tal_compras where id = $1`;

    return await sequel.query(query, {
        type: QueryTypes.DELETE,
        transaction: t,
        bind: [id]
    });
}

export const eliminar_relacion_compra_deudor = async (id, t) => {
    let query = `delete from rel_deudores_compras where id_compra = $1`;

    return await sequel.query(query, {
        type: QueryTypes.DELETE,
        transaction: t,
        bind: [id]
    });
}

export const compras_no_asociadas = async () => {
    let query = `select 
                    tc.id as id_compra,
                    tc.producto,
                    tc.valor,
                    tc.cantidad_cuotas,
                    tc.cuotas_pagadas,
                    tc.ultima_fecha_pago
                from tal_compras tc
                    left join rel_deudores_compras rdc on rdc.id_compra = tc.id
                where rdc.id_compra is null
                    order by tc.producto asc`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const compras_realizadas_deudor = async (id) => {
    let query = `select
                    tc.id,
                    tc.producto,
                    tc.valor,
                    tc.cantidad_cuotas,
                    tc.cuotas_pagadas,
                    tc.ultima_fecha_pago,
                    case
                        when tc.valor_cuota is not null then tc.valor_cuota 
                        else tc.valor
                    end as valor_cuota
                from tal_compras tc 
                    left join rel_deudores_compras rdc on rdc.id_compra = tc.id
                where rdc.id_deudor = $1
                order by tc.producto asc`;
    let compras = await sequel.query(query, { type: QueryTypes.SELECT, bind: [id] });

    let query2 = `select td.deudor from tal_deudores td where td.id = $1`;
    let deudor = await sequel.query(query2, { type: QueryTypes.SELECT, bind: [id] });

    let data = { deudor: deudor[0].deudor, compras }

    return data;
}

export const valida_pendientes_compras = async (id_compra) => {
    let query = `select 
                    tc.id,
                    tc.producto,
                    tc.valor,
                    tc.es_servicio,
                    tc.cantidad_cuotas,
                    tc.cuotas_pagadas,
                    tc.valor_cuota,
                    case
                        when tc.cuotas_pagadas < tc.cantidad_cuotas then false
                        else true
                    end as deuda_terminada
                from tal_compras tc 
                where tc.id = $1`;

    const data = await sequel.query(query, {
        type: QueryTypes.SELECT,
        bind: [id_compra]
    });

    return data[0]
}


