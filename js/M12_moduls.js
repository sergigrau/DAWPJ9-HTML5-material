import { crear, crearInforme } from './moduls/canvas.js';
import { name, dibuixar, obtenirArea, obtenirPerimetre } from './moduls/quadrat.js';
import dibuixarQuadrat from './moduls/quadrat.js';

let myCanvas = crear('canvas', document.body, 480, 320);
let reportList = crearInforme(myCanvas.id);

let square1 = dibuixar(myCanvas.ctx, 50, 50, 100, 'blue');
obtenirArea(square1.length, reportList);
obtenirPerimetre(square1.length, reportList);

// Use the default
let square2 = dibuixarQuadrat(myCanvas.ctx);