$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 1, 2, 1]); // expectativas;
  const tensor2 = tf.tensor([1, 1, 1, 1, 2]); // realidade;
  const confusionMatrix = tf.math.confusionMatrix(tensor1, tensor2, 2);

  const tensor3 = tf.tensor([0, 0, 0, 1, 1, 1, 1, 1, 1, 1]); // expecitativas;
  const tensor4 = tf.tensor([0, 1, 1, 0, 0, 0, 1, 1, 1, 1]); // realidade;
  const confusionMatrix2 = tf.math.confusionMatrix(tensor3, tensor4, 2);

  const tensor5 = tf.tensor([false, false, false, false, false, false, false, true, true, true]); // expecitativas;
  const tensor6 = tf.tensor([false, false, false, false, true, true, true, false, false, true]); // realidade;
  const confusionMatrix3 = tf.math.confusionMatrix(tensor5, tensor6, 2);


  txt += 'confusionMatrix:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + confusionMatrix.flatten().toString() + '\n\n';

  txt += 'confusionMatrix-v2:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + confusionMatrix2.flatten().toString() + '\n\n';

  txt += 'confusionMatrix-v3:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + confusionMatrix3.flatten().toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}