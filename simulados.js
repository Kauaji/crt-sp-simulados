// Banco autoral e estático. As questões são inéditas, não copiam provas reais e
// foram estruturadas a partir de editais, legislação oficial e padrão das bancas.
"use strict";

(function bootstrapStudyData() {
  const LETTERS = ["A", "B", "C", "D", "E"];
  const CREATED_AT = "2026-07-18";

  const SOURCES = {
    crt_edital: {
      title: "Edital CRT-SP 2026 — Quadrix",
      url: "https://quadrix.org.br/informacoes/3048/",
      type: "edital",
    },
    crt_pdf: {
      title: "Edital nº 1/2026 CRT-SP — PDF oficial Quadrix",
      url: "https://anexos.cdn.selecao.net.br/uploads/861/concursos/3048/anexos/112a19c5-d933-4299-9095-18ea5a82758e.pdf",
      type: "edital",
    },
    ibge_edital: {
      title: "PSS IBGE Censo 2026 — Instituto Avalia",
      url: "https://www.avalia.org.br/concursos/618",
      type: "edital",
    },
    ibge_pdf: {
      title: "Edital IBGE PSS Censo Agropecuário, Florestal e Aquícola 2026",
      url: "https://ftp.ibge.gov.br/edital/PSS_Censo_Agro/2026_02/Edital_2_2026_AC_ACQ_Edital_de_Abertura.pdf",
      type: "edital",
    },
    ibge_conteudo: {
      title: "Conteúdos programáticos IBGE PSS 2026",
      url: "https://ftp.ibge.gov.br/edital/PSS_Censo_Agro/2026_02/Edital_2_2026_AC_ACQ_Conteudos_Programaticos.pdf",
      type: "edital",
    },
    santos_edital: {
      title: "Concurso Prefeitura de Santos 71/2026 — IBAM",
      url: "https://www.ibamsp-concursos.org.br/informacoes/176/",
      type: "edital",
    },
    santos_pdf: {
      title: "Edital nº 71/2026 Prefeitura de Santos — PDF oficial IBAM",
      url: "https://anexos-r2.selecao.net.br/uploads/810/concursos/176/anexos/8f64e592-4e52-4aca-877c-f7e1179684e1.pdf",
      type: "edital",
    },
    santos_noticia: {
      title: "Prefeitura de Santos — notícia oficial do concurso 2026",
      url: "https://www.santos.sp.gov.br/?q=noticia%2Fsantos-abre-concurso-com-226-vagas-para-niveis-fundamental-medio-e-superior",
      type: "orgao",
    },
    pmsp_vunesp: {
      title: "VUNESP — PM-SP Aluno-Soldado PM 2026",
      url: "https://www.vunesp.com.br/PMES2601",
      type: "edital",
    },
    pmsp_agencia_sp: {
      title: "Agência SP — PM de SP abre inscrições para 2 mil vagas",
      url: "https://www.agenciasp.sp.gov.br/policia-militar-de-sp-inscreve-para-2-mil-vagas-de-soldados-ate-agosto-veja-requisitos-e-etapas-do-concurso/",
      type: "orgao",
    },
    pmsp_concursos: {
      title: "Concursos Polícia Militar do Estado de São Paulo",
      url: "https://concursos.policiamilitar.sp.gov.br/",
      type: "orgao",
    },
    lei_13639: {
      title: "Lei 13.639/2018",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13639.htm",
      type: "legislacao",
    },
    lei_5524: {
      title: "Lei 5.524/1968",
      url: "https://www.planalto.gov.br/ccivil_03/leis/l5524.htm",
      type: "legislacao",
    },
    decreto_90922: {
      title: "Decreto 90.922/1985",
      url: "https://www.planalto.gov.br/ccivil_03/decreto/antigos/d90922.htm",
      type: "legislacao",
    },
    decreto_4560: {
      title: "Decreto 4.560/2002",
      url: "https://www.planalto.gov.br/ccivil_03/decreto/2002/D4560.htm",
      type: "legislacao",
    },
    lei_9784: {
      title: "Lei 9.784/1999",
      url: "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm",
      type: "legislacao",
    },
    lai: {
      title: "Lei 12.527/2011 — LAI",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm",
      type: "legislacao",
    },
    lgpd: {
      title: "Lei 13.709/2018 — LGPD",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      type: "legislacao",
    },
    improbidade: {
      title: "Lei 8.429/1992 — Improbidade Administrativa",
      url: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm",
      type: "legislacao",
    },
    crt_sp: {
      title: "Portal oficial CRT-SP",
      url: "https://crtsp.gov.br/",
      type: "orgao",
    },
    cft_resolucoes: {
      title: "Resoluções oficiais do CFT",
      url: "https://cft.org.br/category/resolucoes/",
      type: "norma",
    },
    manual_redacao: {
      title: "Manual de Redação da Presidência da República",
      url: "https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf",
      type: "manual",
    },
  };

  const USERS = [
    { id: "kaua", username: "kaua", displayName: "Kauã", initial: "K", accent: "verde" },
    { id: "vitoria", username: "vitoria", displayName: "Vitória", initial: "V", accent: "coral" },
    { id: "caio", username: "caio", displayName: "Caio", initial: "C", accent: "azul" },
    { id: "mequis", username: "mequis", displayName: "Mequis", initial: "M", accent: "roxo" },
  ];

  const CONCURSOS = [
    {
      id: "crt-sp",
      priority: 1,
      nome: "CRT-SP",
      orgao: "Conselho Regional dos Técnicos Industriais do Estado de São Paulo",
      banca: "Quadrix",
      status: "Em andamento",
      edital: "Edital nº 1/2026",
      editalUrl: SOURCES.crt_edital.url,
      dataPublicacao: "2026-05-18",
      dataProva: "2026-08-02",
      nivel: "Ensino médio",
      cargoPrincipal: "Técnico Administrativo — Baixada Santista",
      defaultRoleId: "crt-tecnico-administrativo-bs",
      formatos: ["certo_errado"],
      scoringDescription: "+1 por acerto, −1 por erro, 0 em branco",
      criterios: [
        "Prova objetiva no padrão Certo/Errado da Quadrix.",
        "Pontuação líquida com penalização por erro.",
        "Sem redação/prova discursiva para Técnico Administrativo e Fiscal no recorte implementado.",
      ],
      roles: [
        {
          id: "crt-tecnico-administrativo-bs",
          nome: "Técnico Administrativo — Baixada Santista",
          principal: true,
          escolaridade: "Ensino médio",
          exam: {
            formato: "certo_errado",
            totalQuestoes: 120,
            duracaoMinutos: 180,
            scoring: { correct: 1, wrong: -1, blank: 0 },
            minima: { total: 36, "Conhecimentos básicos": 10, "Conhecimentos complementares": 8, "Conhecimentos específicos": 17 },
            distribution: [
              { kind: "bloco", id: "Conhecimentos básicos", label: "Conhecimentos básicos", count: 40 },
              { kind: "bloco", id: "Conhecimentos complementares", label: "Conhecimentos complementares", count: 30 },
              { kind: "bloco", id: "Conhecimentos específicos", label: "Conhecimentos específicos", count: 50 },
            ],
          },
        },
        {
          id: "crt-fiscal-bs",
          nome: "Fiscal — Baixada Santista",
          principal: false,
          escolaridade: "Ensino médio/técnico conforme edital",
          exam: {
            formato: "certo_errado",
            totalQuestoes: 120,
            duracaoMinutos: 180,
            scoring: { correct: 1, wrong: -1, blank: 0 },
            minima: { total: 36, "Conhecimentos básicos": 10, "Conhecimentos complementares": 8, "Conhecimentos específicos": 17 },
            distribution: [
              { kind: "bloco", id: "Conhecimentos básicos", label: "Conhecimentos básicos", count: 40 },
              { kind: "bloco", id: "Conhecimentos complementares", label: "Conhecimentos complementares", count: 30 },
              { kind: "bloco", id: "Conhecimentos específicos", label: "Conhecimentos específicos", count: 50 },
            ],
          },
        },
      ],
      materias: [
        { id: "crt-portugues", nome: "Português", bloco: "Conhecimentos básicos", assuntos: ["Interpretação", "Crase", "Concordância", "Regência", "Pontuação", "Coesão"] },
        { id: "crt-rlm", nome: "Raciocínio Lógico/Matemática", bloco: "Conhecimentos básicos", assuntos: ["Porcentagem", "Proposições", "Conjuntos", "Sequências", "Regra de três"] },
        { id: "crt-informatica", nome: "Informática", bloco: "Conhecimentos básicos", assuntos: ["Segurança da informação", "Pacote Office", "Internet", "Nuvem", "LGPD aplicada"] },
        { id: "crt-etica", nome: "Ética", bloco: "Conhecimentos complementares", assuntos: ["Ética no serviço", "Conduta", "Integridade"] },
        { id: "crt-adm-publica", nome: "Administração Pública", bloco: "Conhecimentos complementares", assuntos: ["Princípios", "Organização administrativa", "Atos administrativos"] },
        { id: "crt-lai", nome: "LAI", bloco: "Conhecimentos complementares", assuntos: ["Transparência ativa", "Transparência passiva", "Sigilo"] },
        { id: "crt-lgpd", nome: "LGPD", bloco: "Conhecimentos complementares", assuntos: ["Princípios", "Bases legais", "Dados sensíveis", "Poder público"] },
        { id: "crt-improbidade", nome: "Lei 8.429/1992", bloco: "Conhecimentos complementares", assuntos: ["Dolo", "Sanções", "Atos de improbidade"] },
        { id: "crt-processo-adm", nome: "Lei 9.784/1999", bloco: "Conhecimentos complementares", assuntos: ["Princípios", "Motivação", "Competência", "Recursos"] },
        { id: "crt-adm-geral", nome: "Administração Geral e Pública", bloco: "Conhecimentos específicos", assuntos: ["Funções administrativas", "Planejamento", "Controle", "Qualidade"] },
        { id: "crt-rotinas", nome: "Rotinas administrativas", bloco: "Conhecimentos específicos", assuntos: ["Checklists", "Triagem", "Fluxos", "Rastreabilidade"] },
        { id: "crt-redacao", nome: "Redação oficial", bloco: "Conhecimentos específicos", assuntos: ["Clareza", "Impessoalidade", "Concisão", "Padronização"] },
        { id: "crt-protocolo", nome: "Protocolo e arquivo", bloco: "Conhecimentos específicos", assuntos: ["Autuação", "Temporalidade", "Arquivo corrente", "Tramitação"] },
        { id: "crt-atendimento", nome: "Atendimento ao público", bloco: "Conhecimentos específicos", assuntos: ["Escuta ativa", "Linguagem simples", "Inclusão", "Encaminhamento"] },
        { id: "crt-materiais", nome: "Materiais e estoques", bloco: "Conhecimentos específicos", assuntos: ["Curva ABC", "PEPS", "Inventário", "Estoque de segurança"] },
        { id: "crt-logistica", nome: "Logística", bloco: "Conhecimentos específicos", assuntos: ["Armazenagem", "Lead time", "Distribuição"] },
        { id: "crt-licitacoes", nome: "Licitações e contratos", bloco: "Conhecimentos específicos", assuntos: ["Lei 14.133/2021", "Pregão", "Dispensa", "Fiscalização contratual"] },
        { id: "crt-sistema", nome: "Sistema CFT/CRT-SP", bloco: "Conhecimentos específicos", assuntos: ["Lei 13.639/2018", "Lei 5.524/1968", "Decretos", "Regimento", "Resoluções CFT"] },
      ],
      studySuggestions: [
        "Priorize lei seca do Sistema CFT/CRT-SP nos dias de baixa energia: é conteúdo de alta cobrança e baixo ruído.",
        "Faça 40 itens Certo/Errado por dia e revise os erros antes de abrir matéria nova.",
        "Em Português, corrija a justificativa: a Quadrix costuma cobrar a razão da regra, não só o resultado.",
      ],
    },
    {
      id: "ibge",
      priority: 2,
      nome: "IBGE",
      orgao: "Instituto Brasileiro de Geografia e Estatística",
      banca: "Instituto Avalia",
      status: "Em andamento",
      edital: "PSS Censo Agropecuário, Florestal e Aquícola 2026",
      editalUrl: SOURCES.ibge_pdf.url,
      dataPublicacao: "2026-07-07",
      dataProva: "2026-08-30",
      nivel: "Ensino médio e superior",
      cargoPrincipal: "Agente Censitário de Qualidade",
      defaultRoleId: "ibge-acq",
      formatos: ["multipla_escolha"],
      scoringDescription: "+1 por acerto, 0 por erro ou branco",
      criterios: [
        "Prova objetiva com 60 questões de múltipla escolha.",
        "Critérios mínimos do edital devem ser acompanhados no PDF oficial.",
        "Perfis separados para ACQ e Analista em TI/Dados.",
      ],
      roles: [
        {
          id: "ibge-acq",
          nome: "Agente Censitário de Qualidade",
          principal: true,
          escolaridade: "Ensino médio",
          exam: {
            formato: "multipla_escolha",
            totalQuestoes: 60,
            duracaoMinutos: 240,
            scoring: { correct: 1, wrong: 0, blank: 0 },
            minima: { totalPercent: 40, disciplinaPercent: 30 },
            distribution: [
              { kind: "materia", id: "ibge-acq-portugues", label: "Língua Portuguesa", count: 15 },
              { kind: "materia", id: "ibge-acq-rlm", label: "Raciocínio Lógico/Matemático", count: 10 },
              { kind: "materia", id: "ibge-acq-geografia", label: "Geografia", count: 15 },
              { kind: "materia", id: "ibge-acq-tecnicos", label: "Conhecimentos técnicos", count: 20 },
            ],
          },
        },
        {
          id: "ibge-analista-ti-dados",
          nome: "Analista Censitário — TI, Desenvolvimento e Ciência de Dados",
          principal: false,
          escolaridade: "Ensino superior",
          exam: {
            formato: "multipla_escolha",
            totalQuestoes: 60,
            duracaoMinutos: 240,
            scoring: { correct: 1, wrong: 0, blank: 0 },
            minima: { totalPercent: 40, disciplinaPercent: 30 },
            distribution: [
              { kind: "materia", id: "ibge-ana-portugues", label: "Língua Portuguesa", count: 15 },
              { kind: "materia", id: "ibge-ana-rlm", label: "Raciocínio Lógico/Matemático", count: 10 },
              { kind: "materia", id: "ibge-ana-especificos", label: "Conhecimentos específicos de TI e Dados", count: 35 },
            ],
          },
        },
      ],
      materias: [
        { id: "ibge-acq-portugues", roleIds: ["ibge-acq"], nome: "Língua Portuguesa", bloco: "Conhecimentos gerais", assuntos: ["Interpretação", "Gramática", "Coesão", "Pontuação"] },
        { id: "ibge-acq-rlm", roleIds: ["ibge-acq"], nome: "Raciocínio Lógico/Matemático", bloco: "Conhecimentos gerais", assuntos: ["Porcentagem", "Razões", "Probabilidade", "Lógica"] },
        { id: "ibge-acq-geografia", roleIds: ["ibge-acq"], nome: "Geografia", bloco: "Conhecimentos gerais", assuntos: ["Território", "População", "Cartografia", "Brasil regional"] },
        { id: "ibge-acq-tecnicos", roleIds: ["ibge-acq"], nome: "Conhecimentos técnicos", bloco: "Conhecimentos específicos", assuntos: ["Censos", "Coleta", "Qualidade", "Sigilo estatístico"] },
        { id: "ibge-ana-portugues", roleIds: ["ibge-analista-ti-dados"], nome: "Língua Portuguesa", bloco: "Conhecimentos gerais", assuntos: ["Interpretação", "Coesão", "Sintaxe", "Pontuação"] },
        { id: "ibge-ana-rlm", roleIds: ["ibge-analista-ti-dados"], nome: "Raciocínio Lógico/Matemático", bloco: "Conhecimentos gerais", assuntos: ["Lógica", "Probabilidade", "Análise combinatória", "Estatística básica"] },
        { id: "ibge-ana-especificos", roleIds: ["ibge-analista-ti-dados"], nome: "Conhecimentos específicos de TI e Dados", bloco: "Conhecimentos específicos", assuntos: ["Algoritmos", "Banco de dados", "Engenharia de software", "APIs", "Segurança", "Ciência de dados", "LGPD/LAI"] },
      ],
      studySuggestions: [
        "Para ACQ, alterne Geografia e Conhecimentos Técnicos: qualidade de coleta costuma exigir leitura atenta de contexto.",
        "Para Analista, faça blocos curtos de banco de dados, algoritmos e segurança, sempre com revisão de erros.",
        "Treine múltipla escolha eliminando alternativas: Instituto Avalia tende a cobrar precisão conceitual.",
      ],
    },
    {
      id: "santos-oficial",
      priority: 3,
      nome: "Prefeitura de Santos",
      orgao: "Município de Santos",
      banca: "IBAM",
      status: "Em andamento",
      edital: "Edital nº 71/2026",
      editalUrl: SOURCES.santos_edital.url,
      dataPublicacao: "2026-07-17",
      dataProva: "2026-09-27",
      nivel: "Ensino médio",
      cargoPrincipal: "Oficial de Administração",
      defaultRoleId: "santos-oficial-administracao",
      formatos: ["multipla_escolha", "redacao"],
      scoringDescription: "+1 por acerto na objetiva; redação avaliada separadamente",
      criterios: [
        "Prova objetiva em múltipla escolha.",
        "Edital prevê redação de 20 a 30 linhas para cargos indicados; confira convocação e critérios no PDF.",
        "Banco focado em Oficial de Administração, com Legislação Municipal e rotinas administrativas.",
      ],
      roles: [
        {
          id: "santos-oficial-administracao",
          nome: "Oficial de Administração",
          principal: true,
          escolaridade: "Ensino médio",
          exam: {
            formato: "multipla_escolha",
            totalQuestoes: 50,
            duracaoMinutos: 240,
            scoring: { correct: 1, wrong: 0, blank: 0 },
            minima: { redacao: 20 },
            distribution: [
              { kind: "materia", id: "santos-portugues", label: "Língua Portuguesa", count: 15 },
              { kind: "materia", id: "santos-matematica", label: "Matemática", count: 10 },
              { kind: "materia", id: "santos-legislacao", label: "Legislação municipal e serviço público", count: 10 },
              { kind: "materia", id: "santos-especificos", label: "Conhecimentos específicos administrativos", count: 15 },
            ],
            writing: {
              tipo: "redacao",
              linhas: "20 a 30 linhas",
              minima: 20,
              propostas: [
                "Atendimento público eficiente e linguagem simples na administração municipal.",
                "Uso responsável de dados pessoais na prestação de serviços públicos locais.",
                "Organização documental como garantia de transparência e continuidade administrativa.",
              ],
            },
          },
        },
      ],
      materias: [
        { id: "santos-portugues", nome: "Língua Portuguesa", bloco: "Conhecimentos gerais", assuntos: ["Interpretação", "Ortografia", "Concordância", "Regência", "Pontuação"] },
        { id: "santos-matematica", nome: "Matemática", bloco: "Conhecimentos gerais", assuntos: ["Porcentagem", "Razões", "Problemas", "Juros simples", "Noções de estatística"] },
        { id: "santos-legislacao", nome: "Legislação municipal e serviço público", bloco: "Legislação", assuntos: ["Administração municipal", "Serviço público", "Ética", "Direitos e deveres"] },
        { id: "santos-especificos", nome: "Conhecimentos específicos administrativos", bloco: "Conhecimentos específicos", assuntos: ["Protocolo", "Arquivo", "Atendimento", "Redação oficial", "Material e patrimônio"] },
      ],
      studySuggestions: [
        "No IBAM, leia a alternativa inteira: pequenas palavras mudam o sentido de afirmações administrativas.",
        "Treine Português com interpretação e gramática aplicada, porque a banca mistura regra com texto.",
        "Uma vez por semana, escreva redação de 20 a 30 linhas e corrija clareza, coesão e respeito ao tema.",
      ],
    },
    {
      id: "pm-sp",
      priority: 4,
      nome: "PM-SP",
      orgao: "Polícia Militar do Estado de São Paulo",
      banca: "VUNESP",
      status: "Inscrições abertas",
      edital: "Edital DP-3/321/26",
      editalUrl: SOURCES.pmsp_vunesp.url,
      dataPublicacao: "2026-06-03",
      dataProva: "2026-09-20",
      nivel: "Ensino médio",
      cargoPrincipal: "Aluno-Soldado PM do Quadro de Praças",
      defaultRoleId: "pmsp-aluno-soldado-qp",
      formatos: ["multipla_escolha", "redacao"],
      scoringDescription: "+1 por acerto na objetiva; redação/dissertativa avaliada separadamente",
      criterios: [
        "Prova objetiva de múltipla escolha no padrão VUNESP.",
        "Exames de Conhecimentos com Parte I objetiva e Parte II dissertativa/redação no mesmo dia.",
        "Duração total de 5 horas para objetiva e dissertativa, conforme divulgação oficial do Governo SP.",
      ],
      roles: [
        {
          id: "pmsp-aluno-soldado-qp",
          nome: "Aluno-Soldado PM do Quadro de Praças",
          principal: true,
          escolaridade: "Ensino médio completo",
          exam: {
            formato: "multipla_escolha",
            totalQuestoes: 60,
            duracaoMinutos: 300,
            scoring: { correct: 1, wrong: 0, blank: 0 },
            minima: { objetiva: 30, redacao: 20 },
            distribution: [
              { kind: "materia", id: "pmsp-portugues", label: "Língua Portuguesa e Interpretação de Texto", count: 20 },
              { kind: "materia", id: "pmsp-matematica", label: "Matemática", count: 15 },
              { kind: "materia", id: "pmsp-conhecimentos-gerais", label: "Conhecimentos Gerais", count: 15 },
              { kind: "materia", id: "pmsp-informatica", label: "Noções Básicas de Informática", count: 5 },
              { kind: "materia", id: "pmsp-administracao-publica", label: "Noções de Administração Pública", count: 5 },
            ],
            writing: {
              tipo: "redacao",
              linhas: "texto dissertativo em padrão VUNESP",
              minima: 20,
              propostas: [
                "O papel da Polícia Militar na proteção da vida e na preservação da ordem pública.",
                "Tecnologia, cidadania e limites éticos no policiamento ostensivo.",
                "Respeito aos direitos humanos como fundamento da atuação policial.",
              ],
            },
          },
        },
      ],
      materias: [
        { id: "pmsp-portugues", nome: "Língua Portuguesa e Interpretação de Texto", bloco: "Conhecimentos gerais", assuntos: ["Interpretação", "Coesão", "Concordância", "Regência", "Pontuação"] },
        { id: "pmsp-matematica", nome: "Matemática", bloco: "Conhecimentos gerais", assuntos: ["Porcentagem", "Razão e proporção", "Equações", "Geometria", "Estatística"] },
        { id: "pmsp-conhecimentos-gerais", nome: "Conhecimentos Gerais", bloco: "Conhecimentos gerais", assuntos: ["Atualidades", "História do Brasil", "Geografia do Brasil", "Cidadania", "Segurança pública"] },
        { id: "pmsp-informatica", nome: "Noções Básicas de Informática", bloco: "Conhecimentos gerais", assuntos: ["Internet", "Segurança da informação", "Pacote Office", "Sistemas operacionais"] },
        { id: "pmsp-administracao-publica", nome: "Noções de Administração Pública", bloco: "Conhecimentos gerais", assuntos: ["Constituição Federal", "Constituição do Estado de São Paulo", "Lei de Acesso à Informação", "Princípios administrativos"] },
      ],
      studySuggestions: [
        "Treine objetiva e redação no mesmo bloco de estudo para simular a gestão real das 5 horas.",
        "Em VUNESP, leia todas as alternativas antes de marcar: duas costumam parecer boas, mas uma é mais precisa.",
        "Intercale Português/Matemática com Conhecimentos Gerais para não deixar a parte de base roubar energia da redação.",
      ],
    },
  ];

  const CE_CONTEXTS = [
    "No atendimento presencial de um conselho profissional",
    "Durante a tramitação de processo administrativo",
    "Em relatório interno encaminhado à chefia imediata",
    "Na conferência de documentos recebidos por protocolo",
    "Em ação de orientação ao público externo",
    "Na preparação de comunicado oficial",
    "Em rotina de fiscalização e apoio administrativo",
    "No controle de demandas da unidade da Baixada Santista",
  ];

  const MC_CONTEXTS = [
    "Considere uma situação administrativa realista",
    "Em uma prova objetiva de nível médio",
    "Durante o planejamento de uma atividade pública",
    "Ao analisar documentos e rotinas de trabalho",
    "Em contexto de atendimento ao cidadão",
    "No acompanhamento de indicadores e informações oficiais",
    "No exercício de função administrativa",
    "Em uma demanda típica do edital",
  ];

  const CE_FACTS = {
    portugues: [
      {
        certo: "o sinal indicativo de crase depende, em regra, da presença simultânea de preposição e artigo feminino.",
        errado: "o sinal indicativo de crase é obrigatório antes de qualquer palavra feminina, ainda que não haja preposição exigida.",
        exp: "A crase resulta da fusão de duas vogais 'a', normalmente preposição mais artigo ou pronome demonstrativo compatível.",
      },
      {
        certo: "com sentido de existir, o verbo haver é impessoal e permanece no singular.",
        errado: "com sentido de existir, o verbo haver concorda obrigatoriamente com o termo plural que o acompanha.",
        exp: "O verbo haver existencial não possui sujeito e deve ficar na terceira pessoa do singular.",
      },
      {
        certo: "não se separa por vírgula o verbo de seu complemento direto ou indireto sem justificativa sintática.",
        errado: "a vírgula entre verbo e complemento é sempre recomendável para marcar pausa de leitura.",
        exp: "Pontuação não se orienta por pausa psicológica; a vírgula não deve romper a relação verbo-complemento.",
      },
      {
        certo: "coesão textual exige conexão clara entre ideias, evitando retomadas ambíguas.",
        errado: "coesão textual é dispensável em documentos oficiais quando o assunto é simples.",
        exp: "Documentos oficiais dependem de clareza, encadeamento lógico e retomadas precisas.",
      },
      {
        certo: "a concordância nominal deve harmonizar determinantes e nomes quanto a gênero e número.",
        errado: "a concordância nominal permite que artigos e adjetivos discordem livremente do substantivo em texto oficial.",
        exp: "A norma-padrão exige concordância entre os termos do grupo nominal.",
      },
    ],
    rlm: [
      {
        certo: "a negação de 'todos os protocolos foram conferidos' admite a existência de pelo menos um protocolo não conferido.",
        errado: "a negação de 'todos os protocolos foram conferidos' é 'nenhum protocolo foi conferido'.",
        exp: "A negação de uma proposição universal afirmativa é uma proposição particular negativa.",
      },
      {
        certo: "aumento de 20% seguido de desconto de 20% não retorna, em regra, ao valor inicial.",
        errado: "aumento de 20% seguido de desconto de 20% sempre devolve exatamente o valor inicial.",
        exp: "As bases de cálculo são diferentes; 120 reduzido em 20% vira 96, não 100.",
      },
      {
        certo: "em regra de três composta, deve-se identificar se cada grandeza é direta ou inversamente proporcional.",
        errado: "todas as grandezas em regra de três composta são necessariamente diretamente proporcionais.",
        exp: "A relação pode ser direta ou inversa, conforme o comportamento das variáveis.",
      },
      {
        certo: "se A está contido em B, todo elemento de A também pertence a B.",
        errado: "se A está contido em B, todo elemento de B também pertence necessariamente a A.",
        exp: "A inclusão A ⊂ B não implica igualdade entre conjuntos.",
      },
    ],
    informatica: [
      {
        certo: "autenticação em dois fatores reduz risco de acesso indevido mesmo quando a senha é comprometida.",
        errado: "autenticação em dois fatores elimina totalmente qualquer risco de fraude digital.",
        exp: "O segundo fator aumenta a segurança, mas não elimina todos os riscos.",
      },
      {
        certo: "backup periódico deve ser testado para verificar possibilidade real de restauração.",
        errado: "backup só precisa existir; testes de restauração são dispensáveis em ambiente administrativo.",
        exp: "Backup sem restauração testada pode falhar no momento crítico.",
      },
      {
        certo: "phishing pode ocorrer por e-mail, mensagens e páginas falsas que simulam serviços legítimos.",
        errado: "phishing ocorre apenas por anexos executáveis enviados por e-mail.",
        exp: "Golpes de engenharia social usam múltiplos canais e formatos.",
      },
      {
        certo: "planilhas permitem fórmulas, filtros e validação, mas exigem controle para evitar erro de versão.",
        errado: "planilhas compartilhadas não precisam de controle de versão por serem automaticamente corretas.",
        exp: "Colaboração digital exige governança, permissões e rastreabilidade.",
      },
    ],
    etica: [
      {
        certo: "ética no serviço público envolve finalidade pública, urbanidade, integridade e respeito ao usuário.",
        errado: "ética administrativa se resume a cumprir ordens superiores, ainda que contrárias ao interesse público.",
        exp: "Cumprimento de ordens não afasta legalidade, moralidade e finalidade pública.",
      },
      {
        certo: "conflito de interesses deve ser prevenido, declarado e tratado com transparência.",
        errado: "conflito de interesses só existe se houver prejuízo financeiro comprovado.",
        exp: "O conflito pode comprometer imparcialidade mesmo antes de dano material.",
      },
    ],
    administracaoPublica: [
      {
        certo: "a eficiência administrativa não autoriza afastar a legalidade.",
        errado: "a eficiência permite descumprir formalidade legal sempre que o resultado parecer melhor.",
        exp: "Princípios administrativos coexistem; eficiência não revoga legalidade.",
      },
      {
        certo: "desconcentração distribui competências dentro da mesma pessoa jurídica.",
        errado: "desconcentração cria nova pessoa jurídica autônoma, sempre com patrimônio próprio.",
        exp: "Criação de pessoa jurídica relaciona-se à descentralização, não à desconcentração.",
      },
      {
        certo: "ato administrativo deve atender competência, finalidade, forma, motivo e objeto.",
        errado: "ato administrativo válido dispensa finalidade pública quando houver conveniência interna.",
        exp: "Finalidade pública é elemento essencial da atuação administrativa.",
      },
    ],
    lai: [
      {
        certo: "a LAI estabelece a publicidade como regra e o sigilo como exceção.",
        errado: "a LAI transforma o sigilo em regra sempre que o documento estiver em órgão público.",
        exp: "A lei promove transparência, preservadas hipóteses legais de sigilo.",
      },
      {
        certo: "transparência ativa envolve divulgação de informações de interesse coletivo independentemente de solicitação.",
        errado: "transparência ativa ocorre apenas depois que o cidadão apresenta pedido formal de acesso.",
        exp: "A divulgação espontânea é marca da transparência ativa.",
      },
      {
        certo: "pedido de acesso não deve exigir motivação do solicitante como condição geral de atendimento.",
        errado: "todo pedido de acesso deve ser acompanhado de justificativa detalhada do interesse pessoal.",
        exp: "A regra da LAI dispensa motivação para acesso à informação pública.",
      },
    ],
    lgpd: [
      {
        certo: "dado pessoal é informação relacionada a pessoa natural identificada ou identificável.",
        errado: "dado pessoal só existe quando há CPF completo no documento.",
        exp: "A identificação pode ocorrer por vários elementos, não apenas CPF.",
      },
      {
        certo: "o tratamento pelo poder público deve observar finalidade pública e base legal adequada.",
        errado: "órgão público pode tratar qualquer dado sem finalidade definida por exercer função estatal.",
        exp: "A LGPD exige finalidade, adequação, necessidade e base legal.",
      },
      {
        certo: "dados pessoais sensíveis exigem cautela reforçada, especialmente em cadastros e atendimentos.",
        errado: "dados sensíveis podem ser publicados livremente quando constam de processo administrativo.",
        exp: "Publicidade administrativa deve ser conciliada com proteção de dados pessoais.",
      },
    ],
    improbidade: [
      {
        certo: "a responsabilização por improbidade exige atenção ao elemento subjetivo previsto na legislação vigente.",
        errado: "todo erro administrativo sem dolo configura automaticamente improbidade.",
        exp: "A lei atual reforça a exigência de dolo para configuração dos atos de improbidade.",
      },
      {
        certo: "sanções de improbidade podem envolver perda da função, suspensão de direitos políticos e ressarcimento, conforme o caso.",
        errado: "sanções de improbidade restringem-se sempre a advertência verbal.",
        exp: "A legislação prevê sanções severas, graduadas conforme o ato e decisão judicial.",
      },
    ],
    processoAdministrativo: [
      {
        certo: "a Administração deve motivar atos que neguem, limitem ou afetem direitos ou interesses.",
        errado: "atos que negam direitos dispensam motivação quando praticados por autoridade competente.",
        exp: "A motivação é garantia de controle e transparência, especialmente em decisões restritivas.",
      },
      {
        certo: "competência administrativa é irrenunciável, mas pode admitir delegação e avocação nos limites legais.",
        errado: "competência pode ser renunciada livremente pelo agente para evitar responsabilidade.",
        exp: "A Lei 9.784/1999 trata competência como irrenunciável, com delegação/avocação em hipóteses legais.",
      },
      {
        certo: "o processo administrativo deve observar contraditório, ampla defesa e segurança jurídica quando aplicáveis.",
        errado: "processo administrativo interno nunca precisa observar contraditório.",
        exp: "Contraditório e ampla defesa são garantias em processos que possam afetar direitos.",
      },
    ],
    administracaoGeral: [
      {
        certo: "planejamento define objetivos, meios e prioridades antes da execução.",
        errado: "planejamento é etapa posterior ao controle, usada apenas para justificar resultados.",
        exp: "Planejar antecede e orienta execução e controle.",
      },
      {
        certo: "controle compara resultados obtidos com padrões ou metas previamente definidos.",
        errado: "controle administrativo consiste apenas em fiscalizar pessoas, sem relação com metas.",
        exp: "Controle também mede processos, indicadores, recursos e resultados.",
      },
      {
        certo: "o ciclo PDCA envolve planejar, executar, verificar e agir corretivamente.",
        errado: "no PDCA, a etapa Check corresponde à escolha inicial das metas.",
        exp: "Check é verificação; definição de metas ocorre principalmente no planejamento.",
      },
    ],
    rotinas: [
      {
        certo: "checklists reduzem esquecimentos, mas não substituem capacitação e julgamento profissional.",
        errado: "checklist elimina integralmente erro humano e torna treinamento desnecessário.",
        exp: "Ferramentas de padronização apoiam a rotina, mas não substituem preparo.",
      },
      {
        certo: "rastreabilidade permite identificar responsável, data, etapa e providência adotada.",
        errado: "rastreabilidade só é necessária em processos judiciais, não em rotinas administrativas.",
        exp: "Rastreabilidade é útil para controle, continuidade e transparência administrativa.",
      },
    ],
    redacao: [
      {
        certo: "redação oficial deve privilegiar clareza, precisão, impessoalidade, formalidade e padronização.",
        errado: "redação oficial adequada deve usar linguagem rebuscada para demonstrar autoridade.",
        exp: "O padrão oficial busca clareza e objetividade; rebuscamento prejudica compreensão.",
      },
      {
        certo: "concisão significa dizer o necessário com economia, sem sacrificar informação essencial.",
        errado: "concisão autoriza omitir elementos indispensáveis para encurtar o documento.",
        exp: "Concisão elimina excessos, não informações necessárias.",
      },
    ],
    protocolo: [
      {
        certo: "autuação formaliza documentos de um assunto em processo identificável e controlável.",
        errado: "autuação é sinônimo de descarte imediato de documento recebido.",
        exp: "Autuar é constituir processo, registrar e permitir tramitação.",
      },
      {
        certo: "tabela de temporalidade orienta prazos de guarda e destinação documental.",
        errado: "temporalidade documental é definida individualmente por cada atendente no momento do arquivamento.",
        exp: "Prazos de guarda dependem de instrumentos arquivísticos e normas aplicáveis.",
      },
      {
        certo: "documentos de uso frequente pela unidade produtora integram, em regra, o arquivo corrente.",
        errado: "arquivo corrente reúne exclusivamente documentos históricos sem uso administrativo.",
        exp: "Arquivo permanente guarda valor histórico/probatório; arquivo corrente atende uso frequente.",
      },
    ],
    atendimento: [
      {
        certo: "escuta ativa envolve confirmar a demanda antes de orientar o usuário.",
        errado: "atendimento eficiente exige responder rapidamente mesmo sem compreender a demanda.",
        exp: "Compreender a demanda evita encaminhamentos errados e retrabalho.",
      },
      {
        certo: "linguagem simples facilita compreensão sem afastar a formalidade necessária.",
        errado: "linguagem simples é incompatível com atendimento em órgão público.",
        exp: "Simplicidade, clareza e respeito podem conviver com formalidade.",
      },
    ],
    materiais: [
      {
        certo: "curva ABC ajuda a priorizar controle de itens de maior impacto econômico.",
        errado: "na curva ABC, todos os itens recebem o mesmo nível de controle independentemente de valor e criticidade.",
        exp: "A classificação ABC diferencia itens conforme relevância.",
      },
      {
        certo: "PEPS significa primeiro que entra, primeiro que sai.",
        errado: "PEPS determina que o item mais recente saia obrigatoriamente antes do antigo.",
        exp: "PEPS prioriza saída dos itens mais antigos.",
      },
      {
        certo: "estoque de segurança reduz risco de ruptura diante de variação de demanda ou atraso de reposição.",
        errado: "estoque de segurança serve apenas para aumentar custo de armazenagem, sem finalidade operacional.",
        exp: "A reserva reduz risco de falta de materiais.",
      },
    ],
    logistica: [
      {
        certo: "lead time deve ser considerado no ponto de pedido de materiais.",
        errado: "prazo de reposição é irrelevante quando há registro em planilha.",
        exp: "O tempo entre solicitação e entrega afeta risco de desabastecimento.",
      },
      {
        certo: "layout de almoxarifado deve favorecer localização, segurança e conservação.",
        errado: "armazenagem adequada considera apenas estética visual do espaço.",
        exp: "A armazenagem busca eficiência, segurança, preservação e controle.",
      },
    ],
    licitacoes: [
      {
        certo: "pregão é modalidade adequada para bens e serviços comuns, conforme regras da Lei 14.133/2021.",
        errado: "pregão deve ser usado para qualquer contratação pública, inclusive objeto sem especificação comum.",
        exp: "Pregão é ligado a bens e serviços comuns, com disputa objetiva.",
      },
      {
        certo: "inexigibilidade pressupõe inviabilidade de competição.",
        errado: "inexigibilidade é escolha discricionária quando a competição é ampla e viável.",
        exp: "A inviabilidade de competição é elemento central da inexigibilidade.",
      },
      {
        certo: "segregação de funções reduz risco de erro, fraude e concentração indevida de etapas críticas.",
        errado: "segregação de funções é vedada porque sempre aumenta a eficiência.",
        exp: "Controle interno busca equilibrar eficiência e mitigação de riscos.",
      },
    ],
    sistemaCft: [
      {
        certo: "a Lei 13.639/2018 criou o Conselho Federal e os Conselhos Regionais dos Técnicos Industriais.",
        errado: "a Lei 13.639/2018 extinguiu a fiscalização profissional dos técnicos industriais.",
        exp: "A lei instituiu o Sistema CFT/CRTs e manteve finalidade fiscalizatória profissional.",
      },
      {
        certo: "a Lei 5.524/1968 dispõe sobre o exercício da profissão de Técnico Industrial de nível médio.",
        errado: "a Lei 5.524/1968 regula exclusivamente cargos de nível superior em engenharia.",
        exp: "A lei trata dos técnicos industriais de nível médio.",
      },
      {
        certo: "o Decreto 90.922/1985 regulamenta a Lei 5.524/1968 quanto ao exercício profissional técnico.",
        errado: "o Decreto 90.922/1985 revogou integralmente a Lei 13.639/2018.",
        exp: "O decreto regulamenta a lei profissional anterior; não revoga lei posterior de criação do CFT/CRTs.",
      },
      {
        certo: "resoluções do CFT devem respeitar leis federais e decretos aplicáveis.",
        errado: "resoluções do CFT podem contrariar lei federal quando aprovadas por maioria simples.",
        exp: "Normas infralegais não podem contrariar leis hierarquicamente superiores.",
      },
    ],
  };

  const MC_FACTS = {
    portugues: [
      {
        pergunta: "assinale a alternativa que apresenta uma característica de texto administrativo claro.",
        correta: "Uso de frases objetivas, coesão entre as ideias e vocabulário preciso.",
        distratores: ["Preferência por períodos longos e ambíguos.", "Uso de termos técnicos sem necessidade.", "Supressão de informações essenciais.", "Substituição de dados objetivos por opiniões pessoais."],
        explicacao: "Textos administrativos exigem clareza, objetividade, precisão e encadeamento lógico.",
      },
      {
        pergunta: "em relação à concordância verbal, assinale a opção correta.",
        correta: "O verbo haver, com sentido de existir, permanece no singular.",
        distratores: ["O verbo haver existencial concorda sempre com o plural seguinte.", "O sujeito composto posposto torna a concordância sempre proibida.", "Todo verbo impessoal deve ir para o plural.", "Concordância é facultativa em documentos oficiais."],
        explicacao: "Haver existencial é impessoal e fica na terceira pessoa do singular.",
      },
      {
        pergunta: "quanto à pontuação, é correto afirmar que",
        correta: "não se separa verbo e complemento por vírgula sem justificativa sintática.",
        distratores: ["a vírgula deve marcar qualquer pausa de leitura.", "a vírgula é obrigatória entre sujeito e predicado.", "orações coordenadas nunca admitem vírgula.", "aposto explicativo deve ficar sempre sem pontuação."],
        explicacao: "A vírgula obedece à estrutura sintática e ao sentido, não apenas à pausa.",
      },
      {
        pergunta: "a coesão textual é favorecida por",
        correta: "retomadas claras, conectivos adequados e progressão lógica.",
        distratores: ["repetição desordenada de termos.", "ausência de conectores.", "mudança brusca de referente.", "frases isoladas sem relação semântica."],
        explicacao: "Coesão é a ligação formal e semântica entre partes do texto.",
      },
    ],
    matematica: [
      {
        pergunta: "um setor recebeu 120 solicitações e concluiu 75%. O número de solicitações concluídas foi",
        correta: "90.",
        distratores: ["75.", "80.", "95.", "100."],
        explicacao: "75% de 120 corresponde a 0,75 × 120 = 90.",
      },
      {
        pergunta: "se três servidores conferem 90 processos em 6 horas, mantendo o ritmo, seis servidores conferem a mesma quantidade em",
        correta: "3 horas.",
        distratores: ["6 horas.", "9 horas.", "12 horas.", "18 horas."],
        explicacao: "Dobrar o número de servidores reduz o tempo pela metade, em proporcionalidade inversa.",
      },
      {
        pergunta: "a média aritmética de 8, 10, 12 e 14 é",
        correta: "11.",
        distratores: ["10.", "12.", "13.", "44."],
        explicacao: "A soma é 44; dividindo por 4, obtém-se 11.",
      },
      {
        pergunta: "a negação lógica de 'todos os formulários foram validados' é",
        correta: "pelo menos um formulário não foi validado.",
        distratores: ["nenhum formulário foi validado.", "todos os formulários não foram validados.", "alguns formulários foram validados.", "todo formulário foi validado duas vezes."],
        explicacao: "A negação de universal afirmativa é particular negativa.",
      },
    ],
    geografia: [
      {
        pergunta: "em estudos populacionais, densidade demográfica corresponde",
        correta: "à relação entre população e área do território.",
        distratores: ["ao crescimento vegetativo absoluto.", "à soma de nascimentos e migrações.", "ao total de domicílios particulares.", "à taxa de urbanização anual."],
        explicacao: "Densidade demográfica é população dividida pela área.",
      },
      {
        pergunta: "a cartografia temática é útil ao IBGE porque",
        correta: "representa espacialmente fenômenos sociais, econômicos e ambientais.",
        distratores: ["substitui integralmente a coleta de campo.", "elimina a necessidade de escala.", "impede comparação entre regiões.", "serve apenas para mapas físicos sem dados sociais."],
        explicacao: "Mapas temáticos comunicam distribuição espacial de fenômenos.",
      },
      {
        pergunta: "o processo de urbanização brasileira caracteriza-se historicamente por",
        correta: "concentração populacional em áreas urbanas e metropolização em diversos períodos.",
        distratores: ["ausência de desigualdades regionais.", "predomínio rural absoluto permanente.", "fim da rede urbana após 1980.", "ocupação homogênea do território nacional."],
        explicacao: "A urbanização brasileira é marcada por concentração e desigualdades territoriais.",
      },
      {
        pergunta: "o conceito de território envolve",
        correta: "relações de poder, uso, apropriação e organização do espaço.",
        distratores: ["apenas paisagens naturais sem ação humana.", "somente limites climáticos.", "exclusivamente dados meteorológicos.", "áreas sem população ou infraestrutura."],
        explicacao: "Território envolve dimensão política, social e espacial.",
      },
    ],
    ibgeTecnicos: [
      {
        pergunta: "no trabalho censitário, controle de qualidade tem como finalidade principal",
        correta: "verificar consistência, completude e confiabilidade das informações coletadas.",
        distratores: ["substituir toda coleta presencial.", "alterar respostas para melhorar indicadores.", "dispensar treinamento das equipes.", "eliminar o sigilo estatístico."],
        explicacao: "Qualidade censitária depende de consistência, cobertura, completude e confidencialidade.",
      },
      {
        pergunta: "o sigilo estatístico significa que",
        correta: "informações individualizadas coletadas para fins estatísticos devem ser protegidas.",
        distratores: ["todo resultado agregado deve ser mantido secreto.", "dados pessoais podem ser publicados integralmente.", "o recenseador pode divulgar respostas em redes sociais.", "a coleta não precisa de confiança do informante."],
        explicacao: "O sigilo protege o informante e permite divulgação de resultados agregados.",
      },
      {
        pergunta: "uma inconsistência em questionário censitário deve ser tratada por",
        correta: "checagem conforme procedimento técnico, registro adequado e eventual correção autorizada.",
        distratores: ["alteração informal sem registro.", "eliminação automática do domicílio.", "divulgação pública do caso.", "adivinhação da resposta provável."],
        explicacao: "Rotinas de qualidade exigem procedimento, registro e rastreabilidade.",
      },
      {
        pergunta: "em operação censitária, supervisão de campo busca",
        correta: "acompanhar cobertura, produtividade, qualidade e cumprimento dos procedimentos.",
        distratores: ["impedir comunicação entre equipes.", "trocar conceitos oficiais por critérios pessoais.", "excluir áreas de difícil acesso sem justificativa.", "substituir todos os instrumentos de controle."],
        explicacao: "Supervisão garante aderência metodológica e qualidade da coleta.",
      },
    ],
    tiDados: [
      {
        pergunta: "em banco de dados relacional, chave primária tem como função",
        correta: "identificar unicamente cada registro de uma tabela.",
        distratores: ["armazenar senhas em texto claro.", "duplicar registros obrigatoriamente.", "substituir todas as chaves estrangeiras.", "impedir consultas com filtros."],
        explicacao: "A chave primária garante identidade única do registro.",
      },
      {
        pergunta: "normalização de dados busca",
        correta: "reduzir redundâncias e anomalias de inserção, atualização e exclusão.",
        distratores: ["aumentar duplicidade deliberadamente.", "desligar integridade referencial.", "impedir modelagem lógica.", "trocar todos os dados por imagens."],
        explicacao: "Normalização organiza tabelas e dependências para consistência.",
      },
      {
        pergunta: "uma API RESTful tende a utilizar",
        correta: "recursos identificáveis por URLs e métodos HTTP adequados.",
        distratores: ["apenas arquivos locais sem protocolo.", "somente planilhas manuais.", "senhas no corpo de todas as respostas.", "métodos aleatórios sem semântica."],
        explicacao: "REST organiza interação por recursos e métodos como GET, POST, PUT e DELETE.",
      },
      {
        pergunta: "em ciência de dados, validação de modelo é importante para",
        correta: "avaliar desempenho em dados não usados diretamente no ajuste.",
        distratores: ["garantir acerto perfeito em qualquer cenário.", "eliminar necessidade de dados.", "substituir análise exploratória por opinião.", "publicar dados sensíveis sem anonimização."],
        explicacao: "Validação ajuda a estimar generalização e reduzir overfitting.",
      },
      {
        pergunta: "controle de versão em desenvolvimento de software permite",
        correta: "registrar alterações, colaborar e recuperar estados anteriores do código.",
        distratores: ["apagar histórico automaticamente.", "impedir revisão de alterações.", "eliminar testes.", "substituir documentação por nomes aleatórios."],
        explicacao: "Sistemas como Git apoiam colaboração, rastreabilidade e reversão.",
      },
      {
        pergunta: "criptografia em trânsito é normalmente usada para",
        correta: "proteger dados durante comunicação entre cliente e servidor.",
        distratores: ["publicar senhas em logs.", "dispensar autenticação.", "tornar dados pessoais sempre públicos.", "impedir backups."],
        explicacao: "TLS/HTTPS protege confidencialidade e integridade na comunicação.",
      },
    ],
    santosLegislacao: [
      {
        pergunta: "na administração municipal, o princípio da legalidade significa que",
        correta: "o agente público deve atuar conforme a lei e a finalidade pública.",
        distratores: ["a vontade pessoal do servidor prevalece sobre normas.", "a administração pode agir sem fundamento legal.", "apenas costumes internos importam.", "o princípio se aplica somente ao governo federal."],
        explicacao: "A legalidade vincula toda a Administração Pública, inclusive municipal.",
      },
      {
        pergunta: "o atendimento ao cidadão em serviço público municipal deve observar",
        correta: "urbanidade, impessoalidade, clareza e respeito à dignidade do usuário.",
        distratores: ["preferência pessoal sem critérios.", "informalidade absoluta e sem registros.", "tratamento desigual por conveniência.", "promessa de solução fora da competência."],
        explicacao: "O atendimento público deve preservar isonomia, respeito e informação clara.",
      },
      {
        pergunta: "o dever de guardar sigilo funcional alcança",
        correta: "informações protegidas por lei ou cuja divulgação indevida cause prejuízo.",
        distratores: ["todo dado público agregado.", "apenas conversas telefônicas privadas.", "informações publicadas oficialmente.", "somente documentos sem protocolo."],
        explicacao: "Sigilo funcional protege informações legalmente restritas, sem afastar transparência legítima.",
      },
    ],
    administracao: [
      {
        pergunta: "em protocolo administrativo, registrar data, origem e assunto do documento favorece",
        correta: "rastreabilidade e controle da tramitação.",
        distratores: ["eliminação imediata do documento.", "perda proposital de histórico.", "impedimento de consulta futura.", "duplicação desnecessária sem controle."],
        explicacao: "Metadados básicos ajudam localizar, acompanhar e auditar documentos.",
      },
      {
        pergunta: "arquivo corrente é composto, em regra, por documentos",
        correta: "em uso frequente pela unidade produtora.",
        distratores: ["sem valor administrativo e já eliminados.", "exclusivamente históricos e permanentes.", "produzidos apenas por particulares.", "sem relação com atividades do órgão."],
        explicacao: "Arquivo corrente apoia atividades em andamento e consultas frequentes.",
      },
      {
        pergunta: "gestão de materiais deve considerar",
        correta: "consumo, estoque mínimo, reposição, armazenamento e controle patrimonial.",
        distratores: ["apenas preferência pessoal do solicitante.", "compra sem planejamento.", "ausência de inventário.", "descarte sem registro."],
        explicacao: "Materiais exigem planejamento, controle, conservação e prestação de contas.",
      },
      {
        pergunta: "na redação oficial, impessoalidade significa",
        correta: "priorizar a finalidade institucional, sem opiniões pessoais indevidas.",
        distratores: ["usar linguagem hostil.", "omitir identificação do órgão sempre.", "escrever de modo vago.", "substituir fatos por impressões pessoais."],
        explicacao: "A comunicação oficial representa o órgão e deve ser objetiva e institucional.",
      },
    ],
    pmspConhecimentosGerais: [
      {
        pergunta: "em tema de cidadania e segurança pública, assinale a alternativa correta.",
        correta: "A preservação da ordem pública deve ser compatibilizada com o respeito à dignidade da pessoa humana e aos direitos fundamentais.",
        distratores: ["A atuação policial afasta integralmente a incidência dos direitos fundamentais.", "A ordem pública autoriza tratamento desigual sem justificativa legal.", "A cidadania é conceito restrito ao direito de votar.", "A dignidade humana vale apenas para relações privadas."],
        explicacao: "A atuação estatal em segurança pública deve observar legalidade, proporcionalidade, direitos fundamentais e proteção da vida.",
      },
      {
        pergunta: "quanto a conhecimentos gerais de História do Brasil, é correto afirmar que",
        correta: "a Constituição de 1988 é marco da redemocratização e ampliou direitos e garantias fundamentais.",
        distratores: ["a Constituição de 1988 extinguiu todos os direitos sociais.", "a redemocratização brasileira ocorreu exclusivamente no período colonial.", "o voto direto foi abolido pela Constituição de 1988.", "os direitos fundamentais foram retirados do texto constitucional de 1988."],
        explicacao: "A Constituição de 1988 consolidou a redemocratização e organizou amplo catálogo de direitos fundamentais e sociais.",
      },
      {
        pergunta: "em Geografia do Brasil, a urbanização brasileira caracteriza-se por",
        correta: "concentração populacional urbana, desigualdades regionais e forte influência das redes metropolitanas.",
        distratores: ["predomínio rural absoluto em todas as regiões desde 1980.", "ausência de metrópoles e de desigualdades socioespaciais.", "distribuição populacional idêntica em todos os estados.", "fim completo dos fluxos migratórios internos."],
        explicacao: "A urbanização brasileira é marcada por concentração urbana, metropolização e desigualdades territoriais.",
      },
      {
        pergunta: "em Atualidades, a leitura crítica de notícias exige",
        correta: "verificar fonte, data, contexto e coerência das informações antes de compartilhar conclusões.",
        distratores: ["aceitar manchetes sem ler o conteúdo.", "preferir mensagens anônimas a fontes oficiais.", "desconsiderar a data da publicação.", "compartilhar informação antes de checar autoria e contexto."],
        explicacao: "Atualidades em concursos valorizam compreensão contextual, checagem de fontes e leitura responsável de fatos recentes.",
      },
      {
        pergunta: "sobre Geografia Geral, assinale a alternativa correta.",
        correta: "clima e tempo atmosférico são conceitos distintos, pois clima envolve padrões observados em períodos mais longos.",
        distratores: ["clima é a condição momentânea observada em poucas horas.", "tempo atmosférico e clima são sinônimos absolutos.", "clima independe de latitude, altitude e massas de ar.", "tempo atmosférico só existe em áreas urbanas."],
        explicacao: "Tempo atmosférico descreve condições momentâneas; clima representa padrões de longo prazo.",
      },
    ],
    informaticaBasica: [
      {
        pergunta: "sobre segurança da informação no uso de computadores, assinale a alternativa correta.",
        correta: "Senhas fortes, autenticação adicional e atualização de sistemas reduzem riscos de acesso indevido.",
        distratores: ["Compartilhar senha institucional é prática recomendada quando há urgência.", "Atualizações devem ser evitadas porque sempre reduzem a segurança.", "Antivírus dispensa qualquer cuidado do usuário.", "Links desconhecidos podem ser abertos sem verificação quando chegam por e-mail."],
        explicacao: "Segurança depende de controles técnicos e comportamento preventivo do usuário.",
      },
      {
        pergunta: "em planilhas eletrônicas, a finalidade de uma fórmula é",
        correta: "realizar cálculos ou operações automáticas com base em valores e referências de células.",
        distratores: ["impedir a edição de qualquer célula da planilha.", "substituir obrigatoriamente todos os textos por imagens.", "apagar dados sempre que a planilha for aberta.", "criar uma cópia física do documento."],
        explicacao: "Fórmulas automatizam cálculos, referências e funções em planilhas.",
      },
      {
        pergunta: "quanto a navegadores de internet, é correto afirmar que",
        correta: "o protocolo HTTPS indica comunicação criptografada entre navegador e servidor, embora não garanta sozinho a legitimidade do conteúdo.",
        distratores: ["HTTPS significa que todo conteúdo da página é verdadeiro.", "HTTP e HTTPS possuem sempre a mesma proteção criptográfica.", "o cadeado do navegador autoriza fornecer qualquer dado pessoal.", "navegadores não registram histórico ou cache em nenhuma hipótese."],
        explicacao: "HTTPS protege a comunicação, mas o usuário ainda deve verificar domínio, contexto e finalidade da página.",
      },
      {
        pergunta: "em editores de texto, o recurso de localizar e substituir serve para",
        correta: "encontrar ocorrências de uma expressão e, se desejado, trocá-las por outro conteúdo.",
        distratores: ["formatar automaticamente todos os parágrafos como tabela.", "excluir obrigatoriamente o arquivo original.", "converter o documento em imagem sem texto editável.", "impedir revisão ortográfica posterior."],
        explicacao: "Localizar/substituir é recurso básico de produtividade e revisão de documentos.",
      },
    ],
    pmspAdministracaoPublica: [
      {
        pergunta: "em noções de Administração Pública, o princípio da legalidade impõe que",
        correta: "o agente público atue conforme a lei e a finalidade pública.",
        distratores: ["a vontade pessoal do agente prevaleça sobre a lei.", "a administração aja sem fundamento normativo quando houver conveniência.", "normas internas substituam integralmente a Constituição.", "o servidor escolha quais regras deseja cumprir."],
        explicacao: "Na Administração Pública, a legalidade vincula a atuação estatal à lei e ao interesse público.",
      },
      {
        pergunta: "à luz da Lei de Acesso à Informação, é correto afirmar que",
        correta: "a publicidade é regra, e o sigilo deve ser exceção justificada nas hipóteses legais.",
        distratores: ["todo documento público é sigiloso por prazo indeterminado.", "o cidadão precisa sempre justificar o motivo do pedido de informação.", "órgãos públicos são proibidos de divulgar informações de interesse coletivo.", "a transparência ativa é incompatível com portais oficiais."],
        explicacao: "A LAI estabelece transparência como regra, com restrições legais para proteger dados e interesses específicos.",
      },
      {
        pergunta: "sobre impessoalidade administrativa, assinale a alternativa correta.",
        correta: "a atuação do agente público deve buscar finalidade pública, sem favorecimentos ou perseguições pessoais.",
        distratores: ["a Administração pode favorecer conhecidos quando isso acelera o serviço.", "a publicidade oficial deve promover a imagem pessoal do agente.", "decisões públicas podem ser guiadas por amizade, antipatia ou interesse privado.", "a impessoalidade vale apenas para contratos privados."],
        explicacao: "Impessoalidade exige finalidade pública e tratamento isonômico.",
      },
      {
        pergunta: "quanto à eficiência no serviço público, é correto afirmar que",
        correta: "ela se relaciona ao uso adequado de recursos, qualidade do serviço e busca de resultados públicos.",
        distratores: ["ela autoriza descumprir a lei para ganhar rapidez.", "ela elimina controles e registros administrativos.", "ela significa atender apenas demandas mais simples.", "ela permite substituir interesse público por metas pessoais."],
        explicacao: "Eficiência deve caminhar com legalidade, controle, qualidade e resultado institucional.",
      },
    ],
  };

  const QUESTIONS = [];
  const contestById = Object.fromEntries(CONCURSOS.map((contest) => [contest.id, contest]));

  function roleById(contestId, roleId) {
    return contestById[contestId].roles.find((role) => role.id === roleId);
  }

  function pad(num) {
    return String(num).padStart(3, "0");
  }

  function sourceFor(key) {
    return SOURCES[key] || SOURCES.crt_edital;
  }

  function dificuldadeAt(index) {
    return ["facil", "medio", "medio", "dificil"][index % 4];
  }

  function addQuestion(question) {
    const contest = contestById[question.concurso_id];
    const primaryRole = roleById(question.concurso_id, question.cargo_id);
    const source = sourceFor(question.sourceKey);

    QUESTIONS.push({
      id: question.id,
      concurso_id: question.concurso_id,
      concurso: contest.nome,
      orgao: contest.orgao,
      cargo_id: question.cargo_id,
      cargo: primaryRole.nome,
      cargos_compativeis: question.cargos_compativeis || [question.cargo_id],
      banca: contest.banca,
      materia_id: question.materia_id,
      materia: question.materia,
      assunto_id: question.assunto_id,
      assunto: question.assunto,
      subassunto: question.subassunto,
      bloco: question.bloco,
      dificuldade: question.dificuldade,
      tipo: question.tipo,
      origem: "inédita",
      ano: 2026,
      fonte: source.title,
      link: source.url,
      fonte_tipo: source.type,
      fonte_inspiracao: question.fonte_inspiracao,
      enunciado: question.enunciado,
      alternativas: question.alternativas || [],
      resposta_correta: question.resposta_correta,
      explicacao: question.explicacao,
      status: "ativo",
      tags: question.tags || [],
      criado_em: CREATED_AT,
      atualizado_em: CREATED_AT,
    });
  }

  function generateCE(spec) {
    for (let index = 0; index < spec.count; index += 1) {
      const fact = spec.facts[index % spec.facts.length];
      const isCorrect = index % 2 === 0;
      const context = CE_CONTEXTS[index % CE_CONTEXTS.length];
      const subassunto = spec.subassuntos[index % spec.subassuntos.length];
      const resposta = isCorrect ? "C" : "E";
      addQuestion({
        id: `${spec.prefix}-${pad(index + 1)}`,
        concurso_id: "crt-sp",
        cargo_id: "crt-tecnico-administrativo-bs",
        cargos_compativeis: spec.cargos || ["crt-tecnico-administrativo-bs"],
        materia_id: spec.materia_id,
        materia: spec.materia,
        assunto_id: spec.assunto_id,
        assunto: spec.assunto,
        subassunto,
        bloco: spec.bloco,
        dificuldade: dificuldadeAt(index),
        tipo: "certo_errado",
        sourceKey: spec.sourceKey,
        fonte_inspiracao: spec.inspiracao,
        enunciado: `${context}, julgue o item a seguir. ${isCorrect ? fact.certo : fact.errado}`,
        resposta_correta: resposta,
        explicacao: `${fact.exp} ${isCorrect ? "Por isso, o item está certo." : "Por isso, o item está errado."}`,
        tags: [spec.assunto_id, subassunto, ...(spec.tags || [])],
      });
    }
  }

  function generateMC(spec) {
    for (let index = 0; index < spec.count; index += 1) {
      const fact = spec.facts[index % spec.facts.length];
      const context = MC_CONTEXTS[index % MC_CONTEXTS.length];
      const subassunto = spec.subassuntos[index % spec.subassuntos.length];
      const correctLabel = LETTERS[index % LETTERS.length];
      const distractors = [...fact.distratores];
      let distractorOffset = 0;
      const alternativas = LETTERS.map((letter, altIndex) => {
        if (letter === correctLabel) {
          return { label: letter, text: fact.correta };
        }
        const distractorIndex = (distractorOffset + index) % distractors.length;
        distractorOffset += 1;
        return { label: letter, text: distractors[distractorIndex] };
      });

      addQuestion({
        id: `${spec.prefix}-${pad(index + 1)}`,
        concurso_id: spec.concurso_id,
        cargo_id: spec.cargo_id,
        cargos_compativeis: spec.cargos || [spec.cargo_id],
        materia_id: spec.materia_id,
        materia: spec.materia,
        assunto_id: spec.assunto_id,
        assunto: spec.assunto,
        subassunto,
        bloco: spec.bloco,
        dificuldade: dificuldadeAt(index + 1),
        tipo: "multipla_escolha",
        sourceKey: spec.sourceKey,
        fonte_inspiracao: spec.inspiracao,
        enunciado: `${context}, ${fact.pergunta}`,
        alternativas,
        resposta_correta: correctLabel,
        explicacao: fact.explicacao,
        tags: [spec.assunto_id, subassunto, ...(spec.tags || [])],
      });
    }
  }

  [
    { prefix: "CRT-POR", count: 20, materia_id: "crt-portugues", materia: "Português", assunto_id: "portugues", assunto: "Gramática e interpretação", subassuntos: ["crase", "concordancia", "pontuacao", "coesao", "regencia"], bloco: "Conhecimentos básicos", facts: CE_FACTS.portugues, sourceKey: "crt_edital", inspiracao: "Edital CRT-SP 2026 e padrão Quadrix em Conselhos Profissionais", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-RLM", count: 15, materia_id: "crt-rlm", materia: "Raciocínio Lógico/Matemática", assunto_id: "rlm", assunto: "Lógica e matemática básica", subassuntos: ["proposicoes", "porcentagem", "regra-de-tres", "conjuntos"], bloco: "Conhecimentos básicos", facts: CE_FACTS.rlm, sourceKey: "crt_edital", inspiracao: "Edital CRT-SP 2026 e padrão Quadrix em conhecimentos básicos", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-INF", count: 15, materia_id: "crt-informatica", materia: "Informática", assunto_id: "informatica", assunto: "Informática aplicada", subassuntos: ["seguranca", "backup", "internet", "planilhas"], bloco: "Conhecimentos básicos", facts: CE_FACTS.informatica, sourceKey: "crt_edital", inspiracao: "Edital CRT-SP 2026 e padrão Quadrix em conhecimentos básicos", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-ETI", count: 6, materia_id: "crt-etica", materia: "Ética", assunto_id: "etica", assunto: "Ética no serviço público", subassuntos: ["integridade", "conflito-de-interesses"], bloco: "Conhecimentos complementares", facts: CE_FACTS.etica, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em Conselhos Profissionais", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-ADP", count: 6, materia_id: "crt-adm-publica", materia: "Administração Pública", assunto_id: "administracao-publica", assunto: "Princípios e organização administrativa", subassuntos: ["principios", "desconcentracao", "atos"], bloco: "Conhecimentos complementares", facts: CE_FACTS.administracaoPublica, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em CREA, CRC e Conselhos", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-LAI", count: 6, materia_id: "crt-lai", materia: "LAI", assunto_id: "lai", assunto: "Lei de Acesso à Informação", subassuntos: ["publicidade", "transparencia-ativa", "pedido-de-acesso"], bloco: "Conhecimentos complementares", facts: CE_FACTS.lai, sourceKey: "lai", inspiracao: "Base legal: Lei 12.527/2011", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-LGP", count: 6, materia_id: "crt-lgpd", materia: "LGPD", assunto_id: "lgpd", assunto: "Proteção de dados pessoais", subassuntos: ["dado-pessoal", "poder-publico", "dados-sensiveis"], bloco: "Conhecimentos complementares", facts: CE_FACTS.lgpd, sourceKey: "lgpd", inspiracao: "Base legal: Lei 13.709/2018", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-IMP", count: 6, materia_id: "crt-improbidade", materia: "Lei 8.429/1992", assunto_id: "improbidade", assunto: "Improbidade administrativa", subassuntos: ["dolo", "sancoes"], bloco: "Conhecimentos complementares", facts: CE_FACTS.improbidade, sourceKey: "improbidade", inspiracao: "Base legal: Lei 8.429/1992", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-PAD", count: 8, materia_id: "crt-processo-adm", materia: "Lei 9.784/1999", assunto_id: "processo-administrativo", assunto: "Processo administrativo federal", subassuntos: ["motivacao", "competencia", "contraditorio"], bloco: "Conhecimentos complementares", facts: CE_FACTS.processoAdministrativo, sourceKey: "lei_9784", inspiracao: "Base legal: Lei 9.784/1999", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-ADM", count: 7, materia_id: "crt-adm-geral", materia: "Administração Geral e Pública", assunto_id: "administracao-geral", assunto: "Funções administrativas", subassuntos: ["planejamento", "controle", "pdca"], bloco: "Conhecimentos específicos", facts: CE_FACTS.administracaoGeral, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em área administrativa de Conselhos", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-ROT", count: 5, materia_id: "crt-rotinas", materia: "Rotinas administrativas", assunto_id: "rotinas", assunto: "Rotinas administrativas", subassuntos: ["checklist", "rastreabilidade"], bloco: "Conhecimentos específicos", facts: CE_FACTS.rotinas, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em Técnico Administrativo", cargos: ["crt-tecnico-administrativo-bs"] },
    { prefix: "CRT-RED", count: 6, materia_id: "crt-redacao", materia: "Redação oficial", assunto_id: "redacao-oficial", assunto: "Comunicação oficial", subassuntos: ["clareza", "concisao"], bloco: "Conhecimentos específicos", facts: CE_FACTS.redacao, sourceKey: "manual_redacao", inspiracao: "Manual de Redação e padrão Quadrix", cargos: ["crt-tecnico-administrativo-bs"] },
    { prefix: "CRT-PRO", count: 6, materia_id: "crt-protocolo", materia: "Protocolo e arquivo", assunto_id: "protocolo", assunto: "Protocolo e gestão documental", subassuntos: ["autuacao", "temporalidade", "arquivo-corrente"], bloco: "Conhecimentos específicos", facts: CE_FACTS.protocolo, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em rotinas administrativas", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-ATE", count: 5, materia_id: "crt-atendimento", materia: "Atendimento ao público", assunto_id: "atendimento", assunto: "Atendimento e orientação", subassuntos: ["escuta-ativa", "linguagem-simples"], bloco: "Conhecimentos específicos", facts: CE_FACTS.atendimento, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em atendimento de Conselhos", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-MAT", count: 8, materia_id: "crt-materiais", materia: "Materiais e estoques", assunto_id: "materiais", assunto: "Administração de materiais", subassuntos: ["curva-abc", "peps", "estoque-seguranca"], bloco: "Conhecimentos específicos", facts: CE_FACTS.materiais, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em administração de materiais", cargos: ["crt-tecnico-administrativo-bs"] },
    { prefix: "CRT-LOG", count: 4, materia_id: "crt-logistica", materia: "Logística", assunto_id: "logistica", assunto: "Logística e armazenagem", subassuntos: ["lead-time", "armazenagem"], bloco: "Conhecimentos específicos", facts: CE_FACTS.logistica, sourceKey: "crt_edital", inspiracao: "Padrão Quadrix em logística administrativa", cargos: ["crt-tecnico-administrativo-bs"] },
    { prefix: "CRT-LIC", count: 6, materia_id: "crt-licitacoes", materia: "Licitações e contratos", assunto_id: "licitacoes", assunto: "Contratações públicas", subassuntos: ["pregao", "inexigibilidade", "segregacao"], bloco: "Conhecimentos específicos", facts: CE_FACTS.licitacoes, sourceKey: "crt_edital", inspiracao: "Lei 14.133/2021 e padrão Quadrix", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-SIS", count: 15, materia_id: "crt-sistema", materia: "Sistema CFT/CRT-SP", assunto_id: "sistema-cft-crt", assunto: "Legislação do Sistema CFT/CRTs", subassuntos: ["lei-13639", "lei-5524", "decretos", "resolucoes"], bloco: "Conhecimentos específicos", facts: CE_FACTS.sistemaCft, sourceKey: "lei_13639", inspiracao: "Lei 13.639/2018, Lei 5.524/1968, decretos e resoluções CFT", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
  ].forEach(generateCE);

  [
    { prefix: "IBGE-ACQ-POR", count: 30, concurso_id: "ibge", cargo_id: "ibge-acq", materia_id: "ibge-acq-portugues", materia: "Língua Portuguesa", assunto_id: "portugues", assunto: "Português para ACQ", subassuntos: ["interpretacao", "concordancia", "pontuacao", "coesao"], bloco: "Conhecimentos gerais", facts: MC_FACTS.portugues, sourceKey: "ibge_conteudo", inspiracao: "Edital IBGE 2026 e estilo Instituto Avalia", tags: ["ibge", "acq"] },
    { prefix: "IBGE-ACQ-RLM", count: 20, concurso_id: "ibge", cargo_id: "ibge-acq", materia_id: "ibge-acq-rlm", materia: "Raciocínio Lógico/Matemático", assunto_id: "rlm", assunto: "Raciocínio lógico e matemática", subassuntos: ["porcentagem", "regra-de-tres", "media", "logica"], bloco: "Conhecimentos gerais", facts: MC_FACTS.matematica, sourceKey: "ibge_conteudo", inspiracao: "Edital IBGE 2026 e estilo Instituto Avalia", tags: ["ibge", "acq"] },
    { prefix: "IBGE-ACQ-GEO", count: 30, concurso_id: "ibge", cargo_id: "ibge-acq", materia_id: "ibge-acq-geografia", materia: "Geografia", assunto_id: "geografia", assunto: "Geografia aplicada ao IBGE", subassuntos: ["populacao", "cartografia", "urbanizacao", "territorio"], bloco: "Conhecimentos gerais", facts: MC_FACTS.geografia, sourceKey: "ibge_conteudo", inspiracao: "Edital IBGE 2026 e conteúdo programático oficial", tags: ["ibge", "acq"] },
    { prefix: "IBGE-ACQ-TEC", count: 40, concurso_id: "ibge", cargo_id: "ibge-acq", materia_id: "ibge-acq-tecnicos", materia: "Conhecimentos técnicos", assunto_id: "conhecimentos-tecnicos", assunto: "Operação censitária e qualidade", subassuntos: ["qualidade", "sigilo-estatistico", "consistencia", "supervisao"], bloco: "Conhecimentos específicos", facts: MC_FACTS.ibgeTecnicos, sourceKey: "ibge_pdf", inspiracao: "Edital IBGE 2026, metodologia censitária e estilo Instituto Avalia", tags: ["ibge", "acq"] },
    { prefix: "IBGE-ANA-POR", count: 20, concurso_id: "ibge", cargo_id: "ibge-analista-ti-dados", materia_id: "ibge-ana-portugues", materia: "Língua Portuguesa", assunto_id: "portugues", assunto: "Português para Analista", subassuntos: ["interpretacao", "coesao", "sintaxe", "pontuacao"], bloco: "Conhecimentos gerais", facts: MC_FACTS.portugues, sourceKey: "ibge_conteudo", inspiracao: "Edital IBGE Analista 2026 e estilo Instituto Avalia", tags: ["ibge", "analista"] },
    { prefix: "IBGE-ANA-RLM", count: 12, concurso_id: "ibge", cargo_id: "ibge-analista-ti-dados", materia_id: "ibge-ana-rlm", materia: "Raciocínio Lógico/Matemático", assunto_id: "rlm", assunto: "Lógica, probabilidade e estatística", subassuntos: ["logica", "probabilidade", "media", "proporcionalidade"], bloco: "Conhecimentos gerais", facts: MC_FACTS.matematica, sourceKey: "ibge_conteudo", inspiracao: "Edital IBGE Analista 2026 e estilo Instituto Avalia", tags: ["ibge", "analista"] },
    { prefix: "IBGE-ANA-TI", count: 48, concurso_id: "ibge", cargo_id: "ibge-analista-ti-dados", materia_id: "ibge-ana-especificos", materia: "Conhecimentos específicos de TI e Dados", assunto_id: "ti-dados", assunto: "Tecnologia da informação e ciência de dados", subassuntos: ["banco-de-dados", "normalizacao", "apis", "modelos", "versionamento", "seguranca"], bloco: "Conhecimentos específicos", facts: MC_FACTS.tiDados, sourceKey: "ibge_conteudo", inspiracao: "Conteúdo programático oficial IBGE 2026 para TI, Desenvolvimento e Ciência de Dados", tags: ["ibge", "analista", "ti"] },
    { prefix: "SAN-POR", count: 45, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-portugues", materia: "Língua Portuguesa", assunto_id: "portugues", assunto: "Português para Oficial de Administração", subassuntos: ["interpretacao", "concordancia", "pontuacao", "coesao"], bloco: "Conhecimentos gerais", facts: MC_FACTS.portugues, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026 e padrão IBAM", tags: ["santos", "ibam"] },
    { prefix: "SAN-MAT", count: 25, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-matematica", materia: "Matemática", assunto_id: "matematica", assunto: "Matemática para Oficial de Administração", subassuntos: ["porcentagem", "regra-de-tres", "media", "logica"], bloco: "Conhecimentos gerais", facts: MC_FACTS.matematica, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026 e padrão IBAM", tags: ["santos", "ibam"] },
    { prefix: "SAN-LEG", count: 35, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-legislacao", materia: "Legislação municipal e serviço público", assunto_id: "legislacao-municipal", assunto: "Serviço público municipal", subassuntos: ["legalidade", "atendimento", "sigilo"], bloco: "Legislação", facts: MC_FACTS.santosLegislacao, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026, legislação municipal e padrão IBAM", tags: ["santos", "ibam"] },
    { prefix: "SAN-ADM", count: 45, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-especificos", materia: "Conhecimentos específicos administrativos", assunto_id: "administracao", assunto: "Rotinas administrativas municipais", subassuntos: ["protocolo", "arquivo", "materiais", "redacao"], bloco: "Conhecimentos específicos", facts: MC_FACTS.administracao, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026 e provas administrativas no padrão IBAM", tags: ["santos", "ibam"] },
    { prefix: "PMSP-POR", count: 40, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-portugues", materia: "Língua Portuguesa e Interpretação de Texto", assunto_id: "portugues", assunto: "Português e interpretação para PM-SP", subassuntos: ["interpretacao", "concordancia", "pontuacao", "coesao"], bloco: "Prova objetiva", facts: MC_FACTS.portugues, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-MAT", count: 30, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-matematica", materia: "Matemática", assunto_id: "matematica", assunto: "Matemática para PM-SP", subassuntos: ["porcentagem", "regra-de-tres", "media", "logica"], bloco: "Prova objetiva", facts: MC_FACTS.matematica, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-CGE", count: 30, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-conhecimentos-gerais", materia: "Conhecimentos Gerais", assunto_id: "conhecimentos-gerais", assunto: "História, Geografia e Atualidades", subassuntos: ["historia-do-brasil", "geografia-do-brasil", "atualidades", "cidadania"], bloco: "Prova objetiva", facts: MC_FACTS.pmspConhecimentosGerais, sourceKey: "pmsp_agencia_sp", inspiracao: "Edital PM-SP DP-3/321/26, conteúdo programático oficial e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-INF", count: 10, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-informatica", materia: "Noções Básicas de Informática", assunto_id: "informatica", assunto: "Informática básica", subassuntos: ["seguranca", "planilhas", "internet", "editor-texto"], bloco: "Prova objetiva", facts: MC_FACTS.informaticaBasica, sourceKey: "pmsp_agencia_sp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-ADM", count: 10, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-administracao-publica", materia: "Noções de Administração Pública", assunto_id: "administracao-publica", assunto: "Constituição, Constituição paulista e LAI", subassuntos: ["legalidade", "impessoalidade", "eficiencia", "lai"], bloco: "Prova objetiva", facts: MC_FACTS.pmspAdministracaoPublica, sourceKey: "pmsp_agencia_sp", inspiracao: "Edital PM-SP DP-3/321/26, Lei 12.527/2011 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
  ].forEach(generateMC);

  const questionCountsByRole = QUESTIONS.reduce((acc, question) => {
    question.cargos_compativeis.forEach((roleId) => {
      const key = `${question.concurso_id}:${roleId}`;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const questionCountsByContest = QUESTIONS.reduce((acc, question) => {
    acc[question.concurso_id] = (acc[question.concurso_id] || 0) + 1;
    return acc;
  }, {});

  window.STUDY_DATA = {
    version: "2026.07.18-pmsp",
    generatedAt: CREATED_AT,
    users: USERS,
    concursos: CONCURSOS,
    sources: SOURCES,
    questoes: QUESTIONS,
    counts: {
      byContest: questionCountsByContest,
      byRole: questionCountsByRole,
      total: QUESTIONS.length,
    },
  };

  window.BANCO_QUESTOES = QUESTIONS.filter((question) => question.concurso_id === "crt-sp");
  window.MINIMOS_PROVA_REAL = { basicos: 10, complementares: 8, especificos: 17, total: 36 };
})();
