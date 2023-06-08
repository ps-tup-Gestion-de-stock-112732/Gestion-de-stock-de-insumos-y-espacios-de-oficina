const { response } = require('express')
const { pool } =require('../db.js')
var datetime = require('../helpers/datetime.js')

const oficinaGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM oficina WHERE idoficina = ?',[req.params.id])
    res.json(results[0])
    
}

const oficinasGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM oficina WHERE idempresa = ? AND idestado = 1',[req.body.idempresa])
    res.json(results)
    
}

const oficinaPost = async (req, res = response) =>{

    const {nombreoficina, idempresa, cantidadfilas, cantidadcolumnas} = req.body
    const idestado = 1

    try {
        const [rows] = await pool.promise().query('INSERT INTO oficina (nombreoficina, idempresa, cantidadfilas, cantidadcolumnas, idestado) VALUES (?,?,?,?,?)', 
        [nombreoficina, idempresa, cantidadfilas, cantidadcolumnas, idestado])

        res.send({
            idoficina: rows.insertId,
            nombreoficina,
            idempresa,
            cantidadfilas, 
            cantidadcolumnas,
            idestado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const oficinaPut = async (req, res = response) =>{

    const {id} = req.params
    const {nombreoficina, cantidadfilas, cantidadcolumnas} = req.body
    
    try {

        const [result] = await pool.promise().query('UPDATE oficina SET nombreoficina = ?, cantidadfilas = ?, cantidadcolumnas = ? WHERE idoficina = ?', 
        [nombreoficina, cantidadfilas, cantidadcolumnas, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Oficina no encontrada'
        })

        const [rows] = await pool.promise().query('SELECT * FROM oficina WHERE idoficina = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const oficinaDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE oficina SET idestado = 0 WHERE idoficina = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la oficina'
        })

        const oficina = await pool.promise().query('SELECT * FROM oficina WHERE idoficina = ?', [id])
        const oficinaActualizada = oficina[0]

        res.json({
            oficinaActualizada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const oficinaEspaciosGet = async (req, res = response) =>{

    const {fecha} = req.body

    f = datetime.trimstring(fecha)

    const [results] = await pool.promise().query('SELECT * FROM espacioreservado WHERE idoficina = ? AND idestado = 1 AND fecha = ?',[req.params.id, f])
    res.json(results)
    
}


const oficinaEspaciosEmpleadoGet = async (req, res = response) =>{

    const fecha = datetime.datetimeshort()

    const [results] = await pool.promise().query('SELECT * FROM espacioreservado WHERE idempleado = ? AND idestado = 1 AND fecha >= ? ORDER BY fecha ASC',[req.params.id, fecha])
    res.json(results)
    
}


const oficinaEspacioPost = async (req, res = response) =>{

    const {idoficina, idempleado, fila, columna, fecha} = req.body
    const idestado = 1

    try {
        const [rows] = await pool.promise().query('INSERT INTO espacioreservado (idoficina, idempleado, fila, columna, fecha, idestado) VALUES (?,?,?,?,?,?)', 
        [idoficina, idempleado, fila, columna, fecha, idestado])

        res.send({
            idespacio: rows.insertId,
            idoficina, 
            idempleado, 
            fila, 
            columna, 
            fecha, 
            idestado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const oficinaEspacioCancelarPut = async (req, res = response) =>{

    try {
        
        const [result] = await pool.promise().query('UPDATE espacioreservado SET idestado = 0 WHERE idespacio = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el espacio'
        })

        const espacio = await pool.promise().query('SELECT * FROM espacioreservado WHERE idespacio = ?', [req.params.id])
        const espacioCancelado = espacio[0]

        res.json({
            espacioCancelado
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


module.exports = {
    oficinaGet,
    oficinasGet,
    oficinaPost,
    oficinaPut,
    oficinaDelete,
    oficinaEspaciosGet,
    oficinaEspacioPost,
    oficinaEspaciosEmpleadoGet,
    oficinaEspacioCancelarPut
}