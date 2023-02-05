import { compras } from '../database/dao'
import { sequel } from '../database'

export const insertar_compras = async (req, res) => {
    console.log('SERVICE [insertar_compras]')
    const { producto, valor } = req.body
    const transaction = await sequel.transaction()
    try {

        let compra = producto.toUpperCase()

        const valida_producto = await compras.valida_compras(compra)

        if (valida_producto.length > 0) {
            return res.status(200).send({ message: 'Ya existe compra ingresada' });
        }

        await compras.insertar_compras(compra, valor, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}

export const consultar_compras = async (req, res) => {
    console.log('SERVICE [consultar_compras]')
    try {
        const listado = await compras.consultar_compras()

        if (listado.length > 0) {
            return res.status(200).send({ message: process.env.MENSAJE_OK, data: listado });
        }

        return res.status(200).send({ message: 'No existen compras' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}

export const eliminar_compras = async (req, res) => {
    console.log('SERVICE [eliminar_compras]')
    const { id } = req.body
    const transaction = await sequel.transaction()
    try {
        await compras.eliminar_compras(id, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}