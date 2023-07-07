window.addEventListener('scroll',function(){
    let animacion = document.getElementById('animado');
    let posicionobj1 = animacion.getBoundingClientRect().top;
    console.log(posicionobj1);
    let tamPantalla = window.innerHeight/3.5;
    console.log(tamPantalla);

    if (posicionobj1 < tamPantalla){
        animacion.style.animation = 'mover 1s infinite'
    }
})