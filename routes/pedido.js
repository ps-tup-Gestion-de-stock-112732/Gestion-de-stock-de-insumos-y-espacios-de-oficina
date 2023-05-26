const { Router } = require('express');
const { pedidoPost } = require('../controllers/pedidosController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idEmpleadoValidacionBody, empresaValidacion, idProveedorValidacionBody, codigoValidacionSiBody, cantidadProductoValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerPedido = Router();

routerPedido.post('/', [
    validatJWT,
    check('idempleado', 'El empleado es obligatorio').notEmpty().custom( idEmpleadoValidacionBody ),
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( empresaValidacion ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    check('codigo', 'El codigo es obligatorio').notEmpty().custom( codigoValidacionSiBody ),
    check('cantidad', 'La cantidad es obligatoria').notEmpty().custom( cantidadProductoValidacion ),
    check('precioUnitario', 'El precio es obligatorio').notEmpty(),
    validarCampos
    ],
    pedidoPost)

module.exports = routerPedido;