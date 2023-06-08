const { Router } = require('express');
const { oficinaGet, oficinasGet, oficinaPost, oficinaPut, oficinaDelete, oficinaEspaciosGet, oficinaEspacioPost, oficinaEspaciosEmpleadoGet, oficinaEspacioCancelarPut } = require('../controllers/oficinaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idOficinaValidacion, idEspacioValidacion, idEstadoGestionValidacion, idEmpresaValidacionBody, nombreOficinaValidacion, nombreOficinaValidacionUpdate, idOficinaValidacionBody, idEmpleadoValidacionBody } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerOficina = Router();

routerOficina.get('/:id', [
    validatJWT,
    check('id', 'El identificador de oficina es obligatorio').notEmpty().custom( idOficinaValidacion ),
    validarCampos
    ],
    oficinaGet)

routerOficina.post('/all', [
    validatJWT,
    check('idempresa', 'El identificador de empresa es obligatorio').notEmpty().custom( idEmpresaValidacionBody ),
    validarCampos
    ],
    oficinasGet)

routerOficina.post('/', [
    validatJWT,
    check('nombreoficina', 'El nombre de oficina es obligatorio').notEmpty().custom( nombreOficinaValidacion ),
    check('idempresa', 'El identificador de empresa es obligatorio').notEmpty().custom( idEmpresaValidacionBody ),
    check('cantidadfilas', 'La cantidad de filas debe ser mayor a 1 y menor a 11').isInt({ min:2, max:10 }),
    check('cantidadcolumnas', 'La cantidad de columnas debe ser mayor a 1 y menor a 11').isInt({ min:2, max:10 }),
    validarCampos
    ],
    oficinaPost)

routerOficina.put('/actualizar/:id', [
    validatJWT,
    check('id', 'El identificador de oficina es obligatorio').notEmpty().custom( idOficinaValidacion ),
    check('idempresa', 'El identificador de empresa es obligatorio').notEmpty().custom( idEmpresaValidacionBody ),
    check('nombreoficina', 'El nombre de oficina es obligatorio').notEmpty().custom( nombreOficinaValidacionUpdate ),
    check('cantidadfilas', 'La cantidad de filas debe ser mayor a 1 y menor a 11').isInt({ min:2, max:10 }),
    check('cantidadcolumnas', 'La cantidad de columnas debe ser mayor a 1 y menor a 11').isInt({ min:2, max:10 }),
    validarCampos
    ],
    oficinaPut)

routerOficina.put('/eliminar/:id', [
    validatJWT,
    check('id', 'El identificador de oficina es obligatorio').notEmpty().custom( idOficinaValidacion ),
    validarCampos
    ],
    oficinaDelete)

routerOficina.post('/espacios/:id', [
    validatJWT,
    check('id', 'El identificador de oficina es obligatorio').notEmpty().custom( idOficinaValidacion ),
    validarCampos
    ],
    oficinaEspaciosGet)

routerOficina.get('/espacios/empleado/:id', [
    validatJWT,
    check('id', 'El empleado es obligatorio').notEmpty().custom( idEstadoGestionValidacion ),
    validarCampos
    ],
    oficinaEspaciosEmpleadoGet)

routerOficina.post('/espacio/reserva', [
    validatJWT,
    check('idoficina', 'El identificador de oficina es obligatorio').notEmpty().custom( idOficinaValidacionBody ),
    check('idempleado', 'El empleado es obligatorio').notEmpty().custom( idEmpleadoValidacionBody ),
    validarCampos
    ],
    oficinaEspacioPost)

routerOficina.put('/espacio/cancelar/:id', [
    validatJWT,
    check('id', 'El identificador de espacio es obligatorio').notEmpty().custom( idEspacioValidacion ),
    validarCampos
    ],
    oficinaEspacioCancelarPut)

module.exports = routerOficina;