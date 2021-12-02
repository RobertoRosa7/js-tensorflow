$('#result').text('');

function executar() {
  let txt = '';
  const tensor1 = tf.tensor([-1, 2, -3, 4]);
  const abs = tensor1.abs(); // valor positivo;

  const tensor2 = tf.tensor([1, -1]);
  const acos = tensor2.acos(); // arco cosseno;

  const tensor3 = tf.tensor([1, 2.5]);
  const acosh = tensor3.acosh(); // arco cosseno hiperbólico;

  const tensor4 = tf.tensor([1, -1]);
  const asin = tensor4.asin(); // arco seno

  const tensor5 = tf.tensor([1, -1]);
  const asinh = tensor5.asinh(); // arco cosseno  hiperbólico;

  const tensor6 = tf.tensor([1, -1]);
  const atan = tensor6.atan(); // arco tangente;
  const atan2 = tf.atan2(1, -1); // arco tangente do coeficiente dos argumentos passados;

  const tensor7 = tf.tensor([1.2, 2.5, 3.8]);
  const ceil = tensor7.ceil(); // arredondamento para cima;
  const floor = tensor7.floor(); // arredondamento para baixo;

  const tensor8 = tf.tensor([1, 2]);
  const cos = tensor8.cos(); // cosseno;

  const tensor9 = tf.tensor([1, 2]);
  const cosh = tensor9.cosh(); // cosseno hiperbólico;

  const tensor10 = tf.tensor([1, 2]);
  const exp = tensor10.exp(); // elava a constante de Euler a cada um dos elementos;

  const tensor11 = tf.tensor([1, 2]);
  const expm1 = tensor11.expm1(); // eleva a constante de Euler a cada um dos elementos menos

  const tensor12 = tf.tensor([1, 2]);
  const log = tensor12.log();

  const tensor13 = tf.tensor([-1, 2]);
  const neg = tensor13.neg(); // converte positivo em negativo e vice versa;

  const tensor14 = tf.tensor([1.2, 2.6, 3.5, 2.9]);
  const round = tensor14.round(); // converte positivo em negativo e vice versa;

  const tensor15 = tf.tensor([9, 25]);
  const rsqrt = tensor15.rsqrt(); // divide o resultado da raiz quadrada por um;

  const tensor16 = tf.tensor([-1, 2, -3, 0]);
  const sign = tensor16.sign(); // retorna -1 para negativo, 1 para positivo e 0 para null;

  const tensor17 = tf.tensor([-1, 1]);
  const sin = tensor17.sin(); // retorna o valor do seno de cada elemento;

  const tensor18 = tf.tensor([-1, 1]);
  const sinh = tensor18.sinh(); // retorna o valor do seno  hiperbólico de cada elemento;

  const tensor19 = tf.tensor([9, 25]);
  const sqrt = tensor19.sqrt(); // raiz quadrada;

  const tensor20 = tf.tensor([3, 5]);
  const square = tensor20.square(); // elevar cada um elemento a raiz quadrada;

  const tensor21 = tf.tensor([1, 2, 3, 4, 5]);
  const tan = tensor21.tan(); // retornar a tangente de cada elemento;

  txt += 'abs:\n';
  txt += 'antes: ' + tensor1.toString() + '\n';
  txt += 'depois: ' + abs.toString() + '\n\n';

  txt += 'acos:\n';
  txt += 'antes: ' + tensor2.toString() + '\n';
  txt += 'depois: ' + acos.toString() + '\n\n';

  txt += 'acosh:\n';
  txt += 'antes: ' + tensor3.toString() + '\n';
  txt += 'depois: ' + acosh.toString() + '\n\n';

  txt += 'asin:\n';
  txt += 'antes: ' + tensor4.toString() + '\n';
  txt += 'depois: ' + asin.toString() + '\n\n';

  txt += 'asinh:\n';
  txt += 'antes: ' + tensor5.toString() + '\n';
  txt += 'depois: ' + asinh.toString() + '\n\n';

  txt += 'atan:\n';
  txt += 'antes: ' + tensor6.toString() + '\n';
  txt += 'depois: ' + atan.toString() + '\n\n';

  txt += 'atan2:\n';
  txt += 'antes: ' + 'atan2 de 1 e -1' + '\n';
  txt += 'depois: ' + atan2.toString() + '\n\n';

  txt += 'ceil:\n';
  txt += 'antes: ' + tensor7.toString() + '\n';
  txt += 'depois: ' + ceil.toString() + '\n\n';

  txt += 'floor:\n';
  txt += 'antes: ' + tensor7.toString() + '\n';
  txt += 'depois: ' + floor.toString() + '\n\n';

  txt += 'cos:\n';
  txt += 'antes: ' + tensor8.toString() + '\n';
  txt += 'depois: ' + cos.toString() + '\n\n';

  txt += 'cosh:\n';
  txt += 'antes: ' + tensor9.toString() + '\n';
  txt += 'depois: ' + cosh.toString() + '\n\n';

  txt += 'exp:\n';
  txt += 'antes: ' + tensor10.toString() + '\n';
  txt += 'depois: ' + exp.toString() + '\n\n';

  txt += 'expm1:\n';
  txt += 'antes: ' + tensor11.toString() + '\n';
  txt += 'depois: ' + expm1.toString() + '\n\n';

  txt += 'log:\n';
  txt += 'antes: ' + tensor12.toString() + '\n';
  txt += 'depois: ' + log.toString() + '\n\n';

  txt += 'neg:\n';
  txt += 'antes: ' + tensor13.toString() + '\n';
  txt += 'depois: ' + neg.toString() + '\n\n';

  txt += 'round:\n';
  txt += 'antes: ' + tensor14.toString() + '\n';
  txt += 'depois: ' + round.toString() + '\n\n';

  txt += 'rsqrt:\n';
  txt += 'antes: ' + tensor15.toString() + '\n';
  txt += 'depois: ' + rsqrt.toString() + '\n\n';

  txt += 'sign:\n';
  txt += 'antes: ' + tensor16.toString() + '\n';
  txt += 'depois: ' + sign.toString() + '\n\n';

  txt += 'sin:\n';
  txt += 'antes: ' + tensor17.toString() + '\n';
  txt += 'depois: ' + sin.toString() + '\n\n';

  txt += 'sinh:\n';
  txt += 'antes: ' + tensor18.toString() + '\n';
  txt += 'depois: ' + sinh.toString() + '\n\n';

  txt += 'sqrt:\n';
  txt += 'antes: ' + tensor19.toString() + '\n';
  txt += 'depois: ' + sqrt.toString() + '\n\n';

  txt += 'square:\n';
  txt += 'antes: ' + tensor20.toString() + '\n';
  txt += 'depois: ' + square.toString() + '\n\n';

  txt += 'tan:\n';
  txt += 'antes: ' + tensor21.toString() + '\n';
  txt += 'depois: ' + tan.toString() + '\n\n';

  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}