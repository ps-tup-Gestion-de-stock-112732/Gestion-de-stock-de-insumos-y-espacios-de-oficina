const { response } = require('express')
const { pool } =require('../db.js')
const bcryptjs = require('bcryptjs')

const empleadosGet = async (req = request, res = response) =>{

    let desde = Number(0)
    let limite = Number(5)

    if (req.query.desde) {
        desde = Number(req.query.desde)
    }

    if (req.query.limite) {
        limite = Number(req.query.limite)
    }

    try {
        const [results] = await pool.promise().query('SELECT * FROM usuario WHERE idrol = 5 LIMIT ?,?', [desde, limite])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const empleadoGet = async (req = request, res = response) =>{

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

const empleadoPost = async (req, res = response) =>{

    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, estado, idarea, iddireccion} = req.body
    const idrol =5

    //Encriptar password
    const salt = bcryptjs.genSaltSync()
    let passwordC = await bcryptjs.hashSync( password, salt)

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO usuario (nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, estado, idarea, iddireccion) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
        [nombre, apellido, idempresa, nro_documento, email, passwordC, telefono, idrol, estado, idarea, iddireccion])
        res.send({
            idusuario: rows.insertId,
            nombre, 
            apellido, 
            idempresa, 
            nro_documento, 
            email,
            telefono, 
            idrol, 
            estado, 
            idarea, 
            iddireccion
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const empleadoPut = async (req, res = response) =>{

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

const empleadoDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE usuario SET estado = 2 WHERE idusuario = ?', 
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
    empleadosGet,
    empleadoGet,
    empleadoPost,
    empleadoPut,
    empleadoDelete
}