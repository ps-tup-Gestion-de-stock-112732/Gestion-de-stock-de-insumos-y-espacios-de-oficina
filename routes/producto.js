const { Router } = require('express');
const { productoPost, productosGet, productoXNombreGet, productoDelete, productoPut, productoGet, productoCantidadPut } = require('../controllers/productoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { codigoValidacion, idProveedorValidacionBody, empresaValidacion, codigoValidacionSiParams, idCategoriaValidacionBody, cantidadProductoValidacionCodigoParams } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esProveedorRol } = require('../middlewares/validar-roles');

const routerProducto = Router();

routerProducto.post('/all', [
    validatJWT,
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    productosGet )

routerProducto.get('/:id', [
    validatJWT,
    check('id','El codigo es obligatorio').notEmpty().custom( codigoValidacionSiParams ),
    validarCampos
    ],
    productoGet)

routerProducto.post('/nombre', [
    validatJWT,
    check('nombreProducto').notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    productoXNombreGet)

routerProducto.post('/', [
    validatJWT,
    esProveedorRol,
    check('codigo','El codigo es obligatorio').notEmpty().custom( codigoValidacion ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    check('nombreProducto', 'El nombre del producto es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion del producto es obligatorio').notEmpty(),
    check('precioUnitario', 'El precio del producto es obligatorio').notEmpty(),
    check('cantidad', 'La cantidad del producto es obligatoria').notEmpty(),
    check('imagen', 'La imagen del producto es obligatoria').notEmpty(),
    check('idcategoria', 'La categoría del producto es obligatoria').notEmpty().custom( idCategoriaValidacionBody ),
    validarCampos
    ],
    productoPost)

routerProducto.patch('/:id', [
    validatJWT,
    check('idProveedor', 'El proveedor es obligatorio').optional().notEmpty().custom( idProveedorValidacionBody ),
    check('nombreProducto', 'El nombre del producto es obligatorio').optional().notEmpty(),
    check('descripcion', 'La descripcion del producto es obligatorio').optional().notEmpty(),
    check('precioUnitario', 'El precio del producto es obligatorio').optional().notEmpty(),
    check('cantidad', 'La cantidad del producto es obligatoria').optional().notEmpty(),
    check('imagen', 'La imagen del producto es obligatoria').optional({nullable: true}),
    check('idcategoria', 'La categoría del producto es obligatoria').optional().notEmpty().custom( idCategoriaValidacionBody ),
    validarCampos
    ],
    productoPut)

routerProducto.put('/cantidad/:id',[
    validatJWT,
    check('id').notEmpty().withMessage('El codigo de producto es obligatorio').custom( codigoValidacionSiParams ),
    check('cantidad', 'La cantidad es obligatoria').notEmpty().custom( cantidadProductoValidacionCodigoParams ),
    validarCampos
    ],
    productoCantidadPut)

routerProducto.put('/delete/:id',[
    validatJWT,
    esProveedorRol,
    check('id').notEmpty().withMessage('El codigo de producto es obligatorio').custom( codigoValidacionSiParams ),
    validarCampos
    ],
    productoDelete)

module.exports = routerProducto;