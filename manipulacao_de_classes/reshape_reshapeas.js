$('#result').text('');

function executar() {
  let txt = '';
  const tensor1 = tf.tensor([[1, 2], [3, 4]]);

  const tensor2 = tf.tensor([true, false, false, true]);
  const toFloat = tensor2.toFloat();

  const tensor3 = tf.tensor([1.2, 3.2, 4.9, 5.5]);
  const toInt = tensor3.toInt();

  const tensor4 = tf.tensor([1, 0, 1, 0]);
  const toBool = tensor4.toBool();

  const tensor5 = tf.tensor([1, 2, 3, 4]);
  const reshape = tensor5.reshape([2, 2]);

  const tensor6 = tf.tensor([[1, 2], [3, 4]]);
  const tensor7 = tf.tensor([1, 2, 3, 4]);
  const reshapeAs = tensor6.reshapeAs(tensor7);


  txt += 'dispose:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  tensor1.dispose();
  txt += 'depois: ' + 'Memória liberada' + '\n\n';

  txt += 'toFloat:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + toFloat.toString() + '\n\n';

  txt += 'toInt:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + toInt.toString() + '\n\n';

  txt += 'toBool:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + toBool.toString() + '\n\n';

  txt += 'reshape:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + reshape.toString() + '\n\n';

  txt += 'reshapeAs:\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + reshapeAs.toString() + '\n\n';
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}