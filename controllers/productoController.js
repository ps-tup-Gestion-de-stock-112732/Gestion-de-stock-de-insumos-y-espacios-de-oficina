const { response } = require('express')
const { pool } =require('../db.js')

const productosGet = async (req = request, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM producto WHERE estado = 1 AND idProveedor = ?',[req.body.idProveedor])
    res.json(results)
}

const productoXNombreGet = async (req = request, res = response) =>{

    const {nombreProducto, idProveedor} = req.body

    try {
        const [result] = await pool.promise().query('SELECT * FROM producto WHERE nombreProducto LIKE ? AND idProveedor = ? AND estado = 1', ['%'+nombreProducto+'%', idProveedor])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias para el producto: '+nombre
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const productoPost = async (req, res = response) =>{

    const {codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad} = req.body
    const estado = 1

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO producto (codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, estado) VALUES (?,?,?,?,?,?,?)', 
        [codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, estado])
        res.send({
            codigo, 
            idProveedor, 
            nombreProducto, 
            descripcion, 
            precioUnitario, 
            cantidad,
            estado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const productoDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE producto SET estado = 0 WHERE codigo = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el producto'
        })

        const producto = await pool.promise().query('SELECT * FROM producto WHERE codigo = ?', [id])
        const productoBorrado = producto[0]

        res.json({
            productoBorrado
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    productosGet,
    productoXNombreGet,
    productoPost,
    productoDelete
}