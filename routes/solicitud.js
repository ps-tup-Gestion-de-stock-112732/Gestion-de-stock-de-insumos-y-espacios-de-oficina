const { Router } = require('express');
const { solicitudXNombreUsuarioProvGet, rechazarPendientesUsuarioEmpresaPut, rechazarPendientesUsuarioProveedorPut, aprobarPendientesUsuarioEmpresaPut, aprobarPendientesUsuarioProveedorPut, solicitudPendientesXEmpresaGet, solicitudXNombreUsuarioGet, solicitudPendientesXProveedorGet, cancelarPendientesUsuarioEmpresaPut, cancelarPendientesUsuarioProveedorPut, solicitudPendientesUsuarioEmpresaGet, solicitudPendientesUsuarioProveedorGet, solicitudPost, solicitudPendientesGet, cancelarPendientesPut, solicitudXNombreGet, solicitudPendientesProvGet, aprobarPendientesPut, rechazarPendientesPut, solicitudUsuarioEmpresaPost, solicitudUsuarioProveedorPost } = require('../controllers/solicitudController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idSolicitudUsuarioEmpresaValidacion, idSolicitudUsuarioProveedorValidacion, idProveedorValidacionBody, idUsuarioValidacion, idEmpresaValidacionBody, idEmpresaValidacion, idSolicitudValidacion, idUsuarioSolicitanteValidacionBody, idProveedorValidacion, idAutorizanteValidacionBody, idUsuarioValidacionBody } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerSolicitud = Router();

routerSolicitud.post('/empresa', [
    validatJWT,
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacionBody ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    check('idsolicitante', 'El solicitante es obligatorio').notEmpty().custom( idUsuarioSolicitanteValidacionBody ),
    validarCampos
    ],
    solicitudPost)

routerSolicitud.post('/usuario/empresa', [
    validatJWT,
    check('idusuario', 'El usuario es obligatorio').notEmpty().custom( idUsuarioValidacionBody ),
    check('idempresa', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacionBody ),
    validarCampos
    ],
    solicitudUsuarioEmpresaPost)

routerSolicitud.post('/usuario/proveedor', [
    validatJWT,
    check('idusuario', 'El usuario es obligatorio').notEmpty().custom( idUsuarioValidacionBody ),
    check('idProveedor', 'El proveedor es obligatorio').notEmpty().custom( idProveedorValidacionBody ),
    validarCampos
    ],
    solicitudUsuarioProveedorPost)

routerSolicitud.post('/nombre', [
    check('nombre').notEmpty().withMessage('El nombre del proveedor es obligatorio'),
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( idEmpresaValidacionBody ),
    validarCampos
    ],
    solicitudXNombreGet)

routerSolicitud.post('/usr/nombre', [
    check('nombre').notEmpty().withMessage('El nombre del usuario es obligatorio'),
    check('idempresa').notEmpty().withMessage('El id de empresa es obligatorio').custom( idEmpresaValidacionBody ),
    validarCampos
    ],
    solicitudXNombreUsuarioGet)

routerSolicitud.post('/usr/prov/nombre', [
    check('nombre').notEmpty().withMessage('El nombre del usuario es obligatorio'),
    check('idProveedor').notEmpty().withMessage('El id de empresa es obligatorio').custom( idProveedorValidacionBody ),
    validarCampos
    ],
    solicitudXNombreUsuarioProvGet)

routerSolicitud.get('/pendientes/:id', [
    validatJWT,
    check('id', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacion ),
    validarCampos
    ],
    solicitudPendientesGet)

routerSolicitud.get('/pendientes/proveedores/:id', [
    validatJWT,
    check('id', 'El id de proveedor es obligatorio').notEmpty().custom( idProveedorValidacion ),
    validarCampos
    ],
    solicitudPendientesProvGet)

routerSolicitud.get('/pendientes/usr/empresa/:id', [
    validatJWT,
    check('id', 'La empresa es obligatoria').notEmpty().custom( idEmpresaValidacion ),
    validarCampos
    ],
    solicitudPendientesXEmpresaGet)
    
routerSolicitud.get('/pendientes/usr/proveedor/:id', [
    validatJWT,
    check('id', 'El id de proveedor es obligatorio').notEmpty().custom( idProveedorValidacion ),
    validarCampos
    ],
    solicitudPendientesXProveedorGet)


routerSolicitud.get('/pendientes/empresa/usuario/:id', [
    validatJWT,
    check('id', 'El usuario es obligatorio').notEmpty().custom( idUsuarioValidacion ),
    validarCampos
    ],
    solicitudPendientesUsuarioEmpresaGet)
    
routerSolicitud.get('/pendientes/proveedor/usuario/:id', [
    validatJWT,
    check('id', 'El usuario es obligatorio').notEmpty().custom( idUsuarioValidacion ),
    validarCampos
    ],
    solicitudPendientesUsuarioProveedorGet)

routerSolicitud.put('/cancelar/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudValidacion ),
    validarCampos
    ],
    cancelarPendientesPut)

routerSolicitud.put('/cancelar/usuario/empresa/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioEmpresaValidacion ),
    validarCampos
    ],
    cancelarPendientesUsuarioEmpresaPut)


routerSolicitud.put('/cancelar/usuario/proveedor/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioProveedorValidacion ),
    validarCampos
    ],
    cancelarPendientesUsuarioProveedorPut)

routerSolicitud.put('/aprobar/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    aprobarPendientesPut)

routerSolicitud.put('/aprobar/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    aprobarPendientesPut)


routerSolicitud.put('/aprobar/usr/empresa/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioEmpresaValidacion ),
    validarCampos
    ],
    aprobarPendientesUsuarioEmpresaPut)

routerSolicitud.put('/aprobar/usr/proveedor/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioProveedorValidacion ),
    validarCampos
    ],
    aprobarPendientesUsuarioProveedorPut)


routerSolicitud.put('/rechazar/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudValidacion ),
    check('idautorizante', 'El autorizador es obligatorio').notEmpty().custom( idAutorizanteValidacionBody ),
    validarCampos
    ],
    rechazarPendientesPut)


routerSolicitud.put('/rechazar/usr/empresa/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioEmpresaValidacion ),
    validarCampos
    ],
    rechazarPendientesUsuarioEmpresaPut)

routerSolicitud.put('/rechazar/usr/proveedor/:id', [
    validatJWT,
    check('id', 'El identificador de solicitud es obligatorio').notEmpty().custom( idSolicitudUsuarioProveedorValidacion ),
    validarCampos
    ],
    rechazarPendientesUsuarioProveedorPut)


module.exports = routerSolicitud;