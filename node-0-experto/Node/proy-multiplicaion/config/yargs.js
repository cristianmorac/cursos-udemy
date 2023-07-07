const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        // valor es obligatorio
        demandOption: true,
        describe: 'Base de la tabla de multiplicar',
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        demandOption: true,
        describe:'Muestra la tabla en consola',
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: false,
        default: 10,
        describe:'hasta que valor multiplicar',
    })
    .check((argv, options) => {
        if (isNaN(argv.b) && isNaN(argv.h)) {
            throw 'La base debe ser un número'
        }
        return true
    })
    .argv;

module.exports = argv;