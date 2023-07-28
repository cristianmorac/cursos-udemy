// definir las rutas de usuario
const { Router } = require('express');
const { check } = require('express-validator')

// middlewares creados
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { getUser,postUser,
        putUser,deleteUser } = require('../controllers/user');

const router = Router()

// endpoint get
// getUser: funcion sin los parentecis para no ejecutar
router.get('/', getUser);

// endpoint put
// /:id -> obtener información de la url
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], putUser )

// endpoint post
router.post('/', [
    //midelware: campo que se va a validar

    // No tiene que venir vacio: not().IsEmpty
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    // 
    check('password', 'longitud mayor a 6 caracteres').isLength({ min: 6 }),
    // tiene que ser un formato email
    // check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // admita los campos de la lista 
    // check('rol', 'Rol no valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    // ejecutar la funcion del archivo validar-campos
    // para obtener los posibles errores de los check
    validarCampos
] , postUser )
    
// endpoint delete recibiendo id
router.delete('/:id', [
    validarJWT,
    //esAdminRole, tiene que ser solo administrador
    // validar si tiene otro role adicional para ejecutar el borrado
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    // id valido para mongo
    check('id', 'No es un id valido').isMongoId(),
    // id existe
    check('id').custom( existeUsuarioPorId),
    // los campos no tengan errores
    validarCampos
],deleteUser )


module.exports = router