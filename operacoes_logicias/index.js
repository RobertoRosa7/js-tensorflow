$('#result').text('');

function executar() {
  let txt = '';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}