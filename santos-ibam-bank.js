"use strict";

(function initSantosIbamBank() {
  const bank = window.QUESTION_BANK = window.QUESTION_BANK || [];

  const officialLinks = {
    edital73: "https://www.ibamsp-concursos.org.br/informacoes/178/",
    edital71: "https://www.ibamsp-concursos.org.br/informacoes/176/",
    constituicao: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
    lai: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm",
    lgpd: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    usuario: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm",
    pcd: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
    prioritario: "https://www.planalto.gov.br/ccivil_03/leis/l10048.htm",
    governoDigital: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm",
    compras: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm",
    eca: "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
    leiOrganicaSantos: "https://www.egov.santos.sp.gov.br/legis/documents/9596/download",
    estatutoSantos: "https://egov.santos.sp.gov.br/legis/documents/55/view",
    estruturaSantos: "https://www.egov.santos.sp.gov.br/legis/documents/10609/view",
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
  const difficultyCycle = ["facil", "medio", "medio", "dificil"];

  const subjectDifficulty = new Map([
    ["Interpretação de texto", "medio"],
    ["Finalidade textual", "facil"],
    ["Coesão referencial", "medio"],
    ["Pontuação", "medio"],
    ["Concordância verbal", "medio"],
    ["Crase", "dificil"],
    ["Reescrita e sentido", "medio"],
    ["Conjunções", "facil"],
    ["Colocação pronominal", "dificil"],
    ["Ambiguidade", "dificil"],
    ["Ortografia e acentuação", "facil"],
    ["Ordenação de ideias", "facil"],
    ["Inferência", "medio"],
    ["Adequação da linguagem", "facil"],
    ["Porcentagem", "medio"],
    ["Sistema monetário", "facil"],
    ["Proporcionalidade", "dificil"],
    ["Média aritmética", "facil"],
    ["Cálculo de horários", "medio"],
    ["Frações", "medio"],
    ["Controle de estoque", "facil"],
    ["Leitura de tabela", "facil"],
    ["Regra de três direta", "dificil"],
    ["Área e perímetro", "facil"],
    ["Lei Orgânica de Santos — competência municipal", "medio"],
    ["Estatuto dos Funcionários de Santos — deveres", "medio"],
    ["LC Municipal nº 1.253/2024 — órgãos e entidades", "dificil"],
    ["Atendimento prioritário", "facil"],
    ["Acessibilidade", "facil"],
    ["Transparência ativa", "dificil"],
    ["Pedido de acesso à informação", "medio"],
    ["Proteção de dados pessoais", "medio"],
    ["Minimização de dados", "medio"],
    ["Incidente de segurança", "dificil"],
    ["Governo Digital e inclusão", "medio"],
    ["Legalidade", "facil"],
    ["Moralidade administrativa", "facil"],
    ["Compartilhamento de dados", "dificil"],
    ["Phishing", "dificil"],
    ["Envio de e-mail", "medio"],
    ["Organização de arquivos", "facil"],
    ["Backup", "dificil"],
    ["Planilhas — soma", "facil"],
    ["Planilhas — filtro", "medio"],
    ["Senhas", "medio"],
    ["Compartilhamento de arquivos", "dificil"],
    ["Digitalização", "medio"],
    ["Controle de versões", "dificil"],
    ["Bloqueio de tela", "facil"],
    ["Dispositivo removível", "dificil"],
  ]);

  function difficultyFor(disciplina, spec, localIndex) {
    if (subjectDifficulty.has(spec.assunto)) return subjectDifficulty.get(spec.assunto);
    if (disciplina === "Conhecimentos Específicos") {
      if (spec.assunto.endsWith("— registro e controle")) return "dificil";
      const complexSituation = /emergência|objeto desacompanhado|suspeit|conflito|briga|mal-estar|acidente|evacuação|violência|segregação|fiscalização|restrição|continuidade|valores/iu;
      return complexSituation.test(spec.assunto) ? "medio" : "facil";
    }
    return difficultyCycle[localIndex % difficultyCycle.length];
  }

  const roleLanguage = {
    "santos-agente-portaria": {
      pessoa: "visitante",
      local: "portaria",
      documento: "documento de identificação",
      registro: "livro de controle da portaria",
      setor: "setor responsável",
      artigoSetor: "o setor responsável",
      destinoSetor: "ao setor responsável",
      acao: "liberar a entrada",
    },
    "santos-inspetor-alunos": {
      pessoa: "responsável por um aluno",
      local: "unidade escolar",
      documento: "formulário de autorização",
      registro: "registro de saída da unidade escolar",
      setor: "equipe gestora",
      artigoSetor: "a equipe gestora",
      destinoSetor: "à equipe gestora",
      acao: "autorizar a saída do estudante",
    },
    "santos-oficial-administracao": {
      pessoa: "munícipe",
      local: "unidade administrativa",
      documento: "requerimento administrativo",
      registro: "sistema de protocolo",
      setor: "setor competente",
      artigoSetor: "o setor competente",
      destinoSetor: "ao setor competente",
      acao: "encaminhar o processo",
    },
  };

  function optionSet(correct, distractors, answerIndex) {
    const uniqueDistractors = distractors.filter((value, index, values) => value !== correct && values.indexOf(value) === index).slice(0, 3);
    if (uniqueDistractors.length !== 3) throw new Error(`Questão sem três distratores distintos: ${correct} | ${distractors.join(" | ")}`);
    const ordered = [...uniqueDistractors];
    ordered.splice(answerIndex, 0, correct);
    return ordered;
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const character of String(value)) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 2246822507);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 3266489909);
    return (hash ^ (hash >>> 16)) >>> 0;
  }

  function stablePermutation(length, seed) {
    const values = Array.from({ length }, (_, index) => index);
    let state = stableHash(seed) || 1;
    for (let index = values.length - 1; index > 0; index -= 1) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const target = state % (index + 1);
      [values[index], values[target]] = [values[target], values[index]];
    }
    return values;
  }

  function stableAnswerIndex(scope, localIndex) {
    const block = Math.floor(localIndex / 4);
    return stablePermutation(4, `${scope}::${block}`)[localIndex % 4];
  }

  function lowerAction(value) {
    const clean = String(value).trim().replace(/[.!?]$/, "");
    return `${clean.charAt(0).toLowerCase()}${clean.slice(1)}`;
  }

  function portugueseQuestions(role) {
    const terms = roleLanguage[role.id];
    return [
      {
        assunto: "Interpretação de texto",
        enunciado: `Leia: “Antes de ${terms.acao}, o servidor conferiu a autorização e registrou o horário no ${terms.registro}.” A informação expressa no trecho permite concluir que`,
        correct: "a conferência e o registro antecederam a providência tomada.",
        distractors: ["a autorização foi dispensada por já existir um registro.", "o horário foi anotado somente depois de encerrado o atendimento.", "o servidor transferiu a conferência para a própria pessoa atendida."],
        comentario: "A locução “antes de” estabelece anterioridade: primeiro houve conferência e registro; depois, a providência. As demais alternativas contradizem essa sequência.",
      },
      {
        assunto: "Finalidade textual",
        enunciado: `No aviso afixado na ${terms.local}, lê-se: “Para reduzir o tempo de espera, tenha em mãos um documento com foto e informe o setor de destino.” A finalidade central do aviso é`,
        correct: "orientar o público sobre como tornar o atendimento mais ágil.",
        distractors: ["proibir o ingresso de quem desconheça o nome do servidor procurado.", "divulgar uma alteração no horário de funcionamento da unidade.", "transferir ao público a responsabilidade pelo controle interno do prédio."],
        comentario: "O trecho usa verbos no imperativo para orientar uma preparação que reduz a espera. Ele não anuncia horário nem cria as proibições indicadas nos distratores.",
      },
      {
        assunto: "Coesão referencial",
        enunciado: `Considere: “O ${terms.pessoa} apresentou um ${terms.documento}. Depois de conferi-lo, o servidor encaminhou o documento ${terms.destinoSetor}.” No contexto, o pronome “lo” em “conferi-lo” retoma explicitamente`,
        correct: `o ${terms.documento} apresentado pelo ${terms.pessoa}.`,
        distractors: [`${terms.artigoSetor}.`, `o servidor que realizou a conferência.`, `o ato de encaminhar o documento.`],
        comentario: `O pronome oblíquo “lo” substitui o complemento masculino singular “${terms.documento}”, apresentado pelo ${terms.pessoa}; não retoma o servidor nem ${terms.artigoSetor}.`,
      },
      {
        assunto: "Pontuação",
        enunciado: `Assinale a frase corretamente pontuada para um registro feito por ${role.cargo}.`,
        correct: `Após a conferência, o ${terms.documento} foi enviado ${terms.destinoSetor}.`,
        distractors: [`Após, a conferência o ${terms.documento}, foi enviado ${terms.destinoSetor}.`, `Após a conferência o ${terms.documento} foi, enviado ${terms.destinoSetor}.`, `Após a conferência, o ${terms.documento}, foi enviado ${terms.destinoSetor}.`],
        comentario: "A vírgula separa o adjunto adverbial deslocado “Após a conferência”. Não se separa por vírgula o sujeito de seu verbo nem a locução verbal de seu complemento.",
      },
      {
        assunto: "Concordância verbal",
        enunciado: `Complete corretamente: “_____ ${terms.destinoSetor} duas solicitações apresentadas pelo ${terms.pessoa}.”`,
        correct: "Foram encaminhadas",
        distractors: ["Foi encaminhada", "Foi encaminhadas", "Foram encaminhado"],
        comentario: "O núcleo do sujeito posposto é “solicitações”, feminino plural; por isso, verbo e particípio ficam no plural e no feminino: “foram encaminhadas”.",
      },
      {
        assunto: "Crase",
        enunciado: `Na frase “O servidor prestou orientação _____ pessoa atendida e comunicou o fato _____ chefia”, as lacunas devem ser preenchidas, respectivamente, por`,
        correct: "à / à — crase nas duas lacunas.",
        distractors: ["a / a — sem crase nas duas lacunas.", "à / a — crase apenas na primeira lacuna.", "a / à — crase apenas na segunda lacuna."],
        comentario: "Em ambos os casos, o termo regente exige a preposição “a”, e os substantivos femininos admitem o artigo “a”; ocorre, portanto, a fusão indicada pelo acento grave.",
      },
      {
        assunto: "Reescrita e sentido",
        enunciado: `A frase “O ${terms.documento} será analisado somente depois da identificação do interessado” mantém o sentido original em`,
        correct: `Somente após a identificação do interessado, o ${terms.documento} será analisado.`,
        distractors: [`Embora o interessado seja identificado, o ${terms.documento} não será analisado.`, `O ${terms.documento} foi analisado antes que o interessado se identificasse.`, `A identificação do interessado será feita apenas se o ${terms.documento} for aprovado.`],
        comentario: "“Somente depois” equivale a “somente após”. Os distratores alteram a relação temporal ou introduzem condição e concessão inexistentes.",
      },
      {
        assunto: "Conjunções",
        enunciado: `Em “A solicitação estava completa, porém ainda dependia de conferência”, a palavra “porém” introduz ideia de`,
        correct: "oposição.",
        distractors: ["causa.", "conclusão.", "explicação."],
        comentario: "“Porém” é conjunção coordenativa adversativa e estabelece contraste entre a completude da solicitação e a conferência ainda necessária.",
      },
      {
        assunto: "Colocação pronominal",
        enunciado: `Assinale a redação adequada à norma-padrão em uma comunicação do cargo ${role.cargo}.`,
        correct: "Não se deve divulgar informação restrita a pessoas não autorizadas.",
        distractors: ["Não deve-se divulgar informação restrita a pessoas não autorizadas.", "Se deve não divulgar informação restrita à pessoas não autorizadas.", "Não deve divulgar-se informações restrita para pessoas não autorizada."],
        comentario: "A palavra negativa “não” atrai o pronome para antes do verbo: “não se deve”. A frase também mantém concordância e regência adequadas.",
      },
      {
        assunto: "Ambiguidade",
        enunciado: `A frase “O servidor informou ao ${terms.pessoa} que seu documento estava incompleto” pode gerar ambiguidade. A reescrita que deixa claro que o documento pertence à pessoa atendida é`,
        correct: `O documento apresentado pelo ${terms.pessoa} estava incompleto, conforme informou o servidor.`,
        distractors: [`O documento do servidor estava incompleto, e ele informou esse fato ao ${terms.pessoa}.`, `O servidor e o ${terms.pessoa} informaram que havia um documento incompleto.`, `O ${terms.pessoa} informou ao servidor que outro documento estava incompleto.`],
        comentario: `A expressão “apresentado pelo ${terms.pessoa}” identifica sem pronome possessivo quem entregou o documento. Assim, elimina-se a ambiguidade entre a pessoa atendida e o servidor.`,
      },
      {
        assunto: "Ortografia e acentuação",
        enunciado: `Assinale a alternativa em que todas as palavras estão grafadas corretamente.`,
        correct: "público, eficiência, ocorrência, necessário",
        distractors: ["púbrico, eficiência, ocorrênsia, necessário", "público, eficência, ocorrência, nescessário", "público, eficiência, ocorrência, necesário"],
        comentario: "A alternativa correta respeita grafia e acentuação. “Público” e “ocorrência” são proparoxítona e paroxítona terminada em ditongo, respectivamente.",
      },
      {
        assunto: "Ordenação de ideias",
        enunciado: `Para formar um parágrafo coerente sobre o atendimento na ${terms.local}, ordene: I. Em seguida, registrou a demanda. II. Por fim, encaminhou-a ${terms.destinoSetor}. III. Primeiro, o servidor ouviu o ${terms.pessoa}.`,
        correct: "III – I – II.",
        distractors: ["I – II – III.", "II – III – I.", "III – II – I."],
        comentario: "Os marcadores “primeiro”, “em seguida” e “por fim” determinam a sequência III, I e II.",
      },
      {
        assunto: "Inferência",
        enunciado: `Leia: “Mesmo com o sistema indisponível, o servidor anotou os dados essenciais em formulário próprio para lançamento posterior.” Infere-se corretamente que`,
        correct: "a indisponibilidade do sistema não impediu a continuidade controlada do atendimento.",
        distractors: ["os dados foram descartados porque não puderam ser digitados imediatamente.", "o formulário dispensou o lançamento posterior no sistema.", "o servidor registrou dados sem qualquer procedimento previsto."],
        comentario: "O registro provisório em formulário próprio permitiu continuar o trabalho e prevê lançamento posterior; não houve descarte nem dispensa de controle.",
      },
      {
        assunto: "Adequação da linguagem",
        enunciado: `O comprovante obrigatório ainda não foi apresentado. Qual frase orienta formalmente o ${terms.pessoa} sem dispensar a conferência?`,
        correct: `Por gentileza, apresente o comprovante para encaminharmos sua solicitação ${terms.destinoSetor}.`,
        distractors: ["O comprovante pode ser dispensado sempre que o atendimento ocorrer presencialmente.", "Apresente qualquer documento; a finalidade será conferida somente após o encaminhamento.", "A solicitação deve seguir sem conferência, pois o setor de destino corrigirá a pendência."],
        comentario: "A redação correta é cortês, objetiva e informa a providência necessária. As demais frases são formais, mas dispensam ou postergam indevidamente a conferência do comprovante obrigatório.",
      },
    ];
  }

  function mathematicsQuestions(role, roleIndex) {
    const terms = roleLanguage[role.id];
    const base = 160 + (roleIndex * 40);
    const percent = 15 + (roleIndex * 5);
    const percentResult = base * percent / 100;
    const unitPrice = 6 + roleIndex;
    const quantity = 7 + roleIndex;
    const totalPrice = unitPrice * quantity;
    const paid = totalPrice + 20;
    const daily = 24 + (roleIndex * 6);
    const days = 5;
    const team = roleIndex + 3;
    const minutes = 35 + (roleIndex * 5);
    const startHour = 8;
    const startMinute = 20 + (roleIndex * 5);
    const finishTotal = (startHour * 60) + startMinute + minutes;
    const finish = `${String(Math.floor(finishTotal / 60)).padStart(2, "0")}:${String(finishTotal % 60).padStart(2, "0")}`;
    const averageValues = roleIndex === 0 ? [18, 24, 21, 17] : roleIndex === 1 ? [22, 27, 25, 26] : [31, 29, 34, 26];
    const average = averageValues.reduce((sum, value) => sum + value, 0) / averageValues.length;
    const initialStock = 180 + roleIndex * 60;
    const usedStock = 45 + roleIndex * 15;
    const remainingStock = initialStock - usedStock;
    const tablePrevious = 72 + roleIndex * 11;
    const tableCurrent = 91 + roleIndex * 14;
    const ratioHours = 3 + roleIndex;
    const ratioItems = 45 + roleIndex * 15;
    const targetHours = ratioHours + 2;
    const targetItems = ratioItems / ratioHours * targetHours;
    const width = 4 + roleIndex;
    const length = 7 + roleIndex;
    return [
      {
        assunto: "Porcentagem",
        enunciado: `Em um mês, a ${terms.local} registrou ${base} atendimentos. Desses, ${percent}% exigiram encaminhamento ${terms.destinoSetor}. Quantos atendimentos foram encaminhados?`,
        correct: `${percentResult} atendimentos.`,
        distractors: [`${base - percentResult} atendimentos.`, `${percent} atendimentos.`, `${percentResult + 10} atendimentos.`],
        comentario: `Converta ${percent}% em ${percent / 100} e multiplique pelo total: ${percent / 100} × ${base} = ${percentResult} atendimentos encaminhados.`,
      },
      {
        assunto: "Sistema monetário",
        enunciado: `Para uma atividade autorizada, foram adquiridos ${quantity} itens de R$ ${unitPrice.toFixed(2).replace(".", ",")} cada. Se o pagamento foi de R$ ${paid.toFixed(2).replace(".", ",")}, qual foi o troco?`,
        correct: `R$ ${(paid - totalPrice).toFixed(2).replace(".", ",")}.`,
        distractors: [`R$ ${totalPrice.toFixed(2).replace(".", ",")}.`, `R$ ${(paid - unitPrice).toFixed(2).replace(".", ",")}.`, `R$ ${(paid - totalPrice + quantity).toFixed(2).replace(".", ",")}.`],
        comentario: `O custo foi ${quantity} × R$ ${unitPrice.toFixed(2).replace(".", ",")} = R$ ${totalPrice.toFixed(2).replace(".", ",")}. O troco é R$ ${paid.toFixed(2).replace(".", ",")} − R$ ${totalPrice.toFixed(2).replace(".", ",")} = R$ ${(paid - totalPrice).toFixed(2).replace(".", ",")}.`,
      },
      {
        assunto: "Proporcionalidade",
        enunciado: `Uma equipe de ${team} servidores organiza ${team * 16} registros em 2 horas, mantendo ritmo constante e igual. Quantos registros a mesma equipe organiza em 5 horas?`,
        correct: `${team * 40} registros.`,
        distractors: [`${team * 24} registros.`, `${team * 32} registros.`, `${team * 48} registros.`],
        comentario: `Em uma hora, a equipe organiza ${(team * 16) / 2} registros. Em 5 horas, organiza ${(team * 16) / 2} × 5 = ${team * 40}.`,
      },
      {
        assunto: "Média aritmética",
        enunciado: `Em quatro períodos, o número de demandas recebidas foi ${averageValues.join(", ")}. Qual foi a média por período?`,
        correct: `${average} demandas.`,
        distractors: [`${Math.max(...averageValues)} demandas.`, `${average + 7} demandas.`, `${average - 3} demandas.`],
        comentario: `A soma é ${averageValues.reduce((sum, value) => sum + value, 0)}. Dividindo por 4, obtém-se a média ${average}.`,
      },
      {
        assunto: "Cálculo de horários",
        enunciado: `Um atendimento começou às ${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")} e durou ${minutes} minutos. Em que horário terminou?`,
        correct: `${finish}.`,
        distractors: [`${String(startHour).padStart(2, "0")}:${String(startMinute + (minutes % 30)).padStart(2, "0")}.`, `${String(startHour + 1).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}.`, `${String(Math.floor(finishTotal / 60)).padStart(2, "0")}:${String((finishTotal + 10) % 60).padStart(2, "0")}.`],
        comentario: `Somando ${minutes} minutos a ${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}, chega-se a ${finish}.`,
      },
      {
        assunto: "Frações",
        enunciado: `Dos ${daily * days} registros da semana, ${daily * 2} foram concluídos nos dois primeiros dias. Que fração do total isso representa?`,
        correct: "2/5.",
        distractors: ["1/5.", "2/3.", "3/5."],
        comentario: `Foram concluídos ${daily * 2} de ${daily * days} registros. Simplificando ${daily * 2}/${daily * days}, obtém-se 2/5.`,
      },
      {
        assunto: "Controle de estoque",
        enunciado: `Havia ${initialStock} unidades de material. Após o uso de ${usedStock}, quantas unidades permaneceram disponíveis?`,
        correct: `${remainingStock} unidades.`,
        distractors: [`${initialStock + usedStock} unidades.`, `${remainingStock - 15} unidades.`, `${usedStock} unidades.`],
        comentario: `O saldo é a quantidade inicial menos a saída: ${initialStock} − ${usedStock} = ${remainingStock}.`,
      },
      {
        assunto: "Leitura de tabela",
        enunciado: `Uma tabela registra ${tablePrevious} atendimentos na semana anterior e ${tableCurrent} na semana atual. Qual foi o aumento absoluto?`,
        correct: `${tableCurrent - tablePrevious} atendimentos.`,
        distractors: [`${tableCurrent + tablePrevious} atendimentos.`, `${tablePrevious} atendimentos.`, `${tableCurrent - tablePrevious + 5} atendimentos.`],
        comentario: `Aumento absoluto é a diferença entre o valor atual e o anterior: ${tableCurrent} − ${tablePrevious} = ${tableCurrent - tablePrevious}.`,
      },
      {
        assunto: "Regra de três direta",
        enunciado: `Se ${ratioItems} documentos são conferidos em ${ratioHours} horas, no mesmo ritmo quantos serão conferidos em ${targetHours} horas?`,
        correct: `${targetItems} documentos.`,
        distractors: [`${ratioItems + targetHours} documentos.`, `${ratioItems * targetHours} documentos.`, `${targetItems - 15} documentos.`],
        comentario: `A taxa é ${ratioItems} ÷ ${ratioHours} = ${ratioItems / ratioHours} documentos por hora. Em ${targetHours} horas: ${ratioItems / ratioHours} × ${targetHours} = ${targetItems}.`,
      },
      {
        assunto: "Área e perímetro",
        enunciado: `Uma sala retangular mede ${length} m de comprimento por ${width} m de largura. Qual é a área do piso?`,
        correct: `${length * width} m².`,
        distractors: [`${2 * (length + width)} m².`, `${length + width} m².`, `${length * width + width} m².`],
        comentario: `A área do retângulo é comprimento × largura: ${length} × ${width} = ${length * width} m².`,
      },
    ];
  }

  const legalQuestions = [
    {
      assunto: "Lei Orgânica de Santos — competência municipal",
      scenario: () => "Durante a revisão de um serviço público de interesse local, surge a afirmação de que o Município não poderia discipliná-lo nem prestá-lo.",
      correct: "Reconhecer que o Município pode legislar sobre interesse local e organizar ou prestar esse serviço.",
      distractors: ["Concluir que somente a União pode disciplinar qualquer serviço prestado ao público.", "Admitir atuação municipal apenas quando não houver arrecadação ou despesa envolvida.", "Transferir obrigatoriamente o serviço ao Estado, ainda que a necessidade seja estritamente local."],
      comentario: "O artigo 6º, incisos I e V, da Lei Orgânica atribui ao Município competência para legislar sobre assuntos de interesse local e organizar ou prestar os serviços públicos de interesse local.",
      fonte: "Lei Orgânica do Município de Santos, art. 6º, incisos I e V.",
      link: officialLinks.leiOrganicaSantos,
    },
    {
      assunto: "Estatuto dos Funcionários de Santos — deveres",
      scenario: (terms) => `Durante um atendimento na ${terms.local}, um servidor cogita tratar o público com descortesia porque o setor está sobrecarregado.`,
      correct: "Manter a urbanidade no atendimento e desempenhar o trabalho com zelo e presteza.",
      distractors: ["Reservar a urbanidade apenas ao relacionamento com superiores hierárquicos.", "Suspender o dever de presteza sempre que houver aumento temporário da demanda.", "Substituir a orientação ao público por resposta informal, sem conferir a informação prestada."],
      comentario: "O artigo 222, incisos III e V, da Lei Municipal nº 4.623/1984 inclui entre os deveres funcionais desempenhar os trabalhos com zelo e presteza e tratar com urbanidade os colegas e o público em geral.",
      fonte: "Lei Municipal nº 4.623/1984, art. 222, incisos III e V.",
      link: officialLinks.estatutoSantos,
    },
    {
      assunto: "LC Municipal nº 1.253/2024 — órgãos e entidades",
      scenario: () => "Ao cadastrar unidades da estrutura municipal, a equipe precisa distinguir órgão de entidade segundo a organização administrativa de Santos.",
      correct: "Tratar o órgão como centro de competências e a entidade como pessoa jurídica criada ou autorizada por lei.",
      distractors: ["Considerar que todo órgão possui personalidade jurídica própria e patrimônio separado.", "Classificar entidade como simples unidade interna sem personalidade jurídica ou atribuições definidas.", "Usar os termos órgão e entidade como sinônimos, porque ambos pertencem necessariamente à administração direta."],
      comentario: "O artigo 3º da Lei Complementar Municipal nº 1.253/2024 define órgão como centro de competências da estrutura administrativa e entidade como pessoa jurídica criada pelo Município ou cuja criação foi autorizada por lei.",
      fonte: "Lei Complementar Municipal nº 1.253/2024, art. 3º, incisos I e II.",
      link: officialLinks.estruturaSantos,
    },
    {
      assunto: "Atendimento prioritário",
      scenario: () => "Na unidade forma-se uma fila com usuários em diferentes condições, entre eles uma pessoa idosa com prioridade legal.",
      correct: "Organizar o atendimento prioritário com respeito, preservando a dignidade de todos.",
      distractors: ["Eliminar toda forma de fila, atendendo exclusivamente por ordem de chegada.", "Exigir que a pessoa idosa revele diagnóstico médico para exercer a prioridade.", "Atender a pessoa prioritária somente após autorização dos demais usuários."],
      comentario: "A Lei nº 10.048/2000 assegura atendimento prioritário aos grupos nela previstos; a organização deve ser respeitosa e não criar constrangimento indevido.",
      fonte: "Lei nº 10.048/2000.",
      link: officialLinks.prioritario,
    },
    {
      assunto: "Acessibilidade",
      scenario: () => "Uma pessoa com deficiência encontra uma barreira de comunicação ao solicitar serviço público.",
      correct: "Providenciar recurso de comunicação acessível e preservar a autonomia da pessoa.",
      distractors: ["Dirigir toda a explicação ao acompanhante, mesmo que a pessoa possa se comunicar.", "Adiar indefinidamente o atendimento por inexistir um procedimento idêntico para todos.", "Pedir ao usuário que retorne somente quando estiver acompanhado."],
      comentario: "A Lei Brasileira de Inclusão orienta a eliminação de barreiras e o atendimento com autonomia, igualdade e não discriminação.",
      fonte: "Lei nº 13.146/2015 (Lei Brasileira de Inclusão).",
      link: officialLinks.pcd,
    },
    {
      assunto: "Transparência ativa",
      scenario: () => "O setor percebe que informações de interesse coletivo, frequentemente solicitadas, ainda não estão publicadas no canal oficial.",
      correct: "Propor a divulgação ativa em formato acessível, observadas as restrições legais.",
      distractors: ["Manter as informações fora do canal oficial para aumentar o número de pedidos individuais.", "Publicar também dados pessoais irrelevantes, pois toda informação pública deve ser irrestrita.", "Divulgar somente após autorização individual de cada cidadão interessado no tema."],
      comentario: "A LAI prevê transparência ativa de informações de interesse coletivo, sem afastar a proteção de dados pessoais e das hipóteses legais de sigilo.",
      fonte: "Lei nº 12.527/2011 (Lei de Acesso à Informação).",
      link: officialLinks.lai,
    },
    {
      assunto: "Pedido de acesso à informação",
      scenario: (terms) => `Um ${terms.pessoa} apresenta pedido objetivo de acesso a informação pública, sem explicar por que deseja obtê-la.`,
      correct: "Processar o pedido sem exigir a motivação do solicitante.",
      distractors: ["Negar o pedido pela ausência de justificativa pessoal.", "Exigir prova de interesse jurídico direto antes de protocolar.", "Divulgar o nome do solicitante para que outros usuários opinem sobre o pedido."],
      comentario: "A LAI não permite exigir os motivos determinantes da solicitação de informação de interesse público.",
      fonte: "Lei nº 12.527/2011 (Lei de Acesso à Informação).",
      link: officialLinks.lai,
    },
    {
      assunto: "Proteção de dados pessoais",
      scenario: () => "Uma planilha de atendimento contém nome, telefone e detalhes da demanda de vários munícipes.",
      correct: "Restringir o acesso a quem necessita dos dados para a finalidade do serviço.",
      distractors: ["Compartilhar a planilha em grupo aberto para facilitar consultas ocasionais.", "Manter todos os dados indefinidamente, mesmo após cessar a finalidade.", "Publicar uma cópia integral para atender ao princípio da publicidade."],
      comentario: "Finalidade, necessidade e segurança orientam o tratamento de dados; publicidade administrativa não autoriza exposição indiscriminada de dados pessoais.",
      fonte: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais).",
      link: officialLinks.lgpd,
    },
    {
      assunto: "Minimização de dados",
      scenario: () => "Um formulário simples de contato pede, além do necessário, renda, filiação e histórico médico do usuário.",
      correct: "Revisar o formulário e coletar apenas os dados adequados e necessários à finalidade informada.",
      distractors: ["Manter todos os campos porque dados adicionais sempre podem ser úteis no futuro.", "Transformar todos os campos em públicos para justificar a coleta.", "Eliminar também os dados indispensáveis, impedindo a prestação do serviço."],
      comentario: "O princípio da necessidade limita o tratamento ao mínimo necessário para a finalidade, com dados pertinentes e não excessivos.",
      fonte: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais).",
      link: officialLinks.lgpd,
    },
    {
      assunto: "Incidente de segurança",
      scenario: () => "O servidor percebe que enviou, por engano, arquivo com dados pessoais ao destinatário incorreto.",
      correct: "Comunicar imediatamente o incidente pelo procedimento interno e colaborar para reduzir os riscos.",
      distractors: ["Apagar a mensagem da própria caixa e não informar o ocorrido.", "Esperar uma reclamação do titular antes de comunicar a chefia.", "Reenviar o arquivo a outros destinatários para verificar se o conteúdo é sensível."],
      comentario: "Incidentes devem ser comunicados e tratados com rapidez; ocultá-los impede contenção, avaliação e adoção das providências cabíveis.",
      fonte: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais).",
      link: officialLinks.lgpd,
    },
    {
      assunto: "Governo Digital e inclusão",
      scenario: () => "Um serviço passou a ser oferecido digitalmente, mas um usuário demonstra dificuldade para utilizar o canal.",
      correct: "Oferecer orientação acessível e alternativa de apoio compatível com o serviço.",
      distractors: ["Recusar atendimento porque a digitalização elimina qualquer dever de orientação.", "Preencher o cadastro usando dados inventados para acelerar a conclusão.", "Exigir que o usuário entregue sua senha pessoal ao servidor."],
      comentario: "A transformação digital deve ampliar eficiência e acesso; não legitima exclusão, uso de dados falsos ou compartilhamento de senhas.",
      fonte: "Lei nº 14.129/2021 (Governo Digital).",
      link: officialLinks.governoDigital,
    },
    {
      assunto: "Legalidade",
      scenario: () => "Um colega sugere ignorar um procedimento obrigatório porque o atalho seria mais rápido.",
      correct: "Cumprir o procedimento aplicável e sugerir melhoria pelos canais institucionais.",
      distractors: ["Adotar o atalho sempre que o usuário concordar.", "Substituir a regra por costume pessoal do setor.", "Aplicar o procedimento apenas a usuários desconhecidos."],
      comentario: "Na Administração Pública, eficiência deve conviver com legalidade; melhoria de processo não autoriza descumprir regra vigente.",
      fonte: "Constituição Federal, art. 37, e conteúdo programático do edital.",
      link: officialLinks.constituicao,
    },
    {
      assunto: "Moralidade administrativa",
      scenario: () => "Um fornecedor oferece um benefício pessoal ao servidor em troca de tratamento preferencial.",
      correct: "Recusar a vantagem e comunicar a ocorrência conforme as regras internas.",
      distractors: ["Aceitar se o benefício tiver pequeno valor.", "Aceitar e dividir a vantagem com a equipe para evitar favorecimento individual.", "Conceder preferência desde que o fornecedor cumpra as demais obrigações."],
      comentario: "A moralidade e a impessoalidade são incompatíveis com vantagem pessoal vinculada ao exercício da função pública.",
      fonte: "Constituição Federal, art. 37, e conteúdo programático do edital.",
      link: officialLinks.constituicao,
    },
    {
      assunto: "Compartilhamento de dados",
      scenario: () => "Outro setor solicita dados pessoais para finalidade diferente daquela que originou a coleta.",
      correct: "Verificar finalidade, base aplicável, necessidade e canal seguro antes de compartilhar.",
      distractors: ["Compartilhar automaticamente porque todos os setores pertencem ao mesmo município.", "Enviar uma cópia por aplicativo pessoal para ganhar tempo.", "Negar toda e qualquer circulação de dados, inclusive quando legalmente necessária."],
      comentario: "O compartilhamento no poder público exige finalidade legítima, necessidade, segurança e observância das regras de proteção de dados.",
      fonte: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais).",
      link: officialLinks.lgpd,
    },
  ];

  const informaticsQuestions = [
    {
      assunto: "Phishing",
      scenario: (terms) => `Chega ao e-mail da ${terms.local} uma mensagem urgente pedindo a senha do sistema por meio de link encurtado.`,
      correct: "Não clicar no link, não fornecer a senha e comunicar a tentativa ao suporte responsável.",
      distractors: ["Abrir o link em janela anônima e informar a senha se a página exibir a identidade visual da Prefeitura.", "Responder ao remetente e pedir que confirme por e-mail se o link encurtado é legítimo.", "Encaminhar a mensagem a colegas para que cada um teste o acesso em seu próprio computador."],
      comentario: "Urgência artificial, link suspeito e pedido de senha são sinais de phishing. Senhas não devem ser informadas por e-mail.",
    },
    {
      assunto: "Envio de e-mail",
      scenario: (terms) => `Antes de enviar ${terms.destinoSetor} uma mensagem com o ${terms.documento} anexado, o servidor percebe nomes semelhantes na lista de contatos.`,
      correct: "Conferir destinatário, assunto, conteúdo e anexo antes do envio.",
      distractors: ["Enviar primeiro e conferir somente se houver resposta.", "Colocar todos os contatos em cópia para garantir o recebimento.", "Retirar o assunto da mensagem para evitar identificação indevida."],
      comentario: "A revisão prévia reduz envio ao destinatário errado, vazamento de dados e retrabalho.",
    },
    {
      assunto: "Organização de arquivos",
      scenario: (terms) => `A equipe precisa localizar diferentes versões do ${terms.documento} ao longo do mês.`,
      correct: "Adotar nomes padronizados com assunto, data e versão, mantendo pastas organizadas.",
      distractors: ["Salvar todos os arquivos como “documento final” na área de trabalho.", "Usar nomes aleatórios para impedir que outras pessoas reconheçam o conteúdo.", "Criar uma nova pasta sem nome para cada alteração realizada."],
      comentario: "Padronização, data e versão facilitam busca, ordenação, rastreabilidade e identificação da cópia vigente.",
    },
    {
      assunto: "Backup",
      scenario: () => "Um computador apresenta sinais de falha e contém registros necessários à continuidade do serviço.",
      correct: "Confirmar a existência de cópia de segurança válida e acionar o suporte técnico.",
      distractors: ["Continuar gravando apenas no mesmo disco até ele parar de funcionar.", "Copiar os dados para um serviço pessoal sem autorização.", "Apagar os arquivos antigos antes de verificar o backup."],
      comentario: "Backup válido e suporte técnico reduzem o risco de perda; a cópia deve seguir os recursos e procedimentos institucionais.",
    },
    {
      assunto: "Planilhas — soma",
      scenario: () => "Em uma planilha, os valores das células B2 até B8 devem ser totalizados.",
      correct: "Usar =SOMA(B2:B8).",
      distractors: ["Usar =B2+B8, somando apenas os extremos do intervalo.", "Usar =MÉDIA(B2:B8), obtendo a média em vez do total.", "Usar =CONT.NÚM(B2:B8), contando as células numéricas."],
      comentario: "A fórmula =SOMA(B2:B8) totaliza todas as células do intervalo e se atualiza quando os valores mudam. As outras fórmulas calculam apenas os extremos, a média ou a contagem.",
    },
    {
      assunto: "Planilhas — filtro",
      scenario: () => "Uma tabela contém centenas de registros, e o servidor precisa visualizar apenas os que estão com status “pendente”.",
      correct: "Aplicar filtro na coluna de status selecionando o valor “pendente”.",
      distractors: ["Ordenar a coluna de status e excluir os registros que não apareçam primeiro.", "Usar a pesquisa de texto e substituir os demais status por células vazias.", "Ocultar manualmente cada linha sem criar um critério de filtro reutilizável."],
      comentario: "O filtro oculta temporariamente registros fora do critério sem apagá-los nem alterar a estrutura dos dados.",
    },
    {
      assunto: "Senhas",
      scenario: () => "Um colega pede a senha pessoal do servidor para concluir uma tarefa enquanto ele está ausente.",
      correct: "Não compartilhar a senha e solicitar acesso individual pelo procedimento autorizado.",
      distractors: ["Informar a senha e trocá-la somente no mês seguinte.", "Anotar a senha em papel visível para toda a equipe.", "Criar uma senha única e compartilhada por todos os setores."],
      comentario: "Credenciais individuais permitem responsabilização e controle de acesso; compartilhá-las compromete segurança e rastreabilidade.",
    },
    {
      assunto: "Compartilhamento de arquivos",
      scenario: () => "Um documento com dados pessoais precisa ser acessado por dois servidores responsáveis pelo mesmo atendimento.",
      correct: "Compartilhar pelo repositório institucional, com permissão limitada aos responsáveis.",
      distractors: ["Publicar o arquivo em link aberto para evitar pedidos de acesso.", "Enviar o documento por conta pessoal de mensagem instantânea.", "Copiar o arquivo para dispositivo particular sem proteção."],
      comentario: "O repositório institucional e a permissão mínima preservam confidencialidade e registram o acesso.",
    },
    {
      assunto: "Digitalização",
      scenario: (terms) => `Após digitalizar o ${terms.documento}, o servidor nota que uma página ficou cortada e ilegível.`,
      correct: "Refazer a digitalização e conferir todas as páginas antes de associar o arquivo ao registro.",
      distractors: ["Manter o arquivo incompleto e descartar imediatamente o documento de origem.", "Aumentar apenas o nome do arquivo, sem verificar o conteúdo.", "Preencher de memória a parte ilegível em um editor de imagens."],
      comentario: "Conferência de integridade e legibilidade é indispensável antes de incorporar o documento digital ao fluxo de trabalho.",
    },
    {
      assunto: "Controle de versões",
      scenario: () => "Duas pessoas editaram cópias diferentes de um mesmo documento e agora há dúvida sobre qual está vigente.",
      correct: "Comparar as alterações, consolidar a versão válida e identificá-la no repositório oficial.",
      distractors: ["Escolher a cópia com maior tamanho, sem examinar o conteúdo.", "Apagar todas as versões e recomeçar sem preservar o histórico necessário.", "Manter ambas com o mesmo nome e informar que qualquer uma pode ser usada."],
      comentario: "O controle de versões exige identificar a cópia válida, consolidar mudanças e manter rastreabilidade conforme a rotina institucional.",
    },
    {
      assunto: "Bloqueio de tela",
      scenario: () => "O servidor precisa se afastar por alguns minutos do computador que exibe cadastro de usuários.",
      correct: "Bloquear a sessão antes de se afastar.",
      distractors: ["Minimizar a janela e deixar a sessão aberta.", "Desligar apenas o monitor, mantendo o acesso liberado.", "Pedir a um usuário que vigie a tela até seu retorno."],
      comentario: "Bloquear a sessão impede acesso não autorizado mesmo em ausências breves; minimizar janelas ou desligar o monitor não protege a conta.",
    },
    {
      assunto: "Dispositivo removível",
      scenario: () => "Um pendrive sem identificação é encontrado próximo a um computador da unidade.",
      correct: "Não conectá-lo e encaminhá-lo conforme o procedimento de segurança da informação.",
      distractors: ["Conectá-lo para descobrir rapidamente quem é o dono.", "Abrir os arquivos em um computador de atendimento ao público.", "Levá-lo para casa e verificar o conteúdo em equipamento pessoal."],
      comentario: "Dispositivo desconhecido pode conter código malicioso. Ele não deve ser conectado antes de avaliação pelo canal autorizado.",
    },
  ];

  const specificTopics = {
    "santos-agente-portaria": [
      ["Identificação de visitantes", "Uma pessoa solicita entrada, mas não informa quem pretende visitar.", "Confirmar identidade, destino e autorização antes de liberar o acesso.", "Liberar a entrada apenas porque a pessoa demonstra pressa."],
      ["Autorização de acesso", "O nome do visitante não consta da relação enviada pelo setor responsável.", "Contatar o setor responsável e aguardar confirmação conforme o procedimento.", "Pedir ao visitante que procure sozinho o servidor dentro da unidade."],
      ["Credencial de visitante", "Após receber identificação temporária, o visitante tenta circular fora do setor indicado.", "Orientar o retorno à rota autorizada e comunicar a irregularidade se necessário.", "Ignorar a circulação porque a credencial permite acesso irrestrito."],
      ["Registro de entrada e saída", "No fim do turno, há uma entrada sem horário de saída anotado.", "Verificar a situação e completar o registro com informação confirmada.", "Inventar um horário aproximado apenas para fechar a planilha."],
      ["Entrega de encomendas", "Um entregador pede para deixar pacote sem destinatário claramente identificado.", "Solicitar identificação suficiente e seguir a rotina de recebimento da unidade.", "Abrir o pacote para tentar descobrir a quem pertence."],
      ["Correspondência sigilosa", "Chega um envelope lacrado marcado como confidencial.", "Registrar o recebimento e entregá-lo intacto ao destinatário autorizado.", "Abrir o envelope para resumir o conteúdo antes da entrega."],
      ["Controle de chaves", "Um prestador solicita a chave de sala fora do horário informado.", "Conferir autorização, registrar a retirada e controlar a devolução.", "Entregar a chave e pedir que ele avise depois onde a deixou."],
      ["Objeto desacompanhado", "Uma bolsa sem identificação é encontrada na área de circulação.", "Isolar a área, evitar o manuseio do objeto e comunicar imediatamente o responsável pela segurança.", "Manusear e abrir a bolsa para tentar identificar o proprietário antes de comunicar a segurança."],
      ["Pedido de manutenção", "A porta de acesso apresenta falha que pode comprometer a segurança.", "Registrar local, defeito e urgência, comunicando o setor de manutenção.", "Adiar a comunicação até que a porta deixe totalmente de funcionar."],
      ["Emergência na unidade", "O alarme de emergência é acionado durante o atendimento.", "Seguir o plano da unidade, orientar a saída e acionar os responsáveis previstos.", "Continuar o atendimento até receber confirmação informal, sem iniciar o procedimento de evacuação."],
      ["Comportamento suspeito", "Uma pessoa fotografa áreas restritas após ser orientada a não fazê-lo.", "Manter distância segura, comunicar a segurança e registrar os fatos observados.", "Confrontar sozinho a pessoa e tentar obrigá-la a apagar as imagens, sem acionar a segurança."],
      ["Atendimento acessível", "Uma pessoa com deficiência auditiva pede orientação na portaria.", "Buscar forma acessível de comunicação, falando diretamente com a pessoa e respeitando sua autonomia.", "Dirigir todas as perguntas ao acompanhante, sem consultar a pessoa atendida."],
      ["Atendimento prioritário", "Há fila na portaria e chega uma pessoa com prioridade legal.", "Organizar a prioridade com respeito e explicar o fluxo aos demais usuários.", "Exigir que a pessoa explique publicamente o motivo da prioridade."],
      ["Mediação de conflito", "Dois visitantes discutem sobre a ordem de atendimento.", "Intervir com calma, reafirmar os critérios da fila e pedir apoio se o conflito persistir.", "Encerrar a discussão atendendo arbitrariamente um deles, sem reafirmar o critério da fila."],
      ["Objeto perdido", "Um munícipe entrega um celular encontrado no saguão.", "Registrar características, local e horário, guardando o objeto conforme a rotina.", "Acessar conteúdo e contatos do aparelho antes de formalizar o recebimento do objeto encontrado."],
      ["Recado telefônico", "O responsável procurado está ausente quando chega uma ligação importante.", "Anotar nome, contato, assunto, destinatário, data e horário com clareza.", "Registrar apenas “ligaram para você”, sem qualquer dado de retorno."],
      ["Conferência de valores", "No fechamento de uma cobrança autorizada, o valor contado difere do registrado.", "Refazer a conferência, preservar comprovantes e comunicar a divergência.", "Alterar o registro para igualá-lo ao dinheiro sem apurar a diferença."],
      ["Patrimônio público", "Um visitante danifica acidentalmente um equipamento no saguão.", "Preservar o local, registrar o fato e comunicar o setor responsável.", "Ocultar o dano para evitar atraso no atendimento da portaria."],
      ["Passagem de turno", "O servidor que assume precisa saber de uma chave ainda não devolvida e de uma manutenção pendente.", "Fazer a passagem com registros objetivos das duas pendências.", "Encerrar o turno sem informar ocorrências que ainda não foram resolvidas."],
    ],
    "santos-inspetor-alunos": [
      ["Entrada de estudantes", "Um estudante chega depois do horário e afirma que pode entrar sem registro.", "Aplicar a rotina da escola, acolher o aluno e registrar ou comunicar o atraso.", "Mandar o estudante embora sozinho, sem consultar a equipe gestora."],
      ["Saída autorizada", "Uma pessoa desconhecida diz ter autorização verbal para buscar um aluno.", "Conferir identidade e autorização conforme a rotina antes de liberar o estudante.", "Liberar a saída porque a pessoa sabe o nome completo do aluno."],
      ["Circulação em corredores", "Durante a aula, vários alunos correm e empurram colegas no corredor.", "Interromper a conduta com orientação segura e comunicar reincidências.", "Ignorar a situação porque somente o professor pode orientar alunos."],
      ["Segurança no recreio", "Uma brincadeira no pátio envolve subir em estrutura não destinada a isso.", "Intervir preventivamente, orientar os alunos e afastar o risco.", "Aguardar ocorrer uma queda para então registrar a situação."],
      ["Bullying", "Um aluno é alvo repetido de apelidos humilhantes e evita o recreio.", "Acolher sem exposição, registrar os sinais e comunicar a equipe responsável.", "Pedir que a vítima resolva sozinha para desenvolver resistência."],
      ["Cyberbullying", "Um estudante mostra mensagens ofensivas recebidas em grupo da turma.", "Preservar a privacidade, acolher o relato e acionar a equipe gestora conforme o protocolo.", "Repassar as mensagens em outros grupos para descobrir os autores."],
      ["Briga entre alunos", "Dois estudantes iniciam agressões físicas perto de outros colegas.", "Priorizar a segurança, pedir apoio, separar sem ampliar o risco e comunicar a gestão.", "Filmar a briga para usar a gravação como punição pública."],
      ["Mal-estar", "Uma aluna relata tontura e precisa sentar-se durante o intervalo.", "Acolher, mantê-la em local seguro e acionar o responsável definido pela escola.", "Oferecer medicamento pessoal sem autorização ou avaliação."],
      ["Acidente escolar", "Um aluno cai, sente dor intensa e não consegue se levantar.", "Evitar movimentação desnecessária, sinalizar o local e acionar ajuda qualificada.", "Obrigar o aluno a caminhar para testar se houve lesão."],
      ["Evacuação", "O alarme de emergência toca durante a troca de aulas.", "Conduzir os estudantes pela rota prevista, mantendo organização e conferindo o grupo.", "Improvisar outra rota sem consultar o plano e dispensar a conferência do grupo no ponto seguro."],
      ["Aluno não localizado", "Na conferência após o recreio, um estudante não retorna à sala.", "Comunicar imediatamente a equipe e iniciar a busca conforme o procedimento da escola.", "Esperar até o fim do turno para verificar se o estudante reaparece."],
      ["Pessoa não autorizada", "Um adulto tenta entrar na área de alunos sem identificação.", "Impedir o acesso até conferir identidade, motivo e autorização.", "Permitir a entrada porque o adulto afirma conhecer a direção."],
      ["Acessibilidade escolar", "Um aluno com mobilidade reduzida encontra material bloqueando a rota acessível.", "Desobstruir a rota e comunicar a necessidade de mantê-la permanentemente livre.", "Orientar o aluno a usar um caminho inseguro para não alterar a organização."],
      ["Atendimento à família", "Um responsável chega irritado e exige falar imediatamente com um professor em aula.", "Ouvir com respeito, explicar o fluxo e encaminhar a demanda à equipe responsável.", "Levar o responsável diretamente à sala e interromper a aula."],
      ["Medicamentos", "Um estudante entrega um comprimido e pede ajuda para tomá-lo.", "Seguir o protocolo da escola e acionar o responsável competente, sem administrar por iniciativa própria.", "Decidir a dose com base apenas no relato do estudante."],
      ["Sigilo sobre estudantes", "Outro responsável pede detalhes sobre uma ocorrência envolvendo aluno de outra família.", "Preservar a privacidade e encaminhar apenas informações que possam ser legitimamente fornecidas.", "Contar todos os detalhes para demonstrar transparência."],
      ["Suspeita de violência", "Um estudante apresenta sinais preocupantes e relata situação de violência.", "Acolher sem interrogatório, registrar de forma responsável e comunicar imediatamente a equipe competente.", "Prometer segredo absoluto e não comunicar a situação a ninguém."],
      ["Patrimônio escolar", "Um grupo começa a riscar mesas recém-instaladas.", "Interromper a conduta, orientar e registrar o fato para a equipe responsável.", "Aguardar o dano terminar para evitar conflito com os alunos."],
      ["Registro de ocorrências", "Ao final do turno, houve atraso, conflito e atendimento de saúde.", "Registrar fatos, horários, envolvidos e providências com linguagem objetiva.", "Anotar opiniões pessoais e apelidos para tornar o relato mais informal."],
    ],
    "santos-oficial-administracao": [
      ["Protocolo", "Chega um requerimento com anexos e identificação do interessado.", "Registrar recebimento, data, assunto e anexos, gerando rastreabilidade.", "Encaminhar o documento sem protocolo para reduzir uma etapa."],
      ["Classificação documental", "Um documento precisa ser inserido no fluxo administrativo correto.", "Identificar assunto e classe conforme o plano adotado antes do encaminhamento.", "Classificar pelo nome do servidor que recebeu o documento."],
      ["Tramitação", "Um processo será enviado a outro setor para análise.", "Registrar a movimentação, o destino, a data e o responsável pelo envio.", "Entregar o processo sem registrar para que o setor de destino ganhe tempo."],
      ["Controle de prazos", "Há vários processos com datas de resposta diferentes.", "Manter controle atualizado de vencimentos e alertar sobre pendências.", "Confiar apenas na memória e verificar os prazos ao fim do mês."],
      ["Arquivo corrente", "Documentos são consultados diariamente pelo setor produtor.", "Mantê-los no arquivo corrente, organizados para acesso frequente.", "Enviá-los diretamente ao arquivo permanente por serem muito usados."],
      ["Arquivo intermediário", "Processos encerrados deixaram de ser consultados com frequência, mas ainda cumprem prazo de guarda.", "Transferi-los ao arquivo intermediário conforme a tabela de temporalidade.", "Eliminá-los assim que diminuir a frequência de consulta."],
      ["Arquivo permanente", "Uma série documental possui valor histórico e destinação de guarda definitiva.", "Preservá-la no arquivo permanente, mantendo contexto e acesso controlado.", "Descartá-la após digitalização, independentemente da regra de destinação."],
      ["Digitalização documental", "Um processo físico será digitalizado para uso no sistema.", "Conferir sequência, integridade, legibilidade e associação correta dos arquivos.", "Digitalizar apenas a primeira página e presumir que as demais são repetidas."],
      ["Controle de versões", "Uma minuta recebeu alterações de três setores.", "Consolidar as contribuições em versão identificada e preservar rastreabilidade.", "Manter arquivos diferentes com o mesmo nome e escolher um ao acaso."],
      ["Redação oficial", "O setor precisa comunicar decisão administrativa a outra unidade.", "Redigir texto claro, objetivo, impessoal e com identificação da providência.", "Usar gírias e opiniões pessoais para aproximar os setores."],
      ["E-mail institucional", "Um processo contém informação sensível e exige comunicação ao responsável.", "Usar canal institucional, conferir destinatário e limitar o conteúdo ao necessário.", "Enviar a íntegra para lista ampla, sem verificar quem precisa recebê-la."],
      ["Atendimento ao usuário", "Um munícipe pergunta por que seu pedido ainda não foi concluído.", "Consultar o andamento e informar situação, pendência e canal de acompanhamento com clareza.", "Inventar uma data de conclusão para encerrar o atendimento."],
      ["Acesso à informação", "Chega pedido objetivo de cópia de documento público.", "Protocolar e encaminhar a análise de acesso, observando prazo e restrições legais.", "Exigir justificativa ideológica antes de receber o pedido."],
      ["Dados pessoais", "Uma certidão contém dados que não são necessários à finalidade informada.", "Revisar o conteúdo e limitar os dados ao necessário e autorizado.", "Acrescentar outros dados cadastrais para tornar a certidão mais completa."],
      ["Restrição de acesso", "Um processo reúne parte pública e anexo com dados pessoais protegidos.", "Controlar o acesso ao anexo e fornecer a parte acessível quando cabível.", "Negar automaticamente acesso a todo o processo por existir um anexo restrito."],
      ["Correção cadastral", "O usuário comprova que seu endereço foi digitado incorretamente.", "Conferir o documento, corrigir pelo procedimento e registrar a atualização.", "Alterar também outros campos sem confirmação para padronizar o cadastro."],
      ["Planejamento da contratação", "O setor identifica necessidade recorrente de determinado serviço.", "Formalizar a demanda e apoiar o planejamento com objeto, quantidade e justificativa.", "Escolher previamente o fornecedor e adaptar a necessidade à proposta dele."],
      ["Segregação de funções", "A mesma pessoa solicita, autoriza, recebe e atesta toda uma compra.", "Distribuir responsabilidades compatíveis para reduzir erro e conflito de interesses.", "Concentrar todas as etapas na mesma pessoa para acelerar o processo."],
      ["Fiscalização contratual", "A entrega contratada apresenta atraso e qualidade inferior à especificada.", "Registrar evidências e comunicar o fiscal ou gestor para as providências cabíveis.", "Aceitar a entrega sem registro para preservar a relação com o fornecedor."],
      ["Recebimento de materiais", "Chegam caixas cuja quantidade pode divergir da nota e do pedido.", "Conferir quantidade, especificação e condições antes do aceite definitivo.", "Assinar o recebimento sem abrir ou contar as caixas."],
      ["Inventário", "O saldo físico de determinado item difere do saldo do sistema.", "Recontar, verificar movimentações e registrar a apuração da divergência.", "Alterar o sistema para igualar ao saldo físico sem investigar a causa."],
      ["Estoque mínimo", "O consumo aumentou e um material essencial se aproxima do nível mínimo.", "Registrar a necessidade de reposição com antecedência e base no consumo.", "Esperar o item acabar para só então iniciar o pedido."],
      ["Instrução processual", "Um processo retorna porque falta documento indispensável à decisão.", "Identificar a pendência, solicitar a complementação e registrar a providência.", "Inserir documento de outro processo apenas para completar o volume."],
      ["Despacho administrativo", "O processo está pronto para análise técnica de outro setor.", "Elaborar despacho objetivo com destino, providência solicitada e identificação.", "Encaminhar folha em branco e explicar a demanda apenas por telefone."],
      ["Continuidade de sistemas", "Uma indisponibilidade temporária impede registrar atendimentos no sistema.", "Aplicar o procedimento de contingência e lançar os registros quando o sistema retornar.", "Deixar de registrar definitivamente as demandas recebidas durante a falha."],
    ],
  };

  function specificQuestions(role) {
    return specificTopics[role.id].flatMap(([assunto, scenario, correct, pitfall], topicIndex) => {
      const sourceLink = assunto.includes("Acesso à informação") ? officialLinks.lai
        : assunto.includes("Dados pessoais") || assunto.includes("Restrição de acesso") ? officialLinks.lgpd
          : assunto.includes("Atendimento prioritário") ? officialLinks.prioritario
            : assunto.includes("Acessibilidade") ? officialLinks.pcd
              : assunto.includes("Suspeita de violência") ? officialLinks.eca
                : assunto.includes("Planejamento da contratação") || assunto.includes("Fiscalização contratual") ? officialLinks.compras
                  : role.officialUrl;
      const topicLabel = assunto.toLocaleLowerCase("pt-BR");
      const directDistractorTemplates = [
        `Limitar-se a comunicar o caso de ${topicLabel} a outro setor, sem executar a verificação ou a medida imediata que cabe ao cargo.`,
        `Executar apenas a etapa mais rápida de ${topicLabel}, sem conferir as condições descritas nem acompanhar o resultado.`,
        `Tratar ${topicLabel} como ocorrência concluída antes de aplicar o procedimento previsto e verificar o desfecho.`,
        `Transferir integralmente a decisão sobre ${topicLabel} à pessoa atendida, embora a conferência inicial caiba ao servidor.`,
      ];
      const selectedDistractors = stablePermutation(
        directDistractorTemplates.length,
        `${role.id}::${assunto}::distratores`,
      ).slice(0, 2).map((index) => directDistractorTemplates[index]);
      return [
        {
          assunto,
          enunciado: `Na rotina de ${role.cargo} da Prefeitura de Santos, ocorre a seguinte situação: ${scenario} Qual é a providência mais adequada?`,
          correct,
          distractors: [pitfall, ...selectedDistractors],
          comentario: `${correct} Essa conduta preserva segurança, rastreabilidade, atendimento adequado e os limites de atuação do cargo. A opção “${pitfall}” descreve justamente a falha que deve ser evitada.`,
          link: sourceLink,
        },
        {
          assunto: `${assunto} — registro e controle`,
          enunciado: `Após a atuação do ${role.cargo.toLocaleLowerCase("pt-BR")} neste caso — ${scenario} — qual registro demonstra controle adequado da ocorrência?`,
          correct: `Registrar os fatos, a providência adotada e o resultado observado, deixando claro que a atuação consistiu em ${lowerAction(correct)}.`,
          distractors: [
            `Registrar como providência a conduta de ${lowerAction(pitfall)}, sem indicar o risco ou a pendência que permaneceu.`,
            topicIndex % 2 === 0
              ? `Anotar apenas “${assunto}: resolvido”, sem descrever os fatos, a providência nem o resultado.`
              : `Anotar somente a data de ${topicLabel}, sem identificar o fato, a medida adotada ou o resultado.`,
            topicIndex % 3 === 0
              ? `Substituir o registro do caso de ${topicLabel} por uma opinião pessoal sobre os envolvidos.`
              : `Relatar o caso de ${topicLabel} com suposições sobre os envolvidos, sem separar fatos de avaliações pessoais.`,
          ],
          comentario: `O registro deve reproduzir fatos verificáveis, providências adotadas e resultado, permitindo continuidade e rastreabilidade. Ele não deve validar a conduta de ${lowerAction(pitfall)} nem substituir dados objetivos por opinião pessoal.`,
          link: sourceLink,
        },
      ];
    });
  }

  function addQuestion(role, sequence, disciplina, bloco, spec, localIndex) {
    const prefix = role.id === "santos-agente-portaria" ? "IBAM-AGP" : role.id === "santos-inspetor-alunos" ? "IBAM-INSP" : "IBAM-OFI";
    const questionId = `${prefix}-${String(sequence).padStart(3, "0")}`;
    const answerIndex = stableAnswerIndex(`${role.id}::${disciplina}`, localIndex);
    const closingPrompt = disciplina === "Legislação Municipal e Serviço Público"
      ? "Considerando a legislação aplicável, assinale a conduta correta."
      : "Considerando as boas práticas de informática e rotina administrativa, assinale a conduta correta.";
    bank.push({
      id: questionId,
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
      assunto: spec.assunto,
      subassunto: normalize(spec.assunto),
      tipo: "multipleChoice",
      dificuldade: difficultyFor(disciplina, spec, localIndex),
      peso: role.weights[disciplina],
      enunciado: `Questão para o cargo ${role.cargo}: ${spec.enunciado || `${spec.scenario(roleLanguage[role.id])} ${closingPrompt}`}`,
      alternativas: optionSet(spec.correct, spec.distractors, answerIndex),
      gabarito: answerIndex,
      comentario: `${spec.comentario} No cargo ${role.cargo}, esse conhecimento deve orientar decisões objetivas e registráveis dentro das atribuições previstas no edital.`,
      fonte: spec.fonte || `Questão autoral baseada no ${role.editalCompleto} e na página oficial do IBAM/PREFEITURA DE SANTOS.`,
      link: spec.link || role.officialUrl,
      tags: ["ibam", "santos", normalize(role.cargo), normalize(disciplina), normalize(spec.assunto)],
    });
  }

  function generateRoleQuestions(role, totals, roleIndex) {
    let sequence = 1;
    const sources = [
      ["Língua Portuguesa", "Português", totals.portugues, portugueseQuestions(role)],
      ["Matemática", "Matemática", totals.matematica, mathematicsQuestions(role, roleIndex)],
      ["Legislação Municipal e Serviço Público", "Legislação e Serviço Público", totals.legislacao, legalQuestions],
      ["Informática e Rotinas", "Informática e Rotinas", totals.informatica, informaticsQuestions],
      ["Conhecimentos Específicos", "Conhecimentos Específicos", totals.especificos, specificQuestions(role)],
    ];
    for (const [disciplina, bloco, total, specs] of sources) {
      if (specs.length < total) throw new Error(`Banco insuficiente para ${role.cargo} — ${disciplina}.`);
      for (let localIndex = 0; localIndex < total; localIndex += 1) {
        addQuestion(role, sequence, disciplina, bloco, specs[localIndex], localIndex);
        sequence += 1;
      }
    }
  }

  roles.forEach((role, roleIndex) => {
    if (role.id === "santos-oficial-administracao") {
      generateRoleQuestions(role, { portugues: 14, matematica: 10, legislacao: 14, informatica: 12, especificos: 50 }, roleIndex);
    } else {
      generateRoleQuestions(role, { portugues: 12, matematica: 8, legislacao: 12, informatica: 10, especificos: 38 }, roleIndex);
    }
  });

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
      subassunto: normalize(assunto),
      tipo: "administrativeWriting",
      dificuldade: index % 3 === 0 ? "facil" : index % 3 === 1 ? "medio" : "dificil",
      peso: 40,
      enunciado: `Redija, sem título, um texto técnico-administrativo de 20 a 30 linhas para ${task}. Apresente contexto, providência e encaminhamento de modo claro, objetivo, impessoal e formal, preservando o sigilo e os dados pessoais.`,
      resposta_esperada: "Estrutura esperada: contextualização objetiva da demanda; desenvolvimento coerente com informações necessárias; providência ou encaminhamento; prazo ou canal de acompanhamento quando cabível; conclusão compatível com a comunicação administrativa. O texto deve ter de 20 a 30 linhas e não deve conter título.",
      comentario: "Matriz do Edital nº 71/2026: conteúdo e desenvolvimento do tema valem até 25 pontos; domínio da norma-padrão da língua portuguesa vale até 15 pontos. Cada desvio gramatical identificado desconta 0,5 ponto, observados os demais critérios de correção e as hipóteses de nota zero previstas no edital.",
      fonte: "Proposta autoral baseada no Edital nº 71/2026 — SEPLA-RH para Oficial de Administração.",
      link: officialLinks.edital71,
      tags: ["ibam", "santos", "oficial-administracao", "redacao-administrativa", normalize(assunto)],
    });
  });
})();
