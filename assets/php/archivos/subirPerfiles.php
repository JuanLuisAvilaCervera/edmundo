<?php

function subirPerfil($perfil){
    $target_dir = "../../files/perfiles/";
    $target_file = $target_dir . $perfil;
    move_uploaded_file($perfil, basename($target_file));
}


?>