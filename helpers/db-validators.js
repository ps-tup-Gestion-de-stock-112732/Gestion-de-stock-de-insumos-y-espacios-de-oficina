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

const idAreaValidacion = (value, {req} )=> {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM area WHERE idarea = ?', [req.params.id], (err, res)=>{
            if (err) 
                reject(new Error('Server error'))

            if (res.length == 0) 
                reject(new Error('El empleado ingresado no existe'))
            
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
    codigoValidacion
}