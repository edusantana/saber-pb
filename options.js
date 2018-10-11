// Saves options to chrome.storage
function save_options() {
	//var color = document.getElementById('color').value;
	var diasFeriados = document.getElementById('feriados').value.trim();
	var registros= document.getElementById('registros').value.trim();
	//var likesColor = document.getElementById('like').checked;
	chrome.storage.sync.set({
		//favoriteColor : color,
		//likesColor : likesColor,
		feriados: diasFeriados,
		registros: registros
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
		registros: ''
	}, function(items) {
		document.getElementById('feriados').value = items.feriados;
		document.getElementById('registros').value = items.registros;
		//document.getElementById('color').value = items.favoriteColor;
//		document.getElementById('like').checked = items.likesColor;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
