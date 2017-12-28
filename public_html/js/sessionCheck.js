
var usuario = localStorage.getItem('usuario');

function sessionCheck(){
  if (usuario === null) {
    alert('Debes ingresar como usuario o crear uno');
    window.location.replace('login.html');
  }else {
    $('#spanUser').append(usuario);
  }
}

$('#cerrarSession').click(function() {
  localStorage.removeItem('usuario');
  window.location.replace('login.html');
});
