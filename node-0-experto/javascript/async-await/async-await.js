const empleados = [
    { id: 1, nombre: 'Joaquin' },
    { id: 2, nombre: 'Alicia' },
    { id: 3, nombre: 'Salome' },
];
const salarios = [
    { id: 1, salario: 1000 },
    { id: 2, alario: 1500 },
    { id: 3, salario: 2000 },
]

// Promesas
const getEmpleados = (id, callback) => {
    // retornar directamente la promesa
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        // condicional ternario
        (empleado) ? resolve(empleado) : reject(`No existe empleado con id ${id}`)
    });
}

const getSalario = (id, callback) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(s => s.id === id)?.salario;
        (salario) ? resolve(salario) : reject(`No existe salario con id ${id}`)
    });
}

const id = 10;

// await debe estar en una función
const getInfoUser = async () => {

    try {
        const empleado = await getEmpleados(id);
        const salario = await getSalario(id);
        return `El salario del empleado ${empleado} y su salario es: ${salario}`
    } catch (error) {
        // asi un valor este bien ejecuta el error del catch de la función
        throw error;
    }

}

getInfoUser(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))