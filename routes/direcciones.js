const { Router } = require('express');
const { paisesGet, provinciasGet, localidadesGet, barriosGet, direccionGet, direccionPost, paisGet, provinciaGet, localidadGet, barrioGet, direccionPut, barriosGetAll, barriosNombreGet } = require('../controllers/direccionController');
const { idBarrioValidacion, idDireccionValidacion } = require('../helpers/db-validators');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerDirecciones = Router();

routerDirecciones.get('/paises', paisesGet )
routerDirecciones.post('/provincias', provinciasGet )
routerDirecciones.post('/localidades', localidadesGet )
routerDirecciones.post('/barrios', barriosGet )

routerDirecciones.get('/barrios/all', barriosGetAll )

routerDirecciones.post('/barrios/nombre', barriosNombreGet )

routerDirecciones.get('/paises/:id', paisGet )
routerDirecciones.get('/provincias/:id', provinciaGet )
routerDirecciones.get('/localidades/:id', localidadGet )
routerDirecciones.get('/barrios/:id', barrioGet )

routerDirecciones.get('/:id', direccionGet )

routerDirecciones.post('/', [
    validatJWT,
    check('calle', 'La calle es obligatoria').notEmpty(),
    check('altura', 'La altura debe contener 6 o menos caracteres').isLength({max:6}),
    check('idbarrio').notEmpty().withMessage('El id de barrio es obligatorio').custom( idBarrioValidacion ),
    validarCampos
    ],
    direccionPost)

routerDirecciones.patch('/:id', [
    validatJWT,
    check('id').notEmpty().withMessage('El id de direccion es obligatorio').custom( idDireccionValidacion ),
    check('calle', 'La calle es obligatoria').optional().notEmpty(),
    check('altura', 'La altura debe contener 6 o menos caracteres').optional().isLength({max:6}),
    check('idbarrio').optional().notEmpty().withMessage('El id de barrio es obligatorio').custom( idBarrioValidacion ),
    validarCampos
    ],
    direccionPut)

module.exports = routerDirecciones;