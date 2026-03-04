// Banco de dados de casos para o simulador
const cases = [
    {
        id: 1,
        title: "Roubo com Reconhecimento Visual",
        scenario: `Às 22h30 de uma terça-feira, um comércio foi assaltado na Zona Norte. 
        A vítima, um homem de 45 anos, foi abordada por dois indivíduos encapuzados que 
        subtraíram R$ 2.500 em espécie e um celular.

        Às 23h15, policiais abordaram um jovem negro de 22 anos, morador de rua, a 300m 
        do local. Ele estava com um boné vermelho (cor mencionada pela vítima) e R$ 85 
        em espécie. Ao ser abordado, demonstrou nervosismo, gaguejou e evitou contato visual.

        Às 00h30, a vítima foi levada à delegacia e, ao ver o suspeito algemado na sala 
        de espera, afirmou imediatamente: "É ele mesmo!".

        O suspeito nega a autoria e afirma que estava comprando pão em uma padaria próxima. 
        Não há gravação do interrogatório (apenas os primeiros 5 minutos foram gravados). 
        Não foram ouvidas testemunhas que poderiam confirmar o álibi.`,
        
        evidence: [
            "Reconhecimento visual sem blinding duplo-cego",
            "Suspeito encontrado com boné vermelho (cor mencionada)",
            "Comportamento nervoso durante abordagem",
            "Álibi alegado (padaria) não investigado",
            "Interrogatório não integralmente gravado",
            "Ausência de provas materiais (arma, dinheiro marcado)"
        ],
        
        correctDecision: "investigate",
        
        redFlags: [
            "fixacao_24h",
            "reconhecimento_sem_blinding",
            "confissao_sem_gravacao",
            "alibi_ignorado",
            "comportamento_suspeito"
        ],
        
        feedback: {
            correct: `Excelente decisão! Você identificou corretamente que o caso carece de 
            elementos robustos para indiciamento. O reconhecimento visual sem blinding é 
            uma das principais causas de erro judicial (72% das exonerações por DNA envolvem 
            identificação visual equivocada - Garrett, 2022).`,
            
            incorrect_indict: `Decisão problemática. Você caiu na armadilha do tunnel vision. 
            O reconhecimento visual sem blinding duplo-cego tem taxa de erro 3,2× superior 
            aos realizados com protocolo adequado (Clark et al., 2019). O "comportamento 
            nervoso" é reação normal de qualquer pessoa, especialmente em situação de 
            abordagem policial (Elaad, 2022: F(1,78)= 10,5).`,
            
            incorrect_archive: `Decisão prematura. Embora haja fragilidades probatórias, 
            o caso merece investigação complementar antes do arquivamento. Diligências como 
            análise de câmeras de segurança, oitiva de testemunhas do álibi e reconhecimento 
            com blinding poderiam esclarecer os fatos.`
        },
        
        biases: [
            {
                name: "Tunnel Vision",
                description: "Fixação prematura no suspeito em menos de 24h sem descarte documentado de hipóteses alternativas",
                severity: "high"
            },
            {
                name: "Confirmation Bias",
                description: "Reinterpretação do comportamento nervoso como indicador de culpa, ignorando que é reação normal ao estresse",
                severity: "high"
            },
            {
                name: "Ilusão de Competência",
                description: "Confiança excessiva na capacidade de detectar mentiras pelo comportamento (F(1,78)= 10,5 - Elaad, 2022)",
                severity: "medium"
            }
        ],
        
        lessons: [
            "Reconhecimento visual sem blinding é fonte recorrente de erro judicial",
            "Comportamento nervoso não é prova de culpa - é reação humana normal ao estresse",
            "Álibis devem ser investigados antes do indiciamento, não descartados como 'fraude'",
            "Interrogatórios devem ser integralmente gravados para evitar contaminação"
        ],
        
        tools: [
            "CEAP 2.0 - Checklist Estruturado de Análise Probatória",
            "Protocolo de Blinding Duplo-Cego em Reconhecimentos (Res. CNJ 484/2022)",
            "Gravação integral de interrogatórios",
            "Revisão independente por promotor não envolvido na fase inquisitorial"
        ],
        
        realCase: "Baseado em padrões documentados em operações policiais noturnas no Complexo do Alemão (RJ, 2025)"
    },
    
    {
        id: 2,
        title: "Tráfico em Operação Policial",
        scenario: `Operação policial noturna na favela do Morro Azul resultou na prisão de 
        8 jovens negros, todos entre 18-25 anos, acusados de tráfico de drogas.

        O suspeito em análise foi encontrado com 2g de maconha em um envelope. Ele afirma 
        ser usuário e que a substância era para consumo pessoal. Não há elementos que 
        vinculem ele a organização criminosa.

        O delegado justificou a prisão por "tráfico" alegando: (1) quantidade incompatível 
        com uso pessoal; (2) localização em área conhecida por tráfico; (3) "comportamento 
        suspeito" ao correr ao ver a viatura.

        O suspeito tem antecedentes por porte de drogas (usuário) mas nunca por tráfico. 
        Não foram realizadas perícias para diferenciar posse para consumo de tráfico.`,
        
        evidence: [
            "2g de maconha apreendidos",
            "Prisão em operação policial em massa",
            "Suspeito correu ao ver viatura",
            "Localização em área estigmatizada",
            "Antecedentes por porte (usuário)",
            "Ausência de elementos de tráfico (balança, anotações, grande quantidade)"
        ],
        
        correctDecision: "investigate",
        
        redFlags: [
            "fixacao_24h",
            "comportamento_suspeito"
        ],
        
        feedback: {
            correct: `Correto! Você identificou a necessidade de perícia técnica para diferenciar 
            posse para consumo de tráfico. A corrida pode ser reação normal de jovens negros 
            ao medo de abordagem policial violenta, não indício de culpa.`,
            
            incorrect_indict: `Você reproduziu o viés de seletividade penal. Correr ao ver 
            viatura é reação compreensível de jovens negros em favelas, onde abordagens 
            policiais frequentemente envolvem violência. Sem elementos objetivos de tráfico 
            (balança, anotações, grande quantidade), a presunção deve ser de posse para consumo.`,
            
            incorrect_archive: `Decisão prematura. Embora haja fragilidades, o caso merece 
            investigação adequada, incluindo perícia para quantificação e análise do contexto 
            da abordagem.`
        },
        
        biases: [
            {
                name: "Viés Racial Implícito",
                description: "Criminalização baseada em 'perfil compatível' (jovem negro em favela)",
                severity: "high"
            },
            {
                name: "Viés de Confirmação",
                description: "Interpretação da corrida como 'comportamento suspeito' ignorando contexto de medo de violência policial",
                severity: "high"
            }
        ],
        
        lessons: [
            "Reação de fuga em abordagens policiais em favelas é compreensível, não prova de culpa",
            "Posse de pequena quantidade de drogas deve ser presumida como uso pessoal sem prova em contrário",
            "Operações em massa geram tunnel vision institucionalizado",
            "Seletividade penal racial amplifica vieses cognitivos"
        ],
        
        tools: [
            "CEAP 2.0 - Item sobre vulnerabilidade e viés racial",
            "Perícia técnica para diferenciação consumo/tráfico",
            "Protocolo de abordagem policial não discriminatória",
            "Análise contextual do 'comportamento suspeito'"
        ],
        
        realCase: "Padrão documentado em operações policiais noturnas em favelas brasileiras (Infopen 2024)"
    },
    
    // Mais 8 casos seguiriam o mesmo padrão...
    // Por questão de espaço, incluirei apenas mais 2 casos completos
    
    {
        id: 3,
        title: "Homicídio com Álibi Documentado",
        scenario: `Homicídio doloso ocorrido às 22h em via pública. Três testemunhas afirmaram 
        ter visto "um rapaz negro, magro, com boné vermelho" atirar e fugir.

        Às 3h da manhã, Francisco M. foi preso. Ele é negro, magro, e foi encontrado com 
        boné vermelho a 300m do local. Durante interrogatório, gaguejou e evitou contato visual.

        A defesa apresentou registro de ponto eletrônico da empresa onde trabalha como 
        faxineiro, comprovando que estava trabalhando das 21h45 às 22h30 no horário do crime.

        O delegado descartou o álibi afirmando: "Sistema de ponto é fácil de fraudar". 
        Não foi realizada perícia técnica para verificar autenticidade do registro.

        Não há arma do crime, não há vestígios balísticos, e nenhuma testemunha identificou 
        o suspeito com certeza antes da prisão.`,
        
        evidence: [
            "Reconhecimento visual sem blinding",
            "Álibi documentado por ponto eletrônico",
            "Interrogatório não integralmente gravado",
            "Ausência de prova material (arma, vestígios)",
            "Álibi descartado como 'possível fraude' sem perícia",
            "Fixação em suspeito em menos de 12h"
        ],
        
        correctDecision: "investigate",
        
        redFlags: [
            "fixacao_24h",
            "reconhecimento_sem_blinding",
            "alibi_ignorado",
            "confissao_sem_gravacao"
        ],
        
        feedback: {
            correct: `Decisão correta! Você evitou reproduzir o erro do caso real de Francisco 
            Mairlon (DF), que passou 15 anos preso injustamente por álibi documentado 
            reinterpretado como "fraude" sem prova técnica.`,
            
            incorrect_indict: `GRAVE ERRO! Você reproduziu exatamente o padrão cognitivo que 
            condenou Francisco Mairlon por 15 anos. Documento oficial (ponto eletrônico) não 
            pode ser descartado como "possível fraude" sem perícia técnica que comprove 
            adulteração. Isso é reinterpretação hierárquica de exculpatória (d= 0,48-0,61 - Elaad, 2022).`,
            
            incorrect_archive: `Decisão prematura. O caso merece investigação complementar, 
            incluindo perícia no sistema de ponto e análise de câmeras de segurança da empresa.`
        },
        
        biases: [
            {
                name: "Reinterpretação Hierárquica",
                description: "Álibi documentado reinterpretado como 'fraude' sem prova técnica (efeito d= 0,48-0,61)",
                severity: "critical"
            },
            {
                name: "Tunnel Vision Institucionalizado",
                description: "Fixação em suspeito em <12h sem descarte documentado de alternativas",
                severity: "high"
            }
        ],
        
        lessons: [
            "Documento oficial autêntico vale até prova em contrário - ônus da refutação é da acusação",
            "Alegação de 'fraude' sem perícia técnica é confirmation bias puro",
            "Caso Mairlon: 15 anos de prisão por álibi documentado ignorado",
            "Presunção de inocência exige investigação de álibis, não descarte automático"
        ],
        
        tools: [
            "Perícia técnica em sistemas de ponto eletrônico",
            "CEAP 2.0 - Item 2.2 (reinterpretação de exculpatórias)",
            "Revisão independente obrigatória",
            "Protocolo de investigação de álibis documentados"
        ],
        
        realCase: "CASO REAL: Francisco Mairlon (DF) - 15 anos de prisão injusta, absolvido em 2024"
    },
    
    {
        id: 4,
        title: "Estupro com DNA Excludente",
        scenario: `Estupro de vulnerável denunciado pela vítima. Ela identificou o suspeito 
        em reconhecimento na delegacia (sem blinding), afirmando ter "certeza absoluta".

        Laudo de DNA coletado na cena do crime excluiu o suspeito como autor com 99,9998% 
        de certeza (probabilidade de erro: 1 em 5 milhões).

        O Ministério Público manteve a acusação argumentando: (1) "DNA pode ter sido 
        contaminado na coleta"; (2) "Vítima não mentiria"; (3) "Comportamento inadequado 
        do acusado durante interrogatório".

        Não há qualquer elemento concreto de contaminação da amostra. O laudo foi realizado 
        por instituto oficial e reanalisado 3 vezes com mesmo resultado.

        O suspeito está preso preventivamente há 3 anos aguardando julgamento.`,
        
        evidence: [
            "DNA excludente com 99,9998% de certeza",
            "Reconhecimento visual sem blinding",
            "DNA reinterpretado como 'possível contaminação'",
            "Ausência de prova de contaminação",
            "Vítima expressou 'certeza absoluta'",
            "3 anos de prisão preventiva"
        ],
        
        correctDecision: "archive",
        
        redFlags: [
            "dna_reinterpretado",
            "reconhecimento_sem_blinding"
        ],
        
        feedback: {
            correct: `Decisão correta e corajosa! Você evitou reproduzir o caso Israel de 
            Oliveira Pacheco (RS), onde DNA excludente foi ignorado por 10 anos. Prova 
            técnica irrefutável não pode ser descartada por "possível contaminação" sem 
            prova concreta.`,
            
            incorrect_indict: `ERRO GRAVÍSSIMO! Você reproduziu o caso Israel Pacheco. 
            DNA excludente com 99,9998% de certeza é prova robusta de inocência. Alegar 
            "possível contaminação" sem prova concreta é reinterpretação hierárquica 
            (confirmation bias). A "certeza" da vítima não supera prova científica 
            (Elaad, 2022: F(1,78)= 10,5 - ilusão de competência na detecção de mentiras).`,
            
            incorrect_archive: `Decisão parcialmente correta, mas o arquivamento deve ser 
            fundamentado na prova técnica irrefutável (DNA), não apenas na fragilidade do 
            reconhecimento visual.`
        },
        
        biases: [
            {
                name: "Confirmation Bias Extremo",
                description: "Resistência à prova técnica irrefutável (DNA) mantendo crença inicial",
                severity: "critical"
            },
            {
                name: "Belief Perseverance",
                description: "Persistência irracional na crença de culpa mesmo diante de evidências contrárias robustas",
                severity: "critical"
            },
            {
                name: "Noble Cause Corruption",
                description: "Convicção ética de 'proteger a vítima' justificando subordinação da prova técnica",
                severity: "high"
            }
        ],
        
        lessons: [
            "DNA excludente é prova robusta de inocência - não pode ser ignorado",
            "'Possível contaminação' sem prova é especulação, não argumento jurídico",
            "Certeza subjetiva da vítima não supera prova científica objetiva",
            "Caso Israel Pacheco: 10 anos preso apesar de DNA excludente"
        ],
        
        tools: [
            "Protocolo de revisão obrigatória para casos com DNA excludente",
            "CEAP 2.0 - Item sobre reinterpretação de provas técnicas",
            "UERC - Unidade Especializada de Revisão de Condenações",
            "Blinding pericial progressivo"
        ],
        
        realCase: "CASO REAL: Israel de Oliveira Pacheco (RS) - 10 anos preso, absolvido pelo STF em 2018"
    }
];

// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Exportar casos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cases, shuffleArray };
}
