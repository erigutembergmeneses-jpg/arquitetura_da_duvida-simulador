// ========== SISTEMA DE CASOS ==========
const casos = [
    {
        id: 1,
        titulo: "Furto em loja de departamentos",
        descricao: "No dia 10/03, às 15h, Pedro Silva (27 anos) foi detido por seguranças ao sair de uma loja. O alarme disparou e ele portava uma jaqueta sem etiqueta. A jaqueta é similar a modelos vendidos na loja. Pedro afirma que comprou a jaqueta em outro local e apresentou um recibo de compra de 15/02 de uma loja concorrente. O segurança afirma que o reconhece de ocorrências anteriores.",
        evidencias: [
            "Jaqueta apreendida (modelo básico, sem etiqueta da loja)",
            "Recibo de compra de outra loja (15/02, no valor de R$ 189,90)",
            "Depoimento do segurança: 'Já vi esse rapaz fazendo isso antes'",
            "Imagens internas mostram Pedro experimentando jaquetas no setor masculino por 10 minutos",
            "Pedro não tem antecedentes criminais"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Sua decisão de investigar mais foi acertada. O recibo precisa ser verificado (se o modelo coincide) e o reconhecimento do segurança é frágil (viés de familiaridade).",
            incorreto: {
                indict: "Indiciar sem verificar o recibo é precipitado. A jaqueta pode ser a mesma do comprovante. Há risco de erro judicial.",
                archive: "Arquivar agora pode ser prematuro. É necessário ao menos verificar a autenticidade do recibo e confrontar com a jaqueta."
            }
        },
        vieses: ["Viés de familiaridade", "Viés de confirmação (segurança já esperava um furto)"],
        ferramentas: ["Análise documental da jaqueta vs recibo", "Blinding para reconhecimento de pessoas", "CEAP 2.0 - item 3: verificação de álibi documental"],
        redFlags: ["reconhecimento_sem_blinding", "comportamento_suspeito"]
    },
    {
        id: 2,
        titulo: "Homicídio no bar",
        descricao: "João Souza (34 anos) foi preso suspeito de matar Carlos Oliveira em uma briga de bar. Duas testemunhas disseram que 'foi o homem de camisa azul' e João usava camisa azul. João tem álibi: estava em casa com a esposa, que confirma. A faca encontrada não tem impressões digitais. João tem passagens por briga (2019).",
        evidencias: [
            "Faca apreendida (sem digitais, sangue tipo O, igual ao da vítima)",
            "Testemunha 1: 'vi um homem de camisa azul dando a facada'",
            "Testemunha 2: 'o agressor era moreno, camisa azul'",
            "Esposa de João afirma que ele chegou em casa 30min antes do horário da briga (18h)",
            "João tem antecedente por lesão corporal (2019)",
            "Câmera do bar mostra homem de camisa azul saindo às 18h15"
        ],
        decisaoCorreta: "archive",
        feedback: {
            correto: "Excelente! O álibi é forte e as testemunhas são vagas. A faca sem digitais e os antecedentes não são suficientes. Você evitou um tunnel vision.",
            incorreto: {
                indict: "Indiciar ignorando o álibi é um erro clássico de viés de confirmação. Os antecedentes reforçaram a suspeita, mas não há prova robusta.",
                investigate: "Investigar mais é prudente, mas o caso já tem elementos fortes para arquivamento. A menos que surja nova prova, o álibi desqualifica a suspeita."
            }
        },
        vieses: ["Viés de confirmação (antecedentes)", "Hindsight bias", "Viés de disponibilidade (camisa azul)"],
        ferramentas: ["CEAP 2.0 - checklist probatório", "Análise de consistência do álibi", "Protocolo de blinding para testemunhas"],
        redFlags: ["fixacao_24h", "alibi_ignorado", "reconhecimento_sem_blinding"]
    },
    {
        id: 3,
        titulo: "Tráfico de drogas",
        descricao: "Maria Santos (22 anos) foi abordada em abordagem policial de rotina. Com ela, foram encontradas 20g de maconha. Ela alega ser para uso próprio. A polícia alega que a quantidade e a forma de embalagem (10 porções de 2g) indicam tráfico. Maria é estudante universitária, sem antecedentes.",
        evidencias: [
            "20g de maconha divididas em 10 porções de 2g",
            "R$ 80,00 em dinheiro (notas de R$ 20,00)",
            "Maria afirma que comprou para o mês e divide com colegas",
            "Testemunhas da universidade confirmam que ela não tem histórico de vendas",
            "Local da abordagem: próximo à universidade"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Correto. A quantidade é pequena e há indícios de uso pessoal. Investigar mais (ouvir colegas, verificar padrão) é o caminho adequado.",
            incorreto: {
                indict: "Indiciar por tráfico com base apenas na embalagem é precipitado. A Lei 11.343/06 exige análise de contexto.",
                archive: "Arquivar sem investigar pode ignorar elementos que indicariam tráfico. Melhor aprofundar."
            }
        },
        vieses: ["Viés de categorização", "Viés de confirmação (polícia já esperava tráfico)"],
        ferramentas: ["Análise de contexto socioeconômico", "Protocolo de abordagem não-discriminatória"],
        redFlags: ["comportamento_suspeito"]
    },
    {
        id: 4,
        titulo: "Estupro de vulnerável",
        descricao: "Carlos (40 anos) é acusado de abusar da sobrinha de 8 anos. A criança disse à mãe que 'o tio colocou a mão lá'. Em entrevista gravada, o Conselho Tutelar fez perguntas sugestivas. Laudo médico constata 'hímen íntegro, sem lesões'. O acusado nega.",
        evidencias: [
            "Relato da criança: 'o tio colocou a mão lá' (sem detalhes espontâneos)",
            "Entrevista do Conselho Tutelar com perguntas como: 'Foi o tio que tocou em você?', 'Doeu quando ele tocou?'",
            "Laudo médico: hímen íntegro, sem lesões ou sinais de violência",
            "Negativa do acusado",
            "Mãe da criança tem histórico de conflito com o irmão (Carlos)"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Bem avaliado. Há indícios, mas a entrevista sugestiva contamina a prova. O laudo é negativo. Investigar com equipe especializada é essencial.",
            incorreto: {
                indict: "Indiciar com base em entrevista sugestiva e laudo negativo é arriscado. Pode levar a uma falsa acusação.",
                archive: "Arquivar sem aprofundar pode deixar uma criança em risco. A palavra da vítima, mesmo frágil, exige apuração cuidadosa."
            }
        },
        vieses: ["Viés de proteção à vítima", "Viés de confirmação (entrevista sugestiva)"],
        ferramentas: ["Protocolo de entrevista cognitiva", "Depoimento especial não-sugestivo", "CEAP 2.0 - análise de prova pericial"],
        redFlags: ["confissao_sem_gravacao", "fixacao_24h"]
    },
    {
        id: 5,
        titulo: "Lavagem de dinheiro",
        descricao: "Empresário José (45 anos) teve contas bloqueadas por movimentações atípicas: R$ 500 mil em depósitos fracionados. Ele alega que são pagamentos de clientes de sua loja de materiais de construção. Contabilidade mostra faturamento compatível. Não há outros indícios.",
        evidencias: [
            "Relatório do COAF: 50 depósitos de R$ 10 mil em 3 meses",
            "Declaração de IRPF compatível com o faturamento declarado",
            "Notas fiscais emitidas no período",
            "José não tem antecedentes",
            "Depoimento de contador: 'a movimentação é normal para o ramo'"
        ],
        decisaoCorreta: "archive",
        feedback: {
            correto: "Perfeito. A movimentação tem lastro fiscal. Não há indício de origem ilícita. Arquivar é a medida correta.",
            incorreto: {
                indict: "Indiciar sem prova da origem ilícita é ilegal. O fracionamento não é crime se justificado.",
                investigate: "Investigar mais pode ser aceitável, mas já há elementos suficientes para arquivar. O COAF não é prova de crime."
            }
        },
        vieses: ["Viés de ancoragem (valor alto)", "Viés de confirmação (suspeita prévia)"],
        ferramentas: ["Análise documental completa", "CEAP 2.0 - proporcionalidade"],
        redFlags: ["fixacao_24h"]
    }
];

// ========== ESTADO GLOBAL ==========
let currentCaseIndex = 0;
let score = {
    acertos: 0,
    totalRedFlags: 0,
    tempos: [],
    decisoes: [],
    redFlagsSelecionadas: []
};
let timerInterval = null;
let secondsLeft = 900; // 15 minutos
let decisionMade = false;
let selectedDecision = null;
let casosFinalizados = false;

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    inicializarNavegacao();
    inicializarBotoes();
    atualizarContadorCasos();
    carregarCaso(0);
    iniciarTimer();
});

// ========== NAVEGAÇÃO ==========
function inicializarNavegacao() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.dataset.section;
            
            // Remover active de todos
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            navBtns.forEach(b => b.classList.remove('active'));
            
            // Ativar target
            document.getElementById(targetId).classList.add('active');
            btn.classList.add('active');
            
            // Ações específicas por seção
            if (targetId === 'simulator') {
                resetarTimer();
                carregarCaso(currentCaseIndex);
            }
            if (targetId === 'results') {
                atualizarPainelResultados();
            }
        });
    });
}

function inicializarBotoes() {
    // Botão iniciar simulação
    document.getElementById('startSimBtn').addEventListener('click', () => {
        document.querySelector('[data-section="simulator"]').click();
    });
    
    // Botões de decisão
    document.getElementById('indictBtn').addEventListener('click', () => selecionarDecisao('indict'));
    document.getElementById('investigateBtn').addEventListener('click', () => selecionarDecisao('investigate'));
    document.getElementById('archiveBtn').addEventListener('click', () => selecionarDecisao('archive'));
    
    // Botões de navegação pós-feedback
    document.getElementById('nextCaseBtn').addEventListener('click', proximoCaso);
    document.getElementById('showResultsBtn').addEventListener('click', () => {
        document.querySelector('[data-section="results"]').click();
    });
    
    // Botões de resultados
    document.getElementById('certificateBtn').addEventListener('click', gerarCertificado);
    document.getElementById('restartBtn').addEventListener('click', reiniciarSimulacao);
    
    // Checkboxes de red flags
    document.querySelectorAll('#redFlagsChecklist input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', atualizarRedFlags);
    });
}

// ========== CARREGAMENTO DE CASOS ==========
function carregarCaso(index) {
    if (index >= casos.length) {
        finalizarSimulacao();
        return;
    }
    
    const caso = casos[index];
    if (!caso) return;
    
    // Atualizar interface
    document.getElementById('currentCase').textContent = index + 1;
    document.getElementById('totalCases').textContent = casos.length;
    document.getElementById('caseTitle').textContent = caso.titulo;
    document.getElementById('caseText').textContent = caso.descricao;
    
    // Carregar evidências
    const evidenceDiv = document.getElementById('evidenceList');
    evidenceDiv.innerHTML = '<h4>📦 Evidências:</h4>';
    caso.evidencias.forEach(ev => {
        evidenceDiv.innerHTML += `<div class="evidence-item">${ev}</div>`;
    });
    
    // Resetar checkboxes
    document.querySelectorAll('#redFlagsChecklist input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Resetar seleção de decisão
    selectedDecision = null;
    decisionMade = false;
    document.querySelectorAll('.decision-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Atualizar timer
    resetarTimer();
}

function atualizarContadorCasos() {
    document.getElementById('totalCases').textContent = casos.length;
}

// ========== TIMER ==========
function iniciarTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (!decisionMade && document.getElementById('simulator').classList.contains('active')) {
            secondsLeft--;
            atualizarTimerDisplay();
            
            // Alertas visuais
            const timerEl = document.querySelector('.timer');
            if (secondsLeft <= 60) {
                timerEl.classList.add('danger');
            } else if (secondsLeft <= 300) {
                timerEl.classList.add('warning');
            }
            
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                alert('⏰ Tempo esgotado! Vamos analisar sua decisão padrão.');
                fazerDecisao('investigate'); // decisão padrão: investigar mais
            }
        }
    }, 1000);
}

function resetarTimer() {
    if (timerInterval) clearInterval(timerInterval);
    secondsLeft = 900;
    atualizarTimerDisplay();
    
    // Resetar classes de alerta
    const timerEl = document.querySelector('.timer');
    timerEl.classList.remove('warning', 'danger');
    
    iniciarTimer();
}

function atualizarTimerDisplay() {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    document.getElementById('timer').textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ========== DECISÃO DO USUÁRIO ==========
function selecionarDecisao(decision) {
    if (decisionMade) return;
    
    // Destacar botão selecionado
    document.querySelectorAll('.decision-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById(`${decision}Btn`).classList.add('selected');
    
    selectedDecision = decision;
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
        fazerDecisao(decision);
    }, 300);
}

function fazerDecisao(decision) {
    if (decisionMade) return;
    
    decisionMade = true;
    clearInterval(timerInterval);
    
    const caso = casos[currentCaseIndex];
    const tempoGasto = 15 - Math.floor(secondsLeft / 60);
    
    // Registrar red flags selecionadas
    const checkboxes = document.querySelectorAll('#redFlagsChecklist input:checked');
    const selectedFlags = Array.from(checkboxes).map(cb => cb.value);
    const correctFlags = selectedFlags.filter(f => caso.redFlags.includes(f));
    
    // Atualizar score
    score.totalRedFlags += correctFlags.length;
    score.tempos.push(tempoGasto);
    score.redFlagsSelecionadas.push({
        caso: caso.id,
        flags: selectedFlags
    });
    
    // Verificar acerto
    const isCorrect = (decision === caso.decisaoCorreta);
    if (isCorrect) {
        score.acertos++;
    }
    
    score.decisoes.push({
        caso: caso.id,
        decisao: decision,
        correta: isCorrect,
        tempo: tempoGasto
    });
    
    // Gerar feedback
    gerarFeedback(caso, decision, isCorrect);
    
    // Mostrar seção de feedback
    document.getElementById('simulator').classList.remove('active');
    document.getElementById('feedback').classList.add('active');
    
    // Atualizar nav (feedback não tem botão próprio, então mantemos simulador ativo visualmente)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-section="simulator"]').classList.add('active');
}

function gerarFeedback(caso, decision, isCorrect) {
    // Título
    document.getElementById('feedbackTitle').textContent = isCorrect ? '✅ Decisão Correta!' : '❌ Decisão Incorreta';
    
    // Resultado da decisão
    let resultadoHTML = '';
    if (isCorrect) {
        resultadoHTML = `<div class="decision-result correct">
            <strong>Sua decisão: ${traduzirDecisao(decision)}</strong><br>
            ${caso.feedback.correto}
        </div>`;
    } else {
        resultadoHTML = `<div class="decision-result incorrect">
            <strong>Sua decisão: ${traduzirDecisao(decision)}</strong><br>
            ${caso.feedback.incorreto[decision] || 'Decisão inadequada para este caso.'}
        </div>`;
    }
    document.getElementById('decisionResult').innerHTML = resultadoHTML;
    
    // Análise de vieses
    document.getElementById('biasAnalysis').innerHTML = `
        <p><strong>Vieses identificados neste caso:</strong></p>
        <ul>
            ${caso.vieses.map(v => `<li>${v}</li>`).join('')}
        </ul>
    `;
    
    // Lições aprendidas
    document.getElementById('lessonsList').innerHTML = `
        <li>${caso.feedback.correto}</li>
        <li>Os vieses mais comuns neste tipo de caso: ${caso.vieses.join(', ')}.</li>
        <li>Sempre questione: "Que evidências eu estou ignorando?"</li>
    `;
    
    // Ferramentas recomendadas
    document.getElementById('toolsList').innerHTML = caso.ferramentas.map(f => `<li>${f}</li>`).join('');
}

function traduzirDecisao(decision) {
    const mapa = {
        'indict': 'Indiciar o suspeito',
        'investigate': 'Requisitar diligências',
        'archive': 'Arquivar o caso'
    };
    return mapa[decision] || decision;
}

// ========== RED FLAGS ==========
function atualizarRedFlags() {
    // Função para tracking em tempo real se necessário
    const selected = Array.from(document.querySelectorAll('#redFlagsChecklist input:checked'))
        .map(cb => cb.value);
    console.log('Red flags selecionadas:', selected);
}

// ========== PRÓXIMO CASO ==========
function proximoCaso() {
    currentCaseIndex++;
    
    if (currentCaseIndex < casos.length) {
        carregarCaso(currentCaseIndex);
        document.getElementById('feedback').classList.remove('active');
        document.getElementById('simulator').classList.add('active');
    } else {
        finalizarSimulacao();
    }
}

function finalizarSimulacao() {
    casosFinalizados = true;
    alert('🎉 Parabéns! Você completou todos os casos.');
    
    document.getElementById('feedback').classList.remove('active');
    document.getElementById('results').classList.add('active');
    
    // Atualizar nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-section="results"]').classList.add('active');
    
    atualizarPainelResultados();
}

// ========== RESULTADOS ==========
function atualizarPainelResultados() {
    // Pontuação total (100 pontos por acerto + 10 por red flag)
    const pontuacaoTotal = (score.acertos * 100) + (score.totalRedFlags * 10);
    document.getElementById('totalScore').textContent = pontuacaoTotal;
    
    // Decisões corretas
    document.getElementById('correctDecisions').textContent = `${score.acertos}/${casos.length}`;
    
    // Red flags identificadas
    document.getElementById('redFlagsIdentified').textContent = score.totalRedFlags;
    
    // Tempo médio
    const tempoMedio = score.tempos.length > 0 
        ? (score.tempos.reduce((a, b) => a + b, 0) / score.tempos.length).toFixed(1)
        : 0;
    document.getElementById('averageTime').textContent = tempoMedio;
    
    // Perfil cognitivo
    const perfil = gerarPerfilCognitivo();
    document.getElementById('cognitiveProfile').innerHTML = perfil;
    
    // Recomendações
    const recomendacoes = gerarRecomendacoes();
    document.getElementById('recommendationsList').innerHTML = recomendacoes;
}

function gerarPerfilCognitivo() {
    const percentualAcertos = (score.acertos / casos.length) * 100;
    
    if (percentualAcertos >= 80) {
        return `
            <p>🔬 <strong>Investigador Avançado</strong></p>
            <p>Você demonstra excelente capacidade de identificar vieses e tomar decisões fundamentadas. Seu perfil é analítico e cauteloso.</p>
            <div class="progress-bar"><div class="progress-fill" style="width: ${percentualAcertos}%"></div></div>
        `;
    } else if (percentualAcertos >= 60) {
        return `
            <p>📊 <strong>Investigador em Desenvolvimento</strong></p>
            <p>Você já identifica alguns vieses, mas ainda pode melhorar. Foque em questionar evidências frágeis e buscar provas corroborativas.</p>
            <div class="progress-bar"><div class="progress-fill" style="width: ${percentualAcertos}%"></div></div>
        `;
    } else {
        return `
            <p>📚 <strong>Investigador Iniciante</strong></p>
            <p>Você está no começo da jornada. Continue praticando e estudando os protocolos CEAP 2.0. A prevenção de erros judiciais é um aprendizado contínuo.</p>
            <div class="progress-bar"><div class="progress-fill" style="width: ${percentualAcertos}%"></div></div>
        `;
    }
}

function gerarRecomendacoes() {
    const recomendacoes = [];
    
    if (score.totalRedFlags < 3) {
        recomendacoes.push('📋 <strong>Checklist CEAP 2.0:</strong> Pratique a identificação de red flags em cada caso.');
    }
    if (score.acertos < 3) {
        recomendacoes.push('🔍 <strong>Estudo de casos:</strong> Analise casos reais de erro judicial (Innocence Project).');
    }
    
    recomendacoes.push('📖 <strong>Leitura recomendada:</strong> "Arquiteturas da Dúvida" - Erigutemberg Meneses');
    recomendacoes.push('🎯 <strong>Próximo passo:</strong> Refazer a simulação aplicando os protocolos de blinding.');
    
    return recomendacoes.map(r => `<li>${r}</li>`).join('');
}

// ========== CERTIFICADO ==========
function gerarCertificado() {
    const nome = prompt('Digite seu nome para o certificado:');
    if (!nome) return;
    
    const data = new Date().toLocaleDateString('pt-BR');
    const pontuacao = (score.acertos * 100) + (score.totalRedFlags * 10);
    
    const certificado = `
        ========================================
                CERTIFICADO DE PARTICIPAÇÃO
        ========================================
        
        Certificamos que ${nome} participou do simulador
        "Você é o Delegado" e completou ${casos.length} casos,
        obtendo pontuação total de ${pontuacao} pontos.
        
        Data: ${data}
        
        "Arquiteturas da Dúvida" - Erigutemberg Meneses
        ========================================
    `;
    
    alert('📄 Certificado gerado! (Simulação acadêmica)');
    console.log(certificado);
    
    // Criar download
    const blob = new Blob([certificado], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado_${nome.replace(/\s+/g, '_')}.txt`;
    a.click();
}

// ========== REINICIAR ==========
function reiniciarSimulacao() {
    if (confirm('Tem certeza? Todo seu progresso será perdido.')) {
        currentCaseIndex = 0;
        score = {
            acertos: 0,
            totalRedFlags: 0,
            tempos: [],
            decisoes: [],
            redFlagsSelecionadas: []
        };
        
        carregarCaso(0);
        document.querySelector('[data-section="intro"]').click();
    }
}

// ========== UTILITÁRIOS ==========
function formatarTempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ========== EXPOSIÇÃO GLOBAL (para chamadas HTML) ==========
window.makeDecision = function(decision) {
    selecionarDecisao(decision);
};

window.startSimulation = function() {
    document.querySelector('[data-section="simulator"]').click();
};

window.nextCase = function() {
    proximoCaso();
};

window.showResults = function() {
    document.querySelector('[data-section="results"]').click();
};

window.generateCertificate = function() {
    gerarCertificado();
};

window.restartSimulation = function() {
    reiniciarSimulacao();
};
