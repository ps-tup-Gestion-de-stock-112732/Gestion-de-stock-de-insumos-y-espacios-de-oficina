const { Router } = require('express');
const { paisesGet, provinciasGet, localidadesGet, barriosGet, direccionGet, direccionPost, paisGet, provinciaGet, localidadGet, barrioGet } = require('../controllers/direccionController');
const { idBarrioValidacion } = require('../helpers/db-validators');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const routerDirecciones = Router();

routerDirecciones.get('/paises', paisesGet )
routerDirecciones.post('/provincias', provinciasGet )
routerDirecciones.post('/localidades', localidadesGet )
routerDirecciones.post('/barrios', barriosGet )

routerDirecciones.get('/paises/:id', paisGet )
routerDirecciones.get('/provincias/:id', provinciaGet )
routerDirecciones.get('/localidades/:id', localidadGet )
routerDirecciones.get('/barrios/:id', barrioGet )

routerDirecciones.get('/:id', direccionGet )

routerDirecciones.post('/', [
    check('calle', 'La calle es obligatoria').notEmpty(),
    check('altura', 'El telefono debe contener 6 o menos caracteres').isLength({max:6}),
    check('idbarrio').notEmpty().withMessage('El barrio es obligatorio').custom( idBarrioValidacion ),
    validarCampos
    ],
    direccionPost)

module.exports = routerDirecciones;