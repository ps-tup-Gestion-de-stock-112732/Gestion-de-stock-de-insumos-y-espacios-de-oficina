const { response } = require('express')
const { pool } =require('../db.js')

var datetime = require('../helpers/datetime.js')

const pedidoPost = async (req, res = response) =>{

    const {idempleado, idempresa, idProveedor, codigo, cantidad, precioUnitario} = req.body
    const fecha = datetime.datetime()

    //Guardar en BD
    try {

        const [rowspedido] = await pool.promise().query('INSERT INTO pedido (idempleado, idempresa, idProveedor, fecha) VALUES (?,?,?,?)', 
        [idempleado, idempresa, idProveedor, fecha])

        const [rowsdetalle] = await pool.promise().query('INSERT INTO detallepedido (idpedido, idproducto, cantidad, precioUnitario) VALUES (?,?,?,?)', 
        [rowspedido.insertId, codigo, cantidad, precioUnitario])

        res.send({
            idpedido: rowspedido.insertId,
            idempleado, 
            idempresa, 
            idProveedor, 
            fecha,
            iddetallepedido: rowsdetalle.insertId,
            codigo, 
            cantidad, 
            precioUnitario
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

module.exports = {
    pedidoPost
}