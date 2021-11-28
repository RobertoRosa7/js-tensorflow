$('#result').text('');

function executar() {
  let txt = '';
  const randomNormal = tf.randomNormal([2, 2]);
  const randomUniform = tf.randomUniform([2, 2], 0, 1);

  txt += 'randomNormal:\n';
  txt += 'antes: ' + randomNormal.toString() + '\n';
  // txt += 'depois: ' + tile.toString() + '\n\n';

  txt += 'randomUniform:\n';
  txt += 'antes: ' + randomUniform.toString() + '\n';
  // txt += 'depois: ' + tile.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}