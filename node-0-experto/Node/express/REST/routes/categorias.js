const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/');

const { crearCategoria, obtenerCategorias,
        obtenerCategoria, actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators')


const router = Router();

// crear una categoria - privado - persona con token válido
router.post('/', [ 
    validarJWT,
    check('nombre', 'el nombre es obligatiorio').not().isEmpty(),
    validarCampos
 ], crearCategoria);

// Obtener una categoria por id - público
router.get('/',obtenerCategorias);


// obtener categoria por id - público
router.get('/:id',[
    check('id', 'No es un id de mongoDB valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria)

// actualizar - privado - cualquier token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);

module.exports = router;