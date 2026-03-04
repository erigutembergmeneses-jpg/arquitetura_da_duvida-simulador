// ========== BANCO DE CASOS COMPLETO ==========
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
        redFlags: ["reconhecimento_sem_blinding", "comportamento_suspeito"],
        dificuldade: "Iniciante"
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
        redFlags: ["fixacao_24h", "alibi_ignorado", "reconhecimento_sem_blinding"],
        dificuldade: "Intermediário"
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
        redFlags: ["comportamento_suspeito"],
        dificuldade: "Iniciante"
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
        redFlags: ["confissao_sem_gravacao", "fixacao_24h"],
        dificuldade: "Avançado"
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
        redFlags: ["fixacao_24h"],
        dificuldade: "Intermediário"
    },
    {
        id: 6,
        titulo: "Roubo a transeunte",
        descricao: "Um jovem de 19 anos foi reconhecido em foto por uma vítima de roubo. O reconhecimento foi feito por WhatsApp, com apenas uma foto do suspeito. O jovem alega que estava trabalhando no horário do crime (entregador de aplicativo, com registros de corridas).",
        evidencias: [
            "Reconhecimento fotográfico por WhatsApp (única foto enviada)",
            "Registros de corridas do aplicativo no horário do crime",
            "Vítima: 'tenho quase certeza que era ele'",
            "Nada foi apreendido com o suspeito",
            "Suspeito não tem antecedentes"
        ],
        decisaoCorreta: "archive",
        feedback: {
            correto: "Excelente! O reconhecimento por foto única é altamente sugestivo e considerado nulo pela jurisprudência (HC 598.886/STJ). O álibi é robusto.",
            incorreto: {
                indict: "Indiciar com base em reconhecimento fotográfico sugestivo e ignorando o álibi é um erro grave que já condenou inocentes no passado.",
                investigate: "Investigar mais é aceitável, mas o reconhecimento já está contaminado. Melhor arquivar e evitar erro."
            }
        },
        vieses: ["Viés de confirmação (reconhecimento sugestivo)", "Viés de memória"],
        ferramentas: ["Protocolo de blinding para reconhecimento", "Análise de álibi digital"],
        redFlags: ["reconhecimento_sem_blinding", "alibi_ignorado"],
        dificuldade: "Iniciante"
    },
    {
        id: 7,
        titulo: "Homicídio com confissão",
        descricao: "Um homem de 42 anos confessou ter matado a esposa após 12 horas de interrogatório sem advogado. Não há outras provas. O corpo foi encontrado com sinais de violência. O suspeito tem QI limítrofe e baixa escolaridade.",
        evidencias: [
            "Confissão após 12h de interrogatório (sem advogado presente)",
            "Laudo cadavérico: morte por asfixia",
            "Nenhuma prova material ligando o suspeito ao crime",
            "Suspeito tem QI 68 (laudo psicológico)",
            "Vizinhos ouviram discussão no dia anterior"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Correto. A confissão sem garantias (advogado, gravação) é frágil, especialmente com vulnerabilidade. É preciso buscar provas materiais.",
            incorreto: {
                indict: "Indiciar apenas com confissão extrajudicial sem outras provas é muito arriscado. Falsas confissões são comuns em interrogatórios prolongados.",
                archive: "Arquivar sem investigar pode ser prematuro. Há indícios (discussão) que merecem apuração."
            }
        },
        vieses: ["Viés de confissão", "Viés de autoridade"],
        ferramentas: ["Gravação integral de interrogatório", "Protocolo de prevenção de falsas confissões"],
        redFlags: ["confissao_sem_gravacao", "fixacao_24h"],
        dificuldade: "Avançado"
    },
    {
        id: 8,
        titulo: "Furto de celular",
        descricao: "Um celular furtado foi encontrado na casa de um adolescente de 16 anos. Ele alega que comprou de um desconhecido na rua por R$ 300. O celular vale R$ 2.500. O adolescente não tem antecedentes e trabalha como ajudante de pedreiro.",
        evidencias: [
            "Celular furtado apreendido na residência do adolescente",
            "Adolescente alega compra de terceiro (desconhecido)",
            "Adolescente tem renda familiar de 1 salário mínimo",
            "Proprietário do celular registrou BO"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Bem avaliado. É possível que seja receptação culposa ou até inocente. Investigar a origem e as circunstâncias é necessário.",
            incorreto: {
                indict: "Indiciar por furto sem prova da participação na subtração é erro. No máximo receptação, mas depende da prova de má-fé.",
                archive: "Arquivar sem investigar a compra pode deixar de apurar uma rede de receptação."
            }
        },
        vieses: ["Viés de confirmação (posse = culpa)"],
        ferramentas: ["Análise socioeconômica", "Investigação de cadeia de posse"],
        redFlags: ["fixacao_24h"],
        dificuldade: "Iniciante"
    },
    {
        id: 9,
        titulo: "Corrupção passiva",
        descricao: "Um servidor público é acusado de receber propina com base em delação premiada de um empresário. O delator não apresenta provas, apenas relato. O servidor tem vida modesta e patrimônio compatível com o salário.",
        evidencias: [
            "Delação premiada sem provas corroborativas",
            "Quebra de sigilo bancário sem movimentações atípicas",
            "Declaração de IR compatível",
            "Testemunhas de defesa atestam conduta ilibada"
        ],
        decisaoCorreta: "archive",
        feedback: {
            correto: "Perfeito. Delação sem provas é insuficiente. A jurisprudência exige elementos de corroboração (art. 4°, Lei 12.850/13).",
            incorreto: {
                indict: "Indiciar apenas com delação é ilegal. A palavra do delator precisa ser corroborada.",
                investigate: "Investigar mais pode ser aceitável, mas já há fortes indícios de inocência. Melhor arquivar."
            }
        },
        vieses: ["Viés de autoridade (delação)", "Viés de confirmação"],
        ferramentas: ["Análise de corroboração", "CEAP 2.0 - prova testemunhal"],
        redFlags: ["fixacao_24h"],
        dificuldade: "Avançado"
    },
    {
        id: 10,
        titulo: "Lesão corporal em contexto de violência doméstica",
        descricao: "Maria registra BO contra o marido, João, por agressão. Ela apresenta fotos de hematomas no braço. João alega que foi queda. Não há testemunhas. João tem BO anterior por ameaça (arquivado). Maria já registrou outras ocorrências similares e depois retirou a queixa.",
        evidencias: [
            "Fotos de hematomas no braço de Maria",
            "Boletim de ocorrência anterior por ameaça (arquivado)",
            "Maria já retirou 2 queixas anteriores",
            "João alega que foi acidental",
            "Filho do casal (10 anos) diz que 'não viu nada'"
        ],
        decisaoCorreta: "investigate",
        feedback: {
            correto: "Correto. É necessário aprofundar: ouvir o filho em depoimento especial, verificar contradições, buscar provas periciais.",
            incorreto: {
                indict: "Indiciar com base apenas em fotos e BOs anteriores, sem prova robusta, pode ser precipitado. Histórico de retratações exige cautela.",
                archive: "Arquivar sem investigar pode colocar a vítima em risco. A palavra da vítima em violência doméstica tem peso, mas precisa de consistência."
            }
        },
        vieses: ["Viés de confirmação (reincidência)", "Viés de gênero"],
        ferramentas: ["Depoimento especial", "Análise de ciclo de violência", "Medidas protetivas cautelares"],
        redFlags: ["comportamento_suspeito", "fixacao_24h"],
        dificuldade: "Intermediário"
    }
];

// Exportar para uso no script principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = casos;
}
