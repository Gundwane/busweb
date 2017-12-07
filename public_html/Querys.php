<?php
header('Content-Type: text/html; charset=UTF-8');
require './Conexion.php';

class Querys {

    private $_conexion = null;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->_conexion = $conexion->getConexion();
    }

    public function ciudades()
    {
        $query = "SELECT nombre FROM ciudades";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $array = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $array;
    }

    public function getEmpresa()
    {
        $query = "SELECT nombreEmpresa FROM empresas";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $array = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $array;
    }

    public function getBus()
    {
        $query = "SELECT arrayAsientos FROM buses WHERE idBus=3";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $row = $statement->fetchColumn();
        $arrayBus = unserialize(base64_decode($row));
        print_r($arrayBus);
    }

    public function getTramo()
    {
        $ciudadOrigen = $_POST['ciudadOrigen'];
        $ciudadDestino = $_POST['ciudadDestino'];

        try {
            $query = "SELECT empresa.nombreEmpresa, tramos.idTramo, tramos.horarioSalida, tramos.duracion, tramos.precio, buses.arrayAsientos
                     FROM tramos
                     INNER JOIN empresa ON tramos.fk_empresa = empresa.idEmpresa
                     INNER JOIN buses ON tramos.fk_bus = buses.idBus
                     INNER JOIN ciudades AS corigen ON tramos.fk_ciudadOrigen = corigen.idCiudad
                     INNER JOIN ciudades AS cdestino ON tramos.fk_ciudadDestino = cdestino.idCiudad
                     WHERE corigen.nombre = ? AND cdestino.nombre = ?";

            $statement = $this->_conexion->prepare($query);
            $statement->bindParam(1, $ciudadOrigen);
            $statement->bindParam(2, $ciudadDestino);
            $statement->execute();
            $array = $statement->fetchAll(PDO::FETCH_ASSOC);

            //Unserializa array de asientos de micros
            foreach ($array as $key => $subarray) {
              foreach ($subarray as $subkey => $value) {
                if ($subkey === 'arrayAsientos') {
                  $array[$key][$subkey] = unserialize(base64_decode($value));
                }
              }
            }

            return $array;
        } catch (PDOException $e) {
            print $e->getMessage();
        }
    }

    public function unserializarBus($arrayBus)
    {
      foreach ($arrayBus as $key => $subarray) {
        foreach ($subarray as $subkey => $value) {
          if ($subkey === 'arrayAsientos') {
            $arrayBus[$key][$subkey] = unserialize(base64_decode($value));
          }
        }
      }

      return $arrayBus;
    }

    public function getBusPorTramo()
    {
      $busId = $_POST['busId'];

      $query = "SELECT buses.arrayAsientos
                FROM buses
                INNER JOIN tramos ON tramos.fk_bus = buses.idBus
                WHERE tramos.idTramo = ?";

      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(1, $busId);
      $statement->execute();
      $array = $statement->fetchAll(PDO::FETCH_ASSOC);

      $array = $this->unserializarBus($array);
      return $array;
    }

    public function getPrecio()
    {
      $query = "SELECT * FROM calidades";
      $statement = $this->_conexion->prepare($query);
      $statement->execute();
      $array = $statement->fetchAll(PDO::FETCH_ASSOC);
      return $array;
    }

    public function getCondiciones()
    {
      $nomEmp = $_POST['nomEmp'];

      $query = "SELECT condiciones FROM empresa WHERE nombreEmpresa = :nombreEmpresa";

      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':nombreEmpresa', $nomEmp);
      $statement->execute();
      $row = $statement->fetchColumn();
      $row = nl2br($row);

      echo $row;
    }

    public function precioTramo($idTramo)
    {
      $query = "SELECT tramos.precio FROM tramos WHERE tramos.idTramo = :idTramo";

      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':idTramo', $idTramo);
      $statement->execute();
      $row = $statement->fetchColumn();
      return $row;
    }

    public function preciocalidad()
    {
      $idTramo = $_POST['tramo'];
      $precios;
      $array = [];

      $array[] = $this->precioTramo($idTramo);
      $precios = $this->getPrecio();
      foreach ($precios as $key => $value) {
        $array[$value['calidad']] = $value['multiplicador'];
      }
      return $array;
    }

    public function checkTarjetaDB()
    {
      $id = $_POST['id'];

      $query = "SELECT codigo FROM tarjetaDB WHERE dni = :dni";
      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':dni', $id);
      $statement->execute();
      $code = (int)$statement->fetchColumn();

      return $code;
    }

    public function insertPasajero()
    {
      $nombre = $_POST['nombre'];
      $apellido = $_POST['apellido'];
      $tipoDni = $_POST['tipoDni'];
      $dni = $_POST['dni'];
      $email = $_POST['email'];
      $nacionalidad = $_POST['nacionalidad'];

      $queryBuscar = "SELECT dni FROM pasajero WHERE dni=:dni AND apellido=:apellido";
      $statement = $this->_conexion->prepare($queryBuscar);
      $statement->bindParam(':dni', $dni);
      $statement->bindParam(':apellido', $apellido);
      $statement->execute();
      if ($statement->rowCount() > 0) {
        return $dni;
      }else {
        $query = "INSERT INTO pasajero (dni, nombre, apellido, tipoDni, email, nacionalidad)
                  VALUES (:dni, :nombre, :apellido, :tipoDni, :email, :nacionalidad)";
        $statement = $this->_conexion->prepare($query);
        $statement->bindParam(':dni', $dni);
        $statement->bindParam(':nombre', $nombre);
        $statement->bindParam(':apellido', $apellido);
        $statement->bindParam(':tipoDni', $tipoDni);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':nacionalidad', $nacionalidad);
        $statement->execute();

        return $dni;
      }
    }

    public function insertTitular()
    {
      $tipoDni = $_POST['tipoDni'];
      $dni = $_POST['dni'];
      $apellido = $_POST['apellido'];
      $nombre = $_POST['nombre'];
      $email = $_POST['email'];
      $telefono = $_POST['telefono'];
      $nacionalidad = $_POST['nacionalidad'];
      $numeroContacto = $_POST['numeroContacto'];
      $fechaNacimiento = $_POST['fechaNacimiento'];

      $query = "INSERT INTO titulartarjeta (dni, nombre, apellido, tipoDni, telefono, email, nacionalidad, fechaNacimiento)
                VALUES (:dni, :nombre, :apellido, :tipoDni, :telefono, :email, :nacionalidad, DATE :fechaNacimiento)";
      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':nombre', $nombre);
      $statement->bindParam(':apellido', $apellido);
      $statement->bindParam(':tipoDni', $tipoDni);
      $statement->bindParam(':dni', $dni);
      $statement->bindParam(':telefono', $telefono);
      $statement->bindParam(':email', $email);
      $statement->bindParam(':nacionalidad', $nacionalidad);
      $statement->bindParam(':fechaNacimiento', $fechaNacimiento);
      $statement->execute();

      return $dni;
    }

    public function updateButacas()
    {
      $tramoId = $_POST['idTramo'];
      $butaca = $_POST['butaca'];
      $query = "SELECT buses.idBus, buses.arrayAsientos
                FROM buses
                INNER JOIN tramos ON tramos.fk_bus = buses.idBus
                WHERE tramos.idTramo = ?";

      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(1, $tramoId);
      $statement->execute();
      $array = $statement->fetchAll(PDO::FETCH_ASSOC);
      $idBus = $array[0]['idBus'];
      $arrayButacas = $array[0]['arrayAsientos'];

      $arrayButacas = unserialize(base64_decode($arrayButacas));
      foreach ($arrayButacas as $key => $value) {
        if ($key == $butaca) {
          $arrayButacas[$key] = $value.'RESERVADO';
        }
      }

      $serializedArrayButacas = base64_encode(serialize($arrayButacas));

      $query2 = "UPDATE buses
                SET arrayAsientos = ?
                WHERE idBus = ?";
      $statement = $this->_conexion->prepare($query2);
      $statement->bindParam(1, $serializedArrayButacas);
      $statement->bindParam(2, $idBus);
      $statement->execute();
    }

    public function insertTicket()
    {
      $idPasajero = (int)trim($_POST['dniPasajero'], '"');
      $idTitular = (int)trim($_POST['idTitular'], '"');
      $idTramo = (int)$_POST['idTramo'];
      $fechaSalida = $_POST['fechaSalida'];
      $butaca = (int)$_POST['butaca'];
      $fecha = strtotime($fechaSalida);
      $fecha = date('Y-m-d', $fecha);

      $query = "INSERT INTO ticket (fk_pasajero, fk_titularTarjeta, fk_tramo, fechaSalida, numeroButaca)
                VALUES (:dniPasajero, :idTitular, :idTramo, :fecha, :butaca)";
      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':dniPasajero', $idPasajero);
      $statement->bindParam(':idTitular', $idTitular);
      $statement->bindParam(':idTramo', $idTramo);
      $statement->bindParam(':fecha', $fecha);
      $statement->bindParam(':butaca', $butaca);

      if ($statement->execute()) {
        echo 'TICKET INSERTADO';
      }else {
        echo 'ERROR INSERTANDO TICKET';
        $query2 = "DELETE FROM pasajero WHERE dni = :dni";
        $statement2 = $this->conexion->prepare($query);
        $statement2->bindParam(':dni', $idPasajero);
        $statement2->execute();

        $query3 = "DELETE FROM titulartarjeta WHERE dni = :dni";
        $statement3 = $this->conexion->prepare($query);
        $statement3->bindParam(':dni', $idTitular);
        $statement3->execute();
      }
    }

    public function getTicket()
    {
      $dni = $_POST['numeroDni'];
      $email = $_POST['email'];

      $query = "SELECT pasajero.nombre AS pnombre, pasajero.apellido, pasajero.dni, corigen.nombre AS conombre, cdestino.nombre AS cdnombre, tramos.precio, tramos.horarioSalida, ticket.numeroButaca
      FROM tramos
      INNER JOIN ticket ON ticket.fk_tramo = tramos.idTramo
      INNER JOIN pasajero ON ticket.fk_pasajero = pasajero.dni
      INNER JOIN ciudades AS corigen ON tramos.fk_ciudadOrigen = corigen.idCiudad
      INNER JOIN ciudades AS cdestino ON tramos.fk_ciudadDestino = cdestino.idCiudad
      WHERE pasajero.dni = :dni AND pasajero.email = :email";


      $statement = $this->_conexion->prepare($query);
      $statement->bindParam(':dni', $dni);
      $statement->bindParam(':email', $email);
      $statement->execute();
      $array = $statement->fetchAll(PDO::FETCH_ASSOC);
      return $array;
    }
}
