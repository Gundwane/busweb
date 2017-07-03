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
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    $('#datepickerOrigen2').val(fechaIda);
    $('#datepickerDestino2').val(fechaVuelta);

    mostrarCiudades(dropdownOrigen, dropdownDestino);

    /*Bindeo de la funcion que busca los servicios a los botones Buscar, y al click en una nueva Ciudad*/
    $("#btnBuscarServicio").on("click", function(){
        buscarServicio();
    });

    $('#divDropdownOrigen2').on('click', 'li a', function(){
       buscarServicio();
    });

    $('#divDropdownDestino2').on('click', 'li a', function(){
       buscarServicio();
    });

    $("#tabla").on('click', '.infoServicio', function(){
      $("#infoModal").modal();
    })
    /* ------------------------------------------------------------------------------------------------ */

    tituloTramo = function(origen, destino){
        $("#lblTramo").empty();
        $("#lblTramo").append("Desde: "+origen+" a "+destino);
    };

    buscarServicio = function(){
        console.log("Searching...");
        var origen = botonDropdownOrigen.text();
        var destino = botonDropdownDestino.text();

        tituloTramo(origen, destino);
        tramosIda(origen, destino);
        tramosVuelta(destino, origen);
    }

    tramosIda = function(origen, destino){
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
    tramosVuelta = function(origen, destino){
        var url = 'acciones.php?accion=getTramo';
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {ciudadOrigen: origen, ciudadDestino: destino},
            success: function(data){
                llenarTabla(data, tablaVuelta);
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

    formatearTiempo = function(tiempoFormat, stringTime){
      var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
      var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      if (stringTime === undefined) {
        var tiempoFormateado = dias[tiempoFormat.getDay()] + " "
                               + tiempoFormat.getDate() + " de "
                               + mes[tiempoFormat.getMonth()] + "<br>"
                               + (tiempoFormat.getHours() < 10 ? "0" + tiempoFormat.getHours() : tiempoFormat.getHours()) + ":"
                               + (tiempoFormat.getMinutes() < 10 ? "0" + tiempoFormat.getMinutes() : tiempoFormat.getMinutes()) + " hs";
      }else {
        var timeSplited = stringTime.split(":");
        tiempoFormat.setHours(timeSplited[0]);
        tiempoFormat.setMinutes(timeSplited[1]);
        var tiempoFormateado = dias[tiempoFormat.getDay()]+ " "
                               + tiempoFormat.getDate() + " de "
                               + mes[tiempoFormat.getMonth()] + "<br>"
                               + timeSplited[0] + ":"
                               + timeSplited[1] + " hs";
      }

      return tiempoFormateado;
    }

    llenarTabla = function (data, tabla) {
        var html = "";
        var butacas, fecha, fechaTotal;
        var precios, precioComun, precioSemicama, precioCama;
        var fechaDatepicker = $('#datepickerOrigen2').datepicker('getDate');
        getPrecios().then(function(val){
          precios = val;
        });

        tabla.empty();
        $.each(data, function (index, value) {
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

            html += "<tr>" +
                    "<td>" + value.nombreEmpresa + "</td>" +
                    "<td><span id=infoIcon class='glyphicon glyphicon-info-sign infoServicio'></span></td>" +
                    "<td>" +
                      (butacas["Comun"] > 0 ? "Comun: " + butacas["Comun"] : "") + "<br>" +
                      (butacas["Semicama"] > 0 ? "Semicama: " + butacas["Semicama"] : "") + "<br>" +
                      (butacas["Cama"] > 0 ? "Cama: " + butacas["Cama"] : "") +
                    "</td>" +
                    "<td>" + fecha + "</td>" +
                    "<td>" + fechaTotal + "</td>" +
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
                    "</tr>";
        });

        tabla.append(html);
    };

    dropdownCaptura(dropdownOrigen, botonDropdownOrigen);
    dropdownCaptura(dropdownDestino, botonDropdownDestino);
    tituloTramo(ciudadOrigen, ciudadDestino);
    tramosIda(ciudadOrigen, ciudadDestino);
});
