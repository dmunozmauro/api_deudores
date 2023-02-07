import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_compras = async (producto) => {
    let query = `select tc.producto from tal_compras tc where tc.producto = '${producto}'`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_compras = async (producto, valor, id_cuotas, t) => {
    let query = `insert into tal_compras(producto, valor, id_cuotas) values($1, $2, $3)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [producto, valor, id_cuotas]
    });
}

export const consultar_compras = async () => {
    let query = `select * from tal_compras tc 
                    inner join tal_cuotas tcu on tcu.id = tc.id_cuotas`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const eliminar_compras = async (id, t) => {
    let query = `delete from tal_compras where id = $1`;

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
                    inner join tal_cuotas tcu on tcu.id = tc.id_cuotas
                    left join rel_deudores_compras rdc on rdc.id_compra = tc.id
                    where rdc.id_compra is null`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const compras_realizadas_deudor = async (id) => {
    let query = `select
                    tc.id as id_compra,
                    tc.producto,
                    tc.id_cuotas,
                    tc.valor,
                    tcu.cantidad_cuotas,
                    tcu.cuotas_pagadas,
                    tcu.fecha_pago
                from tal_compras tc 
                    inner join tal_cuotas tcu on tcu.id = tc.id_cuotas  
                    inner join rel_deudores_compras rdc on rdc.id_compra = tc.id
                where rdc.id_deudor = $1`;
    let compras = await sequel.query(query, { type: QueryTypes.SELECT, bind: [id] });

    let query2 = `select td.deudor from tal_deudores td where td.id = $1`;
    let deudor = await sequel.query(query2, { type: QueryTypes.SELECT, bind: [id] });

    let data = { deudor: deudor[0].deudor, compras }

    return data;
}