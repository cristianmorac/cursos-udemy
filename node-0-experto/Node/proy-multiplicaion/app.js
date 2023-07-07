// importar un archivo
const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');
require('colors')

// limpiar la consola
console.clear();

// Ejecutar función

crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow,'creado'))
    .catch(err => console.log(err))


