$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 3, 4]);
  const tensor2 = tf.tensor([1, 0, 3, 5]);
  const equal = tensor1.equal(tensor2); // true para valores iguais;

  const tensor3 = tf.tensor([1, 2, 3, 4]);
  const tensor4 = tf.tensor([1, 0, 3, 5]);
  const greater = tensor3.greater(tensor4); // true para valores maiores

  const tensor5 = tf.tensor([0, 2, 3, 7]);
  const tensor6 = tf.tensor([1, 0, 3, 5]);
  const greaterEqual = tensor5.greaterEqual(tensor6); // true para valores maiores ou iguais;

  const tensor7 = tf.tensor([0, 2, 3, 7]);
  const tensor8 = tf.tensor([1, 0, 3, 5]);
  const less = tensor7.less(tensor8); // true para menores;

  const tensor9 = tf.tensor([0, 2, 3, 7]);
  const tensor10 = tf.tensor([1, 0, 3, 5]);
  const lessEqual = tensor9.lessEqual(tensor10); // true para menores ou iguais;

  const tensor11 = tf.tensor([false, false, true, true]);
  const tensor12 = tf.tensor([false, true, false, true]);
  const logicalAnd = tensor11.logicalAnd(tensor12); // true se ambos valores forem true;

  const tensor13 = tf.tensor([false, false, true, true]);
  const tensor14 = tf.tensor([false, true, false, true]);
  const logicalOr = tensor13.logicalOr(tensor14); // false se ambos valores forem false;

  const tensor15 = tf.tensor([false, false, true, true]);
  const tensor16 = tf.tensor([false, true, false, true]);
  const logicalXor = tensor15.logicalXor(tensor16); // true para valores divergente; false para valores iguais

  const tensor17 = tf.tensor([false, false, true, true]);
  const tensor18 = tf.tensor([false, true, false, true]);
  const notEqual = tensor17.notEqual(tensor18); // true para valores divergente; qualquer tipo de valor;

  const tensor19 = tf.tensor([1, 2.2, 3, 8.2]);
  const tensor20 = tf.tensor([1, 3, 8.2, 3]);
  const notEqual2 = tensor19.notEqual(tensor20); // true para valores divergente; qualquer tipo de valor

  txt += 'equal:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + equal.toString() + '\n\n';

  txt += 'greater:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + greater.toString() + '\n\n';

  txt += 'greaterEqual:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + greaterEqual.toString() + '\n\n';

  txt += 'less:\n';
  txt += 'antes: ' + tensor7.toString() + '\n';
  txt += 'antes: ' + tensor8.toString() + '\n';
  txt += 'depois: ' + less.toString() + '\n\n';

  txt += 'lessEqual:\n';
  txt += 'antes: ' + tensor9.toString() + '\n';
  txt += 'antes: ' + tensor10.toString() + '\n';
  txt += 'depois: ' + lessEqual.toString() + '\n\n';

  txt += 'logicalAnd:\n';
  txt += 'antes: ' + tensor11.toString() + '\n';
  txt += 'antes: ' + tensor12.toString() + '\n';
  txt += 'depois: ' + logicalAnd.toString() + '\n\n';

  txt += 'logicalOr:\n';
  txt += 'antes: ' + tensor13.toString() + '\n';
  txt += 'antes: ' + tensor14.toString() + '\n';
  txt += 'depois: ' + logicalOr.toString() + '\n\n';

  txt += 'logicalXor:\n';
  txt += 'antes: ' + tensor15.toString() + '\n';
  txt += 'antes: ' + tensor16.toString() + '\n';
  txt += 'depois: ' + logicalXor.toString() + '\n\n';

  txt += 'notEqual:\n';
  txt += 'antes: ' + tensor17.toString() + '\n';
  txt += 'antes: ' + tensor18.toString() + '\n';
  txt += 'depois: ' + notEqual.toString() + '\n\n';

  txt += 'notEqual-v2:\n';
  txt += 'antes: ' + tensor19.toString() + '\n';
  txt += 'antes: ' + tensor20.toString() + '\n';
  txt += 'depois: ' + notEqual2.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}