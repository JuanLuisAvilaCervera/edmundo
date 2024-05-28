<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "../../../vendor/PHPMailer/PHPMailer/src/Exception.php";
require_once "../../../vendor/PHPMailer/PHPMailer/src/PHPMailer.php";
require_once "../../../vendor/PHPMailer/PHPMailer/src/SMTP.php";

function mandaCorreo($email, $message)
{
    
    //Preparamos el mensaje para enviar
    $mail = new PHPMailer(true);
    try {
        $mail->IsSMTP();
        $mail->isHTML(true);
        $mail->SMTPDebug = 0;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "ssl";
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->AddAddress($email);
        $mail->Username = "juanluisavilacervera44@gmail.com";
        $mail->Password = "jselhxdocwufzoyb";
        $mail->SetFrom('juanluisavilacervera44@gmail.com', 'no-reply');
        $mail->AddReplyTo("juanluisavilacervera44@gmail.com", "no-reply");
        $mail->Subject = "Valida tu correo";
        $mail->Body = $message;
        $mail->AltBody = $message;
        if ($mail->send()) {
            return true;
        } else {
            return false;

        }
    } catch (Exception $e) {
        return $e;
    }

    
}

?>