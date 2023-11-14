
document.addEventListener('DOMContentLoaded', function() {
    cargarFormularios();
});

function cargarFormularios() {
    fetch('formularios.json')
        .then(response => response.json())
        .then(data => mostrarFormularios(data))
        .catch(error => console.error('Error al cargar formularios:', error));
}

function mostrarFormularios(formularios) {
    var listaHTML = '<ul>';
    formularios.forEach(formulario => {
        listaHTML += `<li><button onclick="mostrarFormulario('${formulario.nombre}')">${formulario.nombre}</button></li>`;
    });
    listaHTML += '</ul>';
    document.getElementById('formularios-lista').innerHTML = listaHTML;
}

function mostrarFormulario(nombreFormulario) {
    
    fetch('formularios.json')
        .then(response => response.json())
        .then(data => mostrarRespuestas(data, nombreFormulario))
        .catch(error => console.error('Error al cargar respuestas:', error));
}

function mostrarRespuestas(formularios, nombreFormulario) {
    var formularioSeleccionado = formularios.find(formulario => formulario.nombre === nombreFormulario);

    if (formularioSeleccionado) {
        var respuestasHTML = '<h2>' + formularioSeleccionado.nombre + '</h2>';
        respuestasHTML += '<p>Descripción: ' + formularioSeleccionado.descripcion + '</p>';
        
        
        var contenidoHTML = formularioSeleccionado.contenidoHTML;
        respuestasHTML += '<div id="preguntasFormulario">' + contenidoHTML + '</div>';

        document.getElementById('formulario-respuestas').innerHTML = respuestasHTML;

        var enviarRespuestasBtn = document.createElement('button');
        enviarRespuestasBtn.textContent = 'Enviar Respuestas';
        enviarRespuestasBtn.addEventListener('click', function() {
           
        });

        document.getElementById('formulario-respuestas').appendChild(enviarRespuestasBtn);
    }
}



