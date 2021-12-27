let entradas = [];
let classes = [];

function prepararCadastro() {
  $('#entrada').val('');
  $('#classe').val('');
}

function executar() {
  let selfEntrada = $('#sel_entrada').val();
  let proba = '';
  let nomeClasses = retornaClasses();

  if (selfEntrada.toString().trim().length > 0) {
    let Naive = NaiveBayes(selfEntrada);
    let maiorPercentual = 0;
    let classePercentual = '';

    for (let i = 0; i < nomeClasses.length; i++) {
      let percentual = parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2);
      // proba += `<strong>${nomeClasses[i]} :</strong> ${percentual} % - `;
      if (percentual >= maiorPercentual) {
        maiorPercentual = percentual;
        classePercentual = nomeClasses[i];
      }
    }
    proba = ` - CLASSIFICAÇÃO: <strong>${classePercentual}</strong>`;
  } else {
    proba = ': 0';
  }

  $('#resultado').html(proba);
}

// retorna as classes existentes
function retornaClasses() {
  let arr = classes;
  arr = eliminaDuplicados(arr);
  return arr;
}

// calcula a probabilidade da entrada pertencer a uma determinada classe
function NaiveBayes(_entrada = '') {
  let nomeClasses = retornaClasses();
  let totalClasse = totalPorClasse();

  // soma o resultado de todas as classes de entrada passada
  let categorias = frequencia();
  let soma = 0;

  categorias.forEach((item) => {
    if (item['entrada'] === _entrada) {
      for (let i = 0; i < nomeClasses.length; i++) {
        soma += parseInt(item[nomeClasses[i]]);
      }
    }
  });

  soma = tf.scalar(soma);
  let sumClasse = tf.scalar(somaTotaisClasses());
  let probabilidade = [];

  for (let i = 0; i < nomeClasses.length; i++) {
    let ocorrencia = tf.scalar(ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]));
    let totalC = tf.scalar(totalClasse[nomeClasses[i]]);

    probabilidade[nomeClasses[i]] =
      ocorrencia.div(totalC).mul(totalC.div(sumClasse)).div(soma.div(sumClasse)).dataSync();
  }
  return probabilidade;
}

function cadastrar() {
  let linhas = '';
  if ($('#entrada').val().toString().trim().length > 0) {
    entradas.push($('#entrada').val().toString().trim());
    classes.push($('#classe').val().toString().trim());
  }
  for (let i = 0; i < entradas.length; i++) {
    linhas += `
    <tr>
      <td>${entradas[i]}</td>
      <td>${classes[i]}</td>
    </tr>
    `;
  }

  let options = `<option value=""></option>`;
  let nomeEntrada = eliminaDuplicados(entradas);

  for (let i = 0; i < nomeEntrada.length; i++) {
    options += `<option value="${nomeEntrada[i]}">${nomeEntrada[i]}</option>`;
  }

  $('#linhas').html(linhas);
  $('#sel_entrada').html(options);
}

// remover duplicidade;
function eliminaDuplicados(arr) {
  arr = [...new Set(arr)];
  return arr;
}

// cria um json com as classes como chave e as entradas de cada classe como valor
function organizar() {
  let labels = retornaClasses();
  let params = {};

  for (let i = 0; i < entradas.length; i++) {
    // separa as palavras com '-'
    let carac = '';

    if (i < (entradas.length - 1)) {
      carac = '-';
    }

    if (params[classes[i]]) {
      params[classes[i]] += entradas[i] + carac;
    } else {
      params[classes[i]] = entradas[i] + carac;
    }
  }

  // elimina última vírgula de cada valor
  let str = JSON.stringify(params);
  str = str.replace(/-"/g, '"');
  str = str.replace(/-/g, ',');
  params = JSON.parse(str);

  return params;
}

// conta a quantidade de palavras repetidas em um texto
function contaTexto(texto, procura) {
  return texto.split(procura).length - 1;
}

// monta um json comm o número de classes para cada entrada
function frequencia() {
  let categorias = [];
  let params = {};
  let objeto = organizar();
  let labels = retornaClasses();

  for (let i = 0; i < entradas.length; i++) {
    params['entrada'] = entradas[i];

    for (let j = 0; j < labels.length; j++) {
      // conta numero de entrada em cada classe
      params[labels[j]] = contaTexto(objeto[labels[j]], entradas[i]);
    }

    categorias[i] = JSON.stringify(params)
  }

  categorias = eliminaDuplicados(categorias);

  for (let i = 0; i < categorias.length; i++) {
    categorias[i] = JSON.parse(categorias[i]);
  }

  return categorias;
}

// retorna a quantidade de classes
function quantidadeClasse() {
  let categorias = frequencia();
  return parseInt(Object.keys(categorias[0]).length - 1);
}

// soma os valores das classes passadas
function somaClasses(arr) {
  let soma = 0;
  // inicia em 1 para desconsiderar o valor de entrada
  for (let i = 1; i < arr.length; i++) {
    soma += parseInt(arr[i]);
  }
  return soma;
}

// soma o total de classes
function totalPorClasse() {
  let totalClasse = [];
  let nomeClasses = retornaClasses();
  let str_classes = JSON.stringify(classes);

  for (let i = 0; i < nomeClasses.length; i++) {
    totalClasse[nomeClasses[i]] = contaTexto(str_classes, nomeClasses[i]);
  }

  return totalClasse;
}

// soma totais de todas as classes
function somaTotaisClasses() {
  let vetTemp = Object.values(totalPorClasse());
  let soma = 0;
  for (let i = 0; i < vetTemp.length; i++) {
    soma += parseFloat(vetTemp[i]);
  }

  return soma;
}

// pesos para as entradas
function entradasPesos() {
  let pesos = [];
  let categorias = frequencia();

  for (let i = 0; i < categorias.length; i++) {
    pesos[categorias[i].entrada] = somaClasses(Object.values(categorias[i])) / somaTotaisClasses();
  }

  return pesos;
}

// pesos para as classes
function classesPesos() {
  let nomeClasses = retornaClasses();
  let totalClasse = totalPorClasse();
  let pesos = [];

  for (let i = 0; i < nomeClasses.length; i++) {
    pesos[nomeClasses[i]] = totalClasse[nomeClasses[i]] / somaTotaisClasses();
  }

  return pesos;
}

// retorna a ocorrência de uma classe para uma entrada
function ocorrenciaClasseParaEntrada(_entrada = '', _classe = '') {
  let categorias = frequencia();
  let retorno = 0;

  categorias.forEach((item) => {
    if (item['entrada'] === _entrada) {
      retorno = parseInt(item[_classe]);
    }
  });

  return retorno;
}

function loadingFile(files) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(files.item(0));
  });
}

function abrir({ target }) {
  loadingFile(target.files).then((data) => prepare(data));
}

function salvar() {
  let txt = 'input;output\r\n';
  for (let i = 0; i < entradas.length; i++) {
    txt += `${entradas[i]};${classes[i]}\r\n`;
  }
  txt += '#'; // delimitar o final
  txt = txt.replace(/\r\n#/g, '');
  let filename = `modelo-${new Date().getTime()}`;
  let blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename + '.csv');
}

function prepare(data) {
  let carac = ',';
  if (data.indexOf(';') >= 0) {
    carac = ';'
  }
  let lines = data.split('\r\n');
  for (let i = 1; i < lines.length; i++) {
    let cell = lines[i].split(carac);
    entradas.push(cell[0]);
    classes.push(cell[1]);
  }
  cadastrar()
}