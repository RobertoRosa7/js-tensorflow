const tf = require('@tensorflow/tfjs');
const fs = require('fs');

function previsaoDolar() {
  let arquivo = fs.readFileSync('cotacao-do-dolar.csv', { encoding: 'utf-8' });
  arquivo = arquivo.toString().trim();

  const linhas = arquivo.split('\r\n');
  let X = [];
  let Y = [];
  let qtdLinhas = 0;

  for (let l = 1; l < linhas.length; l++) {
    let celulas1 = [];
    if (qtdLinhas === (linhas.length - 2)) {
      celulas1 = ['31.12.2018', 3.8813, 3.8813, 3.8813, 3.8813];
    } else {
      celulas1 = linhas[l + 1].split(';');
    }
    const celulas2 = linhas[l].split(';');

    const FechamentoX = Number(celulas1[1]);
    const AberturaX = Number(celulas1[2]);
    const MaximaX = Number(celulas1[3]);
    const MinimaX = Number(celulas1[4]);

    X.push([FechamentoX, AberturaX, MaximaX, MinimaX]);

    const FechamentoY = Number(celulas2[1]);
    const AberturaY = Number(celulas2[2]);
    const MaximaY = Number(celulas2[3]);
    const MinimaY = Number(celulas2[4]);

    Y.push([FechamentoY, AberturaY, MaximaY, MinimaY]);

    qtdLinhas++;
  }

  const model = tf.sequential();
  const inputLayer = tf.layers.dense({ units: 4, inputShape: [4] });
  model.add(inputLayer);
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const x = tf.tensor(X, [qtdLinhas, 4]);
  const y = tf.tensor(Y);
  // const arrInput = [[3.9285, 3.9708, 3.9781, 3.9251]]; // 08 05 2019
  const arrInput = [[3.9466, 3.9283, 3.9818, 3.9283]]; // 09 05 2019
  const input = tf.tensor(arrInput, [1, 4]);

  model.fit(x, y, { epochs: 500 }).then(() => {
    let output = model.predict(input).dataSync();
    output = ordenaData(output);
    console.log('Previsão do Preço das Cotações');
    console.log(`Fechamento: R$ ${Number(output[0]).toFixed(4)}`);
    console.log(`Abertura: R$ ${Number(output[1]).toFixed(4)}`);
    console.log(`Máxima: R$ ${Number(output[2]).toFixed(4)}`);
    console.log(`Mínima: R$ ${Number(output[3]).toFixed(4)}`);
    console.log(`\n`);
  });
}

function previsaoBitcoin() {
  let file = fs.readFileSync('cotacao-do-bitcoin.csv', { encoding: 'utf-8' });
  file = file.toString().trim();

  const lines = file.split('\r\n');
  let X = [];
  let Y = [];
  let qtdLines = 0;

  for (let i = 1; i < lines.length; i++) {
    let cell1 = [];
    if (qtdLines === (lines.length - 2)) {
      cell1 = ['31.12.2018', 3709.4, 3815.1, 3819.6, 3658.8];
    } else {
      cell1 = lines[i + 1].split(';');
    }

    const cell2 = lines[i].split(';');

    const col1x = Number(cell1[1]);
    const col2x = Number(cell1[2]);
    const col3x = Number(cell1[3]);
    const col4x = Number(cell1[4]);

    X.push([col1x, col2x, col3x, col4x]);

    const col1y = Number(cell2[1]);
    const col2y = Number(cell2[2]);
    const col3y = Number(cell2[3]);
    const col4y = Number(cell2[4]);

    Y.push([col1y, col2y, col3y, col4y]);

    qtdLines++
  }

  const model = tf.sequential();
  const inputLayer = tf.layers.dense({ units: 4, inputShape: [4] });
  model.add(inputLayer);

  // taxa de aprendizagem padrão 0.001;
  const learningRate = 0.000000001;
  const optimizer = tf.train.sgd(learningRate);

  model.compile({ loss: 'meanSquaredError', optimizer });

  const x = tf.tensor(X, [qtdLines, 4]);
  const y = tf.tensor(Y);
  const arrInput = [[7190.3, 6386.6, 7373.8, 6386.5]]; // 11 05 2019;
  const input = tf.tensor(arrInput, [1, 4]);

  model.fit(x, y, { epochs: 500 }).then(() => {
    let output = model.predict(input).dataSync();
    output = ordenaData(output);
    console.log('Previsão do Preço dos Bitcoins');
    console.log(`Fechamento: $ ${Number(output[0]).toFixed(1)}`);
    console.log(`Abertura: $ ${Number(output[1]).toFixed(1)}`);
    console.log(`Máxima: $ ${Number(output[2]).toFixed(1)}`);
    console.log(`Mínima: $ ${Number(output[3]).toFixed(1)}`);
    console.log(`\n`);
  });
}

function previsaoPetrobras() {
  let file = fs.readFileSync('cotacao-das-acoes-pn-da-petrobras.csv', { encoding: 'utf-8' });
  file = file.toString().trim();

  const lines = file.split('\r\n');
  let X = [];
  let Y = [];
  let qtdLines = 0;

  for (let i = 1; i < lines.length; i++) {
    let cell1 = [];
    if (qtdLines === (lines.length - 2)) {
      cell1 = ['28.12.2018', 22.68, 22.11, 22.83, 22.08];
    } else {
      cell1 = lines[i + 1].split(';');
    }

    const cell2 = lines[i].split(';');

    const col1x = Number(cell1[1]);
    const col2x = Number(cell1[2]);
    const col3x = Number(cell1[3]);
    const col4x = Number(cell1[4]);

    X.push([col1x, col2x, col3x, col4x]);

    const col1y = Number(cell2[1]);
    const col2y = Number(cell2[2]);
    const col3y = Number(cell2[3]);
    const col4y = Number(cell2[4]);

    Y.push([col1y, col2y, col3y, col4y]);

    qtdLines++
  }

  const model = tf.sequential();
  const inputLayer = tf.layers.dense({ units: 4, inputShape: [4] });
  model.add(inputLayer);

  // taxa de aprendizagem padrão 0.001;
  const learningRate = 0.00001;
  const optimizer = tf.train.sgd(learningRate);
  model.compile({ loss: 'meanSquaredError', optimizer });

  const x = tf.tensor(X, [qtdLines, 4]);
  const y = tf.tensor(Y);
  // const arrInput = [[26.83, 27.10, 27.12, 26.64]]; // 09 05 2019;
  const arrInput = [[26.68, 26.87, 26.92, 26.42]] // 10 05 2019
  const input = tf.tensor(arrInput, [1, 4]);

  model.fit(x, y, { epochs: 500 }).then(() => {
    let output = model.predict(input).dataSync();
    output = ordenaData(output);
    console.log('Previsão das Ações Petrobras');
    console.log(`Fechamento: R$ ${Number(output[0]).toFixed(2)}`);
    console.log(`Abertura: R$ ${Number(output[1]).toFixed(2)}`);
    console.log(`Máxima: R$ ${Number(output[2]).toFixed(2)}`);
    console.log(`Mínima: R$ ${Number(output[3]).toFixed(2)}`);
    console.log(`\n`);
  });
}

function ordenaData(array) {
  let fechamento = array[0];
  let abertura = array[1];
  let maxima = array[2];
  let minima = array[3];
  let cotacoes = [fechamento, abertura, maxima, minima];
  cotacoes = cotacoes.sort((a, b) => (a - b));

  let menor = cotacoes[0];
  let maior = cotacoes[cotacoes.length - 1];

  if (fechamento < minima) fechamento = minima;
  if (abertura < minima) abertura = minima;
  if (maxima < minima) maxima = minima;

  minima = menor;

  if (fechamento > maxima) fechamento = maxima;
  if (abertura > maxima) abertura = maxima;
  if (minima > maxima) minima = maxima;
  maxima = maior;

  cotacoes = [fechamento, abertura, maxima, minima];

  return cotacoes;
}
previsaoDolar();
previsaoBitcoin();
previsaoPetrobras();