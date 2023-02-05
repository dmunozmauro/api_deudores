import { sequel } from ".."
import { QueryTypes } from 'sequelize'

export const valida_compras = async (producto) => {
    let query = `select tc.producto from tal_compras tc where tc.producto = '${producto}'`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const insertar_compras = async (producto, valor, t) => {
    let query = `insert into tal_compras(producto, valor) values($1, $2)`;

    return await sequel.query(query, {
        type: QueryTypes.INSERT,
        transaction: t,
        bind: [producto, valor]
    });
}

export const consultar_compras = async () => {
    let query = `select * from tal_compras tc`;
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
