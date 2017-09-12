$(function(){
  var origen = localStorage.getItem('ciudadOrigen');
  var destino = localStorage.getItem('ciudadDestino');
  var fechaIda = localStorage.getItem('fechaIda');
  var horaIda = localStorage.getItem('horaIda');
  var empresaOrigen = localStorage.getItem('empresaIda');
  var array = JSON.parse(localStorage.getItem('array'));
  var html;
  var objDatosIda = {};
  var objDatosVuelta = {};
  if (fechaVuelta != 'null') {
    $('#divVuelta').css('display', 'block');
    var fechaVuelta = localStorage.getItem('fechaVuelta');
    var horaVuelta = localStorage.getItem('horaVuelta');

    $('#origenV').append(destino);
    $('#fechahoraV').append(fechaVuelta+' a las '+horaVuelta);
    $('#destinoV').append(origen);
    $('#empresaV').append(empresaOrigen);
  }else {
    $('#divVuelta').css('display', 'none');
  }

  $('#origenI').append(origen);
  $('#fechahoraI').append(fechaIda);
  $('#destinoI').append(destino);
  $('#empresaI').append(empresaOrigen);

  $('#copyButton').click(function(){
    $('#txtNumeroV').val($('#txtNumeroI').val());
    $('#txtApellidoV').val($('#txtApellidoI').val());
    $('#txtNombreV').val($('#txtNombreI').val());
    $('#txtEmailV').val($('#txtEmailI').val());
    $('#txtNumeroV').val($('#txtNumeroI').val());
    $('#btnDrpNac2').html($('#btnDrpNac1').text());
    $('#btnDrpDni2').html($('#btnDrpDni1').text());
  });

  $('#btnSubmit').on('click', function(e){
    e.preventDefault();
    if ($('#btnDrpNac1').text() == 'Seleccione ') {
      $('#btnDrpNac1').focus();
      //$('[data-toggle="popover"]').popover('show');
      return;
    }

    if ($('#formIda')[0].reportValidity() == false) {
      return;
    }else {
      objDatosIda["tipoDni"] = $('#btnDrpDni1').text();
      objDatosIda["dni"] = $('#txtNumeroI').val();
      objDatosIda["apellido"] = $('#txtApellidoI').val();
      objDatosIda["nombre"] = $('#txtNombreI').val();
      objDatosIda["email"] = $('#txtEmailI').val();
      objDatosIda["nacionalidad"] = $('#btnDrpNac1').text();
      localStorage.setItem('datosIda', JSON.stringify(objDatosIda));
    }

    if ($('#divVuelta').is(':visible')) {                       //Si el DIV del tramo de vuelta está visible, se checkea la validez del form de ese tramo
      if ($('#btnDrpNac2').text() == 'Seleccione ') {
        $('#btnDrpNac2').focus();
        $('#popover1').popover('focus');
        return;
      }

      if ($('#formVuelta')[0].reportValidity() == false) {
        return;
      }else {
        objDatosVuelta["tipoDni"] = $('#btnDrpDni2').text();
        objDatosVuelta["dni"] = $('#txtNumeroV').val();
        objDatosVuelta["apellido"] = $('#txtApellidoV').val();
        objDatosVuelta["nombre"] = $('#txtNombreV').val();
        objDatosVuelta["email"] = $('#txtEmailV').val();
        objDatosVuelta["nacionalidad"] = $('#btnDrpNac2').text();
        localStorage.setItem('datosVuelta', JSON.stringify(objDatosVuelta));
        window.location.replace('pago.html');
      }
    }else {
      window.location.replace('pago.html');
    }
  })

  $('#backButton').click(function(){
    window.location.replace('seleccionButacas.html');
  })

  $('.dropdown-menu a').click(function(){
    $(this).closest('.dropdown').find('.btn').html($(this).text());
  });

  $.each(array, function(index, value) {
    html = '<tr>' +
            '<td><span>' + index + '</span></td>' +
            '<td><span>' + value[0] + '</span></td>' +
           '</tr>';

    if (value[1] == 'Ida') {
      $('#butacasTableIda').append(html);
    }else{
      $('#butacasTableVuelta').append(html);
    }
  });

})
