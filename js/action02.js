$('#result').text('');

function executar() {
  let txt = '';
  const tensor2d = tf.tensor2d([1, 2, 3, 4], [2, 2]);
  txt += 'Tensor Escalar: \n' + tensor2d.toString() + '\n\n';
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}