let eixoX = [];
let eixoY = [];
let classe = [];
let classesNomes = [];
let entradaX = 0;
let entradaY = 0;

function abrir({ target }) {
  loadingFile(target.files).then((data) => {
    eixoX = [];
    eixoY = [];
    classe = [];
    let carac = ',';
    if (data.indexOf(';') >= 0) carac = ';';
    let lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let cell = lines[i].split(carac);
      eixoX.push(Number(cell[0]));
      eixoY.push(Number(cell[1]));
      classe.push(cell[2].toString().trim());
    }
    cadastrar();
    classesNomes = [...new Set(classe)];
  });
}

function loadingFile(files) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(files.item(0));
  });
}

function cadastrar() {
  if ($('#eixoX').val().toString().trim().length > 0) {
    eixoX.push(Number($('#eixoX').val()));
    eixoY.push(Number($('#eixoY').val()));
    classe.push($('#classe').val().toString().trim());
  }

  let linhas = '';

  for (let i = 0; i < eixoX.length; i++) {
    linhas += `
    <tr>
      <td>${eixoX[i]}</td>
      <td>${eixoY[i]}</td>
      <td>${classe[i]}</td>
    </tr>
    `;
  }

  $('#linhas').html(linhas);
}

function salvar() {
  let txt = 'input;output\r\n';
  for (let i = 0; i < eixoX.length; i++) {
    txt += `${eixoX[i]};${eixoY[i]};${classe[i]}\r\n`;
  }
  txt += '#'; // delimitar o final
  txt = txt.replace(/\r?\n#/g, '');
  let filename = `modelo-${new Date().getTime()}`;
  let blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename + '.csv');
}

function prepararCadastro() {
  $('#eixoX').val('');
  $('#eixoY').val('');
  $('#classe').val('');
}

function toNumberClass(strClass = '') {
  let index = 0;
  for (let i = 0; i < classesNomes.length; i++) {
    if (classesNomes[i].trim() === strClass.trim()) {
      index = i;
    }
  }
  return Number(index);
}

function toStringClass(numberClass = 0) {
  numberClass = Number(parseFloat(numberClass[0]).toFixed(0));
  if (numberClass > (classesNomes.length - 1)) {
    numberClass = Number(classesNomes.length - 1);
  }
  let name = '';
  for (let i = 0; i < classesNomes.length; i++) {
    if (i === numberClass) {
      name = classesNomes[i].trim();
    }
  }
  return name;
}

function toArrayNumberClass(arrClass) {
  let result = [];
  for (let i = 0; i < arrClass.length; i++) {
    result.push(toNumberClass(arrClass[i]));
  }
  return result;
}

function knn() {
  let tensorX = tf.tensor(eixoX);
  let tensorY = tf.tensor(eixoY);
  let tfEntradaX = tf.scalar(entradaX);
  let tfEntradaY = tf.scalar(entradaY);

  let tfRaiz = tensorX.sub(tfEntradaX).square().add(tensorY.sub(tfEntradaY).square()).sqrt();
  let menorRaiz = tfRaiz.min().dataSync();
  let arrayRaiz = tfRaiz.dataSync();
  let entradaClasse = classe[arrayRaiz.indexOf(menorRaiz[0])];
  return entradaClasse;
}

function classificadorRNA() {
  $('#entradaC').val('...carregando.');
  let entradas = [];

  for (let i = 0; i < eixoX.length; i++) {
    entradas.push([eixoX[i], eixoY[i]]);
  }

  let outputs = toArrayNumberClass(classe);
  let execucao = [[entradaX, entradaY]];

  let model = tf.sequential();
  let inputLayer = tf.layers.dense({ units: 1, inputShape: [2] });
  model.add(inputLayer);
  model.compile({ loss: 'meanSquaredError', optimizer: tf.train.sgd(.00001) });

  let x = tf.tensor(entradas, [entradas.length, 2]);
  let y = tf.tensor(outputs, [outputs.length, 1]);
  let input = tf.tensor(execucao, [execucao.length, 2]);

  model.fit(x, y, { epochs: 400 }).then(() => {
    let output = model.predict(input).abs().round().dataSync();
    if (isNaN(output)) {
      model.fit(x, y, { epochs: 400 }).then(() => {
        output = model.predit(input).abs().round().dataSync();
        output = toStringClass(output);
        $('#entradaC').val(output);
      });
    } else {
      output = toStringClass(output);
      $('#entradaC').val(output);
    }
  });
}

function retornaClasse() {
  entradaX = parseFloat($('#entradaX').val());
  entradaY = parseFloat($('#entradaY').val());
  $('#entradaC').val(classificadorRNA());
}