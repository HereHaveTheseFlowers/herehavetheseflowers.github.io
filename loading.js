const mainCanvas = document.querySelector('canvas');
const transition = document.getElementById('transition');
const loading = document.getElementById('loading');
const loadingtext = document.getElementById('loadingcontent');
const loadingtextflow = new TextFlow(loadingtext);
loadingtextflow.setText("Don't Eat Your Friend!", 30)
const buttonStart = document.getElementById('start');

window.addEventListener('load', function() {
    buttonStart.style.display = 'block';
});

function GameStart () {
    transition.style.opacity = 1;
    setTimeout(() =>  {
    transition.style.opacity = 0;
    loading.style.display = 'none'
    mainCanvas.style.display = 'block'
    animate();
    }, 1000);
}

buttonStart.onclick = GameStart;
