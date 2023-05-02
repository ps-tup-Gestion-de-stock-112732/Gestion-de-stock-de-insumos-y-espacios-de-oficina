const { Router } = require('express');
const { proveedorPost, proveedorPut } = require('../controllers/proveedorController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { direccionValidacion, cuitValidacion, cuitUpdateValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esProveedorRol } = require('../middlewares/validar-roles');

const routerProveedores = Router();

routerProveedores.post('/', [
    validatJWT,
    esProveedorRol,
    check('nombre', 'El nombre es obligatorio').notEmpty().custom( cuitValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').isLength({min:11, max:11}),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    validarCampos
    ],
    proveedorPost)

routerProveedores.put('/:id', [
    validatJWT,
    esProveedorRol,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').isLength({min:11, max:11}).custom( cuitUpdateValidacion ),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    validarCampos
    ],
    proveedorPut)

module.exports = routerProveedores;