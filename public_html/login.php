<?php

/*Con esto se checkea que el usuario y el pass están bien puestos. Se hace uso de "password_verify", que
compara el password que pusiste contra el hash del password almacenado en la base de datos */

require './Conexion.php';

$db = new Conexion();
$conexion = $db->getConexion();

$nick = $_POST['nombreLogin'];
$password = $_POST['passwordLogin'];

loginCheck ($nick, $password, $conexion);

function loginCheck($nick, $pass, $conexion) {
    $query = "SELECT password FROM usuarios WHERE nick = ?";
    $statement = $conexion->prepare($query);
    $statement->bindParam(1, $nick);
    $statement->execute();
    $array = $statement->fetch(PDO::FETCH_ASSOC);
    if ($array) {
      $hash = implode($array);

      if (password_verify($pass, $hash)) {
          header ('Location: datosIniciales.html');
      } else {
          echo "Nick o password inválido";
      }
    }else {
      echo "Nick o password inválido";
    }

}
