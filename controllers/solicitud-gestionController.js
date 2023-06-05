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

    const {idempresa} = req.body

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'where p.idempresa = ? '+
                                                'order by a.idestado asc',[idempresa])

    res.json(results)
    
}

const solicitudesXProveedorGet = async (req, res = response) =>{

    const {idProveedor} = req.body

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'where p.idproveedor = ? '+
                                                'and a.idestado in (3,6,7,8) '+
                                                'order by a.idestado asc',[idProveedor])

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


const solicitudesFiltroProveedorGet = async (req, res = response) =>{

    const {idProveedor, nombre, estado} = req.body
    let idestado = estado

    if(idestado == ""){
        idestado = 3,6,7,8
    }

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'join usuario u '+
                                                'on p.idempleado = u.idusuario '+
                                                'where p.idproveedor = ? '+
                                                'and a.idestado in (?) '+
                                                'and (u.nombre LIKE ? OR u.apellido LIKE ?)',[idProveedor, idestado, '%'+nombre+'%', '%'+nombre+'%'])

    res.json(results)
    
}

const solicitudesFiltroEstadoGet = async (req, res = response) =>{

    const {idempresa, idempleado, estado} = req.body
    let idestado = estado

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'join usuario u '+
                                                'on p.idempleado = u.idusuario '+
                                                'where p.idempresa = ? '+
                                                'and u.idusuario = ? '+
                                                'and a.idestado in (?) ',[idempresa, idempleado, idestado])

    res.json(results)
    
}


const solicitudesXEmpleadoGet = async (req, res = response) =>{

    const {id} = req.params

    const [results] = await pool.promise().query(`select a.*, p.idempleado, p.idempresa, p.idproveedor, p.fecha 'fechapedido', dp.idproducto, dp.cantidad, dp.precioUnitario `+
                                                'from autorizaciongestion a '+
                                                'join pedido p '+
                                                'on a.idpedido = p.idpedido '+
                                                'join detallepedido dp '+
                                                'on p.idpedido = dp.idpedido '+
                                                'join usuario u '+
                                                'on p.idempleado = u.idusuario '+
                                                'where p.idempleado = ?',[id])

    res.json(results)
    
}


const rechazarSolicitudPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante, comentarios} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 4, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ?', 
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

const cancelarSolicitudPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 5, fecha = ? WHERE idautorizacion = ?', 
        [fecha, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo cancelar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudCancelada = solicitud[0]

        res.json({
            solicitudCancelada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const aprobarSolicitudPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante, comentarios} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 2, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, idautorizante, comentarios, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudAprobada = solicitud[0]

        res.json({
            solicitudAprobada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const aprobarSolicitudVentasPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante, idoperacion} = req.body
    const fecha = datetime.datetime()

    const comentarios = 'APROBADO'

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 3, fecha = ?, idautorizante = ?, comentarios = ?, idoperacion = ? WHERE idautorizacion = ? AND idestado = 2', 
        [fecha, idautorizante, comentarios, idoperacion, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudAprobada = solicitud[0]

        res.json({
            solicitudAprobada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const enviarPedidoPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante} = req.body
    const fecha = datetime.datetime()

    const comentarios = 'ENVIADO'

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 6, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ? AND idestado = 3', 
        [fecha, idautorizante, comentarios, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudAprobada = solicitud[0]

        res.json({
            solicitudAprobada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const rechazarPedidoPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante, comentarios} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 8, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ? AND idestado = 3', 
        [fecha, idautorizante, comentarios, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudAprobada = solicitud[0]

        res.json({
            solicitudAprobada
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const entregarPedidoPut = async (req, res = response) =>{

    const {idautorizacion} = req.params
    const {idautorizante} = req.body
    const fecha = datetime.datetime()

    const comentarios = 'ENTREGADO'

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizaciongestion SET idestado = 7, fecha = ?, idautorizante = ?, comentarios = ? WHERE idautorizacion = ? AND idestado = 6', 
        [fecha, idautorizante, comentarios, idautorizacion])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [idautorizacion])
        const solicitudAprobada = solicitud[0]

        res.json({
            solicitudAprobada
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
    rechazarSolicitudPut,
    aprobarSolicitudPut,
    solicitudesXEmpleadoGet,
    aprobarSolicitudVentasPut,
    solicitudesFiltroEstadoGet,
    cancelarSolicitudPut,
    solicitudesXProveedorGet,
    solicitudesFiltroProveedorGet,
    enviarPedidoPut,
    rechazarPedidoPut,
    entregarPedidoPut
}