<?php

// Obtener los datos del formulario desde la solicitud POST
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$contenidoHTML = $_POST['contenidoHTML'];

// Crear un objeto con la información del formulario
$formData = [
    'nombre' => $nombre,
    'descripcion' => $descripcion,
    'contenidoHTML' => $contenidoHTML
];

// Obtener los formularios existentes del archivo JSON
$formulariosGuardados = json_decode(file_get_contents('formularios.json'), true) ?? [];

// Agregar el nuevo formulario al array existente
$formulariosGuardados[] = $formData;

// Guardar el array actualizado en el archivo JSON
file_put_contents('formularios.json', json_encode($formulariosGuardados, JSON_PRETTY_PRINT));

// Imprimir respuesta JSON
echo json_encode(['mensaje' => 'Formulario guardado correctamente']);
?>
