// Objeto
const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'regeneración',
    edad: 0,
    getNombre () {
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}

// Desestructurar
const {nombre,apellido,poder} = deadpool
console.log(nombre,apellido,poder);

// Desestructurar una funcion
function imprimeHeroe ({nombre,apellido,poder}) {
    // se modifica el objeto
    nombre = 'Cristian';
    console.log(nombre,apellido,poder);
}
imprimeHeroe(deadpool)

// desestructurar arreglos
const heroes = ['Deadpool','Superman','Batman']
const [h1,h2,h3] = heroes
const [ , , m3] = heroes // mostrar el tercer valor, tambien se puede en objetos
console.log(h1,h2,h3);
