const { response } = require('express')
const { pool } =require('../db.js')

const bcryptjs = require('bcryptjs')

const autorizantesGet = async (req = request, res = response) =>{

    const {idempresa} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM usuario WHERE (idrol = 2 OR idrol = 3) AND idempresa = ? AND estado = 1', [idempresa])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const autorizanteGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ? AND estado = 1', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        res.send({
            idusuario: result[0].idusuario,
            nombre: result[0].nombre, 
            apellido: result[0].apellido,
            nro_documento: result[0].nro_documento, 
            email: result[0].email,
            password: null,
            telefono: result[0].telefono, 
            idempresa: result[0].idempresa,
            idrol: result[0].idrol, 
            estado: result[0].estado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const autorizanteXNombreGet = async (req = request, res = response) =>{

    const {nombre, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('SELECT * FROM usuario WHERE (nombre LIKE ? OR apellido LIKE ?) AND (idrol = 2 OR idrol = 3) AND idempresa = ? AND estado = 1', ['%'+nombre+'%', '%'+nombre+'%', idempresa])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias para el usuario: '+nombre
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const autorizantePost = async (req, res = response) =>{

    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol} = req.body

    //Encriptar password
    const salt = bcryptjs.genSaltSync()
    let passwordC = await bcryptjs.hashSync( password, salt)
    let estado = 1

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

const autorizantePut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol}= req.body

    passwordC = undefined
    
    if (password != undefined) {
        const salt = bcryptjs.genSaltSync()
        passwordC = await bcryptjs.hashSync( password, salt)
    }
    
    try {

        const [result] = await pool.promise().query('UPDATE usuario SET nombre = IFNULL(?,nombre), apellido = IFNULL(?,apellido), idempresa = IFNULL(?,idempresa), nro_documento = IFNULL(?,nro_documento), email = IFNULL(?,email), password = IFNULL(?,password), telefono = IFNULL(?,telefono), idrol = IFNULL(?,idrol) WHERE idusuario = ?', 
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

const autorizanteDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE usuario SET estado = 0 WHERE idusuario = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el autorizante'
        })

        const autorizante = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [id])
        const autorizanteBorrado = autorizante[0]

        res.json({
            autorizanteBorrado
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    autorizantesGet,
    autorizanteXNombreGet,
    autorizanteDelete,
    autorizantePost,
    autorizanteGet,
    autorizantePut
}