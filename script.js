// Estado global do simulador
let currentState = {
    currentCaseIndex: 0,
    decisions: [],
    redFlagsIdentified: [],
    startTime: null,
    caseStartTime: null,
    timer: null,
    timeRemaining: 900 // 15 minutos em segundos
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadCase(0);
});

// Navegação entre seções
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetSection = e.target.dataset.section;
            showSection(targetSection);
            
            // Atualizar botões ativos
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção alvo
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Atualizar navegação
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
}

// Iniciar simulação
function startSimulation() {
    currentState.currentCaseIndex = 0;
    currentState.decisions = [];
    currentState.redFlagsIdentified = [];
    currentState.startTime = new Date();
    
    showSection('simulator');
    document.querySelector('[data-section="simulator"]').classList.add('active');
    document.querySelector('[data-section="intro"]').classList.remove('active');
    
    loadCase(0);
}

// Carregar caso
function loadCase(index) {
    if (index >= cases.length) {
        showResults();
        return;
    }
    
    const caseData = cases[index];
    currentState.currentCaseIndex = index;
    currentState.caseStartTime = new Date();
    currentState.timeRemaining = 900; // Reset timer
    
    // Atualizar UI
    document.getElementById('currentCase').textContent = index + 1;
    document.getElementById('totalCases').textContent = cases.length;
    document.getElementById('caseTitle').textContent = caseData.title;
    document.getElementById('caseText').textContent = caseData.scenario;
    
    // Carregar evidências
    const evidenceList = document.getElementById('evidenceList');
    evidenceList.innerHTML = '<h4>Evidências Disponíveis:</h4>';
    caseData.evidence.forEach(ev => {
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.textContent = ev;
        evidenceList.appendChild(div);
    });
    
    // Resetar checkboxes de red flags
    document.querySelectorAll('.checkbox-item input').forEach(cb => {
        cb.checked = false;
    });
    
    // Iniciar timer
    startTimer();
    
    // Scroll para topo
    window.scrollTo(0, 0);
}

// Timer
function startTimer() {
    if (currentState.timer) {
        clearInterval(currentState.timer);
    }
    
    const timerElement = document.getElementById('timer');
    
    currentState.timer = setInterval(() => {
        currentState.timeRemaining--;
        
        const minutes = Math.floor(currentState.timeRemaining / 60);
        const seconds = currentState.timeRemaining % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentState.timeRemaining <= 0) {
            clearInterval(currentState.timer);
            makeDecision('timeout');
        }
    }, 1000);
}

// Tomar decisão
function makeDecision(decision) {
    clearInterval(currentState.timer);
    
    const caseData = cases[currentState.currentCaseIndex];
    const caseTime = Math.floor((new Date() - currentState.caseStartTime) / 1000);
    
    // Coletar red flags identificados
    const identifiedFlags = [];
    document.querySelectorAll('.checkbox-item input:checked').forEach(cb => {
        identifiedFlags.push(cb.value);
    });
    
    // Salvar decisão
    const decisionData = {
        caseId: caseData.id,
        decision: decision,
        correct: decision === caseData.correctDecision,
        redFlagsIdentified: identifiedFlags,
        correctRedFlags: caseData.redFlags,
        timeSpent: caseTime,
        timestamp: new Date()
    };
    
    currentState.decisions.push(decisionData);
    
    // Calcular red flags corretos
    const correctFlags = identifiedFlags.filter(flag => caseData.redFlags.includes(flag));
    currentState.redFlagsIdentified.push(...correctFlags);
    
    // Mostrar feedback
    showFeedback(decisionData, caseData);
}

// Mostrar feedback
function showFeedback(decisionData, caseData) {
    showSection('feedback');
    
    const header = document.getElementById('feedbackHeader');
    const title = document.getElementById('feedbackTitle');
    
    // Definir classe baseada na decisão
    header.className = 'feedback-header';
    if (decisionData.correct) {
        header.classList.add('success');
        title.textContent = '✓ Decisão Correta!';
    } else if (decisionData.decision === 'indict') {
        header.classList.add('error');
        title.textContent = '✗ Decisão Problemática';
    } else {
        header.classList.add('warning');
        title.textContent = '⚠ Decisão Parcialmente Correta';
    }
    
    // Resultado da decisão
    const resultDiv = document.getElementById('decisionResult');
    let feedbackText = '';
    
    if (decisionData.decision === caseData.correctDecision) {
        feedbackText = caseData.feedback.correct;
    } else if (decisionData.decision === 'indict') {
        feedbackText = caseData.feedback.incorrect_indict;
    } else if (decisionData.decision === 'archive') {
        feedbackText = caseData.feedback.incorrect_archive;
    } else {
        feedbackText = 'Tempo esgotado. Em investigações reais, a pressão temporal pode levar a decisões precipitadas.';
    }
    
    resultDiv.innerHTML = `
        <h3>Sua Decisão: ${getDecisionText(decisionData.decision)}</h3>
        <p>${feedbackText}</p>
        <p><strong>Caso Real:</strong> ${caseData.realCase}</p>
    `;
    
    // Análise de vieses
    const biasDiv = document.getElementById('biasAnalysis');
    biasDiv.innerHTML = caseData.biases.map(bias => `
        <div class="evidence-item" style="border-left-color: ${getSeverityColor(bias.severity)}">
            <strong>${bias.name}</strong> (${getSeverityText(bias.severity)})
            <p>${bias.description}</p>
        </div>
    `).join('');
    
    // Lições aprendidas
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = caseData.lessons.map(lesson => `<li>${lesson}</li>`).join('');
    
    // Ferramentas recomendadas
    const toolsList = document.getElementById('toolsList');
    toolsList.innerHTML = caseData.tools.map(tool => `<li>${tool}</li>`).join('');
    
    // Scroll para topo
    window.scrollTo(0, 0);
}

function getDecisionText(decision) {
    const texts = {
        'indict': 'Indiciar o Suspeito',
        'investigate': 'Requisitar Diligências',
        'archive': 'Arquivar o Caso',
        'timeout': 'Tempo Esgotado'
    };
    return texts[decision] || decision;
}

function getSeverityColor(severity) {
    const colors = {
        'low': '#10b981',
        'medium': '#f59e0b',
        'high': '#ef4444',
        'critical': '#dc2626'
    };
    return colors[severity] || colors.medium;
}

function getSeverityText(severity) {
    const texts = {
        'low': 'Baixa',
        'medium': 'Média',
        'high': 'Alta',
        'critical': 'Crítica'
    };
    return texts[severity] || severity;
}

// Próximo caso
function nextCase() {
    loadCase(currentState.currentCaseIndex + 1);
    showSection('simulator');
    document.querySelector('[data-section="simulator"]').classList.add('active');
    document.querySelector('[data-section="feedback"]').classList.remove('active');
}

// Mostrar resultados
function showResults() {
    showSection('results');
    document.querySelector('[data-section="results"]').classList.add('active');
    document.querySelector('[data-section="simulator"]').classList.remove('active');
    
    // Calcular estatísticas
    const totalCases = currentState.decisions.length;
    const correctDecisions = currentState.decisions.filter(d => d.correct).length;
    const totalRedFlags = currentState.redFlagsIdentified.length;
    const totalTime = currentState.decisions.reduce((acc, d) => acc + d.timeSpent, 0);
    const avgTime = Math.floor(totalTime / totalCases / 60); // em minutos
    
    // Atualizar UI
    document.getElementById('totalScore').textContent = calculateScore();
    document.getElementById('correctDecisions').textContent = `${correctDecisions}/${totalCases}`;
    document.getElementById('redFlagsIdentified').textContent = totalRedFlags;
    document.getElementById('averageTime').textContent = avgTime;
    
    // Perfil cognitivo
    generateCognitiveProfile();
    
    // Recomendações
    generateRecommendations();
    
    window.scrollTo(0, 0);
}

function calculateScore() {
    const decisions = currentState.decisions;
    if (decisions.length === 0) return 0;
    
    const correctCount = decisions.filter(d => d.correct).length;
    const baseScore = (correctCount / decisions.length) * 100;
    
    // Bônus por red flags identificados
    const totalPossibleFlags = decisions.reduce((acc, d) => acc + (d.correctRedFlags ? d.correctRedFlags.length : 0), 0);
    const flagsScore = totalPossibleFlags > 0 ? (currentState.redFlagsIdentified.length / totalPossibleFlags) * 50 : 0;
    
    return Math.round(baseScore + flagsScore);
}

function generateCognitiveProfile() {
    const decisions = currentState.decisions;
    const profileDiv = document.getElementById('cognitiveProfile');
    
    // Analisar padrões
    const tunnelVisionErrors = decisions.filter(d => 
        !d.correct && d.decision === 'indict'
    ).length;
    
    const redFlagsMissed = decisions.reduce((acc, d) => {
        const missed = d.correctRedFlags.filter(flag => !d.redFlagsIdentified.includes(flag));
        return acc + missed.length;
    }, 0);
    
    const avgTimePerCase = decisions.reduce((acc, d) => acc + d.timeSpent, 0) / decisions.length / 60;
    
    profileDiv.innerHTML = `
        <div class="evidence-item">
            <strong>Tendência a Tunnel Vision:</strong> ${tunnelVisionErrors} casos com indiciamento prematuro
            <p>Você demonstrou ${tunnelVisionErrors > 2 ? 'alta' : tunnelVisionErrors > 0 ? 'moderada' : 'baixa'} 
            tendência a fixação prematura em suspeitos sem investigação adequada de alternativas.</p>
        </div>
        
        <div class="evidence-item">
            <strong>Detecção de Red Flags:</strong> ${redFlagsMissed} red flags não identificados
            <p>Você identificou ${currentState.redFlagsIdentified.length} dos ${currentState.redFlagsIdentified.length + redFlagsMissed} 
            red flags presentes nos casos.</p>
        </div>
        
        <div class="evidence-item">
            <strong>Tempo de Análise:</strong> ${Math.round(avgTimePerCase)} minutos/caso
            <p>Tempo ${avgTimePerCase < 5 ? 'muito rápido (risco de decisão precipitada)' : 
                       avgTimePerCase > 10 ? 'adequado para análise cuidadosa' : 'razoável'}.</p>
        </div>
    `;
}

function generateRecommendations() {
    const recommendationsDiv = document.getElementById('recommendationsList');
    const recommendations = [];
    
    // Analisar necessidades de treinamento
    const incorrectIndictments = currentState.decisions.filter(d => 
        !d.correct && d.decision === 'indict'
    ).length;
    
    if (incorrectIndictments > 2) {
        recommendations.push({
            title: "Curso: Prevenção de Tunnel Vision",
            description: "Foco em técnicas de investigação de hipóteses alternativas e descarte documentado de linhas investigativas.",
            priority: "high"
        });
    }
    
    const missedBlinding = currentState.decisions.filter(d => 
        d.correctRedFlags && d.correctRedFlags.includes('reconhecimento_sem_blinding') &&
        !d.redFlagsIdentified.includes('reconhecimento_sem_blinding')
    ).length;
    
    if (missedBlinding > 0) {
        recommendations.push({
            title: "Treinamento: Protocolo de Blinding em Reconhecimentos",
            description: "Estudo da Res. CNJ 484/2022 e aplicação prática de reconhecimentos duplo-cegos.",
            priority: "high"
        });
    }
    
    const avgTime = currentState.decisions.reduce((acc, d) => acc + d.timeSpent, 0) / currentState.decisions.length;
    if (avgTime < 300) { // menos de 5 minutos
        recommendations.push({
            title: "Reflexão: Pressão Temporal e Qualidade Decisória",
            description: "Análise de como a pressão por celeridade ativa o Sistema 1 (intuitivo) em detrimento do Sistema 2 (analítico).",
            priority: "medium"
        });
    }
    
    if (recommendations.length === 0) {
        recommendations.push({
            title: "Manutenção de Boas Práticas",
            description: "Continue aplicando o ceticismo saudável e os protocolos de prevenção de erro judicial.",
            priority: "low"
        });
    }
    
    recommendationsDiv.innerHTML = recommendations.map(rec => `
        <li style="border-left-color: ${rec.priority === 'high' ? 'var(--danger-color)' : rec.priority === 'medium' ? 'var(--warning-color)' : 'var(--success-color)'}">
            <strong>${rec.title}</strong><br>
            <small>${rec.description}</small>
        </li>
    `).join('');
}

// Gerar certificado
function generateCertificate() {
    const score = calculateScore();
    const date = new Date().toLocaleDateString('pt-BR');
    
    const certificate = `
CERTIFICADO DE PARTICIPAÇÃO

Simulador "Você é o Delegado"

Certificamos que o participante completou o treinamento em detecção de vieses 
cognitivos e prevenção de erro judicial, obtendo pontuação de ${score}/150 pontos.

Data: ${date}

Este certificado atesta a participação em atividade educacional baseada na obra 
"Arquiteturas da Dúvida" de Erigutemberg Meneses.

_________________________________
Erigutemberg Meneses
Autor e Pesquisador
    `;
    
    // Criar blob e download
    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-voce-e-o-delegado-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Certificado gerado com sucesso! Verifique seus downloads.');
}

// Reiniciar simulação
function restartSimulation() {
    if (confirm('Deseja realmente reiniciar a simulação? Todo o progresso será perdido.')) {
        startSimulation();
    }
}

// Utilitários
function downloadResults() {
    const results = {
        timestamp: new Date().toISOString(),
        decisions: currentState.decisions,
        score: calculateScore(),
        totalRedFlags: currentState.redFlagsIdentified.length
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultados-simulador-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Exportar funções globais
window.startSimulation = startSimulation;
window.makeDecision = makeDecision;
window.nextCase = nextCase;
window.showResults = showResults;
window.generateCertificate = generateCertificate;
window.restartSimulation = restartSimulation;
window.downloadResults = downloadResults;
