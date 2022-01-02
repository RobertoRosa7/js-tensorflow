const tf = require('@tensorflow/tfjs');
const fs = require('fs');

let entradas = [];
let classes = [];
let execucao = [];

function addFile(path) {
  let data = fs.readFileSync(path, { encoding: 'utf-8' });
  data = data.toString().trim();

  let carac = ',';
  if (data.indexOf(';') >= 0) {
    carac = ';';
  }

  let lines = data.split('\r\n');

  for (let i = 1; i < lines.length; i++) {
    let inputs = [];
    let celulas = lines[i].split(carac);
    for (let j = 0; j < (celulas.length - 1); j++) {
      inputs.push(toInput(celulas[j]));
    }
    entradas.push(inputs);
    classes.push(celulas[celulas.length - 1].trim());
  }
}

function toInput(str) {
  let result = 0;
  if (typeof (str) === 'object') {
    let array = str[0];
    let temp = [];

    for (let i = 0; i < array.length; i++) {
      temp.push(toInput(array[i]));
    }
    result = [temp];
  } else {
    if (!isNaN(str)) {
      // is a number;
      result = Number(str);
    } else {
      result = [...str].map(char => char.charCodeAt(0)).reduce((previous, current) => previous + current);
      result = Number(parseFloat(Math.sqrt(result).toFixed(0)));
    }
  }
  return result;
}

function menoresNumeros(matriz) {
  let result = [];
  for (let i = 0; i < matriz.length; i++) {
    let vetor = matriz[i];
    let sum = 0;
    for (let j = 0; j < vetor.length; j++) {
      sum += vetor[j];
    }
    result.push(sum);
  }
  return result;
}

function knn() {
  // arraySync() mantem a dimensionalidade original
  // dataSync() remove a dimensionalidade original retorna uma array convencioanl

  let entradaClasse = ''
  let tfTreinosEntradas = tf.tensor(entradas);
  // let tfTreinosClasses = tf.tensor(classes);
  let tfExecucaoEntradas = tf.tensor(toInput(execucao));

  let tfDiferencas = tfExecucaoEntradas.sub(tfTreinosEntradas).abs();
  let arrayDiferencas = menoresNumeros(tfDiferencas.arraySync());
  let menor = tf.tensor(arrayDiferencas).min().arraySync();

  entradaClasse = classes[arrayDiferencas.indexOf(menor)];
  return entradaClasse;
}

function classification(path, line) {
  let data = fs.readFileSync(path, { encoding: 'utf-8' });
  data = data.toString().trim();

  let carac = ',';
  if (data.indexOf(';') >= 0) {
    carac = ';';
  }

  let lines = data.split('\r\n');
  let totalLines = (lines.length - 1);
  if (line > totalLines) line = totalLines;
  if (line === 0) line = 1;

  let inputs = [];

  for (let i = 0; i < (lines[line].split(carac).length - 1); i++) {
    inputs.push(lines[line].split(carac)[i])
  }

  execucao = [inputs];
  console.log(`classificação: ${knn()}`);
}

addFile('dados01.csv');
classification('dados01.csv', 6);