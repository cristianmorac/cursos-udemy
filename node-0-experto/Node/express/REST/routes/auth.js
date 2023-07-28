const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()
// endpoint get
// getUser: funcion sin los parentecis para no ejecutar
router.post('/login', [
    // middlewares
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login );

module.exports = router
