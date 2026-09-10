const ARQUIVO_JSON = 'conceitos_data.json';

const iconesSVG = {
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>`,
  "user-check": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  "file-text": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`,
};

const listaIconeNomes = Object.keys(iconesSVG);

const dadosPadrao = {
  secao: {
    tag: "Fundamentos",
    titulo: "Conceitos Fundamentais",
    descricao: "Antes de compreender as obrigações e direitos, é essencial dominar o vocabulário da Lei Geral de Proteção de Dados.",
    tagCor: "#F6891F",
    badgeText: "Art. 5º — Definições",
    badgeCor: "#24469A"
  },
  cards: [
    { icon: "user", title: "Dado Pessoal", color: "#24469A", bg: "rgba(36,70,154,0.05)", description: "Qualquer informação relacionada a uma pessoa natural identificada ou identificável. Exemplos: nome, CPF, e-mail, matrícula, endereço IP, localização GPS, número de telefone.", examples: ["Nome completo", "CPF / RG", "E-mail institucional", "Matrícula acadêmica", "Endereço IP"] },
    { icon: "lock", title: "Dado Pessoal Sensível", color: "#F6891F", bg: "rgba(246,137,31,0.05)", description: "Categoria especial que exige proteção reforçada por seu potencial discriminatório. Inclui dados sobre saúde, origem racial, convicção religiosa, opinião política, biometria e dados genéticos.", examples: ["Prontuário de saúde", "Cotas raciais", "Biometria (catraca)", "Dados genéticos", "Orientação sexual"] },
    { icon: "database", title: "Tratamento de Dados", color: "#1C4BD1", bg: "rgba(28,75,209,0.05)", description: "Toda operação realizada com dados pessoais: coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, modificação, comunicação, transferência, difusão ou extração.", examples: ["Coleta em formulários", "Armazenamento em sistemas", "Compartilhamento entre setores", "Eliminação de registros"] },
    { icon: "user-check", title: "Titular dos Dados", color: "#059669", bg: "rgba(5,150,105,0.05)", description: "Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento. Na universidade: estudantes, servidores, professores, visitantes, candidatos a processos seletivos.", examples: ["Estudantes", "Servidores técnicos", "Professores", "Visitantes", "Candidatos"] },
    { icon: "eye", title: "Anonimização", color: "#7c3aed", bg: "rgba(124,58,237,0.05)", description: "Utilização de meios técnicos que fazem um dado perder a possibilidade de associação a um indivíduo. Dados verdadeiramente anonimizados não são considerados dados pessoais pela LGPD e podem ser usados livremente em pesquisas.", examples: ["Remoção de identificadores", "Agregação estatística", "Generalização de atributos", "Supressão de campos"] },
    { icon: "file-text", title: "Pseudonimização", color: "#d97706", bg: "rgba(217,119,6,0.05)", description: "Tratamento pelo qual um dado perde a possibilidade de associação direta a um indivíduo, mas pode ser revertido com uso de informação adicional mantida separadamente. Ainda é considerado dado pessoal.", examples: ["Substituição por código", "Tokenização", "Criptografia reversível"] }
  ]
};

let dados = JSON.parse(JSON.stringify(dadosPadrao));
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

function exportarJSON() {
  const jsonStr = JSON.stringify(dados, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = ARQUIVO_JSON;
  a.click();
  URL.revokeObjectURL(url);
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
    a.download = 'conceitos_section_export.zip';
    a.click();
    URL.revokeObjectURL(url);
    alert('ZIP exportado com sucesso!');
  } catch (e) {
    alert('Erro ao exportar: ' + e.message);
  }
}

function gerarHTMLLimpo() {
  const s = dados.secao;
  const cardsHTML = dados.cards.map(c => {
    const iconHTML = iconesSVG[c.icon] || '';
    const examplesHTML = c.examples.map(ex => `<span class="conceito-tag">${ex}</span>`).join('');
    return '<div class="conceito-card" style="--card-color: ' + c.color + '; --card-bg: ' + c.bg + ';">' +
      '<div class="conceito-header">' +
      iconHTML +
      '<h3 class="conceito-title">' + c.title + '</h3>' +
      '</div>' +
      '<p class="conceito-desc">' + c.description + '</p>' +
      '<div class="conceito-tags">' +
      examplesHTML +
      '</div>' +
      '</div>';
  }).join('');
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
    '  <section id="conceitos" class="py-16 bg-white">\n' +
    '    <div class="container">\n' +
    '      <div class="header mb-12">\n' +
    '        <div>\n' +
    '          <div class="flex items-center gap-2 mb-2">\n' +
    '            <div class="w-1 h-6 rounded-full" style="background-color: ' + s.tagCor + ';"></div>\n' +
    '            <span class="font-bold text-xs uppercase tracking-015em" style="color: ' + s.tagCor + ';">' + s.tag + '</span>\n' +
    '          </div>\n' +
    '          <h2 class="text-3xl font-bold text-slate-900 mb-4" style="font-family: \'Sora\', sans-serif;">' + s.titulo + '</h2>\n' +
    '          <p class="text-slate-600 max-w-2xl text-lg leading-relaxed">' + s.descricao + '</p>\n' +
    '        </div>\n' +
    '        <div class="info-badge hidden-md">\n' +
    '          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ' + s.badgeCor + ';">\n' +
    '            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>\n' +
    '          </svg>\n' +
    '          <span class="text-sm font-medium" style="color: ' + s.badgeCor + ';">' + s.badgeText + '</span>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="conceitos-grid" id="conceitos-grid">\n' +
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
    '.font-medium { font-weight: 500; }\n' +
    '.text-slate-900 { color: #0f172a; }\n' +
    '.text-slate-600 { color: #475569; }\n' +
    '.max-w-2xl { max-width: 42rem; }\n' +
    '.text-lg { font-size: 1.125rem; line-height: 1.75rem; }\n' +
    '.leading-relaxed { line-height: 1.625; }\n' +
    '.header { display: flex; flex-direction: column; gap: 1.5rem; }\n' +
    '@media (min-width: 768px) { .header { flex-direction: row; align-items: flex-end; justify-content: space-between; } }\n' +
    '.info-badge { display: flex; flex-shrink: 0; align-items: center; gap: 0.5rem; border-radius: 0.75rem; padding: 0.75rem 1rem; background-color: rgba(36, 70, 154, 0.05); border: 1px solid rgba(36, 70, 154, 0.15); }\n' +
    '.hidden-md { display: none; }\n' +
    '@media (min-width: 768px) { .hidden-md { display: flex; } }\n' +
    '.conceitos-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }\n' +
    '@media (min-width: 768px) { .conceitos-grid { grid-template-columns: repeat(2, 1fr); } }\n' +
    '@media (min-width: 1024px) { .conceitos-grid { grid-template-columns: repeat(3, 1fr); } }\n' +
    '.conceito-card { border-left: 4px solid var(--card-color); border-radius: 0 0.75rem 0.75rem 0; padding: 1.25rem; background-color: var(--card-bg); transition: all 0.2s ease; }\n' +
    '.conceito-card:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }\n' +
    '.conceito-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }\n' +
    '.conceito-title { font-weight: 700; color: #1e293b; font-family: \'Sora\', sans-serif; }\n' +
    '.conceito-desc { color: #475569; font-size: 0.875rem; line-height: 1.625; margin-bottom: 0.75rem; }\n' +
    '.conceito-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; }\n' +
    '.conceito-tag { font-size: 0.75rem; background-color: rgba(255, 255, 255, 0.7); border: 1px solid #e2e8f0; color: #475569; padding: 0.125rem 0.5rem; border-radius: 9999px; }\n' +
    '@media (min-width: 768px) { .text-3xl { font-size: 2.25rem; line-height: 2.5rem; } }';
}

function gerarJSLimpo() {
  const dataStr = JSON.stringify(dados);
  const iconsStr = JSON.stringify(iconesSVG);
  return 'const iconesSVG = ' + iconsStr + ';\n' +
    'const dados = ' + dataStr + ';\n\n' +
    'function renderConceitos() {\n' +
    '  const grid = document.getElementById("conceitos-grid");\n' +
    '  grid.innerHTML = dados.cards.map(c => {\n' +
    '    const iconHTML = iconesSVG[c.icon] || \'\';\n' +
    '    const examplesHTML = c.examples.map(ex => \'<span class="conceito-tag">\' + ex + \'</span>\').join(\'\');\n' +
    '    return \'<div class="conceito-card" style="--card-color: \' + c.color + \'; --card-bg: \' + c.bg + \';">\' +\n' +
    '      \'<div class="conceito-header">\' + iconHTML + \'<h3 class="conceito-title">\' + c.title + \'</h3></div>\' +\n' +
    '      \'<p class="conceito-desc">\' + c.description + \'</p><div class="conceito-tags">\' + examplesHTML + \'</div></div>\';\n' +
    '  }).join("");\n' +
    '}\n\n' +
    'renderConceitos();';
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
  renderConceitos();
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

function proximoNum() {
  return String(dados.cards.length + 1).padStart(2, '0');
}

function atualizarSecao() {
  const s = dados.secao;
  document.getElementById('secao-tag').textContent = s.tag;
  document.getElementById('secao-tag').style.color = s.tagCor;
  document.getElementById('secao-barra').style.backgroundColor = s.tagCor;
  document.getElementById('secao-cor-input').value = s.tagCor;
  document.getElementById('secao-badge-cor-input').value = s.badgeCor;
  document.getElementById('secao-titulo').textContent = s.titulo;
  document.getElementById('secao-descricao').textContent = s.descricao;
  document.getElementById('secao-badge').textContent = s.badgeText;
  document.getElementById('secao-badge').style.color = s.badgeCor;
  const badgeSvg = document.querySelector('#info-badge svg');
  if (badgeSvg) badgeSvg.style.color = s.badgeCor;
}

function configurarEdicaoInline() {
  const tag = document.getElementById('secao-tag');
  const titulo = document.getElementById('secao-titulo');
  const desc = document.getElementById('secao-descricao');
  const badge = document.getElementById('secao-badge');
  const container = tag.closest('.mb-12') || tag.parentElement.parentElement;

  tag.contentEditable = editando;
  titulo.contentEditable = editando;
  desc.contentEditable = editando;
  badge.contentEditable = editando;
  container.classList.toggle('editavel', editando);

  tag.onblur = () => { dados.secao.tag = tag.textContent.trim(); };
  titulo.onblur = () => { dados.secao.titulo = titulo.textContent.trim(); };
  desc.onblur = () => { dados.secao.descricao = desc.textContent.trim(); };
  badge.onblur = () => { dados.secao.badgeText = badge.textContent.trim(); };

  if (editando) {
    document.getElementById('secao-cor-input').style.display = 'inline-block';
    document.getElementById('secao-badge-cor-input').style.display = 'inline-block';
  } else {
    document.getElementById('secao-cor-input').style.display = 'none';
    document.getElementById('secao-badge-cor-input').style.display = 'none';
  }
}

function mudarCorSecao(cor) {
  dados.secao.tagCor = cor;
  atualizarSecao();
}

function mudarCorBadge(cor) {
  dados.secao.badgeCor = cor;
  const badge = document.getElementById('secao-badge');
  const badgeSvg = document.getElementById('secao-badge-svg');
  badge.style.color = cor;
  if (badgeSvg) badgeSvg.style.color = cor;
  const badgeCorInput = document.getElementById('secao-badge-cor-input');
  if (badgeCorInput) badgeCorInput.value = cor;
}

function atualizarPreviewIcone() {
  const select = document.getElementById('edit-icon');
  const preview = document.getElementById('icon-preview');
  if (!select || !preview) return;
  const nome = select.value;
  const svg = iconesSVG[nome] || '';
  preview.innerHTML = svg
    ? '<div class="icon-preview-area">' + svg + '</div>'
    : '';
}

function renderConceitos() {
  const grid = document.getElementById('conceitos-grid');
  grid.innerHTML = dados.cards.map((c, i) => `
    <div class="conceito-wrap ${editando ? 'arrastavel' : ''}"
      draggable="${editando}"
      ondragstart="onDragStart(event, ${i})"
      ondragover="onDragOver(event, ${i})"
      ondrop="onDrop(event, ${i})"
      ondragend="onDragEnd(event)"
      style="--card-color: ${c.color}; --card-bg: ${c.bg};"
    >
      <div class="conceito-card">
        <div class="conceito-header">
          ${iconesSVG[c.icon] || ''}
          <h3 class="conceito-title">${c.title}</h3>
        </div>
        <p class="conceito-desc">${c.description}</p>
        <div class="conceito-tags">
          ${c.examples.map(ex => `<span class="conceito-tag">${ex}</span>`).join('')}
        </div>
      </div>
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
  event.target.closest('.conceito-wrap').classList.add('arrastando');
}

function onDragOver(event, index) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  const alvo = event.target.closest('.conceito-wrap');
  if (!alvo || dragIndex === index) return;
  const wraps = [...document.querySelectorAll('.conceito-wrap')];
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
  if (dragIndex < index) {
    // renumerar icons if needed
  }
  dragIndex = null;
  renderConceitos();
}

function onDragEnd(event) {
  dragIndex = null;
  document.querySelectorAll('.conceito-wrap').forEach(w => {
    w.classList.remove('arrastando', 'drop-antes', 'drop-depois');
  });
}

function toggleModoEdicao() {
  editando = !editando;
  const btn = document.getElementById('btn-editar-toggle');
  btn.textContent = editando ? 'Sair do Modo Edição' : 'Modo Edição';
  btn.classList.toggle('ativo', editando);
  document.getElementById('toolbar-edicao').classList.toggle('visivel', editando);
  configurarEdicaoInline();
  renderConceitos();
}

function adicionarCard() {
  const novoCard = {
    icon: listaIconeNomes[0],
    title: "Novo Conceito",
    color: gerarCorAutomatica(),
    bg: gerarBg(novoCard.color),
    description: "Descrição do novo conceito.",
    examples: ["Exemplo 1", "Exemplo 2"]
  };
  dados.cards.push(novoCard);
  renderConceitos();
  abrirEditor(dados.cards.length - 1);
}

function removerCard(index) {
  if (!confirm(`Remover "${dados.cards[index].title}"?`)) return;
  dados.cards.splice(index, 1);
  renderConceitos();
}

function abrirEditor(index) {
  editandoCard = index;
  const card = dados.cards[index];
  const modal = document.getElementById('modal-editor');
  document.getElementById('edit-title').value = card.title;
  document.getElementById('edit-color').value = card.color;
  document.getElementById('edit-desc').value = card.description;
  document.getElementById('edit-examples').value = card.examples.join('\n');

  const selectIcon = document.getElementById('edit-icon');
  selectIcon.innerHTML = '';
  listaIconeNomes.forEach(nome => {
    const opt = document.createElement('option');
    opt.value = nome;
    opt.textContent = nome;
    if (nome === card.icon) opt.selected = true;
    selectIcon.appendChild(opt);
  });

  modal.classList.add('visivel');
  setTimeout(atualizarPreviewIcone, 10);
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
  card.icon = document.getElementById('edit-icon').value;
  card.description = document.getElementById('edit-desc').value.trim();
  card.examples = document.getElementById('edit-examples').value.split('\n').map(e => e.trim()).filter(e => e.length > 0);
  fecharEditor();
  renderConceitos();
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
      editando = false;
      document.getElementById('btn-editar-toggle').textContent = 'Modo Edição';
      document.getElementById('btn-editar-toggle').classList.remove('ativo');
      document.getElementById('toolbar-edicao').classList.remove('visivel');
      document.getElementById('secao-cor-input').style.display = 'none';
      atualizarSecao();
      renderConceitos();
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
  editando = false;
  document.getElementById('btn-editar-toggle').textContent = 'Modo Edição';
  document.getElementById('btn-editar-toggle').classList.remove('ativo');
  document.getElementById('toolbar-edicao').classList.remove('visivel');
  document.getElementById('secao-cor-input').style.display = 'none';
  atualizarSecao();
  renderConceitos();
}

carregarDados();