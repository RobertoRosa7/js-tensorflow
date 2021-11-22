$('#result').text('');

function executar() {
  let txt = '';
  const int32 = tf.tensor2d([1, 2, 3, 4], [2, 2], 'int32');
  const float32 = tf.tensor2d([1.5, 2.5, 3.33, 4.9], [2, 2], 'float32');
  const bool = tf.tensor2d([true, false, true, false], [2, 2], 'bool');
  const string = tf.tensor2d(['a', 'b', 'c', 'd'], [2, 2], 'string');

  txt += 'Tensor tipo int32: \n' + int32.toString() + '\n\n';
  txt += 'Tensor tipo float32: \n' + float32.toString() + '\n\n';
  txt += 'Tensor tipo bool: \n' + bool.toString() + '\n\n';
  txt += 'Tensor tipo string: \n' + string.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}