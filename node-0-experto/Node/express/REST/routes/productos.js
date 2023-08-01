const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/');

const { crearProducto, obtenerProductos,
        obtenerProducto, actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')


const router = Router();

// Obtener productos
router.get('/',obtenerProductos );

// obtener producto por id - público
router.get('/:id',[
    check('id', 'No es un id de mongoDB valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto )

// crear un producto - privado - persona con token válido
router.post('/', [ 
    validarJWT,
    check('nombre', 'el nombre es obligatiorio').not().isEmpty(),
    check('categoria', 'no es un id de mongoDB').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
 ], crearProducto);

// actualizar - privado - cualquier token valido
router.put('/:id', [
    validarJWT,
    /* check('categoria', 'no es un id de mongoDB').isMongoId(), */
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto );

// Borrar un prodcuto - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarProducto);


module.exports = router;