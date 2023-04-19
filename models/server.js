const express = require('express')
const cors = require('cors')

class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.empleadosPath = '/api/empleados';
        
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
    }

    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuario'))
        this.app.use(this.empleadosPath, require('../routes/empleado'))

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