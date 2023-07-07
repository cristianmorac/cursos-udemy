// callback tradicional

const getUsiarioByID = (id) => {
    const usuario = {
        id, // variable y resultado es lo mismo
        nombre: 'Cristian'
    }
    setTimeout(()=>{
        console.log(usuario);
    },1500)
}

getUsiarioByID(10)

// Forma actualizada para ejecutar un callcback
const getUsiarioByID2 = (id, callback) => {
    const usuario = {
        id, // variable y resultado es lo mismo
        nombre: 'Cristian'
    }
    setTimeout(()=>{
        callback(usuario);
    },1500)
}

getUsiarioByID2(10, (usuario)=>{
    // Mostrar los datos
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
})

// Desestructuración
getUsiarioByID2(10, ({id,nombre})=>{
    // Mostrar los datos
    console.log(id);
    console.log(nombre.toUpperCase());
})