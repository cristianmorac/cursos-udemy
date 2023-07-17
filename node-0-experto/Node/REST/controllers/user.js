const { response, request } = require('express')

const getUser = (req = request, res = response) => {

    // extraer los parametros de la url
    // variable para obtener todos los parametros: const query = req.query

    /* desestructurar para obtener los parametros que quiero 
    si no envian el parametro se peude colocar una por defecto
    nombre = 'No name'
    */
    const { q, nombre = 'No name' } = req.query

    res.json({
        msg: 'get API - controlador',
        q,
        nombre
    })
}

const postUser = (req, res = response) => {
    // mostrar en JSON lo que envian en el endpoint
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })

    /* obtener todo lo que envian del body
    const body = req.body;
    res.json({
        msg: 'post API - controlador',
        body
    })
    */
}

const putUser = (req = request, res = response) => {

    // variable normal: const id = req.params.id
    const {id} = req.params
   
    res.json({
        msg: 'put API - controlador',
        id
    })
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    })
}


module.exports = {
    getUser,postUser,putUser,deleteUser
}