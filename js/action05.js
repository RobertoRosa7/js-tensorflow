$('#result').text('');

function executar() {
  let txt = '';
  const tensor1d = tf.tensor([1.5]);
  const asScalar = tensor1d.asScalar(); // converte o tensor dimensional para scalar - int ou float

  const tensor2d = tf.tensor([1, 2, 3, 4], [2, 2]);
  const flatten = tensor2d.flatten(); // converte 2D para 1D

  const tensor1 = tf.tensor([1, 2, 3, 4], [2, 2]);
  const as1D = tensor1.as1D(); // converte 2D para 1D

  const tensor2 = tf.tensor([1, 2, 3, 4], [2, 2, 1]);
  const as2D = tensor2.as2D(2, 2); // converte 3D para 2D;

  const tensor3 = tf.tensor([1, 2, 3, 4], [1, 2, 2, 1]);
  const as3D = tensor3.as3D(2, 2, 1); // converte 4D para 3D

  const tensor4 = tf.tensor([1, 2, 3, 4]);
  const as4D = tensor4.as4D(1, 2, 2, 1);

  const tensor5 = tf.tensor([1, 2, 3, 4, 5, 6, 7, 8]);
  const as5D = tensor5.as5D(1, 2, 2, 2, 1)

  txt += 'asScalar:\n';
  txt += 'antes: ' + tensor1d.toString() + '\n';
  txt += 'depois: ' + asScalar.toString() + '\n\n';

  txt += 'flatten:\n';
  txt += 'antes: ' + tensor2d.toString() + '\n';
  txt += 'depois: ' + flatten.toString() + '\n\n';

  txt += 'as1D:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + as1D.toString() + '\n\n';

  txt += 'as2D:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + as2D.toString() + '\n\n';

  txt += 'as3D:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + as3D.toString() + '\n\n';

  txt += 'as4D:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + as4D.toString() + '\n\n';

  txt += 'as5D:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + as5D.toString() + '\n\n';
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}