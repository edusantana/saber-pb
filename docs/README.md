# Extensão saber-pb

Extensão para facilitar a vida dos professores ao cadastrar informações no [site do saber do Governo do Estado da Paraíba](http://www.saber.pb.gov.br/).

# Resumo executivo

- A ferramenta é gratuita e **segura** (+470 usuários)

- Você pode instalar através [desse link, no Google Chrome Web Store](https://chrome.google.com/webstore/detail/saber-pb/pfnoopdjbdpgegpkihfmlofngfdkjfem?hl=pt-BR).

<iframe width="560" height="315" src="https://www.youtube.com/embed/h6VVqVSFnLA?start=260" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Sobre a ferramenta

![](https://user-images.githubusercontent.com/3603111/81819442-b444bc00-9505-11ea-918d-19731d8c47c7.png)

Esta ferramenta surgiu porque minha esposa odiava realizar os registros no [site do saber](http://www.saber.pb.gov.br/), atrasava o trabalho, e então passei a ajudá-la.

Ao usar o sistema várias coisas me irritavam nele, então criei essa extensão para contornar as dificuldades e agilizar os cadastros. Pedi para ela compartilhar essa extensão com seus colegas professores, que também desejem ganhar tempo.

Essa extensão é gratuita, meu presente para vocês. Caso desejem retribuir considerem contratar [um dos serviços que ofereço](#outros-serviços).

# Aprendendo a usar

![apresentacao-inicial](https://user-images.githubusercontent.com/3603111/81852307-35657880-9531-11ea-9b14-1e9ff0f19d25.png)

## Funcionalidades

- Aulas
    - Exportar planejamento das aulas para planilha
    - Importar planejamento das aulas de planilha
    - Importar cadastro de frequência dos alunos
    - Realçar cadastros incorretos (feriados e dias sem aulas)
    - [Carregar um calendário de feriados](#calendário-de-feriados)
    - Configurar Nº de aulas seguidas padrão para novos registros
    - Permite cadastrar "Ausente" ou "Não registrado" por padrão nas frequências (_evita tendinite_)
    - Correção automático de frequência dos alunos transferidos
- Avaliação
    - Exportar e importar notas com planilha
    - Aplicar uma nota inicial para todos os alunos da turma
- Planilhas
    - Planilhas com calendário de 2020
    - Planilha com registros para Normativa nº 01 do Comitê de Gestão de Crise COVID-19
- Outras melhorias
    - Teclas de atalho
    - Foco automático dos campos
    - Comentários e navegação automática
- Ajuda
  - Vídeos
  - Site de ajuda
  - Sugerir melhoria
  - Suporte


## Vídeos

- [Playlist oficial apresentando a ferramenta](https://www.youtube.com/watch?v=h6VVqVSFnLA&list=PL9kH1vkGoNugNdtEla-YHZWE0SRxGKIcN)

### Produzidos por outras pessoas

- [Prof.: Cláudio Teodista Matemática e Tutoriais](https://www.youtube.com/watch?v=RmilmFq061Q)

## Planilhas

As seguintes planilhas são mantidas para facilitar a manipulação dos registros no saber:

- [Para registro de aulas (conteúdos e frequências)](https://github.com/edusantana/saber-pb/raw/master/aulas-conteudos.xlsx)
- [Para registro de avaliações](https://github.com/edusantana/saber-pb/raw/master/avaliacoes.xlsx)

## Calendário de feriados

Agora é possível carregar um [calendário de feriados](https://github.com/edusantana/saber-pb/blob/master/feriados-escolares.txt) que foi concebido para ser atualizado por vocês, usuários da extensão.

![Captura de tela de 2020-05-31 14-04-14](https://user-images.githubusercontent.com/3603111/83358129-c026df80-a347-11ea-97de-4dea28715a97.png)

Para editar o calendário (comunitário) é necessário:

1. [Solicitar permissão](https://github.com/edusantana/saber-pb/issues/new?title=Solicito%20permissão%20para%20editar%20calendário)
2. Aguardar que eu envie o convite para editar o repositório
3. Abrir o convite (no e-mail) para editação do repositório e aceitar

Realizado esses passos (uma única vez), você poderá [editar o arquivo de calendário](https://github.com/edusantana/saber-pb/blob/master/feriados-escolares.txt) clicando no *lapis*.

> [Dúvidas sobre o calendário?](https://github.com/edusantana/saber-pb/issues/6)

# Código para marcar frequência dos alunos não registrado

Fiz [esse vídeo](https://www.youtube.com/watch?v=bleAA-IufqQ) demonstrando como marcar **não registrado sem precisar instalar nada**, apenas executando o seguinte código:

```javascript
for(var caixa of document.querySelectorAll('[id*=_status_2]')) {caixa.checked='checked'}
```

# Suporte

Precisa de ajuda? Pode entrar em contato.

WhatsApp/Telefone: **(83) 98108-1977**

E-mail: eduardo.ufpb@gmail.com

## Outros serviços

- Consultoria tecnológica
- Tornar o computador mais rápido (_manutenção em notebook_)
- Desenvolvimento e manutenção de sistemas
- Produção de livros (eternize um familiar que faleceu, escreva em família e publique um livro sobre quem ama)

# Comentários

- [Sugerir melhoria](https://github.com/edusantana/saber-pb/issues/new)
- [Avaliar a extensão](https://chrome.google.com/webstore/detail/saber-pb/pfnoopdjbdpgegpkihfmlofngfdkjfem)

Se quiser, pode deixar seu comentário aqui.

<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://edusantana.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
