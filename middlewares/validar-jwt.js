const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { pool } = require('../db')

const validatJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY)
        const [usuario] = await pool.promise().query('SELECT * FROM usuario WHERE idusuario = ?', [uid])

        if(!usuario[0]){

            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        //verificar si el usr esta activo
        if (usuario[0].estado != 1) {
            
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }

        req.usuario = usuario[0]
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

module.exports = {
    validatJWT
}