var formData; // Variable to store form data


  // Obtener el id del formulario del parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const formDataJSON = urlParams.get("formId");

  // Crear una instancia de XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurar la solicitud AJAX
  xhr.open("GET", "obtenerFormulario.php?formId=" + formDataJSON, true);

  xhr.onreadystatechange = () => {
    // Manejar cambios de estado, si es necesario
  };

  // Configurar el manejo de la respuesta
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parsear la respuesta JSON
      formData = JSON.parse(xhr.responseText);

      // Añadir los detalles del formulario a la página
      const formDetailContainer = document.getElementById("form-detail-container");

      const detailContainer = document.createElement("div");
      detailContainer.className = "form-details";

      // Display form name and description
      const formName = document.createElement("h2");
      formName.textContent = formData.nombre;

      const formDescription = document.createElement("p");
      formDescription.textContent = formData.descripcion;

      // Display the HTML content as it comes
      const formHTMLContent = document.createElement("div");
      formHTMLContent.innerHTML = formData.contenidoHTML;

      // Agrega los elementos al container
      formDetailContainer.appendChild(detailContainer);
      detailContainer.appendChild(formName);
      detailContainer.appendChild(formDescription);
      formDetailContainer.appendChild(formHTMLContent);
    } else {
      console.error("Error en la solicitud: " + xhr.status);
    }
  };

  // Enviar la solicitud AJAX
  xhr.send();




