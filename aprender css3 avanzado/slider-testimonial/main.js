let slider = document.querySelector('.slider-contenedor');
let sliderInd = document.querySelectorAll('.slider-test');
let contador = 1;
let tamWidth = sliderInd[0].clientWidth;
let interval = 3000;

window.addEventListener('resize',function(){
    tamWidth = sliderInd[0].clientWidth;
})

setInterval(function tiempo(){
    slides();
}, interval)

function slides(){
    slider.style.transform = 'translate('+(- tamWidth * contador)+'px';
    slider.style.transition = 'transform 0.5s';
    contador++;
    if (contador == sliderInd.length){
        contador = 0;
        setTimeout(function(){
            slider.style.transform = 'translate(0px)';
            slider.style.transition = 'transform 0s';
        },interval)
    }
}