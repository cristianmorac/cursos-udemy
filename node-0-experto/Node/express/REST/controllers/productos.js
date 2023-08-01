const { response } = require('express');
// importar modelo categoria
const { Producto } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerProductos = async ( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true }

    // paginación
    const [ total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            // mostrar el nombre y no el id
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limite ))
    ]);

    res.json({
        total,
        productos
    })

}

// obtenerCategoria - populate {}
const obtenerProducto = async ( req, res = response ) => {
    const { id } = req.params;
    const producto = await Producto.findById( id )
                                .populate('usuario','nombre')
                                .populate('categoria','nombre');
    res.json( producto );
}

const crearProducto = async ( req, res = response ) => {
    
    // obtener datos del producto
		const { estado, usuario, ...body } = req.body

    // buscar si la categoria existe
		const productoDB = await Producto.findOne({ nombre: body.nombre });

    // si la categoria existe
    if ( productoDB ) {
        return res.status(400).json({
            msg: `el prodcuto ${ productoDB.nombre }, ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        ...body,
        // mayúsculas el nombre
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    // guardar DB
    await producto.save()

    res.status(201).json(producto)
}

// actualizar producto
const actualizarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if ( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { mew:true })

    res.json( producto );
}

// borrarProducto - estado:false
const borrarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}