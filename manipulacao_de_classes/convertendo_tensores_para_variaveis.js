$('#result').text('');

function executar() {
  let txt = '';
  const tfdata1 = tf.tensor([1, 2, 3, 4]);
  const tfdata2 = tf.tensor([[1, 2], [3, 4]]);
  const tfdata3 = tf.scalar(2);
  const dataSync1 = tfdata1.dataSync();
  const dataSync2 = tfdata2.dataSync();
  const dataSync3 = tfdata3.dataSync();

  const tfarray1 = tf.tensor([1, 2, 3, 4]);
  const tfarray2 = tf.tensor([[1, 2], [3, 4]]);
  const tfarray3 = tf.scalar(2);
  const arraySync1 = tfarray1.arraySync();
  const arraySync2 = tfarray2.arraySync();
  const arraySync3 = tfarray3.arraySync();

  txt += 'dataSync:\n';
  txt += 'antes: ' + tfdata1.toString() + '\n';
  txt += 'antes: ' + tfdata2.toString() + '\n';
  txt += 'antes: ' + tfdata3.toString() + '\n';
  txt += 'depois: ' + '[' + dataSync1.toString() + ']' + '\n\n';
  txt += 'depois: ' + '[' + dataSync2.toString() + ']' + '\n\n';
  txt += 'depois: ' + '[' + dataSync3.toString() + ']' + '\n\n';

  txt += 'arraySync:\n';
  txt += 'antes: ' + tfarray1.toString() + '\n';
  txt += 'antes: ' + tfarray2.toString() + '\n';
  txt += 'antes: ' + tfarray3.toString() + '\n';
  txt += 'depois: ' + JSON.stringify(arraySync1) + '\n\n';
  txt += 'depois: ' + JSON.stringify(arraySync2) + '\n\n';
  txt += 'depois: ' + JSON.stringify(arraySync3) + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}