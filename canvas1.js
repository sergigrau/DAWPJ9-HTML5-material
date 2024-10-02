window.onload = function () {
    function draw() {
        let canvas = document.getElementById('tutorial');
        let context = canvas.getContext('2d');
        context.fillStyle = 'rgb(255, 0, 0)';
        context.strokeStyle = 'rgb(0, 0, 0)';
        let angleinicial = 0;
        let anglefinal = 360;
        context.arc(0, 0, 100, angleinicial * Math.PI / 180, anglefinal * Math.PI / 180, false);
        context.stroke();
        context.fill()
    }
    
    draw();
    

}