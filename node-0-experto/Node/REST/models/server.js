const express = require('express')

class Server {

    constructor() {
        // crear la app express como una propiedad
        this.app = express()
        // visible el puerto
        this.port = process.env.PORT
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
        // Directorio público
        this.app.use( express.static('public') );
    }

    // rutas
    routes() {
        this.app.get('/api', (req,res) => {
            res.send('Hello World')
        })
    }
    // correr el puerto
    listen() {
        this.app.listen( this.port, () => {
            console.log('Run server in port: ', this.port);
        })
    }
}

module.exports = Server