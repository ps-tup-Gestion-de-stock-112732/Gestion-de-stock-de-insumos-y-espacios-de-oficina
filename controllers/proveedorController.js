const { response } = require('express')
const { pool } =require('../db.js')

const proveedorPost = async (req, res = response) =>{

    const {nombre, telefono, cuit, iddireccion} = req.body
    const estado = 1
    const tipoempresa = 2

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO empresa (nombre, telefono, cuit, iddireccion, estado, tipoempresa) VALUES (?,?,?,?,?,?)', 
        [nombre, telefono, cuit, iddireccion, estado, tipoempresa])
        res.send({
            idproveedor: rows.insertId,
            nombre, 
            telefono, 
            cuit,
            iddireccion
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const proveedorPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, telefono, cuit, iddireccion} = req.body
    const tipoempresa = 2

    try {

        const [result] = await pool.promise().query('UPDATE empresa SET nombre = ?, telefono = ?, cuit = ?, iddireccion = ? WHERE idempresa = ? AND tipoempresa = ?', 
        [nombre, telefono, cuit, iddireccion, id, tipoempresa])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Empresa no encontrada'
        })

        const [rows] = await pool.promise().query('SELECT * FROM empresa WHERE idempresa = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const proveedorDelete = async (req, res = response) =>{

    const id = req.params.id
    const tipoempresa = 2

    try {
        
        const [result] = await pool.promise().query('UPDATE empresa SET estado = 0 WHERE idempresa = ? AND tipoempresa = ?', 
        [id, tipoempresa])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la empresa'
        })

        const empresa = await pool.promise().query('SELECT * FROM empresa WHERE idempresa = ?', [id])
        const empresaBorrada = empresa[0]

        res.json({
            empresaBorrada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    proveedorPost,
    proveedorPut,
    proveedorDelete
}