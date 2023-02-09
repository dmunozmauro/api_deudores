import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_compras = async (producto) => {
    let query = `select tc.producto from tal_compras tc where tc.producto = '${producto}'`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_compras = async (producto, valor, id_cuotas, es_servicio, t) => {
    let query = `insert into tal_compras(producto, valor, id_cuotas, es_servicio) values($1, $2, $3, $4)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [producto, valor, id_cuotas, es_servicio]
    });
}

export const editar_compras = async (id, compra, valor, es_servicio, t) => {
    let query = `update tal_compras set producto = $2, valor = $3, es_servicio = $4 where id = $1`;

    return await sequel.query(query, {
        type: QueryTypes.UPDATE,
        transaction: t,
        bind: [id, compra, valor, es_servicio]
    });
}

export const editar_cuotas = async (id_cuotas, cantidad_cuotas, cuotas_pagadas, valor_cuota, t) => {
    let query = `update tal_cuotas set cantidad_cuotas = $2, cuotas_pagadas = $3, valor_cuota = $4 where id = $1`;

    return await sequel.query(query, {
        type: QueryTypes.UPDATE,
        transaction: t,
        bind: [id_cuotas, cantidad_cuotas, cuotas_pagadas, valor_cuota]
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
                    tc.id_cuotas,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.fecha_pago,
                    case
                        when tcu.valor_cuota is not null then tcu.valor_cuota 
                        else tc.valor
                        end as valor_cuota
                from tal_compras tc 
                    left join tal_cuotas tcu on tcu.id = tc.id_cuotas
                order by tc.producto asc`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const consulta_compra = async (id) => {
    let query = `select
                    tc.id,
                    tc.producto,
                    tc.valor,
                    tc.es_servicio,
                    tc.id_cuotas,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.fecha_pago,
                    case
                        when tcu.valor_cuota is not null then tcu.valor_cuota 
                        else tc.valor
                        end as valor_cuota
                from tal_compras tc 
                    left join tal_cuotas tcu on tcu.id = tc.id_cuotas
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

export const eliminar_compra_deudor = async (id, t) => {
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
                    tcu.id as id_cuotas,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.fecha_pago
                from tal_compras tc
                    left join tal_cuotas tcu on tcu.id = tc.id_cuotas
                    left join rel_deudores_compras rdc on rdc.id_compra = tc.id
                where rdc.id_compra is null
                    order by tc.producto asc`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const compras_realizadas_deudor = async (id) => {
    let query = `select
                    tc.id,
                    tc.producto,
                    tc.id_cuotas,
                    tc.valor,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.fecha_pago,
                    case
                        when tcu.valor_cuota is not null then tcu.valor_cuota 
                        else tc.valor
                    end as valor_cuota
                from tal_compras tc 
                    left join tal_cuotas tcu on tcu.id = tc.id_cuotas  
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
                    tc.id_cuotas,
                    tc.es_servicio,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.valor_cuota,
                    case
                        when tcu.cuotas_pagadas < tcu.cantidad_cuotas then false
                        else true
                    end as deuda_terminada
                from tal_compras tc 
                    left join tal_cuotas tcu on tcu.id = tc.id_cuotas
                where tc.id = $1`;

    const data =  await sequel.query(query, {
        type: QueryTypes.SELECT,
        bind: [id_compra]
    });

    return data[0]
}


