const mainCanvas =document.querySelector('canvas');

const loading = document.getElementById('loading');
const loadingtext = document.getElementById('loadingcontent');
const loadingtextflow = new TextFlow(loadingtext);
loadingtextflow.setText("Don't Eat Your Friend!", 30)
const buttonStart = document.getElementById('start');

window.addEventListener('load', function() {
    buttonStart.style.display = 'block';
});

function GameStart () {
    loading.style.display = 'none';
    mainCanvas.style.display = 'block';
    animate();
}

buttonStart.onclick = GameStart;
