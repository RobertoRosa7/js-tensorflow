$('#result').text('');

function executar() {
  let txt = '';

  const fill0 = tf.fill([1], 0);
  const fill1 = tf.fill([2, 2], 1);
  const fill2 = tf.fill([2, 2], 2);

  const zeros = tf.zeros([1]);
  const zeros2 = tf.zeros([2, 2]);
  const zeros3 = tf.zeros([2, 4]);

  const ones = tf.ones([1]);
  const ones2 = tf.ones([2, 2]);
  const ones3 = tf.ones([2, 4]);

  const linspace = tf.linspace(0, 9, 10);
  const linspace2 = tf.linspace(1, 10, 10);
  const linspace3 = tf.linspace(1, 15, 15);

  const range = tf.range(1, 11, 1);
  const range2 = tf.range(0, 21, 2);
  const range3 = tf.range(0, 101, 10);

  txt += 'Fill: \n';
  txt += fill0.toString() + '\n\n';
  txt += fill1.toString() + '\n\n';
  txt += fill2.toString() + '\n\n';

  txt += 'Zeros: \n';
  txt += zeros.toString() + '\n\n';
  txt += zeros2.toString() + '\n\n';
  txt += zeros3.toString() + '\n\n';

  txt += 'Ones: \n';
  txt += ones.toString() + '\n\n';
  txt += ones2.toString() + '\n\n';
  txt += ones3.toString() + '\n\n';

  txt += 'Linspace: \n';
  txt += linspace.toString() + '\n\n';
  txt += linspace2.toString() + '\n\n';
  txt += linspace3.toString() + '\n\n';

  txt += 'Range: \n';
  txt += range.toString() + '\n\n';
  txt += range2.toString() + '\n\n';
  txt += range3.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}