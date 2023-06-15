const { response } = require('express')
const { pool } =require('../db.js')

var datetime = require('../helpers/datetime.js')

/*REPORTES PROVEEDOR */

const proveedoresYearsGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT YEAR(fecha) as year '+
                                                        'FROM pedido '+
                                                        'WHERE idproveedor = ? '+
                                                        'GROUP BY YEAR(fecha) '+
                                                        'ORDER BY YEAR(fecha) DESC', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const proveedoresEmpresasGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT p.idempresa, e.nombre as empresa '+
                                                        'FROM pedido p '+
                                                        'JOIN empresa e '+
                                                        'ON p.idempresa = e.idempresa '+
                                                        'WHERE idproveedor = ? '+
                                                        'GROUP BY idempresa', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresIngresosXEmpresaPost = async (req = request, res = response) =>{

    const {idproveedor, idempresa, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as ingreso, MONTH(p.fecha) as mes, p.idempresa, e.nombre as empresa '+
                                                        'FROM pedido p '+
                                                        'JOIN detallepedido dp '+
                                                        'ON p.idpedido = dp.idpedido '+
                                                        'JOIN autorizaciongestion a '+
                                                        'ON p.idpedido = a.idpedido '+
                                                        'JOIN empresa e '+
                                                        'ON p.idempresa = e.idempresa '+
                                                        'WHERE p.idproveedor = ? '+
                                                        'AND p.idempresa = ? '+
                                                        'AND YEAR(p.fecha) = ? '+
                                                        'AND a.idestado in (3, 6, 7) '+
                                                        'GROUP BY MONTH(p.fecha)', [idproveedor, idempresa, year])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresIngresosPost = async (req = request, res = response) =>{

    const {idproveedor, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as ingreso, MONTH(p.fecha) as mes, p.idempresa, e.nombre as empresa '+
                                                        'FROM pedido p '+
                                                        'JOIN detallepedido dp '+
                                                        'ON p.idpedido = dp.idpedido '+
                                                        'JOIN autorizaciongestion a '+
                                                        'ON p.idpedido = a.idpedido '+
                                                        'JOIN empresa e '+
                                                        'ON p.idempresa = e.idempresa '+
                                                        'WHERE p.idproveedor = ? '+
                                                        'AND YEAR(p.fecha) = ? '+
                                                        'AND a.idestado in (3, 6, 7) '+
                                                        'GROUP BY MONTH(p.fecha), p.idempresa '+
                                                        'ORDER BY p.idempresa ASC', [idproveedor, year])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresIngresosTotalesXDiaPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const date = datetime.datetimegetDate()
    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as ingresos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND DAY(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year, month, date])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresIngresosTotalesXMesPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as ingresos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year, month])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresIngresosTotalesXAnioPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as ingresos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const proveedoresProductosTotalesXDiaPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const date = datetime.datetimegetDate()
    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.cantidad) as productos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND DAY(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year, month, date])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresProductosTotalesXMesPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.cantidad) as productos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year, month])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const proveedoresProductosTotalesXAnioPost = async (req = request, res = response) =>{

    const {idproveedor} = req.body

    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.cantidad) as productos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idproveedor = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idproveedor, year])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const proveedoresProductosBajoStockGet = async (req = request, res = response) =>{

    const {id} = req.params

    try {

        const [results] = await pool.promise().query('SELECT * FROM producto '+
                                                        'WHERE idProveedor = ? '+
                                                        'AND cantidad <= 4 '+
                                                        'AND estado = 1', [id])
        
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


/*REPORTES GESTION */

const empresaYearsGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT YEAR(fecha) as year '+
                                                        'FROM pedido '+
                                                        'WHERE idempresa = ? '+
                                                        'GROUP BY YEAR(fecha) '+
                                                        'ORDER BY YEAR(fecha) DESC', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const empresaGastosPost = async (req = request, res = response) =>{

    const {idempresa, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as gasto, MONTH(p.fecha) as mes, p.idproveedor, e.nombre as proveedor '+
                                                        'FROM pedido p '+
                                                        'JOIN detallepedido dp '+
                                                        'ON p.idpedido = dp.idpedido '+
                                                        'JOIN autorizaciongestion a '+
                                                        'ON p.idpedido = a.idpedido '+
                                                        'JOIN empresa e '+
                                                        'ON p.idproveedor = e.idempresa '+
                                                        'WHERE p.idempresa = ? '+
                                                        'AND YEAR(p.fecha) = ? '+
                                                        'AND a.idestado in (3, 6, 7) '+
                                                        'GROUP BY MONTH(p.fecha), p.idproveedor '+
                                                        'ORDER BY p.idproveedor ASC', [idempresa, year])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const gestionGastosTotalesXDiaPost = async (req = request, res = response) =>{

    const {idempresa} = req.body

    const date = datetime.datetimegetDate()
    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as gastos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idempresa = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND DAY(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idempresa, year, month, date])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const gestionGastosTotalesXMesPost = async (req = request, res = response) =>{

    const {idempresa} = req.body

    const month = datetime.datetimegetMonth()
    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as gastos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idempresa = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND MONTH(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idempresa, year, month])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const gestionGastosTotalesXAnioPost = async (req = request, res = response) =>{

    const {idempresa} = req.body

    const year = datetime.datetimegetYear()


    try {

        const [results] = await pool.promise().query('SELECT SUM(dp.precioUnitario * dp.cantidad) as gastos '+
                                                            'FROM pedido p '+
                                                            'JOIN detallepedido dp '+
                                                            'ON p.idpedido = dp.idpedido '+
                                                            'JOIN autorizaciongestion a '+
                                                            'ON p.idpedido = a.idpedido '+
                                                            'WHERE p.idempresa = ? '+
                                                            'AND YEAR(p.fecha) = ? '+
                                                            'AND a.idestado in (3, 6, 7)', [idempresa, year])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const gestionEmpleadosTotalesGet = async (req = request, res = response) =>{

    const {id} = req.params

    try {

        const [results] = await pool.promise().query('SELECT COUNT(*) as cantidad FROM usuario WHERE idempresa = ? AND idrol = 5 AND estado = 1', [id])
        
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const oficinasGet = async (req = request, res = response) =>{

    const {id} = req.params
    const {month, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT * FROM oficina '+
                                                        'WHERE idempresa = ? '+
                                                        'AND (fechabaja IS NULL '+
                                                        'OR (MONTH(fechabaja) = ? '+
                                                        'AND YEAR(fechabaja) = ?)) '+
                                                        'ORDER BY idoficina ASC', [id, month, year])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const reservasGet = async (req = request, res = response) =>{

    const {id} = req.params
    const {month, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT count(*) cantidad '+
                                                        'FROM espacioreservado '+
                                                        'WHERE idoficina = ? '+
                                                        'AND MONTH(fecha) = ? '+
                                                        'AND YEAR(fecha) = ? '+
                                                        'AND idestado = 1 '+
                                                        'GROUP BY idoficina '+
                                                        'ORDER BY idoficina ASC', [id, month, year])
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const reservasYearsGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT YEAR(er.fecha) as year '+
                                                        'FROM espacioreservado er '+
                                                        'JOIN oficina o '+
                                                        'ON er.idoficina = o.idoficina '+
                                                        'WHERE o.idempresa = ? '+
                                                        'AND er.idestado = 1 '+
                                                        'GROUP BY YEAR(er.fecha)', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const reservasMonthsGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT MONTH(er.fecha) as month '+
                                                        'FROM espacioreservado er '+
                                                        'JOIN oficina o '+
                                                        'ON er.idoficina = o.idoficina '+
                                                        'WHERE o.idempresa = ? '+
                                                        'AND er.idestado = 1 '+
                                                        'GROUP BY MONTH(er.fecha)', [req.params.id])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const solicitudesTotalGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT COUNT(*) as total '+
                                                    'FROM autorizaciongestion a '+
                                                    'JOIN pedido p '+
                                                    'ON p.idpedido = a.idpedido '+
                                                    'WHERE p.idempresa = ? '+
                                                    'AND YEAR(a.fecha) = ?', [req.params.idempresa, req.body.year])
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const solicitudesPendientesGet = async (req = request, res = response) =>{

    const {idestado} = req.params
    const {idempresa, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT COUNT(*) as pendientes '+
                                                    'FROM autorizaciongestion a '+
                                                    'JOIN pedido p '+
                                                    'ON p.idpedido = a.idpedido '+
                                                    'WHERE p.idempresa = ? '+
                                                    'AND a.idestado = ? '+
                                                    'AND YEAR(a.fecha) = ?', [idempresa, idestado, year])
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const solicitudesAprobadasGet = async (req = request, res = response) =>{

    const {idrol} = req.params
    const {idempresa, year} = req.body

    try {

        if (idrol == 2) {
            const [results] = await pool.promise().query('SELECT COUNT(*) AS aprobadas '+
                                                        'FROM autorizaciongestion a '+
                                                        'JOIN usuario u '+
                                                        'ON a.idautorizante = u.idusuario '+
                                                        'JOIN pedido p '+
                                                        'ON p.idpedido = a.idpedido '+
                                                        'WHERE p.idempresa = ? '+
                                                        'AND (a.idestado NOT IN (1, 5) '+
                                                        'OR (a.idestado = 4 AND u.idrol != ?)) '+
                                                        'AND YEAR(a.fecha) = ?', [idempresa, idrol, year])

            res.json(results[0])
        }else{
            const [results] = await pool.promise().query('SELECT COUNT(*) as aprobadas '+
                                                        'FROM autorizaciongestion a '+
                                                        'JOIN usuario u '+
                                                        'ON a.idautorizante = u.idusuario '+
                                                        'JOIN pedido p '+
                                                        'ON p.idpedido = a.idpedido '+
                                                        'WHERE p.idempresa = ? '+
                                                        'AND a.idestado NOT IN (1, 2, 4, 5) '+
                                                        'AND YEAR(a.fecha) = ?', [idempresa, year])

            res.json(results[0])
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}

const solicitudesRechazadasGet = async (req = request, res = response) =>{

    const {idrol} = req.params
    const {idempresa, year} = req.body

    try {
        const [results] = await pool.promise().query('SELECT COUNT(*) as rechazadas '+
                                                    'FROM autorizaciongestion a '+
                                                    'JOIN usuario u '+
                                                    'ON a.idautorizante = u.idusuario '+
                                                    'JOIN pedido p '+
                                                    'ON p.idpedido = a.idpedido '+
                                                    'WHERE p.idempresa = ? '+
                                                    'AND (a.idestado = 4 AND u.idrol = ?) '+
                                                    'AND YEAR(a.fecha) = ?', [idempresa, idrol, year])
        res.json(results[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}


const solicitudesYearsGet = async (req = request, res = response) =>{

    try {
        const [results] = await pool.promise().query('SELECT YEAR(a.fecha) as year '+
                                                    'FROM autorizaciongestion a '+
                                                    'JOIN pedido p '+
                                                    'ON p.idpedido = a.idpedido '+
                                                    'WHERE p.idempresa = ? '+
                                                    'GROUP BY YEAR(a.fecha)', [req.params.idempresa])
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}
module.exports = {
    proveedoresYearsGet,
    proveedoresEmpresasGet,
    proveedoresIngresosXEmpresaPost,
    proveedoresIngresosPost,
    proveedoresIngresosTotalesXDiaPost,
    proveedoresIngresosTotalesXMesPost,
    proveedoresIngresosTotalesXAnioPost,
    proveedoresProductosTotalesXDiaPost,
    proveedoresProductosTotalesXMesPost,
    proveedoresProductosTotalesXAnioPost,
    proveedoresProductosBajoStockGet,
    gestionGastosTotalesXDiaPost,
    gestionGastosTotalesXMesPost,
    gestionGastosTotalesXAnioPost,
    gestionEmpleadosTotalesGet,
    empresaYearsGet,
    empresaGastosPost,
    oficinasGet,
    reservasGet,
    reservasYearsGet,
    reservasMonthsGet,
    solicitudesTotalGet,
    solicitudesPendientesGet,
    solicitudesAprobadasGet,
    solicitudesRechazadasGet,
    solicitudesYearsGet
}