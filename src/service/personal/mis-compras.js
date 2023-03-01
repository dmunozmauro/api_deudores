import { misCompras, instituciones } from '../../database/dao'
import { sequel } from '../../database'

export const obtenerCompras = async (req, res) => {
    console.log('SERVICE [obtenerCompras]')

    try {
        let data = []

        const institucion = await instituciones.obtenerInstituciones()

        await Promise.all(
            institucion.map(async (i) => {
                let compras = await misCompras.misCompras(i.id)

                data.push({
                    "id_institucion": i.id,
                    "nombre": i.nombre.toUpperCase(),
                    "deudas": compras
                })

                return data
            })
        )

        return res.status(200).send({ message: process.env.MENSAJE_OK, code: process.env.CODE_OK, data });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: process.env.MENSAJE_NOK, code: process.env.CODE_NOK });
    }
}
