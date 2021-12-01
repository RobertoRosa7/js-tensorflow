$('#result').text('');

function executar() {
  let txt = '';

  // SOMANDO ELEMENTOS COM A FUNÇÃO ADD
  const tensor1 = tf.tensor([1, 2, 3, 4]);
  const tensor2 = tf.tensor([10, 20, 30, 40]);
  const add = tensor1.add(tensor2); // somar cada elemento com a mesma posição;

  txt += 'add:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + add.toString() + '\n\n';


  // SUBTRAINDO OS ELEMENTO COM A FUNÇÃO SUB
  const tensor4 = tf.tensor([1, 2, 3, 4]);
  const tensor3 = tf.tensor([10, 20, 30, 40]);
  const sub = tensor3.sub(tensor4); // subtrair cada elemento com a mesma posição;

  txt += 'sub:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + sub.toString() + '\n\n';


  // MULTIPLICAÇÃO OS ELEMENTO COM A FUNÇÃO MUL
  const tensor5 = tf.tensor([1, 2, 3, 4]);
  const tensor6 = tf.tensor([1, 4, 5, 4]);
  const mul = tensor5.mul(tensor6); // multiplicar cada elemento com a mesma posição;

  txt += 'mul:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + mul.toString() + '\n\n';


  // DIVISÃO OS ELEMENTO COM A FUNÇÃO DIV
  const tensor7 = tf.tensor([4, 8, 15, 40]);
  const tensor8 = tf.tensor([1, 2, 3, 2]);
  const div = tensor7.div(tensor8); // dividr cada elemento com a mesma posição;

  txt += 'div:\n';
  txt += 'antes: ' + tensor7.toString() + '\n';
  txt += 'antes: ' + tensor8.toString() + '\n';
  txt += 'depois: ' + div.toString() + '\n\n';


  // DIVISÃO OS ELEMENTO COM A FUNÇÃO FLOORDIV
  const tensor9 = tf.tensor([4, 8, 15, 40]);
  const tensor10 = tf.tensor([1, 2, 3, 2]);
  const floorDiv = tensor7.floorDiv(tensor8); // dividr cada elemento com a mesma posição;

  txt += 'floorDiv:\n';
  txt += 'antes: ' + tensor9.toString() + '\n';
  txt += 'antes: ' + tensor10.toString() + '\n';
  txt += 'depois: ' + floorDiv.toString() + '\n\n';


  // ADDN OS ELEMENTO COM A FUNÇÃO ADDN
  const tensor11 = tf.tensor([1, 3]);
  const tensor12 = tf.tensor([2, 4]);
  const tensor13 = tf.tensor([1, 1]);
  const addN = tf.addN([tensor11, tensor12, tensor13]); // somar dois ou mais cada elemento com a mesma posição;

  txt += 'addN:\n';
  txt += 'antes: ' + tensor11.toString() + '\n';
  txt += 'antes: ' + tensor12.toString() + '\n';
  txt += 'antes: ' + tensor13.toString() + '\n';
  txt += 'depois: ' + addN.toString() + '\n\n';


  // MAXIMUM 
  const tensor14 = tf.tensor([1, 2, 3, 4]);
  const tensor15 = tf.tensor([0, 5, 1, 3]);
  const maximum = tensor14.maximum(tensor15);

  txt += 'maximum:\n';
  txt += 'antes: ' + tensor14.toString() + '\n';
  txt += 'antes: ' + tensor15.toString() + '\n';
  txt += 'depois: ' + maximum.toString() + '\n\n';

  // MiNIMUM
  const tensor16 = tf.tensor([1, 2, 3, 4]);
  const tensor17 = tf.tensor([0, 5, 1, 3]);
  const minimum = tensor16.minimum(tensor17);

  txt += 'minimum:\n';
  txt += 'antes: ' + tensor16.toString() + '\n';
  txt += 'antes: ' + tensor17.toString() + '\n';
  txt += 'depois: ' + minimum.toString() + '\n\n';

  // MOD
  const tensor18 = tf.tensor([8, 9, 7, 5]);
  const tensor19 = tf.tensor([2, 3, 2, 2]);
  const mod = tensor18.mod(tensor19) // o resto da divisão de cada indice;

  txt += 'mod:\n';
  txt += 'antes: ' + tensor18.toString() + '\n';
  txt += 'antes: ' + tensor19.toString() + '\n';
  txt += 'depois: ' + mod.toString() + '\n\n';

  // Pow
  const tensor20 = tf.tensor([2, 3]);
  const tensor21 = tf.tensor([3, 2]);
  const pow = tensor20.pow(tensor21) // potenciação de cada indice;

  txt += 'pow:\n';
  txt += 'antes: ' + tensor20.toString() + '\n';
  txt += 'antes: ' + tensor21.toString() + '\n';
  txt += 'depois: ' + pow.toString() + '\n\n';


  // squaredDifference
  const tensor22 = tf.tensor([2, 7]);
  const tensor23 = tf.tensor([1, 2]);
  const squaredDifference = tensor22.squaredDifference(tensor23) // raiz quadrada de cada indice;

  txt += 'squaredDifference:\n';
  txt += 'antes: ' + tensor22.toString() + '\n';
  txt += 'antes: ' + tensor23.toString() + '\n';
  txt += 'depois: ' + squaredDifference.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}