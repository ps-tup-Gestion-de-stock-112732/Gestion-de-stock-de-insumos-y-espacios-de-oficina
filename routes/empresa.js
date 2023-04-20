const { Router } = require('express');
const { empresaPost} = require('../controllers/empresaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailValidacion, emailUpdateValidacion, empresaValidacion, rolValidacion, estadoValidacion, idEmpleadoValidacion, areaValidacion, direccionValidacion, cuitValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const routerEmpresas = Router();

routerEmpresas.post('/', [
    validatJWT,
    esRRHHRol,
    check('nombre', 'El nombre es obligatorio').notEmpty().custom( cuitValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').isLength({min:11, max:11}),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    validarCampos
    ],
    empresaPost)

module.exports = routerEmpresas;