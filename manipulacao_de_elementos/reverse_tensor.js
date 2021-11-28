$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 3, 4], [2, 2]);
  const reverse = tensor1.reverse()

  txt += 'reverse:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + reverse.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}