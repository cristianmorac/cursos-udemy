// importar un archivo
const {crearArchivo} = require('./helpers/multiplicar')

// limpiar la consola
console.clear();

const [, ,arg3 = 'base=5'] = process.argv
const [,base] = arg3.split('=')

// Ejecutar función
crearArchivo(base)
    .then(nombreArchivo => console.log(nombreArchivo,'creado'))
    .catch(err => console.log(err))


