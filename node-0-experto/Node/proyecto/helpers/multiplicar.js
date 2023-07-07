// importar un paquete
const fs = require('fs');

// Crear promesa async

const crearArchivo = async (base = 5) => {
    // base por defecto sea 5

    try {
        console.log('Tabla del: ', base);
        // tabla de multiplicar
        let salida = ''
        for (let i = 1; i <= 10; i++) {
            salida += `${base} x ${i} = ${base * i}\n`
        }
        console.log(salida);

        // Crear archivo
        fs.writeFileSync(`tabla-${base}.txt`, salida);
        return `tabla-${base}.txt Creada`;
    } catch (err) {
        // si falla muestre el error
        throw err
    }


}

module.exports = {
    // traer una funcion que se llama igual
    crearArchivo
}