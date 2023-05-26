const { response } = require('express')
const { pool } =require('../db.js')

var datetime = require('../helpers/datetime.js')

const contratosGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM contrato WHERE idempresa = ? AND fechaFin IS NULL',[req.params.id])
    res.json(results)
    
}

const contratosProveedorGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM contrato WHERE idempresaProveedor = ? AND fechaFin IS NULL',[req.params.id])
    res.json(results)
    
}

const proveedorXNombreGet = async (req = request, res = response) =>{

    const {nombre, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('select * '+
                                                    'from contrato '+
                                                    'where idempresa = ? '+
                                                    'and fechaFin IS NULL '+
                                                    'and idempresaProveedor in (select idempresa '+
                                                                                'from empresa '+
                                                                                'where tipoempresa = 2 '+
                                                                                'and nombre like ?)', [idempresa,'%'+nombre+'%'])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias de contratos'
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const empresaXNombreGet = async (req = request, res = response) =>{

    const {nombre, idProveedor} = req.body

    try {
        const [result] = await pool.promise().query('select * '+
                                                    'from contrato '+
                                                    'where idempresaProveedor = ? '+
                                                    'and fechaFin IS NULL '+
                                                    'and idempresa in (select idempresa '+
                                                                        'from empresa '+
                                                                        'where tipoempresa = 1 '+
                                                                        'and nombre like ?)', [idProveedor,'%'+nombre+'%'])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias de contratos'
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const contratoPost = async (req, res = response) =>{

    const {idempresa, idProveedor, idautorizacion} = req.body

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO contrato (idempresa, idempresaProveedor, idautorizacion) VALUES (?,?,?)', 
        [idempresa, idProveedor, idautorizacion])
        res.send({
            id: rows.insertId,
            idempresa, 
            idProveedor
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const contratoDelete = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE contrato SET fechaFin = ? WHERE id = ?', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo dar de baja el contrato'
        })

        const contrato = await pool.promise().query('SELECT * FROM contrato WHERE id = ?', [id])
        const contratoCancelado = contrato[0]

        res.json({
            contratoCancelado
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    contratosGet,
    contratosProveedorGet,
    proveedorXNombreGet,
    empresaXNombreGet,
    contratoPost,
    contratoDelete
}