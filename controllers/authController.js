const { response } = require("express");
const { pool } =require('../db.js')
const bcryptjs = require('bcryptjs');
const { generatJWT } = require("../helpers/generarJWT.js");

const login = async (req, res = response) =>{

    const { email, password} = req.body

    try {
        //Verificar email
        const [result] = await pool.promise().query('SELECT * FROM usuario WHERE email = ?', [email])

        if (result.length <= 0) return res.status(404).json({
            message: 'Usuario/Password incorrecta - Usuario no encontrado'
        })

        //Verificar usuario activo
        if (result[0].estado != 1) return res.status(404).json({
            message: 'Usuario/Password incorrecta - Usuario inactivo'
        })

        //Verificar password
        const validPassword = bcryptjs.compareSync(password, result[0].password)
        if (!validPassword) return res.status(404).json({
            message: 'Usuario/Password incorrecta - Password incorrecta'
        })

        //Generar JWT
        const token = await generatJWT(result[0].idusuario)
        res.json({
            result,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Algo salio mal en el login"
        })
    }

}

module.exports = {
    login
}