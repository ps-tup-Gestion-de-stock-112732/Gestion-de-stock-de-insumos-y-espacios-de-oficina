const { Router } = require('express');
const { contratosGet, proveedorXNombreGet, contratoPost, contratoDelete, contratosProveedorGet, empresaXNombreGet } = require('../controllers/contratosController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idEmpresaValidacion, empresaValidacion, idEmpresaValidacionBody, idProveedorValidacionBody, idSolicitudValidacionBody, idContratoValidacion, idProveedorValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerContrato = Router();

routerContrato.get('/all/:id', [
    validatJWT,
    check('id', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacion ),
    validarCampos
    ],
    contratosGet)

routerContrato.get('/allxprov/:id', [
    validatJWT,
    check('id', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacion ),
    validarCampos
    ],
    contratosProveedorGet)

routerContrato.post('/nombre', [
    check('nombre').notEmpty().withMessage('El nombre del proveedor es obligatorio'),
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    proveedorXNombreGet)

routerContrato.post('/nombre/empresa', [
    check('nombre').notEmpty().withMessage('El nombre del proveedor es obligatorio'),
    check('idProveedor').notEmpty().withMessage('El id de proveedor es obligatorio').custom( idProveedorValidacionBody ),
    validarCampos
    ],
    empresaXNombreGet)


routerContrato.post('/', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacionBody ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudValidacionBody ),
    validarCampos
    ],
    contratoPost)

routerContrato.put('/baja/:id', [
    validatJWT,
    check('id', 'El identificador de contrato es obligatorio').notEmpty().custom( idContratoValidacion ),
    validarCampos
    ],
    contratoDelete)

module.exports = routerContrato;