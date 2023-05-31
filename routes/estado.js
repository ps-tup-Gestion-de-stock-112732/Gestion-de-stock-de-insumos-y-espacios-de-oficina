const { Router } = require('express');
const { estadoGet, estadosGestionGet, estadogestionGet } = require('../controllers/estadoController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idEstadoValidacion, idEstadoGestionValidacion } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerEstado = Router();

routerEstado.get('/:id', [
    validatJWT,
    check('id', 'El identificador de estado es obligatorio').notEmpty().custom( idEstadoValidacion ),
    validarCampos
    ],
    estadoGet)

routerEstado.get('/gestion/:id', [
    validatJWT,
    check('id', 'El identificador de estado es obligatorio').notEmpty().custom( idEstadoGestionValidacion ),
    validarCampos
    ],
    estadogestionGet)

routerEstado.get('/gestion/it/all', [
    validatJWT
    ],
    estadosGestionGet)
    

module.exports = routerEstado;