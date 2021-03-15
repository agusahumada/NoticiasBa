window.addEventListener("DOMContentLoaded", function() {
    // Traigo los elementos del HTML
    var formulario = document.getElementById("form-contacto");
    var btnEnviar = document.getElementById("btn-enviar");
    var btnCancelar = document.getElementById("btn-cancelar");
    var estado = document.getElementById("estado");

    function enviado() {
        formulario.reset();
        btnEnviar.style = "display: none ";
        btnCancelar.innerHTML = 'Cerrar';
        btnCancelar.classList.remove('btn-danger');
        btnCancelar.classList.add('btn-secondary');
        estado.innerHTML = "Su mensaje fue enviado con éxito, gracias!";
    }

    function error() {
        estado.innerHTML = "Oops! Hubo un problema, intente otra vez.";
    }

    formulario.addEventListener("submit", function(ev) {
        ev.preventDefault();
        var data = new FormData(formulario);
        enviarFormulario(formulario.method, formulario.action, data, enviado, error);
    });
});

// helper function for sending an AJAX request

function enviarFormulario(metodo, url, data, enviado, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodo, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            enviado(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}