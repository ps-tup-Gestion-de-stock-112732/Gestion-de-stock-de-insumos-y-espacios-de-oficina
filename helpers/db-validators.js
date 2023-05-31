const { pool } =require('../db.js')

const emailValidacion = (value, {req} )=> {
    
    return new Promise((resolve, reject) => {

        pool.query('SELECT idusuario FROM usuario WHERE email = ?', [req.body.email], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0) 
                reject(new Error('El email ingresado ya se encuentra registrado'))
            
            resolve(true)
        })
    })
}

const documentoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT idusuario FROM usuario WHERE nro_documento = ?', [req.body.nro_documento], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0) 
                reject(new Error('El numero de documento ingresado ya se encuentra registrado'))
            
            resolve(true)
        })
    })
}

const cuitValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        const {cuit} = req.body
        pool.query('SELECT cuit FROM empresa WHERE cuit = ?', [cuit], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0) 
                reject(new Error(`La empresa ya se encuentra registrada - cuit: ${cuit}`))
            
            resolve(true)
        })
    })
}

const emailUpdateValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE email = ? AND idusuario != ?', [req.body.email, req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0) 
                reject(new Error('El email ingresado ya se encuentra registrado'))
            
            resolve(true)
        })
    })
}

const documentoUpdateValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE nro_documento = ? AND idusuario != ?', [req.body.nro_documento, req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0)
                reject(new Error('El número de documento ingresado ya se encuentra registrado'))
            
            resolve(true)
        })
    })
}

const cuitUpdateValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE cuit = ? AND idempresa != ?', [req.body.cuit, req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length > 0) 
                reject(new Error('El cuit ingresado ya se encuentra registrado'))
            
            resolve(true)
        })
    })
}

const empresaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE idempresa = ?', [req.body.idempresa], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El idempresa ingresado no existe'))
            
            resolve(true)
        })
    })
}

const rolValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM rol WHERE idrol = ?', [req.body.idrol], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El idrol ingresado no existe'))
            
            resolve(true)
        })
    })
}

const esAdminValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM estadousuario WHERE idestadoUsuario = ?', [req.body.esAdmin], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El indicador esAdmin ingresado no existe'))
            
            resolve(true)
        })
    })
}

const estadoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM estadousuario WHERE idestadoUsuario = ?', [req.body.estado], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El estado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idUsuarioValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El usuario ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idUsuarioValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.body.idusuario], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El usuario ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idUsuarioSolicitanteValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.body.idsolicitante], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El usuario ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idAdminValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.body.idadmin], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El usuario ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idRolValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM rol WHERE idrol = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El rol ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idDireccionValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM direccion WHERE iddireccion = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La direccion ingresada no existe'))
            
            resolve(true)
        })
    })
}

const idEmpleadoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ? AND idrol = 5', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El empleado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idEmpleadoValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ? AND idrol = 5', [req.body.idempleado], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El empleado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idAutorizanteValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ? AND (idrol = 2 OR idrol = 3 OR idrol = 4)', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El usuario ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idAutorizanteValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE idusuario = ? AND (idrol = 2 OR idrol = 3 OR idrol = 4)', [req.body.idautorizante], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El autorizante ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idAreaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM area WHERE idarea = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El autorizante ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idEmpresaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE idempresa = ? AND tipoempresa = 1', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La empresa ingresada no existe'))
            
            resolve(true)
        })
    })
}

const idEstadoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM estadoautorizacion WHERE idestado = ? ', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El estado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idEstadoGestionValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM estadoautorizaciongestion WHERE idestado = ? ', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El estado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idEstadoGestionValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM estadoautorizaciongestion WHERE idestado = ? ', [req.body.estado], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (req.body.estado == 0) {
                resolve(true)
            }

            if (res.length == 0) 
                reject(new Error('El estado ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idSolicitudValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autorizacionempresa WHERE idautorizacion = ? AND idestado = 1', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La solicitud ingresada no existe o no se encuentra en estado pendiente'))
            
            resolve(true)
        })
    })
}

const idSolicitudGestionValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autorizaciongestion WHERE idautorizacion = ?', [req.params.idautorizacion], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La solicitud ingresada no existe o no se encuentra en estado pendiente'))
            
            resolve(true)
        })
    })
}

const idSolicitudUsuarioEmpresaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autorizacionusuarioemp WHERE idautorizacion = ? AND idestado = 1', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La solicitud ingresada no existe o no se encuentra en estado pendiente'))
            
            resolve(true)
        })
    })
}

const idSolicitudUsuarioProveedorValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autorizacionusuarioprov WHERE idautorizacion = ? AND idestado = 1', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La solicitud ingresada no existe o no se encuentra en estado pendiente'))
            
            resolve(true)
        })
    })
}


const idSolicitudValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM autorizacionempresa WHERE idautorizacion = ? ', [req.body.idautorizacion], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La solicitud ingresada no existe'))
            
            resolve(true)
        })
    })
}

const idEmpresaValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE idempresa = ? AND tipoempresa = 1', [req.body.idempresa], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La empresa ingresada no existe'))
            
            resolve(true)
        })
    })
}

const idContratoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contrato WHERE id = ? and fechaFin IS NULL', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El contrato ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idPedidoValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pedido WHERE idpedido = ?', [req.body.idpedido], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El contrato ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idProveedorValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE idempresa = ? AND tipoempresa = 2', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El proveedor ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idProveedorValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM empresa WHERE idempresa = ? AND tipoempresa = 2', [req.body.idProveedor], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El proveedor ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idCategoriaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM categoria WHERE idcategoria = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La categoria ingresada no existe'))
            
            resolve(true)
        })
    })
}

const idCategoriaValidacionBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM categoria WHERE idcategoria = ?', [req.body.idcategoria], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La categoria ingresada no existe'))
            
            resolve(true)
        })
    })
}

const codigoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM producto WHERE codigo = ?', [req.body.codigo], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length != 0) 
                reject(new Error('El codigo de producto ingresado ya existe'))
            
            resolve(true)
        })
    })
}

const cantidadProductoValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM producto WHERE codigo = ? AND cantidad >= 1', [req.body.codigo, req.body.cantidad], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La cantidad ingresada excede el stock del prodcuto'))
            
            resolve(true)
        })
    })
}

const cantidadProductoValidacionCodigoParams = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM producto WHERE codigo = ? AND cantidad >= 1', [req.params.id, req.body.cantidad], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La cantidad ingresada excede el stock del prodcuto'))
            
            resolve(true)
        })
    })
}

const codigoValidacionSiBody = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM producto WHERE codigo = ?', [req.body.codigo], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El codigo de producto ingresado no existe'))
            
            resolve(true)
        })
    })
}

const codigoValidacionSiParams = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM producto WHERE codigo = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El codigo de producto ingresado no existe'))
            
            resolve(true)
        })
    })
}

const idBarrioValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM barrio WHERE idbarrio = ?', [req.body.idbarrio], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El barrio ingresado no existe'))
            
            resolve(true)
        })
    })
}

const areaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM area WHERE idarea = ?', [req.body.idarea], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El area ingresada no existe'))
            
            resolve(true)
        })
    })
}

const direccionValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM direccion WHERE iddireccion = ?', [req.body.iddireccion], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('La direccion ingresada no existe'))
            
            resolve(true)
        })
    })
}

const tipoEmpresaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tipoempresa WHERE idtipoempresa = ?', [req.body.tipoempresa], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El tipo de empresa ingresada no existe'))
            
            resolve(true)
        })
    })
}

module.exports = {
    emailValidacion,
    emailUpdateValidacion,
    cuitValidacion,
    cuitUpdateValidacion,
    empresaValidacion,
    rolValidacion,
    estadoValidacion,
    idUsuarioValidacion,
    areaValidacion,
    direccionValidacion,
    idEmpleadoValidacion,
    idEmpresaValidacion,
    idProveedorValidacion,
    idBarrioValidacion,
    tipoEmpresaValidacion,
    documentoValidacion,
    documentoUpdateValidacion,
    esAdminValidacion,
    idDireccionValidacion,
    idRolValidacion,
    idAreaValidacion,
    idAdminValidacion,
    codigoValidacion,
    codigoValidacionSiParams,
    codigoValidacionSiBody,
    idProveedorValidacionBody,
    idEmpresaValidacionBody,
    idSolicitudValidacion,
    idEstadoValidacion,
    idUsuarioSolicitanteValidacionBody,
    idAutorizanteValidacion,
    idSolicitudValidacionBody,
    idAutorizanteValidacionBody,
    idContratoValidacion,
    idUsuarioValidacionBody,
    idSolicitudUsuarioEmpresaValidacion,
    idSolicitudUsuarioProveedorValidacion,
    idCategoriaValidacionBody,
    idCategoriaValidacion,
    idEmpleadoValidacionBody,
    cantidadProductoValidacion,
    idPedidoValidacionBody,
    cantidadProductoValidacionCodigoParams,
    idSolicitudGestionValidacion,
    idEstadoGestionValidacionBody,
    idEstadoGestionValidacion
}