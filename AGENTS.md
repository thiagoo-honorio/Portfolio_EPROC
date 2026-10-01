# AGENTS.md — Projeto Portfólio de Processos UTFPR

## Regras de trabalho
- **Nunca commitar nem fazer push automaticamente.** Só commitar/envir quando o usuário pedir explicitamente.
- Responder sempre em **português do Brasil (pt-BR)**.
- Projeto interativo HTML/CSS/JS puro (sem build), aberto localmente via `file://` na maioria das vezes.

## Estrutura
- `teste.html` — página principal (navbar, hero, **hierarquia do processo**, contextualização, atores, cadeia de valor, fluxo, mapa interativo, rodapé). A Hierarquia (`#hierarquiaBox` / `#hierarquiaContent`) vem **antes** da Contextualização (`#contextBox` / `#contextContent`) — foram seções separadas.
- `style.css` — estilos (não usa `url()` para imagens; `box-sizing` global; scroll suave).
- `script.js` — toda a lógica (mapa, atores, etapas, exportações, navegação).
- `imagens/` — diagramas dos fluxos usados na Seção 3 (extraídos dos antigos base64 inline). Referenciados por caminho relativo local (`imagens/<arquivo>.png`).
- `Portfolio_Processos_UTFPR/` — páginas nivel_1…nivel_3 (repositório isolado embutido; `.git` interno foi removido). Contém as cópias locais de `logo_utfpr.png` e `logo_escritorio_processos.png`, referenciadas localmente por ele.

## Texto e título editáveis (modo Editar)
- **Abertura da seção (`.sec-lead`) — primeiro filho do `*Content`:** todo `*Content` abre com `<div class="sec-lead" data-editable="true" data-field="<id>_lead" data-placeholder="...">`. É o parágrafo de apresentação da seção: borda esquerda azul, fundo em gradiente, `text-align: justify` e `max-width: 40em` (≈ 80 caracteres por linha; sem esse limite o parágrafo saía com ~140). No celular o `@media (max-width: 700px)` troca para `text-align: left` e `max-width: none`. A Hierarquia tem 3 e a Contextualização tem 3 (`context_lead`).
- **Ordem dentro do `*Content`:** `.sec-lead` → `.sec-intro`/`.context-intro` → conteúdo. A `.sec-lead` é o texto-base do arquivo; a `.sec-intro` é a caixa livre do usuário. Ficam em campos separados de propósito: se o texto-base morasse dentro do `<id>_intro`, um estado salvo antigo sobrescreveria a abertura ao ser restaurado.
- **Caixa de texto por seção:** logo depois da `.sec-lead` vem `<div class="sec-intro" data-editable="true" data-field="<id>_intro" data-placeholder="...">`. A Contextualização usa a classe legada `.context-intro` (mesmas regras). O CSS generalizado usa `content: attr(data-placeholder)`, então **cada seção tem seu próprio texto de dica**. Comportamento: vazia + fora do modo edição → `display: none`; vazia + editando → borda tracejada e placeholder; com texto → aparece normal.
- `.sec-note` (campo `suporte_acesso`, no Suporte) é a mesma caixa de abertura, para a observação que não é a apresentação principal da seção.
- Os `data-field` estáveis atuais são: `hierarquia_lead`, `context_lead`, `sec3_lead`, `suporte_lead`, `suporte_acesso`, `sec1_lead`, `sec1b_lead`, `sec2_lead`, `secBaseLegal_lead`, mais os 13 `<id>_intro` — 22 no total. **Ao criar/renomear uma abertura, use a chave `<id>_lead` e nunca um índice.**
- Como usam `data-field`, são coletados/restaurados sozinhos por `capturarTextosEditaveis()` / `aplicarTextosEditaveis()`.
- **Título da seção editável:** `prepararTitulosSecoes()` (roda no `DOMContentLoaded`) embrulha o texto de cada `.section-title-text` num `<span class="sec-titulo-edit">`, deixando o `<svg>` do ícone fora. `aplicarEstadoEditavel()` liga/desliga o `contentEditable` desse span conforme `editMode`.
- `sincronizarMenuSecao(id, titulo)` atualiza `.nav-menu a[data-secao="<id>"]` **e** `.footer-list a[href="#<id>"]`. É chamada por `definirTituloSecao()`, então tanto o edição inline quanto o painel "Propriedades da Seção" (`#secpTitulo`) propagam para o menu.
- Listeners: `input` sincroniza o menu enquanto digita; `keydown` com `Enter` tira o foco (não quebra a linha). O clique no cabeçalho continua.selectando a seção para o painel de propriedades.
- O título é persistido em `capturarEstilosSecoes()` (`st.titulo`) e reaplicado por `aplicarEstilosSecoes()`.
- `limparCloneParaExportacao` também força `contenteditable="false"` em `.sec-titulo-edit` nas duas cópias do clone.

## Estado no navegador — NÃO auto-restaurar
- O `localStorage` guarda `utfpr_fluxo_estagio` (manual) e `utfpr_fluxo_estagio_autosave` (auto). **O auto-save nunca é aplicado no carregamento** — `tentarRestaurarAutoSave()` foi removida de propósito, porque `aplicarEstadoCompleto()` sobrescrevia textos, seções, cores e estilos do `teste.html`/`style.css` e fazia o navegador exibir a versão antiga em vez do código recém salvo. No `DOMContentLoaded` só se chama `limparAutoSave()`. A restauração é exclusivamente manual (botão 💾 Restaurar).
- **Preferência opcional `utfpr_restaurar_ao_abrir`** (botão `#btnRestaurarAoAbrir`, default **desligado**): o usuário que liga recebe, no carregamento seguinte, o aviso "Usar o conteúdo do arquivo" com duas saídas — usar o estado salvo ou descartar e recarregar. Só o estado **manual** é aplicado; o auto-save continua nunca aplicado sozinho, e `pagehide`/`visibilitychange` só gravam quando a preferência está ligada. Manter o default desligado: auto-restaurar sobrescreveria o código recém salvo.

## Persistência do que o usuário edita (estado `versao: 5`)
- `coletarEstadoCompleto()` → `aplicarEstadoCompleto()` guardam, além de `map`/`atores`/`etapas`/`textos`/`secoes`/`estiloSecoes`: **`cadeia`** (linhas de `#cadeiaContainer`) e **`estrutura`** (`{ordem, removidas, extras}` das `[data-ap-section]`). Estados antigos sem essas chaves continuam aplicáveis.
- **Campos de texto:** `garantirCamposEditaveis()` cria `data-field="auto_<idDaSecao>_<caminhoDOM>"` para toda `[data-editable="true"]` que não tem chave. `AP_CAPTURA_DEDICADA` (`#actorsList`, `#etapasList3`, `.cadeia-row`) fica de fora: esses já têm captura própria. **Não usar índice como chave** — a ordem das caixas muda.
- **Chave de imagem:** `data-ap-img-id` (`garantirIdsImagem()`). Regra: chave existente **nunca** é renumerada; só imagem sem chave ou com chave repetida recebe um número livre acima do maior atual (numeração simples fazia uma imagem inserida no meio roubar a chave da vizinha). `apImgAlvo()` exclui prévias/lightbox/camada de apresentação da numeração. `inserirImgNoAlvo()` já nasce com `data-ap-img-id`, porque o `innerHTML` da caixa é serializado no mesmo salvamento.
- **Edição de imagem:** `apImgTrocar()` (URL ou upload), `apImgRemover()` (marca `data-ap-img-removida` e esconde), `apImgRestaurar()` e **`restaurarImagensRemovidas()`** (botão `#btnRestaurarImgCaixa` da toolbar da caixa — imagem removida fica `display:none`, então não há como clicar nela), `apImgAlt()` (texto alternativo em `data-ap-img-alt`, que a exportação vira `<figcaption class="ap-figcaption">`).
- **Links:** `inserirLinkEditavel()` edita o link sob o cursor quando já existe; `removerLinkMantendoTexto()` (via `removerLinkEditavel()`) tira o `<a>` e preserva o texto.
- **Uploads:** sempre `arquivoParaDataUrl()` (FileReader + canvas, reduz o lado maior para 1600/1400 px) — nunca guardar caminho absoluto. Usado por `inserirImgNoAlvo()` e por `escolherArquivoImagemApresentacao()` (camada de apresentação, `state.apresentacao`).
- **Ordem importa em `aplicarEstadoCompleto()`:** atores → cadeia → etapas → textos → estrutura → **`imgEdits`** → seções/estilos. `imgEdits` vem depois porque `textos` e `estrutura` reescrevem `innerHTML` e recriam `<img>`; aplicado antes, as edições iam para o elemento que em seguida seria substituído.
- **Duplicar seção:** `duplicarSecao()` prefixa os `id`s internos e os `data-field` (`<novoId>_<id>`), reescrevendo `onclick`, `aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns`, `for`, `list` e `href`. `idsColidindoForaDe()` monta a lista do que precisa ser renomeado.


## Imagens
- **Diagramas da Seção 3** (etapas disponibilização/contratação/vigência/encerramento + barra de gestão): arquivos locais em `imagens/diagrama_<step>.png`, referenciados por caminho relativo. Extraídos dos antigos blobs base64 inline (reduziu o `teste.html` de ~986 KB para ~61 KB).
- **Fallback embutido:** os 5 diagramas também ficam embutidos como base64 no `script.js` (`FALLBACK_IMAGENS`, ~924 KB). `paraDataUrlBase64()` os usa quando o navegador bloqueia a leitura de `imagens/` (Chrome em `file://`), garantindo exportações standalone. `diagrama_gestao.png` e `diagrama_disponibilizacao.png` são **idênticos** (mesmo sha1).
- As demais imagens (logotipo, jornadas dos atores, contextualização) são referenciadas por **links do CDN jsDelivr** a partir do GitHub (repo público `thiagoo-honorio/Portfolio_Processos_UTFPR`, branch `master`):
  `https://cdn.jsdelivr.net/gh/thiagoo-honorio/Portfolio_Processos_UTFPR@master/<arquivo>.png`
- **Atenção (estrutura do repo GitHub):** no branch `master` do repo, os logos ficam **dentro da subpasta `Portfolio_Processos_UTFPR/`** — por isso o caminho correto dos logos no `teste.html` inclui o prefixo `...@master/Portfolio_Processos_UTFPR/logo_utfpr.png`. Os logos **existem e carregam** (HTTP 200). As demais (estudante.png, prae.png, orientador.png, jornada_dieem.png, imagem_contextualização.png, assinaturas.png, paineis_resultados.png) **NÃO existem em lugar algum do repo** (nem raiz nem subpasta) e retornam 404 no CDN — são mostradas com o placeholder de `instalarFallbackImagens()`.
- Para arquivos com acentos/espaços, usar URL-encoding (ex.: `imagem_contextualiza%C3%A7%C3%A3o.png`).
- `embutirImagens()` no script.js pula URLs http(s) e `data:`; para caminhos locais (como os de `imagens/`) faz fetch/XHR (funciona em http(s) e Firefox em `file://`; em Chrome em `file://` mantém o caminho original e usa `FALLBACK_IMAGENS`).

## Exportações (em script.js)
- `exportarComoHTML` — arquivo único embutido (base64 via `embutirImagens`); avisa quando sobrou caminho absoluto (`varrerCaminhosAbsolutos`), quando as imagens locais não puderam ser embutidas (`imagensEmbutidas`) e quando o `script.js` não pôde ser lido.
- **Runtime de exportação (`runtimeDeExportacao()`):** em Chrome `file://` o navegador bloqueia a leitura de `script.js` **e** de `imagens/*.png` (imagem aparece na tela, mas não pode ser lida para virar base64). Sem `script.js` embutido, o exportado **não** deixa um `<script src="script.js">` órfão: ele embute o runtime mínimo (sanfona `toggleSection`, lightbox da cadeia, modais/zoom da Seção 3, placeholder de imagem quebrada, menu responsivo, legenda a partir do alt), remove o menu de exportação e perde o modo Editar. Não é possível gerar arquivo único com imagens embutidas em `file://` — para isso, abrir no Firefox ou por servidor local.
- `exportarComoPDF` — html2pdf; expande todos os atores durante a captura e restaura depois.
- `exportarComoPacote` — ZIP via JSZip: index.html + style.css + script.js **+ pasta `imagens/`** (as PNGs dos diagramas referenciadas por caminho relativo são lidas via `lerArquivoBlob` e adicionadas ao pacote).
- `exportarJSON` — estado completo; `importarJSON()` reimporta (`#inputFileJSON`).
- As exportações **forçam todos os atores expandidos** (`expandirTodosAtores`) e o estado `expandido` de cada ator é salvo no JSON (`capturarAtores`/`criarLinhaAtorHTML`).
- `limparCloneParaExportacao` (usada por HTML e Pacote) além de remover a UI de edição (`#editorToolbar`, `#propertiesPanel`, `#searchContainer`, botões de edição…) **expande todas as seções colapsáveis** (`hierarquiaContent`, `contextContent`, `suporteContent`, `sec1bContent`, `sec1Content`, `sec2Content`, `sec3Content`) para que o exportado contenha o conteúdo completo. **IMPORTANTE:** o clone é `document.documentElement.cloneNode(true)` (um `Element`, não um `Document`), então NÃO use `cloneDoc.getElementById(id)` (lança `TypeError`); use `cloneDoc.querySelector('#' + id)`.
- `paraDataUrlBase64`/`lerArquivoBlob` tentam `fetch` primeiro (http e Firefox em file://) com fallback para XHR/arraybuffer; em Chrome em file:// a leitura é bloqueada e mantém-se o caminho relativo.

## Armadilhas de CSS já corrigidas (não reintroduzir)
- **Sobreposições com `100vw`:** `.jornada-lightbox`, `.modal-overlay` e `.lightbox-overlay` usavam `width: 100vw; height: 100vh`. Como `100vw` inclui a largura da barra de rolagem, cada abertura criava uma rolagem horizontal de ~15px. Agora usam `inset: 0; width: auto; height: auto`.
- **Cadeia de valor no celular:** existe um `@media (max-width: 768px)` **antigo** (perto de `.slide-body`) que força `.cv-transversal { grid-column: 1 / 7 }`. Como o `grid-column` cria Tracks mesmo com `grid-template-columns: 1fr`, a `.cv-branch` continuava com 6 colunas abaixo de 768px e o card de Resultados saía da caixa. O `@media` da cadeia (mais abaixo no arquivo) agora reseta `grid-column/grid-row: auto` e `transform` de `.cv-transversal` e `.cv-branch-resultados`. **Se tocar no grid da cadeia, meça em 430/768/900/1500px.**

## Validar código JavaScript
- `node --check "script.js"` (`node` v22 disponível).
- Suíte de regressão headless (temporária, remover antes de entregar): `_ap_teste.js` roda dentro do Chrome com `_ap_run_tests.ps1`, que espelha o projeto num caminho **sem espaços** em `%TEMP%\opencode\proj` — chamada direta do Chrome com acento/espaço no path devolve `exit=13` e DOM vazio. Cobre campos, textos, imagens, links, cadeia, estrutura de seções, preferências, JSON e runtime de exportação.

## Dependências externas (CDN)
- html2pdf (cdnjs), JSZip (cdnjs), Google Fonts Open Sans.