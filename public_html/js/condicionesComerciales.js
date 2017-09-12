$(function(){
  var empresa1 = sessionStorage.getItem('1');
  var empresa2 = sessionStorage.getItem('2');
  var div1 = $('#empresaIda');
  var div2 = $('#empresaVuelta');
  var flag = false;

  condicionesToSpan(empresa1, div1);
  if (empresa2 !== 'null') {
    div2.css('display', 'block');
    condicionesToSpan(empresa2, div2);
  }

  $('#backButton').click(function(){
    window.location.replace('datosIniciales.html');
  });

  $(':checkbox').change(function(){
    var check1 = $('#empresa1Checker');
    var check2 = $('#empresa2Checker');
    if (div2.is(':visible')) {
      if (check1.is(':checked') && check2.is(':checked')) {
        $('#btnContinuar').removeAttr('disabled');
      }else {
        $('#btnContinuar').prop('disabled', true);
      }
    }else {
      if (check1.is(':checked')) {
        $('#btnContinuar').removeAttr('disabled');
      }else {
        $('#btnContinuar').prop('disabled', true);
    }
  }

  })

  $('#btnContinuar').click(function(){
    window.location.replace('seleccionButacas.html');
  })

  //IDEA: Que la funcion reciba las clases e IDs desde afuera para evitar la llamada sincrona y poder reutilizar la funcion
  // con ambos pedidos. De hecho...esto habilitaria a usar mas empresas en el futuro. Oh si! Good architecture!

  function condicionesToSpan(nombreEmpresa, divId){
    var url = 'acciones.php?accion=condiciones';

    divId.find('.spanNombre').append(nombreEmpresa);

    $.ajax({
      url: url,
      dataType: 'text',
      method: 'post',
      data: {nomEmp: nombreEmpresa},
      success: function(data){
        divId.find('.spanData').append(data);
      },
      error: function(){
        console.log('Nope');
      }
    })
  }
})
