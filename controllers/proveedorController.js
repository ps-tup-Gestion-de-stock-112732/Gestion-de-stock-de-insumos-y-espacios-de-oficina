const { response } = require('express')
const { pool } =require('../db.js')

const proveedoresGet = async (req = request, res = response) =>{

    const {tipoempresa} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM empresa WHERE estado = 1 AND tipoempresa= ? ', [tipoempresa])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedorXNombreGet = async (req = request, res = response) =>{

    const {nombre, tipoempresa} = req.body

    try {
        const [result] = await pool.promise().query('SELECT * FROM empresa WHERE nombre LIKE ? AND tipoempresa = ?', ['%'+nombre+'%', tipoempresa])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias para el proveedor: '+nombre
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}


const proveedorPost = async (req, res = response) =>{

    const {nombre, telefono, cuit, iddireccion, idadmin} = req.body
    const estado = 1
    const tipoempresa = 2

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO empresa (nombre, telefono, cuit, iddireccion, estado, tipoempresa, idadmin) VALUES (?,?,?,?,?,?,?)', 
        [nombre, telefono, cuit, iddireccion, estado, tipoempresa, idadmin])
        res.send({
            idproveedor: rows.insertId,
            nombre, 
            telefono, 
            cuit,
            iddireccion,
            idadmin
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const proveedorPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, telefono, cuit, iddireccion, idadmin} = req.body
    const tipoempresa = 2

    try {

        const [result] = await pool.promise().query('UPDATE empresa SET nombre = IFNULL(?,nombre), telefono = IFNULL(?,telefono), cuit = IFNULL(?,cuit), iddireccion = IFNULL(?,iddireccion), idadmin = IFNULL(?,idadmin) WHERE idempresa = ? AND tipoempresa = ?', 
        [nombre, telefono, cuit, iddireccion, idadmin, id, tipoempresa])

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
    proveedoresGet,
    proveedorPost,
    proveedorPut,
    proveedorDelete,
    proveedorXNombreGet
}