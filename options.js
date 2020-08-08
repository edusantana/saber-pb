// Saves options to chrome.storage
function save_options() {
  //var color = document.getElementById('color').value;
  var diasFeriados = document.getElementById('feriados').value.trim();
  var registros= document.getElementById('registros').value.trim();
  var aulas_seguidas=document.getElementById('aulas_seguidas').value.trim();
  var justificativa = document.getElementById('justificativa').value.trim();
  var apresentar_assinatura=document.getElementById('apresentar_assinatura').checked;
  var portaria418=document.getElementById('portaria418').checked;
  chrome.storage.sync.set({
  //favoriteColor : color,
  //likesColor : likesColor,
  feriados: diasFeriados,
  registros: registros,
  aulas_seguidas: aulas_seguidas,
  apresentar_assinatura: apresentar_assinatura,
  portaria418: portaria418,
  justificativa: justificativa
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
  feriados: '',
  registros: '',
  aulas_seguidas: '1',
  apresentar_assinatura: true,
  portaria418: false,
  justificativa: ""
  }, function(items) {
  document.getElementById('feriados').value = items.feriados;
  document.getElementById('registros').value = items.registros;
  document.getElementById('aulas_seguidas').value = items.aulas_seguidas;
  document.getElementById('apresentar_assinatura').checked = items.apresentar_assinatura;
  document.getElementById('portaria418').checked = items.portaria418;
  document.getElementById('justificativa').value = items.justificativa;
  });
}

function atualixa_caixa_feriados () {
  document.getElementById('feriados').value=this.responseText
};

function carrega_calendario(){
  console.log('Carregando calendário')
  var requisicao = new XMLHttpRequest();
  requisicao.onload = atualixa_caixa_feriados;
  requisicao.open("get", "https://github.com/edusantana/saber-pb/raw/master/feriados-escolares.txt", true);
  requisicao.send();
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key == "registros"){
    		restore_options();
    	}
    }
  });

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('carrega_calendario').addEventListener('click', carrega_calendario);
