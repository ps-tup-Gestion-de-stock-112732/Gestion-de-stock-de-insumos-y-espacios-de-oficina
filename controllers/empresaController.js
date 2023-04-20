const { response } = require('express')
const { pool } =require('../db.js')

const empresaPost = async (req, res = response) =>{

    const {nombre, telefono, cuit, iddireccion} = req.body

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO empresa (nombre, telefono, cuit, iddireccion) VALUES (?,?,?,?)', 
        [nombre, telefono, cuit, iddireccion])
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

module.exports = {
    empresaPost
}