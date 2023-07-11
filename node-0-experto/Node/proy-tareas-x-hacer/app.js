require('colors')
const {mostrarMenu, pausa} = require('./helpers/message')

console.clear();

const main = async() => {
    
    let opt = ''
    do {
        // retorna un valor de la promesa
        opt = await mostrarMenu();
        console.log({opt});
        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main()