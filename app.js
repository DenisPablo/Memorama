let url = "http://hp-api.herokuapp.com/api/characters";
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));

const mostrarData = (data) => {
  //console.log(data);
  let cartas = [];
  let cantidadPersonajes = 0;
  let id = 0;
  tablero = document.getElementById("tablero");

  while (cantidadPersonajes < 5) {
    let n = Math.round(Math.random() * 403);

    if (data[n].image != "") {
      let carta = `<div class='carta' id=${id++}>
      <img src="${data[n].image}"/>
      <h1>${data[n].name}</h1> 
    </div>`;

    let cartaDuplicada = `<div class='carta' id=${id++}>
    <img src="${data[n].image}"/>
    <h1>${data[n].name}</h1> 
  </div>`;

      cartas.push(carta);
      cartas.push(cartaDuplicada);
      cartas.sort(() => 0.5 - Math.random());
      cantidadPersonajes++;
    } else {
      continue;
    }
  }
  // Mescla de cartas
  imprimirCartas(cartas);
  //voltearTodasCartas();
  //voltearCarta(0);
};

function voltearCarta(id) {
  let reversoDeCarta = `<div class='reverso'>
  <img src="${"interrogacion.png"}"/>
  </div>`;

  document.getElementById(id).innerHTML = reversoDeCarta;
}

function voltearTodasCartas(cartas) {
  for (let i = 0; i < 10; i++) {
    voltearCarta(i);
  }
}

function imprimirCartas(cartas) {
  for (let carta of cartas) {
    tablero.innerHTML += carta;
  }
}
