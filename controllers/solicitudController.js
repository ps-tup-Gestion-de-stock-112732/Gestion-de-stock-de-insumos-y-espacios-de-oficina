const { response } = require('express')
const { pool } = require('../db.js')

var datetime = require('../helpers/datetime.js')

const solicitudPost = async (req, res = response) =>{

    const {idempresa, idProveedor, idsolicitante} = req.body
    const idestado = 1
    const fecha = datetime.datetime()

    console.log(fecha);

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO autorizacionempresa (idempresa, idempresaProveedor, idsolicitante, idestado, fecha) VALUES (?,?,?,?,?)', 
        [idempresa, idProveedor, idsolicitante, idestado, fecha])
        res.send({
            idautorizacion: rows.insertId, 
            idempresa, 
            idProveedor,
            idsolicitante,
            idestado, 
            fecha
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
    
}

const solicitudUsuarioEmpresaPost = async (req, res = response) =>{

    const {idusuario, idempresa} = req.body
    const idestado = 1
    const fecha = datetime.datetime()

    console.log(fecha);

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO autorizacionusuarioemp (idusuario, idempresa, idestado, fecha) VALUES (?,?,?,?)', 
        [idusuario, idempresa, idestado, fecha])
        res.send({
            idautorizacion: rows.insertId, 
            idusuario, 
            idempresa, 
            idestado, 
            fecha
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
    
}

const solicitudUsuarioProveedorPost = async (req, res = response) =>{

    const {idusuario, idProveedor} = req.body
    const idestado = 1
    const fecha = datetime.datetime()

    console.log(fecha);

    //Guardar en BD
    try {
        const [rows] = await pool.promise().query('INSERT INTO autorizacionusuarioprov (idusuario, idempresa, idestado, fecha) VALUES (?,?,?,?)', 
        [idusuario, idProveedor, idestado, fecha])
        res.send({
            idautorizacion: rows.insertId, 
            idusuario, 
            idProveedor, 
            idestado, 
            fecha
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
    
}

const solicitudXNombreGet = async (req = request, res = response) =>{

    const {nombre, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('select * '+
                                                    'from autorizacionempresa '+
                                                    'where idempresa = ? '+
                                                    'and idestado = 1 '+
                                                    'and idempresaProveedor in (select idempresa '+
                                                                                'from empresa '+
                                                                                'where tipoempresa = 2 '+
                                                                                'and nombre like ?)', [idempresa,'%'+nombre+'%'])

        if (result.length <= 0) return res.status(404).json({
            message: 'Sin coincidencias de solicitudes'
        })

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}



const solicitudXNombreUsuarioGet = async (req = request, res = response) =>{

    const {nombre, idempresa} = req.body

    try {
        const [result] = await pool.promise().query('select * '+
                                                    'from autorizacionusuarioemp '+
                                                    'where idempresa = ? '+
                                                    'and idestado = 1 '+
                                                    'and idusuario in (select idusuario '+
                                                                        'from usuario '+
                                                                        'where (nombre like ? or apellido like ?))', [idempresa,'%'+nombre+'%','%'+nombre+'%'])

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const solicitudXNombreUsuarioProvGet = async (req = request, res = response) =>{

    const {nombre, idProveedor} = req.body

    try {
        const [result] = await pool.promise().query('select * '+
                                                    'from autorizacionusuarioprov '+
                                                    'where idempresa = ? '+
                                                    'and idestado = 1 '+
                                                    'and idusuario in (select idusuario '+
                                                                        'from usuario '+
                                                                        'where (nombre like ? or apellido like ?))', [idProveedor,'%'+nombre+'%','%'+nombre+'%'])

        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
    
}

const solicitudPendientesGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionempresa WHERE idempresa = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}

const solicitudPendientesProvGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionempresa WHERE idempresaProveedor = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}


const solicitudPendientesXEmpresaGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionusuarioemp WHERE idempresa = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}

const solicitudPendientesXProveedorGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionusuarioprov WHERE idempresa = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}

const solicitudPendientesUsuarioEmpresaGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionusuarioemp WHERE idusuario = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}

const solicitudPendientesUsuarioProveedorGet = async (req, res = response) =>{

    const [results] = await pool.promise().query('SELECT * FROM autorizacionusuarioprov WHERE idusuario = ? AND idestado = 1',[req.params.id])
    res.json(results)
    
}



const cancelarPendientesPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionempresa SET idestado = 4, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionempresa WHERE idautorizacion = ?', [id])
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


const cancelarPendientesUsuarioEmpresaPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioemp SET idestado = 4, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioemp WHERE idautorizacion = ?', [id])
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


const cancelarPendientesUsuarioProveedorPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioprov SET idestado = 4, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioprov WHERE idautorizacion = ?', [id])
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


const aprobarPendientesPut = async (req, res = response) =>{

    const id = req.params.id
    const {idautorizante} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionempresa SET idestado = 2, fecha = ?, idautorizante = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, idautorizante, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionempresa WHERE idautorizacion = ?', [id])
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



const aprobarPendientesUsuarioEmpresaPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioemp SET idestado = 2, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioemp WHERE idautorizacion = ?', [id])
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



const aprobarPendientesUsuarioProveedorPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioprov SET idestado = 2, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioprov WHERE idautorizacion = ?', [id])
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


const rechazarPendientesPut = async (req, res = response) =>{

    const id = req.params.id
    const {idautorizante} = req.body
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionempresa SET idestado = 3, fecha = ?, idautorizante = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, idautorizante, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionempresa WHERE idautorizacion = ?', [id])
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


const rechazarPendientesUsuarioEmpresaPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioemp SET idestado = 3, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioemp WHERE idautorizacion = ?', [id])
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


const rechazarPendientesUsuarioProveedorPut = async (req, res = response) =>{

    const id = req.params.id
    const fecha = datetime.datetime()

    try {
        
        const [result] = await pool.promise().query('UPDATE autorizacionusuarioprov SET idestado = 3, fecha = ? WHERE idautorizacion = ? AND idestado = 1', 
        [fecha, id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo actualizar la solicitud'
        })

        const solicitud = await pool.promise().query('SELECT * FROM autorizacionusuarioprov WHERE idautorizacion = ?', [id])
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

module.exports = {
    solicitudPost,
    solicitudUsuarioEmpresaPost,
    solicitudUsuarioProveedorPost,
    solicitudXNombreGet,
    solicitudPendientesGet,
    cancelarPendientesPut,
    solicitudPendientesProvGet,
    aprobarPendientesPut,
    rechazarPendientesPut,
    solicitudPendientesUsuarioEmpresaGet,
    solicitudPendientesUsuarioProveedorGet,
    cancelarPendientesUsuarioEmpresaPut,
    cancelarPendientesUsuarioProveedorPut,
    solicitudPendientesXEmpresaGet,
    solicitudPendientesXProveedorGet,
    solicitudXNombreUsuarioGet,
    aprobarPendientesUsuarioEmpresaPut,
    aprobarPendientesUsuarioProveedorPut,
    rechazarPendientesUsuarioEmpresaPut,
    rechazarPendientesUsuarioProveedorPut,
    solicitudXNombreUsuarioProvGet
}