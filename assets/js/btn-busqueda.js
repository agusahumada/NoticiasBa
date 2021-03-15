// VARIABLES
const APIKEYY = "c061132750a34157b09b592c13d9c612";
const FORMBUSQUEDA = document.querySelector(".form-search");
const DIVMENSAJE = document.getElementById("mensaje");

// EVENTS
FORMBUSQUEDA.addEventListener("submit", buscarNoticia);

// FUNCIONES
function buscarNoticia(e) {
  e.preventDefault();

  //obtener datos del formulario
  const noticia = document.getElementById("noticia").value;
  agregarTitulo(`Resultados para: ${noticia}`);
  obtenerElementos(
    `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEYY}&providers=Clarin%2CPagina12%2CLaNacion%2CCronica%2CTelam&search=${noticia}`,
    agregarNoticiaAlHTML
  );

  //   vacia el body
  vaciarContenido();
}

//   Consultar API
function obtenerElementos(url, callback) {
  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let elementos = JSON.parse(xhttp.responseText).articles;
      for (elemento of elementos) {
        callback(elemento);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
