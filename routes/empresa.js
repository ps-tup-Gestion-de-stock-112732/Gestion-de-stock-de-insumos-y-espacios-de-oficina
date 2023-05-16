const { Router } = require('express');
const { empresasGet, empresaGet, empresaXUsuarioGet, empresaPost, empresaPut, empresaDelete, empresaXNombreGet } = require('../controllers/empresaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idUsuarioValidacion, cuitUpdateValidacion, direccionValidacion, tipoEmpresaValidacion, cuitValidacion, idEmpresaValidacion, idAdminValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const routerEmpresas = Router();

routerEmpresas.post('/all', [
    check('tipoempresa').notEmpty().withMessage('El tipo de empresa es obligatorio').custom( tipoEmpresaValidacion ),
    validarCampos
    ],
    empresasGet )

routerEmpresas.get('/:id', empresaGet)

routerEmpresas.post('/usuario', [
    check('idusuario').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    validarCampos
    ],
    empresaXUsuarioGet)

routerEmpresas.post('/nombre', [
    check('nombre').notEmpty().withMessage('El nombre de empresa es obligatorio'),
    check('tipoempresa').notEmpty().withMessage('El tipo de empresa es obligatorio').custom( tipoEmpresaValidacion ),
    validarCampos
    ],
    empresaXNombreGet)

routerEmpresas.post('/', [
    validatJWT,
    esRRHHRol,
    check('nombre', 'El nombre es obligatorio').notEmpty().custom( cuitValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').notEmpty().isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').notEmpty().isLength({min:11, max:11}),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    check('idadmin').notEmpty().withMessage('El usuario administrador es obligatorio').custom( idAdminValidacion ),
    validarCampos
    ],
    empresaPost)

routerEmpresas.patch('/:id', [
    validatJWT,
    esRRHHRol,
    check('id').notEmpty().withMessage('El id de empresa es obligatorio').custom( idEmpresaValidacion ),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').optional().notEmpty().isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').optional().notEmpty().isLength({min:11, max:11}).custom( cuitUpdateValidacion ),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    check('idadmin').notEmpty().withMessage('El usuario administrador es obligatorio').custom( idAdminValidacion ),
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