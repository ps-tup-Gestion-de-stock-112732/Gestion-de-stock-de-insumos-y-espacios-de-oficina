const { Router } = require('express');
const { solicitudGestionPost } = require('../controllers/solicitud-gestionController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { idPedidoValidacionBody } = require('../helpers/db-validators');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerSolicitudGestion = Router();

routerSolicitudGestion.post('/', [
    validatJWT,
    check('idpedido', 'El pedido es obligatorio').notEmpty().custom( idPedidoValidacionBody ),
    validarCampos
    ],
    solicitudGestionPost)

module.exports = routerSolicitudGestion;