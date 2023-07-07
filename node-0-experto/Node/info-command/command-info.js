/* 
* Si no se envia nada desde la consola
* la ruta del ejecutable node
* se obtiene el path del archivo
*/
console.clear();
// visualizar lo que se envia en consola
console.log(process.argv);

// mostrar el valor que se envia en consola
// arg3 = 'base=5' => se puede enviar un valor por defecto
const [, ,arg3 = 'base=5'] = process.argv
// obtener el valor de --base=5
const [,base] = arg3.split('=')
console.log(base);
