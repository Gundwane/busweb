<?php
include_once './Querys.php';
include_once './querysAdmin.php';
$querys = new Querys();
$adminQuerys = new querysAdmin();
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

    case 'getTramo':
        $resultado = $querys->getTramo();
        break;

    case 'getPrecio':
        $resultado = $querys->getPrecio();
        break;

    case 'getBusPorTramo':
        $resultado = $querys->getBusPorTramo();
        break;

    case 'condiciones':
        $resultado = $querys->getCondiciones();
        break;

    case 'precioTramo':
        $resultado = $querys->preciocalidad();
        break;

    case 'checkTarjetaDB':
        $resultado = $querys->checkTarjetaDB();
        break;

    case 'insertPasajero':
        $resultado = $querys->insertPasajero();
        break;

    case 'insertTitular':
        $resultado = $querys->insertTitular();
        break;

    case 'updateButacas':
        $resultado = $querys->updateButacas();
        break;

    case 'test':
        $resultado = $querys->getBus();
        break;

    case 'insertTicket':
        $resultado = $querys->insertTicket();
        break;

    case 'getTicket':
        $resultado = $querys->getTicket();
        break;

    case 'getAllTramos':
        $resultado = $querys->getAllTramos();
        break;

    case 'ciudadesById':
        $resultado = $adminQuerys->ciudadesById();
        break;

    default:
        $resultado = "No se encontró la accion";
}

echo json_encode($resultado);
