$(function(){
  var ciudades;
  getTramos();
  //getCiudades();

    $("btnSubmit").click(function () {
        if ($('.form').reportValidity() === true) {
            var empresa = $('#empresa');
            var origen = $('#origen');
            var destino = $('#destino');
            var bus = $('#bus');
            var precio = $('#precio');
            var horarioSalida = $('#horarioSalida');
            var duracionRecorrido = $('#duracionRecorrido');


            var url = 'accion.php?acciones=insertTramo';
            $.ajax({
                url: url,
                method: 'POST',
                data: {empresa: empresa, corigen: origen, cdestino: destino, patenteBus: bus, precio: precio, horarioSalida: horarioSalida, duracion: duracionRecorrido},
                success: function (data) {
                    if (data > 0) {
                        alert('Tramo Insertado');
                        getTramos();
                    }else {
                        alert('Tramo no insertado');
                    }

                }
            })
        }else {
            alert('Hay algo mal con algun campo del form');
        }
    })

    $('#tabla-body').on('click', '.glyphicon-remove', function() {
      $(this).siblings('input').remove();
      $(this).remove();
    });

    /*$('#tabla-body').on('click', 'td .text', function(){
      var input = '<span class="glyphicon glyphicon-remove"></span><input class="elinput" type="text">';
      if ($('#tabla-body tr td input').length == 0) {
        $(this).parent().html(input);
      }
    })*/

    /*$('#tabla-body').on('click', 'td .empresa', function(){
      var i = 0;
      $(this).find('.empresa').remove();
      var dropd = '<div class="dropdown">' +
      '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ciudades</button>' +
      '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
      $.each(ciudades, function(index, value){
        dropd += '<a class="dropdown-item" data-id="'+ index +'">'+ value +'</a>';
      })
      dropd += '</div></div>';
      $(this).parent().html(dropd);
    })*/

    $('#tabla-body').on('click', 'td .drpdwn', function(){
      var data = $(this).data('get');
      console.log(data); //Successful data

      //IDEA: Mandar la data (empresa, ciudad origen o ciudad destino) a la funcion que crea el dropdown para ahorrar codigo
    })

    function getTramos() {
          var url = 'acciones.php?accion=getAllTramos';

          $.ajax({
              url: url,
              method: 'GET',
              dataType: 'JSON',
              success: function (data) {
                  llenarTabla(data);
              },
              error: function () {
                  alert('Error');
              }
          })
    }

    function getData(data) {
          var url = 'acciones.php?accion=ciudadesById';

          $.ajax({
              url: url,
              method: 'GET',
              dataType: 'JSON',
              success: function (data) {
                  ciudades = data;
              },
              error: function () {

              }
          })
    }

    function insertDropd(data){
      $(this).find('.empresa').remove();
      var dropd = '<div class="dropdown">' +
      '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ciudades</button>' +
      '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
      $.each(data, function(index, value){
        dropd += '<a class="dropdown-item" data-id="'+ index +'">'+ value +'</a>';
      })
      dropd += '</div></div>';
      $(this).parent().html(dropd);
    }

    llenarTabla = function (data) {
        var html = '';

        $.each(data, function (index, value) {
            html += '<tr>' +
                    '<td><span class="text">' + value.idTramo + '</span></td>' +
                    '<td><span class="drpdwn" data-get="empresa">' + value.nombreEmpresa + '</span></td>' +
                    '<td><span class="drpdwn" data-get="ciudad-origen">' + value.city1 + '</span></td>' +
                    '<td><span class="drpdwn" data-get="ciudad-destino">' + value.city2 + '</span></td>' +
                    '<td><span class="text">' + value.patente + '</span></td>' +
                    '<td><span class="text">' + value.precio + '</span></td>' +
                    '<td><span class="text">' + value.horarioSalida + '</span></td>' +
                    '<td><span class="text">' + value.duracion + '</span></td>' +
                    '</tr>';
        });

        $('#tabla-body').append(html);
    };
})
