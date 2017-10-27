$(function(){
  window.localStorage.clear();
  $('.btn').click(function(){
    var usuario = $('#nombreLogin').val();

    localStorage.setItem('usuario', usuario);
  })
})
