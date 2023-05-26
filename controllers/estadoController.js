const { response } = require('express')
const { pool } =require('../db.js')

const estadoGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM estadoautorizacion WHERE idestado = ?',[req.params.id])
    res.json(results[0])
    
}

module.exports = {
    estadoGet
}