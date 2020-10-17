/*
 * aplicació node.js que fa us de SSE, per generar un push al client
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 21.02.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.02.2017
 * - aplicació node.js que fa us de SSE, per generar un push al client
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

var http = require('http');
var url = require('url');
var sys = require('util');
var fs = require('fs');
var nombres = [];

http.createServer(function (req, res) {

	var pathname = url.parse(req.url).pathname;

	if (req.headers.accept && req.headers.accept == 'text/event-stream') {
		if (req.url == '/events') {
			sendSSE(req, res);
		} else {
			res.writeHead(404);
			res.end();
		}
	}
	else if (pathname == '/css/estils.css') {
		res.writeHead(200, {
			"Content-Type": "text/html; charset=utf-8"
		});

		fs.readFile('./css/estils.css', function (err, sortida) {
			res.writeHead(200, {
				'Content-Type': 'text/css'
			});

			res.write(sortida);
			res.end();
		});
	}
	else {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.write(fs.readFileSync(__dirname + '/M11_server_sent_events.html'));
		res.end();
	}
}).listen(8888);

function sendSSE(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	var id = (new Date()).toLocaleTimeString();
	// envia un SSE cada 5 segons
	var id = setInterval(function () {
		constructSSE(res, id, nombrePrimitiva());
		console.log(nombres.length);
		if (nombres.length == 6)
			clearInterval(id);
	}, 500);
}

function constructSSE(res, id, data) {
	res.write('id: ' + id + '\n');
	res.write("data: " + data + '\n\n');
}

function nombrePrimitiva() {
	var n;
	do (
		n = Math.ceil(Math.random() * 49)
	)
	while (estaContingut(n));

	nombres.push(n);

	return n;
}

function estaContingut(n) {
	for (i in nombres) {
		if (nombres[i] == n)
			return true;
	}
	return false;
}

