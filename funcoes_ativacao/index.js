$('#result').text('');

function executar() {
  let txt = '';

  const tensor1 = tf.tensor([-1, 0, 1, 2]);
  const tanh = tensor1.tanh(); // -1 e 1; tangente hiperbólica - intervalo de -1 e 1

  const tensor2 = tf.tensor([-1, 0, 1, 2]);
  const sigmoid = tensor2.sigmoid(); // 0 e 1; função sigmoid intervalo de 0 e 1;

  const tensor3 = tf.tensor([-1, 0, 1, 2, -3]);
  const relu = tensor3.relu(); // 0 e n; função relu intervalo infinito - converte números negativo em 0;

  const tensor4 = tf.tensor([-1, 0, 1, 2]);
  const leakyRelu = tensor4.leakyRelu(); // 0 e n; função leakyrulu divide números menores que 0 por 5;

  const tensor5 = tf.tensor([-1, 0, 1, 2]);
  const softmax = tensor5.softmax(); // função softmax intervalo de 0 1 com algoritmo diferente;

  const tensor6 = tf.tensor([-1, 0, 1, 2]);
  const softplus = tensor6.softplus(); // função softplus coloca valores negativos no intervalo de 0 e 1;

  txt += 'tanh:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + tanh.flatten().toString() + '\n\n';

  txt += 'sigmoid:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + sigmoid.flatten().toString() + '\n\n';

  txt += 'relu:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + relu.flatten().toString() + '\n\n';

  txt += 'leakyRelu:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + leakyRelu.flatten().toString() + '\n\n';

  txt += 'softmax:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + softmax.flatten().toString() + '\n\n';

  txt += 'softplus:\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + softplus.flatten().toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}