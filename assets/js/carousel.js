function mostrarUltimasNoticias() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let noticias = JSON.parse(xhttp.responseText).articles;
            for (let index = 0; index < 4; index++) {
                agregarAlCarousel(noticias[index], index);
            }
        }
    };
    xhttp.open("GET", `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEY}&categories=ULTIMAS_NOTICIAS&providers=Telam&search=Buenos%2CAires+-coronavirus+-vacuna+-salud+-paciente`, true);
    xhttp.send();
};

function agregarAlCarousel(noti, indice) {
    let imagen = document.getElementsByClassName('d-block w-100')[indice];
    imagen.src = "./assets/img/noticias ba.jpg";
    if (noti.imageUrl != null) {
        imagen.src = noti.imageUrl;
    }
    let descripcion = document.getElementsByClassName("carousel-caption d-none d-md-block")[indice];
    descripcion.innerHTML = `<h3>${noti.title}</h3>
    <p>${noti.description}</p>`
}
window.onload = mostrarUltimasNoticias;