const tf = require('@tensorflow/tfjs');
const fs = require('fs');


let entradas = [];
let classes = [];

function execBayes(path = '', teste = false) {
  let data = fs.readFileSync(path, { encoding: 'utf-8' });
  data = data.toString().trim();
  let Entrada = data;

  let tokenizationEntrada = eliminaDuplicados(Entrada.split(' '));
  let nomeClasses = retornaClasses();
  let probabilidade = [];

  for (let x = 0; x < tokenizationEntrada.length; x++) {
    let Naive = NaiveBayes(tokenizationEntrada[x]);
    for (let i = 0; i < nomeClasses.length; i++) {
      let percentual = parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2);
      if (percentual >= 50) {
        probabilidade.push(nomeClasses[i]);
      }
    }
  }

  let classificacao = '';
  let repeticao = 0;

  for (let i = 0; i < nomeClasses.length; i++) {
    let repete = probabilidade.filter(x => x === nomeClasses[i]).length;
    if (repete > repeticao) {
      repeticao = repete;
      classificacao = nomeClasses[i];
    }
  }

  if (teste) return classificacao
  else console.log({ class: classificacao });
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

// retorna as classes existentes
function retornaClasses() {
  let arr = classes;
  arr = eliminaDuplicados(arr);
  return arr;
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

function addFile(path) {
  let data = fs.readFileSync(path, { encoding: 'utf-8' });
  data = data.toString().trim();

  let Classe = path.substr(0, path.indexOf('.')).toString().trim();
  data = data.replace(/\r\n\r\n/g, '');
  let lines = data.split('\r\n');

  for (let i = 0; i < lines.length; i++) {
    let tokens = lines[i].split(' ');
    for (let j = 0; j < tokens.length; j++) {
      entradas.push(tokens[j].toString().trim());
      classes.push(Classe)
    }
  }
}

function teste() {
  let testeClasse = ['Elon Musk', 'Jeff Bezos'];
  let acertos = errors = 0;
  for (let i = 0; i < testeClasse.length; i++) {
    for (let j = 0; j < 10; j++) {
      let retorno = execBayes(`./testes/${testeClasse[i]}/teste${j}.txt`, true);
      if (retorno == testeClasse[i]) {
        acertos++
      } else {
        errors++
      }
    }
  }
  let confiabilidade = (acertos / (acertos + errors)) * 100;
  console.log(`confiabilidade: ${confiabilidade}%`);
}

addFile('Teste Elon Musk.txt');
addFile('Teste Jeff Bezos.txt');
teste();

// let data = fs.readFileSync('Elon Musk.txt', { encoding: 'utf-8' });
// let lines = data.split('\r\n');

// lines.forEach((line, index) => {
//   const pathdir = `./testes/Elon Musk/`;

//   if (line) {
//     if (!fs.existsSync(pathdir)) {
//       fs.mkdirSync(pathdir, { recursive: true });
//     }
//     fs.writeFile(pathdir + `teste${index}.txt`, line, 'utf-8', () => { });
//   }
// });