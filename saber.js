
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
    if (valores.length > 5){

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

if (window.location.pathname.includes("class_ratings") &&
        (window.location.pathname.includes("/new") || window.location.pathname.includes("/edit"))){
    console.log('Adicionando input de avaliação')
    colagem.addEventListener("change", atualizaRegistroDeaAvaliacao);
    breadcrumbs.appendChild(colagem); //appendChild
    baixar_planilha_link.setAttribute('href', 'https://github.com/edusantana/saber-pb/raw/master/avaliacoes.xlsx');
    breadcrumbs.appendChild(baixar_planilha_link);
    breadcrumbs.appendChild(plugin_link);
    colagem.focus();
}
/* =======================================================*/
