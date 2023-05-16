const { Router } = require('express');
const { usuariosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioDesvincular } = require('../controllers/usuarioController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailValidacion, emailUpdateValidacion, empresaValidacion, rolValidacion, documentoValidacion, idUsuarioValidacion, documentoUpdateValidacion, esAdminValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');
const { esRRHHRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet )

router.get('/:id', usuarioGet)

router.post('/', [
    check('email').isEmail().withMessage('El email no es valido').custom( emailValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').isLength({min:8, max:8}).custom( documentoValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').isLength({min:7}),
    check('idrol').notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    validarCampos
    ],
    usuarioPost)

router.patch('/:id', [
    validatJWT,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    check('email').optional().isEmail().withMessage('El email no es valido').custom( emailUpdateValidacion ),
    check('password', 'El password debe contener 4 o mas caracteres').optional().isLength({min:4}),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    check('apellido', 'El apellido es obligatorio').optional().notEmpty(),
    check('idempresa').optional().custom( empresaValidacion ),
    check('nro_documento', 'El nro_documento debe contener 8 caracteres').optional().isLength({min:8, max:8}).custom( documentoUpdateValidacion ),
    check('telefono', 'El telefono debe contener 7 o mas caracteres').optional().isLength({min:7}),
    check('idrol').optional().notEmpty().withMessage('El idrol es obligatorio').custom( rolValidacion ),
    check('esAdmin').optional().notEmpty().withMessage('Es obligatorio indicar si es admin o no').custom( esAdminValidacion ),
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

router.put('/desvincular/:id',[
    validatJWT,
    esRRHHRol,
    check('id').notEmpty().withMessage('El id de usuario es obligatorio').custom( idUsuarioValidacion ),
    validarCampos
    ],
    usuarioDesvincular)

module.exports = router;