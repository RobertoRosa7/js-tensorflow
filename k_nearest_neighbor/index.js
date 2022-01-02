let eixoX = [];
let eixoY = [];
let classe = [];
let entradaX = 0;
let entradaY = 0;

function abrir({ target }) {
  loadingFile(target.files).then((data) => {
    let carac = ',';
    if (data.indexOf(';') >= 0) {
      carac = ';'
    }
    let lines = data.split('\r\n');
    for (let i = 1; i < lines.length; i++) {
      let cell = lines[i].split(carac);
      eixoX.push(Number(cell[0]));
      eixoY.push(Number(cell[1]));
      classe.push(cell[2].toString().trim());
    }
    cadastrar();
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
  txt = txt.replace(/\r\n#/g, '');
  let filename = `modelo-${new Date().getTime()}`;
  let blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename + '.csv');
}

function prepararCadastro() {
  $('#eixoX').val('');
  $('#eixoY').val('');
  $('#classe').val('');
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

function retornaClasse() {
  entradaX = parseFloat($('#entradaX').val());
  entradaY = parseFloat($('#entradaY').val());
  $('#entradaC').val(knn());
}