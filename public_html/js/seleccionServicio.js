$(function(){
    var data = JSON.parse(sessionStorage.getItem('data'));
    var ciudadOrigen = data[0];
    var ciudadDestino = data[1];
    var fechaIda = data[2];
    var fechaVuelta = data[3];
    var radioIdaVuelta = data[4];
    var dropdownOrigen = $("#dropdownCiudadesOrigen2");
    var dropdownDestino = $("#dropdownCiudadesDestino2");
    var botonDropdownOrigen = $("#btnDropdownOrigen2");
    var botonDropdownDestino = $("#btnDropdownDestino2");
    var tablaIda = $("#bodyTablaIda");
    var tablaVuelta = $("#bodyTablaVuelta");
    var selected = null;
    var selectedIdVuelta = null;
    var horaIda, horaVuelta, diaIda, diaVuelta, nomEmpresa1, nomEmpresa2;
    var fechaIda2, fechaVuelta2; //fechaVuelta2 es almacenada en el localStorage y recuperada en datos de pasajero
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    $('#datepickerOrigen2').val(fechaIda);

    if (fechaVuelta == '') {
      $('#datepickerDestino2').val(fechaIda);
    }else {
      $('#datepickerDestino2').val(fechaVuelta);
      $('#datepickerDestino2').removeAttr('disabled');
    }

    var imgCama = '<h3>Servicio Cama</h3><br>' +
                  '<img src="images/butaca-cama.png">' +
                  '<ul class="list-group">' +
                    '<li class="list-group-item">180º de reclinación</li>' +
                    '<li class="list-group-item">Bandeja de apoyo para pies</li>' +
                    '<li class="list-group-item">Calefacción y aire acondicionado</li>' +
                    '<li class="list-group-item">Sonido sorround</li>' +
                    '<li class="list-group-item">Sistema mp3 y Blu-ray</li>' +
                   '</ul>' +
                   '<br>';
    var imgSemicama = '<h3>Servicio Semi Cama</h3><br>' +
                        '<img src="images/butaca-semicama.png">' +
                        '<ul class="list-group">' +
                          '<li class="list-group-item">130º de reclinación</li>' +
                          '<li class="list-group-item">Bandeja de apoyo para pies</li>' +
                          '<li class="list-group-item">Calefacción y aire acondicionado</li>' +
                          '<li class="list-group-item">Sistema mp3 y DVD</li>' +
                        '</ul>' +
                        '<br>';
    var imgComun = '<h3>Servicio Comun</h3><br>' +
                      '<img src="images/butaca-comun.png">' +
                      '<ul class="list-group">' +
                        '<li class="list-group-item">Bandeja de apoyo para pies</li>' +
                        '<li class="list-group-item">Calefacción y aire acondicionado</li>' +
                      '</ul>' +
                      '<br>';


    mostrarCiudades(dropdownOrigen, dropdownDestino);     //Cargar los Dropdowns con las ciudades
    checkRadio();                                         //Carga el radio elegido en la página anterior
    buscarServicio();                                     //Busca servicios según las ciudades elegidas en los dropdown

    /*Bindeo de la funcion que busca los servicios a los botones Buscar, y al click en una nueva Ciudad*/
    $('#btnBuscarServicio').on('click', function(){       //Al presionar el boton Buscar
        buscarServicio();
    });

    $('.dropdownCity').on('click', 'li a', function(){    //Al cambiar la ciudad en Dropdown
       buscarServicio();
    });

    $('.datepicker').on('change', function(){
      buscarServicio();
    });
    /* ------------------------------------------------------------------------------------------------ */

    $('#divRadio2').on('change', 'input:radio', function(){  //Busca nuevos servicios al seleccionar nuevamente Ida o Vuelta
      radioIdaVuelta = $(this).val();
      buscarServicio();
      if ($(this).val() == 2) {                              //"Disablea" y activa datepicker
        $('#datepickerDestino2').removeAttr('disabled');
      }else{
        $('#datepickerDestino2').prop('disabled', true);
      }
    });

    $("#backButton").click(function(){
      window.location.replace('datosIniciales.html');
    });

    $('#btnContinuar').on('click', function(){               //Envia los servicios seleccionados a la siguiente pag
      if (selectedIdIda !== null){
        var ciudadOrigen = botonDropdownOrigen.text();
        var ciudadDestino = botonDropdownDestino.text();
        localStorage.setItem('servicioIda', selectedIdIda);
        localStorage.setItem('ciudadDestino', ciudadDestino);
        localStorage.setItem('ciudadOrigen', ciudadOrigen);
        localStorage.setItem('fechaIda', fechaIda2);
        localStorage.setItem('horaIda', horaIda);
        localStorage.setItem('empresaIda', nomEmpresa1);
        sessionStorage.setItem('1', nomEmpresa1);
        window.location.replace('condicionesComerciales.html');
        if (selectedIdVuelta != null) {
          tiempoDiferencia(horaIda, horaVuelta, diaIda, diaVuelta);
        }else {
          localStorage.setItem('servicioVuelta', null);
          sessionStorage.setItem('2', null);
        }
      }else{

      }
    });

    /* MODAL */

    $(".table").on('click', '.infoServicio', function(){
      $("#infoModal").modal();
    });

    $('#infoModal').on('shown.bs.modal', function () {
      $(this).find("#divContentModal").empty().append(imgComun, imgSemicama, imgCama);
    })

    $('#divRadioModal').on('click', 'input:radio', function(){
      var visa = '<img src="images/formasPago/visa.png">';
      var mastercard = '<img src="images/formasPago/mastercard.png">';
      var dinersClub = '<img src="images/formasPago/dinersClub.png">';
      var visaNacion = '<img src="images/formasPago/visaNacion.png">';
      var divContent = $("#divContentModal");
      var valueRadio = $(this).val();

      switch (valueRadio) {
        case 'calidades':
            divContent.empty().append(imgComun, imgSemicama, imgCama);
          break;
        case 'formaPago':
            divContent.empty().append('<h3>Formas de pago</h3>' +
                                       visa + ' <b>VISA</b>' + '<br>' +
                                       mastercard + ' <b>MASTERCARD</b>' + '<br>' +
                                       dinersClub + ' <b>DINERS CLUB INTERNATIONAL</b>' + '<br>' +
                                       visaNacion + ' <b>VISA NACION</b>' + '<br>');
          break;
        case 'recorrido':
            divContent.empty().append('');
          break;
        default:
      }
    });

    /* ------------------------------------------------------------ */

    function tituloTramo(origen, destino){
        $("#lblTramoIda").empty();
        $("#lblTramoIda").append("Desde: "+origen+" a "+destino);
    };

    function checkRadio(){
      if (radioIdaVuelta == 1) {
        $('#divRadio2 input:radio[value=1]').prop('checked', true);
      }else {
        $('#divRadio2 input:radio[value=2]').prop('checked', true);
      }
    }

    function buscarServicio(){
        var origen = botonDropdownOrigen.text();
        var destino = botonDropdownDestino.text();
        fecha1 = $('#datepickerOrigen2').datepicker('getDate');
        fecha2 = $('#datepickerDestino2').datepicker('getDate');

        checkRadio();
        tituloTramo(origen, destino);
        tramosIda(origen, destino);
        if (radioIdaVuelta == 2) {
          fechaChecker(fecha1, fecha2);
          tramosVuelta(destino, origen);
          $('#divVuelta').toggle();
          $("#lblTramoVuelta").empty();
          $("#lblTramoVuelta").append("Desde: "+destino+" a "+origen);
        }else {
          $('#divVuelta').hide();
        }
    }

    function tramosIda(origen, destino){
        var url = 'acciones.php?accion=getTramo';
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {ciudadOrigen: origen, ciudadDestino: destino},
            success: function(data){
                llenarTabla(data, tablaIda);
            },
            error: function(){
                console.log('Error enviando ciudades');
            }
        });
    };

    function tramosVuelta(origen, destino){
        var url = 'acciones.php?accion=getTramo';
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {ciudadOrigen: origen, ciudadDestino: destino},
            success: function(data){
                var flag = true;
                llenarTabla(data, tablaVuelta, flag);
            },
            error: function(){
                console.log('Error enviando ciudades');
            }
        });
    };

    cantidadButacas = function (data) {
      var arrayCountButacas = new Object();
      var countComun = 0;
      var countSemicama = 0;
      var countCama = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i] == 'Comun') {
                countComun++;
            }else if (data[i] == 'Semicama') {
                countSemicama++;
            }else if (data[i] == 'Cama') {
                countCama++;
            }
        }
        countComun > 0 ? arrayCountButacas["Comun"] = countComun : arrayCountButacas["Comun"] = null;
        countSemicama > 0 ? arrayCountButacas["Semicama"] = countSemicama : arrayCountButacas["Semicama"] = null;
        countCama > 0 ? arrayCountButacas["Cama"] = countCama : arrayCountButacas["Cama"] = null;

        return arrayCountButacas;
    };

    getPrecios = function(){
      const deferred = $.Deferred();
      var url='acciones.php?accion=getPrecio';
      $.ajax({
        url: url,
        method: 'GET',
        async: false,
        success: function(data){
          deferred.resolve($.parseJSON(data));
        },
        error: function(){
          console.log("Error gettin the calidades");
        }
      })
      return deferred.promise();
    }

    sumarFecha = function(tiempoSuma, stringTime, duracion){
      var minutosTotalesDuracion = 0;
      var timeSplited = stringTime.split(":");
      tiempoSuma.setHours(timeSplited[0]);
      tiempoSuma.setMinutes(timeSplited[1]);

      timeSplited = duracion.split(":");
      minutosTotalesDuracion = (timeSplited[0] * 60);
      minutosTotalesDuracion = minutosTotalesDuracion + parseInt(timeSplited[1]);
      tiempoSuma.setMinutes(minutosTotalesDuracion);
      tiempoSuma = formatearTiempo(tiempoSuma);

      return tiempoSuma;
    }

    function llenarTabla(data, tabla, flag) {
        var html = "", tfoot = $('.tableFoot');
        var butacas, fechaTotal;
        var precios, precioComun, precioSemicama, precioCama;
        var countResultados = 0;
        var fechaIda, fechaVuelta;

        getPrecios().then(function(val){
          precios = val;
        });

        tabla.empty();
        tfoot.empty();

        $.each(data, function (index, value) {
            countResultados ++;
            if (flag == true) {
              var fechaDatepicker = $('#datepickerDestino2').datepicker('getDate');
            }else {
              var fechaDatepicker = $('#datepickerOrigen2').datepicker('getDate');
            }

            fecha = formatearTiempo(fechaDatepicker, value.horarioSalida);
            fechaTotal = sumarFecha(fechaDatepicker, value.horarioSalida, value.duracion);
            butacas = cantidadButacas(value.arrayAsientos);

            if ((precios[0].calidad === Object.keys(butacas)[0]) && (butacas["Comun"] != null)) {
              precioComun = value.precio;
            }else {
              precioComun = "";
            }

            if ((precios[1].calidad === Object.keys(butacas)[1]) && (butacas["Semicama"] != null)){
              precioSemicama = parseInt(value.precio) + parseInt(value.precio * (precios[1].multiplicador/100));
            }else {
              precioSemicama = "";
            }

            if ((precios[2].calidad === Object.keys(butacas)[2]) && (butacas["Cama"] != null)) {
              precioCama = parseInt(value.precio) + parseInt(value.precio * (precios[2].multiplicador/100));
            }else {
              precioCama = "";
            }
            html += "<tr id=" + value.idTramo + ">" +
                    "<td><span id='spanEmpresa'>" + value.nombreEmpresa + "</span></td>" +
                    "<td><span id=infoIcon class='glyphicon glyphicon-info-sign infoServicio'></span></td>" +
                    "<td>" +
                      (butacas["Comun"] > 0 ? "Comun: " + butacas["Comun"] : "") + "<br>" +
                      (butacas["Semicama"] > 0 ? "Semicama: " + butacas["Semicama"] : "") + "<br>" +
                      (butacas["Cama"] > 0 ? "Cama: " + butacas["Cama"] : "") +
                    "</td>" +
                    "<td class='horarioSalida'>" + fecha + "</td>" +
                    "<td class='horarioLlegada'>" + fechaTotal + "</td>" +
                    "<td>" +
                      (precioComun !== "" ? "$"+precioComun : "") + "<br>" +
                      (precioSemicama !== "" ? "$"+precioSemicama : "") + "<br>" +
                      (precioCama !== "" ? "$"+precioCama : "") +
                    "</td>" +
                    "<td>" +
                      ((radioIdaVuelta > 1) && (precioComun !== "") ? precioComun * 2 : "") + "<br>" +
                      ((radioIdaVuelta > 1) && (precioSemicama !== "") ? precioSemicama * 2 : "") + "<br>" +
                      ((radioIdaVuelta > 1) && (precioCama !== "") ? precioCama * 2 : "") +
                    "</td>" +
                    "<td><span class='glyphicon glyphicon-shopping-cart' aria-hidden='true'></span></td>" +
                    "</tr>";
        });

        tabla.append(html);
        tfoot.append(countResultados + ' servicio(s) encontrado(s), mostrando ' + countResultados + ' servicio(s), desde 1 hasta ' + countResultados + '. página 1 / n.');
    };

    $('.table').on('click', '.glyphicon-shopping-cart', function(){
      if ((!$(this).hasClass('selected')) && ($(this).closest('table').attr('id') === 'tablaIda')) {
        horaIda = $(this).closest('tr').find('.horarioLlegada .horaSpan').text();
        diaIda = $(this).closest('tr').find('.horarioLlegada .diaSpan').text();
        selectedIdIda = $(this).closest('tr').attr('id');
        nomEmpresa1 = $(this).closest('tr').find('#spanEmpresa').text();
        fechaIda2 = $(this).closest('tr').find('.horarioSalida').html().split('<br>')[0];
        $(this).css('color', '#E4A11B').addClass('selected');
        }else if ((!$(this).hasClass('selected')) && ($(this).closest('table').attr('id') === 'tablaVuelta')){
          horaVuelta = $(this).closest('tr').find('.horarioLlegada .horaSpan').text();
          diaVuelta = $(this).closest('tr').find('.horarioLlegada .diaSpan').text(); //revisar utilidad de esta variable (no me acuerdo para que pija se usa)
          fechaVuelta2 = $(this).closest('tr').find('.horarioSalida').html().split('<br>')[0];//divide horarioLlegada en 2 usando <br> para "splitear", y almacena el primer elemento de las dos partes
          selectedIdVuelta = $(this).closest('tr').attr('id');
          nomEmpresa2 = $(this).closest('tr').find('#spanEmpresa').text();
          $(this).css('color', '#E4A11B').addClass('selected');
      }else{
        $(this).css('color', '#333').removeClass('selected');
      }
    });

    function formatearTiempo(tiempoFormat, stringTime){
      var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
      var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      if (stringTime === undefined) {
        var tiempoFormateado = dias[tiempoFormat.getDay()] + " "
                               + "<span class='diaSpan'>" + tiempoFormat.getDate() + "</span> de "
                               + mes[tiempoFormat.getMonth()] + "<br><span class='horaSpan'>"
                               + (tiempoFormat.getHours() < 10 ? "0" + tiempoFormat.getHours() : tiempoFormat.getHours()) + ":"
                               + (tiempoFormat.getMinutes() < 10 ? "0" + tiempoFormat.getMinutes() : tiempoFormat.getMinutes()) + "</span> hs";
      }else {
        var timeSplited = stringTime.split(":");
        tiempoFormat.setHours(timeSplited[0]);
        tiempoFormat.setMinutes(timeSplited[1]);
        var tiempoFormateado = dias[tiempoFormat.getDay()]+ " "
                               + "<span class='diaSpan'>" + tiempoFormat.getDate() + "</span> de "
                               + mes[tiempoFormat.getMonth()] + "<br><span class='horaSpan'>"
                               + timeSplited[0] + ":"
                               + timeSplited[1] + "</span> hs";
      }

      return tiempoFormateado;
    }

    function tiempoDiferencia(hora1, hora2, fecha1, fecha2){        //Calcula que no se ingrese un horario de vuelta anterior al de llegada a destino
      hora1split = hora1.split(':');
      hora2split = hora2.split(':');

      if (fecha1 > fecha2) {
        mensajeAlerta('El horario de regreso no puede ser anterior al de llegada');
        return;
        }else if (hora1split[0] > hora2split[0]) {
          mensajeAlerta('El horario de regreso no puede ser anterior al de llegada');
          return;
          }else if ((hora1split[0] == hora2split[0]) && (hora1split[1] > hora2split[1])) {
            mensajeAlerta('El horario de regreso no puede ser anterior al de llegada');
            return;
      }else {
        localStorage.setItem('servicioVuelta', selectedIdVuelta);
        sessionStorage.setItem('2', nomEmpresa2);
        localStorage.setItem('fechaVuelta', fechaVuelta2);
        localStorage.setItem('horaVuelta', horaVuelta);
        localStorage.setItem('empresaVuelta', nomEmpresa2);
        window.location.replace('condicionesComerciales.html');
      }
    };

    function fechaChecker(diaI, diaV){                               //Calcula que la fecha de vuelta no sea anterior a la de ida
      if (diaV.getDate() < diaI.getDate()) {
        mensajeAlerta('Nope', 'La fecha de regreso no puede ser anterior a la de ida');
      }
    };

    dropdownCaptura(dropdownOrigen, botonDropdownOrigen);
    dropdownCaptura(dropdownDestino, botonDropdownDestino);
});
