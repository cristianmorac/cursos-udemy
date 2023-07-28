/* modelo del usuario
{
    nombre: String, correo: String, password: String,
    img, rol: String, estado: boolean, google:Boolean
}
*/

// Creación del modelo
const { Schema, model } =require('mongoose');
const UsuarioShema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo es obligatorio'],
        // unico, no acepta duplicados
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// tiene que ser una función normal, con flecha no funciona
UsuarioShema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioShema );