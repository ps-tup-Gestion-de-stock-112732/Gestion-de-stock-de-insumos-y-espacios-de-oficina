const { Router } = require('express');
const { categoriaUsadaGet, categoriaGet, categoriasGet, categoriaPost, categoriaDelete } = require('../controllers/categoriaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idProveedorValidacion, idCategoriaValidacion, idProveedorValidacionBody } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerCategoria = Router();

routerCategoria.get('/all/:id', [
    check('id').notEmpty().withMessage('El id de empresa es obligatorio').custom( idProveedorValidacion ),
    validarCampos
    ],
    categoriasGet )

routerCategoria.get('/:id', [
    validatJWT,
    check('id','El identificador de categoria es obligatorio').notEmpty().custom( idCategoriaValidacion ),
    validarCampos
    ],
    categoriaGet)

routerCategoria.post('/', [
    validatJWT,
    check('descripcion', 'El nombre es obligatorio').notEmpty(),
    check('idProveedor').notEmpty().withMessage('El idempresa es obligatorio').custom( idProveedorValidacionBody ),
    validarCampos
    ],
    categoriaPost)
    
routerCategoria.put('/delete/:id',[
    validatJWT,
    check('id').notEmpty().withMessage('El id de la categoria es obligatorio').custom( idCategoriaValidacion ),
    validarCampos
    ],
    categoriaDelete)

routerCategoria.post('/usada', [
    validatJWT,
    ],
    categoriaUsadaGet)

module.exports = routerCategoria;