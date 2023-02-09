import { compras, deudores } from '../database/dao'
import { sequel } from '../database'

export const insertar_deudores = async (req, res) => {
    console.log('SERVICE [insertar_deudores]')
    const { deudor } = req.body
    const transaction = await sequel.transaction()
    try {

        let nombre_deudor = deudor.toUpperCase()

        const valida_deudor = await deudores.valida_deudor(nombre_deudor)

        if (valida_deudor.length > 0) {
            return res.status(200).send({ message: 'Ya existe deudor ingresado', code: process.env.CODE_NOK });
        }

        await deudores.insertar_deudores(nombre_deudor, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const consultar_deudores = async (req, res) => {
    console.log('SERVICE [consultar_deudores]')
    try {
        const listado = await deudores.consultar_deudores()
        return res.status(200).send(listado);

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const eliminar_deudores = async (req, res) => {
    console.log('SERVICE [eliminar_deudores]')
    const { id } = req.body

    let eliminar_deudor = true
    let compras_pendientes

    const transaction = await sequel.transaction()
    try {
        const valida_pendientes_deudor = await deudores.valida_pendientes_deudor(id)

        if (valida_pendientes_deudor.length > 0) {
            compras_pendientes = await Promise.all(valida_pendientes_deudor.map((deudor) => {
                return compras.valida_pendientes_compras(deudor.id_compra)
            }))

            for (const deuda of compras_pendientes) {
                if (!deuda.deuda_terminada) {
                    eliminar_deudor = false
                    break
                }
            }
        }

        console.log('¿Se puede eliminar deudor?', eliminar_deudor);
        return res.status(200).send({ message: 'PENDIENTE CODIGO', code: process.env.CODE_NOK });

        /* if (eliminar_deudor) {
            if (valida_pendientes_deudor.length != 0) {

                valida_pendientes_deudor.map(async (deudor) => {
                    await deudores.eliminar_relacion_deudores_compras(deudor.id_deudor, transaction)
                })
            }

            await deudores.eliminar_deudores(id, transaction)

            await transaction.rollback()
            // await transaction.commit()
            return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });
        } else {
            return res.status(200).send({ message: 'Deudor mantiene pagos pendientes', code: process.env.CODE_NOK });
        } */

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}

export const rel_deudor_compra = async (req, res) => {
    console.log('SERVICE [rel_deudor_compra]')
    const { id_deudor, id_compra } = req.body

    const transaction = await sequel.transaction()
    try {
        await deudores.rel_deudor_compra(id_deudor, id_compra, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}