$(function(){
  var fecha = new Date();
  var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  $('#spanFecha').append(fecha.getDate()+' de '+mes[fecha.getMonth()]+' de '+fecha.getFullYear());
})
