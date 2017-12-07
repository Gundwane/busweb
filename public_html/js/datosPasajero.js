$(function(){
  var origen = localStorage.getItem('ciudadOrigen');
  var destino = localStorage.getItem('ciudadDestino');
  var fechaIda = localStorage.getItem('fechaIda');
  var fechaVuelta = localStorage.getItem('fechaVuelta');
  var horaIda = localStorage.getItem('horaIda');
  var empresaOrigen = localStorage.getItem('empresaIda');
  var array = JSON.parse(localStorage.getItem('array'));
  var aLength = array.length;
  var html;
  var arrayDatos = [];
  var counter = 0;

  if (fechaVuelta !== null) {
    $('#divVuelta').css('display', 'block');
    var horaVuelta = localStorage.getItem('horaVuelta');

    $('#origenV').append(destino);
    $('#fechahoraV').append(fechaVuelta+ ' a las ' +horaVuelta);
    $('#destinoV').append(origen);
    $('#empresaV').append(empresaOrigen);
  }else {
    $('#divVuelta').css('display', 'none');
  }

  $('#origenI').append(origen);
  $('#fechahoraI').append(fechaIda);
  $('#destinoI').append(destino);
  $('#empresaI').append(empresaOrigen);

  $('#btnSubmit').on('click', function(e){
    var idObject = 0;
    e.preventDefault();

    if ($('#btnDrpNac1').text() == 'Seleccione ') {         //Nacionalidades checker
      $('#btnDrpNac1').focus();
      return;
    }

    $('.form').each(function(){
      var datos = {};
      if ($(this)[0].reportValidity() == true) {
        datos["tramo"] = $(this).data('tramo');
        datos["numButaca"] = $(this).find('#spanButaca').data('id');
        datos["tipoDni"] = $(this).find('#btnDrpDni1').text();
        datos["dni"] = $(this).find('#txtNumeroI').val();
        datos["apellido"] = $(this).find('#txtApellidoI').val();
        datos["nombre"] = $(this).find('#txtNombreI').val();
        datos["email"] = $(this).find('#txtEmailI').val();
        datos["nacionalidad"] = $(this).find('#btnDrpNac1').text();

        arrayDatos.push(datos);
      }else {
        return;
      }
    })
    localStorage['datosPasajero'] = JSON.stringify(arrayDatos);
    window.location.replace('pago.html');
  })

  $('#backButton').click(function(){
    window.location.replace('seleccionButacas.html');
  })


  $('.formDiv').on('click', '.dropdown-menu a', function(){
    $(this).closest('.dropdown').find('.btn').html($(this).text());
  });

  $.each(array, function(index, value) {
  console.log('index: '+index+' value: '+value);
    var form = '<form id="formIda" data-tramo="ida" class="form-inline form" method="post">' +
                  '<div id="divButaca" style="padding: 5px; border-top: groove #2E2E2E;">' +
                    '<span id="spanButaca" data-id='+ index +'>Número de butaca: '+ index +'</span>' +
                    '<span> Calidad: '+ value[0] +'</span>' +
                  '</div>' +
                  '<div class="form-group formMargin row">' +
                   '<div class="dropdown input-group col-sm-2">' +
                    '<label style="width: 50%;">Tipo de documento</label>' +
                    '<button id="btnDrpDni1" class="btn dropdown-toggle form-control" type="button" data-toggle="dropdown">DNI<span></span></button>' +
                    '<ul class="dropdown-menu">' +
                      '<li><a>DNI</a></li>' +
                      '<li><a>Pasaporte</a></li>' +
                      '<li><a>CDI</a></li>' +
                      '<li><a>LE</a></li>' +
                    '</ul>' +
                   '</div>' +
                   '<div class="input-group col-sm-2">' +
                     '<label>Numero</label><input id="txtNumeroI" type="text" class="form-control" pattern="[0-9]*" maxlength="8" required>' +
                   '</div>' +
                   '<div class="input-group col-sm-2">' +
                     '<label>Apellido</label><input id="txtApellidoI"  type="text" class="form-control" maxlength="50" required>' +
                   '</div>' +
                   '<div class="input-group col-sm-2">' +
                     '<label>Nombre</label><input id="txtNombreI" type="text" class="form-control" maxlength="50" required>' +
                   '</div>' +
                   '<div class="input-group col-sm-2">' +
                     '<label>E-mail</label><input id="txtEmailI" type="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" required>' +
                   '</div>' +
                   '<div class="dropdown input-group col-sm-2>' +
                    '<li id="popover1" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-container="body" data-content="Supp">' +
                    '<label>Nacionalidad</label>' +
                    '<button id="btnDrpNac1" data-trigger="focus" data-content="Elige una nacionalidad" class="btn dropdown-toggle form-control" type="button" data-toggle="dropdown">Seleccione <span></span></button>' +
                    '<ul class="dropdown-menu">' +
                      '<li><a>Argentina</a></li>' +
                      '<li><a>Chile</a></li>' +
                      '<li><a>Brasil</a></li>' +
                      '<li><a>Uruguay</a></li>' +
                    '</ul>' +
                   '</div>' +
                  '</div>' +
                '</form>';
    if (value[1] == 'Ida') {
      $('#formDivIda').append(form);
    }else{
      $('#formDivVuelta').append(form);
    }
  });

})
