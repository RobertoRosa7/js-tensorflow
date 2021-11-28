$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([1, 2, 3, 4]);
  const pad = tensor1.pad([[1, 2]]);

  const tensor2 = tf.tensor([1, 2]);
  const tensor3 = tf.tensor([3, 4]);
  const concat = tensor2.concat(tensor3);
  // const concat = tensor2.concat([tensor2, tensor3]);

  const tensor4 = tf.tensor([1, 2]);
  const tensor5 = tf.tensor([3, 4]);
  const stack = tf.stack([tensor4, tensor5]);


  txt += 'pad:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + pad.toString() + '\n\n';

  txt += 'concat:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + concat.toString() + '\n\n';

  txt += 'stack:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + stack.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}