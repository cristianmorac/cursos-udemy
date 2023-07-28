const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generar-jwt')

const login = async ( req, res= response ) => {

    const { correo, password } = req.body;

    try {

        // validar si el email exite
        const usuario = await Usuario.findOne({ correo })
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            })
        }

        // usuario activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }

        // verificar la contraseña si es igual con la contraseña de la base de datos
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if (!validPassword ) {
            return res.status(400).json({
                msg: 'Password incorrecta'
            })
        }

        // generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                msg:'Login no admitido, hable con el admin'
            })
    }
}

module.exports = {
    login
}