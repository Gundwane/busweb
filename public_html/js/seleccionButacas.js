$(function(){
  var servicio1 = sessionStorage.getItem('servicio1');

  getButacasByTramo = function(){
    var url = 'acciones.php?accion=getBusPorTramo';
    $.ajax({
      url: url,
      dataType: 'json',
      method: 'POST',
      data: {busId: servicio1},
      success: function(data){
        generarAutobus(data);
      },
      error: function(){
        console.log('Error getin the butacas');
      }
    });
  };

  function generarAutobus(){
    var html = '', html2 = '';
    var contador = 0;
    for (var i = 0; i < 13; i++) {
      if (i < 8) {
        html += '<tr><td><i class="fa fa-square butacas idButaca='+ contador +'"></i><i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(1)) +'"></i><span class="spanPasillo"></span>' +
        '<i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(2)) +'"></i><i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(3)) +'"></i></td></tr>';
        contador = contador + 4;
      }else {
        html2 += '<tr><td><i class="fa fa-square butacas idButaca='+ contador +'"></i><i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(1)) +'"></i><span class="spanPasillo"></span>' +
        '<i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(2)) +'"></i><i class="fa fa-square butacas idButaca='+ (parseInt(contador)+parseInt(3)) +'"></i></td></tr>';
        contador = contador + 4;
      }
    }
    $('#bTablaButacas').append(html);
    $('#bTablaButacas2').append(html2);
  };

  generarAutobus();
});
