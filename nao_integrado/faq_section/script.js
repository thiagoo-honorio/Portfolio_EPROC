const ARQUIVO_JSON = 'faq_data.json';

const FAQ_DATA = [
  { id: 1, pergunta: "O que é a LGPD e por que se aplica à universidade?", resposta: "A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) é a legislação brasileira que regula o tratamento de dados pessoais. Aplica-se à universidade porque ela trata dados de milhares de titulares — estudantes, professores, funcionários e terceiros — para finalidades educacionais, administrativas e de pesquisa. O descumprimento pode resultar em sanções administrativas, multas e danos reputacionais.", categoria: "Geral" },
  { id: 2, pergunta: "Quais são meus direitos como titular de dados na universidade?", resposta: "Conforme o Art. 18 da LGPD, você tem direito a: confirmar a existência de tratamento dos seus dados; acessar seus dados; corrigir dados incompletos ou inexatos; solicitar anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade dos dados para outro fornecedor; eliminar dados tratados com consentimento; obter informações sobre compartilhamento de dados; não fornecer consentimento e conhecer as consequências; e revogar o consentimento a qualquer momento. O prazo de resposta da universidade é de 15 dias úteis (Art. 19).", categoria: "Direitos" },
  { id: 3, pergunta: "A universidade pode compartilhar meus dados com empresas externas?", resposta: "Sim, mas com restrições. A universidade pode compartilhar dados com: órgãos governamentais (obrigação legal), instituições parceiras (intercâmbio), órgãos de fomento (CNPq, CAPES), prestadores de serviços (operadores contratados) e autoridades judiciais (por ordem). Qualquer compartilhamento deve ter base legal válida (Art. 7º ou 11) e estar descrito no Aviso de Privacidade. Compartilhamento com finalidade comercial ou publicitária é vedado.", categoria: "Compartilhamento" },
  { id: 4, pergunta: "Como posso solicitar acesso aos meus dados pessoais?", resposta: "Utilize o formulário de contato do DPO disponível neste portal, selecione 'Acesso aos dados' e descreva sua solicitação. Ouvirá também enviar e-mail para dpo@universidade.edu.br com seu nome, CPF e descrição do pedido. A universidade tem 15 dias úteis para responder (Art. 19 da LGPD). O acesso é gratuito e pode ser fornecido em formato eletrônico ou impresso.", categoria: "Direitos" },
  { id: 5, pergunta: "Posso pedir para a universidade apagar meus dados?", resposta: "Sim, em alguns casos. O direito à eliminação aplica-se quando: os dados foram tratados com consentimento e você revogou-o; quando os dados são excessivos ou desnecessários para a finalidade; quando o tratamento não está em conformidade com a LGPD; ou quando os dados não mais são necessários. Porém, dados necessários para cumprimento de obrigação legal (registros acadêmicos, históricos) não podem ser eliminados. Nesses casos, a universidade pode anonimizar os dados.", categoria: "Direitos" },
  { id: 6, pergunta: "A universidade usa meus dados para pesquisa científica?", resposta: "A universidade pode tratar dados pessoais para pesquisa científica com base legal específica (Art. 11, II, c para dados sensíveis; Art. 7º, IX para legítimo interesse). Quando possível, os dados são anonimizados para proteger a identidade dos titulares. Pesquisadores que utilizam dados pessoais devem submeter o projeto ao Comitê de Ética em Pesquisa e seguir as diretrizes de anonimização do IBICT. O titular pode se opor ao tratamento se não estiver em conformidade.", categoria: "Pesquisa" },
  { id: 7, pergunta: "O que é consentimento e quando a universidade precisa dele?", resposta: "Consentimento é a manifestação livre, informada e inequívoca do titular concordando com o tratamento de seus dados. A universidade precisa de consentimento quando não há outra base legal aplicável (ex.: cadastro em sistemas de aprendizagem, inscrição em eventos, uso de plataformas externas). Porém, para muitas finalidades a universidade utiliza outras bases legais: execução de contrato (matrícula), obrigação legal (registros do MEC/INEP), políticas públicas (ações afirmativas) e legítimo interesse (segurança).", categoria: "Consentimento" },
  { id: 8, pergunta: "Meus dados estão seguros? A universidade sofre ataques cibernéticos?", resposta: "A LGPD exige que a universidade adote medidas técnicas e administrativas para proteger os dados (Art. 46). Isso inclui: criptografia de dados em trânsito e em repouso, controle de acesso baseado em funções (RBAC), monitoramento contínuo, treinamento periódico de colaboradores e plano de resposta a incidentes. Em caso de incidente de segurança, a universidade deve comunicar à ANPD e aos titulares afetados em prazo razoável.", categoria: "Segurança" },
  { id: 9, pergunta: "Como sou pesquisador, o que preciso saber sobre LGPD na minha pesquisa?", resposta: "Pesquisadores devem: (1) identificar a base legal para tratamento (consentimento via TCLE ou pesquisa científica Art. 11, II, c); (2) garantir anonimização quando possível; (3) submeter o projeto ao Comitê de Ética; (4) definir prazo de retenção dos dados; (5) registrar o tratamento no Inventário de Dados; (6) verificar que publicações não contenham dados identificáveis; (7) utilizar acordos de compartilhamento com co-pesquisadores; e (8) armazenar dados em ambientes seguros com acesso restrito. Consulte o DPO para orientações específicas.", categoria: "Pesquisa" },
  { id: 10, pergunta: "O que é um TCLE e como devo elaborá-lo para minha pesquisa?", resposta: "TCLE (Termo de Consentimento Livre e Esclarecido) é o documento que informa ao participante da pesquisa sobre seus objetivos, procedimentos, riscos, benefícios e direitos. Deve conter: identificação dos pesquisadores; objetivos claros; procedimentos de coleta e tratamento de dados; riscos e benefícios; garantia de anonimato/confidencialidade; direito de recusa e retirada a qualquer momento; contato do DPO e do Comitê de Ética; forma de armazenamento e prazo de retenção. O TCLE deve ser elaborado em linguagem acessível e submetido ao CEP antes da coleta.", categoria: "Pesquisa" },
  { id: 11, pergunta: "Sou técnico-administrativo. Quais cuidados devo ter com os dados?", resposta: "Como técnico-administrativo, você deve: (1) acessar dados apenas quando necessário para suas funções (princípio da necessidade); (2) não compartilhar dados com colegas que não tenham necessidade de acesso; (3) utilizar senhas fortes e não compartilhá-las; (4) não enviar dados pessoais por e-mail não criptografado; (5) descartar documentos físicos com dados pessoais em trituradora; (6) reportar imediatamente qualquer incidente de segurança; (7) participar dos treinamentos obrigatórios de LGPD; e (8) respeitar os prazos de retenção estabelecidos na tabela de temporalidade da universidade.", categoria: "Técnicos" },
  { id: 12, pergunta: "Sou terceirizado. A LGPD se aplica a mim?", resposta: "Sim. Como terceirizado que tem acesso a dados pessoais da universidade, você é considerado um operador (ou subcontratado) e deve seguir as mesmas regras de proteção de dados. Seu contrato deve conter cláusulas específicas de proteção de dados (Art. 37). Você deve: receber treinamento em LGPD; ter acesso limitado apenas aos dados necessários para suas atividades; reportar incidentes imediatamente ao contratante; e devolver ou destruir dados ao término do contrato. O descumprimento pode resultar em rescisão contratual e sanções.", categoria: "Terceirizados" },
  { id: 13, pergunta: "A universidade pode multar os alunos por uso indevido de dados?", resposta: "A universidade não pode aplicar multas diretamente por uso indevido de dados pessoais. Porém, pode aplicar sanções disciplinares conforme seu regimento interno. Além disso, o uso indevido de dados pessoais por qualquer pessoa pode configurar infração à LGPD, com sanções aplicáveis pela ANPD (advertências, multas de até 2% do faturamento, limitadas a R$50 milhões por infração, Art. 52). Em casos graves, pode configurar crime (Lei 13.709/2018, Art. 73).", categoria: "Sanções" },
  { id: 14, pergunta: "O que acontece se meus dados forem vazados pela universidade?", resposta: "Em caso de incidente de segurança, a universidade deve: (1) adotar medidas imediatas para conter o dano; (2) comunicar a ANPD em prazo razoável; (3) comunicar os titulares afetados sobre o incidente, riscos e medidas recomendadas; (4) investigar a causa e adotar medidas preventivas. Os titulares têm direito a reparação por danos materiais ou morais (Art. 42 e 43). Você também pode apresentar reclamação à ANPD ou buscar judicialmente a reparação de danos.", categoria: "Incidentes" },
  { id: 15, pergunta: "Posso revogar meu consentimento a qualquer momento?", resposta: "Sim. O titular pode revogar o consentimento a qualquer momento, conforme Art. 8º, §5º da LGPD. A revogação é gratuita e deve ser facilitada. A universidade deve atender a solicitação e interromper o tratamento baseado no consentimento revogado. Porém, a revogação não afeta a licitude do tratamento realizado anteriormente, nem o tratamento que possui outra base legal (obrigação legal, contrato, políticas públicas). Para revogar, utilize o formulário do DPO ou envie e-mail.", categoria: "Consentimento" },
  { id: 16, pergunta: "Como os cookies do site da universidade funcionam em relação à LGPD?", resposta: "Cookies que coletam dados pessoais devem ter base legal para o tratamento. Cookies essenciais (funcionamento do site) não precisam de consentimento. Cookies de análise e marketing precisam de consentimento prévio, informado e explícito. A universidade deve fornecer política de cookies clara, com opção de aceitar/recusar por categoria, e garantir que dados coletados por cookies sejam tratados conforme a LGPD. Você pode gerenciar cookies nas configurações do seu navegador a qualquer momento.", categoria: "Geral" },
  { id: 17, pergunta: "A universidade faz uso de dados para inteligência artificial?", resposta: "A LGPD e o Marco Civil da Internet exigem transparência no uso de IA com dados pessoais. A universidade pode usar IA para fins educacionais (recomendação de conteúdo, análise de desempenho), mas deve: informar os titulares sobre o uso; garantir que o tratamento tenha base legal; adotar medidas contra discriminação algorítmica; permitir que o titular conteste decisões automatizadas; e garantir a explicabilidade das decisões. Decisões automatizadas que afetam significativamente o titular podem ser revistas por solicitação.", categoria: "Tecnologia" },
  { id: 18, pergunta: "Qual é o prazo para a universidade responder minha solicitação?", resposta: "Conforme o Art. 19 da LGPD, o controlador (universidade) deve responder às solicitações do titular imediatamente ou, em caso de impossibilidade, de forma clara e precisa, dentro de 15 dias úteis contados da data da solicitação. Esse prazo pode ser prorrogado em casos excepcionalmente complexos, desde que justificado ao titular. O prazo conta a partir do recebimento da solicitação, independentemente do canal utilizado (formulário, e-mail, presencial).", categoria: "Direitos" }
];

const CATEGORIAS = ["Todas", "Geral", "Direitos", "Consentimento", "Pesquisa", "Segurança", "Incidentes", "Sanções", "Técnicos", "Terceirizados", "Tecnologia", "Compartilhamento"];

const helpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>`;

const chevronIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>`;

let dados = JSON.parse(JSON.stringify({ secao: { tag: "Dúvidas Frequentes", tagCor: "#F6891F", titulo: "Perguntas Frequentes sobre LGPD", descricao: "Respostas para as dúvidas mais comuns da comunidade acadêmica sobre proteção de dados pessoais e a LGPD." }, cards: FAQ_DATA }));
let openId = null;
let searchTerm = "";
let activeCategoria = "Todas";
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
    a.download = 'faq_section_export.zip';
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
    return '<div class="faq-item">' +
      '<button class="faq-button" onclick="toggleFAQClean(' + c.id + ')">' +
      helpIcon +
      '<div class="faq-content">' +
      '<p class="faq-question">' + c.pergunta + '</p>' +
      '<span class="faq-tag">' + c.categoria + '</span>' +
      '</div>' +
      '<span class="faq-chevron">' + chevronIconSVG + '</span>' +
      '</button>' +
      '<div class="faq-answer">' +
      '<div class="faq-answer-content">' +
      '<p class="faq-answer-text">' + c.resposta + '</p>' +
      '</div>' +
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
    '  <section id="faq" class="py-16">\n' +
    '    <div class="container">\n' +
    '      <div class="mb-10">\n' +
    '        <div class="flex items-center gap-2 mb-2">\n' +
    '          <div class="w-1 h-6 rounded-full" style="background-color: ' + s.tagCor + ';"></div>\n' +
    '          <span class="font-bold text-xs uppercase tracking-015em" style="color: ' + s.tagCor + ';">' + s.tag + '</span>\n' +
    '        </div>\n' +
    '        <h2 class="text-3xl font-bold text-slate-900 mb-4" style="font-family: \'Sora\', sans-serif;">' + s.titulo + '</h2>\n' +
    '        <p class="text-slate-600 max-w-2xl text-lg leading-relaxed">' + s.descricao + '</p>\n' +
    '      </div>\n' +
    '      <div class="search-container mb-6">\n' +
    '        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>\n' +
    '        <input type="text" id="search-input" placeholder="Buscar nas perguntas frequentes..." class="search-input">\n' +
    '      </div>\n' +
    '      <div class="flex flex-wrap gap-2 mb-6" id="category-filters">\n' +
    '        ' + CATEGORIAS.map(cat => '<button class="category-btn" onclick="setCategoriaClean(\'' + cat + '\')">' + cat + '</button>').join('') + '\n' +
    '        </div>\n' +
    '      <div class="faq-list" id="faq-list">\n' +
    '        ' + cardsHTML + '\n' +
    '      </div>\n' +
    '      <div class="cta-box mt-8">\n' +
    '        <p class="cta-text mb-3">Não encontrou a resposta que procurava? Entre em contato diretamente com o DPO.</p>\n' +
    '        <a href="#contato-dpo" class="cta-button">Enviar Pergunta ao DPO</a>\n' +
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
    '  background-color: #f0f4f8;\n' +
    '}\n\n' +
    '.py-16 { padding-top: 4rem; padding-bottom: 4rem; }\n' +
    '.container { width: 100%; max-width: 64rem; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }\n' +
    '.mb-2 { margin-bottom: 0.5rem; }\n' +
    '.mb-3 { margin-bottom: 0.75rem; }\n' +
    '.mb-4 { margin-bottom: 1rem; }\n' +
    '.mb-6 { margin-bottom: 1.5rem; }\n' +
    '.mb-10 { margin-bottom: 2.5rem; }\n' +
    '.mt-8 { margin-top: 2rem; }\n' +
    '.flex { display: flex; }\n' +
    '.flex-wrap { flex-wrap: wrap; }\n' +
    '.items-center { align-items: center; }\n' +
    '.gap-2 { gap: 0.5rem; }\n' +
    '.w-1 { width: 0.25rem; }\n' +
    '.h-6 { height: 1.5rem; }\n' +
    '.rounded-full { border-radius: 9999px; }\n' +
    '.rounded-xl { border-radius: 0.75rem; }\n' +
    '.font-bold { font-weight: 700; }\n' +
    '.font-medium { font-weight: 500; }\n' +
    '.text-xs { font-size: 0.75rem; line-height: 1rem; }\n' +
    '.text-sm { font-size: 0.875rem; line-height: 1.25rem; }\n' +
    '.text-lg { font-size: 1.125rem; line-height: 1.75rem; }\n' +
    '.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }\n' +
    '.text-center { text-align: center; }\n' +
    '.uppercase { text-transform: uppercase; }\n' +
    '.tracking-015em { letter-spacing: 0.15em; }\n' +
    '.text-slate-900 { color: #0f172a; }\n' +
    '.text-slate-700 { color: #334155; }\n' +
    '.text-slate-600 { color: #475569; }\n' +
    '.text-slate-500 { color: #64748b; }\n' +
    '.text-slate-400 { color: #94a3b8; }\n' +
    '.text-white { color: #ffffff; }\n' +
    '.max-w-2xl { max-width: 42rem; }\n' +
    '.leading-snug { line-height: 1.375; }\n' +
    '.leading-relaxed { line-height: 1.625; }\n' +
    '.search-container { position: relative; }\n' +
    '.search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }\n' +
    '.search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; background-color: #ffffff; font-size: 0.875rem; outline: none; transition: all 0.2s ease; }\n' +
    '.search-input:focus { border-color: #24469A; box-shadow: 0 0 0 2px rgba(36, 70, 154, 0.1); }\n' +
    '.category-btn { padding: 0.375rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 500; transition: all 0.2s ease; cursor: pointer; border: 1px solid #e2e8f0; background-color: #ffffff; color: #475569; }\n' +
    '.category-btn.active { background-color: #24469A; color: #ffffff; border-color: #24469A; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15); }\n' +
    '.faq-list { display: flex; flex-direction: column; gap: 0.75rem; }\n' +
    '.faq-item { background-color: #ffffff; border-radius: 0.75rem; border: 1px solid #e2e8f0; overflow: hidden; transition: all 0.2s ease; }\n' +
    '.faq-item:hover { border-color: #cbd5e1; }\n' +
    '.faq-button { width: 100%; display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; text-align: left; background: none; border: none; cursor: pointer; font-family: inherit; }\n' +
    '.faq-icon { color: #1C4BD1; margin-top: 0.125rem; flex-shrink: 0; }\n' +
    '.faq-content { flex: 1; min-width: 0; }\n' +
    '.faq-question { font-weight: 600; font-size: 0.875rem; color: #0f172a; line-height: 1.375; }\n' +
    '.faq-tag { display: inline-block; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 9999px; background-color: rgba(36, 70, 154, 0.08); color: #24469A; border: 1px solid rgba(36, 70, 154, 0.15); margin-top: 0.375rem; }\n' +
    '.faq-chevron { color: #94a3b8; flex-shrink: 0; transition: transform 0.2s ease; }\n' +
    '.faq-chevron.rotated { transform: rotate(180deg); }\n' +
    '.faq-answer { padding: 0 1rem 1rem 1rem; }\n' +
    '.faq-answer-content { margin-left: 1.75rem; padding-left: 1rem; border-left: 2px solid rgba(36, 70, 154, 0.3); }\n' +
    '.faq-answer-text { font-size: 0.875rem; color: #334155; line-height: 1.625; white-space: pre-line; }\n' +
    '.cta-box { border-radius: 1rem; padding: 1.5rem; text-align: center; background-color: rgba(36, 70, 154, 0.05); border: 1px solid rgba(36, 70, 154, 0.15); }\n' +
    '.cta-text { font-size: 0.875rem; color: #1e3a8a; }\n' +
    '.cta-button { display: inline-flex; align-items: center; gap: 0.5rem; color: #ffffff; font-weight: 600; padding: 0.625rem 1.25rem; border-radius: 0.75rem; font-size: 0.875rem; text-decoration: none; transition: all 0.2s ease; background-color: #24469A; }\n' +
    '.cta-button:active { transform: scale(0.98); }\n' +
    '.no-results { text-align: center; padding: 3rem 0; }\n' +
    '.no-results-text { color: #64748b; }\n' +
    '@media (min-width: 768px) { .text-3xl { font-size: 2.25rem; line-height: 2.5rem; } }';
}

function gerarJSLimpo() {
  const dataStr = JSON.stringify(dados);
  const catsStr = JSON.stringify(CATEGORIAS);
  return `const CATEGORIAS = ${catsStr};
const dados = ${dataStr};

let openId = null;
let searchTerm = "";
let activeCategoria = "Todas";

const helpIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>';

function getFilteredFAQ() {
  return dados.cards.filter(item => {
    const matchesSearch = searchTerm === "" || item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) || item.resposta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = activeCategoria === "Todas" || item.categoria === activeCategoria;
    return matchesSearch && matchesCategoria;
  });
}

function renderCategories() {
  const container = document.getElementById("category-filters");
  container.innerHTML = CATEGORIAS.map(cat => '<button class="category-btn ' + (activeCategoria === cat ? 'active' : '') + '" onclick="setCategoriaClean(\\'' + cat + '\\')">' + cat + '</button>').join("");
}

function renderFAQ() {
  const container = document.getElementById("faq-list");
  const filtered = getFilteredFAQ();
  if (filtered.length === 0) {
    container.innerHTML = '<div class="no-results"><p class="no-results-text">Nenhuma pergunta encontrada para os filtros selecionados.</p></div>';
    return;
  }
  container.innerHTML = filtered.map(item => '<div class="faq-item"><button class="faq-button" onclick="toggleFAQClean(' + item.id + ')">' + helpIcon + '<div class="faq-content"><p class="faq-question">' + item.pergunta + '</p><span class="faq-tag">' + item.categoria + '</span></div><span class="faq-chevron ' + (openId === item.id ? 'rotated' : '') + '"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg></span></button>' + (openId === item.id ? '<div class="faq-answer"><div class="faq-answer-content"><p class="faq-answer-text">' + item.resposta + '</p></div></div>' : '') + '</div>').join("");
}

function toggleFAQClean(id) { openId = openId === id ? null : id; renderFAQ(); }
function setCategoriaClean(cat) { activeCategoria = cat; openId = null; renderCategories(); renderFAQ(); }

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function(e) { searchTerm = e.target.value; openId = null; renderFAQ(); });
  renderCategories();
  renderFAQ();
});

renderFAQ();`;
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
    dados = JSON.parse(JSON.stringify({ secao: { tag: "Dúvidas Frequentes", tagCor: "#F6891F", titulo: "Perguntas Frequentes sobre LGPD", descricao: "Respostas para as dúvidas mais comuns da comunidade acadêmica sobre proteção de dados pessoais e a LGPD." }, cards: FAQ_DATA }));
  }
  atualizarSecao();
  renderCategories();
  renderFAQ();
}

function proximoId() {
  if (dados.cards.length === 0) return 1;
  return Math.max(...dados.cards.map(c => c.id)) + 1;
}

function atualizarSecao() {
  const s = dados.secao;
  document.getElementById('secao-tag').textContent = s.tag;
  document.getElementById('secao-tag').style.color = s.tagCor;
  document.getElementById('secao-barra').style.backgroundColor = s.tagCor;
  document.getElementById('secao-cor-input').value = s.tagCor;
  document.getElementById('secao-titulo').textContent = s.titulo;
  document.getElementById('secao-descricao').textContent = s.descricao;
}

function configurarEdicaoInline() {
  const tag = document.getElementById('secao-tag');
  const titulo = document.getElementById('secao-titulo');
  const desc = document.getElementById('secao-descricao');
  const container = tag.closest('.mb-10') || tag.parentElement.parentElement;

  tag.contentEditable = editando;
  titulo.contentEditable = editando;
  desc.contentEditable = editando;
  container.classList.toggle('editavel', editando);

  tag.onblur = () => { dados.secao.tag = tag.textContent.trim(); };
  titulo.onblur = () => { dados.secao.titulo = titulo.textContent.trim(); };
  desc.onblur = () => { dados.secao.descricao = desc.textContent.trim(); };

  if (editando) {
    document.getElementById('secao-cor-input').style.display = 'inline-block';
  } else {
    document.getElementById('secao-cor-input').style.display = 'none';
  }
}

function mudarCorSecao(cor) {
  dados.secao.tagCor = cor;
  atualizarSecao();
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
        <p class="no-results-text">Nenhuma pergunta encontrada para os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, i) => {
    const idx = dados.cards.indexOf(item);
    return `
      <div class="faq-wrap ${editando ? 'arrastavel' : ''}"
        draggable="${editando}"
        ondragstart="onDragStart(event, ${idx})"
        ondragover="onDragOver(event, ${idx})"
        ondrop="onDrop(event, ${idx})"
        ondragend="onDragEnd(event)"
        style="--card-color: transparent;"
      >
        <div class="faq-item">
          <button class="faq-button" onclick="toggleFAQ(${item.id})" ${editando ? 'onclick="event.stopPropagation()"' : ''}>
            ${helpIcon}
            <div class="faq-content">
              <p class="faq-question">${item.pergunta}</p>
              <span class="faq-tag">${item.categoria}</span>
            </div>
            <span class="faq-chevron ${openId === item.id ? 'rotated' : ''}">
              ${chevronIconSVG}
            </span>
          </button>
          ${openId === item.id ? `
            <div class="faq-answer">
              <div class="faq-answer-content">
                <p class="faq-answer-text">${item.resposta}</p>
              </div>
            </div>
          ` : ''}
          ${editando ? `
          <div class="card-icon-actions">
            <button class="icon-btn icon-editar" data-tooltip="Editar" onclick="event.stopPropagation(); abrirEditor(${idx})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="icon-btn icon-remover" data-tooltip="Remover" onclick="event.stopPropagation(); removerCard(${idx})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>` : ''}
        </div>
      </div>
    `;
  }).join("");
}

function getFilteredFAQ() {
  return dados.cards.filter(item => {
    const matchesSearch = searchTerm === "" ||
      item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resposta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = activeCategoria === "Todas" || item.categoria === activeCategoria;
    return matchesSearch && matchesCategoria;
  });
}

function toggleFAQ(id) {
  if (editando) return;
  openId = openId === id ? null : id;
  renderFAQ();
}

function setCategoria(cat) {
  activeCategoria = cat;
  openId = null;
  renderCategories();
  renderFAQ();
}

function onDragStart(event, index) {
  dragIndex = index;
  event.dataTransfer.effectAllowed = 'move';
  event.target.closest('.faq-wrap').classList.add('arrastando');
}

function onDragOver(event, index) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  const alvo = event.target.closest('.faq-wrap');
  if (!alvo || dragIndex === index) return;
  const wraps = [...document.querySelectorAll('.faq-wrap')];
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
  dragIndex = null;
  renderFAQ();
}

function onDragEnd(event) {
  dragIndex = null;
  document.querySelectorAll('.faq-wrap').forEach(w => {
    w.classList.remove('arrastando', 'drop-antes', 'drop-depois');
  });
}

function toggleModoEdicao() {
  editando = !editando;
  const btn = document.getElementById('btn-editar-toggle');
  btn.textContent = editando ? 'Sair do Modo Edição' : 'Modo Edição';
  btn.classList.toggle('ativo', editando);
  document.getElementById('toolbar-edicao').classList.toggle('visivel', editando);
  openId = null;
  configurarEdicaoInline();
  renderFAQ();
}

function adicionarCard() {
  const novoCard = {
    id: proximoId(),
    pergunta: "Nova Pergunta",
    resposta: "Resposta da nova pergunta.",
    categoria: CATEGORIAS[1] || "Geral"
  };
  dados.cards.push(novoCard);
  renderFAQ();
  abrirEditor(dados.cards.length - 1);
}

function removerCard(index) {
  if (!confirm(`Remover "${dados.cards[index].pergunta}"?`)) return;
  const removedId = dados.cards[index].id;
  dados.cards.splice(index, 1);
  if (openId === removedId) openId = null;
  renderFAQ();
}

function abrirEditor(index) {
  editandoCard = index;
  const card = dados.cards[index];
  const modal = document.getElementById('modal-editor');
  document.getElementById('edit-pergunta').value = card.pergunta;
  document.getElementById('edit-resposta').value = card.resposta;
  document.getElementById('nova-categoria-input').value = '';
  document.getElementById('nova-categoria-group').style.display = 'none';

  const selectCat = document.getElementById('edit-categoria');
  selectCat.innerHTML = '';
  CATEGORIAS.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === card.categoria) opt.selected = true;
    selectCat.appendChild(opt);
  });
  const novaOpt = document.createElement('option');
  novaOpt.value = '__nova_categoria__';
  novaOpt.textContent = '+ Nova categoria';
  selectCat.appendChild(novaOpt);

  modal.classList.add('visivel');
}

function fecharEditor() {
  document.getElementById('modal-editor').classList.remove('visivel');
  editandoCard = null;
}

function toggleNovaCategoriaInput() {
  const selectCat = document.getElementById('edit-categoria');
  const group = document.getElementById('nova-categoria-group');
  if (selectCat.value === '__nova_categoria__') {
    group.style.display = 'block';
    document.getElementById('nova-categoria-input').focus();
  } else {
    group.style.display = 'none';
  }
}

function salvarEdicao() {
  if (editandoCard === null) return;
  const card = dados.cards[editandoCard];
  card.pergunta = document.getElementById('edit-pergunta').value.trim() || card.pergunta;
  card.resposta = document.getElementById('edit-resposta').value.trim();
  const selectCat = document.getElementById('edit-categoria');
  if (selectCat.value === '__nova_categoria__') {
    const novaCat = document.getElementById('nova-categoria-input').value.trim();
    if (novaCat && !CATEGORIAS.includes(novaCat)) {
      CATEGORIAS.push(novaCat);
    }
    card.categoria = novaCat || card.categoria;
  } else {
    card.categoria = selectCat.value;
  }
  fecharEditor();
  renderCategories();
  renderFAQ();
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
      openId = null;
      searchTerm = "";
      activeCategoria = "Todas";
      editando = false;
      document.getElementById('btn-editar-toggle').textContent = 'Modo Edição';
      document.getElementById('btn-editar-toggle').classList.remove('ativo');
      document.getElementById('toolbar-edicao').classList.remove('visivel');
      document.getElementById('secao-cor-input').style.display = 'none';
      document.getElementById('search-input').value = '';
      atualizarSecao();
      renderCategories();
      renderFAQ();
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
  dados = JSON.parse(JSON.stringify({ secao: { tag: "Dúvidas Frequentes", tagCor: "#F6891F", titulo: "Perguntas Frequentes sobre LGPD", descricao: "Respostas para as dúvidas mais comuns da comunidade acadêmica sobre proteção de dados pessoais e a LGPD." }, cards: FAQ_DATA }));
  openId = null;
  searchTerm = "";
  activeCategoria = "Todas";
  editando = false;
  document.getElementById('btn-editar-toggle').textContent = 'Modo Edição';
  document.getElementById('btn-editar-toggle').classList.remove('ativo');
  document.getElementById('toolbar-edicao').classList.remove('visivel');
  document.getElementById('secao-cor-input').style.display = 'none';
  document.getElementById('search-input').value = '';
  atualizarSecao();
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
});

carregarDados();