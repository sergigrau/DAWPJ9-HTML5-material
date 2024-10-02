window.onload = function () {
    function draw() {
        let canvas = document.getElementById('tutorial');
        let context = canvas.getContext('2d');
        context.fillStyle = 'rgb(255, 0, 0)';
        context.strokeStyle = 'rgb(0, 0, 0)';

        let imatge = new Image();
        imatge.src = "html5.png";
        //esperem a la càrrega de la imatge
        imatge.onload = function () {
            context.drawImage(imatge, 0,100, 50, 50);
            context.drawImage(imatge, 100,0, 50, 50);
            context.drawImage(imatge, 100,100, 50, 50);
        }

    }

    draw();


}