import { deudores } from '../database/dao'
import { sequel } from '../database'

export const insertar_deudores = async (req, res) => {
    console.log('SERVICE [insertar_deudores]')
    const { nombre_deudor } = req.body
    const transaction = await sequel.transaction()
    try {

        let deudor = nombre_deudor.toUpperCase()

        const valida_deudor = await deudores.valida_deudor(deudor)

        if (valida_deudor.length > 0) {
            return res.status(200).send({ message: 'Ya existe deudor ingresado' });
        }

        await deudores.insertar_deudores(deudor, transaction)
        await transaction.commit()
        return res.status(200).send({ message: process.env.MENSAJE_OK });

    } catch (e) {
        await transaction.rollback()
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}