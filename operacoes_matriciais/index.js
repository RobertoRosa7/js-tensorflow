$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 3, 4], [2, 2]);
  const tensor2 = tf.tensor([5, 6, 7, 8], [2, 2]);
  const matMul = tensor1.matMul(tensor2); // multiplicação matricial;

  const tensor3 = tf.tensor([1, 2, 3]);
  const tensor4 = tf.tensor([3, 4, 5]);
  const outerProduct = tf.outerProduct(tensor3, tensor4); // cada elemento do um vezes todos do outro

  const tensor5 = tf.tensor([1, 2, 3, 4, 5, 6], [2, 3]);
  const transpose = tensor5.transpose(); // transforma linha em colunas;

  txt += 'matMul:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + matMul.toString() + '\n\n';

  txt += 'outerProduct:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + outerProduct.toString() + '\n\n';

  txt += 'transpose:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + transpose.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}