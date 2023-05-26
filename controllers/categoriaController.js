const { response } = require('express')
const { pool } =require('../db.js')

const categoriasGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM categoria WHERE idempresa = ? AND estado = 1', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const categoriaGet = async (req = request, res = response) =>{

    try {
        const [result] = await pool.promise().query('SELECT * FROM categoria WHERE idcategoria = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({
            message: 'Categoria no encontrada'
        })

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}


const categoriaPost = async (req, res = response) =>{

    const {descripcion, idProveedor} = req.body
    const idempresa = idProveedor
    const estado = 1

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO categoria (descripcion, idempresa, estado) VALUES (?,?,?)', 
        [descripcion, idempresa, estado])
        res.send({
            idcategoria: rows.insertId,
            descripcion,
            idempresa
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}


const categoriaDelete = async (req, res = response) =>{

    const id = req.params.id

    try {
        
        const [result] = await pool.promise().query('UPDATE categoria SET estado = 0 WHERE idcategoria = ?', 
        [id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la categoria'
        })

        const categoria = await pool.promise().query('SELECT * FROM categoria WHERE idcategoria = ?', [id])
        const categoriaBorrada = categoria[0]

        res.json({
            categoriaBorrada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const categoriaUsadaGet = async (req = request, res = response) =>{

    const {idcategoria, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('SELECT * FROM producto WHERE idcategoria = ? AND idProveedor = ? AND estado = 1', [idcategoria, idempresa])

        res.json(result[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaDelete,
    categoriaUsadaGet
}