const { response } = require('express')
const { pool } =require('../db.js')

const usuariosGet = async (req = request, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM usuario')
    res.json(results)
}

const usuarioGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const usuarioPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol}= req.body

    try {

        const [result] = await pool.promise().query('UPDATE usuario SET nombre = IFNULL(?,nombre), apellido = IFNULL(?,apellido), idempresa = IFNULL(?,idempresa), nro_documento = IFNULL(?,nro_documento), email = IFNULL(?,email), password = IFNULL(?,password), telefono = IFNULL(?,telefono), idrol = IFNULL(?,idrol) WHERE idusuario = ?', 
        [nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        const [rows] = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}