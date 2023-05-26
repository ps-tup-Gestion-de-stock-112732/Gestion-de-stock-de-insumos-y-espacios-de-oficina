const { response } = require('express')
const { pool } =require('../db.js')

const productosGet = async (req = request, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM producto WHERE estado = 1 AND idProveedor = ? AND cantidad > 0',[req.body.idempresa])
    res.json(results)
}

const productoGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM producto WHERE codigo = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

const productoXNombreGet = async (req = request, res = response) =>{

    const {nombreProducto, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('SELECT * FROM producto WHERE nombreProducto LIKE ? AND idProveedor = ? AND estado = 1', ['%'+nombreProducto+'%', idempresa])

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

    const {codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, imagen, idcategoria} = req.body
    const estado = 1

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO producto (codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, estado, imagen, idcategoria) VALUES (?,?,?,?,?,?,?,?,?)', 
        [codigo, idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, estado, imagen, idcategoria])
        res.send({
            codigo, 
            idProveedor, 
            nombreProducto, 
            descripcion, 
            precioUnitario, 
            cantidad,
            estado,
            imagen, 
            idcategoria
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const productoPut = async (req, res = response) =>{

    const {id} = req.params
    const {idProveedor, nombreProducto, descripcion, precioUnitario, cantidad, imagen, idcategoria}= req.body
    
    try {

        const [result] = await pool.promise().query('UPDATE producto SET nombreProducto = IFNULL(?,nombreProducto), descripcion = IFNULL(?,descripcion), precioUnitario = IFNULL(?,precioUnitario), cantidad = IFNULL(?,cantidad), imagen = IFNULL(?,imagen), idcategoria = IFNULL(?,idcategoria) WHERE codigo = ? AND idProveedor = ?', 
        [nombreProducto, descripcion, precioUnitario, cantidad, imagen, idcategoria, id, idProveedor])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })

        const [rows] = await pool.promise().query('SELECT * FROM producto WHERE codigo = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const productoCantidadPut = async (req, res = response) =>{

    const id = req.params.id
    const {cantidad} = req.body

    try {
        
        const [result] = await pool.promise().query('UPDATE producto SET cantidad = (cantidad - ?) WHERE codigo = ?', 
        [cantidad, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar el producto'
        })

        const producto = await pool.promise().query('SELECT * FROM producto WHERE codigo = ?', [id])
        const productoActualizado = producto[0]

        res.json({
            productoActualizado
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
    productoGet,
    productoXNombreGet,
    productoPost,
    productoDelete,
    productoPut,
    productoCantidadPut
}