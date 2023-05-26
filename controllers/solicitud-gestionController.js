const { response } = require('express')
const { pool } =require('../db.js')

var datetime = require('../helpers/datetime.js')

const solicitudGestionPost = async (req, res = response) =>{

    const {idpedido} = req.body
    const idestado = 1
    const fecha = datetime.datetime()
    
    //Guardar en BD
    try {

        const [rows] = await pool.promise().query('INSERT INTO autorizaciongestion (idpedido, idestado, fecha) VALUES (?,?,?)', 
        [idpedido, idestado, fecha])

        res.send({
            idautorizacion: rows.insertId,
            idpedido, 
            idestado,
            fecha
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    solicitudGestionPost
}