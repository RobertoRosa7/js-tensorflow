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
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}