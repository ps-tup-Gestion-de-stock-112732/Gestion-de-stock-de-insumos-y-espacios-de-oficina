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

const barriosNombreGet = async (req = request, res = response) =>{

    const {nombre} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM barrio WHERE nombre LIKE ?', ['%'+nombre+'%'])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const barriosGetAll = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM barrio')
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const direccionGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM direccion WHERE iddireccion = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Direccion no encontrada'
        })

        res.json(result[0])
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

const paisGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM pais WHERE idpais = ?', [req.params.id])
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const provinciaGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM provincia WHERE idprovincia = ?', [req.params.id])
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const localidadGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM localidad WHERE idlocalidad = ?', [req.params.id])
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const barrioGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM barrio WHERE idbarrio = ?', [req.params.id])
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const direccionPut = async (req, res = response) =>{

    const {id} = req.params
    const {calle, altura, idbarrio} = req.body
    
    try {

        const [result] = await pool.promise().query('UPDATE direccion SET calle = IFNULL(?,calle), altura = IFNULL(?,altura), idbarrio = IFNULL(?,idbarrio) WHERE iddireccion = ?', 
        [calle, altura, idbarrio, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Direccion no encontrada'
        })

        const [rows] = await pool.promise().query('SELECT * FROM direccion WHERE iddireccion = ?', [id])

        res.json(rows[0])
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
    direccionGet,
    direccionPost,
    paisGet,
    provinciaGet,
    localidadGet,
    barrioGet,
    direccionPut,
    barriosGetAll,
    barriosNombreGet
}