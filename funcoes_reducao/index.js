$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([true, true, true]);
  const all = tensor1.all(); // retorna true se todos os elemento for true;
  const all2 = tf.all(tensor1); // retorna true se todos os elemento for true;

  const tensor2 = tf.tensor([1, 2, 3, 4]);
  const max = tensor2.max(); // retorna o valor máximo dos elementos;

  const tensor3 = tf.tensor([1, 2, 3, 4]);
  const min = tensor3.min(); // retorna o valor menor dos elementos;

  const tensor4 = tf.tensor([1, 2, 3, 4]);
  const mean = tensor4.mean(); // retorna a média dos elementos;

  const tensor5 = tf.tensor([1, 2, 3, 4]);
  const prod = tensor5.prod(); // retorna o produto dos elementos;

  const tensor6 = tf.tensor([1, 2, 3, 4]);
  const sum = tensor5.sum(); // retorna a soma dos elementos;

  txt += 'all:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + all.toString() + '\n';
  txt += 'depois: ' + all2.toString() + '\n\n';

  txt += 'max:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + max.toString() + '\n\n';

  txt += 'min:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + min.toString() + '\n\n';

  txt += 'mean:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + mean.toString() + '\n\n';

  txt += 'prod:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + prod.toString() + '\n\n';

  txt += 'sum:\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + sum.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}