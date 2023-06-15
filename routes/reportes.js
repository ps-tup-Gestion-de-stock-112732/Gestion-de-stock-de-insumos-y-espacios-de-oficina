const { Router } = require('express');
const { proveedoresYearsGet, proveedoresEmpresasGet, proveedoresIngresosXEmpresaPost, proveedoresIngresosPost, proveedoresIngresosTotalesXDiaPost, 
    proveedoresIngresosTotalesXMesPost, proveedoresIngresosTotalesXAnioPost, proveedoresProductosTotalesXDiaPost,proveedoresProductosTotalesXMesPost,
    proveedoresProductosTotalesXAnioPost, proveedoresProductosBajoStockGet, gestionGastosTotalesXDiaPost, gestionGastosTotalesXMesPost, 
    gestionGastosTotalesXAnioPost, gestionEmpleadosTotalesGet, empresaYearsGet, empresaGastosPost, oficinasGet, reservasGet, reservasYearsGet,
    reservasMonthsGet, solicitudesPendientesGet, solicitudesAprobadasGet, solicitudesRechazadasGet, solicitudesTotalGet, solicitudesYearsGet } = require('../controllers/reportesController');
const { validatJWT } = require('../middlewares/validar-jwt');

const routerReportes = Router();

/*REPORTES PROVEEDOR */

routerReportes.get('/proveedores/years/:id', [validatJWT],
    proveedoresYearsGet )

routerReportes.get('/proveedores/empresas/:id', [validatJWT],
    proveedoresEmpresasGet )

routerReportes.post('/proveedores/ingresos/empresas', [validatJWT],
    proveedoresIngresosXEmpresaPost )
    
routerReportes.post('/proveedores/ingresos', [validatJWT],
    proveedoresIngresosPost )


routerReportes.post('/proveedores/ingresosTotales/dia', [validatJWT],
    proveedoresIngresosTotalesXDiaPost )

routerReportes.post('/proveedores/ingresosTotales/mes', [validatJWT],
    proveedoresIngresosTotalesXMesPost )

routerReportes.post('/proveedores/ingresosTotales/anio', [validatJWT],
    proveedoresIngresosTotalesXAnioPost )


routerReportes.post('/proveedores/productosTotales/dia', [validatJWT],
    proveedoresProductosTotalesXDiaPost )

routerReportes.post('/proveedores/productosTotales/mes', [validatJWT],
    proveedoresProductosTotalesXMesPost )

routerReportes.post('/proveedores/productosTotales/anio', [validatJWT],
    proveedoresProductosTotalesXAnioPost )


routerReportes.get('/proveedores/productosBajoStock/:id', [validatJWT],
    proveedoresProductosBajoStockGet )




/*REPORTES GESTION */

routerReportes.get('/empresa/years/:id', [validatJWT],
    empresaYearsGet )

routerReportes.post('/empresa/gastos', [validatJWT],
    empresaGastosPost )

routerReportes.post('/gestion/gastosTotales/dia', [validatJWT],
    gestionGastosTotalesXDiaPost )

routerReportes.post('/gestion/gastosTotales/mes', [validatJWT],
    gestionGastosTotalesXMesPost )

routerReportes.post('/gestion/gastosTotales/anio', [validatJWT],
    gestionGastosTotalesXAnioPost )  

routerReportes.get('/gestion/empleadosTotales/:id', [validatJWT],
    gestionEmpleadosTotalesGet )  

routerReportes.get('/gestion/oficinas/years/:id', [validatJWT],
    reservasYearsGet )

routerReportes.get('/gestion/oficinas/months/:id', [validatJWT],
    reservasMonthsGet )

routerReportes.post('/gestion/oficinas/:id', [validatJWT],
    oficinasGet )

routerReportes.post('/gestion/reservas/:id', [validatJWT],
    reservasGet )




routerReportes.get('/gestion/solicitudes/years/:idempresa', [validatJWT],
    solicitudesYearsGet )
    
routerReportes.post('/gestion/solicitudes/total/:idempresa', [validatJWT],
    solicitudesTotalGet )

routerReportes.post('/gestion/solicitudes/pendientes/:idestado', [validatJWT], //1 o 2
    solicitudesPendientesGet )

routerReportes.post('/gestion/solicitudes/aprobadas/:idrol', [validatJWT], //2 o 3
    solicitudesAprobadasGet )

routerReportes.post('/gestion/solicitudes/rechazadas/:idrol', [validatJWT], //2 o 3
    solicitudesRechazadasGet )

module.exports = routerReportes;