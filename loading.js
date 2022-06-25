const mainCanvas =document.querySelector('canvas');
mainCanvas.style.display = 'none';

const loading = document.getElementById('loading');
const buttonStart = document.getElementById('start');
function GameStart () {
    loading.style.display = 'none';
    buttonStart.style.display = 'none';
    mainCanvas.style.display = 'block';
    animate();
}

buttonStart.onclick = GameStart;

/* Old loading bar - in case i need it some time
window.addEventListener('load', function() {
    setTimeout(() => {  
        mainCanvas.style.display = 'block';
        loading.style.display = 'none';
        animate();
    }, 500);
});
*/