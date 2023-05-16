const { response } = require('express')
const { pool } =require('../db.js')

const rolesGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM rol')
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const rolGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM rol WHERE idrol = ? LIMIT 1' , [req.params.id])
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


module.exports = {
    rolesGet,
    rolGet
}