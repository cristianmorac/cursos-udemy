const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;

        // validar la extensión
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no es permitida - ${extensionesValidas}`)
        }

        // cambiar nombre de los archivos
        const nombreTemp = uuidv4() + '.' + extension;

        // construir el path del archivo
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp )
        })
    });


}

module.exports = {
    subirArchivo
}