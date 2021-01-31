const nom = 'quadrat';

function dibuixar(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}

function aleatori(min, max) {
   let num = Math.floor(Math.random() * (max - min)) + min;
   return num;
}

function obtenirArea(length, listId) {
  let listItem = document.createElement('li');
  listItem.textContent = `${nom} area es ${length * length}px quadrades.`

  let list = document.getElementById(listId);
  list.appendChild(listItem);
}

function obtenirPerimetre(length, listId) {
  let listItem = document.createElement('li');
  listItem.textContent = `${nom} perimetre es ${length * 4}px.`

  let list = document.getElementById(listId);
  list.appendChild(listItem);
}

function dibuixarQuadrat(ctx) {
  let color1 = aleatori(0, 255);
  let color2 = aleatori(0, 255);
  let color3 = aleatori(0, 255);
  let color = `rgb(${color1},${color2},${color3})`
  ctx.fillStyle = color;

  let x = aleatori(0, 480);
  let y = aleatori(0, 320);
  let length = aleatori(10, 100);
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}

export { nom as name, dibuixar as dibuixar, obtenirArea as obtenirArea, obtenirPerimetre as obtenirPerimetre };
export default dibuixarQuadrat;