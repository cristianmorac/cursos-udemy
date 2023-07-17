// obtenga las variables de entorno
require('dotenv').config();
const Server = require('./models/server');

// llamar la clase del server
const server = new Server();
server.listen();