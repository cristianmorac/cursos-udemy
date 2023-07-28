const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta en la DB`)
    }
}

const emailExiste = async (correo = '') => {
    // verificar si el correcto existe
    const existEmail = await Usuario.findOne({ correo })
    if ( existEmail ) {
        throw new Error(`El correo: ${ correo }, ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    // verificar si el correcto existe
    const existeUsuario = await Usuario.findById( id )
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}

module.exports = {
    esRolValido, emailExiste, existeUsuarioPorId
}