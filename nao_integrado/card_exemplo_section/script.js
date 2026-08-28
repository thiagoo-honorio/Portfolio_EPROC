const principios = [
  {
    num: "01",
    title: "Finalidade",
    color: "#24469A",
    bg: "rgba(36,70,154,0.05)",
    border: "rgba(36,70,154,0.2)",
    desc: "Tratamento para propósitos específicos, legítimos e informados ao titular. Não é permitida finalidade genérica ou indeterminada.",
    exemplo: "Dados de matrícula coletados apenas para fins acadêmicos, não para marketing."
  },
  {
    num: "02",
    title: "Adequação",
    color: "#1C4BD1",
    bg: "rgba(28,75,209,0.05)",
    border: "rgba(28,75,209,0.2)",
    desc: "Compatibilidade do tratamento com as finalidades informadas ao titular.",
    exemplo: "Não usar dados de saúde estudantil para análises de desempenho acadêmico sem base legal."
  },
  {
    num: "03",
    title: "Necessidade",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.05)",
    border: "rgba(8,145,178,0.2)",
    desc: "Limitação do tratamento ao mínimo necessário para a finalidade. Proibição de coleta excessiva.",
    exemplo: "Formulário de inscrição deve pedir apenas dados essenciais, não dados bancários desnecessários."
  },
  {
    num: "04",
    title: "Livre Acesso",
    color: "#0d9488",
    bg: "rgba(13,148,136,0.05)",
    border: "rgba(13,148,136,0.2)",
    desc: "Garantia de consulta facilitada e gratuita sobre a forma e duração do tratamento de dados.",
    exemplo: "Estudante pode consultar quais dados a universidade possui sobre ele a qualquer momento."
  },
  {
    num: "05",
    title: "Qualidade dos Dados",
    color: "#059669",
    bg: "rgba(5,150,105,0.05)",
    border: "rgba(5,150,105,0.2)",
    desc: "Garantia de exatidão, clareza, relevância e atualização dos dados conforme a necessidade.",
    exemplo: "Manter endereços e contatos de alunos atualizados nos sistemas acadêmicos."
  },
  {
    num: "06",
    title: "Transparência",
    color: "#047857",
    bg: "rgba(4,120,87,0.05)",
    border: "rgba(4,120,87,0.2)",
    desc: "Informações claras, precisas e facilmente acessíveis sobre o tratamento e os agentes responsáveis.",
    exemplo: "Política de Privacidade publicada e acessível no site institucional."
  },
  {
    num: "07",
    title: "Segurança",
    color: "#d97706",
    bg: "rgba(217,119,6,0.05)",
    border: "rgba(217,119,6,0.2)",
    desc: "Medidas técnicas e administrativas para proteger dados de acessos não autorizados e situações acidentais ou ilícitas.",
    exemplo: "Criptografia de bases de dados, controle de acesso por perfil de usuário."
  },
  {
    num: "08",
    title: "Prevenção",
    color: "#ea580c",
    bg: "rgba(234,88,12,0.05)",
    border: "rgba(234,88,12,0.2)",
    desc: "Adoção de medidas para prevenir a ocorrência de danos antes que aconteçam.",
    exemplo: "Treinamentos periódicos, auditorias de segurança e testes de vulnerabilidade."
  },
  {
    num: "09",
    title: "Não Discriminação",
    color: "#be185d",
    bg: "rgba(190,24,93,0.05)",
    border: "rgba(190,24,93,0.2)",
    desc: "Impossibilidade de tratamento para fins discriminatórios, ilícitos ou abusivos.",
    exemplo: "Dados de saúde não podem ser usados para discriminar estudantes em processos seletivos."
  },
  {
    num: "10",
    title: "Responsabilização",
    color: "#6d28d9",
    bg: "rgba(109,40,217,0.05)",
    border: "rgba(109,40,217,0.2)",
    desc: "Demonstração da adoção de medidas eficazes para cumprimento das normas de proteção de dados.",
    exemplo: "Manter registros de tratamento (ROPA), políticas documentadas e evidências de conformidade."
  }
];

let expandedIndex = null;

function renderPrincipios() {
  const grid = document.getElementById('principios-grid');
  grid.innerHTML = principios.map((p, i) => `
    <button 
      class="principio-btn ${expandedIndex === i ? 'expanded' : ''}"
      style="--principio-color: ${p.color}; --principio-bg: ${p.bg}; --principio-border: ${p.border};"
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
  `).join('');
}

function togglePrincipio(index) {
  expandedIndex = expandedIndex === index ? null : index;
  renderPrincipios();
}

renderPrincipios();
