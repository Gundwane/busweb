$(function(){
  var servicio1 = sessionStorage.getItem('servicio1');

  $('.tButacas').on('click', 'span', function(){
    if (!$(this).siblings('i').hasClass('butacaClicked')) {
      $(this).siblings('.butacas').addClass('butacaClicked');
    }else{
      $(this).siblings('.butacas').removeClass('butacaClicked');
    }
  });

  getButacasByTramo = function(){
    var url = 'acciones.php?accion=getBusPorTramo';
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'POST',
      data: {busId: servicio1},
      success: function(data){
        autobusData(data);
      },
      error: function(){
        console.log('Error getin the butacas');
      }
    });
  };

  autobusData = function(data){
    var indexer = 0;
    var bus = assocArrayExtractor(data);
    var html = '';
    $.each(bus, function(index, value){
      if (value === 'Comun'){
        $('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaComun');
          }
        });
      }else if (value === 'Semicama') {
        $('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaSemicama');
          }
        });
      }else if (value === 'Cama') {
        $('td').each(function(){
          if (($(this).attr('id')) == index) {
            $(this).find('span').siblings('i').addClass('butacaCama');
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

  getButacasByTramo();
});
