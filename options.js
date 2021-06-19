// Saves options to chrome.storage
function save_options() {
  //var color = document.getElementById('color').value;
  var registros= document.getElementById('registros').value.trim().replace(/\|/gi,'\t');
  var aulas_seguidas=document.getElementById('aulas_seguidas').value.trim();
  var justificativa = document.getElementById('justificativa').value.trim();
  const presenca = document.getElementById('presenca').value;
  const assinatura = document.getElementById('assinatura').checked;
  chrome.storage.sync.set({
    //favoriteColor : color,
    //likesColor : likesColor,
    registros: registros,
    aulas_seguidas: aulas_seguidas,
    justificativa: justificativa,
    presenca: presenca,
    assinatura: assinatura
  }, function() {
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = 'Opções salvas.';
  setTimeout(function() {
  status.textContent = '';
  }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    //favoriteColor : 'red',
    //likesColor : true,
    registros: '',
    aulas_seguidas: '1',
    justificativa: "",
    presenca: "P",
    assinatura: false
  }, function(items) {
    document.getElementById('registros').value = items.registros;
    document.getElementById('aulas_seguidas').value = items.aulas_seguidas;
    document.getElementById('justificativa').value = items.justificativa;
    document.getElementById('presenca').value = items.presenca;
    document.getElementById('assinatura').checked = items.assinatura;
    atualizaPassosDaAssinatura();
  });
}


function atualizaTurmas(){
  chrome.storage.local.get({
    turmas: [],
    turmaAtual: -1
  },function(data){

    console.log(`Carregando turmas: ${data.turmas}`)

    var select = document.getElementById("turma");

    // apaga valores anteriores, caso existam
    for (i = select.length - 1; i >= 0; i--) {
  	   select.remove(i);
    }

    for (t of data.turmas){
      var option = document.createElement("option");
      option.text = t[0];
      option.value = t[1]
      select.add(option);
    }

    if (data.turmaAtual>0){
      select.value = data.turmaAtual;
    }

  });
}

function limpar(){
  document.getElementById('registros').value='';
  chrome.storage.sync.set({registros: ''})
}

function guardar(){
  save_options();
  var registros=document.getElementById('registros').value.trim();
  chrome.storage.local.set({
    guardado: registros
  })
}

function recuperar(){
  chrome.storage.local.get({
    guardado: ""
  }, function(data){
    chrome.storage.sync.set({
      registros: data.guardado
    })
  })
}

function atualizaPilhaStatus(){
  chrome.storage.local.get({
    guardado: ""
  }, function(data){
    console.log(`Registro guardado: (${data.guardado})`)

    var recuperar=document.getElementById('recuperar');
    var status=document.getElementById('pilhaStatus');

    if(data.guardado){
      recuperar.disabled = false
      status.textContent = "*";
    }else{
      recuperar.disabled = true
      status.textContent = "";
    }
  })

}



function abrirTurma() {
  // abrir abas de novo registro de aula
  var turma = document.getElementById('turma');
  if (turma.selectedIndex>=0){
    console.log(`Abrindo turma: ${turma.options[turma.selectedIndex].text} - ${turma.value}` )
      // http://www.saber.pb.gov.br/platform/teachings/1042547/class_logs
      var url = `http://www.saber.pb.gov.br/platform/teachings/${turma.value}/class_logs`
      chrome.tabs.create({url: url})
  }
}


function criarAulas() {
  save_options();
  // abrir abas de novo registro de aula
  var registros=document.getElementById('registros').value.trim().split("\n");
  var turma = document.getElementById('turma');
  if (turma.selectedIndex>=0){
    console.log(`Criando registros de aula para: ${turma.options[turma.selectedIndex].text} - ${turma.value}` )
    for(r of registros){
      // http://www.saber.pb.gov.br/platform/teachings/1042547/class_logs/new
      var url = `http://www.saber.pb.gov.br/platform/teachings/${turma.value}/class_logs/new`
      chrome.tabs.create({url: url})
    }
  }
}
function criarFrequencias() {
  save_options();
  var registros=document.getElementById('registros').value.trim().split("\n");
  var turma = document.getElementById('turma');
  console.log(`Criando registros de aula para: ${turma.options[turma.selectedIndex].text} - ${turma.value}` )
  var ultima_quantidade_de_aulas = -1;
  for(r of registros){

    var aulas_seguidas=r.split("\t")[0]

    if(ultima_quantidade_de_aulas!=-1){
      if (aulas_seguidas!=ultima_quantidade_de_aulas){
        // cria abas somente para quantidade de aulas identicas
        // para evitar problema de concorrência
        break;
      }
    }

    //http://www.saber.pb.gov.br/platform/teachings/1078922/class_frequencies/new?utf8=%E2%9C%93&classes=3&button=
    var url = `http://www.saber.pb.gov.br/platform/teachings/${turma.value}/class_frequencies/new?utf8=%E2%9C%93&classes=${aulas_seguidas}&button=`
    chrome.tabs.create({url: url})
    ultima_quantidade_de_aulas = r[0]
  }
}

function atualizaPassosDaAssinatura(){
  if (document.getElementById('assinatura').checked){
    document.getElementById('assinatura_step').className = "completed step";
    $("#considere_assinatura").hide();
  }else{
    document.getElementById('assinatura_step').className = "active step";
    $("#considere_assinatura").show();
  }
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('limpar').addEventListener('click', limpar);
document.getElementById('guardar').addEventListener('click', guardar);
document.getElementById('recuperar').addEventListener('click', recuperar);

document.getElementById('abrirTurma').addEventListener('click', abrirTurma);
document.getElementById('criarAulas').addEventListener('click', criarAulas);
document.getElementById('criarFrequencias').addEventListener('click', criarFrequencias);

document.getElementById('assinatura').addEventListener('change', atualizaPassosDaAssinatura);

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', atualizaTurmas);
document.addEventListener('DOMContentLoaded', atualizaPilhaStatus);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key == "registros"){
    		restore_options();
    	}
    }
  });


chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key == "turmas" || key == "turmaAtual"){
    		atualizaTurmas();
    	}
      if(key=="guardado"){
        atualizaPilhaStatus();
      }
    }
});