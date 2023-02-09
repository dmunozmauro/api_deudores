import { prueba } from '../database/dao'
import { sequel } from '../database'

export const pruebaServices = async (req, res) => {
    try {
        const data = await prueba.prueba_dao()
        res.status(200).send({ message: 'OK', data });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: 'La operación no se pudo concretar, favor intente más tarde.' });
    }
}