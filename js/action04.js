$('#result').text('');

function executar() {
  let txt = '';
  const fill0 = tf.fill([1], 0);
  const fill1 = tf.fill([2, 2], 1);
  const fill2 = tf.fill([2, 2], 2);

  txt += 'Fill: \n';
  txt += fill0.toString() + '\n\n';
  txt += fill1.toString() + '\n\n';
  txt += fill2.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}