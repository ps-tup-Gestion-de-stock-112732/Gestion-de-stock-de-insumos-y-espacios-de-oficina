const { Router } = require('express');
const { empleadosGet, empleadoGet, empleadoPost, empleadoPut, empleadoDelete } = require('../controllers/empleadoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailValidacion, emailUpdateValidacion, empresaValidacion, rolValidacion, estadoValidacion, idEmpleadoValidacion, areaValidacion, direccionValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const routerEmpleados = Router();

routerEmpleados.get('/', empleadosGet )

routerEmpleados.get('/:id', [
    check('id').notEmpty().withMessage('El id de empleado es obligatorio').custom( idEmpleadoValidacion ),
    validarCampos
    ],
    empleadoGet)

routerEmpleados.post('/', [
    check('email').isEmail().withMessage('El email no es valido').custom( emailValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('idempresa').notEmpty().withMessage('El idempresa es obligatorio').custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').isLength({min:8, max:8}),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('estado').notEmpty().withMessage('El estado es obligatorio').custom( estadoValidacion ),
    check('idarea').notEmpty().withMessage('El area es obligatoria').custom( areaValidacion ),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    validarCampos
    ],
    empleadoPost)

module.exports = routerEmpleados;