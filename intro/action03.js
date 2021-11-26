$('#result').text('');

function executar() {
  let txt = '';
  const tensor1 = tf.tensor([[1, 2], [3, 4]]);
  const tensor2 = tf.tensor([1, 2, 3, 4], [2, 2]);

  tensor1.print();
  txt += 'Tensor Padrão: \n' + tensor1.toString() + '\n\n';
  txt += 'Tensor Padrão com dimensionalidade: \n' + tensor2.toString() + '\n\n';
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}