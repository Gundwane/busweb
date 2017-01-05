<?php
require './Querys.php';
$querys = new Querys();
$accion = $_GET['accion'];
$resultado = '';

switch ($accion){
    case 'ciudades':
       $resultado = $querys->ciudades();
    break;

    default:
        $resultado = "No se encontró la accion";
}

echo json_encode($resultado);

