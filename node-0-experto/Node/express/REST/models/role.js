const { Schema, model } = require('mongoose')

const RoleShema = Schema({
    rol: {
        type: String,
        required: [true, 'Rol obligatorio']
    }
})

module.exports = model('Role', RoleShema)