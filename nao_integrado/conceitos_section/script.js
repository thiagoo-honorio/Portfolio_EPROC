const conceitos = [
  {
    icon: "user",
    title: "Dado Pessoal",
    color: "#24469A",
    bg: "rgba(36,70,154,0.05)",
    description:
      "Qualquer informação relacionada a uma pessoa natural identificada ou identificável. Exemplos: nome, CPF, e-mail, matrícula, endereço IP, localização GPS, número de telefone.",
    examples: ["Nome completo", "CPF / RG", "E-mail institucional", "Matrícula acadêmica", "Endereço IP"],
  },
  {
    icon: "lock",
    title: "Dado Pessoal Sensível",
    color: "#F6891F",
    bg: "rgba(246,137,31,0.05)",
    description:
      "Categoria especial que exige proteção reforçada por seu potencial discriminatório. Inclui dados sobre saúde, origem racial, convicção religiosa, opinião política, biometria e dados genéticos.",
    examples: ["Prontuário de saúde", "Cotas raciais", "Biometria (catraca)", "Dados genéticos", "Orientação sexual"],
  },
  {
    icon: "database",
    title: "Tratamento de Dados",
    color: "#1C4BD1",
    bg: "rgba(28,75,209,0.05)",
    description:
      "Toda operação realizada com dados pessoais: coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, modificação, comunicação, transferência, difusão ou extração.",
    examples: ["Coleta em formulários", "Armazenamento em sistemas", "Compartilhamento entre setores", "Eliminação de registros"],
  },
  {
    icon: "user-check",
    title: "Titular dos Dados",
    color: "#059669",
    bg: "rgba(5,150,105,0.05)",
    description:
      "Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento. Na universidade: estudantes, servidores, professores, visitantes, candidatos a processos seletivos.",
    examples: ["Estudantes", "Servidores técnicos", "Professores", "Visitantes", "Candidatos"],
  },
  {
    icon: "eye",
    title: "Anonimização",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.05)",
    description:
      "Utilização de meios técnicos que fazem um dado perder a possibilidade de associação a um indivíduo. Dados verdadeiramente anonimizados não são considerados dados pessoais pela LGPD e podem ser usados livremente em pesquisas.",
    examples: ["Remoção de identificadores", "Agregação estatística", "Generalização de atributos", "Supressão de campos"],
  },
  {
    icon: "file-text",
    title: "Pseudonimização",
    color: "#d97706",
    bg: "rgba(217,119,6,0.05)",
    description:
      "Tratamento pelo qual um dado perde a possibilidade de associação direta a um indivíduo, mas pode ser revertido com uso de informação adicional mantida separadamente. Ainda é considerado dado pessoal.",
    examples: ["Substituição por código", "Tokenização", "Criptografia reversível"],
  },
];

const icons = {
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
    <path d="M3 12A9 3 0 0 0 21 12"></path>
  </svg>`,
  "user-check": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>`,
  "file-text": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--card-color);">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
  </svg>`,
};

function renderConceitos() {
  const grid = document.getElementById("conceitos-grid");
  grid.innerHTML = conceitos
    .map(
      (c) => `
    <div class="conceito-card" style="--card-color: ${c.color}; --card-bg: ${c.bg};">
      <div class="conceito-header">
        ${icons[c.icon]}
        <h3 class="conceito-title">${c.title}</h3>
      </div>
      <p class="conceito-desc">${c.description}</p>
      <div class="conceito-tags">
        ${c.examples.map((ex) => `<span class="conceito-tag">${ex}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}

renderConceitos();
