import { situacionFinanciera } from '../../database/dao'

export const obtenerSituacion = async (req, res) => {
    console.log('SERVICE [obtenerSituacion]')

    try {
        const data = await situacionFinanciera.obtenerSituacion()
        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK, data: data[0] });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}