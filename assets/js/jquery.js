// $(document).ready(function () {
//   $("#estado").last().addClass("selected highlight");
// });
const APIKEYY = "c061132750a34157b09b592c13d9c612";
$(".form-search").bind("click", function buscarNoticia(event) {
  event.preventDefault();

  $("#noticia").val();
      gregarTitulo("Resultados para: ", noticia);
      obtenerElementos("https://api.jornalia.net/api/v1/articles?apiKey=${APIKEYY}&providers=Clarin%2CPagina12%2CLaNacion%2CCronica%2CTelam&search=${noticia}")
});

//     //obtener datos del formulario

 function buscarNoticia(e) {
   e.preventDefault();

   const noticia = document.getElementById("noticia").value;
   agregarTitulo(`Resultados para: ${noticia}`);
//     obtenerElementos(
//       `https://api.jornalia.net/api/v1/articles?apiKey=${APIKEYY}&providers=Clarin%2CPagina12%2CLaNacion%2CCronica%2CTelam&search=${noticia}`,
//       agregarNoticiaAlHTML
//     );

//     //   vacia el body
//     vaciarContenido();
//   }
