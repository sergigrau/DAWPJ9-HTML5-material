/*
 * programa que mostra com es pot treballar amb l'API web workers
 * manipula una imatge en segon pla
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 21.02.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.02.2017
 * - programa que mostra com es pot treballar amb l'API web workers
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */
		var imageURL = "imatges/html5.jpeg";
		var imatge;
		var ctx;
		var workers = [];
		function log(s) {
			var sortida = document.getElementById("sortida");
			sortida.innerHTML = s + "<br>" + sortida.innerHTML;
		}

		function assignarEstatExecucio(p) {
			
			document.getElementById("inici").disabled = p;
			document.getElementById("atura").disabled = !p;
		}

		function iniciarWorker(src) {
			var worker = new Worker(src);
			worker.addEventListener("message", gestorMissatge, true);
			worker.addEventListener("error", gestorError, true);
			return worker;
		}

		function iniciarEfecte() {
			var comptador = parseInt(document.getElementById("comptador").value);
			var width = imatge.width / comptador;
			for(var i = 0; i < comptador; i++) {
				var worker = iniciarWorker("js/M10_worker.js");
				worker.index = i;
				worker.width = width;
				workers[i] = worker;
				enviarTascaEfecte(worker, i, width);
			}
			assignarEstatExecucio(true);
		}

		function enviarTascaEfecte(worker, i, partAmplada) {
			var partAlcada = imatge.height;

			var partIniciX = i * partAmplada;
			var partIniciY = 0;
			var data = ctx.getImageData(partIniciX, partIniciY, partAmplada, partAlcada).data;
			worker.postMessage({
				'tipus' : 'blur',
				'dadesImatge' : data,
				'amplada' : partAmplada,
				'alcada' : partAlcada,
				'iniciX' : partIniciX
			});
		}

		function stopBlur() {
			for(var i = 0; i < workers.length; i++) {
				workers[i].terminate();
			}
			assignarEstatExecucio(false);
		}

		function gestorMissatge(e) {
			var tipusMissatge = e.data.tipus;
			switch (tipusMissatge) {
				case ("status"):
					log(e.data.statusText);
					break;
				case ("progres"):
					var dadesImatge = ctx.createImageData(e.data.amplada, e.data.alcada);
					for(var i = 0; i < dadesImatge.data.length; i++) {
						var val = e.data.dadesImatge[i];
						if(val === null || val > 255 || val < 0) {
							log("valor ilegal: " + val + " at " + i);
							return;
						}
						dadesImatge.data[i] = val;
					}
					ctx.putImageData(dadesImatge, e.data.iniciX, 0);
					enviarTascaEfecte(e.target, e.target.index, e.target.width);
					break;
				default:
					break;
			}
		}

		function gestorError(e) {
			log("error: " + e.message);
		}

		function carregarDadesImatge(url) {
			var canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d');
			imatge = new Image();
			imatge.src = url;
			document.getElementById("contenidor").appendChild(canvas);
			imatge.onload = function() {
				canvas.width = imatge.width;
				canvas.height = imatge.height;
				ctx.drawImage(imatge, 0, 0);
				window.imgdata = ctx.getImageData(0, 0, imatge.width, imatge.height);
				n = ctx.createImageData(imatge.width, imatge.height);
				assignarEstatExecucio(false);
				log("imatge carregada: " + imatge.width + "x" + imatge.height + " pixels");
			};
		}

		function carregar() {
			log("carregant dades imatge");
			if( typeof (Worker) !== "undefined") {
				document.getElementById("status").innerHTML = "El teu navegador suporta HTML5 Web Workers";
				document.getElementById("atura").onclick = stopBlur;
				document.getElementById("inici").onclick = iniciarEfecte;
				carregarDadesImatge(imageURL);
				document.getElementById("inici").disabled = true;
				document.getElementById("atura").disabled = true;
			}
		}


		window.addEventListener("load", carregar, true);