const mainCanvas =document.querySelector('canvas');
mainCanvas.style.display = 'none';

const loading = document.getElementById('loading')
const loadingtab = new TextFlow(loading);
loadingtab.setText("Loading...")
window.addEventListener('load', function() {
    setTimeout(() => {  
        mainCanvas.style.display = 'block';
        loading.style.display = 'none';
        animate();
    }, 200);
});