<?php
// Endpoint to retrieve form data based on form ID

$archivo = 'formularios.json'; // JSON file name

// Open the file in read mode ('r')
$manejador = fopen($archivo, 'r');

if (!$manejador) {
    die('Error al abrir el archivo JSON.');
}

if (!isset($_GET['formId'])) {
    die('Error: Debe indicar el ID del formulario.');
}

$formId = $_GET['formId'];

// Read the content of the JSON file into a variable
$json_data = fread($manejador, filesize($archivo));

// Close the file
fclose($manejador);

// Decode the JSON string into a PHP array
$forms = json_decode($json_data, true);

$found = false;

foreach ($forms as $form) {
    if ($form['nombre'] === $formId) {
        // Set the header to indicate that the response is JSON
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($form);
        $found = true;
        break;
    }
}

if (!$found) {
    echo 'Error: No se encontró el formulario con el ID proporcionado.';
}
?>

