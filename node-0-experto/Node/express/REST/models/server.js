const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        // crear la app express como una propiedad
        this.app = express()
        // visible el puerto
        this.port = process.env.PORT
        // visible las rutas
        this.pathUser = '/api/user'
        // middleware
        this.middlewares();
        // ejecutar el metodo
        this.routes();
    }

    /* middlewares
        funciones que se ejecutan cuando se corre
        la aplicacion
    */

    middlewares() {

        //? CORS: ver documentación
        this.app.use( cors() )
        // Lectura y parseo de lo que se envia en el body
        this.app.use( express.json() )
        // Directorio público
        this.app.use( express.static('public') );
    }

    // rutas
    routes() {
        
        // configurar rutas de routes
        this.app.use(this.pathUser, require('../routes/user'))
    }
    // correr el puerto
    listen() {
        this.app.listen( this.port, () => {
            console.log('Run server in port: ', this.port);
        })
    }
}

module.exports = Server