const { response } = require('express');
const { Usuario, Categoria, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // true

    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    // expresion regular busque los que coinciden la palabra no importa mayus o minuscula
    const regex = new RegExp( termino, 'i'); 

    const usuarios = await Usuario.find({

        // $or: operador OR
        $or: [ { nombre: regex, estado: true }, { correo: regex, estado: true } ],
        // $and: operador AND
        $and: [{ estado: true }]
     });

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // true

    if ( esMongoID ) {
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    // expresion regular busque los que coinciden la palabra no importa mayus o minuscula
    const regex = new RegExp( termino, 'i'); 

    const categorias = await Categoria.find({ nombre: regex, estado: true });
     
    res.json({
        results: categorias
    })
}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // true

    if ( esMongoID ) {
        const producto = await Producto.findById( termino )
                                        .populate('categoria','nombre')
                                        .populate('usuario','nombre');
            
        return res.json({
        results: ( producto ) ? [ producto ] : []
        });
    }

    // expresion regular busque los que coinciden la palabra no importa mayus o minuscula
    const regex = new RegExp( termino, 'i'); 

    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')
                            .populate('usuario','nombre');
    return res.json({
        results: productos
    })
}


const buscar = ( req, res = response ) => {

    const { coleccion, termino } =req.params;

    if ( !coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        }) 
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
        break;
        
        case 'categorias':
            buscarCategorias(termino, res)
        break;

        case 'productos':
            buscarProductos(termino, res)
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer la busqueda'
            })
    }
}

module.exports = {
    buscar
}