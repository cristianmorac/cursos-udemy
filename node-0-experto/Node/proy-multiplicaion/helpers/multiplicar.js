// importar un paquete
const fs = require('fs');
const colors = require('colors')
// Crear promesa async

const crearArchivo = async (base = 5, listar = false, longitud = 10) => {
    // base por defecto sea 5

    try {
        // tabla de multiplicar
        let salida = '';
        let consola = '';
        for (let i = 1; i <= longitud; i++) {
            consola += `${colors.green(base)} ${colors.red('x')} ${colors.green(i)} = ${colors.blue(base * i)}\n`;
            salida += `${base} x ${i} = ${base * i}\n`;
        }
        if (listar) {
            console.log(colors.bgMagenta('Tabla del: '), base);
            console.log(consola);
        }
        // Crear archivo
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;
    } catch (err) {
        // si falla muestre el error
        throw err
    }


}

module.exports = {
    // traer una funcion que se llama igual
    crearArchivo
}