"use strict";

(function initSantosIbamBank() {
  const bank = window.QUESTION_BANK = window.QUESTION_BANK || [];

  const officialLinks = {
    edital73: "https://www.ibamsp-concursos.org.br/informacoes/178/",
    edital71: "https://www.ibamsp-concursos.org.br/informacoes/176/",
    lai: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm",
    lgpd: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    usuario: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm",
    pcd: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
    prioritario: "https://www.planalto.gov.br/ccivil_03/leis/l10048.htm",
    governoDigital: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm",
    compras: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm",
    eca: "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
  };

  const distributionBase = [
    { disciplina: "Língua Portuguesa", bloco: "Português", count: 10 },
    { disciplina: "Matemática", bloco: "Matemática", count: 6 },
    { disciplina: "Legislação Municipal e Serviço Público", bloco: "Legislação e Serviço Público", count: 8 },
    { disciplina: "Informática e Rotinas", bloco: "Informática e Rotinas", count: 6 },
    { disciplina: "Conhecimentos Específicos", bloco: "Conhecimentos Específicos", count: 10 },
  ];

  const roles = [
    {
      id: "santos-agente-portaria",
      cargo: "Agente de Portaria",
      short: "Agente de Portaria",
      edital: "73/2026",
      editalCompleto: "Edital nº 73/2026 — SEPLA-RH",
      officialUrl: officialLinks.edital73,
      codigo: "601",
      escolaridade: "Ensino Fundamental completo",
      vagas: "10 vagas totais",
      remuneracao: "R$ 2.191,01 + R$ 1.100,00 de auxílio alimentação = R$ 3.291,01",
      cargaHoraria: "40 horas semanais",
      inscricao: "22/07/2026 a 20/08/2026",
      boleto: "21/08/2026",
      convocacao: "02/10/2026",
      prova: "11/10/2026",
      taxa: "R$ 54,30",
      tipoProva: "Objetiva de múltipla escolha, 40 questões, 4 alternativas, duração de 3h30",
      durationMinutes: 210,
      hasEssay: false,
      weights: { "Língua Portuguesa": 1, "Matemática": 1, "Legislação Municipal e Serviço Público": 2, "Informática e Rotinas": 3, "Conhecimentos Específicos": 5 },
      summary: "Cargo de contato direto com o munícipe, controle de acesso, recepção, comunicação de ocorrências e zelo pelo patrimônio público.",
      critical: ["Conhecimentos Específicos têm maior peso.", "Informática/Rotinas e Legislação podem decidir a nota.", "Situações de atendimento, sigilo e controle de acesso aparecem com pegadinhas práticas."],
      priorities: ["atendimento em portarias", "identificação e encaminhamento", "controle de entrada e saída", "correspondências", "pedidos de manutenção", "cobrança e prestação simples de contas", "patrimônio público", "sigilo e proteção de dados"],
    },
    {
      id: "santos-inspetor-alunos",
      cargo: "Inspetor de Alunos",
      short: "Inspetor de Alunos",
      edital: "73/2026",
      editalCompleto: "Edital nº 73/2026 — SEPLA-RH",
      officialUrl: officialLinks.edital73,
      codigo: "606",
      escolaridade: "Ensino Fundamental completo",
      vagas: "22 vagas totais",
      remuneracao: "R$ 2.981,16 + R$ 1.100,00 de auxílio alimentação = R$ 4.081,16",
      cargaHoraria: "40 horas semanais",
      inscricao: "22/07/2026 a 20/08/2026",
      boleto: "21/08/2026",
      convocacao: "02/10/2026",
      prova: "11/10/2026",
      taxa: "R$ 54,30",
      tipoProva: "Objetiva de múltipla escolha, 40 questões, 4 alternativas, duração de 3h30",
      durationMinutes: 210,
      hasEssay: false,
      weights: { "Língua Portuguesa": 1, "Matemática": 1, "Legislação Municipal e Serviço Público": 4, "Informática e Rotinas": 2, "Conhecimentos Específicos": 4 },
      summary: "Cargo voltado à rotina escolar: circulação de alunos, disciplina, prevenção de riscos, atendimento a famílias e apoio à equipe gestora.",
      critical: ["Legislação/Atendimento Escolar tem peso alto.", "Específicos cobram postura preventiva e limites de atuação.", "ECA, bullying, acessibilidade e segurança devem ser revisados em cenário prático."],
      priorities: ["rotina escolar", "ordem e disciplina", "controle de alunos", "segurança escolar", "ECA", "bullying", "acessibilidade", "atendimento a famílias", "primeiros cuidados"],
    },
    {
      id: "santos-oficial-administracao",
      cargo: "Oficial de Administração",
      short: "Oficial de Administração",
      edital: "71/2026",
      editalCompleto: "Edital nº 71/2026 — SEPLA-RH",
      officialUrl: officialLinks.edital71,
      codigo: "1101",
      escolaridade: "Ensino Médio completo",
      vagas: "50 vagas totais",
      remuneracao: "R$ 3.782,98 + R$ 1.100,00 de auxílio alimentação = R$ 4.882,98",
      cargaHoraria: "40 horas semanais",
      inscricao: "22/07/2026 a 20/08/2026",
      boleto: "21/08/2026",
      convocacao: "18/09/2026",
      prova: "27/09/2026",
      taxa: "R$ 67,90",
      tipoProva: "1ª fase objetiva e 2ª fase redação; 40 questões, 4 alternativas, duração total de 4h",
      durationMinutes: 240,
      hasEssay: true,
      weights: { "Língua Portuguesa": 2, "Matemática": 2, "Legislação Municipal e Serviço Público": 2, "Informática e Rotinas": 2, "Conhecimentos Específicos": 4 },
      summary: "Cargo de rotina técnico-administrativa: processos, documentos, protocolo, arquivo, atendimento, sistemas, compras, contratos e redação oficial.",
      critical: ["A objetiva exige pelo menos 50% dos pontos.", "Redação só é corrigida para habilitados na objetiva.", "Específicos e Português merecem prioridade, sem abandonar legislação e rotinas."],
      priorities: ["protocolo", "gestão documental", "arquivologia", "redação oficial", "atendimento", "processos administrativos", "Lei 14.133/2021", "contratos", "materiais", "sigilo e LGPD"],
    },
  ];

  window.SANTOS_IBAM_CONFIG = {
    sourceLabel: "Prefeitura de Santos — IBAM",
    officialLinks,
    roles: roles.map((role) => ({
      ...role,
      distribution: distributionBase.map((item) => ({
        ...item,
        peso: role.weights[item.disciplina],
      })),
    })),
  };

  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const letterOptions = (correct, distractors) => [correct, ...distractors].slice(0, 4);
  const difficultyCycle = ["facil", "medio", "medio", "dificil"];

  const commonTopics = {
    "Língua Portuguesa": [
      ["Interpretação de textos", "identificar a finalidade principal antes de escolher a alternativa"],
      ["Informações implícitas", "inferir apenas o que o texto autoriza, sem extrapolar"],
      ["Coesão textual", "reconhecer o referente de pronomes e expressões retomadas"],
      ["Pontuação", "usar vírgula para organizar termos e evitar ambiguidade"],
      ["Concordância", "manter verbo e nome concordando com o núcleo correto"],
      ["Reescrita", "preservar sentido, clareza e correção gramatical"],
      ["Linguagem formal", "evitar gírias e manter cordialidade no atendimento público"],
      ["Sinônimos e antônimos", "avaliar o sentido no contexto, não apenas no dicionário"],
    ],
    "Matemática": [
      ["Porcentagem", "calcular acréscimos, descontos e participações sobre o total correto"],
      ["Regra de três", "relacionar grandezas proporcionais de forma direta ou inversa"],
      ["Sistema monetário", "conferir valores, troco e arredondamentos com cuidado"],
      ["Média aritmética", "somar os valores e dividir pela quantidade de registros"],
      ["Tabelas e gráficos", "ler título, escala, legenda e unidade antes de concluir"],
      ["Medidas", "converter unidades mantendo a grandeza indicada no enunciado"],
      ["Sequências", "identificar o padrão antes de continuar a série"],
      ["Frações e decimais", "comparar partes do todo usando denominador ou forma decimal"],
    ],
    "Legislação Municipal e Serviço Público": [
      ["Princípios administrativos", "legalidade, impessoalidade, moralidade, publicidade e eficiência orientam a atuação pública"],
      ["Lei 13.460/2017", "o usuário tem direito a atendimento adequado, informações claras e manifestação sobre serviços"],
      ["Atendimento prioritário", "pessoas legalmente prioritárias devem receber tratamento adequado e organizado"],
      ["Acessibilidade", "barreiras devem ser reduzidas para garantir participação e atendimento digno"],
      ["LAI", "transparência é regra, mas há proteção para dados pessoais e informações sigilosas"],
      ["LGPD", "dados pessoais devem ser tratados com finalidade, necessidade, segurança e respeito ao titular"],
      ["Governo Digital", "serviços digitais devem buscar eficiência sem excluir quem precisa de orientação"],
      ["Estatuto municipal", "hierarquia, disciplina, zelo e sigilo funcional fazem parte da conduta do servidor"],
    ],
    "Informática e Rotinas": [
      ["Arquivos e pastas", "nomear e organizar documentos para permitir localização posterior"],
      ["Editor de textos", "usar formatação simples, revisão e estrutura adequada ao documento"],
      ["Planilhas", "usar fórmulas básicas como soma, média, mínimo, máximo e porcentagem"],
      ["E-mail", "conferir destinatário, assunto, anexos e linguagem antes de enviar"],
      ["Segurança da informação", "desconfiar de links suspeitos, anexos inesperados e pedidos de senha"],
      ["Backup", "manter cópias para reduzir perda de documentos e registros"],
      ["Digitalização", "verificar legibilidade e identificação do documento digitalizado"],
      ["Proteção de dados", "evitar exposição desnecessária de informações pessoais em sistemas e planilhas"],
    ],
  };

  const specificTopics = {
    "santos-agente-portaria": [
      ["Atendimento em portaria", "receber o munícipe com cordialidade, identificar a demanda e encaminhar ao setor correto"],
      ["Controle de acesso", "registrar entrada e saída, orientar circulação e preservar a segurança da unidade"],
      ["Correspondências", "receber, separar, registrar e distribuir documentos sem violar sigilo"],
      ["Pedidos de manutenção", "comunicar falhas observadas e registrar dados mínimos para acompanhamento"],
      ["Cobrança de entradas", "conferir valores, emitir orientação adequada e prestar contas simples"],
      ["Patrimônio público", "zelar por bens, comunicar danos e evitar uso indevido"],
      ["Conflitos e reclamações", "escutar, manter postura calma e acionar o responsável quando necessário"],
      ["Acessibilidade e prioridade", "organizar atendimento respeitando prioridade legal e autonomia da pessoa"],
      ["Recados e registros", "transmitir informações com clareza, data, horário e destinatário"],
      ["Sigilo funcional", "não comentar dados pessoais ou internos com pessoas não autorizadas"],
    ],
    "santos-inspetor-alunos": [
      ["Rotina escolar", "acompanhar alunos em pátios, corredores, portões e áreas comuns"],
      ["Disciplina", "intervir inicialmente com orientação respeitosa e comunicar a equipe gestora"],
      ["Controle de entrada e saída", "observar horários, autorizações e circulação de pessoas na escola"],
      ["Segurança escolar", "prevenir tumultos, correria e brincadeiras perigosas"],
      ["Bullying e violência", "acolher, registrar e comunicar sinais de risco sem expor a vítima"],
      ["ECA", "priorizar proteção integral e comunicação adequada de situações de vulnerabilidade"],
      ["Acessibilidade escolar", "apoiar circulação e inclusão sem discriminação"],
      ["Atendimento a famílias", "orientar com cordialidade e direcionar demandas à equipe responsável"],
      ["Primeiros cuidados", "acionar ajuda e comunicar emergência, sem extrapolar atribuições técnicas"],
      ["Patrimônio escolar", "zelar por mobiliário, chaves, portões, materiais e espaços comuns"],
    ],
    "santos-oficial-administracao": [
      ["Protocolo", "receber, registrar, classificar e encaminhar processos com rastreabilidade"],
      ["Gestão documental", "controlar guarda, temporalidade, localização e destinação de documentos"],
      ["Arquivologia", "distinguir arquivos correntes, intermediários e permanentes"],
      ["Redação oficial", "produzir comunicação clara, impessoal, objetiva e formal"],
      ["Atendimento administrativo", "registrar demandas e fornecer informação correta sem violar sigilo"],
      ["Controle de prazos", "acompanhar vencimentos, pendências e tramitação de processos"],
      ["Sistemas e cadastros", "atualizar dados com conferência, padronização e responsabilidade"],
      ["Lei 14.133/2021", "apoiar rotinas de compras e contratos com formalização e controle"],
      ["Materiais e almoxarifado", "registrar entradas, saídas, saldos e necessidades de reposição"],
      ["Atos administrativos simples", "preparar despachos, certidões, declarações e relatórios básicos"],
    ],
  };

  function addQuestion(role, sequence, disciplina, bloco, assunto, keyPoint, peso, indexOffset) {
    const prefix = role.id === "santos-agente-portaria" ? "IBAM-AGP" : role.id === "santos-inspetor-alunos" ? "IBAM-INSP" : "IBAM-OFI";
    const dificuldade = difficultyCycle[(sequence + indexOffset) % difficultyCycle.length];
    const contextual = disciplina === "Conhecimentos Específicos"
      ? `Na rotina da Prefeitura de Santos, um servidor do cargo ${role.cargo} precisa lidar com ${assunto.toLowerCase()}.`
      : `Em uma prova do IBAM para a Prefeitura de Santos, o item aborda ${assunto.toLowerCase()} aplicado ao serviço público.`;
    bank.push({
      id: `${prefix}-${String(sequence).padStart(3, "0")}`,
      area: "concursos-santos-ibam",
      concurso: "Prefeitura de Santos",
      concurso_id: "santos-ibam",
      banca: "IBAM",
      edital: role.edital,
      cargo: role.cargo,
      cargo_id: role.id,
      cargos_compativeis: [role.id],
      bloco,
      disciplina,
      assunto,
      tipo: "multipleChoice",
      dificuldade,
      peso,
      enunciado: `${contextual} A conduta mais adequada é`,
      alternativas: letterOptions(
        `priorizar ${keyPoint}.`,
        [
          "ignorar o procedimento formal quando houver pressa no atendimento.",
          "resolver a situação sem registro, mesmo quando houver impacto administrativo.",
          "divulgar informações internas para acelerar a solução informalmente.",
        ],
      ),
      gabarito: 0,
      comentario: `A alternativa correta aplica o edital ao exigir ${keyPoint}. No estilo IBAM, a pegadinha costuma trocar procedimento, sigilo e cordialidade por improviso.`,
      fonte: `Questão autoral baseada no ${role.editalCompleto} e na página oficial do IBAM/PREFEITURA DE SANTOS.`,
      link: role.officialUrl,
      tags: ["ibam", "santos", normalize(role.cargo), normalize(disciplina), normalize(assunto)],
    });
  }

  function generateRoleQuestions(role, totals) {
    let sequence = 1;
    const disciplines = [
      ["Língua Portuguesa", "Português", totals.portugues],
      ["Matemática", "Matemática", totals.matematica],
      ["Legislação Municipal e Serviço Público", "Legislação e Serviço Público", totals.legislacao],
      ["Informática e Rotinas", "Informática e Rotinas", totals.informatica],
      ["Conhecimentos Específicos", "Conhecimentos Específicos", totals.especificos],
    ];
    for (const [disciplina, bloco, total] of disciplines) {
      const topics = disciplina === "Conhecimentos Específicos" ? specificTopics[role.id] : commonTopics[disciplina];
      for (let index = 0; index < total; index += 1) {
        const [assunto, keyPoint] = topics[index % topics.length];
        addQuestion(role, sequence, disciplina, bloco, assunto, keyPoint, role.weights[disciplina], index);
        sequence += 1;
      }
    }
  }

  for (const role of roles) {
    if (role.id === "santos-oficial-administracao") {
      generateRoleQuestions(role, { portugues: 14, matematica: 10, legislacao: 14, informatica: 12, especificos: 50 });
    } else {
      generateRoleQuestions(role, { portugues: 12, matematica: 8, legislacao: 12, informatica: 10, especificos: 38 });
    }
  }

  const writingThemes = [
    ["Resposta a solicitação de munícipe", "responder a um pedido de informação sobre documentos faltantes"],
    ["Memorando interno", "comunicar atraso de tramitação e indicar providência objetiva"],
    ["Despacho simples", "encaminhar processo ao setor competente com justificativa breve"],
    ["E-mail institucional", "orientar usuário sobre prazo e canal correto de atendimento"],
    ["Relatório administrativo breve", "registrar demanda recorrente e sugerir medida de organização"],
    ["Comunicado ao setor", "padronizar envio de documentos e proteção de dados pessoais"],
    ["Controle de prazo", "alertar sobre vencimento de pendência em processo administrativo"],
    ["Orientação documental", "listar documentos necessários de forma clara e impessoal"],
    ["Registro de ocorrência administrativa", "descrever fato, local, data e providência sem juízo pessoal"],
    ["Solicitação de providência", "pedir manutenção ou correção de cadastro com dados mínimos"],
  ];

  writingThemes.forEach(([assunto, task], index) => {
    bank.push({
      id: `IBAM-OFI-RED-${String(index + 1).padStart(3, "0")}`,
      area: "concursos-santos-ibam",
      concurso: "Prefeitura de Santos",
      concurso_id: "santos-ibam",
      banca: "IBAM",
      edital: "71/2026",
      cargo: "Oficial de Administração",
      cargo_id: "santos-oficial-administracao",
      cargos_compativeis: ["santos-oficial-administracao"],
      bloco: "Redação administrativa",
      disciplina: "Redação administrativa",
      assunto,
      tipo: "administrativeWriting",
      dificuldade: index % 3 === 0 ? "facil" : index % 3 === 1 ? "medio" : "dificil",
      peso: 10,
      enunciado: `Redija um texto técnico-administrativo para ${task}. Use linguagem clara, objetiva, impessoal e formal, preservando sigilo e dados pessoais.`,
      resposta_esperada: `Modelo esperado: identificação objetiva da demanda; informação principal logo no início; providência ou encaminhamento; prazo/canal de acompanhamento quando cabível; fechamento cordial e impessoal. Evite exposição de dados pessoais e opiniões.`,
      comentario: "Critérios: atendimento ao tema, clareza, objetividade, impessoalidade, formalidade, estrutura, correção gramatical, adequação administrativa, sigilo e proteção de dados.",
      fonte: "Proposta autoral baseada no Edital nº 71/2026 — SEPLA-RH para Oficial de Administração.",
      link: officialLinks.edital71,
      tags: ["ibam", "santos", "oficial-administracao", "redacao-administrativa", normalize(assunto)],
    });
  });
})();
