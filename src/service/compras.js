import { compras, cuotas } from '../database/dao'
import { sequel } from '../database'

export const insertar_compras = async (req, res) => {
    console.log('SERVICE [insertar_compras]')
    const { producto, valor, cantidad_cuotas, cuotas_pagadas, valor_cuota, es_servicio } = req.body
    const transaction = await sequel.transaction()

    let id_cuota = null;

    try {

        let compra = producto.toUpperCase()

        const valida_producto = await compras.valida_compras(compra)

        if (valida_producto.length > 0) {
            return res.status(200).send({ message: 'Ya existe compra ingresada' });
        }

        if (!es_servicio) {
            id_cuota = await cuotas.insertar_cuotas(cantidad_cuotas, cuotas_pagadas, valor_cuota, transaction)
            id_cuota = id_cuota[0][0].id
        }

        await compras.insertar_compras(compra, valor, id_cuota, es_servicio, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const editar_compras = async (req, res) => {
    console.log('SERVICE [editar_compras]')

    const { id, producto, valor, es_servicio, id_cuotas, cantidad_cuotas, cuotas_pagadas, valor_cuota } = req.body
    const transaction = await sequel.transaction()
    try {

        let compra = producto.toUpperCase()

        await compras.editar_compras(id, compra, valor, es_servicio, transaction)
        await compras.editar_cuotas(id_cuotas, cantidad_cuotas, cuotas_pagadas, valor_cuota, transaction)

        const deudor = await compras.obtener_deudor(id)

        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, deudor: deudor[0].id_deudor, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const consultar_compras = async (req, res) => {
    console.log('SERVICE [consultar_compras]')
    try {
        const listado = await compras.consultar_compras()

        if (listado.length > 0) {
            return res.status(200).send({ message: process.env.MENSAJE_OK, data: listado, code: process.env.CODE_OK });
        }

        return res.status(200).send({ message: 'No existen compras' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const consulta_compra = async (req, res) => {
    console.log('SERVICE [consulta_compra]')
    const { id } = req.params;
    try {
        const listado = await compras.consulta_compra(id)

        if (listado.length > 0) {
            return res.status(200).send({ message: process.env.MENSAJE_OK, data: listado, code: process.env.CODE_OK });
        }

        return res.status(200).send({ message: 'No existen compras' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const eliminar_compras = async (req, res) => {
    console.log('SERVICE [eliminar_compras]')
    const { id } = req.body
    const transaction = await sequel.transaction()
    try {
        await compras.eliminar_compras(id, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const eliminar_compra_deudor = async (req, res) => {
    console.log('SERVICE [eliminar_compra_deudor]')
    const { id } = req.body
    const transaction = await sequel.transaction()
    try {
        await compras.eliminar_compra_deudor(id, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const compras_no_asociadas = async (req, res) => {
    console.log('SERVICE [compras_no_asociadas]')
    try {
        const listado = await compras.compras_no_asociadas()

        if (listado.length > 0) {
            return res.status(200).send({ message: process.env.MENSAJE_OK, data: listado, code: process.env.CODE_OK });
        }

        return res.status(200).send({ message: 'No existen compras' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const compras_realizadas_deudor = async (req, res) => {
    console.log('SERVICE [compras_realizadas_deudor]')
    const { id } = req.params

    try {
        const listado = await compras.compras_realizadas_deudor(id)
        console.log(listado)

        return res.status(200).send({ message: process.env.MENSAJE_OK, data: listado, code: process.env.CODE_OK });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}