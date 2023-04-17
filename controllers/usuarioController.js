const { response } = require('express')
const { pool } =require('../db.js')

const usuariosGet = async (req = request, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM usuario')
    res.json(results)
}

const usuarioGet = async (req = request, res = response) =>{

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



module.exports = {
    usuariosGet,
    usuarioGet
}