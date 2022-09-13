function comenzar() {
  let url = "http://hp-api.herokuapp.com/api/characters";

  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      mostrarData(data.filter((personaje) => personaje.image != ""))
    )
    .catch((error) => console.log(error));

  document.getElementById("inicio").style.display = "none";
}

comenzar();

function mostrarData(data) {
  let cartas = [];
  let id = 0;

  while (id < 10) {
    let carta = `<td><div id="a_${id}" onclick="voltear('a_',${id} )"><img src="${data[id].image}"></div></td>`;
    let cartaDuplicada = `<td><div id="b_${id}" onclick="voltear('b_',${id} )"><img src="${data[id].image}"></div></td>`;
    //console.log(id);
    id++;
    cartas.push(carta);
    cartas.push(cartaDuplicada);
  }
  // Mescla e impresion de cartas
  console.log(cartas);
  cartas.sort(() => Math.random() - 0.5);
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

let contadorVolteos = 0;
let carta_1;
let carta_2;
let id_1;
let id_2;

function voltear(letra, num) {
  contadorVolteos++;

  if (contadorVolteos == 1) {
    carta_1 = letra + num;
    id_1 = num;
  } else if (contadorVolteos == 2) {
    carta_2 = letra + num;
    id_2 = num;
    verificarCoincidencias();
    contadorVolteos = 0;
  }
}

function verificarCoincidencias() {
  if (id_1 == id_2) {
    console.log("adivinaste");
    console.log(carta_1);
    console.log(carta_2);
    document.getElementById(carta_1).innerHTML = "OK";
    document.getElementById(carta_2).innerHTML = "OK";
  }
}
