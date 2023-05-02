const { response } = require('express')
const { pool } =require('../db.js')

const proveedorPost = async (req, res = response) =>{

    const {nombre, telefono, cuit, iddireccion} = req.body
    const estado = 1
    const tipoempresa = 2

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO empresa (nombre, telefono, cuit, iddireccion, estado, tipoempresa) VALUES (?,?,?,?,?,?)', 
        [nombre, telefono, cuit, iddireccion, estado, tipoempresa])
        res.send({
            idproveedor: rows.insertId,
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
    proveedorPost
}