const { Router } = require('express');
const { proveedorPost, proveedorPut, proveedorDelete, proveedoresGet, proveedorXNombreGet, proveedorDesvincular } = require('../controllers/proveedorController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { direccionValidacion, cuitValidacion, cuitUpdateValidacion, idProveedorValidacion, tipoEmpresaValidacion, idAdminValidacion, idUsuarioValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esProveedorRol } = require('../middlewares/validar-roles');

const routerProveedores = Router();

routerProveedores.post('/all', [
    check('tipoempresa').notEmpty().withMessage('El tipo de empresa es obligatorio').custom( tipoEmpresaValidacion ),
    validarCampos
    ],
    proveedoresGet )

routerProveedores.post('/nombre', [
    check('nombre').notEmpty().withMessage('El nombre de empresa es obligatorio'),
    check('tipoempresa').notEmpty().withMessage('El tipo de empresa es obligatorio').custom( tipoEmpresaValidacion ),
    validarCampos
    ],
    proveedorXNombreGet)

routerProveedores.post('/', [
    validatJWT,
    esProveedorRol,
    check('nombre', 'El nombre es obligatorio').notEmpty().custom( cuitValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').isLength({min:11, max:11}),
    check('iddireccion').notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    check('idadmin').notEmpty().withMessage('El usuario administrador es obligatorio').custom( idAdminValidacion ),
    validarCampos
    ],
    proveedorPost)

routerProveedores.patch('/:id', [
    validatJWT,
    esProveedorRol,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').optional().isLength({min:7}),
    check('cuit', 'El cuit debe contener 11 caracteres').optional().isLength({min:11, max:11}).custom( cuitUpdateValidacion ),
    check('iddireccion').optional().notEmpty().withMessage('La direccion es obligatoria').custom( direccionValidacion ),
    check('idadmin').notEmpty().withMessage('El usuario administrador es obligatorio').custom( idAdminValidacion ),
    validarCampos
    ],
    proveedorPut)

routerProveedores.put('/delete/:id',[
    validatJWT,
    esProveedorRol,
    check('id').notEmpty().withMessage('El id de proveedor es obligatorio').custom( idProveedorValidacion ),
    validarCampos
    ],
    proveedorDelete)

routerProveedores.put('/desvincular/:id',[
    validatJWT,
    esProveedorRol,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    validarCampos
    ],
    proveedorDesvincular)

module.exports = routerProveedores;