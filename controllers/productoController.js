const { response } = require('express')
const { pool } =require('../db.js')

const productoPost = async (req, res = response) =>{

    const {codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad} = req.body

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO producto (codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad) VALUES (?,?,?,?,?,?)', 
        [codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad])
        res.send({
            codigo, 
            idProveedor, 
            nombreProducto, 
            descripcion, 
            precioUnitario, 
            cantidad
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    productoPost
}