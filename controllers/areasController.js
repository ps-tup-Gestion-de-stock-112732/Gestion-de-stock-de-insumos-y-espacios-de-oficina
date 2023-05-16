const { response } = require('express')
const { pool } =require('../db.js')

const areasGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM area WHERE idempresa = ? AND estado = 1', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const areaGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM area WHERE idarea = ? AND estado = 1', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Area no encontrada'
        })

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const areaNombrePost = async (req, res = response) =>{

    const {nombre, idempresa} = req.body
    const estado = 1

    try {
        const [results] = await pool.promise().query('SELECT * FROM area WHERE nombre= ? AND idempresa = ? AND estado = ?', [nombre, idempresa, estado])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const areaPost = async (req, res = response) =>{

    const {nombre, idempresa} = req.body
    const estado = 1

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO area (nombre, idempresa, estado) VALUES (?,?,?)', 
        [nombre, idempresa, estado])
        res.send({
            idarea: rows.insertId,
            nombre,
            idempresa
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const areaDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE area SET estado = 0 WHERE idarea = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el area'
        })

        const area = await pool.promise().query('SELECT * FROM area WHERE idarea = ?', [id])
        const areaBorrada = area[0]

        res.json({
            areaBorrada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    areasGet,
    areaGet,
    areaPost,
    areaDelete,
    areaNombrePost
}