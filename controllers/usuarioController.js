const { response } = require('express')
const { pool } =require('../db.js')
const bcryptjs = require('bcryptjs')

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

const usuarioPost = async (req, res = response) =>{

    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, estado} = req.body

    //Encriptar password
    const salt = bcryptjs.genSaltSync()
    let passwordC = await bcryptjs.hashSync( password, salt)

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO usuario (nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, estado) VALUES (?,?,?,?,?,?,?,?,?)', 
        [nombre, apellido, idempresa, nro_documento, email, passwordC, telefono, idrol, estado])
        res.send({
            idusuario: rows.insertId,
            nombre, 
            apellido, 
            idempresa, 
            nro_documento, 
            email,
            telefono, 
            idrol, 
            estado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const usuarioPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol}= req.body

    const salt = bcryptjs.genSaltSync()
    passwordC = await bcryptjs.hashSync( password, salt)
    
    try {

        const [result] = await pool.promise().query('UPDATE usuario SET nombre = ?, apellido = ?, idempresa = ?, nro_documento = ?, email = ?, password = ?, telefono = ?, idrol = ? WHERE idusuario = ?', 
        [nombre, apellido, idempresa, nro_documento, email, passwordC, telefono, idrol, id])

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

const usuarioDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE usuario SET estado = 0 WHERE idusuario = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el usuario'
        })

        const usuario = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [id])
        const usuarioBorrado = usuario[0]

        res.json({
            usuarioBorrado
        })

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