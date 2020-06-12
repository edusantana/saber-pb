console.log('Salvando dados')

function isPaginaRegistrosDeAula(){
  // http://www.saber.pb.gov.br/platform/teachings/1079536/class_logs
  return window.location.pathname.endsWith("class_logs");
}
function isPaginaAlunos(){
  return window.location.pathname.endsWith("enrollments");
}
function isPaginaAluno(){
  // http://www.saber.pb.gov.br/platform/teachings/1238787/enrollments/4737432
  const final = /enrollments\/\d+$/
  return final.test(window.location.pathname)
}

function isPaginaMinhasAulas(){
  // http://www.saber.pb.gov.br/platform/teachings
  return window.location.pathname.endsWith("teachings");
}

function teachings_id(){
  return window.location.pathname.split('/')[3]
}


/*
dados = {
  "turmas": {
    "1238787": {
      "titulo": "3ª Série D - Administração - Orientação de estudo",
      "professor": "Wellington Lima",
      "atualizado_em": "10/06/2020",
    },
  },
  "alunos": {
    "4737432": {
      "teachings_id": "1238787"
      "nome": "Alice Silva Ferreira",
      "matricula": "1321773",
      "sexo": "Feminino",
      "data_nascimento": "29/05/2003",
      "endereco": "AV PRES TANCREDO NEVES, nº 1230 - Bairro: BAIRRO DOS IPES CEP 58028-840",
      "frequencias": [0,0,2,0,0,0,0,0,0,0,0,32,8,2,22]
      }
    }
  }
}*/



function store_turmas(turmas){
  chrome.storage.sync.set({
    'turmas': turmas,
  }, function() {
    // Update status to let user know options were saved.
    console.log('Dados de turmas salvos')
  });
}

function store_aluno(enrollments_id, aluno){

  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
  //favoriteColor : 'red',
  //likesColor : true,
  alunos: {},
  }, function(items) {
    items.alunos[enrollments_id]=aluno;
    chrome.storage.sync.set({
      'alunos': items.alunos,
    }, function() {
      // Update status to let user know options were saved.
      console.log('Dados do aluno(a) salvo')
    });

  });

}

function salva_informacoes_das_turmas(){
  var registros = Array.from(document.querySelectorAll("table tbody tr"));
  var turmas = {};

  // "Sair (Wellington Lima)"
  const re_professor = /\((.+)\)/;
  const professor = document.querySelector('#loginbar > li:nth-child(6) > a').text.match(re_professor)[1];
  const hoje = (new Date()).toLocaleDateString();

  // Registros de aula class_logs
  for (r of registros) {
    let turma = r.children[3].textContent.trim();
    let disciplina = r.children[2].textContent.trim();
    let escola = r.children[1].textContent.trim();
    let link = r.children[9].querySelector('a').href
    // http://www.saber.pb.gov.br/platform/teachings/1238787/class_logs
    let turma_id = link.split('/')[5]
    let titulo = `${turma} - ${disciplina}`
    turmas[turma_id] = {'titulo': titulo, 'professor': professor, 'atualizado_em': hoje};
  }
  store_turmas(turmas);
}

function salva_informacoes_de_aluno(){
  var nome = document.querySelector("body > div.breadcrumbs > div > ul > li.active").textContent
  var matricula       = document.querySelector("#body > div > div.row-fluid.thumbnail-style.student.main.margin-top-20 > div.row-fluid > div:nth-child(2) > ul > li:nth-child(1)").textContent.trim().split(" ")[1];
  var data_nascimento = document.querySelector("#body > div > div.row-fluid.thumbnail-style.student.main.margin-top-20 > div.row-fluid > div:nth-child(2) > ul > li:nth-child(4)").textContent.trim().split(" ")[2];
  var sexo            = document.querySelector("#body > div > div.row-fluid.thumbnail-style.student.main.margin-top-20 > div.row-fluid > div:nth-child(2) > ul > li:nth-child(5)").textContent.trim().split(" ")[1];
  // http://www.saber.pb.gov.br/platform/teachings/1238787/enrollments/4737432
  var teachings_id    = window.location.pathname.split('/')[3]
  var enrollments_id  = window.location.pathname.split('/')[5]

  aluno = {
    'teachings_id': teachings_id,
    'nome': nome,
    'matricula': matricula,
    'data_nascimento': data_nascimento,
    'sexo': sexo
  }
  store_aluno(enrollments_id, aluno)

}

if (isPaginaMinhasAulas()) {
  salva_informacoes_das_turmas();
}

if (isPaginaAluno()) {
  salva_informacoes_de_aluno();
}

/*
(function () {
  if (typeof window.R === 'undefined') {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://moment.github.io/luxon/global/luxon.js');
    document.body.appendChild(s);
  }
}());
*/
function gerando_datas(inicio, fim, dias){
  if(inicio > fim){
    return `Data inicial precisa ser menor que hoje: ${inicio.toLocaleString()} - ${fim.toLocaleString()}`
  }
  result = [];
  let data = inicio;
  while(data <= fim){
    for(dia of dias){
      if(data.weekday+1 == dia){
        result.push(data.toLocaleString())
      }
    }
    data = data.plus({days: 1})
  }
  return result.join("\n");
}

function testa_gerando_datas(){
  let inicio = luxon.DateTime.fromFormat("30/06/2020", "dd/MM/yyyy");
  let hoje = luxon.DateTime.local();
  let dias = "3,5"; // terças e quintas

  result = gerando_datas(inicio, hoje, dias.split(","));

  console.log(result);
}
