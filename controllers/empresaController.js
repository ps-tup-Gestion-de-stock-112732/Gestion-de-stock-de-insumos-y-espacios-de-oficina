const { response } = require('express')
const { pool } =require('../db.js')

const empresaPost = async (req, res = response) =>{

    const {nombre, telefono, cuit, iddireccion} = req.body
    const estado = 1

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO empresa (nombre, telefono, cuit, iddireccion, estado) VALUES (?,?,?,?,?)', 
        [nombre, telefono, cuit, iddireccion, estado])
        res.send({
            idempresa: rows.insertId,
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

const empresaPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, telefono, cuit, iddireccion} = req.body
    
    try {

        const [result] = await pool.promise().query('UPDATE empresa SET nombre = ?, telefono = ?, cuit = ?, iddireccion = ? WHERE idempresa = ?', 
        [nombre, telefono, cuit, iddireccion, id])

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

const empresaDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE empresa SET estado = 0 WHERE idempresa = ?', 
        [id])

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
    empresaPost,
    empresaPut,
    empresaDelete
}