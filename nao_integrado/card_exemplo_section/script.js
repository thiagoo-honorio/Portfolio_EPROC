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

function salvarArquivo() {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = ARQUIVO_JSON;
  a.click();
  URL.revokeObjectURL(url);
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
