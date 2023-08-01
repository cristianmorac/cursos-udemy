const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,  validarArchivoSubir} = require('../middlewares/');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers')

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo );

// actualizar imagenes
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], actualizarImagen)


// mostrar imagenes
router.get('/:coleccion/:id', [
    check('id', 'id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;