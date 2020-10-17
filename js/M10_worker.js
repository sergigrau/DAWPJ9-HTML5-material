importScripts("M10_worker_logica.js");
function enviarEstat(statusText) {
	postMessage({
		"tipus" : "status",
		"statusText" : statusText
	});
}

function gestorMissatge(e) {
	var tipusMissatge = e.data.tipus;
	switch (tipusMissatge) {
		case ("blur"):
			enviarEstat("Worker treballant en el rang: " + e.data.iniciX + "-" + (e.data.iniciX + e.data.amplada));
			var dadesImatge = e.data.dadesImatge;
			dadesImatge = boxBlur(dadesImatge, e.data.amplada, e.data.alcada, e.data.iniciX);
			postMessage({
				"tipus" : "progres",
				"dadesImatge" : dadesImatge,
				"amplada" : e.data.amplada,
				"alcada" : e.data.alcada,
				"iniciX" : e.data.iniciX
			});
			enviarEstat("acabat efecte en el rang: " + e.data.iniciX + "-" + (e.data.amplada + e.data.iniciX));
			break;
		default:
			enviarEstat("Worker: " + e.data);
	}
}

addEventListener("message", gestorMissatge, true);
