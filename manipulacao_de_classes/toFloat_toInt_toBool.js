$('#result').text('');

function executar() {
  let txt = '';
  const tensor1 = tf.tensor([[1, 2], [3, 4]]);

  txt += 'dispose:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  tensor1.dispose();
  txt += 'depois: ' + 'Memória liberada' + '\n\n';
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}