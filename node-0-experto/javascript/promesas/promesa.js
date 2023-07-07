const empleados = [
    {id: 1,nombre: 'Joaquin'},
    {id: 2,nombre: 'Alicia'},
    {id: 3,nombre: 'Salome'},
];
const salarios = [
    {id:1,salario:1000},
    {id:2,alario:1500},
    {id:3,salario:2000},
]

// Promesas
const getEmpleados = (id,callback) =>{
    // retornar directamente la promesa
    return new Promise((resolve,reject)=>{
        const empleado = empleados.find(e=>e.id===id)?.nombre;
        // condicional ternario
        (empleado) ? resolve(empleado) :   reject(`No existe empleado con id ${id}`)
    });
}

const getSalario =(id,callback)=> {
    return new Promise((resolve,reject)=>{
        const salario = salarios.find(s=>s.id===id)?.salario;
        (salario) ? resolve(salario) : reject(`No existe salario con id ${id}`)
    });
}

const id =1
getEmpleados(id)
    .then(empleado=> {
        getSalario(id)
            .then(salario=> {
                console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
            })
            .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))