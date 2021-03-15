// -----> MOSTRAR NOTICIAS:
function mostrarDatos() {
    //vaciarContenido(); // Vacio el contenido html
    //agregarTitulo("SECCION"); // Agrego el titulo
    // Obtengo los elementos de la api con la pagina
    obtenerDatos(
        `https://covid-api.mmediagroup.fr/v1/history?country=Argentina&status=confirmed`,
        agregarDiariosAlHTML
    );
    obtenerDatos(
        `https://covid-api.mmediagroup.fr/v1/cases?country=Argentina`,
        agregarTotalesAlHTML
    );
}

// ---> FUNCION QUE CREA UN NUEVO OBJETO XMLHTTP REQUEST, Y HACE LA CONEXIÓN CON LA API MEDIANTE UN GET(URL)
// OBTIENE DEL RESPONSE UN ARRAY DE ELEMENTOS, LO RECORRE A MEDIDA QUE AGREGA AL HTML CON LA CALLBACK
function obtenerDatos(url, callback) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let elemento = JSON.parse(xhttp.responseText).All;
            callback(elemento);
            console.log(elemento);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// --> FUNCION QUE RECIBE UN ELEMENTO dato, e inserta su info en el html
function agregarDiariosAlHTML(elemento) {
    /* Div a replicar:
      <i>Icono carga</i>
      <h5> Numero </h5>
      <p> Fecha última actualización:</p>
      */
    let ubicacion = document.getElementsByClassName("info-covid")[0];
    let ultimaFecha = Object.keys(elemento.dates)[0];
    let anteUltimaFecha = Object.keys(elemento.dates)[1];
    //console.log(ultimaFecha);
    let numeroDiario = Number(elemento.dates[ultimaFecha]) - Number(elemento.dates[anteUltimaFecha]);
    ubicacion.innerHTML = `<div class="card-covid">
    <div class="frente">
      <h3 class="text-center">Casos diarios <br> confirmados<h3/>
      <img class="imagen-covid" src="https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png"/>
    </div>
    <div class="dorso">
      <h2 class="text-center dato-covid">${String(numeroDiario)}</h2>
      <p class="text-center fecha-covid">Última actualización:<br> ${Object.keys(elemento.dates)[0]}</p>
    </div>
  </div>`;
}

// --> FUNCION QUE RECIBE UN ELEMENTO dato, e inserta su info en el html
function agregarTotalesAlHTML(elemento) {
    /* Div a replicar:
      <i>Icono carga</i>
      <h5> Numero </h5>
      <p> Fecha última actualización:</p>
      */

    let fechaActual = elemento.updated.substr(0, 10);
    let ubicacionConfirmados = document.getElementsByClassName("info-covid")[1];
    ubicacionConfirmados.innerHTML = `<div class="card-covid">
    <div class="frente">
      <h3 class="text-center">casos Totales <br> confirmados<h3/>
      <img class="imagen-covid" src="https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png"/>
    </div>
    <div class="dorso">
      <h2 class="text-center dato-covid">${elemento.confirmed}</h2>
      <p class="text-center fecha-covid">Última actualización:<br> ${fechaActual}</p>
    </div>
    </div>`;

    let ubicacionRecuperados = document.getElementsByClassName("info-covid")[2];
    ubicacionRecuperados.innerHTML = `<div class="card-covid">
    <div class="frente">
      <h3 class="text-center">casos Totales <br> recuperados<h3/>
      <img class="imagen-covid" src="https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png"/>
    </div>
    <div class="dorso">
      <h2 class="text-center dato-covid">${elemento.recovered}</h2>
      <p class="text-center fecha-covid">Última actualización:<br> ${fechaActual}</p>
    </div>
  </div>`;
}

window.onload = mostrarDatos;