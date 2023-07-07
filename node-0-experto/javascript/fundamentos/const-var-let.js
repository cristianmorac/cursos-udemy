// crea la variable en un ambito global
var nombre = 'Wolverine'
console.log(nombre);

// const no se puede cambiar, excepturando los objetos 
const firstname = 'Pedro'

// const y let crear las variables en el scope
if (true) {
    const lastname = 'Victoria';
    let age = 22;
    console.log(`${lastname} ${age}`);
}

console.log(nombre);
console.log(firstname);