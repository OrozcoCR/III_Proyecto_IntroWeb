
var preguntaCounter = 0;

window.onload = function () {
    agregarPregunta();  // Agrega la primera pregunta al cargar la página
};

function agregarPregunta() {
    var preguntaContainer = document.createElement("div");
    preguntaContainer.classList.add("preguntaContainer");

    // Crear campo de selección de tipo de pregunta
    var tipoPreguntaLabel = document.createElement("label");
    tipoPreguntaLabel.textContent = "Tipo de pregunta:";

    var tipoPreguntaSelect = document.createElement("select");
    tipoPreguntaSelect.name = "tipoPregunta" + (preguntaCounter + 1);
    tipoPreguntaSelect.id = "tipoPregunta" + (preguntaCounter + 1);
    tipoPreguntaSelect.addEventListener("change", cambiarTipoPregunta);
    // Agregar opciones de tipo de pregunta
    var opcionesTipo = ["Pregunta tipo 1", "Pregunta tipo 2", "Pregunta tipo 3"];
    for (var i = 0; i < opcionesTipo.length; i++) {
        var option = document.createElement("option");
        option.value = "tipo" + (i + 1);
        option.text = opcionesTipo[i];
        tipoPreguntaSelect.appendChild(option);
    }
    tipoPreguntaLabel.appendChild(tipoPreguntaSelect);
    preguntaContainer.appendChild(tipoPreguntaLabel);

    // Clona el contenedor de formato de pregunta actual
    var formatoPregunta = document.getElementById("formatoPregunta");
    var preguntaClonada = formatoPregunta.cloneNode(true);

    // Asigna un identificador único al contenedor clonado
    preguntaClonada.id = "preguntaX" + (preguntaCounter + 1);

    // Agrega la pregunta clonada al contenedor de preguntas adicionales
    preguntaContainer.appendChild(preguntaClonada);
    document.getElementById("preguntasAdicionales").appendChild(preguntaContainer);

    // Llama a la función cambiarTipoPregunta para inicializar el tipo de la nueva pregunta
    cambiarTipoPregunta();
    preguntaCounter++;
}

function cambiarTipoPregunta() {
    var preguntaContainers = document.querySelectorAll(".preguntaContainer");
    preguntaContainers.forEach(function (preguntaContainer, index) {
        var tipoPreguntaSelect = preguntaContainer.querySelector("select");
        var formatoPregunta = preguntaContainer.querySelector(".formatoPregunta");

        // Restablece el contenido del contenedor
        formatoPregunta.innerHTML = "";

        // Crea elementos según el tipo de pregunta seleccionado
        var tipoSeleccionado = tipoPreguntaSelect.value;

        if (tipoSeleccionado === "tipo1") {
            // Primer formato de pregunta
            formatoPregunta.innerHTML += `
                <div id="tipo-${tipoSeleccionado}"> </div>
                
                <label>Nombre de la pregunta ${index + 1}:
                <input type="text" id="nombre${index + 1}" name="nombre${index + 1}" class="tituloPregunta" required placeholder="Pregunta sin titulo">
                </label>

                <label>Pregunta:
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta corta aquí">
                </label>

                <label>Respuesta (máx. 30 palabras):
                <textarea id="respuesta${index + 1}" name="respuesta${index + 1}" rows="4" maxlength="150" placeholder="Escribe tu respuesta aquí"></textarea>
                </label>`;
        } else if (tipoSeleccionado === "tipo2") {
            // Segundo formato de pregunta
            formatoPregunta.innerHTML += `
            <div id="tipo-${tipoSeleccionado}"> </div>
            <label>Nombre de la pregunta ${index + 1}:
                <input type="text" id="nombre${index + 1}" name="nombre${index + 1}" class="tituloPregunta" required placeholder="Pregunta sin titulo">
            </label>
    
            <label>Pregunta:
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta corta aquí">
            </label>
    
            <label>Respuesta numérica:
                <input type="number" id="respuesta${index + 1}" name="respuesta${index + 1}"  placeholder="Ingresa tu respuesta numérica">
            </label>`;
        } else if (tipoSeleccionado === "tipo3") {
            // Tercer formato de pregunta
            formatoPregunta.innerHTML += `
                <div id="tipo-${tipoSeleccionado}"> </div>
                <label>Nombre de la pregunta ${index + 1}:
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta aquí">
                </label>
                
                <label>Opciones de respuesta:</label>
                <ul>
                    <div>
                        <input type="text" name="enunciado1${index + 1}" id="respuesta1" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${index + 1}" value="opcion1"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado2${index + 1}" id="respuesta2" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label class="resp">
                        <input type="radio" name="opcion${index + 1}" value="opcion2"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado3${index + 1}" id="respuesta3" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${index + 1}" value="opcion3"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado4${index + 1}" id="respuesta4" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${index + 1}" value="opcion4"> 
                    </label>
                </ul>`;
        }
    });
}

function guardarFormulario() {
    // Obtener referencias a elementos del DOM
    var nombre = document.getElementById('nombreForm').value;
    var descripcion = document.getElementById('descripcionForm').value;
    console.log(formCliente);

    // Crear un objeto con la información del formulario
    var formData = {
        nombre: nombre,
        descripcion: descripcion,
        contenidoHTML: formCliente()
    };

    // Enviar datos al backend utilizando XMLHttpRequest o Fetch API
    fetch('guardarFormulario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error al enviar datos al backend:', error));
}


function formCliente() {
    var y = document.createElement('form');

    for (var i = 1; i <= preguntaCounter; i++) {
        var nombre = document.getElementById("nombre" + i).value;
        var pregunta = document.getElementById("pregunta" + i).value;
        var respuesta = document.getElementById("respuesta" + i).value;

        console.log("Nombre:", nombre);
        console.log("Pregunta:", pregunta);
        console.log("Respuesta:", respuesta);

        var tipoPreguntaSelect = document.getElementById("tipoPregunta" + i);
        var tipoSeleccionado = tipoPreguntaSelect.value;

        switch (tipoSeleccionado) {
            case "tipo1":
                y.innerHTML += `
                <div class="tituloPreguntaContainer"> 
                <h2> ${nombre} </h2>
    
                </div>
                <p><strong>Pregunta ${i}:</strong> ${pregunta}</p>
                <textarea id="respuestaUsuario" name="respuestaUsuario" rows="4" maxlength="150" placeholder="Escribe tu respuesta aquí"></textarea>
                
                <hr>`;
                break;

            case "tipo2":
                y.innerHTML +=
                `
                <div class="tituloPreguntaContainer"> 
                    <h2>${nombre}</h2>
                </div>
                <p><strong>Pregunta ${i}:</strong> ${pregunta}</p>
                <label>Respuesta numérica:
                    <input type="number" id="respuestaUsuario" name="respuestaUsuario${i}" required placeholder="Ingresa tu respuesta numérica">
                </label>
                
                <hr>`;
                break;

            case "tipo3":
                y.innerHTML += `
                <div class="tituloPreguntaContainer"> 
                    <h2>${nombre}</h2>
                </div>
                <p><strong>Pregunta ${i}:</strong> ${pregunta}</p>
                <label>Opciones de respuesta:</label>
                <ul>
                    <div>
                        <input type="text" name="enunciado1${i}" id="respuesta1${i}" placeholder="Opción 1" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${i}" value="opcion1"> 
                    </label>
        
                    <div>
                        <input type="text" name="enunciado2${i}" id="respuesta2${i}" placeholder="Opción 2" class="enunciado"> 
                    </div>
                    <label class="resp">
                        <input type="radio" name="opcion${i}" value="opcion2"> 
                    </label>
        
                    <div>
                        <input type="text" name="enunciado3${i}" id="respuesta3${i}" placeholder="Opción 3" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${i}" value="opcion3"> 
                    </label>
        
                    <div>
                        <input type="text" name="enunciado4${i}" id="respuesta4${i}" placeholder="Opción 4" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${i}" value="opcion4"> 
                    </label>
                </ul>
                
                <hr>`;

                break;



            default:

                break;
        }
    }


    return y.outerHTML;
}

function guardarRespuestas() {
    // Crear un objeto para almacenar las respuestas
    var respuestas = [];

    // Recorrer las preguntas y obtener las respuestas
    for (var i = 1; i <= preguntaCounter; i++) {
        var nombre = document.getElementById("nombre" + i).value;
        var pregunta = document.getElementById("pregunta" + i).value;
        var tipoPreguntaSelect = document.getElementById("tipoPregunta" + i);
        var tipoSeleccionado = tipoPreguntaSelect.value;

        switch (tipoSeleccionado) {
            case "tipo1":
                var respuesta = document.getElementById("respuesta" + i).value;
                respuestas.push({
                    nombre: nombre,
                    pregunta: pregunta,
                    respuesta: respuesta
                });
                break;

            case "tipo2":
                var respuesta = document.getElementById("respuesta" + i).value;
                respuestas.push({
                    nombre: nombre,
                    pregunta: pregunta,
                    respuesta: respuesta
                });
                break;

            case "tipo3":
                var opcionesRespuestas = [];
                for (var j = 1; j <= 4; j++) {
                    var enunciado = document.getElementById("respuesta" + j + i).value;
                    opcionesRespuestas.push({
                        enunciado: enunciado,
                        seleccionada: document.querySelector('input[name="opcion' + i + '"]:checked').value
                    });
                }
                respuestas.push({
                    nombre: nombre,
                    pregunta: pregunta,
                    opcionesRespuestas: opcionesRespuestas
                });
                break;

            default:
                break;
        }
    }

    // Enviar las respuestas al archivo PHP mediante una solicitud Fetch
    fetch('guardarRespuestas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ respuestas: respuestas })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error al enviar respuestas al backend:', error));
}






