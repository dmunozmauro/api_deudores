import { sequel } from "../.."
import { QueryTypes } from 'sequelize'

export const obtenerInstituciones = async () => {
    let query = `select * from tal_instituciones ti order by ti.nombre asc`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}

export const obtenerInstitucionesConDeudas = async () => {
    let query = `select 
                    ti.id,
                    ti.nombre,
                    sum(tmc.valor_cuota) as deuda_total
                    from tal_instituciones ti
                    inner join rel_mis_compras_instituciones rmci on rmci.id_institucion = ti.id 
                    inner join tal_mis_compras tmc on tmc.id = rmci.id_mis_compras
                    group by ti.id
                    order by ti.nombre asc`;

    return await sequel.query(query, { type: QueryTypes.SELECT });
}


