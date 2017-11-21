$(function(){
  var montoTotal;
  var idTramo = localStorage.getItem('servicioIda');
  var arrayButacas = JSON.parse(localStorage.getItem('array'));
  var datos = JSON.parse(localStorage.getItem('datosPasajero'));
  var fechaIda = JSON.parse(localStorage.getItem('fechaIdaNF'));
  var idPasajero = null, idTitular = null;
  getPrecios();

  console.log(datos);

  $('.dropdown-menu a').click(function(){
    $(this).closest('.dropdown').find('.btn').html($(this).text());
  });

  $('.dropdown-menu a').click(function(){
    $(this).closest('.dropup').find('.btn').html($(this).text());
  });

  $('#backButton').click(function(){
    window.location.replace('datosPasajero.html');
  })

  $('#boton').click(function(){
    var butaca;
    var dniTitular = $('#txtNumero').val();
    var url = 'acciones.php?accion=checkTarjetaDB';

    $.ajax({
      url: url,
      method: 'POST',
      data: {id: dniTitular},
      success: function(codigo){
        if (codigo > 99) {
          alert('Estas habilitado');
          $.each(datos, function(index, value){
            console.log(index+' '+value);
            updateButaca(idTramo, butaca);
            insertPasajero(value);
          })
        }else {
          alert('SSSHHHHUPET! No podés hacer la compra porque tu tarjeta no te deja');
        }
      }
    })

    $.each(datos, function(index, value){
      updateButaca(idTramo, butaca);
      insertPasajero(value);
    })
  });

  function insertPasajero(datosPasajero){
    var url = 'acciones.php?accion=insertPasajero';
    var nombre = datosPasajero['nombre'];
    var apellido = datosPasajero['apellido'];
    var tipoDni = datosPasajero['tipoDni'];
    var dni = datosPasajero['dni'];
    var email = datosPasajero['email'];
    var nacionalidad = datosPasajero['nacionalidad'];
    var butaca = datosPasajero['numButaca'];
    $.ajax({
      url: url,
      method: 'POST',
      data: {nombre: nombre, apellido: apellido, tipoDni: tipoDni, dni: dni, email: email, nacionalidad: nacionalidad},
      success: function(data){
        insertTitular(data, butaca);
      },
      error: function(){
        console.log('Error');
      }
    })
  }

  function insertTitular(idPasajero, butaca){
    var idPasajero = idPasajero;
    var url = 'acciones.php?accion=insertTitular';

    var tipoDni = $('#btnDrpDni').text();
    var dni = $('#txtNumero').val();
    var apellido = $('#txtApellido').val();
    var nombre = $('#txtNombre').val();
    var email = $('#txtEmail').val();
    var telefono = $('#txtTelefono').val();
    var nacionalidad = $('#btnDrpNac').text();
    var numeroContacto = $('#txtNumero').val();
    var fechaNacimiento = $('#datepicker').datepicker('getDate');
    fechaNacimiento = $.datepicker.formatDate('yy-mm-dd', fechaNacimiento);

    $.ajax({
      url: url,
      method: 'POST',
      data: {tipoDni: tipoDni, dni: dni, apellido: apellido, nombre: nombre, email: email, telefono: telefono, nacionalidad: nacionalidad, numeroContacto: numeroContacto, fechaNacimiento: fechaNacimiento },
      success: function(data){
        insertTicket(idPasajero, data, butaca);
      },
      error: function(){
        console.log('Error');
      }
    })
  }

  function updateButaca(tramo, butaca){
    var url = 'acciones.php?accion=updateButacas';
    $.ajax({
      url: url,
      method: 'POST',
      data: {idTramo: idTramo, butaca: butaca},
      success: function(){

      },
      error: function(){
        console.log('Error');
      }
    })
  }

  function insertTicket(idPasajero, idTitular, butaca){
    var url = 'acciones.php?accion=insertTicket';
    console.log('Id pasajero: '+idPasajero);

    $.ajax({
      url: url,
      method: 'POST',
      data: {dniPasajero: idPasajero, idTitular: idTitular, idTramo: idTramo, fechaSalida: fechaIda, butaca: butaca},
      success: function(data){
        setTimeout(function(){
          mensajeAlerta('Pasajes reservados : )');
        }, 2000);
        window.location.replace('ticket.html');
      },
      error: function(){
        console.log('Error');
      }
    })
  };

  function getPrecios(){
    var url = 'acciones.php?accion=precioTramo';

    $.ajax({
      url: url,
      dataType: 'JSON',
      method: 'POST',
      data: {tramo: idTramo},
      success: function(data){
        calcularMonto(data, arrayButacas);
      },
      error: function(){
        console.log('Error getMonto');
      }
    })
  }

  function calcularMonto(data, array){
    var precioTotal = 0, precioTotalIda = 0, precioTotalVuelta = 0;
    var precioTramo = data[0];
    var precioComunI = 0, precioSemicamaI = 0, precioCamaI = 0;
    var precioComunV = 0, precioSemicamaV = 0, precioCamaV = 0;
    var contadorIComun = 0, contadorISemicama = 0, contadorICama = 0;
    var contadorVComun = 0, contadorVSemicama = 0, contadorVCama = 0;
    var multipComun = data['Comun'];
    var multipSemicama = data['Semicama'];
    var multipCama = data['Cama'];
    $.each(array, function(index, value){
      if (value[1] == 'Ida') {
        if (value[0] == 'Comun') {
          if (multipComun == 0) {
            precioTotalIda = parseFloat(precioTotalIda) + parseFloat(precioTramo);
            precioComunI += parseFloat(precioTramo);
            contadorIComun ++;
          }else {
            precioTotalIda += (precioTramo * multipComun)/100;
            precioComunI += (precioTramo * multipComun)/100;
            contadorIComun ++;
          }
        }else if (value[0] == 'Semicama') {
          precioTotalIda += parseFloat(precioTramo) + ((precioTramo * multipSemicama)/100);
          precioSemicamaI += parseFloat(precioTramo) + ((precioTramo * multipSemicama)/100);
          contadorISemicama ++;
        }else if (value[0] == 'Cama') {
          precioTotalIda += parseFloat(precioTramo) + ((precioTramo * multipCama)/100);
          precioCamaI += parseFloat(precioTramo) + ((precioTramo * multipCama)/100);
          contadorICama ++;
        }
      }else {
        if (value[0] == 'Comun') {
          if (multipComun == 0) {
            precioTotalVuelta = parseFloat(precioTotalVuelta) + parseFloat(precioTramo);
            precioComunV += parseFloat(precioTramo);
            contadorVComun ++;
          }else {
            precioTotalVuelta += parseFloat(precioTotalVuelta) + (precioTramo * multipComun)/100;
            precioComunV += (precioTramo * multipComun)/100;
            contadorVComun ++;
          }
        }else if (value[0] == 'Semicama') {
          precioTotalVuelta += parseFloat(precioTramo) + ((precioTramo * multipSemicama)/100);
          precioSemicamaV += parseFloat(precioTramo) + ((precioTramo * multipSemicama)/100);
          contadorVSemicama ++;
        }else if (value[0] == 'Cama') {
          precioTotalVuelta += parseFloat(precioTramo) + ((precioTramo * multipCama)/100);
          precioTotalVuelta += parseFloat(precioTramo) + ((precioTramo * multipCama)/100);
          precioCamaV += parseFloat(precioTramo) + ((precioTramo * multipCama)/100);
          contadorVCama ++;
        }
      }
    });

    precioTotal = parseFloat(precioTotalIda) + parseFloat(precioTotalVuelta);

    precioTotal = precioTotal.toFixed(2);
    precioTotalIda = precioTotalIda.toFixed(2);
    precioTotalVuelta = precioTotalVuelta.toFixed(2);

    $('#ida').find('.totalPrecio').append(precioTotalIda);
    $('#cantComunI').append(contadorIComun + ' $'+precioComunI);
    $('#cantSemicamaI').append(contadorISemicama + ' $'+precioSemicamaI);
    $('#cantCamaI').append(contadorICama + ' $'+precioCamaI);

    $('#vuelta').find('.totalPrecio').append(precioTotalVuelta);
    $('#cantComunV').append(contadorVComun + ' $'+precioComunV);
    $('#cantSemicamaV').append(contadorVSemicama + ' $'+precioSemicamaV);
    $('#cantCamaV').append(contadorVCama + ' $'+precioCamaV);

    $('#montoTotal').append(' '+precioTotal);
  }

  function dataSend(data){
    console.log(data);
    $.each(data, function(index, value){
      $.each(value, function(subindex, subvalue){
        console.log(subindex+' '+subvalue);
      })
    })
  }


  $('.datepicker').datepicker();
})
