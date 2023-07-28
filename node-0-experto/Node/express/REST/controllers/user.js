const { response, request } = require('express')
const Usuario = require('../models/usuario')
// paquete para encriptar contraseñas
const bcryptjs = require('bcryptjs')

const getUser = async (req = request, res = response) => {

    // extraer los parametros de la url
    // variable para obtener todos los parametros: const query = req.query

    /* desestructurar para obtener los parametros que quiero 
    si no envian el parametro se peude colocar una por defecto
    nombre = 'No name'
    */
    const { limite =5, desde = 0 } = req.query;
    const query = {estado:true}

    const [ total, usuarios ] = await Promise.all([
        // realiza un conteo total de los que tengan estado en true
        Usuario.countDocuments(query),
        // consulta mongo para obtener todos los datos con estado en true
        Usuario.find(query)
        // registro desde donde se quiera iniciar
        .skip(Number(desde))
        // limitar el numero del que se envia en la URL
        .limit(Number(limite))
    ]);

    res.json({
        total, usuarios
    })
}

const postUser = async (req, res = response) => {

    // mostrar en JSON lo que envian en el endpoint
    const { nombre, correo, password, rol, img, estado } = req.body;
    // crear nueva instancia del usuario
    const usuario = new Usuario( { nombre, correo, password, rol, img, estado } );
    // guardar la instancia

    // Encriptar la contraseña: numero de vueltas que necesita para encriptar
    // 10 es un valor por defecto
    const salt = bcryptjs.genSaltSync()
    // crear la encriptacion del password
    usuario.password = bcryptjs.hashSync(password, salt)
    // guiardar la instancia del usuario
    await usuario.save()
    res.json({
        usuario
    })

    /* obtener todo lo que envian del body
    const body = req.body;
    res.json({
        msg: 'post API - controlador',
        body
    })
    */
}

const putUser = async (req = request, res = response) => {

    // variable normal: const id = req.params.id
    const {id} = req.params

    const { _id, password, google,correo,  ...resto } = req.body

    // TODO: Validar con la base de datos
    if ( password ) {
        // 10 es un valor por defecto
        const salt = bcryptjs.genSaltSync()
        // crear la encriptacion del password
        resto.password = bcryptjs.hashSync(password, salt)
    }
    // campos que se van a actualizar
    const usuario = await Usuario.findByIdAndUpdate( id, resto )
   
    res.json({
        usuario
    })
}

const deleteUser = async (req , res = response) => {

    // desestructurar el parametro que viene en la URL
    const { id } = req.params

    /* // Eliminarlo permanentemente
    const usuario = await Usuario.findByIdAndDelete( id ); */
    const usuario = await Usuario.findByIdAndUpdate( id, { estado:false })

    res.json({
        usuario
    })
}


module.exports = {
    getUser,postUser,putUser,deleteUser
}