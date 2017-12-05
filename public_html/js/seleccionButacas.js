$(function(){
  var flagIda = '.tIda';
  var flagVuelta = '.tVuelta';
  var flagVCheck = false;
  var servicioIda = localStorage.getItem('servicioIda');
  var objectButacas = {};

  getButacasByTramo(servicioIda, flagIda);
  if (localStorage.getItem('servicioVuelta') != 'null'){
    flagVCheck = true;
    var servicioVuelta = localStorage.getItem('servicioVuelta');
    getButacasByTramo(servicioVuelta, flagVuelta);
    $('.left, .right').css('visibility','visible');
  }

  $('.tButacas').on('click', 'span', function(event){
    event.stopPropagation();
    var tempStore, number, objectIndex;

    if (!$(this).siblings('i').hasClass('butacaClicked')) {
      $(this).siblings('.butacas').addClass('butacaClicked');

      if ($(this).siblings('i').hasClass('butacaComun')) {  //Checkea que esté seleccionada y si es de la tabla de ida o vuelta
        var key = $(this).text();
        //ESTE CODIGO ES HORRIBLE. REVISAR Y MEJORAR APENAS PUEDA
        if ($(this).closest('tbody').hasClass('tIda')) {
          objectButacas[key] = ['Comun', 'Ida'];
        }else if($(this).closest('tbody').hasClass('tVuelta')){
          objectButacas[key] = ['Comun', 'Vuelta'];
        }
      }else if ($(this).siblings('i').hasClass('butacaSemicama')) {
        var key = $(this).text();
        if ($(this).closest('tbody').hasClass('tIda')) {
          objectButacas[key] = ['Semicama', 'Ida'];
        }else {
          objectButacas[key] = ['Semicama', 'Vuelta'];
        }
      }else if ($(this).siblings('i').hasClass('butacaCama')) {
        var key = $(this).text();
        if ($(this).closest('tbody').hasClass('tIda')) {
          objectButacas[key] = ['Cama', 'Ida'];
        }else {
          objectButacas[key] = ['Cama', 'Vuelta'];
        }
      }
    }else{
      $(this).siblings('.butacas').removeClass('butacaClicked');
      number = $(this).text();
        $.each(objectButacas, function(index, value) {
          if (index == number) {
            delete objectButacas[index];
          }
        });
    }
  });

  $("#backButton").click(function(){
    window.location.replace('datosIniciales.html');
  });

  $('#btnContinuar').click(function(){
    var flagOne = false;
    if (flagVCheck) {
      var flagTwo = false;
    }else {
      var flagTwo = true;
    }

    $.each(objectButacas, function(key, value){
      if (value[1] == 'Ida') {
        flagOne = true;
      }

      if (value[1] == 'Vuelta') {
        flagTwo = true;
      }
    })

    if (flagOne && flagTwo) {
      localStorage.setItem('array', JSON.stringify(objectButacas));
      window.location.replace('datosPasajero.html');
    }else if(!flagOne){
      console.log('No ida');
    }else{
      console.log('No vuelta');
    }
  })

  function getButacasByTramo(servicioId, flag){
    var url = 'acciones.php?accion=getBusPorTramo';
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'POST',
      data: {busId: servicioId},
      success: function(data){
        autobusData(data, flag);
      },
      error: function(){
        console.log('Error getin the butacas');
      }
    });
  };

  autobusData = function(data, flag){
    var indexer = 0;
    var bus = assocArrayExtractor(data);
    var html = '';
    $.each(bus, function(index, value){
      if (value === 'Comun'){
        $(flag).find('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaComun');
          }
        });
      }else if (value === 'Semicama') {
        $(flag).find('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaSemicama');
          }
        });
      }else if (value === 'Cama') {
        $(flag).find('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaCama');
          }
        });
      }else {
        $(flag).find('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').prop('disabled', true);
          }
        });
      }
    });
  };

  function assocArrayExtractor(array){
    var arrayAutobus = $.map(array, function(i){
      return i.arrayAsientos;
    });

    return arrayAutobus;
  };
});
