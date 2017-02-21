<?php
require './Querys.php';
$querys = new Querys();
$accion = $_GET['accion'];
$resultado = '';

switch ($accion){
    case 'ciudades':
       $resultado = $querys->ciudades();
    break;

    case 'tablaServicio':
        $resultado = $querys->tablaServicio();
        break;
    
    case 'getBus':
        $resultado = $querys->getBus();
        break;
    
    case 'tramo':
        $resultado = $querys->getTramo();
        break;

    default:
        $resultado = "No se encontró la accion";
}

echo json_encode($resultado);

