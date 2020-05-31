// Saves options to chrome.storage
function save_options() {
  //var color = document.getElementById('color').value;
  var diasFeriados = document.getElementById('feriados').value.trim();
  var registros= document.getElementById('registros').value.trim();
  var aulas_seguidas=document.getElementById('aulas_seguidas').value.trim();
  //var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
  //favoriteColor : color,
  //likesColor : likesColor,
  feriados: diasFeriados,
  registros: registros,
  aulas_seguidas: aulas_seguidas
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
  feriados: '01/01/2020\n21/04/2020\n01/05/2020\n07/09/2020\n02/11/2020\n15/11/2020\n25/12/2020',
  registros: '',
  aulas_seguidas: '1'
  }, function(items) {
  document.getElementById('feriados').value = items.feriados;
  document.getElementById('registros').value = items.registros;
  document.getElementById('aulas_seguidas').value = items.aulas_seguidas;

  });
}

function atualixa_caixa_feriados () {
  console.log(this.responseText);
};

function carrega_calendario(){
  var requisicao = new XMLHttpRequest();
  oReq.onload = atualixa_caixa_feriados;
  oReq.open("get", "yourFile.txt", true);
  oReq.send();



}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
    	if (key == "registros"){
    		restore_options();
    	}
    }
  });

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('carrega_calendario', carrega_calendario);
document.getElementById('save').addEventListener('click', save_options);
