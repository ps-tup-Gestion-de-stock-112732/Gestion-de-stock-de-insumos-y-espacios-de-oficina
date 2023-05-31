const { Router } = require('express');
const { solicitudGestionPost, solicitudesGet, solicitudesFiltroGet, solicitudGet, rechazarSolicitudPut, aprobarSolicitudPut, solicitudesXEmpleadoGet, aprobarSolicitudVentasPut } = require('../controllers/solicitud-gestionController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idPedidoValidacionBody, empresaValidacion, idEmpleadoValidacion, idSolicitudGestionValidacion, idAutorizanteValidacionBody } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerSolicitudGestion = Router();

routerSolicitudGestion.post('/', [
    validatJWT,
    check('idpedido', 'El pedido es obligatorio').notEmpty().custom( idPedidoValidacionBody ),
    validarCampos
    ],
    solicitudGestionPost)

routerSolicitudGestion.get('/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    validarCampos
    ],
    solicitudGet)

routerSolicitudGestion.post('/all', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( empresaValidacion ),
    validarCampos
    ],
    solicitudesGet)

routerSolicitudGestion.post('/filtro', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( empresaValidacion ),
    validarCampos
    ],
    solicitudesFiltroGet)

routerSolicitudGestion.get('/empleado/:id', [
    validatJWT,
    check('id', 'El empleado es obligatorio').notEmpty().custom( idEmpleadoValidacion ),
    validarCampos
    ],
    solicitudesXEmpleadoGet)

routerSolicitudGestion.put('/aprobar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    aprobarSolicitudPut)

routerSolicitudGestion.put('/rechazar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    rechazarSolicitudPut)

routerSolicitudGestion.put('/ventas/aprobar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    aprobarSolicitudVentasPut)

module.exports = routerSolicitudGestion;