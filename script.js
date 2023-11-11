
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
    preguntaContainer.appendChild(tipoPreguntaLabel);

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
    preguntaContainer.appendChild(tipoPreguntaSelect);

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
                <label for="nombre${index + 1}">Nombre de la pregunta ${index + 1}:</label>
                <input type="text" id="nombre${index + 1}" name="nombre${index + 1}" class="tituloPregunta" required placeholder="Pregunta sin titulo">
                
                <label for="pregunta${index + 1}">Pregunta:</label>
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta corta aquí">

                <label for="respuesta${index + 1}">Respuesta (máx. 30 palabras):</label>
                <textarea id="respuesta${index + 1}" name="respuesta${index + 1}" rows="4" maxlength="150" placeholder="Escribe tu respuesta aquí"></textarea>`;
        } else if (tipoSeleccionado === "tipo2") {
            // Segundo formato de pregunta
            formatoPregunta.innerHTML += `
                <label for="nombre${index + 1}">Nombre de la pregunta ${index + 1}:</label>
                <input type="text" id="nombre${index + 1}" name="nombre${index + 1}" class="tituloPregunta" required placeholder="Pregunta sin titulo">
                
                <label for="pregunta${index + 1}">Pregunta:</label>
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta corta aquí">

                <label for="respuesta${index + 1}">Respuesta larga (máx. 1000 palabras):</label>
                <textarea id="respuesta${index + 1}" name="respuesta${index + 1}" rows="10" maxlength="5000" placeholder="Escribe tu respuesta aquí"></textarea>`;
        } else if (tipoSeleccionado === "tipo3") {
            // Tercer formato de pregunta
            formatoPregunta.innerHTML += `
                <label for="pregunta${index + 1}">Nombre de la pregunta ${index + 1}:</label>
                <input type="text" id="pregunta${index + 1}" name="pregunta${index + 1}" class="preguntaCorta" required placeholder="Escribe tu pregunta aquí">

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