import { instituciones } from '../../database/dao'
import { sequel } from '../../database'

export const obtenerInstituciones = async (req, res) => {
    console.log('SERVICE [obtenerInstituciones]')

    try {

        const data = await instituciones.obtenerInstituciones()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK, data });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}
