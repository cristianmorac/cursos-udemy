const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        // crear la app express como una propiedad
        this.app = express()
        // visible el puerto
        this.port = process.env.PORT
        // visible las rutas
        this.pathUser = '/api/user';
        this.authPath = '/api/auth'

        // connection db
        this.connectionDB();

        // middleware
        this.middlewares();
        // ejecutar el metodo
        this.routes();
    }

    // conexión base de datos
    async connectionDB() {
        await dbConnection()
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
        this.app.use(this.authPath, require('../routes/auth'))
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