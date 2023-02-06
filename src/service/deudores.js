import { deudores } from '../database/dao'
import { sequel } from '../database'

export const insertar_deudores = async (req, res) => {
    console.log('SERVICE [insertar_deudores]')
    const { deudor } = req.body
    const transaction = await sequel.transaction()
    try {

        let nombre_deudor = deudor.toUpperCase()

        const valida_deudor = await deudores.valida_deudor(nombre_deudor)

        if (valida_deudor.length > 0) {
            return res.status(200).send({ message: 'Ya existe deudor ingresado', code: 2 });
        }

        await deudores.insertar_deudores(nombre_deudor, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: 1 });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: 2 });
    }
}

export const consultar_deudores = async (req, res) => {
    console.log('SERVICE [consultar_deudores]')
    try {
        const listado = await deudores.consultar_deudores()
        return res.status(200).send(listado);

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}

export const eliminar_deudores = async (req, res) => {
    console.log('SERVICE [eliminar_deudores]')
    const { id } = req.body
    const transaction = await sequel.transaction()
    try {
        await deudores.eliminar_deudores(id, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}

export const rel_deudor_compra = async (req, res) => {
    console.log('SERVICE [rel_deudor_compra]')
    const { id_deudor, id_compra } = req.body
    const transaction = await sequel.transaction()
    try {

        await deudores.rel_deudor_compra(id_deudor, id_compra, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}