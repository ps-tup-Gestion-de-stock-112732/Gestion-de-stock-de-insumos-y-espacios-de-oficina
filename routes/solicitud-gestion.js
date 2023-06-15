const { Router } = require('express');
const { solicitudGestionPost, entregarPedidoPut, enviarPedidoPut, rechazarPedidoPut, solicitudesFiltroProveedorGet, solicitudesXProveedorGet, cancelarSolicitudPut, solicitudesFiltroEstadoGet, solicitudesGet, solicitudesFiltroGet, solicitudGet, rechazarSolicitudPut, aprobarSolicitudPut, solicitudesEmpresasProveedorGet, solicitudesXEmpleadoGet, aprobarSolicitudVentasPut } = require('../controllers/solicitud-gestionController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idPedidoValidacionBody, empresaValidacion, idEmpleadoValidacion, idSolicitudGestionValidacion, idAutorizanteValidacionBody, idProveedorValidacionBody } = require('../helpers/db-validators');
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

routerSolicitudGestion.post('/proveedor/all', [
    validatJWT,
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    validarCampos
    ],
    solicitudesXProveedorGet)

routerSolicitudGestion.post('/filtro', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( empresaValidacion ),
    validarCampos
    ],
    solicitudesFiltroGet)

routerSolicitudGestion.post('/proveedor/filtro', [
    validatJWT,
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    validarCampos
    ],
    solicitudesFiltroProveedorGet)


routerSolicitudGestion.get('/proveedor/empresas/:idproveedor', [validatJWT],
    solicitudesEmpresasProveedorGet)
    

routerSolicitudGestion.post('/filtro/estado', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( empresaValidacion ),
    validarCampos
    ],
    solicitudesFiltroEstadoGet)

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

routerSolicitudGestion.put('/cancelar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    validarCampos
    ],
    cancelarSolicitudPut)

routerSolicitudGestion.put('/ventas/aprobar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    aprobarSolicitudVentasPut)


routerSolicitudGestion.put('/pedido/enviar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    enviarPedidoPut)

routerSolicitudGestion.put('/pedido/rechazar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    rechazarPedidoPut)

routerSolicitudGestion.put('/pedido/entregar/:idautorizacion', [
    validatJWT,
    check('idautorizacion', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudGestionValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    entregarPedidoPut)

module.exports = routerSolicitudGestion;