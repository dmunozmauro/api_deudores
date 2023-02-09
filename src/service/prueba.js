import { prueba } from '../database/dao'
import { sequel } from '../database'

export const pruebaServices = async (req, res) => {
    try {
        const data = await prueba.prueba_dao()
        res.status(200).send({ message: process.env.MENSAJE_OK, data });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK });
    }
}