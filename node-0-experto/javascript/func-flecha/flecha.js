// función básica
function sumar(a,b) {
    return a+b;
}
console.log('función básica '+sumar(5,2));

// función flecha
const sumar2 = (a,b) => {
    return a+b
}

console.log('función flecha '+sumar2(5,2));

// función flecha resumida
const sumar3 = (a,b) => a+b;
console.log('función flecha resumida '+sumar3(5,2));