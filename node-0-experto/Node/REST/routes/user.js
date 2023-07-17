// definir las rutas de usuario
const { Router } = require('express');
const { getUser,postUser,
        putUser,deleteUser } = require('../controllers/user');
const router = Router()

// endpoint get
// getUser: funcion sin los parentecis para no ejecutar
router.get('/', getUser);

// endpoint put
// /:id -> obtener información de la url
router.put('/:id', putUser )

// endpoint post
router.post('/', postUser )

// endpoint delete
router.delete('/', deleteUser )


module.exports = router