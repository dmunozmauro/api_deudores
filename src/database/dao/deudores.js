import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_deudor = async (deudor) => {
    let query = `select td.deudor from tal_deudores td where td.deudor = '${deudor}'`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_deudores = async (deudor, t) => {
    let query = `insert into tal_deudores(deudor) values($1)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [deudor]
    });
}

export const consultar_deudores = async () => {
    let query = `select 
                    td.id,
                    td.deudor,
                    rdc.id_compra 
                    from tal_deudores td
                    left join rel_deudores_compras rdc on rdc.id_deudor = td.id`;
    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const eliminar_deudores = async (id, t) => {
    let query = `delete from tal_deudores where id = $1`;

    return await sequel.query(query, {
        type: QueryTypes.DELETE,
        transaction: t,
        bind: [id]
    });
}


export const rel_deudor_compra = async (id_deudor, id_compra, t) => {
    // let query = `update tal_deudores set id_compra = $2 where id = $1`;
    let query = `insert into rel_deudores_compras(id_deudor, id_compra) values($1, $2)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [id_deudor, id_compra]
    });
}


export const valida_pendientes_deudor = async (id) => {
    let query = `insert into rel_deudores_compras(id_deudor, id_compra) values($1, $2)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [id_deudor, id_compra]
    });
}
