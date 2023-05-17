const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.empleadosPath = '/api/empleados';
        this.empresasPath = '/api/empresas';
        this.rolesPath = '/api/roles';
        this.areaPath = '/api/areas';
        this.direccionPath = '/api/direcciones';
        this.proveedorPath = '/api/proveedores';
        this.productoPath = '/api/productos';
        
        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parse del body
        this.app.use(express.json());

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuario'))
        this.app.use(this.empleadosPath, require('../routes/empleado'))
        this.app.use(this.empresasPath, require('../routes/empresa'))
        this.app.use(this.rolesPath, require('../routes/roles'))
        this.app.use(this.areaPath, require('../routes/areas'))
        this.app.use(this.direccionPath, require('../routes/direcciones'))
        this.app.use(this.proveedorPath, require('../routes/proveedor'))
        this.app.use(this.productoPath, require('../routes/producto'))

        this.app.use((req, res, next)=>{
            res.status(404).json({
                message: 'endpoint no encontrado'
            })
        })
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;