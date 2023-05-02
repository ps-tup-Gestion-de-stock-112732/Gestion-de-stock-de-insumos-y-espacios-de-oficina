const { Router } = require('express');
const { paisesGet, provinciasGet, localidadesGet, barriosGet, direccionPost} = require('../controllers/direccionController');
const { idBarrioValidacion } = require('../helpers/db-validators');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const routerDirecciones = Router();

routerDirecciones.get('/paises', paisesGet )
routerDirecciones.post('/provincias', provinciasGet )
routerDirecciones.post('/localidades', localidadesGet )
routerDirecciones.post('/barrios', barriosGet )

routerDirecciones.post('/', [
    check('calle', 'La calle es obligatoria').notEmpty(),
    check('altura', 'El telefono debe contener 6 o menos caracteres').isLength({max:6}),
    check('idbarrio').notEmpty().withMessage('El barrio es obligatorio').custom( idBarrioValidacion ),
    validarCampos
    ],
    direccionPost)

module.exports = routerDirecciones;