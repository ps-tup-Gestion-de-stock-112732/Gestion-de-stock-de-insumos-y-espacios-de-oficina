const { Router } = require('express');
const { autorizantesGet, autorizanteXNombreGet, autorizanteDelete, autorizantePost, autorizanteGet, autorizantePut } = require('../controllers/autorizantesController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { empresaValidacion, idAutorizanteValidacion, emailValidacion, documentoValidacion, rolValidacion, idUsuarioValidacion, emailUpdateValidacion, documentoUpdateValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerAutorizante = Router();

routerAutorizante.post('/all', [
    validatJWT,
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    autorizantesGet )

routerAutorizante.get('/:id', [
    validatJWT,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idAutorizanteValidacion ),
    validarCampos
    ],
    autorizanteGet)

routerAutorizante.post('/nombre', [
    validatJWT,
    check('nombre').notEmpty().withMessage('El nombre del usuario es obligatorio'),
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( empresaValidacion ),
    validarCampos
    ],
    autorizanteXNombreGet)

routerAutorizante.post('/', [
    validatJWT,
    check('email').isEmail().withMessage('El email no es valido').custom( emailValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('idempresa').optional().custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').isLength({min:8, max:8}).custom( documentoValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('idrol').notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    validarCampos
    ],
    autorizantePost)

routerAutorizante.patch('/:id', [
    validatJWT,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    check('email').optional().isEmail().withMessage('El email no es valido').custom( emailUpdateValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').optional({nullable: true}).isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    check('apellido', 'El apellido es obligatorio').optional().notEmpty(),
    check('idempresa').optional().custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').optional().isLength({min:8, max:8}).custom( documentoUpdateValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').optional().isLength({min:7}),
    check('idrol').optional().notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    validarCampos
    ],
    autorizantePut)

routerAutorizante.put('/delete/:id',[
    validatJWT,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idAutorizanteValidacion ),
    validarCampos
    ],
    autorizanteDelete)

module.exports = routerAutorizante;