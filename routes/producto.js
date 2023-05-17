const { Router } = require('express');
const { productoPost, productosGet, productoXNombreGet, productoDelete } = require('../controllers/productoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { codigoValidacion, idProveedorValidacion, empresaValidacion, codigoValidacionSi } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esProveedorRol } = require('../middlewares/validar-roles');

const routerProducto = Router();

routerProducto.get('/all', [
    check('idProveedor').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    productosGet )

routerProducto.post('/nombre', [
    check('nombreProducto').notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('idProveedor').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    productoXNombreGet)

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

routerProducto.put('/delete/:id',[
    validatJWT,
    esProveedorRol,
    check('id').notEmpty().withMessage('El codigo de producto es obligatorio').custom( codigoValidacionSi ),
    validarCampos
    ],
    productoDelete)

module.exports = routerProducto;