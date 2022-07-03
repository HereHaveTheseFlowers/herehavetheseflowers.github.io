const mainCanvas = document.querySelector('canvas');
const transition = document.getElementById('transition');
const loading = document.getElementById('loading');
const loadingtext = document.getElementById('loadingcontent');
const loadingtextflow = new TextFlow(loadingtext);
loadingtextflow.setText("Don't Eat Your Friend!", 30)
const buttonStart = document.getElementById('start');

window.addEventListener('load', function() {
    buttonStart.style.display = 'block';
    transition.style.opacity = 0;
});

function GameStart () {
    buttonStart.classList.add('non-clickable');
    transition.style.opacity = 1;
    setTimeout(() =>  {
        transition.style.opacity = 0;
        loading.style.display = 'none'
        mainCanvas.style.display = 'block'
        animate();
        setTimeout(() =>  {
            audio.Map.play();
            Game.state = "normal"
        }, 900);
    }, 900);
}

buttonStart.onclick = GameStart;
