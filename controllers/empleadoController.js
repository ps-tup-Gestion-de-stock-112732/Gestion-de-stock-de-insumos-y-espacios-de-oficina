const { response } = require('express')
const { pool } =require('../db.js')
const bcryptjs = require('bcryptjs')
const { subirArchivo } = require('../helpers/subir-archivo.js')

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

    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idarea, iddireccion} = req.body
    const estado =1
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

const cargarArchivo = async (req, res = response) =>{

    let empleados = []

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivos que subir'
        });
        return;
    }

    try {
        
        const data = await subirArchivo( req.files, ['xlsx'], 'empleados')

        for (const empleado of data) {
            
            const estado = 1
            const idrol = 5
            let pass = toString(empleado.password)

            //Encriptar password
            const salt = bcryptjs.genSaltSync()
            let passwordC = await bcryptjs.hashSync( pass, salt)

            const [rows] = await pool.promise().query('INSERT INTO usuario (nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, estado, idarea, iddireccion) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
            [empleado.nombre, empleado.apellido, empleado.idempresa, empleado.nro_documento, empleado.email, passwordC, empleado.telefono, idrol, estado, empleado.idarea, empleado.iddireccion])

            empleados.push({
                idusuario: rows.insertId,
                nombre: empleado.nombre, 
                apellido: empleado.apellido, 
                idempresa: empleado.idempresa, 
                nro_documento: empleado.nro_documento, 
                email: empleado.email,
                telefono: empleado.telefono, 
                idrol: empleado.idrol, 
                estado: empleado.estado, 
                idarea: empleado.idarea, 
                iddireccion: empleado.iddireccion, 
            })

        }

        res.json({empleados})

    } catch (error) {

        res.status(400).json({error})
    }
    
}

const empleadoPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombre, apellido, idempresa, nro_documento, email, password, telefono, idrol, idarea, iddireccion}= req.body

    const salt = bcryptjs.genSaltSync()
    passwordC = await bcryptjs.hashSync( password, salt)
    
    try {

        const [result] = await pool.promise().query('UPDATE usuario SET nombre = ?, apellido = ?, idempresa = ?, nro_documento = ?, email = ?, password = ?, telefono = ?, idrol = ?, idarea = ?, iddireccion = ? WHERE idusuario = ?', 
        [nombre, apellido, idempresa, nro_documento, email, passwordC, telefono, idrol, idarea, iddireccion, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
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
        
        const [result] = await pool.promise().query('UPDATE usuario SET estado = 0 WHERE idusuario = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el empleado'
        })

        const empleado = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [id])
        const empleadoBorrado = empleado[0]

        res.json({
            empleadoBorrado
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
    cargarArchivo,
    empleadoPut,
    empleadoDelete
}