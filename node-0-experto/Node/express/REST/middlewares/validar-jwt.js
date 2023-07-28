const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')   


const validarJWT = async ( req = request, res = response, next ) => {
    
    // obtener información de los header
    // x-token: nombre de como se quiere enviar
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    // validación del JWT
    try {
        
        // valida si el token del usuario es valido y extraer el payload
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById( uid );

        
        // verificar que el usuario no fue borrado
        if ( !usuario) {
            return res.status(401).json({
                msg: 'Token no valido - user borrado en DB'
            })
        }

        // verificar si el uid tiene estado en true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - user estado: false'
            })
        }

        req.usuario = usuario
        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    next()
}

module.exports = {
    validarJWT
}