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

module.exports = {
    emailValidacion,
    emailUpdateValidacion,
    empresaValidacion,
    rolValidacion,
    estadoValidacion,
    idUsuarioValidacion,
    areaValidacion,
    direccionValidacion,
    idEmpleadoValidacion
}