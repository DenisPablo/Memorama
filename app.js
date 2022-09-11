let url = "http://hp-api.herokuapp.com/api/characters";

fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));

function mostrarData(data) {
  let cartas = [];
  let cantidadPersonajes = 0;
  let id = 0;

  while (cantidadPersonajes < 12) {
    let n = Math.round(Math.random() * 403);

    if (data[n].image != "") {
      id++;
      let carta = `<td><button id="${id}" class="carta" onclick="voltear(${id})"><img src="${data[n].image}"></img></button></td>`;

      let cartaDuplicada = `<td><button id="${id}" class="carta" onclick="voltear(${id})"><img src="${data[n].image}"></img></button></td>`;

      cartas.push(carta);
      cartas.push(cartaDuplicada);
      cartas.sort(() => 0.5 - Math.random());
      cantidadPersonajes++;
    } else {
      continue;
    }
  }
  imprimirCartas(cartas);
}

function imprimirCartas(cartas) {
  let filas = 0;
  let columna = 0;
  let tr = document.getElementById("columna_0");
  let htmlColumnas = ["columna_1", "columna_2", "columna_3", "columna_4"];

  for (let carta of cartas) {
    if (filas < 4) {
      tr.innerHTML += carta;
      filas++;
    } else {
      filas = 0;
      tr = document.getElementById(htmlColumnas[columna++]);
    }
  }
}
// Logica del juego

let cartasVolteadas = 0;
let carta_1;
let carta_2;
let resultado_1;
let resultado_2;

function voltear(id) {
  let element = document.getElementById(id);
  cartasVolteadas++;

  if (cartasVolteadas == 1) {
    resultado_1 = element;
    carta_1 = id;
  } else if (cartasVolteadas == 2) {
    resultado_2 = element;
    carta_2 = id;
    cartasVolteadas = 0;
    verificarGanador();
    return id;
  }
}

function verificarGanador() {
  console.log(resultado_1);
  console.log(resultado_2);

  if (carta_1 == carta_2) {
    console.log("Adivinaste");
  } else {
    console.log("No adivinaste");
  }
}
