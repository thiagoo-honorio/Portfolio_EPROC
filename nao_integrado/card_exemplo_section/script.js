const ARQUIVO_JSON = 'card_exemplos_principios_lgpd_data.json';

const dadosPadrao = {
  secao: {
    tag: "Art. 6º da LGPD",
    titulo: "Os 10 Princípios do Tratamento de Dados",
    descricao: "Todo tratamento de dados pessoais na universidade deve observar a boa-fé e estes princípios fundamentais. Clique em cada princípio para ver exemplos práticos.",
    tagCor: "#F6891F"
  },
  cards: [
    { num: "01", title: "Finalidade", color: "#24469A", bg: "rgba(36,70,154,0.05)", border: "rgba(36,70,154,0.2)", desc: "Tratamento para propósitos específicos, legítimos e informados ao titular.", exemplo: "Dados de matrícula coletados apenas para fins acadêmicos, não para marketing." },
    { num: "02", title: "Adequação", color: "#1C4BD1", bg: "rgba(28,75,209,0.05)", border: "rgba(28,75,209,0.2)", desc: "Compatibilidade do tratamento com as finalidades informadas ao titular.", exemplo: "Não usar dados de saúde estudantil para análises de desempenho acadêmico sem base legal." },
    { num: "03", title: "Necessidade", color: "#0891b2", bg: "rgba(8,145,178,0.05)", border: "rgba(8,145,178,0.2)", desc: "Limitação do tratamento ao mínimo necessário para a finalidade.", exemplo: "Formulário de inscrição deve pedir apenas dados essenciais." },
    { num: "04", title: "Livre Acesso", color: "#0d9488", bg: "rgba(13,148,136,0.05)", border: "rgba(13,148,136,0.2)", desc: "Garantia de consulta facilitada e gratuita sobre a forma e duração do tratamento.", exemplo: "Estudante pode consultar quais dados a universidade possui sobre ele." },
    { num: "05", title: "Qualidade dos Dados", color: "#059669", bg: "rgba(5,150,105,0.05)", border: "rgba(5,150,105,0.2)", desc: "Garantia de exatidão, clareza, relevância e atualização dos dados.", exemplo: "Manter endereços e contatos de alunos atualizados nos sistemas acadêmicos." },
    { num: "06", title: "Transparência", color: "#047857", bg: "rgba(4,120,87,0.05)", border: "rgba(4,120,87,0.2)", desc: "Informações claras, precisas e facilmente acessíveis sobre o tratamento.", exemplo: "Política de Privacidade publicada e acessível no site institucional." },
    { num: "07", title: "Segurança", color: "#d97706", bg: "rgba(217,119,6,0.05)", border: "rgba(217,119,6,0.2)", desc: "Medidas técnicas e administrativas para proteger dados de acessos não autorizados.", exemplo: "Criptografia de bases de dados, controle de acesso por perfil de usuário." },
    { num: "08", title: "Prevenção", color: "#ea580c", bg: "rgba(234,88,12,0.05)", border: "rgba(234,88,12,0.2)", desc: "Adoção de medidas para prevenir a ocorrência de danos antes que aconteçam.", exemplo: "Treinamentos periódicos, auditorias de segurança e testes de vulnerabilidade." },
    { num: "09", title: "Não Discriminação", color: "#be185d", bg: "rgba(190,24,93,0.05)", border: "rgba(190,24,93,0.2)", desc: "Impossibilidade de tratamento para fins discriminatórios, ilícitos ou abusivos.", exemplo: "Dados de saúde não podem ser usados para discriminar estudantes." },
    { num: "10", title: "Responsabilização", color: "#6d28d9", bg: "rgba(109,40,217,0.05)", border: "rgba(109,40,217,0.2)", desc: "Demonstração da adoção de medidas eficazes para cumprimento das normas.", exemplo: "Manter registros de tratamento (ROPA), políticas documentadas." }
  ]
};

let dados = JSON.parse(JSON.stringify(dadosPadrao));
let expandedIndex = null;
let editando = false;
let editandoCard = null;
let dragIndex = null;

let fileHandle = null;

async function salvarArquivo() {
  const jsonStr = JSON.stringify(dados, null, 2);
  try {
    if (!fileHandle) {
      fileHandle = await window.showSaveFilePicker({
        types: [{ description: 'JSON Files', accept: { 'application/json': ['.json'] } }],
        suggestedName: ARQUIVO_JSON
      });
    }
    const writable = await fileHandle.createWritable();
    await writable.write(jsonStr);
    await writable.close();
    alert('Arquivo JSON salvo diretamente!');
  } catch (e) {
    fileHandle = null;
    if (e.name === 'AbortError') return;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ARQUIVO_JSON;
    a.click();
    URL.revokeObjectURL(url);
  }
}

async function exportarComoPacote() {
  if (typeof JSZip === 'undefined') {
    alert('JSZip não encontrado. Verifique sua conexão com a internet.');
    return;
  }
  try {
    const zip = new JSZip();
    zip.file(ARQUIVO_JSON, JSON.stringify(dados, null, 2));
    zip.file('index.html', gerarHTMLLimpo());
    zip.file('styles.css', gerarCSSLimpo());
    zip.file('script.js', gerarJSLimpo());
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'card_exemplo_section_export.zip';
    a.click();
    URL.revokeObjectURL(url);
    alert('ZIP exportado com sucesso!');
  } catch (e) {
    alert('Erro ao exportar: ' + e.message);
  }
}

function gerarHTMLLimpo() {
  const s = dados.secao;
  const cardsHTML = dados.cards.map(c =>
    '<div class="principio-wrap" style="--principio-color: ' + c.color + '; --principio-bg: ' + c.bg + '; --principio-border: ' + c.border + ';">' +
    '<button class="principio-btn" onclick="togglePrincipioClean(this)">' +
    '<div class="principio-num">' + c.num + '</div>' +
    '<div class="principio-title">' + c.title + '</div>' +
    '<div class="principio-content">' +
    '<p class="principio-desc">' + c.desc + '</p>' +
    '<div class="principio-exemplo">' +
    '<p class="exemplo-label">Exemplo:</p>' +
    '<p class="exemplo-text">' + c.exemplo + '</p>' +
    '</div></div></button></div>'
  ).join('');
  return '<!DOCTYPE html>\n' +
    '<html lang="pt-BR">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '  <title>' + s.titulo + '</title>\n' +
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">\n' +
    '  <link rel="stylesheet" href="styles.css">\n' +
    '</head>\n' +
    '<body>\n' +
    '  <section id="principios" class="py-16 bg-white">\n' +
    '    <div class="container">\n' +
    '      <div class="mb-12">\n' +
    '        <div class="flex items-center gap-2 mb-2">\n' +
    '          <div class="w-1 h-6 rounded-full" style="background-color: ' + s.tagCor + ';"></div>\n' +
    '          <span class="font-bold text-xs uppercase tracking-015em" style="color: ' + s.tagCor + ';">' + s.tag + '</span>\n' +
    '        </div>\n' +
    '        <h2 class="text-3xl font-bold text-slate-900 mb-4" style="font-family: \'Sora\', sans-serif;">' + s.titulo + '</h2>\n' +
    '        <p class="text-slate-600 max-w-2xl text-lg leading-relaxed">' + s.descricao + '</p>\n' +
    '      </div>\n' +
    '      <div class="grid principios-grid gap-3" id="principios-grid">\n' +
    '        ' + cardsHTML + '\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n' +
    '  <script src="script.js"><\/script>\n' +
    '</body>\n' +
    '</html>';
}

function gerarCSSLimpo() {
  return '* {\n' +
    '  margin: 0;\n' +
    '  padding: 0;\n' +
    '  box-sizing: border-box;\n' +
    '}\n\n' +
    'body {\n' +
    '  font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;\n' +
    '  background-color: #ffffff;\n' +
    '}\n\n' +
    '.py-16 { padding-top: 4rem; padding-bottom: 4rem; }\n' +
    '.bg-white { background-color: #ffffff; }\n' +
    '.container { width: 100%; max-width: 64rem; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }\n' +
    '.mb-12 { margin-bottom: 3rem; }\n' +
    '.flex { display: flex; }\n' +
    '.items-center { align-items: center; }\n' +
    '.gap-2 { gap: 0.5rem; }\n' +
    '.mb-2 { margin-bottom: 0.5rem; }\n' +
    '.w-1 { width: 0.25rem; }\n' +
    '.h-6 { height: 1.5rem; }\n' +
    '.rounded-full { border-radius: 9999px; }\n' +
    '.font-bold { font-weight: 700; }\n' +
    '.text-xs { font-size: 0.75rem; line-height: 1rem; }\n' +
    '.uppercase { text-transform: uppercase; }\n' +
    '.tracking-015em { letter-spacing: 0.15em; }\n' +
    '.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }\n' +
    '.font-semibold { font-weight: 600; }\n' +
    '.text-slate-900 { color: #0f172a; }\n' +
    '.mb-4 { margin-bottom: 1rem; }\n' +
    '.text-slate-600 { color: #475569; }\n' +
    '.max-w-2xl { max-width: 42rem; }\n' +
    '.text-lg { font-size: 1.125rem; line-height: 1.75rem; }\n' +
    '.leading-relaxed { line-height: 1.625; }\n' +
    '.grid { display: grid; }\n' +
    '.gap-3 { gap: 0.75rem; }\n' +
    '.principios-grid { grid-template-columns: repeat(2, 1fr); }\n' +
    '@media (min-width: 640px) { .principios-grid { grid-template-columns: repeat(2, 1fr); } }\n' +
    '@media (min-width: 1024px) { .principios-grid { grid-template-columns: repeat(5, 1fr); } }\n\n' +
    '.principio-wrap { position: relative; }\n' +
    '.principio-btn {\n' +
    '  display: block; width: 100%; text-align: left;\n' +
    '  border-radius: 0.75rem; padding: 1rem;\n' +
    '  border: 1px solid #e2e8f0; background: transparent;\n' +
    '  cursor: pointer; transition: all 0.2s ease; font-family: inherit;\n' +
    '}\n' +
    '.principio-btn:hover { border-color: #cbd5e1; }\n' +
    '.principio-btn.expanded { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }\n' +
    '.principio-num {\n' +
    '  font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;\n' +
    '  font-family: \'Sora\', sans-serif; color: #cbd5e1; transition: color 0.2s ease;\n' +
    '}\n' +
    '.principio-btn.expanded .principio-num { color: var(--principio-color); }\n' +
    '.principio-title { font-size: 0.875rem; font-weight: 600; color: #475569; transition: color 0.2s ease; }\n' +
    '.principio-btn.expanded .principio-title { color: #1e293b; }\n' +
    '.principio-content { display: none; margin-top: 0.75rem; }\n' +
    '.principio-btn.expanded .principio-content { display: block; }\n' +
    '.principio-desc { font-size: 0.75rem; color: #475569; line-height: 1.625; margin-bottom: 0.5rem; }\n' +
    '.principio-exemplo {\n' +
    '  border-radius: 0.5rem; padding: 0.5rem;\n' +
    '  border: 1px solid var(--principio-border);\n' +
    '  background-color: var(--principio-bg);\n' +
    '}\n' +
    '.exemplo-label { font-size: 0.75rem; font-weight: 600; color: var(--principio-color); }\n' +
    '.exemplo-text { font-size: 0.75rem; color: #475569; margin-top: 0.125rem; }\n' +
    '@media (min-width: 768px) { .text-3xl { font-size: 2.25rem; line-height: 2.5rem; } }';
}

function gerarJSLimpo() {
  const dataStr = JSON.stringify(dados);
  return 'const dados = ' + dataStr + ';\n\n' +
    'function togglePrincipioClean(btn) { btn.classList.toggle("expanded"); }\n\n' +
    'function atualizarSecao() {\n' +
    '  const s = dados.secao;\n' +
    '  var tag = document.getElementById("secao-tag");\n' +
    '  var barra = document.getElementById("secao-barra");\n' +
    '  var titulo = document.getElementById("secao-titulo");\n' +
    '  var desc = document.getElementById("secao-descricao");\n' +
    '  if (tag) { tag.textContent = s.tag; tag.style.color = s.tagCor; }\n' +
    '  if (barra) barra.style.backgroundColor = s.tagCor;\n' +
    '  if (titulo) titulo.textContent = s.titulo;\n' +
    '  if (desc) desc.textContent = s.descricao;\n' +
    '}\n\n' +
    'atualizarSecao();';
}

function toggleInstrucoes() {
  document.getElementById('modal-instr').classList.add('visivel');
}

function fecharInstrucoes() {
  document.getElementById('modal-instr').classList.remove('visivel');
}

async function carregarDados() {
  try {
    const resp = await fetch(ARQUIVO_JSON + '?t=' + Date.now());
    if (!resp.ok) throw new Error(resp.status);
    const json = await resp.json();
    if (json && json.cards && Array.isArray(json.cards)) {
      dados = json;
    }
  } catch (e) {
    dados = JSON.parse(JSON.stringify(dadosPadrao));
  }
  atualizarSecao();
  renderPrincipios();
}

function gerarCorAutomatica() {
  const cores = ['#24469A','#1C4BD1','#0891b2','#0d9488','#059669','#047857','#d97706','#ea580c','#be185d','#6d28d9'];
  const usadas = dados.cards.map(c => c.color);
  const disponivel = cores.find(c => !usadas.includes(c));
  if (disponivel) return disponivel;
  const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
  return '#' + hex;
}

function gerarBg(color) {
  const r = parseInt(color.slice(1,3),16);
  const g = parseInt(color.slice(3,5),16);
  const b = parseInt(color.slice(5,7),16);
  return `rgba(${r},${g},${b},0.05)`;
}

function gerarBorder(color) {
  const r = parseInt(color.slice(1,3),16);
  const g = parseInt(color.slice(3,5),16);
  const b = parseInt(color.slice(5,7),16);
  return `rgba(${r},${g},${b},0.2)`;
}

function proximoNum() {
  if (dados.cards.length === 0) return "01";
  const nums = dados.cards.map(c => parseInt(c.num, 10));
  const max = Math.max(...nums);
  return String(max + 1).padStart(2, '0');
}

function renumerar() {
  dados.cards.forEach((c, i) => { c.num = String(i + 1).padStart(2, '0'); });
}

function atualizarSecao() {
  document.getElementById('secao-tag').textContent = dados.secao.tag;
  document.getElementById('secao-tag').style.color = dados.secao.tagCor;
  document.getElementById('secao-barra').style.backgroundColor = dados.secao.tagCor;
  document.getElementById('secao-cor-input').value = dados.secao.tagCor;
  document.getElementById('secao-titulo').textContent = dados.secao.titulo;
  document.getElementById('secao-descricao').textContent = dados.secao.descricao;
}

function configurarEdicaoInline() {
  const tag = document.getElementById('secao-tag');
  const titulo = document.getElementById('secao-titulo');
  const desc = document.getElementById('secao-descricao');
  const container = tag.closest('.mb-12');

  tag.contentEditable = editando;
  titulo.contentEditable = editando;
  desc.contentEditable = editando;
  container.classList.toggle('editavel', editando);

  tag.onblur = () => { dados.secao.tag = tag.textContent.trim(); };
  titulo.onblur = () => { dados.secao.titulo = titulo.textContent.trim(); };
  desc.onblur = () => { dados.secao.descricao = desc.textContent.trim(); };
}

function mudarCorSecao(cor) {
  dados.secao.tagCor = cor;
  atualizarSecao();
}

function renderPrincipios() {
  const grid = document.getElementById('principios-grid');
  grid.innerHTML = dados.cards.map((p, i) => `
    <div class="principio-wrap ${editando ? 'arrastavel' : ''}"
      draggable="${editando}"
      ondragstart="onDragStart(event, ${i})"
      ondragover="onDragOver(event, ${i})"
      ondrop="onDrop(event, ${i})"
      ondragend="onDragEnd(event)"
      style="--principio-color: ${p.color}; --principio-bg: ${p.bg}; --principio-border: ${p.border};"
    >
      <button
        class="principio-btn ${expandedIndex === i ? 'expanded' : ''}"
        onclick="togglePrincipio(${i})"
      >
        <div class="principio-num">${p.num}</div>
        <div class="principio-title">${p.title}</div>
        <div class="principio-content">
          <p class="principio-desc">${p.desc}</p>
          <div class="principio-exemplo">
            <p class="exemplo-label">Exemplo:</p>
            <p class="exemplo-text">${p.exemplo}</p>
          </div>
        </div>
      </button>
      ${editando ? `
      <div class="card-icon-actions">
        <button class="icon-btn icon-drag" data-tooltip="Arrastar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </button>
        <button class="icon-btn icon-editar" data-tooltip="Editar" onclick="event.stopPropagation(); abrirEditor(${i})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn icon-remover" data-tooltip="Remover" onclick="event.stopPropagation(); removerCard(${i})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>` : ''}
    </div>
  `).join('');
}

function onDragStart(event, index) {
  dragIndex = index;
  event.dataTransfer.effectAllowed = 'move';
  event.target.closest('.principio-wrap').classList.add('arrastando');
}

function onDragOver(event, index) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  const alvo = event.target.closest('.principio-wrap');
  if (!alvo || dragIndex === index) return;
  const wraps = [...document.querySelectorAll('.principio-wrap')];
  const arrastando = wraps[dragIndex];
  if (!arrastando) return;
  const rect = alvo.getBoundingClientRect();
  const depois = index > dragIndex
    ? event.clientY > rect.top + rect.height / 2
    : event.clientY >= rect.top + rect.height / 2;
  alvo.classList.remove('drop-antes', 'drop-depois');
  alvo.classList.add(depois ? 'drop-depois' : 'drop-antes');
}

function onDrop(event, index) {
  event.preventDefault();
  if (dragIndex === null || dragIndex === index) return;
  const [card] = dados.cards.splice(dragIndex, 1);
  dados.cards.splice(index, 0, card);
  renumerar();
  if (expandedIndex === dragIndex) expandedIndex = index;
  else if (expandedIndex !== null) {
    if (dragIndex < expandedIndex && index >= expandedIndex) expandedIndex--;
    else if (dragIndex > expandedIndex && index <= expandedIndex) expandedIndex++;
  }
  dragIndex = null;
  renderPrincipios();
}

function onDragEnd(event) {
  dragIndex = null;
  document.querySelectorAll('.principio-wrap').forEach(w => {
    w.classList.remove('arrastando', 'drop-antes', 'drop-depois');
  });
}

function togglePrincipio(index) {
  expandedIndex = expandedIndex === index ? null : index;
  renderPrincipios();
}

function toggleModoEdicao() {
  editando = !editando;
  const btn = document.getElementById('btn-editar-toggle');
  btn.textContent = editando ? 'Sair do Modo Edição' : 'Modo Edição';
  btn.classList.toggle('ativo', editando);
  document.getElementById('toolbar-edicao').classList.toggle('visivel', editando);
  configurarEdicaoInline();
  renderPrincipios();
}

function adicionarCard() {
  const novoCard = {
    num: proximoNum(),
    title: "Novo Card",
    color: gerarCorAutomatica(),
    bg: "",
    border: "",
    desc: "Descrição do novo card.",
    exemplo: "Exemplo do novo card."
  };
  novoCard.bg = gerarBg(novoCard.color);
  novoCard.border = gerarBorder(novoCard.color);
  dados.cards.push(novoCard);
  expandedIndex = dados.cards.length - 1;
  renderPrincipios();
  abrirEditor(dados.cards.length - 1);
}

function removerCard(index) {
  if (!confirm(`Remover "${dados.cards[index].title}"?`)) return;
  dados.cards.splice(index, 1);
  renumerar();
  if (expandedIndex === index) expandedIndex = null;
  else if (expandedIndex > index) expandedIndex--;
  renderPrincipios();
}

function abrirEditor(index) {
  editandoCard = index;
  const card = dados.cards[index];
  const modal = document.getElementById('modal-editor');
  document.getElementById('edit-title').value = card.title;
  document.getElementById('edit-color').value = card.color;
  document.getElementById('edit-desc').value = card.desc;
  document.getElementById('edit-exemplo').value = card.exemplo;
  modal.classList.add('visivel');
}

function fecharEditor() {
  document.getElementById('modal-editor').classList.remove('visivel');
  editandoCard = null;
}

function salvarEdicao() {
  if (editandoCard === null) return;
  const card = dados.cards[editandoCard];
  card.title = document.getElementById('edit-title').value.trim() || card.title;
  card.color = document.getElementById('edit-color').value;
  card.bg = gerarBg(card.color);
  card.border = gerarBorder(card.color);
  card.desc = document.getElementById('edit-desc').value.trim();
  card.exemplo = document.getElementById('edit-exemplo').value.trim();
  fecharEditor();
  renderPrincipios();
}

function importarJSON() {
  document.getElementById('input-importar').click();
}

function lerImportado(event) {
  const arquivo = event.target.files[0];
  if (!arquivo) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importado = JSON.parse(e.target.result);
      if (!importado.cards || !Array.isArray(importado.cards)) {
        alert('Formato inválido: esperado um JSON com "cards" e "secao".');
        return;
      }
      dados = importado;
      expandedIndex = null;
      atualizarSecao();
      renderPrincipios();
      alert('Dados importados com sucesso!');
    } catch (err) {
      alert('Erro ao ler o arquivo: ' + err.message);
    }
  };
  reader.readAsText(arquivo);
  event.target.value = '';
}

function restaurarPadrao() {
  if (!confirm('Restaurar todos os dados para o padrão?')) return;
  dados = JSON.parse(JSON.stringify(dadosPadrao));
  expandedIndex = null;
  atualizarSecao();
  renderPrincipios();
}

carregarDados();
