<?php
require './Conexion.php';
$conexion = new Conexion();
$getConexion = $conexion->getConexion();

$asientos = $_POST['numeroAsientos'];
$patente = $_POST['patente'];
echo "<script language='javascript'>console.log($asientos)</script>";
try {
    for ($i = 0; $i <= $asientos - 1; $i++) {
        if ($i < 20) {
          $matrizButacas[$i] = 'Comun';
        }else if($i < 44) {
          $matrizButacas[$i] = 'Semicama';
        } else {
          $matrizButacas[$i] = 'Cama';
        }
    }
    $serializedArrayButacas = base64_encode(serialize($matrizButacas));

    $query = "UPDATE buses SET asientos = ?, arrayAsientos = ? WHERE patente= ?";
    $statement = $getConexion->prepare($query);
    $statement->bindParam(1, $asientos);
    $statement->bindParam(2, $serializedArrayButacas);
    $statement->bindParam(3, $patente);
    $statement->execute();

    header('Location: construido.html');
} catch (PDOException $e) {
    echo 'Exception caught: ' . $e->getMessage();
}
 ?>
