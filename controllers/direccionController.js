const { response } = require('express')
const { pool } =require('../db.js')

const paisesGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM pais')
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const provinciasGet = async (req = request, res = response) =>{

    const {idpais} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM provincia WHERE idpais = ?', [idpais])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const localidadesGet = async (req = request, res = response) =>{

    const {idprovincia} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM localidad WHERE idprovincia = ?', [idprovincia])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const barriosGet = async (req = request, res = response) =>{

    const {idlocalidad} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM barrio WHERE idlocalidad = ?', [idlocalidad])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const direccionPost = async (req, res = response) =>{

    const {calle, altura, idbarrio} = req.body

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO direccion (calle, altura, idbarrio) VALUES (?,?,?)', 
        [calle, altura, idbarrio])
        res.send({
            iddireccion: rows.insertId,
            calle,
            altura,
            idbarrio
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    paisesGet,
    provinciasGet,
    localidadesGet,
    barriosGet,
    direccionPost
}