const { response } = require('express')
const { pool } =require('../db.js')

const empresasGet = async (req = request, res = response) =>{

    let desde = Number(0)
    let limite = Number(5)

    if (req.query.desde) {
        desde = Number(req.query.desde)
    }

    if (req.query.limite) {
        limite = Number(req.query.limite)
    }

    try {
        const [results] = await pool.promise().query('SELECT * FROM empresa WHERE estado = 1 LIMIT ?,?', [desde, limite])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const empresaGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM empresa WHERE idempresa IN (SELECT idempresa FROM usuario WHERE idusuario = ?) LIMIT 1', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Empresa no encontrada'
        })

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

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
    empresasGet,
    empresaGet,
    empresaPost,
    empresaPut,
    empresaDelete
}