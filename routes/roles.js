const { Router } = require('express');
const { rolesGet, rolGet } = require('../controllers/roleController');
const { idRolValidacion } = require('../helpers/db-validators');
const { check } = require('express-validator');
const { validatJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const routerRoles = Router();

routerRoles.get('/', rolesGet )

routerRoles.post('/:id', [
    validatJWT,
    check('id').notEmpty().withMessage('El id del rol es obligatorio').custom( idRolValidacion ),
    validarCampos
    ],
    rolGet)

module.exports = routerRoles;