const { Router } = require('express');
const { empresasGet, empresaGet, empresaPost, empresaPut, empresaDelete } = require('../controllers/empresaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idEmpleadoValidacion, cuitUpdateValidacion, direccionValidacion, tipoEmpresaValidacion, cuitValidacion, idEmpresaValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const routerEmpresas = Router();

routerEmpresas.post('/all', [
    check('tipoempresa').notEmpty().withMessage('El tipo de empresa es obligatorio').custom( tipoEmpresaValidacion ),
    validarCampos
    ],
    empresasGet )

routerEmpresas.get('/:id', [
    check('id').notEmpty().withMessage('El id de empleado es obligatorio').custom( idEmpleadoValidacion ),
    validarCampos
    ],
    empresaGet)

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

routerEmpresas.put('/:id', [
    validatJWT,
    esRRHHRol,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').isLength({min:11, max:11}).custom( cuitUpdateValidacion ),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    validarCampos
    ],
    empresaPut)

routerEmpresas.put('/delete/:id',[
    validatJWT,
    esRRHHRol,
    check('id').notEmpty().withMessage('El id de empresa es obligatorio').custom( idEmpresaValidacion ),
    validarCampos
    ],
    empresaDelete)

module.exports = routerEmpresas;