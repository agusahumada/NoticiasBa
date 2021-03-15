const APIKEY = "c061132750a34157b09b592c13d9c612";
let btnDeportes = document.getElementById("deportes");
btnDeportes.addEventListener("click", deportes, false);
let btnEspectaculos = document.getElementById("cultura");
btnEspectaculos.addEventListener("click", cultura, false);
let btnSalud = document.getElementById("novedades");
btnSalud.addEventListener("click", salud, false);

// -----> MOSTRAR NOTICIAS DEPORTES:
function deportes() {
    vaciarContenido(); // Vacio el contenido html
    agregarTitulo("DEPORTES"); // Agrego el titulo
    // Obtengo los elementos de la api con la pagina
    obtenerElementos(
        `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEY}&categories=DEPORTES&providers=Clarin%2CPagina12%2CLaNacion%2CCronica%2CTelam`,
        agregarNoticiaAlHTML
    );
}

// -----> MOSTRAR NOTICIAS ESPECTACULOS :
function cultura() {
    vaciarContenido(); // Vacio el contenido html
    agregarTitulo("CULTURA"); // Agrego el titulo
    // Obtengo los elementos de la api con la pagina
    obtenerElementos(
        `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEY}&categories=CULTURA&providers=Clarin%2CTN%2CDiarioPopular%2CTiempoArgentino%2CPagina12%2CLaNacion%2CCronica%2CTelam&search=arte+show+museo+obra+musica+cine+libro+pelicula+escritor+musico`,
        agregarNoticiaAlHTML
    );
}

// -----> MOSTRAR NOTICIAS ECONOMIA :
function salud() {
    vaciarContenido(); // Vacio el contenido html
    agregarTitulo("SALUD"); // Agrego el titulo
    // Obtengo los elementos de la api con la pagina
    obtenerElementos(
        `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEY}&categories=SALUD&providers=Clarin%2CInfobae%2CTiempoArgentino%2CPagina12%2CLaNacion%2CCronica%2CTelam`,
        agregarNoticiaAlHTML
    );
}

// ---> FUNCION QUE CREA UN NUEVO OBJETO XMLHTTP REQUEST, Y HACE LA CONEXIÓN CON LA API MEDIANTE UN GET(URL)
// OBTIENE DEL RESPONSE UN ARRAY DE ELEMENTOS, LO RECORRE A MEDIDA QUE AGREGA AL HTML CON LA CALLBACK
function obtenerElementos(url, callback) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

// --> FUNCION QUE RECIBE UN ELEMENTO NOTICIA, CREA UNA CARD CON SUS ATRIBUTOS Y LO INSERTA EN EL HTML
function agregarNoticiaAlHTML(noticia) {
    /* Div a replicar:
      <div class="card col-lg-4 col-md-6 col-sm-12">
          <img src="./assets/img/ejemploNoticia.png" class="card-img-top imagen-noticia" alt="img-noticia">
          <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-dark">Go somewhere</a>
          </div>
          <div class="card-footer text-muted">
              Publicado 2 days ago
          </div>
      */

    let preguntas = document.getElementsByClassName("preguntas-frecuentes")[0];
    let contenedorCovid = document.getElementById("contenedor-covid");
    if (filename() == "covid.html" || filename() == "covid.html#") {
        preguntas.innerHTML = "";
        contenedorCovid.innerHTML = "";
    }

    //Creo un div card
    let card = document.createElement("div");
    card.classList.add("card", "col-lg-4", "col-md-6", "col-sm-12", "mb-5");
    // Creo la imagen y le asigno sus atributos
    let imagenCard = document.createElement("img");
    imagenCard.classList.add("card-img-top", "imagen-noticia");
    let imagenSrc = "./assets/img/ejemploNoticia.png";
    if (noticia.imageUrl != null) {
        imagenSrc = noticia.imageUrl;
    }
    imagenCard.src = imagenSrc;
    imagenCard.alt = `Noticia de ${noticia.provider.name}`;
    // Creo el div body
    let bodyCard = document.createElement("div");
    bodyCard.classList.add("card-body");
    // Creo el contenido del card body con inner html:
    let descripcion = "";
    if (noticia.description != null) {
        descripcion = noticia.description;
    }
    bodyCard.innerHTML = `<h5 class="card-title">${noticia.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Fuente: ${noticia.provider.name}</h6>
        <p class="card-text">${descripcion}</p>
        <a href="${noticia.sourceUrl}" target=_blank class="btn btn-dark">Leer más</a>`;
    // Creo el div footer
    let footerCard = document.createElement("div");
    footerCard.classList.add("card-footer", "text-muted");
    footerCard.innerText = `Publicado el: ${noticia.publishedAt.slice(0, 10)}`;
    // appendeamos
    card.appendChild(imagenCard);
    card.appendChild(bodyCard);
    card.appendChild(footerCard);

    // Traigo el div donde voy a insertar la card, y appendeamos
    let ubicacion = document.getElementById("contenedor-noticias");

    ubicacion.appendChild(card);
}

// --> FUNCION QUE VACIA EL CONTENIDO DEL BODY HTML PARA MOSTRAR NUEVA INFORMACION
function vaciarContenido() {
    var div = document.getElementById("contenedor-noticias"); // Traigo el contenedor
    while (div.firstChild) {
        // Mientras tenga contenido dentro
        div.removeChild(div.firstChild); // Elimino ese contenido
    }

    eliminarCarousel(); // Elimino el carousel del inicio
}

// --> FUNCION QUE ELIMINA EL CAROUSEL DEL INICIO
function eliminarCarousel() {
    var carousel = document.getElementById("carouselExampleCaptions"); // Traigo el div del carousel
    while (carousel.firstChild) {
        // Mientras haya contenido dentro
        carousel.removeChild(carousel.firstChild); // lo elimino
    }
}

// --> FUNCION QUE RECIBE EL NOMBRE DE LA SECCION Y LE ASIGNA ESE CONTENIDO AL H1 DE LA PAGINA
function agregarTitulo(titulo) {
    if (document.getElementsByClassName("titulo-seccion").length != 0) {
        document.getElementsByClassName("titulo-seccion")[0].innerText = titulo;
    } else {
        let h1 = document.createElement("h1"); // Creo el titulo
        h1.classList.add("text-center", "titulo-seccion");
        h1.innerText = titulo; // Le agrego el contenido
        let contenedor = document.getElementsByClassName("wrapper-general")[0];
        let contenedorCards = document.getElementById("contenedor-noticias");
        contenedor.insertBefore(h1, contenedorCards);
    }
}

function filename() {
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
    return rutaRelativa;
}