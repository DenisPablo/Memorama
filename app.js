function comenzar() {
  let url = "http://hp-api.herokuapp.com/api/characters";

  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      mostrarData(data.filter((personaje) => personaje.image != ""))
    )
    .catch((error) => console.log(error));

  document.getElementById("inicio").style.display = "none";
  //quedaTiempo = true;
}

function mostrarData(data) {
  let cartas = [];
  let cartasFinal = [];
  let id = 0;
  let id_carta = 0;

  while (id < 10) {
    let carta = `<td><div id="a_${id}" class="carta" onclick="voltear('a_',${id} )"><img src="${data[id].image}"></div></td>`;
    let cartaDuplicada = `<td><div id="b_${id}" class="carta" onclick="voltear('b_',${id} )"><img src="${data[id].image}"></div></td>`;
    //console.log(id);
    id++;
    cartas.push(carta);
    cartas.push(cartaDuplicada);
  }
  // Mescla e impresion de cartas
  cartas.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 5; i++) {
    let tr = `<tr>${cartas[id_carta++]}${cartas[id_carta++]}${
      cartas[id_carta++]
    }${cartas[id_carta++]}</tr>`;

    cartasFinal.push(tr);
  }

  cartasFinal.sort(() => Math.random() - 0.5);
  console.log(cartasFinal);
  imprimirCartas(cartasFinal);
}

function imprimirCartas(cartas) {
  for (let carta of cartas) {
    document.getElementById("tablero").innerHTML += carta;
  }
}

// Logica del juego

let contadorVolteos = 0;
let carta_1;
let carta_2;
let id_1;
let id_2;
let cantAciertos = 0;
let cantIntentos = 0;
// control de tiempo

let quedaTiempo = false;
let minutos = 5;
let segundos = 59;

//setInterval(contador, 1000);
setInterval(iniciar, 1000);

function voltear(letra, num) {
  contadorVolteos++;
  cantIntentos++;
  quedaTiempo = true;

  if (contadorVolteos == 1) {
    carta_1 = letra + num;
    id_1 = num;
    revelar(carta_1);
  } else if (contadorVolteos == 2) {
    document.getElementById("tablero").style.pointerEvents = "none";
    carta_2 = letra + num;
    id_2 = num;
    revelar(carta_2);
    verificarCoincidencias();
    contadorVolteos = 0;
  }

  document.getElementById("movimientos").innerHTML = `Movimientos: ${Math.round(
    cantIntentos / 2
  )}`;
}

function verificarCoincidencias() {
  document.getElementById("tablero").style.pointerEvents = "none";
  if (id_1 == id_2 && carta_1 != carta_2 && quedaTiempo) {
    cantAciertos++;
    document.getElementById("aciertos").innerHTML = `Aciertos: ${cantAciertos}`;

    if (cantAciertos == 10) {
      ganar();
    }

    setTimeout(eliminarCartas, 500);
  } else if (id_1 != id_2 || carta_1 == carta_2) {
    setTimeout(ocultar, 1000);
  }
}

// funciones para uso

function revelar(carta) {
  document.getElementById(carta).className = "revelada";
}
function ocultar() {
  document.getElementById(carta_1).className = "carta";
  document.getElementById(carta_2).className = "carta";
  document.getElementById("tablero").style.pointerEvents = "all";
}

function eliminarCartas() {
  document.getElementById(carta_1).style.opacity = 0;
  document.getElementById(carta_2).style.opacity = 0;
  document.getElementById("tablero").style.pointerEvents = "all";
}

function ganar() {
  document.getElementById(
    "tablero"
  ).innerHTML = `<div id="final"><h1>¡¡¡Felicitaciones has ganado!!!</h1> 
  <p>Te a tomado: ${cantIntentos} intentos<p></div>`;

  document.getElementById("s2").style.opacity = 0;
}

function perder() {
  document.getElementById(
    "tablero"
  ).innerHTML = `<div id="final"><h1>¡¡¡El tiempo a finalizado!!</h1> 
  <p>Has perdido.<p></div>`;

  document.getElementById("s2").style.opacity = 0;
}

function contador() {
  document.getElementById(
    "t-restante"
  ).innerHTML = `Tiempo restante: 0${minutos}:${segundos--}`;

  if (minutos != 0 && segundos == 0) {
    minutos--;
    segundos = 59;
  } else if (minutos == 0 && segundos == 0) {
    perder();
  }
}

function iniciar() {
  if (quedaTiempo) {
    contador();
  }
}
