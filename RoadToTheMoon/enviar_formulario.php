<?php
$enviaPara = 'iphone.pablo2002@gmail.com';
$subject = 'Contacto desde la web';
$enviado = "enviado.html";

$mensaje = '';
$primero = true;

// Definir un array que mapee los nombres de campo del formulario a etiquetas humanas
$campos = array(
    'nombre' => 'Nombre',
    'email' => 'Email',
    'telefono' => 'Teléfono',
    'motivo' => 'Motivo de Contacto'
);

foreach ($_POST as $campo => $valor) {
    if (isset($campos[$campo])) {
        if (is_array($valor)) {
            $mensaje .= '<strong>' . $campos[$campo] . ':</strong><ul>';
            foreach ($valor as $item) {
                $mensaje .= '<li>' . $item . '</li>';
            }
            $mensaje .= '</ul><br>';
        } else {
            if ($primero) {
                $from = $valor;
                $primero = false;
            }
            $mensaje .= '<strong>' . $campos[$campo] . ':</strong>';
            $mensaje .= $valor . '<br>';
            if (strpos($valor, '@') > 3 && strpos($valor, '.') > -1) {
                $from = $valor;
            }
        }
    }
}

$mail_headers = "MIME-Version: 1.0\r\n";
$mail_headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
$mail_headers .= 'From: ' . $from . "\r\n";
@mail($enviaPara, $subject, $mensaje, $mail_headers);
header("Location: $enviado");
?>