const { response } = require("express")

const esRRHHRol = (req, res= response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero' 
        })
    }

    const {idrol, nombre, apellido } = req.usuario

    if (idrol !== 1) {
        return res.status(401).json({
            msg: `El usuario ${nombre} ${apellido} no posse el rol para realizar esta accion`
        })
    }
    
    next()
}

const esProveedorRol = (req, res= response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero' 
        })
    }

    const {idrol, nombre, apellido } = req.usuario

    if (idrol !== 4) {
        return res.status(401).json({
            msg: `El usuario ${nombre} ${apellido} no posse el rol para realizar esta accion`
        })
    }
    
    next()
}

module.exports = {
    esRRHHRol,
    esProveedorRol
}