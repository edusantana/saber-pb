
// Adicionar tecla de atalho ao link "Novo registro de aula" ALT+N
// Procura por link ".*/new"
// Exemplo:
// <a class="btn btn-new btn-success pull-right" href="/platform/teachings/320557/class_logs/new"><i class="icon-file-alt"></i>
// Novo registro de aula
// </a>
// http://www.saber.pb.gov.br/platform/teachings/320557/class_logs
// Adicionar tecla de atalho ALT+n para criar novos elementos
var links = document.getElementsByTagName('a');
for(i=0; i<links.length; i++){
    if (links[i].href.endsWith("/new")){
        links[i].accessKey='n';
        links[i].title='Tecla de atalho adicionada: Alt+n';
    }
}

// Adicionar tecla de atalho ALT+s para salvar
var botoes = document.getElementsByTagName('button');
for(i=0; i<botoes.length; i++){
    b = botoes[i]
    if (b.textContent.endsWith("Salvar")){
        b.accessKey='s';
        b.title='Tecla de atalho adicionada: Alt+s';
    }
    if (b.textContent.includes("Adicionar")){
        b.accessKey='n';
        b.title='Tecla de atalho adicionada: Alt+n';
    }
}


var breadcrumbs = document.querySelector("body > div.breadcrumbs > div");
var colagem = document.createElement("textarea");
colagem.id = "colagem";
colagem.cols = "100";
colagem.rows = "4";
colagem.placeholder = "Cole aqui as colunas copiadas do Excel, depois pressione TAB e ALT+s para salvar"

var baixar_planilha_link = document.createElement("a");
baixar_planilha_link.setAttribute('class', 'btn btn-info');
baixar_planilha_link.setAttribute('title', 'Baixar planilha para facilitar edição');
var icone = document.createElement("i");
icone.setAttribute('class', 'icon-download-alt');
baixar_planilha_link.appendChild(icone);

var plugin_link = document.createElement("a");
plugin_link.setAttribute('class', 'btn btn-info');
plugin_link.setAttribute('title', 'Avaliar/Comentar plugin');
plugin_link.setAttribute('href', 'https://chrome.google.com/webstore/detail/saber-pb/pfnoopdjbdpgegpkihfmlofngfdkjfem');
var icone = document.createElement("i");
icone.setAttribute('class', 'icon-comments-alt');
plugin_link.appendChild(icone);


/*
Links das planilhas:
https://github.com/edusantana/saber-pb/raw/master/frequencias.xlsx
https://github.com/edusantana/saber-pb/raw/master/aulas-conteudos.xlsx
https://github.com/edusantana/saber-pb/raw/master/avaliacoes.xlsx
*/


/* =========== REGISTRO DE FREQUÊNCIA  ==================*/
function atualizaRegistroDeFrequencia(){
    console.log('Valor mudou!')
    // dia: class_frequency[day]

    var valor_colado = document.getElementById('colagem').value;
    var valores = valor_colado.split("\t");

    console.log('Valores:' + valores);

    // document.getElementById('class_frequency_day').value = '21/12/2017'
    if (valores.length > 0){
        document.getElementById('class_frequency_day').value = valores[0];
    }
    if (valores.length > 1){
        document.getElementById('class_frequency_justification').value = valores[1];
    }
    return;
}

if (window.location.pathname.includes("class_frequencies")){
    if (window.location.pathname.includes("/new") || window.location.pathname.includes("/edit")){
        console.log('Adicionando input de registro de frequência')
        colagem.addEventListener("change", atualizaRegistroDeFrequencia);
        breadcrumbs.appendChild(colagem); //appendChild
        colagem.focus();
        baixar_planilha_link.setAttribute('href', 'https://github.com/edusantana/saber-pb/raw/master/frequencias.xlsx');
        breadcrumbs.appendChild(baixar_planilha_link);
        breadcrumbs.appendChild(plugin_link);

    } else {
        console.log('Auto-seleção da caixa Número de aulas seguidas');
        var numeroDeAulas = document.querySelector("#classes");
        numeroDeAulas.focus();
    }
}
/* =======================================================*/

/* ============= REGISTRO DE AULA ========================*/
function atualizaRegistroDeAula(){
    console.log('Valor mudou!')
    // dia: class_frequency[day]

    var valor_colado = document.getElementById('colagem').value;
    var valores = valor_colado.split("\t");

    console.log('Valores:' + valores);

    if (valores.length > 0){
        document.getElementById('class_log_day').value = valores[0];
    }
    if (valores.length > 1){
        document.getElementById('class_log_classes').value = valores[1];
    }
    if (valores.length > 2){
        document.getElementById('class_log_content').value = valores[2];
    }
    if (valores.length > 3){
        document.getElementById('class_log_methodology').value = valores[3];
    }
    return;
}

if (window.location.pathname.includes("class_logs") &&
        (window.location.pathname.includes("/new") || window.location.pathname.includes("/edit"))){
    console.log('Adicionando input de registro de aula')
    colagem.addEventListener("change", atualizaRegistroDeAula);
    breadcrumbs.appendChild(colagem); //appendChild
    colagem.focus();
    baixar_planilha_link.setAttribute('href', 'https://github.com/edusantana/saber-pb/raw/master/aulas-conteudos.xlsx');
    breadcrumbs.appendChild(baixar_planilha_link);
    breadcrumbs.appendChild(plugin_link);

}
/* =======================================================*/

/* ============== NOVA AVALIAÇÃO ===========================*/

function atualizaRegistroDeaAvaliacao(){
    console.log('Valor mudou!')
    // dia: class_frequency[day]

    var valor_colado = document.getElementById('colagem').value;
    var valores = valor_colado.split("\t");

    console.log('Valores:' + valores);

    if (valores.length > 0){
      document.getElementById('class_rating_bimester').selectedIndex = parseInt(valores[0])-1;
    }
    if (valores.length > 1){
      document.getElementById('class_rating_day').value = valores[1];
    }
    if (valores.length > 2){
      document.getElementById('class_rating_kind').selectedIndex = parseInt(valores[2])-1;
    }
    if (valores.length > 3){
        document.getElementById('class_rating_class_rating_type_id').selectedIndex = parseInt(valores[3])-1;
    }
    if (valores.length > 4){
      document.getElementById('class_rating_course_topic').value = valores[4];
    }
    if (valores.length > 5)
{
      inputs = document.getElementsByClassName('students-ratings')[0].getElementsByTagName('input')
      // Nota padrão
      for(i=0; i<inputs.length; i++){
        input = inputs[i]
        if (input.type.endsWith("text")){
          input.value = valores[5]
        }
      }
    }

    return;
}

var legenda = document.getElementsByClassName("legend")[0]
var notas_ext_div = document.createElement("div");
var notas = document.createElement("textarea");
notas.id = "notasTextArea";
notas.placeholder = "Cole aqui as novas notas copiadas do Excel, depois pressione TAB para atualizá-las."
notas.rows = "4";
notas.style="width:100%;"
var nomes = document.createElement("textarea");
nomes.rows = "4";
nomes.title = "Copie essas notas e cole no Excel."
nomes.disabled = true;

function criarCamposNotas(){
	//notas.addEventListener("change", atualizaNotas);
	
	var span_notas = document.createElement("div");
	var nomes_div  = document.createElement("div");
	span_notas.className = "span3"
	span_notas.appendChild(notas);
	span_notas.disabled = false;
	nomes_div.cnlassName = "span3";
	nomes_div.appendChild(nomes);
	notas.className = "input-block-level"
	
	var estudantes_notas = document.getElementsByClassName('students-ratings')[0]
	var aondeIncluir = document.getElementsByClassName('students-ratings')[0].previousElementSibling
	var divExterno= document.createElement("div");
	divExterno.id="DivParaNotas"
	//estudantes_notas.appendChild(divExterno);
	estudantes_notas.insertBefore(divExterno, estudantes_notas.childNodes[0]);
	//aondeIncluir.insertBefore(divExterno, aondeIncluir) 
	divExterno.insertAdjacentHTML('beforeend', '<div class="row-fluid"><div id="idnotas_ext_div" class="row"><div class="col span8" id="nomesTextDiv"></div><div class="col span4" id="notasTextDiv"></div> </div></div>');
	
	//nomes.attr("disabled","disabled");
	
	document.getElementById("nomesTextDiv").appendChild(nomes);
	document.getElementById("notasTextDiv").appendChild(notas);
	
	

	var estudantes_notas = document.getElementsByClassName('students-ratings')[0]
	var alunos = estudantes_notas.getElementsByClassName('span8')
	var notas4= estudantes_notas.getElementsByClassName('span4')
	
	for(i=1; i<alunos.length; i++){
		var aluno = alunos[i].textContent.trim() 
		var nota = notas4[i].children[0].value
		
		//console.log(aluno + '\t' + nota);
		nomes.value += aluno + '\t' + nota + "\n";
	}
	console.log('Notas dos alunos: \n' +nomes.value );
	

    var inputs = document.getElementsByClassName('students-ratings')[0].getElementsByTagName('input')
    console.log('Notas:');
    // Nota padrão
    for(i=0; i<inputs.length; i++){
      input = inputs[i]
      if (input.type.endsWith("text")){
        //input.value = valores[5]
        //console.log(input.value);
      }
    }

    notas.addEventListener("change", atualizaNotas);
	
}
	

function atualizaNotas(){
	console.log('O campo Notas mudou!');
	var valor_colado = document.getElementById('notasTextArea').value;
    var valores = valor_colado.split("\n");
    vi = 0;

    var inputs = document.getElementsByClassName('students-ratings')[0].getElementsByTagName('input')
    console.log('Notas:');
    // Nota padrão
    for(i=0; (i<inputs.length); i++){
      input = inputs[i]
      if (input.type.endsWith("text")){
    	nome_nota= valores[vi].split("\t");
		if (nome_nota[1] === ("10")){
			input.value = "10,0";
		}else{
			input.value = nome_nota[1];
		}
        vi++;
        //console.log(input.value);
      }
    }

}

if (window.location.pathname.includes("class_ratings") &&
        (window.location.pathname.includes("/new") || window.location.pathname.includes("/edit"))){
    console.log('Adicionando input de avaliação')
    colagem.addEventListener("change", atualizaRegistroDeaAvaliacao);
    
    breadcrumbs.appendChild(colagem); //appendChild
    criarCamposNotas();
    baixar_planilha_link.setAttribute('href', 'https://github.com/edusantana/saber-pb/raw/master/avaliacoes.xlsx');
    breadcrumbs.appendChild(baixar_planilha_link);
    breadcrumbs.appendChild(plugin_link);
    colagem.focus();
}
/* =======================================================*/
