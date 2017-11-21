$(function(){
  window.localStorage.clear();
  $('#btnSubmit').click(function(){
    var usuario = $('#nombreLogin').val();

    localStorage.setItem('usuario', usuario);
  })

  $('#btnNuevo').click(function(){
    window.location.replace('addUserPls.html');
  })
})
