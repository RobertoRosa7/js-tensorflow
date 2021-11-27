$('#result').text('');

function executar() {
  let txt = '';
  const tensor1 = tf.tensor([1, 2, 3, 4]);
  const expandDims = tensor1.expandDims(1); // adiciona uma nova dimensão

  const tensor2 = tf.tensor([[1], [2], [3], [4]]);
  const squeeze = tensor2.squeeze(1); // remove um dimensão

  const tensor3 = tf.tensor([1, 2, 3, 4]);
  const cumsum = tensor3.cumsum(); // resultado somatório dos elementos acumulativo

  const tensor4 = tf.tensor([1, 2, 3, 4]);
  const clone = tf.clone(tensor4); // clone do tensor4

  txt += 'expandDims:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + expandDims.toString() + '\n\n';

  txt += 'squeze:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + squeeze.toString() + '\n\n';

  txt += 'cumsum:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + cumsum.toString() + '\n\n';

  txt += 'clone:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + clone.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}