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


const solicitudesGet = async (req, res = response) =>{

    const {idempresa, estado} = req.body
    let idestado = estado

    if (idestado == 0) {
        idestado = '1,2,3,4,5'
    }

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'where p.idempresa = ? '+
                                                'and a.idestado in (?) '+
                                                'order by a.idestado asc',[idempresa, idestado])

    res.json(results)
    
}

const solicitudGet = async (req, res = response) =>{

    const {idautorizacion} = req.params

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'where a.idautorizacion = ? ',[idautorizacion])

    res.json(results[0])
    
}


const solicitudesFiltroGet = async (req, res = response) =>{

    const {idempresa, nombre, estado} = req.body
    let idestado = estado

    if (!estado) {
    }
    

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'join usuario u '+
                                                'on p.idempleado = u.idusuario '+
                                                'where p.idempresa = ? '+
                                                'and a.idestado in (?) '+
                                                'and (u.nombre LIKE ? OR u.apellido LIKE ?)',[idempresa, idestado, '%'+nombre+'%', '%'+nombre+'%'])

    res.json(results)
    
}


const rechazarSolicitudPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante, comentarios} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 4, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, idautorizante, comentarios, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudRechazada = solicitud[0]

        res.json({
            solicitudRechazada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

module.exports = {
    solicitudGestionPost,
    solicitudesGet,
    solicitudesFiltroGet,
    solicitudGet,
    rechazarSolicitudPut
}