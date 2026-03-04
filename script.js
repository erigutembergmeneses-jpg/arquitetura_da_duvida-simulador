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
                archive: "Arquivar sem aprofundar pode deixar uma criança em risco. A palavra da vítima, mesmo
