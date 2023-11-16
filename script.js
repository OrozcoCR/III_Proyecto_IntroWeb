
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
    preguntaClonada.id = "pregunta" + (preguntaCounter + 1);

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
                <label>Nombre de la pregunta ${index + 1}:
                <input type="text" id="nombre${index + 1}" name="nombre${index + 1}" class="tituloPregunta" required placeholder="Pregunta sin titulo">
                </label>

                <label>Pregunta:
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta corta aquí">
                </label>

                <label>Respuesta larga (máx. 1000 palabras):
                <textarea id="respuesta${index + 1}" name="respuesta${index + 1}" rows="10" maxlength="5000" placeholder="Escribe tu respuesta aquí"></textarea>
                </label>`;
        } else if (tipoSeleccionado === "tipo3") {
            // Tercer formato de pregunta
            formatoPregunta.innerHTML += `
                <label>Nombre de la pregunta ${index + 1}:
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta aquí">
                </label>
                
                <label>Opciones de respuesta:</label>
                <ul>
                    <div>
                        <input type="text" name="enunciado1${index + 1}" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${index + 1}" value="opcion1"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado2${index + 1}" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label class="resp">
                        <input type="radio" name="opcion${index + 1}" value="opcion2"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado3${index + 1}" placeholder="Pregunta sin titulo" class="enunciado"> 
                    </div>
                    <label>
                        <input type="radio" name="opcion${index + 1}" value="opcion3"> 
                    </label>

                    <div>
                        <input type="text" name="enunciado4${index + 1}" placeholder="Pregunta sin titulo" class="enunciado"> 
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
    var formulario = document.getElementById('miFormulario').innerHTML;

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
    // Clone the entire form
    var clonedForm = document.getElementById('miFormulario').cloneNode(true);

    // Hide labels and selects with a specific class within .preguntaContainer in the cloned form
    clonedForm.querySelectorAll('select').forEach(function (element) {
        element.setAttribute('hidden', 'true');
    });

    clonedForm.querySelectorAll('.hideable-label').forEach(function (element) {
        element.delete();
    });

    // Hide the two buttons at the bottom of the cloned form
    clonedForm.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('hidden', 'true');
    });

    var sendBtn = document.createElement('button');
    sendBtn.innerText = 'Registrar respuesta';
    clonedForm.appendChild(sendBtn);

    // Retrieve the modified HTML of the cloned form, including hidden attributes
    return clonedForm.outerHTML;
}

function mostrarRespuestas() {
    var resultadosContainer = document.getElementById("resultados");
    resultadosContainer.innerHTML = ""; // Limpiar contenido anterior

    // Recorrer las respuestas
    for (var i = 1; i <= preguntaCounter; i++) {
        var nombre = document.getElementById("nombre" + i).value;
        var pregunta = document.getElementById("pregunta" + i).value;
        var respuesta = document.getElementById("respuesta" + i).value;

        resultadosContainer.innerHTML += `
        <p><strong>Nombre de la pregunta ${i}:</strong> ${nombre}</p>
        <p><strong>Pregunta ${i}:</strong> ${pregunta}</p>
        <p><strong>Respuesta ${i}:</strong> ${respuesta}</p>
        <hr>`;
}
}