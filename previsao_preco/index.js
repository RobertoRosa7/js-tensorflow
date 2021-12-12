let arrX = [];
let arrY = [];
let arrInput = [];

function neuralNetwork(Input) {
  return new Promise(resolve => {
    let units = 1;
    let inputShape = 1;
    let linesX = Number(arrX.length);
    let linesInput = 1;

    const model = tf.sequential();
    const inputLayers = tf.layers.dense({ units, inputShape: [inputShape] });
    model.add(inputLayers);
    model.compile({ loss: 'meanSquaredError', optimizer: tf.train.sgd(.00001) });

    const x = tf.tensor(arrX, [linesX, inputShape]);
    const y = tf.tensor(arrY);
    const input = tf.tensor(Input, [linesInput, inputShape]);

    model.fit(x, y, { epochs: 240 }).then(() => {
      let output = model.predict(input).dataSync();
      output = convertArray(output);
      output = aproximaOutput(output);
      resolve(output)
    });
  })
}

function aproximaOutput(number) {
  let two = number.toString().substr(0, 2);
  return Number(two.padEnd(number.toString().length, 0))
}

async function executar2() {
  exibir('...processando');
  let input = (parseFloat($('#metros').val()) + parseFloat($('#idade').val())) / 2;
  // let output = regressaoLinear(input);
  let output = await neuralNetwork(input);
  $('#price').val(`R$ ${Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(output)}`);
  exibir('concluído.');
}

function regressaoLinear(input) {
  let x = tf.tensor(arrX);
  let y = tf.tensor(arrY);

  let resultado1 = x.sum().mul(y.sum()).div(x.size);
  let resultado2 = x.sum().mul(x.sum()).div(x.size);
  let resultado3 = x.mul(y).sum().sub(resultado1);
  let resultado4 = resultado3.div(x.square().sum().sub(resultado2));
  let resultado5 = y.mean().sub(resultado4.mul(x.mean()));

  let tensor = resultado4.mul(input).add(resultado5);
  let result = tensor.dataSync();
  return result;
}

function executar() {
  exibir('...processando');

  let txt = '';
  let units = Number(arrY[0].length);
  let inputShape = Number(arrX[0].length);
  let linesX = Number(arrX.length);
  let linesInput = Number(arrInput.length);

  const model = tf.sequential();
  const inputLayers = tf.layers.dense({ units, inputShape: [inputShape] });
  model.add(inputLayers);
  model.compile({ loss: 'meanSquaredError', optimizer: tf.train.sgd(.05) });

  const x = tf.tensor(arrX, [linesX, inputShape]);
  const y = tf.tensor(arrY);
  const input = tf.tensor(arrInput, [linesInput, inputShape]);

  model.fit(x, y, { epochs: 500 }).then(() => {
    let output = model.predict(input).dataSync();
    output = convertArray(output);
    let z = tf.tensor(output);
    txt += 'Regressão Linear Multipla com Rede Neural: \n';
    txt += 'Treinamento: ' + x.toString() + '\n';
    txt += 'Treinamento: ' + y.toString() + '\n';
    txt += 'Entrada: ' + input.toString() + '\n';
    txt += 'Saída: ' + z.toString() + '\n\n';
    exibir(txt);
  });
}

function convertArray(array) {
  return array.map(value => Math.ceil(value).toFixed(0));
}

function exibir(str = '') {
  $('#result').text(str);
}

function abrir({ target }) {
  loadingFile(target.files).then((data) => prepare(data));
}

function openFile({ target }) {
  loadingFile(target.files).then((data) => prepare2(data));
}

function loadingFile(files) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(files.item(0));
  });
}

function carregar(str = '') {
  $.ajax({
    url: str,
    dataType: 'text',
    success: prepare
  });
}

function prepare2(data) {
  let caractere = ',';
  if (data.indexOf(';') >= 0) {
    caractere = ';'
  }
  let arrLinha = data.split('\r\n');
  let titulos = arrLinha[0].split(caractere);
  let qtdEntradas = titulos.filter(x => x === 'input').length;
  let X = [];
  let Y = [];

  for (let i = 1; i < arrLinha.length; i++) {
    let arrCell = arrLinha[i].split(caractere);
    let sumX = 0;
    for (let j = 0; j < arrCell.length; j++) {
      if (arrCell[j].toString().trim().length > 0) {
        if (j < qtdEntradas) {
          sumX += parseFloat(arrCell[j]); // cell de entradas
        } else {
          Y.push([parseFloat(arrCell[j])]); // cel de saídas
        }
      }
    }
    if (sumX > 0) {
      X.push(parseFloat(sumX / qtdEntradas))
    }
  }
  arrX = X;
  arrY = Y;
  exibir('dados carregados com sucesso.');
  $('#metros').val('');
  $('#idade').val('');
  $('#price').val('');
}

function prepare(data) {
  let caractere = ',';
  if (data.indexOf(';') >= 0) {
    caractere = ';'
  }
  let arrLinha = data.split('\r\n');
  let titulos = arrLinha[0].split(caractere);
  let qtdEntradas = titulos.filter(x => x === 'input').length;
  let X = [];
  let Y = [];

  for (let i = 1; i < arrLinha.length; i++) {
    let cellX = [];
    let cellY = [];
    let arrCell = arrLinha[i].split(caractere);

    for (let j = 0; j < arrCell.length; j++) {
      if (arrCell[j].toString().trim().length > 0) {
        if (j < qtdEntradas) {
          cellX.push(parseFloat(arrCell[j]));
        } else {
          cellY.push(parseFloat(arrCell[j]));
        }
      }
    }

    if (cellX.length > 0) {
      X.push(cellX);
    }
    if (cellY.length > 0) {
      Y.push(cellY);
    }
  }
  let difference = X.length - Y.length;
  let inputs = X.slice(X.length - difference, X.length);
  X.splice(X.length - difference, difference);
  arrX = X;
  arrY = Y;
  arrInput = inputs;
  exibir('dados carregados com sucesso.');
}