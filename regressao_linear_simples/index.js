/*
### Regressão Linear Simples:

Usada no reconhecimento de padrões númericos onde há uma evolução gradativa dos números em ordem
sequencial e pre-definida;

*/

$('#result').text('');
$('#eixoX').text('');
$('#eixoY').text('');

const tensorX = tf.tensor([1, 2, 3, 4, 5, 6, 7]);
const tensorY = tf.tensor([11, 22, 33, 44]);

function executar2() {
  let eixoX = $('#eixoX').val();
  let eixoY = $('#eixoY').val();

  let arrX = eixoX.split(',');
  let arrY = eixoY.split(',');

  let vetorX = convertToNumber(arrX);
  let vetorY = convertToNumber(arrY);

  let tamX = vetorX.length;
  let tamY = vetorY.length;
  let tempX = vetorX.slice(0, tamY);
  let tempY = vetorY;
  let dif = tamX - tamY;

  if (dif > 0) {
    let regressao = [];

    for (let i = 0; i < dif; i++) {
      let temp = regressaoLinear(tempX, tempY, vetorX[tamY + i]);
      regressao.push(temp);
    }
    let novoY = tempY.concat(regressao);
    $('#eixoY').val(novoY.toString().replace(/,/g, ', '));
  }
}

async function executar() {
  // let txt = regressaoLinearSimples();
  let txt = await compileNeuralNetwork();
  exibir(txt);
}

function exibir(str = '') {
  $('#result').text(str);
}

function tensorToArray(tensor) {
  return eval(`array = ${tensor.toString().replace('Tensor', '').trim()}`);
}

function arrayToTensor(array) {
  return tf.tensor(array);
}

function regressaoLinear(arrX, arrY, p) {
  let x = arrayToTensor(arrX);
  let y = arrayToTensor(arrY);

  let resultado1 = x.sum().mul(y.sum()).div(x.size);
  let resultado2 = x.sum().mul(x.sum()).div(x.size);
  let resultado3 = x.mul(y).sum().sub(resultado1);
  let resultado4 = resultado3.div(x.square().sum().sub(resultado2));
  let resultado5 = y.mean().sub(resultado4.mul(x.mean()));

  let tensor = resultado4.mul(p).add(resultado5);
  let array = tensorToArray(tensor);
  return array;
}

function convertToNumber(array) {
  return array.map((value) => parseFloat(value.toString().trim()));
}

async function compileNeuralNetwork() {
  $('#result').text('...processando');
  let txt = '';

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const x = tf.tensor([1, 2, 3, 4], [4, 1]);
  const y = tf.tensor([[9], [18], [27], [36]]);
  const input = tf.tensor([5, 6, 7], [3, 1]);

  // model.fit(x, y, { epochs: 500 }).then(() => {
  //   let output = model.predict(input).dataSync();
  //   output = convertArray(output);
  //   let z = tf.tensor(output);
  //   txt += 'Regressão Linear Simples com Rede Neural:\n';
  //   txt += 'Treinamento: ' + x.flatten().toString() + '\n';
  //   txt += 'Treinamento: ' + y.flatten().toString() + '\n';
  //   txt += 'Entrada: ' + input.flatten().toString() + '\n';
  //   txt += 'Saída: ' + z.toString() + '\n\n';
  // });

  await model.fit(x, y, { epochs: 550 });
  let output = model.predict(input).dataSync();
  output = convertArray(output);
  let z = tf.tensor(output);
  txt += 'Regressão Linear Simples com Rede Neural:\n';
  txt += 'Treinamento: ' + x.flatten().toString() + '\n';
  txt += 'Treinamento: ' + y.flatten().toString() + '\n';
  txt += 'Entrada: ' + input.flatten().toString() + '\n';
  txt += 'Saída: ' + z.toString() + '\n\n';

  return txt;
}

function convertArray(array) {
  return array.map(value => Math.ceil(value));
}

function regressaoLinearSimples() {
  let txt = '';
  let vetorX = tensorToArray(tensorX);
  let vetorY = tensorToArray(tensorY);
  let tamX = vetorX.length;
  let tamY = vetorY.length;
  let tempX = vetorX.slice(0, tamY);
  let tempY = vetorY;
  let dif = tamX - tamY;

  if (dif > 0) {
    let regressao = [];

    for (let i = 0; i < dif; i++) {
      let temp = regressaoLinear(tempX, tempY, vetorX[tamY + i]);
      regressao.push(temp);
    }

    let novoY = tempY.concat(regressao);
    let tensorZ = tf.tensor(novoY);

    txt += 'Regressão Linear Simples:\n';
    txt += 'antes: ' + tensorX.toString() + '\n';
    txt += 'antes: ' + tensorY.toString() + '\n';
    txt += 'depois: ' + tensorZ.toString() + '\n\n';
  }
  return txt;
}