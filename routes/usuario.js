const { Router } = require('express');
const { usuariosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuarioController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailValidacion, emailUpdateValidacion, empresaValidacion, rolValidacion, estadoValidacion, idUsuarioValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet )

router.get('/:id', [
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    validarCampos
    ],
    usuarioGet)

router.post('/', [
    check('email').isEmail().withMessage('El email no es valido').custom( emailValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('idempresa').notEmpty().withMessage('El idempresa es obligatorio').custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').isLength({min:8, max:8}),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('idrol').notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    check('estado').notEmpty().withMessage('El estado es obligatorio').custom( estadoValidacion ),
    validarCampos
    ],
    usuarioPost)

router.put('/:id', [
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    check('email').isEmail().withMessage('El email no es valido').custom( emailUpdateValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('idempresa').notEmpty().withMessage('El idempresa es obligatorio').custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').isLength({min:8, max:8}),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('idrol').notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    validarCampos
    ],
    usuarioPut)

router.put('/delete/:id',[
    validatJWT,
    esRRHHRol,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    validarCampos
    ],
    usuarioDelete)

module.exports = router;