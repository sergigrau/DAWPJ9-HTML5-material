function determinaRang(i, amplada, alcada) {
	return ((i >= 0) && (i < amplada * alcada * 4));
}

function calculaZones(dadesImatge, amplada, alcada, i) {
	var v = dadesImatge[i];
	
	var north = determinaRang(i - amplada * 4, amplada, alcada) ? dadesImatge[i - amplada * 4] : v;
	var south = determinaRang(i + amplada * 4, amplada, alcada) ? dadesImatge[i + amplada * 4] : v;
	var west = determinaRang(i - 4, amplada, alcada) ? dadesImatge[i - 4] : v;
	var east = determinaRang(i + 4, amplada, alcada) ? dadesImatge[i + 4] : v;
	
	var ne = determinaRang(i - amplada * 4 + 4, amplada, alcada) ? dadesImatge[i - amplada * 4 + 4] : v;
	var nw = determinaRang(i - amplada * 4 - 4, amplada, alcada) ? dadesImatge[i - amplada * 4 - 4] : v;
	var se = determinaRang(i + amplada * 4 + 4, amplada, alcada) ? dadesImatge[i + amplada * 4 + 4] : v;
	var sw = determinaRang(i + amplada * 4 - 4, amplada, alcada) ? dadesImatge[i + amplada * 4 - 4] : v;
	
	var newVal = Math.floor((north + south + east + west + se + sw + ne + nw + v) / 9);
	if(isNaN(newVal)) {
		enviarEstat("valor incorrecte " + i + " per alçada " + alcada);
		throw new Error("NaN");
	}
	return newVal;
}

function boxBlur(dadesImatge, amplada, alcada) {
	var data = [];
	var val = 0;
	for(var i = 0; i < amplada * alcada * 4; i++) {
		val = calculaZones(dadesImatge, amplada, alcada, i);
		data[i] = val;
	}
	return data;
}