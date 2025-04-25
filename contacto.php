<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Validación básica
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail inválido.";
        exit;
    }

    // Configurar el correo
    $to = "lisandroday@gmail.com"; // Cambiar a tu correo
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $name\nE-mail: $email\nMensaje:\n$message";
    $headers = "From: $email";

    // Enviar correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método no permitido.";
}
?>