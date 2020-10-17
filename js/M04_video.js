/*
 * Programa HTML5 que de manera automàtica mostra instantànies d'un vídeo encastat.
 * Utilitza contingut de la xarxa, o un servidor d'streaming
 * @author sergi.grau@fje.edu
 * @version 2.0
 * date 19.01.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 19.01.2017
 * - programa que mostra com es pot treballar amb l'API video
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

 var interval = 5000;

  // Mida de la instantània
  var ampladaInstantania = 100;
  var alturaInstantania = 75;

  // files i columnes del timeline
  var nombreFiles = 4;
  var nombreColumnes = 4;
  var graella = nombreFiles * nombreColumnes;

  // comptador instantania
  var comptadorInstantania = 0;

  // to cancel the timer at end of play
  var intervalId;

  var videoIniciat = false;

  function iniciVideo() {

    // posa en marxa el timer només el primer cop
    if(videoIniciat)
      return;
    videoIniciat = true;

    // calcula una instantania incial i crea la resta segons el timer
    actualitzarCanvas();
    intervalId = setInterval(actualitzarCanvas, interval);

    // manegador per anar al punt del video en funció de la zona del canvas polsada
    var timeline = document.getElementById("timeline");
    timeline.onclick = function(evt) {
      var offX = evt.layerX - timeline.offsetLeft;
      var offY = evt.layerY - timeline.offsetTop;

      // calcula la posició de la graella que s'ha polsat, index zero
      var posicio = Math.floor(offY / alturaInstantania) * frameRows;
      posicio += Math.floor(offX / ampladaInstantania);

      // calcula el temps de la instantania seleccionada
      var instantaniaSeleccionada = (((Math.floor(comptadorInstantania / graella)) * graella) + posicio);

      // arrodoniment en funció d'on es polsa
      if(posicio > (comptadorInstantania % 16))
        instantaniaSeleccionada -= graella;

      // no podem seleccionar valors anteriors a zero
      if(instantaniaSeleccionada < 0)
        return;

      // cerquem el tros de video que correspon
      var video = document.getElementById("movies");
      video.currentTime = instantaniaSeleccionada * tempsActualitzacio / 1000;
      comptadorInstantania = instantaniaSeleccionada;
    }
  }

  // dibuixa una instantània en el canvas
  function actualitzarCanvas() {
    var video = document.getElementById("movies");
    var timeline = document.getElementById("timeline");

    var ctx = timeline.getContext("2d");

    // calcula la posció actual basat en el comptador d'instantanies
    // i dibuixa la imatge a partir del video
    var posicioInstantania = comptadorInstantania % graella;
    var x = (posicioInstantania % nombreColumnes) * ampladaInstantania;
    var y = (Math.floor(posicioInstantania / nombreFiles)) * alturaInstantania;
    ctx.drawImage(video, 0, 0, 400, 300, x, y, ampladaInstantania, alturaInstantania);
    comptadorInstantania++;
  }

  // atura la creació d'instantànies
  function parar() {
    clearInterval(intervalId);
  }
