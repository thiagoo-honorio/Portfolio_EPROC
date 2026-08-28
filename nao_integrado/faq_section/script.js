const FAQ_DATA = [
  {
    id: 1,
    pergunta: "O que é a LGPD e por que se aplica à universidade?",
    resposta: "A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) é a legislação brasileira que regula o tratamento de dados pessoais. Aplica-se à universidade porque ela trata dados de milhares de titulares — estudantes, professores, funcionários e terceiros — para finalidades educacionais, administrativas e de pesquisa. O descumprimento pode resultar em sanções administrativas, multas e danos reputacionais.",
    categoria: "Geral",
  },
  {
    id: 2,
    pergunta: "Quais são meus direitos como titular de dados na universidade?",
    resposta: "Conforme o Art. 18 da LGPD, você tem direito a: confirmar a existência de tratamento dos seus dados; acessar seus dados; corrigir dados incompletos ou inexatos; solicitar anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade dos dados para outro fornecedor; eliminar dados tratados com consentimento; obter informações sobre compartilhamento de dados; não fornecer consentimento e conhecer as consequências; e revogar o consentimento a qualquer momento. O prazo de resposta da universidade é de 15 dias úteis (Art. 19).",
    categoria: "Direitos",
  },
  {
    id: 3,
    pergunta: "A universidade pode compartilhar meus dados com empresas externas?",
    resposta: "Sim, mas com restrições. A universidade pode compartilhar dados com: órgãos governamentais (obrigação legal), instituições parceiras (intercâmbio), órgãos de fomento (CNPq, CAPES), prestadores de serviços (operadores contratados) e autoridades judiciais (por ordem). Qualquer compartilhamento deve ter base legal válida (Art. 7º ou 11) e estar descrito no Aviso de Privacidade. Compartilhamento com finalidade comercial ou publicitária é vedado.",
    categoria: "Compartilhamento",
  },
  {
    id: 4,
    pergunta: "Como posso solicitar acesso aos meus dados pessoais?",
    resposta: "Utilize o formulário de contato do DPO disponível neste portal, selecione 'Acesso aos dados' e descreva sua solicitação. Ouvirá também enviar e-mail para dpo@universidade.edu.br com seu nome, CPF e descrição do pedido. A universidade tem 15 dias úteis para responder (Art. 19 da LGPD). O acesso é gratuito e pode ser fornecido em formato eletrônico ou impresso.",
    categoria: "Direitos",
  },
  {
    id: 5,
    pergunta: "Posso pedir para a universidade apagar meus dados?",
    resposta: "Sim, em alguns casos. O direito à eliminação aplica-se quando: os dados foram tratados com consentimento e você revogou-o; quando os dados são excessivos ou desnecessários para a finalidade; quando o tratamento não está em conformidade com a LGPD; ou quando os dados não mais são necessários. Porém, dados necessários para cumprimento de obrigação legal (registros acadêmicos, históricos) não podem ser eliminados. Nesses casos, a universidade pode anonimizar os dados.",
    categoria: "Direitos",
  },
  {
    id: 6,
    pergunta: "A universidade usa meus dados para pesquisa científica?",
    resposta: "A universidade pode tratar dados pessoais para pesquisa científica com base legal específica (Art. 11, II, c para dados sensíveis; Art. 7º, IX para legítimo interesse). Quando possível, os dados são anonimizados para proteger a identidade dos titulares. Pesquisadores que utilizam dados pessoais devem submeter o projeto ao Comitê de Ética em Pesquisa e seguir as diretrizes de anonimização do IBICT. O titular pode se opor ao tratamento se não estiver em conformidade.",
    categoria: "Pesquisa",
  },
  {
    id: 7,
    pergunta: "O que é consentimento e quando a universidade precisa dele?",
    resposta: "Consentimento é a manifestação livre, informada e inequívoca do titular concordando com o tratamento de seus dados. A universidade precisa de consentimento quando não há outra base legal aplicável (ex.: cadastro em sistemas de aprendizagem, inscrição em eventos, uso de plataformas externas). Porém, para muitas finalidades a universidade utiliza outras bases legais: execução de contrato (matrícula), obrigação legal (registros do MEC/INEP), políticas públicas (ações afirmativas) e legítimo interesse (segurança).",
    categoria: "Consentimento",
  },
  {
    id: 8,
    pergunta: "Meus dados estão seguros? A universidade sofre ataques cibernéticos?",
    resposta: "A LGPD exige que a universidade adote medidas técnicas e administrativas para proteger os dados (Art. 46). Isso inclui: criptografia de dados em trânsito e em repouso, controle de acesso baseado em funções (RBAC), monitoramento contínuo, treinamento periódico de colaboradores e plano de resposta a incidentes. Em caso de incidente de segurança, a universidade deve comunicar à ANPD e aos titulares afetados em prazo razoável.",
    categoria: "Segurança",
  },
  {
    id: 9,
    pergunta: "Como sou pesquisador, o que preciso saber sobre LGPD na minha pesquisa?",
    resposta: "Pesquisadores devem: (1) identificar a base legal para tratamento (consentimento via TCLE ou pesquisa científica Art. 11, II, c); (2) garantir anonimização quando possível; (3) submeter o projeto ao Comitê de Ética; (4) definir prazo de retenção dos dados; (5) registrar o tratamento no Inventário de Dados; (6) verificar que publicações não contenham dados identificáveis; (7) utilizar acordos de compartilhamento com co-pesquisadores; e (8) armazenar dados em ambientes seguros com acesso restrito. Consulte o DPO para orientações específicas.",
    categoria: "Pesquisa",
  },
  {
    id: 10,
    pergunta: "O que é um TCLE e como devo elaborá-lo para minha pesquisa?",
    resposta: "TCLE (Termo de Consentimento Livre e Esclarecido) é o documento que informa ao participante da pesquisa sobre seus objetivos, procedimentos, riscos, benefícios e direitos. Deve conter: identificação dos pesquisadores; objetivos claros; procedimentos de coleta e tratamento de dados; riscos e benefícios; garantia de anonimato/confidencialidade; direito de recusa e retirada a qualquer momento; contato do DPO e do Comitê de Ética; forma de armazenamento e prazo de retenção. O TCLE deve ser elaborado em linguagem acessível e submetido ao CEP antes da coleta.",
    categoria: "Pesquisa",
  },
  {
    id: 11,
    pergunta: "Sou técnico-administrativo. Quais cuidados devo ter com os dados?",
    resposta: "Como técnico-administrativo, você deve: (1) acessar dados apenas quando necessário para suas funções (princípio da necessidade); (2) não compartilhar dados com colegas que não tenham necessidade de acesso; (3) utilizar senhas fortes e não compartilhá-las; (4) não enviar dados pessoais por e-mail não criptografado; (5) descartar documentos físicos com dados pessoais em trituradora; (6) reportar imediatamente qualquer incidente de segurança; (7) participar dos treinamentos obrigatórios de LGPD; e (8) respeitar os prazos de retenção estabelecidos na tabela de temporalidade da universidade.",
    categoria: "Técnicos",
  },
  {
    id: 12,
    pergunta: "Sou terceirizado. A LGPD se aplica a mim?",
    resposta: "Sim. Como terceirizado que tem acesso a dados pessoais da universidade, você é considerado um operador (ou subcontratado) e deve seguir as mesmas regras de proteção de dados. Seu contrato deve conter cláusulas específicas de proteção de dados (Art. 37). Você deve: receber treinamento em LGPD; ter acesso limitado apenas aos dados necessários para suas atividades; reportar incidentes imediatamente ao contratante; e devolver ou destruir dados ao término do contrato. O descumprimento pode resultar em rescisão contratual e sanções.",
    categoria: "Terceirizados",
  },
  {
    id: 13,
    pergunta: "A universidade pode multar os alunos por uso indevido de dados?",
    resposta: "A universidade não pode aplicar multas diretamente por uso indevido de dados pessoais. Porém, pode aplicar sanções disciplinares conforme seu regimento interno. Além disso, o uso indevido de dados pessoais por qualquer pessoa pode configurar infração à LGPD, com sanções aplicáveis pela ANPD (advertências, multas de até 2% do faturamento, limitadas a R$50 milhões por infração, Art. 52). Em casos graves, pode configurar crime (Lei 13.709/2018, Art. 73).",
    categoria: "Sanções",
  },
  {
    id: 14,
    pergunta: "O que acontece se meus dados forem vazados pela universidade?",
    resposta: "Em caso de incidente de segurança, a universidade deve: (1) adotar medidas imediatas para conter o dano; (2) comunicar a ANPD em prazo razoável; (3) comunicar os titulares afetados sobre o incidente, riscos e medidas recomendadas; (4) investigar a causa e adotar medidas preventivas. Os titulares têm direito a reparação por danos materiais ou morais (Art. 42 e 43). Você pode também apresentar reclamação à ANPD ou buscar judicialmente a reparação de danos.",
    categoria: "Incidentes",
  },
  {
    id: 15,
    pergunta: "Posso revogar meu consentimento a qualquer momento?",
    resposta: "Sim. O titular pode revogar o consentimento a qualquer momento, conforme Art. 8º, §5º da LGPD. A revogação é gratuita e deve ser facilitada. A universidade deve atender a solicitação e interromper o tratamento baseado no consentimento revogado. Porém, a revogação não afeta a licitude do tratamento realizado anteriormente, nem o tratamento que possui outra base legal (obrigação legal, contrato, políticas públicas). Para revogar, utilize o formulário do DPO ou envie e-mail.",
    categoria: "Consentimento",
  },
  {
    id: 16,
    pergunta: "Como os cookies do site da universidade funcionam em relação à LGPD?",
    resposta: "Cookies que coletam dados pessoais devem ter base legal para o tratamento. Cookies essenciais (funcionamento do site) não precisam de consentimento. Cookies de análise e marketing precisam de consentimento prévio, informado e explícito. A universidade deve fornecer política de cookies clara, com opção de aceitar/recusar por categoria, e garantir que dados coletados por cookies sejam tratados conforme a LGPD. Você pode gerenciar cookies nas configurações do seu navegador a qualquer momento.",
    categoria: "Geral",
  },
  {
    id: 17,
    pergunta: "A universidade faz uso de dados para inteligência artificial?",
    resposta: "A LGPD e o Marco Civil da Internet exigem transparência no uso de IA com dados pessoais. A universidade pode usar IA para fins educacionais (recomendação de conteúdo, análise de desempenho), mas deve: informar os titulares sobre o uso; garantir que o tratamento tenha base legal; adotar medidas contra discriminação algorítmica; permitir que o titular conteste decisões automatizadas; e garantir a explicabilidade das decisões. Decisões automatizadas que afetem significativamente o titular podem ser revistas por solicitação.",
    categoria: "Tecnologia",
  },
  {
    id: 18,
    pergunta: "Qual é o prazo para a universidade responder minha solicitação?",
    resposta: "Conforme o Art. 19 da LGPD, o controlador (universidade) deve responder às solicitações do titular imediatamente ou, em caso de impossibilidade, de forma clara e precisa, dentro de 15 dias úteis contados da data da solicitação. Esse prazo pode ser prorrogado em casos excepcionalmente complexos, desde que justificado ao titular. O prazo conta a partir do recebimento da solicitação, independentemente do canal utilizado (formulário, e-mail, presencial).",
    categoria: "Direitos",
  },
];

const CATEGORIAS = ["Todas", "Geral", "Direitos", "Consentimento", "Pesquisa", "Segurança", "Incidentes", "Sanções", "Técnicos", "Terceirizados", "Tecnologia", "Compartilhamento"];

let openId = null;
let searchTerm = "";
let activeCategoria = "Todas";

const helpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
  <path d="M12 17h.01"></path>
</svg>`;

const chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-chevron">
  <path d="m6 9 6 6 6-6"></path>
</svg>`;

function getFilteredFAQ() {
  return FAQ_DATA.filter(item => {
    const matchesSearch = searchTerm === "" ||
      item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resposta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = activeCategoria === "Todas" || item.categoria === activeCategoria;
    return matchesSearch && matchesCategoria;
  });
}

function renderCategories() {
  const container = document.getElementById("category-filters");
  container.innerHTML = CATEGORIAS.map(cat => `
    <button class="category-btn ${activeCategoria === cat ? 'active' : ''}" onclick="setCategoria('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function renderFAQ() {
  const container = document.getElementById("faq-list");
  const filtered = getFilteredFAQ();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-300" style="margin: 0 auto 0.75rem;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
        <p class="no-results-text">Nenhuma pergunta encontrada para os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="faq-item">
      <button class="faq-button" onclick="toggleFAQ(${item.id})">
        ${helpIcon}
        <div class="faq-content">
          <p class="faq-question">${item.pergunta}</p>
          <span class="faq-tag">${item.categoria}</span>
        </div>
        <span class="faq-chevron ${openId === item.id ? 'rotated' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
      ${openId === item.id ? `
        <div class="faq-answer">
          <div class="faq-answer-content">
            <p class="faq-answer-text">${item.resposta}</p>
          </div>
        </div>
      ` : ''}
    </div>
  `).join("");
}

function toggleFAQ(id) {
  openId = openId === id ? null : id;
  renderFAQ();
}

function setCategoria(cat) {
  activeCategoria = cat;
  openId = null;
  renderCategories();
  renderFAQ();
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function(e) {
    searchTerm = e.target.value;
    openId = null;
    renderFAQ();
  });

  renderCategories();
  renderFAQ();
});
