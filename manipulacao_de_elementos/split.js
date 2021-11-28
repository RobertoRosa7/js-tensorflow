$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 3, 4, 5, 6, 7, 8], [2, 4]);
  const [tensor2, tensor3] = tf.split(tensor1, 2, 1);

  const tensor4 = tf.tensor([1, 2]);
  const tile = tensor4.tile([2]);

  txt += 'split:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + tensor2.toString() + '\n\n';
  txt += 'depois: ' + tensor3.toString() + '\n\n';

  txt += 'tile:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + tile.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}