const empleados = [
    {
        id: 1,
        nombre: 'Joaquin'
    },
    {
        id: 2,
        nombre: 'Alicia'
    },
    {
        id: 3,
        nombre: 'Salome'
    },
];

const salarios = [
    {
        id:1,
        salario:1000
    },
    {
        id:2,
        salario:1500
    },
    {
        id:3,
        salario:2000
    },
]

// obtener la información de los empleados
const getEmpleado = (id) => {
    const empleado = empleados.find( e => e.id ===id)
    if (empleado){
        return empleado
    } else {
        return `Empleado con id ${id} no existe`
    }
}
console.log(getEmpleado(1));

const getEmpleado2 = (id,callback) => {
    const empleado = empleados.find( e => e.id ===id)?.nombre
    if (empleado){
        // null, para indicar que no hay error
        callback(null,empleado);
    } else {
        callback(`Empleado con id ${id} no existe`); 
    }
}

// Ejecutando con callbacks
getEmpleado2(3,(err,empleado)=> {
   if (err) {
    console.log('Error');
    return console.log(err);
   }
   console.log('Empleado existe');
   console.log(empleado);
})

const id =1;
const getSalario = (id,callback) => {
    // solo enviar salario
    const salario = salarios.find(s=> s.id === id)?.salario;
    if (salario){
        callback(null,salario); 
    } else {
        callback(`No existe salario para el id ${id}`);
    }
}

getSalario(id,(err,salario)=>{
    if (err) {
        console.log('Error');
        return console.log(err);
       }
       console.log('Salario existe');
       console.log(salario);
})


getEmpleado2(id,(err,empleado)=> {
    if (err) {
     console.log('Error');
     return console.log(err);
    }
    getSalario(id,(err,salario)=>{
        if (err) {
            console.log('Error');
            return console.log(err);
           }
           console.log('Salario existe');
           console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
    })
 })

