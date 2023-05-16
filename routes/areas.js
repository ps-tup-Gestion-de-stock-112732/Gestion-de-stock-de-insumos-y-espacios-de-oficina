const { Router } = require('express');
const { areasGet, areaGet, areaPost, areaDelete, areaNombrePost } = require('../controllers/areasController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idAreaValidacion, idEmpresaValidacion, empresaValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerAreas = Router();

routerAreas.get('/all/:id', [
    check('id').notEmpty().withMessage('El id de empresa es obligatorio').custom( idEmpresaValidacion ),
    validarCampos
    ],
    areasGet )

routerAreas.get('/:id', [
    check('id').notEmpty().withMessage('El id de area es obligatorio').custom( idAreaValidacion ),
    validarCampos
    ],
    areaGet )

routerAreas.post('/nombre', [
    validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('idempresa').notEmpty().withMessage('El idempresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    areaNombrePost)

routerAreas.post('/', [
    validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('idempresa').notEmpty().withMessage('El idempresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    areaPost)

routerAreas.put('/delete/:id',[
    validatJWT,
    check('id').notEmpty().withMessage('El id de area es obligatorio').custom( idAreaValidacion ),
    validarCampos
    ],
    areaDelete)

module.exports = routerAreas;