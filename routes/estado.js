const { Router } = require('express');
const { estadoGet } = require('../controllers/estadoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idEstadoValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerEstado = Router();

routerEstado.get('/:id', [
    validatJWT,
    check('id', 'El identificador de estado es obligatorio').notEmpty().custom( idEstadoValidacion ),
    validarCampos
    ],
    estadoGet)

module.exports = routerEstado;