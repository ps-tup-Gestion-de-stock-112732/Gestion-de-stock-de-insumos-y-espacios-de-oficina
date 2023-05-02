const { response } = require('express')
const { pool } =require('../db.js')

const areasGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT * FROM area')
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    areasGet
}