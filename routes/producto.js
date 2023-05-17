const { Router } = require('express');
const { productoPost } = require('../controllers/productoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { codigoValidacion, idProveedorValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esProveedorRol } = require('../middlewares/validar-roles');

const routerProducto = Router();

routerProducto.post('/', [
    validatJWT,
    esProveedorRol,
    check('codigo','El codigo es obligatorio').notEmpty().custom( codigoValidacion ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacion ),
    check('nombreProducto', 'El nombre del producto es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion del producto es obligatorio').notEmpty(),
    check('precioUnitario', 'El precio del producto es obligatorio').notEmpty(),
    check('cantidad', 'La cantidad del producto es obligatoria').notEmpty(),
    validarCampos
    ],
    productoPost)

module.exports = routerProducto;