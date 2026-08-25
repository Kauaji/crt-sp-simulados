// Banco autoral e estático. As questões são inéditas, não copiam provas reais e
// foram estruturadas a partir de editais, legislação oficial e padrão das bancas.
"use strict";

(function bootstrapStudyData() {
  const LETTERS = ["A", "B", "C", "D", "E"];
  const CREATED_AT = "2026-07-18";
  const UPDATED_AT = "2026-08-20";

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
    ibge_avalia_imasul_ti_2024: {
      title: "Instituto Avalia 2024 — IMASUL/SEMADESC — Técnico Ambiental - Técnico em Informática",
      url: "https://www.pciconcursos.com.br/provas/download/tecnico-ambiental-tecnico-em-informatica-imasul-semadesc-instituto-avalia-2024",
      type: "prova",
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
    santos_lei_organica: {
      title: "Lei Orgânica do Município de Santos — texto disponibilizado pelo e-Gov Santos",
      url: "https://egov.santos.sp.gov.br/legis/documents/9596/download",
      type: "legislacao",
    },
    santos_estatuto_4623: {
      title: "Lei Municipal nº 4.623/1984 — Estatuto dos Funcionários Públicos Municipais de Santos",
      url: "https://egov.santos.sp.gov.br/legis/documents/55/view",
      type: "legislacao",
    },
    santos_lc_1253: {
      title: "Lei Complementar Municipal nº 1.253/2024 — organização da Administração de Santos",
      url: "https://egov.santos.sp.gov.br/legis/documents/10609/view",
      type: "legislacao",
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
    pmsp_programa: {
      title: "Edital DP-3/321/26 — conteúdo programático de Conhecimentos Gerais",
      url: "https://documento.vunesp.com.br/documento/stream/MTI5MDc1NQ%3D%3D",
      type: "edital",
    },
    parlamento_uk_primeira_guerra: {
      title: "Parlamento do Reino Unido — Duty and Democracy: Parliament and the First World War",
      url: "https://www.parliament.uk/globalassets/documents/ww1/duty-and-democracy-parliament-and-the-first-world-war.pdf",
      type: "orgao",
    },
    ushmm_nazismo: {
      title: "United States Holocaust Memorial Museum — O Partido Nazista",
      url: "https://encyclopedia.ushmm.org/content/pt-br/article/the-nazi-party-1",
      type: "orgao",
    },
    us_state_guerra_fria: {
      title: "U.S. Department of State — marcos históricos da Guerra Fria",
      url: "https://history.state.gov/milestones/1945-1952",
      type: "orgao",
    },
    ipea_globalizacao: {
      title: "IPEA — globalização, políticas e desenvolvimento",
      url: "https://repositorio.ipea.gov.br/bitstream/11058/3204/1/140616_polticaexternaespaco3.pdf",
      type: "orgao",
    },
    ipea_geopolitica: {
      title: "IPEA — Evolução geopolítica: cenários e perspectivas",
      url: "https://repositorio.ipea.gov.br/bitstream/11058/1570/1/td_1611.pdf",
      type: "orgao",
    },
    arquivo_nacional_vargas: {
      title: "Arquivo Nacional — Governo Provisório de Getúlio Vargas (1930–1934)",
      url: "https://www.gov.br/arquivonacional/pt-br/canais_atendimento/imprensa/noticias/conclusao-do-projeto-estado-administracao-e-reforma-o-governo-provisorio-de-getulio-vargas-1930-1934",
      type: "orgao",
    },
    senado_constituicoes: {
      title: "Senado Federal — Constituições brasileiras",
      url: "https://www12.senado.leg.br/noticias/constituicoes",
      type: "orgao",
    },
    senado_redemocratizacao: {
      title: "Senado Federal — marcos da redemocratização brasileira",
      url: "https://www12.senado.leg.br/noticias/infomaterias/2025/03/a-redemocratizacao-em-dez-atos",
      type: "orgao",
    },
    ibge_atlas_escolar: {
      title: "IBGE — Atlas Geográfico Escolar",
      url: "https://www.ibge.gov.br/geociencias/atlas/nacional/16633-atlas-geografico-escolar.html",
      type: "orgao",
    },
    onu_historia: {
      title: "Nações Unidas — história e marcos da organização",
      url: "https://www.un.org/en/about-us/history-of-the-un",
      type: "orgao",
    },
    onu_ambiente: {
      title: "Nações Unidas — clima, biodiversidade e poluição",
      url: "https://www.un.org/en/climatechange/science/climate-issues/biodiversity",
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
    lei_14133: {
      title: "Lei 14.133/2021 — Licitações e Contratos Administrativos",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm",
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
    crt_regimento: {
      title: "Regimento Interno do CRT-SP — Decisão Plenária CFT nº 01/2019",
      url: "https://www.crtsp.gov.br/wp-content/uploads/2019/07/CRT-SP-REGIMENTO-INTERNO_.pdf",
      type: "norma",
    },
    cft_res_206: {
      title: "Resolução CFT nº 206/2022 — Código de Ética e Disciplina do Técnico Industrial",
      url: "https://cft.org.br/codigo-de-etica/",
      type: "norma",
    },
    cft_res_207_208: {
      title: "Resoluções CFT nº 207/2022 e nº 208/2023 — códigos de processo e de conduta ética",
      url: "https://cft.org.br/semana-de-aperfeicoamento-das-comissoes-prossegue-com-palestras-e-debates/",
      type: "norma",
    },
    cft_res_288: {
      title: "Resolução CFT nº 288/2025 — fiscalização e processo por infração",
      url: "https://cft.org.br/wp-content/uploads/2026/03/288.pdf",
      type: "norma",
    },
    manual_redacao: {
      title: "Manual de Redação da Presidência da República",
      url: "https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica",
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
        { id: "crt-fiscalizacao", roleIds: ["crt-fiscal-bs"], nome: "Fiscalização profissional", bloco: "Conhecimentos específicos", assuntos: ["Planejamento", "Inspeção", "Evidências", "Relatório", "Rastreabilidade", "Orientação"] },
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
            totalQuestoes: 40,
            duracaoMinutos: 240,
            scoring: { correct: 1, wrong: 0, blank: 0 },
            minima: { redacao: 20 },
            distribution: [
              { kind: "materia", id: "santos-portugues", label: "Língua Portuguesa", count: 10 },
              { kind: "materia", id: "santos-matematica", label: "Matemática", count: 6 },
              { kind: "materia", id: "santos-legislacao", label: "Legislação municipal e serviço público", count: 8 },
              { kind: "materia", id: "santos-informatica", label: "Informática e rotinas", count: 6 },
              { kind: "materia", id: "santos-especificos", label: "Conhecimentos específicos administrativos", count: 10 },
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
        { id: "santos-informatica", nome: "Informática e rotinas", bloco: "Conhecimentos gerais", assuntos: ["Segurança da informação", "Planilhas", "Editor de textos", "Internet", "Organização de arquivos"] },
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
    "Ao revisar um procedimento antes de registrá-lo no sistema",
    "Durante a organização de uma fila de atendimento prioritário",
    "Na análise de uma solicitação enviada por canal digital",
    "Ao preparar uma resposta fundamentada para o interessado",
    "Durante a passagem de uma demanda entre duas unidades",
    "Na verificação de conformidade de um cadastro profissional",
    "Ao documentar uma ocorrência para permitir rastreabilidade",
    "Na revisão de controles internos de uma unidade regional",
  ];

  const MC_CONTEXTS = [
    "ao conferir uma informação antes de registrá-la",
    "ao orientar uma pessoa sem extrapolar os dados disponíveis",
    "ao comparar duas soluções para a mesma demanda",
    "ao revisar um procedimento que precisa ser auditável",
    "ao interpretar um relatório antes de tomar uma decisão",
    "ao identificar a alternativa tecnicamente mais precisa",
    "ao evitar uma generalização que comprometa a conclusão",
    "ao organizar dados usados por mais de uma equipe",
    "ao verificar a coerência entre uma regra e sua aplicação",
    "ao preparar uma resposta clara para o cidadão",
    "ao acompanhar um indicador sujeito a erro de interpretação",
    "ao validar uma etapa antes de encaminhar o trabalho",
    "ao registrar a justificativa de uma decisão administrativa",
    "ao corrigir uma falha encontrada durante a conferência",
    "ao aplicar o conteúdo do edital a uma situação concreta",
    "ao distinguir um conceito correto de uma afirmação absoluta",
  ];

  const MC_AUDIENCES = {
    "ibge::ibge-acq": "Em uma atividade de coleta e controle de qualidade do IBGE",
    "ibge::ibge-analista-ti-dados": "Em uma equipe de tecnologia e dados do IBGE",
    "santos-oficial::santos-oficial-administracao": "Na rotina de Oficial de Administração da Prefeitura de Santos",
    "pm-sp::pmsp-aluno-soldado-qp": "Em uma situação de preparação para o cargo de Aluno-Soldado da PM-SP",
  };

  const MC_CONTEXTS_BY_ROLE = {
    "ibge::ibge-acq": [
      "ao conferir uma informação coletada antes de registrá-la",
      "ao revisar uma etapa que precisa manter rastreabilidade",
      "ao comparar respostas durante o controle de qualidade",
      "ao interpretar um indicador antes de orientar a equipe de campo",
      "ao validar uma ocorrência sem alterar indevidamente os dados",
      "ao preparar uma orientação compatível com o procedimento censitário",
    ],
    "ibge::ibge-analista-ti-dados": [
      "ao validar uma decisão técnica antes da implantação",
      "ao revisar uma solução que precisa ser segura e auditável",
      "ao comparar alternativas para tratamento e análise de dados",
      "ao documentar um critério para revisão por outra pessoa analista",
      "ao investigar uma falha sem comprometer a integridade dos dados",
      "ao selecionar a solução mais precisa para o requisito apresentado",
    ],
    "santos-oficial::santos-oficial-administracao": [
      "ao registrar uma demanda administrativa para acompanhamento",
      "ao conferir documentos antes de encaminhá-los a outra unidade",
      "ao preparar uma comunicação clara para o público interno ou externo",
      "ao revisar um procedimento sujeito a controle posterior",
      "ao organizar informações usadas na continuidade do atendimento",
      "ao aplicar uma regra do edital a uma rotina municipal",
    ],
    "pm-sp::pmsp-aluno-soldado-qp": [
      "ao resolver um item de treinamento no padrão VUNESP",
      "ao revisar o raciocínio antes de marcar a folha de respostas",
      "ao comparar duas soluções propostas para o mesmo item",
      "ao identificar a alternativa mais precisa entre opções plausíveis",
      "ao conferir uma resposta durante a preparação para a prova",
      "ao justificar tecnicamente a alternativa escolhida",
    ],
  };

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
      {
        certo: "no sentido de ver, o verbo assistir rege, na norma-padrão, a preposição 'a'.",
        errado: "no sentido de ver, o verbo assistir rejeita preposição em qualquer construção da norma-padrão.",
        exp: "Com o sentido de presenciar ou ver, 'assistir' é tradicionalmente transitivo indireto e rege a preposição 'a'.",
      },
      {
        certo: "o pronome relativo 'cujo' expressa posse e concorda com o termo que o sucede.",
        errado: "o pronome relativo 'cujo' deve ser seguido de artigo definido em qualquer construção.",
        exp: "'Cujo' liga possuidor e coisa possuída, concorda com esta e não admite artigo logo depois.",
      },
      {
        certo: "usa-se 'há' para indicar tempo decorrido e 'a' em referência a tempo futuro.",
        errado: "a forma 'há' deve indicar qualquer prazo futuro, enquanto 'a' registra apenas tempo passado.",
        exp: "O verbo haver marca tempo transcorrido; a preposição 'a' pode marcar distância temporal futura.",
      },
      {
        certo: "em 'publicaram-se os resultados', o verbo concorda com o sujeito paciente plural.",
        errado: "em toda construção com 'se', o verbo deve permanecer obrigatoriamente no singular.",
        exp: "Na voz passiva sintética, o verbo concorda com o sujeito paciente, como ocorre com 'os resultados'.",
      },
      {
        certo: "a escolha de conectivos deve respeitar a relação lógica existente entre as ideias.",
        errado: "conectivos de causa e de conclusão podem ser trocados livremente sem alterar o sentido.",
        exp: "Conectivos orientam relações como causa, oposição e conclusão, e sua troca pode modificar a interpretação.",
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
      {
        certo: "a negação de 'se P, então Q' é representada por 'P e não Q'.",
        errado: "a negação de 'se P, então Q' é sempre 'não P e não Q'.",
        exp: "Uma implicação é falsa apenas quando o antecedente é verdadeiro e o consequente é falso.",
      },
      {
        certo: "a média aritmética pode ser alterada por valores extremos do conjunto.",
        errado: "a média aritmética permanece invariável quando qualquer valor do conjunto é modificado.",
        exp: "A média usa a soma de todos os valores e, por isso, é sensível a observações extremas.",
      },
      {
        certo: "ao dobrar todas as parcelas de uma soma, o total também dobra.",
        errado: "ao dobrar todas as parcelas de uma soma, o total permanece necessariamente igual.",
        exp: "Pela propriedade distributiva, duas vezes cada parcela equivale a duas vezes a soma original.",
      },
      {
        certo: "em juros simples, os juros de cada período são calculados sobre o capital inicial.",
        errado: "em juros simples, cada período incorpora obrigatoriamente os juros anteriores à base de cálculo.",
        exp: "Capitalização sobre o saldo acumulado caracteriza juros compostos; nos simples, a base é o capital inicial.",
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
      {
        certo: "o princípio do menor privilégio limita acessos ao necessário para a função exercida.",
        errado: "o princípio do menor privilégio recomenda permissão administrativa para todos os usuários.",
        exp: "Permissões mínimas reduzem exposição e impacto de erro ou comprometimento de credenciais.",
      },
      {
        certo: "criptografia em trânsito protege a comunicação, mas não substitui autenticação e controle de acesso.",
        errado: "uma conexão criptografada torna desnecessária a verificação de identidade dos usuários.",
        exp: "Confidencialidade do canal e autenticação são controles complementares, não intercambiáveis.",
      },
      {
        certo: "o cache do navegador armazena recursos temporariamente para acelerar acessos posteriores.",
        errado: "o cache do navegador certifica que todo conteúdo visitado é verdadeiro e seguro.",
        exp: "Cache melhora desempenho, mas não valida autoria, legitimidade ou segurança do conteúdo.",
      },
      {
        certo: "em planilhas, a referência absoluta mantém linha e coluna fixas quando a fórmula é copiada.",
        errado: "uma referência absoluta muda livremente de linha e coluna sempre que a fórmula é copiada.",
        exp: "Sinais de cifrão fixam os componentes da referência, como em $A$1.",
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
      {
        certo: "vantagem oferecida por interessado deve ser recusada e tratada conforme as regras de integridade aplicáveis.",
        errado: "presente de interessado pode ser aceito sempre que não houver recibo ou registro formal.",
        exp: "Benefícios de interessados podem comprometer independência e aparência de imparcialidade do agente público.",
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
      {
        certo: "mera divergência interpretativa da lei, sem os elementos exigidos pelo tipo, não configura por si só improbidade.",
        errado: "qualquer interpretação jurídica posteriormente rejeitada configura automaticamente improbidade.",
        exp: "A responsabilização não decorre de simples divergência interpretativa e depende dos requisitos previstos na Lei de Improbidade.",
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
      {
        certo: "o interessado pode acompanhar a tramitação e conhecer decisões de processo que lhe diga respeito, ressalvado sigilo legal.",
        errado: "o interessado pode ser impedido de conhecer qualquer decisão do próprio processo apenas por conveniência da unidade.",
        exp: "A participação do interessado e o acesso aos atos pertinentes sustentam defesa e controle da decisão administrativa.",
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
      {
        certo: "a função de direção envolve orientar pessoas, comunicar prioridades e coordenar a execução.",
        errado: "a função de direção limita-se a arquivar resultados depois que todas as atividades terminam.",
        exp: "Direção mobiliza e coordena pessoas durante a execução dos planos organizacionais.",
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
      {
        certo: "controle de versão evita que alterações sucessivas apaguem a identificação do documento vigente.",
        errado: "documentos compartilhados dispensam identificação de versão porque todos os arquivos têm validade simultânea.",
        exp: "Versão, data e responsável distinguem o documento atual de rascunhos ou registros superados.",
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
      {
        certo: "a padronização de documentos oficiais favorece identificação, leitura e recuperação das informações.",
        errado: "cada unidade deve criar forma inteiramente distinta para documentos equivalentes, sem observar padrão institucional.",
        exp: "Padrões consistentes reduzem ambiguidades e facilitam tramitação, compreensão e gestão documental.",
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
      {
        certo: "atendimento acessível deve considerar barreiras de comunicação e oferecer meio adequado quando disponível.",
        errado: "o mesmo canal deve ser imposto a todos os usuários, ainda que crie barreira de acesso evitável.",
        exp: "Acessibilidade procura remover barreiras para que diferentes usuários compreendam e utilizem o serviço.",
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
      {
        certo: "inventário físico compara as quantidades existentes com os registros de controle.",
        errado: "inventário físico consiste apenas em estimar o saldo, sem contar ou verificar os itens armazenados.",
        exp: "A contagem física identifica diferenças entre a existência real e os saldos registrados.",
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
        certo: "a Lei 13.639/2018 criou o CFT e os CRTs como autarquias com autonomia administrativa e financeira e estrutura federativa.",
        errado: "a Lei 13.639/2018 criou o CFT e os CRTs como associações privadas sem autonomia financeira.",
        exp: "O artigo 1º da Lei 13.639/2018 qualifica os conselhos criados como autarquias autônomas e organizadas em estrutura federativa.",
        sourceKey: "lei_13639",
        subassunto: "lei-13639-natureza-juridica",
      },
      {
        certo: "orientar, disciplinar e fiscalizar o exercício profissional das respectivas categorias são funções dos conselhos federais e regionais.",
        errado: "a Lei 13.639/2018 reserva aos conselhos apenas função consultiva, sem competência disciplinar ou fiscalizatória.",
        exp: "O artigo 3º da Lei 13.639/2018 reúne expressamente as funções de orientação, disciplina e fiscalização profissional.",
        sourceKey: "lei_13639",
        subassunto: "lei-13639-finalidades",
      },
      {
        certo: "compete aos CRTs cadastrar profissionais e pessoas jurídicas habilitadas, fiscalizar o exercício profissional e julgar processos disciplinares em primeira instância.",
        errado: "os CRTs apenas remetem cadastros e fiscalizações ao CFT, pois não possuem competências próprias previstas em lei.",
        exp: "Os incisos V, IX e X do art. 12 da Lei 13.639/2018 atribuem essas atividades aos conselhos regionais.",
        sourceKey: "lei_13639",
        subassunto: "lei-13639-competencias-dos-crts",
      },
      {
        certo: "o exercício da profissão de Técnico Industrial de nível médio é livre, desde que observadas as condições de capacidade estabelecidas na Lei 5.524/1968.",
        errado: "a Lei 5.524/1968 torna livre o exercício da profissão sem exigir as condições de capacidade nela estabelecidas.",
        exp: "O artigo 1º da Lei 5.524/1968 condiciona expressamente o livre exercício profissional aos requisitos legais de capacidade.",
        sourceKey: "lei_5524",
        subassunto: "lei-5524-capacidade-profissional",
      },
      {
        certo: "a Lei 5.524/1968 inclui, entre as atividades do técnico, conduzir trabalhos de sua especialidade e assumir projetos compatíveis com sua formação.",
        errado: "a Lei 5.524/1968 autoriza o técnico a assumir qualquer projeto, mesmo incompatível com sua formação profissional.",
        exp: "O artigo 2º da Lei 5.524/1968 enumera campos de atuação e vincula a elaboração e a execução de projetos à respectiva formação profissional.",
        sourceKey: "lei_5524",
        subassunto: "lei-5524-campo-de-atuacao",
      },
      {
        certo: "cargos de Técnico Industrial de nível médio, no setor público ou na economia privada, devem ser exercidos por profissionais legalmente habilitados.",
        errado: "a exigência de habilitação legal para cargos de Técnico Industrial aplica-se ao setor privado, mas não alcança o serviço público.",
        exp: "O artigo 4º da Lei 5.524/1968 alcança os serviços públicos federal, estadual e municipal, órgãos indiretos e a economia privada.",
        sourceKey: "lei_5524",
        subassunto: "lei-5524-habilitacao-legal",
      },
      {
        certo: "o Decreto 90.922/1985 admite diploma técnico estrangeiro quando revalidado na forma da legislação pertinente.",
        errado: "o Decreto 90.922/1985 equipara automaticamente todo diploma técnico estrangeiro, dispensando revalidação no Brasil.",
        exp: "O artigo 2º, inciso II, do Decreto 90.922/1985 exige a revalidação do diploma estrangeiro segundo a legislação vigente.",
        sourceKey: "decreto_90922",
        subassunto: "decreto-90922-habilitacao",
      },
      {
        certo: "o Decreto 90.922/1985 permite ao técnico orientar equipes de execução e prestar assistência em projetos, vistorias e controle de qualidade, dentro de sua habilitação.",
        errado: "o Decreto 90.922/1985 restringe o técnico à execução manual, vedando orientação de equipes e assistência técnica.",
        exp: "Os artigos 3º e 4º do Decreto 90.922/1985 contemplam condução, orientação, assistência, vistoria e outras atividades técnicas compatíveis.",
        sourceKey: "decreto_90922",
        subassunto: "decreto-90922-atribuicoes",
      },
      {
        certo: "as atribuições previstas no Decreto 90.922/1985 devem respeitar a modalidade e os limites da formação profissional do técnico.",
        errado: "o Decreto 90.922/1985 confere atribuições idênticas e ilimitadas a todas as modalidades técnicas.",
        exp: "O decreto condiciona o exercício das atividades técnicas à especialidade e à compatibilidade com a formação profissional.",
        sourceKey: "decreto_90922",
        subassunto: "decreto-90922-limites-da-formacao",
      },
      {
        certo: "o Decreto 4.560/2002 alterou os arts. 6º, 9º e 15 do Decreto 90.922/1985 e revogou o art. 10 desse regulamento.",
        errado: "o Decreto 4.560/2002 substituiu integralmente o Decreto 90.922/1985 e revogou a Lei 5.524/1968.",
        exp: "O Decreto 4.560/2002 promoveu alterações pontuais no regulamento e revogou apenas seu art. 10, sem revogar a lei regulamentada.",
        sourceKey: "decreto_4560",
        subassunto: "decreto-4560-alteracoes",
      },
      {
        certo: "o Regimento Interno define o CRT-SP como autarquia federal destinada a orientar, disciplinar e fiscalizar o exercício da profissão do Técnico Industrial.",
        errado: "o Regimento Interno define o CRT-SP como sindicato estadual destinado exclusivamente à representação trabalhista.",
        exp: "O artigo 1º do Regimento trata da natureza pública do CRT-SP e de suas finalidades profissionais e éticas.",
        sourceKey: "crt_regimento",
        subassunto: "regimento-crtsp-natureza-e-finalidade",
      },
      {
        certo: "o Regimento Interno prevê ações orientadoras, disciplinadoras, fiscalizadoras, regulamentadoras, judicantes, informativas e de atendimento.",
        errado: "o Regimento Interno limita a atuação do CRT-SP a ações arrecadatórias, excluindo orientação, fiscalização e atendimento.",
        exp: "O artigo 2º do Regimento enumera diversas formas de atuação institucional, que não se reduzem à arrecadação.",
        sourceKey: "crt_regimento",
        subassunto: "regimento-crtsp-acoes-institucionais",
      },
      {
        certo: "a Resolução CFT nº 206/2022 adota o Código de Ética e Disciplina do Técnico Industrial.",
        errado: "a Resolução CFT nº 206/2022 trata exclusivamente da estrutura orçamentária do Conselho Federal.",
        exp: "A Resolução CFT nº 206/2022 é o ato que adota o Código de Ética e Disciplina da categoria.",
        sourceKey: "cft_res_206",
        subassunto: "resolucao-cft-206-2022",
      },
      {
        certo: "as Resoluções CFT nº 207/2022 e nº 208/2023 adotam, respectivamente, o Código de Processo Ético Profissional e o Código de Conduta Ética de diretores e conselheiros.",
        errado: "as Resoluções CFT nº 207/2022 e nº 208/2023 extinguem o processo ético e dispensam regras de conduta para dirigentes do sistema.",
        exp: "Os atos possuem destinatários e objetos distintos: processo ético profissional e conduta ética dos membros eleitos do Sistema CFT/CRTs.",
        sourceKey: "cft_res_207_208",
        subassunto: "resolucoes-cft-207-208",
      },
      {
        certo: "a Resolução CFT nº 288/2025 disciplina a fiscalização profissional e os procedimentos de processos por infração e aplicação de penalidades.",
        errado: "a Resolução CFT nº 288/2025 elimina a formalização e o julgamento de processos por infração profissional.",
        exp: "A Resolução CFT nº 288/2025 organiza justamente os procedimentos de fiscalização, instrução, julgamento e penalização por infrações.",
        sourceKey: "cft_res_288",
        subassunto: "resolucao-cft-288-2025",
      },
    ],
    fiscalizacao: [
      {
        certo: "uma fiscalização profissional deve registrar fatos observados, documentos analisados e providências adotadas de modo rastreável.",
        errado: "uma fiscalização profissional pode dispensar registros quando o agente recordar os fatos posteriormente.",
        exp: "Registros objetivos preservam rastreabilidade, permitem revisão e sustentam as providências administrativas.",
      },
      {
        certo: "o fiscal deve comparar a atividade efetivamente executada com as atribuições profissionais e a documentação apresentada.",
        errado: "o fiscal deve avaliar apenas o nome comercial da empresa, sem observar a atividade executada ou os documentos profissionais.",
        exp: "A análise fiscalizatória depende dos fatos, das atribuições e da documentação aplicável ao caso concreto.",
      },
      {
        certo: "a descrição de uma não conformidade deve ser clara e separar fato constatado, fundamento e medida solicitada.",
        errado: "a descrição de uma não conformidade deve usar termos vagos para permitir qualquer interpretação futura.",
        exp: "Clareza e separação entre constatação, fundamento e providência reduzem ambiguidade e facilitam a defesa.",
      },
      {
        certo: "a coleta de evidências deve observar pertinência, integridade e identificação da origem do registro.",
        errado: "qualquer imagem sem data, origem ou relação com o objeto fiscalizado constitui prova suficiente por si só.",
        exp: "Evidências precisam ter relação com a ocorrência e elementos que permitam verificar sua origem e integridade.",
      },
      {
        certo: "o tratamento de dados pessoais durante a fiscalização deve limitar-se ao necessário para a finalidade institucional.",
        errado: "dados pessoais obtidos em fiscalização podem ser divulgados integralmente porque foram acessados por agente público.",
        exp: "A finalidade institucional não afasta os deveres de necessidade, segurança e proteção de dados pessoais.",
      },
      {
        certo: "o planejamento de fiscalização pode priorizar risco, impacto e recorrência sem abandonar critérios objetivos.",
        errado: "o planejamento de fiscalização deve escolher alvos apenas pela preferência pessoal do agente.",
        exp: "Critérios de risco e impacto tornam a alocação de recursos justificável e reduzem arbitrariedade.",
      },
      {
        certo: "uma orientação preventiva pode corrigir falhas e reduzir reincidência quando compatível com a norma e com o caso.",
        errado: "a orientação preventiva impede qualquer providência posterior, mesmo se a irregularidade persistir.",
        exp: "Orientação e providências formais podem integrar uma atuação proporcional, conforme a situação encontrada.",
      },
      {
        certo: "a comunicação com o fiscalizado deve indicar a ocorrência e o encaminhamento de modo compreensível e respeitoso.",
        errado: "a comunicação fiscalizatória deve ser deliberadamente obscura para evitar questionamentos do interessado.",
        exp: "Linguagem clara favorece compreensão, cumprimento da orientação e exercício das garantias do interessado.",
      },
      {
        certo: "o relatório de fiscalização deve distinguir o que foi observado diretamente do que foi informado por terceiros.",
        errado: "o relatório de fiscalização pode apresentar relato de terceiro como constatação direta sem identificar a diferença.",
        exp: "Distinguir fontes e formas de obtenção da informação preserva a precisão do registro.",
      },
      {
        certo: "o agente deve atuar dentro de sua competência e encaminhar a outro órgão o que exceder sua atribuição.",
        errado: "o agente pode decidir matéria fora de sua competência sempre que considerar a medida conveniente.",
        exp: "Competência delimita a atuação administrativa; assuntos externos devem receber encaminhamento adequado.",
      },
      {
        certo: "a verificação de reincidência depende de consulta a registros confiáveis e da identificação correta da ocorrência anterior.",
        errado: "a reincidência pode ser presumida apenas porque duas ocorrências aconteceram no mesmo município.",
        exp: "Reincidência exige vinculação comprovável entre responsável, ocorrência e registro anterior pertinente.",
      },
      {
        certo: "checklist de inspeção apoia a padronização, mas não substitui a análise das particularidades do caso.",
        errado: "checklist de inspeção torna desnecessário registrar situações que não estavam previstas no formulário.",
        exp: "O checklist reduz omissões, enquanto o julgamento técnico continua necessário para fatos não padronizados.",
      },
      {
        certo: "a cadeia de custódia documental interna deve permitir identificar quem recebeu, alterou ou encaminhou cada registro relevante.",
        errado: "a movimentação de evidências pode ocorrer sem identificação dos responsáveis porque o processo pertence ao conselho.",
        exp: "Controle de acesso e histórico de movimentação protegem autenticidade, integridade e responsabilização.",
      },
      {
        certo: "a conclusão fiscalizatória deve decorrer dos fatos documentados e do fundamento aplicável, não de impressões pessoais.",
        errado: "a experiência do fiscal autoriza conclusão sem relação demonstrável com fatos ou normas.",
        exp: "Motivação baseada em fatos e fundamentos permite controle, coerência e tratamento impessoal.",
      },
      {
        certo: "quando houver risco imediato à segurança, o registro deve indicar o risco observado e o encaminhamento adotado dentro da competência do agente.",
        errado: "diante de risco imediato, o registro dos fatos e o acionamento do setor competente tornam-se dispensáveis.",
        exp: "Urgência exige resposta tempestiva, sem eliminar documentação e encaminhamento dentro das atribuições.",
      },
    ],
  };

  const CE_SUBJECTS = new Map([
    [CE_FACTS.portugues, ["crase", "concordancia-verbal", "pontuacao", "coesao", "concordancia-nominal", "regencia", "pronome-relativo", "emprego-de-ha-e-a", "voz-passiva-sintetica", "conectivos"]],
    [CE_FACTS.rlm, ["negacao-logica", "porcentagem", "regra-de-tres", "conjuntos", "implicacao", "media-aritmetica", "propriedade-distributiva", "juros-simples"]],
    [CE_FACTS.informatica, ["autenticacao-em-dois-fatores", "backup", "phishing", "planilhas", "menor-privilegio", "criptografia", "cache", "referencia-absoluta"]],
    [CE_FACTS.etica, ["integridade", "conflito-de-interesses", "vantagens-e-presentes"]],
    [CE_FACTS.administracaoPublica, ["eficiencia-e-legalidade", "desconcentracao", "elementos-do-ato"]],
    [CE_FACTS.lai, ["publicidade-e-sigilo", "transparencia-ativa", "pedido-de-acesso"]],
    [CE_FACTS.lgpd, ["conceito-de-dado-pessoal", "poder-publico", "dados-sensiveis"]],
    [CE_FACTS.improbidade, ["elemento-subjetivo", "sancoes", "divergencia-interpretativa"]],
    [CE_FACTS.processoAdministrativo, ["motivacao", "competencia", "contraditorio-e-ampla-defesa", "direitos-do-interessado"]],
    [CE_FACTS.administracaoGeral, ["planejamento", "controle", "pdca", "direcao"]],
    [CE_FACTS.rotinas, ["checklists", "rastreabilidade", "controle-de-versao"]],
    [CE_FACTS.redacao, ["atributos-da-redacao-oficial", "concisao", "padronizacao"]],
    [CE_FACTS.protocolo, ["autuacao", "temporalidade", "arquivo-corrente"]],
    [CE_FACTS.atendimento, ["escuta-ativa", "linguagem-simples", "acessibilidade"]],
    [CE_FACTS.materiais, ["curva-abc", "peps", "estoque-de-seguranca", "inventario-fisico"]],
    [CE_FACTS.logistica, ["lead-time", "layout-de-almoxarifado"]],
    [CE_FACTS.licitacoes, ["pregao", "inexigibilidade", "segregacao-de-funcoes"]],
    [CE_FACTS.sistemaCft, ["lei-13639-natureza-juridica", "lei-13639-finalidades", "lei-13639-competencias-dos-crts", "lei-5524-capacidade-profissional", "lei-5524-campo-de-atuacao", "lei-5524-habilitacao-legal", "decreto-90922-habilitacao", "decreto-90922-atribuicoes", "decreto-90922-limites-da-formacao", "decreto-4560-alteracoes", "regimento-crtsp-natureza-e-finalidade", "regimento-crtsp-acoes-institucionais", "resolucao-cft-206-2022", "resolucoes-cft-207-208", "resolucao-cft-288-2025"]],
    [CE_FACTS.fiscalizacao, ["rastreabilidade", "atribuicoes-profissionais", "nao-conformidade", "evidencias", "protecao-de-dados", "planejamento-por-risco", "orientacao-preventiva", "comunicacao", "relatorio", "competencia", "reincidencia", "checklist", "cadeia-documental", "motivacao", "risco-imediato"]],
  ]);

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
      {
        pergunta: "em 'Faz dois anos que o setor adotou o sistema', a forma verbal está no singular porque",
        correta: "o verbo fazer, ao indicar tempo decorrido, é impessoal.",
        distratores: ["o sujeito 'dois anos' está oculto.", "todo verbo seguido de numeral fica no singular.", "a oração possui sujeito indeterminado.", "a concordância com expressões de tempo é sempre facultativa."],
        explicacao: "Quando indica tempo decorrido, o verbo fazer é impessoal e permanece na terceira pessoa do singular.",
      },
      {
        pergunta: "assinale a redação que evita ambiguidade na retomada pronominal.",
        correta: "A chefia informou à servidora que o requerimento da servidora estava completo.",
        distratores: ["A chefia informou à servidora que seu requerimento estava completo.", "A chefia, quando falou com ela, disse que o seu estava completo.", "Ela informou a ela que aquele documento dela estava completo.", "A chefia informou que, para ela, o requerimento seu estava completo."],
        explicacao: "A repetição controlada do referente pode ser preferível a um pronome possessivo ambíguo, sobretudo em texto administrativo.",
      },
      {
        pergunta: "na frase 'Os relatórios, foram enviados ontem', a vírgula deve ser retirada porque",
        correta: "separa indevidamente o sujeito do predicado.",
        distratores: ["todo adjunto adverbial exige vírgula antes do verbo.", "o plural do sujeito impede o uso de pontuação.", "orações na voz passiva não admitem vírgula.", "a vírgula só pode aparecer em frases interrogativas."],
        explicacao: "Não se separa por vírgula o sujeito de seu predicado quando não há elemento intercalado que justifique a marcação.",
      },
      {
        pergunta: "em uma resposta que introduz a causa de um atraso, a forma adequada é",
        correta: "O envio atrasou porque o arquivo precisava de validação.",
        distratores: ["O envio atrasou por que o arquivo precisava de validação.", "O envio atrasou por quê o arquivo precisava de validação.", "O envio atrasou porquê o arquivo precisava de validação.", "O envio atrasou, por quê o arquivo precisava de validação."],
        explicacao: "A conjunção 'porque' introduz causa ou explicação; 'por que', 'por quê' e 'porquê' possuem usos diferentes.",
      },
      {
        pergunta: "o conectivo 'embora' estabelece, em regra, relação de",
        correta: "concessão, ao apresentar um fato que não impede a conclusão principal.",
        distratores: ["causa direta e suficiente.", "conclusão obrigatória.", "adição sem contraste.", "explicação equivalente a 'portanto'."],
        explicacao: "'Embora' é conjunção concessiva e introduz circunstância que poderia criar oposição, mas não impede o fato principal.",
      },
      {
        pergunta: "na voz passiva analítica de 'A equipe conferiu os cadastros', obtém-se",
        correta: "Os cadastros foram conferidos pela equipe.",
        distratores: ["Os cadastros conferiram a equipe.", "A equipe foi conferida pelos cadastros.", "Conferiram-se a equipe pelos cadastros.", "Os cadastros havia conferido pela equipe."],
        explicacao: "Na passagem para a voz passiva, o objeto direto vira sujeito paciente, e o agente pode ser introduzido pela preposição 'por'.",
      },
      {
        pergunta: "em enumeração administrativa, há paralelismo sintático em",
        correta: "receber documentos, conferir dados e registrar pendências.",
        distratores: ["recebimento de documentos, conferir dados e o registro de pendências.", "receber documentos, a conferência dos dados e pendências registradas.", "documentos recebidos, conferir dados e que se registrem pendências.", "o recebimento, dados conferidos e registrar as pendências."],
        explicacao: "O paralelismo mantém estruturas gramaticais equivalentes nos itens coordenados, favorecendo clareza e leitura uniforme.",
      },
      {
        pergunta: "a reescrita que preserva o sentido de 'Se o cadastro estiver completo, o protocolo será concluído' é",
        correta: "O cadastro estar completo é condição suficiente para que o protocolo seja concluído.",
        distratores: ["O cadastro estar completo é condição necessária, mas não suficiente, para a conclusão do protocolo.", "A conclusão do protocolo é condição suficiente para que o cadastro esteja completo.", "O cadastro estar completo impede que o protocolo seja concluído.", "Cadastro completo e protocolo concluído são fatos sem relação condicional."],
        explicacao: "Na construção 'se P, então Q', P é condição suficiente para Q; a frase não afirma, por si só, que P seja condição necessária.",
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
      {
        pergunta: "um material custa R$ 240 e recebe desconto de 15%. O preço final é",
        correta: "R$ 204.",
        distratores: ["R$ 204,15.", "R$ 210.", "R$ 216.", "R$ 225."],
        explicacao: "Quinze por cento de 240 corresponde a 36; subtraindo o desconto, o preço final é 240 − 36 = 204.",
      },
      {
        pergunta: "em uma equipe, a razão entre 18 formulários revisados e 6 pendentes é",
        correta: "3 para 1.",
        distratores: ["1 para 3.", "2 para 1.", "3 para 2.", "6 para 18."],
        explicacao: "A razão 18:6 é simplificada pela divisão de ambos os termos por 6, resultando em 3:1.",
      },
      {
        pergunta: "ao escolher aleatoriamente um processo entre 20, dos quais 5 estão pendentes, a probabilidade de selecionar um pendente é",
        correta: "25%.",
        distratores: ["5%.", "15%.", "20%.", "75%."],
        explicacao: "Há 5 casos favoráveis em 20 possíveis; 5/20 = 1/4 = 25%.",
      },
      {
        pergunta: "dois avisos são emitidos a cada 6 e 8 dias e coincidiram hoje. Eles voltarão a coincidir em",
        correta: "24 dias.",
        distratores: ["14 dias.", "36 dias.", "48 dias.", "56 dias."],
        explicacao: "O mínimo múltiplo comum entre 6 e 8 é 24, primeiro intervalo em que os dois ciclos voltam a coincidir.",
      },
      {
        pergunta: "se 4x + 12 = 40, então o valor de x é",
        correta: "7.",
        distratores: ["4.", "8.", "10.", "13."],
        explicacao: "Subtraindo 12 dos dois lados, obtém-se 4x = 28; dividindo por 4, x = 7.",
      },
      {
        pergunta: "a mediana do conjunto 3, 5, 7, 11 e 14 é",
        correta: "7.",
        distratores: ["5.", "8.", "10.", "11."],
        explicacao: "Com cinco valores já ordenados, a mediana é o elemento central, que ocupa a terceira posição: 7.",
      },
      {
        pergunta: "um retângulo com 8 m de comprimento e 5 m de largura possui área de",
        correta: "40 m².",
        distratores: ["13 m².", "26 m².", "40 m.", "80 m²."],
        explicacao: "A área de um retângulo é o produto do comprimento pela largura: 8 × 5 = 40 m².",
      },
      {
        pergunta: "um valor de R$ 1.000 aplicado a juros simples de 2% ao mês por 3 meses gera juros de",
        correta: "R$ 60.",
        distratores: ["R$ 20.", "R$ 40.", "R$ 61,21.", "R$ 1.060."],
        explicacao: "Em juros simples, J = C × i × t; logo, 1.000 × 0,02 × 3 = 60.",
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
      {
        pergunta: "em um mapa na escala 1:100.000, uma distância de 2 cm representa, no terreno,",
        correta: "2 km.",
        distratores: ["200 m.", "20 km.", "100 km.", "200 km."],
        explicacao: "Na escala 1:100.000, cada centímetro no mapa equivale a 100.000 cm, ou 1 km, no terreno; 2 cm equivalem a 2 km.",
      },
      {
        pergunta: "saldo migratório positivo ocorre quando",
        correta: "o número de imigrantes supera o de emigrantes no período analisado.",
        distratores: ["nascimentos e óbitos possuem exatamente o mesmo valor.", "o número de emigrantes supera o de imigrantes.", "não existem deslocamentos dentro do território.", "a população rural é maior que a população urbana."],
        explicacao: "Saldo migratório é a diferença entre entradas e saídas de população; ele é positivo quando as entradas são maiores.",
      },
      {
        pergunta: "a transição demográfica caracteriza-se, em linhas gerais, pela passagem de",
        correta: "altas para baixas taxas de mortalidade e natalidade, em ritmos distintos.",
        distratores: ["baixa urbanização para ausência completa de cidades.", "migração interna para proibição de deslocamentos.", "baixa densidade para ocupação homogênea do território.", "crescimento vegetativo para extinção obrigatória da população."],
        explicacao: "O modelo descreve a redução histórica de mortalidade e natalidade, normalmente em momentos diferentes, alterando o ritmo de crescimento populacional.",
      },
      {
        pergunta: "a regionalização de um território consiste em",
        correta: "dividi-lo em áreas segundo critérios definidos para análise e planejamento.",
        distratores: ["eliminar diferenças entre todos os lugares.", "substituir limites administrativos por coordenadas aleatórias.", "considerar somente o clima, em qualquer estudo.", "impedir comparações entre áreas com características distintas."],
        explicacao: "Regiões são recortes construídos com critérios naturais, sociais, econômicos ou administrativos adequados à finalidade do estudo.",
      },
      {
        pergunta: "latitude e longitude permitem",
        correta: "localizar pontos na superfície terrestre por coordenadas angulares.",
        distratores: ["medir exclusivamente a altitude do relevo.", "calcular a população sem levantamento estatístico.", "substituir qualquer sistema de projeção cartográfica.", "identificar o tipo de solo sem observação adicional."],
        explicacao: "Latitude mede a posição norte-sul em relação ao Equador, e longitude mede a posição leste-oeste em relação a Greenwich.",
      },
      {
        pergunta: "a rede urbana é formada por",
        correta: "cidades articuladas por fluxos de pessoas, mercadorias, serviços e informações.",
        distratores: ["municípios isolados sem relações funcionais.", "apenas capitais estaduais com o mesmo tamanho populacional.", "áreas rurais que não mantêm contato com centros urbanos.", "limites naturais sem circulação econômica ou social."],
        explicacao: "A rede urbana expressa conexões e hierarquias entre centros, sustentadas por diferentes tipos de fluxo.",
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
      {
        pergunta: "uma omissão de cobertura ocorre quando",
        correta: "uma unidade que deveria ser pesquisada deixa de ser incluída na operação.",
        distratores: ["a mesma unidade é contada mais de uma vez.", "um resultado agregado é divulgado com proteção estatística.", "o questionário passa por verificação automática.", "a equipe registra corretamente uma recusa de resposta."],
        explicacao: "Erros de cobertura incluem omissões e duplicidades; na omissão, uma unidade pertencente ao universo não é alcançada ou contabilizada.",
      },
      {
        pergunta: "o georreferenciamento de uma unidade visitada contribui para",
        correta: "associar a coleta a uma localização e apoiar o controle de cobertura.",
        distratores: ["revelar publicamente respostas individualizadas.", "dispensar identificação e treinamento da equipe.", "corrigir qualquer resposta sem validação.", "eliminar a necessidade de mapas e setores de trabalho."],
        explicacao: "A referência espacial auxilia localização, acompanhamento do percurso e verificação de cobertura, respeitados os controles de sigilo.",
      },
      {
        pergunta: "diante de ausência do informante em uma primeira visita, a conduta técnica é",
        correta: "seguir o procedimento de retorno ou contato previsto e registrar a ocorrência.",
        distratores: ["inventar respostas com base em domicílios vizinhos.", "excluir a unidade sem qualquer anotação.", "divulgar o endereço para pedir ajuda em rede social.", "marcar o questionário como completo sem entrevista."],
        explicacao: "Ocorrências de não resposta devem ser registradas e tratadas conforme protocolos de revisita ou contato, sem fabricação de dados.",
      },
      {
        pergunta: "um indicador muito diferente do padrão de uma área deve levar a supervisão a",
        correta: "investigar dados, contexto e registros antes de concluir que existe erro.",
        distratores: ["alterar o valor imediatamente para aproximá-lo da média.", "descartar todo o setor sem análise.", "presumir fraude apenas pela diferença observada.", "publicar os dados individuais para obter confirmação externa."],
        explicacao: "Valores atípicos podem representar erro ou realidade local; a decisão exige verificação metodológica e evidências registradas.",
      },
      {
        pergunta: "metadados de uma pesquisa estatística descrevem",
        correta: "conceitos, variáveis, classificações, métodos e condições de produção dos dados.",
        distratores: ["somente os nomes dos entrevistadores.", "apenas resultados individuais identificados.", "opiniões pessoais sobre cada resposta.", "senhas usadas pelos sistemas de coleta."],
        explicacao: "Metadados permitem compreender significado, método, cobertura e limitações dos dados, favorecendo uso e interpretação adequados.",
      },
      {
        pergunta: "a padronização do treinamento das equipes é importante porque",
        correta: "reduz interpretações divergentes e melhora a comparabilidade da coleta.",
        distratores: ["autoriza cada agente a redefinir os conceitos oficiais.", "elimina a necessidade de supervisão e controles.", "permite ignorar atualizações do manual de campo.", "substitui todos os testes de consistência dos questionários."],
        explicacao: "Conceitos e procedimentos uniformes diminuem variações de execução que poderiam comprometer consistência e comparabilidade.",
      },
    ],
    tiDados: [
      {
        pergunta: "em banco de dados relacional, chave primária tem como função",
        correta: "identificar unicamente cada registro de uma tabela.",
        distratores: [
          "identificar apenas o valor mais recente, permitindo duplicidades nos registros anteriores.",
          "ordenar fisicamente todas as linhas sem impor unicidade aos valores armazenados.",
          "substituir as chaves estrangeiras e representar sozinha todos os relacionamentos do banco.",
          "aceitar valores nulos e repetidos sempre que existir um índice comum sobre a coluna.",
        ],
        explicacao: "A chave primária garante identidade única do registro.",
      },
      {
        pergunta: "normalização de dados busca",
        correta: "reduzir redundâncias e anomalias de inserção, atualização e exclusão.",
        distratores: [
          "concentrar todos os atributos em uma única tabela para eliminar qualquer necessidade de junção.",
          "remover dependências e chaves estrangeiras, ainda que os relacionamentos deixem de ser verificados.",
          "duplicar valores calculados em várias tabelas para que cada alteração seja executada separadamente.",
          "definir a ordem física das linhas como principal mecanismo de consistência entre entidades.",
        ],
        explicacao: "Normalização organiza tabelas e dependências para consistência.",
      },
      {
        pergunta: "uma API RESTful tende a utilizar",
        correta: "recursos identificáveis por URLs e métodos HTTP adequados.",
        distratores: [
          "um único endpoint com requisições POST para qualquer operação, sem distinguir recursos ou semântica.",
          "nomes de ações na URL como único contrato, ignorando a finalidade dos métodos e códigos HTTP.",
          "estado de sessão obrigatório no servidor para que cada requisição dependa integralmente da anterior.",
          "respostas com código 200 em todos os resultados, inclusive quando o recurso não existe ou a entrada é inválida.",
        ],
        explicacao: "REST organiza interação por recursos e métodos como GET, POST, PUT e DELETE.",
      },
      {
        pergunta: "em ciência de dados, validação de modelo é importante para",
        correta: "avaliar desempenho em dados não usados diretamente no ajuste.",
        distratores: [
          "medir apenas o desempenho no conjunto usado para ajustar os parâmetros e escolher a melhor execução.",
          "reutilizar continuamente o conjunto de teste durante o treinamento até obter a métrica desejada.",
          "dispensar a separação entre ajuste e avaliação quando o algoritmo apresenta baixa complexidade.",
          "garantir que a métrica observada permaneça idêntica em qualquer população ou mudança de contexto.",
        ],
        explicacao: "Validação ajuda a estimar generalização e reduzir overfitting.",
      },
      {
        pergunta: "controle de versão em desenvolvimento de software permite",
        correta: "registrar alterações, colaborar e recuperar estados anteriores do código.",
        distratores: [
          "manter apenas a versão mais recente de cada arquivo, sobrescrevendo o histórico após toda integração.",
          "evitar conflitos ao impedir que duas pessoas trabalhem em ramos diferentes do mesmo repositório.",
          "substituir testes automatizados pelo registro dos commits que modificaram cada módulo do sistema.",
          "resolver divergências sempre pela alteração mais nova, sem análise das diferenças entre os ramos.",
        ],
        explicacao: "Sistemas como Git apoiam colaboração, rastreabilidade e reversão.",
      },
      {
        pergunta: "criptografia em trânsito é normalmente usada para",
        correta: "proteger dados durante comunicação entre cliente e servidor.",
        distratores: [
          "proteger exclusivamente arquivos armazenados em disco, sem atuar sobre os dados enviados pela rede.",
          "autenticar e autorizar todos os usuários por si só, dispensando credenciais e políticas de acesso.",
          "ocultar do destinatário legítimo o conteúdo que ele precisa processar depois de receber a mensagem.",
          "substituir controles de autorização, pois um canal cifrado determina quais operações cada conta pode executar.",
        ],
        explicacao: "TLS/HTTPS protege confidencialidade e integridade na comunicação.",
      },
      {
        pergunta: "em um banco relacional, uma chave estrangeira serve para",
        correta: "referenciar uma chave de outra tabela e apoiar a integridade entre registros.",
        distratores: [
          "identificar unicamente cada linha da própria tabela, sem estabelecer vínculo com outra relação.",
          "permitir que a chave primária referenciada seja duplicada sem observar as restrições definidas.",
          "armazenar o resultado de toda junção para tornar desnecessária a consulta às tabelas relacionadas.",
          "ordenar fisicamente os registros das duas tabelas pela mesma coluna, sem validar referências existentes.",
        ],
        explicacao: "A chave estrangeira representa relacionamentos e pode impedir referências a registros inexistentes, conforme as restrições definidas.",
      },
      {
        pergunta: "a atomicidade de uma transação garante que",
        correta: "suas operações sejam confirmadas em conjunto ou desfeitas em conjunto.",
        distratores: [
          "os dados confirmados permaneçam disponíveis depois de uma falha, característica associada à durabilidade.",
          "transações concorrentes não observem estados intermediários umas das outras, característica ligada ao isolamento.",
          "cada operação preserve as restrições válidas do banco, aspecto associado à consistência transacional.",
          "uma falha confirme as operações já executadas e desfaça apenas as instruções que ainda não começaram.",
        ],
        explicacao: "Atomicidade evita estados parciais: a unidade transacional é concluída integralmente ou revertida.",
      },
      {
        pergunta: "em uma API HTTP, o código 404 indica, em regra, que",
        correta: "o recurso solicitado não foi encontrado.",
        distratores: ["a operação foi concluída com sucesso e sem conteúdo.", "o cliente não possui autenticação válida em qualquer caso.", "o servidor apresentou necessariamente falha interna.", "a requisição criou um novo recurso."],
        explicacao: "O status 404 pertence à classe de erros do cliente e sinaliza que o servidor não encontrou o recurso identificado pela requisição.",
      },
      {
        pergunta: "vazamento de dados entre treino e teste de um modelo ocorre quando",
        correta: "informação do conjunto de avaliação influencia indevidamente o treinamento.",
        distratores: ["o conjunto de teste permanece separado até a avaliação final.", "as métricas são calculadas após gerar previsões.", "o treino usa somente variáveis disponíveis no momento real de inferência.", "a validação é repetida com divisões controladas dos dados de treino."],
        explicacao: "Data leakage produz estimativas otimistas de desempenho porque o modelo recebe, direta ou indiretamente, informação que deveria permanecer fora do ajuste.",
      },
      {
        pergunta: "em um fluxo Git, a revisão de uma solicitação de merge permite",
        correta: "examinar alterações antes de integrá-las ao ramo de destino.",
        distratores: [
          "integrar automaticamente qualquer alteração que tenha compilado, sem permitir comentários sobre o conteúdo modificado.",
          "substituir os testes do projeto pela aprovação de duas pessoas, independentemente do risco da mudança.",
          "reescrever o histórico do ramo de destino para ocultar os commits examinados durante a discussão.",
          "publicar diretamente em produção uma versão diferente daquela registrada na solicitação revisada.",
        ],
        explicacao: "A revisão antes da integração favorece qualidade, discussão técnica e rastreabilidade das mudanças propostas.",
      },
      {
        pergunta: "hashing de senha difere de criptografia reversível porque",
        correta: "busca produzir representação unidirecional para verificação, com salt e algoritmo adequado.",
        distratores: ["permite recuperar diretamente a senha original com uma chave pública.", "dispensa controle de acesso ao banco de credenciais.", "gera sempre o mesmo valor mesmo quando salts diferentes são usados.", "transforma a senha em texto legível para auditoria."],
        explicacao: "Senhas devem ser verificadas por funções de derivação resistentes e com salt; não precisam ser recuperadas em texto original.",
      },
    ],
    santosLegislacao: [
      {
        pergunta: "segundo a Lei Orgânica de Santos, quais princípios administrativos devem estar presentes em todos os atos do Município?",
        correta: "transparência e publicidade, moralidade, participação popular e descentralização administrativa.",
        distratores: [
          "sigilo como regra, centralização administrativa, pessoalidade e supremacia partidária.",
          "publicidade facultativa, concentração decisória, promoção pessoal e ausência de controle social.",
          "autonomia judicial, hierarquia militar, reserva de mercado e centralização financeira.",
          "eficiência privada, anonimato dos atos, exclusão popular e subordinação ao Poder Legislativo estadual.",
        ],
        explicacao: "O artigo 1º, § 3º, da Lei Orgânica enumera transparência e publicidade, moralidade, participação popular e descentralização administrativa.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-principios-administrativos",
      },
      {
        pergunta: "de acordo com a Lei Orgânica de Santos, a organização dos poderes municipais compreende",
        correta: "o Legislativo e o Executivo, independentes e harmônicos entre si.",
        distratores: [
          "o Legislativo, o Executivo e um Judiciário municipal autônomo, subordinados entre si.",
          "apenas o Executivo, pois a Câmara integra a administração direta do Prefeito.",
          "o Executivo e o Ministério Público municipal, com exclusão do Legislativo.",
          "o Legislativo e o Executivo, cabendo ao primeiro dirigir administrativamente o segundo.",
        ],
        explicacao: "O artigo 2º da Lei Orgânica estabelece como poderes do Município o Legislativo e o Executivo, independentes e harmônicos entre si.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-poderes-municipais",
      },
      {
        pergunta: "quanto à natureza político-administrativa do Município de Santos, a Lei Orgânica o define como",
        correta: "unidade territorial do Estado de São Paulo e pessoa de direito público interno, com sede no distrito de Santos.",
        distratores: [
          "pessoa de direito privado vinculada à União, com sede definida por decreto federal.",
          "autarquia territorial do Estado de São Paulo, sem personalidade jurídica própria.",
          "órgão descentralizado da União, dotado apenas de autonomia financeira.",
          "fundação pública estadual responsável exclusivamente pelos serviços locais.",
        ],
        explicacao: "O artigo 4º da Lei Orgânica qualifica Santos como unidade territorial do Estado e pessoa de direito público interno, com sede no distrito de Santos.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-natureza-do-municipio",
      },
      {
        pergunta: "qual obrigação de transparência mensal está prevista no art. 69 da Lei Orgânica de Santos?",
        correta: "publicar quadros de pessoal e de despesas com viagens, estadias, cursos e gastos correlatos de agentes públicos.",
        distratores: [
          "publicar somente a receita tributária anual, omitindo dados de pessoal e viagens.",
          "divulgar dados de pessoal apenas ao final de cada mandato e sob solicitação judicial.",
          "manter em sigilo permanente as despesas de agentes públicos em eventos oficiais.",
          "publicar exclusivamente contratos privados, sem incluir entidades da administração indireta.",
        ],
        explicacao: "O artigo 69 da Lei Orgânica exige publicação mensal de quadros sobre pessoal e sobre despesas de viagens, estadias, inscrições, cursos, seminários e itens correlatos.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-transparencia-mensal",
      },
      {
        pergunta: "sobre cargos e regime jurídico dos servidores municipais, a Lei Orgânica de Santos determina que",
        correta: "os cargos sejam criados por lei, com número, denominação, atribuições e vencimentos definidos, e prevê regime estatutário para administração direta, autarquias e fundações públicas.",
        distratores: [
          "os cargos sejam criados por portaria, sem número certo, e todos os vínculos sejam obrigatoriamente celetistas.",
          "somente os vencimentos dependam de lei, podendo atribuições e denominação ser omitidas do ato de criação.",
          "o regime estatutário alcance apenas empresas públicas e sociedades de economia mista.",
          "qualquer unidade administrativa possa criar cargos permanentes por ordem de serviço interna.",
        ],
        explicacao: "Os artigos 72 e 73 da Lei Orgânica disciplinam a criação legal dos cargos e o regime estatutário da administração direta, das autarquias e das fundações públicas.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-cargos-e-regime",
      },
      {
        pergunta: "para os efeitos da Lei Municipal nº 4.623/1984, funcionário público e cargo público correspondem, respectivamente, a",
        correta: "pessoa legalmente investida em cargo público e cargo criado por lei, em número certo, com denominação própria e remuneração municipal.",
        distratores: [
          "qualquer prestador eventual do Município e atividade criada verbalmente pela chefia.",
          "todo cidadão cadastrado na Prefeitura e função privada financiada por tarifa pública.",
          "apenas ocupante de mandato eletivo e posto temporário criado por ordem de serviço.",
          "empregado de empresa contratada e encargo sem denominação nem previsão legal.",
        ],
        explicacao: "Os artigos 2º e 3º do Estatuto definem funcionário público pela investidura legal e cargo público por sua criação legal, número, denominação e remuneração.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-funcionario-e-cargo",
      },
      {
        pergunta: "segundo o art. 50 da Lei Municipal nº 4.623/1984, o exercício do cargo e suas ocorrências funcionais devem ser tratados como",
        correta: "desempenho das atribuições e responsabilidades do cargo, com início, interrupção, reinício e cessação registrados no assentamento individual.",
        distratores: [
          "mera presença física na repartição, dispensado qualquer registro individual de alterações.",
          "atividade iniciada automaticamente na nomeação, sem comunicação do chefe ao órgão de pessoal.",
          "faculdade sem relação com as responsabilidades do cargo e registrada apenas quando houver punição.",
          "prestação eventual que pode ser interrompida sem assentamento ou comunicação institucional.",
        ],
        explicacao: "O artigo 50 da Lei Municipal nº 4.623/1984 define exercício e exige o registro dessas ocorrências no assentamento, além da comunicação das alterações ao órgão de pessoal pela chefia imediata.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-exercicio-e-registro",
      },
      {
        pergunta: "no direito de petição disciplinado pela Lei Municipal nº 4.623/1984, o pedido de reconsideração",
        correta: "é dirigido à autoridade que praticou o ato ou decidiu, exige novos argumentos e não pode ser renovado.",
        distratores: [
          "é dirigido diretamente ao Prefeito em qualquer caso e pode ser renovado sem limite.",
          "dispensa novos argumentos e sempre suspende automaticamente o ato impugnado.",
          "substitui o recurso e deve ser encaminhado sem conhecimento da chefia imediata.",
          "somente pode ser apresentado por sindicato e encerra o direito de recorrer antes de decisão.",
        ],
        explicacao: "O artigo 220 da Lei Municipal nº 4.623/1984 dirige a reconsideração à autoridade responsável pelo ato ou decisão, exige novos argumentos e proíbe sua renovação.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-direito-de-peticao",
      },
      {
        pergunta: "constitui conjunto de deveres do funcionário municipal expressamente previsto no art. 222 da Lei nº 4.623/1984",
        correta: "ser assíduo e pontual, cumprir ordens superiores representando contra as manifestamente ilegais, agir com zelo e tratar o público com urbanidade.",
        distratores: [
          "cumprir toda ordem sem possibilidade de representação e reservar urbanidade apenas às chefias.",
          "priorizar interesses particulares, divulgar assuntos administrativos e ignorar a conservação de materiais.",
          "comparecer quando conveniente, delegar suas funções a estranhos e afastar-se sem autorização.",
          "usar bens municipais livremente, deixar normas funcionais desatualizadas e recusar cooperação com colegas.",
        ],
        explicacao: "O artigo 222 da Lei Municipal nº 4.623/1984 reúne, entre outros, assiduidade, pontualidade, representação contra ordem manifestamente ilegal, zelo, sigilo, urbanidade e conservação do material.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-deveres-funcionais",
      },
      {
        pergunta: "qual conduta é expressamente proibida pelo art. 223 da Lei Municipal nº 4.623/1984?",
        correta: "retirar documento sem permissão, usar a qualidade funcional para proveito pessoal ou empregar material público para fins particulares.",
        distratores: [
          "representar contra ordem manifestamente ilegal e conservar material confiado à sua guarda.",
          "tratar o público com urbanidade e manter atualizados os dados funcionais exigidos.",
          "cooperar com colegas e conhecer as normas relacionadas às próprias funções.",
          "pedir reconsideração com novos argumentos e recorrer após seu indeferimento.",
        ],
        explicacao: "O artigo 223 da Lei Municipal nº 4.623/1984 proíbe essas condutas e também veda receber estipêndios de fornecedores ou de entidades fiscalizadas, entre outras hipóteses.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-proibicoes-funcionais",
      },
      {
        pergunta: "quais referências organizam a administração direta e indireta de Santos segundo o art. 1º da Lei Complementar nº 1.253/2024?",
        correta: "legalidade, impessoalidade, moralidade, publicidade, eficiência, interesse público e melhores práticas de gestão pública.",
        distratores: [
          "pessoalidade, sigilo geral, informalidade, lucro privado e ausência de controle.",
          "centralização absoluta, promoção de autoridades e prevalência de costumes sobre a lei.",
          "autonomia partidária, segredo institucional e dispensa de avaliação de resultados.",
          "exclusivamente publicidade e eficiência, com afastamento dos demais princípios administrativos.",
        ],
        explicacao: "O artigo 1º da LC nº 1.253/2024 lista esses princípios e orienta a estrutura municipal pelas melhores práticas em gestão pública.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-principios-de-organizacao",
      },
      {
        pergunta: "a atuação dos órgãos e entidades municipais, conforme o art. 2º da Lei Complementar nº 1.253/2024, deve enfatizar",
        correta: "direitos dos cidadãos, interesse público, inovação e eficiência de serviços e processos, resultados, participação popular e controle democrático.",
        distratores: [
          "proteção corporativa dos órgãos, redução da participação popular e preferência por processos manuais.",
          "maximização de receitas privadas, exclusão do controle democrático e sigilo de resultados.",
          "manutenção de rotinas independentemente de eficiência e afastamento dos cidadãos das decisões.",
          "subordinação do interesse público a metas individuais e vedação de inovação administrativa.",
        ],
        explicacao: "O artigo 2º da LC nº 1.253/2024 reúne proteção e efetivação de direitos, interesse público, inovação, eficiência, resultados, participação e controle democrático.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-enfases-da-atuacao",
      },
      {
        pergunta: "para a Lei Complementar nº 1.253/2024, a diferença entre órgão e entidade consiste em que",
        correta: "o órgão é centro de competências da estrutura administrativa, enquanto a entidade possui personalidade jurídica e desempenha funções estatais de modo descentralizado.",
        distratores: [
          "o órgão sempre possui personalidade jurídica própria, enquanto a entidade é apenas divisão interna sem autonomia jurídica.",
          "órgão e entidade são expressões sinônimas para qualquer unidade criada por ordem verbal.",
          "a entidade integra somente a administração direta e jamais pode ter personalidade de direito privado.",
          "o órgão é necessariamente empresa estatal, e a entidade corresponde apenas ao gabinete de uma autoridade.",
        ],
        explicacao: "O artigo 3º da LC nº 1.253/2024 distingue o centro de competências, sem personalidade própria, da pessoa jurídica criada ou autorizada por lei para atuação descentralizada.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-orgao-e-entidade",
      },
      {
        pergunta: "entre os meios de modernização da administração direta previstos no art. 7º da Lei Complementar nº 1.253/2024 está",
        correta: "formar continuamente agentes, simplificar processos, adotar tecnologia da informação e geoprocessamento e suprimir formalidades de custo superior ao benefício.",
        distratores: [
          "ampliar exigências meramente formais, ainda que seu custo supere qualquer benefício.",
          "proibir tecnologia da informação e concentrar todo aprimoramento apenas em consultorias externas.",
          "eliminar a participação dos agentes públicos na melhoria metodológica da Administração.",
          "substituir simplificação por novas etapas burocráticas sem avaliação de utilidade.",
        ],
        explicacao: "O artigo 7º da LC nº 1.253/2024 associa modernização a capacitação, simplificação, tecnologia e eliminação de formalidades sem benefício proporcional.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-modernizacao-administrativa",
      },
      {
        pergunta: "sobre a administração indireta na Lei Complementar nº 1.253/2024, assinale a alternativa correta.",
        correta: "ela inclui autarquias, fundações públicas, empresas públicas, sociedades de economia mista e consórcios públicos, e suas entidades ficam sob supervisão do Chefe do Executivo.",
        distratores: [
          "ela é composta apenas por Secretarias e Gabinetes, subordinados à Câmara Municipal.",
          "suas entidades não se sujeitam a supervisão nem precisam observar programas governamentais.",
          "consórcios públicos dos quais Santos participe são excluídos da administração indireta pela lei.",
          "a supervisão autoriza eliminar a autonomia administrativa, patrimonial e financeira de todas as entidades.",
        ],
        explicacao: "Os artigos 19 a 21 da LC nº 1.253/2024 definem a composição, a supervisão pelo Chefe do Executivo e objetivos como legalidade, coordenação, eficiência e preservação da autonomia das entidades.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-administracao-indireta",
      },
      {
        pergunta: "uma alteração dos limites territoriais do Município de Santos depende de",
        correta: "lei complementar estadual e consulta prévia, por plebiscito, às populações diretamente interessadas, com preservação da continuidade histórico-cultural urbana.",
        distratores: [
          "decreto municipal seguido de consulta facultativa apenas aos moradores do distrito que perderá território.",
          "lei ordinária federal, sem participação popular, desde que haja aprovação posterior da Câmara Municipal.",
          "resolução administrativa do Prefeito e autorização do governador, dispensada a preservação da unidade urbana.",
          "emenda à Lei Orgânica aprovada em turno único, com referendo realizado somente depois da alteração territorial.",
        ],
        explicacao: "O art. 4º, parágrafo único, da Lei Orgânica exige lei complementar estadual, continuidade e unidade histórico-cultural do ambiente urbano e plebiscito prévio com as populações interessadas.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-alteracao-territorial",
      },
      {
        pergunta: "entre as competências privativas do Município previstas na Lei Orgânica de Santos está",
        correta: "organizar e prestar serviços públicos de interesse local, diretamente ou por concessão ou permissão, sendo essencial o transporte coletivo.",
        distratores: [
          "explorar serviços de interesse nacional sem autorização da União e transferir ao Estado a titularidade do transporte coletivo local, ainda que a matéria seja exclusivamente municipal.",
          "delegar definitivamente a particulares toda regulação de serviços locais, inclusive a fixação das regras de fiscalização.",
          "prestar apenas serviços não essenciais, pois transporte coletivo e ordenamento urbano pertencem exclusivamente ao Estado.",
          "subordinar qualquer serviço municipal à aprovação do Congresso Nacional, ainda que a matéria seja de interesse estritamente local.",
        ],
        explicacao: "O art. 6º, inciso V, atribui ao Município a organização e prestação dos serviços de interesse local e qualifica o transporte coletivo como essencial.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-servicos-locais",
      },
      {
        pergunta: "a Guarda Municipal de Santos pode ser constituída, nos termos da Lei Orgânica, para",
        correta: "proteger bens, serviços e instalações municipais e atuar na proteção e fiscalização ambiental, histórica, cultural, ecológica, paisagística e das posturas municipais.",
        distratores: [
          "exercer com exclusividade polícia judiciária estadual e instaurar inquéritos sobre qualquer crime ocorrido no Município.",
          "substituir as Forças Armadas na defesa nacional e controlar fronteiras, portos e aeroportos por decisão do Prefeito.",
          "limitar-se à vigilância interna da Câmara, sem atribuição relacionada a bens, serviços, meio ambiente ou patrimônio local.",
          "aplicar normas penais federais como órgão independente dos Poderes Executivo e Legislativo municipais.",
        ],
        explicacao: "O art. 6º, inciso XII, enumera a proteção de bens, serviços e instalações e também a atuação ambiental, patrimonial, paisagística e relativa às posturas do Município.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-guarda-municipal",
      },
      {
        pergunta: "na competência comum de Santos com a União e o Estado, a Lei Orgânica inclui",
        correta: "proteger o meio ambiente, combater a poluição e preservar florestas, fauna, flora, praias, manguezais e costões.",
        distratores: [
          "autorizar sozinho a exploração de recursos minerais federais e dispensar o acompanhamento das concessões existentes.",
          "transferir à iniciativa privada a proteção do patrimônio cultural e impedir ações públicas sobre paisagens naturais.",
          "restringir o saneamento e a habitação à União, vedando programas municipais de melhoria das condições habitacionais.",
          "afastar a cooperação entre entes públicos sempre que a medida ambiental produzir efeitos além dos limites municipais.",
        ],
        explicacao: "O art. 7º, incisos VI e VII, prevê proteção ambiental, combate à poluição e preservação de ecossistemas costeiros e demais elementos naturais.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-competencia-ambiental",
      },
      {
        pergunta: "a competência suplementar do Município de Santos permite",
        correta: "complementar as legislações federal e estadual no que couber e no que disser respeito ao peculiar interesse local, adaptando-as à realidade municipal.",
        distratores: [
          "revogar leis federais no território municipal sempre que a Câmara considerar a disciplina nacional inconveniente.",
          "editar normas sobre qualquer matéria privativa da União, mesmo sem relação com interesse ou realidade locais.",
          "substituir integralmente a legislação estadual por decretos do Prefeito, sem deliberação legislativa ou limite material.",
          "recusar aplicação a normas gerais e criar soberania normativa municipal acima da Constituição do Estado.",
        ],
        explicacao: "O art. 8º da Lei Orgânica autoriza suplementar a legislação federal e estadual, dentro do cabimento e do peculiar interesse municipal.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-competencia-suplementar",
      },
      {
        pergunta: "qual conduta é vedada ao Município pelo art. 9º da Lei Orgânica de Santos?",
        correta: "recusar fé a documentos públicos ou criar distinções entre brasileiros, além de estabelecer ou subvencionar cultos, ressalvada a colaboração de interesse público prevista em lei.",
        distratores: [
          "cooperar com União e Estado na proteção ambiental e na conservação do patrimônio histórico e cultural.",
          "organizar serviços públicos locais por concessão ou permissão e fiscalizar a execução dos contratos correspondentes.",
          "suplementar normas federais e estaduais ligadas ao peculiar interesse local e à adaptação à realidade do Município.",
          "publicar balancetes e prestar contas da aplicação das rendas municipais dentro dos prazos definidos em lei.",
        ],
        explicacao: "O art. 9º reúne as vedações relativas a cultos, à recusa de fé aos documentos públicos e à criação de distinções ou preferências entre brasileiros.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-vedacoes-municipais",
      },
      {
        pergunta: "sobre os bens do Município, a Lei Orgânica de Santos considera municipais",
        correta: "as coisas móveis e imóveis, os direitos e ações que lhe pertençam a qualquer título e as terras devolutas situadas em seu território.",
        distratores: [
          "somente imóveis registrados em nome do Prefeito, excluídos direitos, ações, bens móveis e terras devolutas.",
          "todos os bens estaduais localizados em Santos, independentemente de transferência, domínio ou previsão legal.",
          "apenas bens de uso comum, vedada a existência de bens dominicais ou de direitos patrimoniais do Município.",
          "exclusivamente receitas tributárias arrecadadas no exercício, sem inclusão de patrimônio físico ou direitos.",
        ],
        explicacao: "O art. 5º da Lei Orgânica inclui no patrimônio municipal bens móveis e imóveis, direitos, ações e terras devolutas localizadas no território.",
        sourceKey: "santos_lei_organica",
        subassunto: "lei-organica-bens-municipais",
      },
      {
        pergunta: "a primeira investidura em cargo ou emprego público municipal, segundo o art. 15 da Lei nº 4.623/1984, exige",
        correta: "aprovação prévia em concurso público de provas ou de provas e títulos.",
        distratores: [
          "indicação da chefia e entrevista interna, ainda que se trate de cargo efetivo sem seleção anterior.",
          "apenas análise curricular, ficando a realização de provas proibida para empregos municipais.",
          "eleição direta pelos servidores da unidade, seguida de homologação automática pelo órgão de pessoal.",
          "contratação temporária inicial obrigatória e efetivação pelo simples decurso de dois anos de exercício.",
        ],
        explicacao: "O art. 15 do Estatuto condiciona a primeira investidura à aprovação prévia em concurso público de provas ou de provas e títulos.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-primeira-investidura",
      },
      {
        pergunta: "o prazo ordinário para entrar em exercício no cargo municipal e a consequência de seu descumprimento são, respectivamente,",
        correta: "30 dias contados da posse ou da publicação oficial do ato, conforme o caso, e exoneração se o funcionário não entrar em exercício no prazo.",
        distratores: [
          "10 dias contados da nomeação e suspensão automática por 90 dias, sem possibilidade de exoneração.",
          "60 dias contados sempre do concurso e conversão obrigatória da vaga em função de confiança.",
          "15 dias contados da lotação e perda apenas da remuneração, mantendo-se indefinidamente o cargo reservado.",
          "45 dias contados da inspeção médica e demissão disciplinar sem prévio ato de provimento ou posse.",
        ],
        explicacao: "Os arts. 52 e 53 fixam 30 dias, admitem prorrogação por no máximo mais 30 nas condições legais e determinam exoneração quando não houver entrada em exercício.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-prazo-de-exercicio",
      },
      {
        pergunta: "a readmissão prevista na Lei nº 4.623/1984 caracteriza-se como",
        correta: "reingresso, por conveniência administrativa, do funcionário exonerado, sem ressarcimento, condicionado à vaga e às exigências da primeira investidura.",
        distratores: [
          "retorno obrigatório do demitido com pagamento integral retroativo, independentemente de vaga ou inspeção médica.",
          "promoção automática para cargo superior concedida a qualquer ex-servidor que solicite novo vínculo.",
          "anulação judicial da exoneração, sempre acompanhada de indenização e dispensa dos requisitos de habilitação.",
          "contratação temporária sem cargo, realizada exclusivamente para suprir afastamento inferior a trinta dias.",
        ],
        explicacao: "Os arts. 37 e 38 tratam a readmissão como reingresso conveniente à Administração, sem ressarcimento, dependente de vaga, requisitos legais e inspeção médica.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-readmissao",
      },
      {
        pergunta: "a licença para tratar de interesses particulares pode ser concedida ao funcionário municipal",
        correta: "depois de dois anos de exercício, sem vencimentos, por até um ano prorrogável por mais um, devendo ele aguardar em exercício a concessão.",
        distratores: [
          "desde a posse, com remuneração integral e sem limite de duração, ainda que o afastamento prejudique o serviço.",
          "antes de assumir o cargo para o qual foi nomeado, removido ou transferido, produzindo efeitos automaticamente com o pedido e assegurando remuneração até a decisão final.",
          "somente após dez anos, por período único de trinta dias e sem possibilidade de desistência antecipada.",
          "a qualquer tempo, mesmo durante estágio sem exercício, desde que deixe de comunicar a chefia e o órgão de pessoal.",
        ],
        explicacao: "Os arts. 195 a 197 exigem dois anos de exercício, preveem licença sem remuneração por até um ano, possível prorrogação por outro, e permanência em exercício até a concessão.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-licenca-interesse-particular",
      },
      {
        pergunta: "a responsabilidade administrativa do funcionário municipal",
        correta: "não afasta eventual responsabilidade civil ou criminal, e a indenização devida não exclui a aplicação de pena disciplinar.",
        distratores: [
          "absorve obrigatoriamente as responsabilidades civil e criminal, impedindo qualquer apuração em outra esfera.",
          "deixa de existir quando houver ressarcimento, ainda que a conduta configure infração disciplinar autônoma, tenha causado dano e tenha sido praticada com dolo.",
          "somente pode ser examinada depois de condenação criminal definitiva pelo mesmo comportamento.",
          "é incompatível com obrigação de indenizar e exige escolha irrevogável de uma única consequência jurídica.",
        ],
        explicacao: "O art. 227 do Estatuto preserva a independência entre as responsabilidades administrativa, civil e criminal e entre indenização e sanção disciplinar.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-responsabilidades-independentes",
      },
      {
        pergunta: "na aplicação de pena disciplinar ao funcionário de Santos devem ser consideradas",
        correta: "a natureza e a gravidade da infração e os danos dela decorrentes para o serviço público.",
        distratores: [
          "somente a antiguidade do servidor, sem exame da gravidade, dos danos ou das circunstâncias da conduta.",
          "exclusivamente a repercussão externa do caso, ainda que não exista infração funcional comprovada.",
          "a preferência pessoal da chefia e a posição hierárquica do acusado, sem motivação no ato sancionador.",
          "apenas o valor da remuneração do cargo, que determina automaticamente a espécie de penalidade aplicável.",
        ],
        explicacao: "O art. 229 estabelece como critérios a natureza e a gravidade da infração e os danos produzidos para o serviço público.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-criterios-da-penalidade",
      },
      {
        pergunta: "quanto à suspensão disciplinar na Lei nº 4.623/1984, assinale a alternativa correta.",
        correta: "ela não pode exceder 90 dias e pode alcançar violação de proibições estatutárias ou reincidência em falta já punida com repreensão.",
        distratores: [
          "ela tem duração mínima obrigatória de 180 dias e somente se aplica depois de condenação penal transitada em julgado e de autorização do juízo criminal competente.",
          "ela preserva todos os direitos e vantagens do exercício durante seu cumprimento e não admite limite temporal.",
          "ela se aplica apenas a atraso isolado, vedado seu uso diante de proibições funcionais ou reincidência.",
          "ela equivale à exoneração a pedido e extingue definitivamente o vínculo sem necessidade de ato motivado.",
        ],
        explicacao: "O art. 231 limita a suspensão a 90 dias e a prevê para violação das proibições e reincidência em falta anteriormente reprimida.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-suspensao-disciplinar",
      },
      {
        pergunta: "o ato que demite funcionário municipal deve",
        correta: "indicar sempre a disposição legal em que se fundamenta, e a penalidade aplicada deve constar do assentamento individual.",
        distratores: [
          "omitir a base legal para proteger o sigilo da Administração e ser excluído do assentamento após trinta dias, por determinação da chefia imediata.",
          "limitar-se à conclusão da chefia imediata, sem referência normativa ou registro funcional da penalidade.",
          "ser exclusivamente verbal quando houver falta grave, dispensando publicação e motivação jurídica.",
          "registrar apenas a remuneração do servidor, vedada a menção à sanção e ao fundamento legal correspondente.",
        ],
        explicacao: "Os arts. 235 e 238 exigem a indicação do fundamento legal na demissão e o registro das penas impostas no assentamento individual.",
        sourceKey: "santos_estatuto_4623",
        subassunto: "lei-4623-fundamento-e-registro-da-pena",
      },
      {
        pergunta: "a Administração Pública direta de Santos é constituída, segundo a LC nº 1.253/2024, por",
        correta: "Gabinetes do Prefeito e do Vice-Prefeito, Secretarias Municipais, Procuradoria Geral e Ouvidoria, Transparência e Controle.",
        distratores: [
          "somente autarquias, fundações, empresas públicas e sociedades de economia mista com personalidade própria.",
          "Câmara Municipal, Tribunal de Justiça, Ministério Público e órgãos federais instalados no Município.",
          "exclusivamente Secretarias Municipais, ficando Gabinetes, Procuradoria e Ouvidoria fora da estrutura direta.",
          "consórcios públicos e concessionárias privadas, ainda que não integrem a organização administrativa municipal.",
        ],
        explicacao: "Os arts. 4º e 5º da LC nº 1.253/2024 identificam os órgãos e serviços que integram a Administração direta municipal.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-composicao-administracao-direta",
      },
      {
        pergunta: "o planejamento da ação governamental de Santos deve orientar-se, entre outros instrumentos, por",
        correta: "Lei Orgânica, Programa de Metas, Plano Plurianual, LDO, LOA, Plano Diretor e planos de ação integrada.",
        distratores: [
          "apenas ordens de serviço de cada unidade, sem relação com orçamento, metas ou planejamento urbano.",
          "planos privados de fornecedores, que substituem as leis orçamentárias e o Plano Diretor municipal.",
          "exclusivamente a LOA do exercício, vedado articular seus objetivos ao PPA ou à Lei de Diretrizes Orçamentárias.",
          "decisões informais dos dirigentes, dispensadas previsão legal, participação institucional e avaliação de resultados.",
        ],
        explicacao: "O art. 6º da LC nº 1.253/2024 enumera os instrumentos que norteiam o planejamento voltado ao desenvolvimento, à qualidade de vida e à inclusão social.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-instrumentos-de-planejamento",
      },
      {
        pergunta: "o controle das atividades da Administração direta municipal é exercido",
        correta: "pelas autoridades competentes, pela unidade de controle interno e também pelo acesso à informação e pela participação popular.",
        distratores: [
          "somente pelo Prefeito, ficando controle interno, transparência e participação social afastados por lei.",
          "exclusivamente pelo Poder Legislativo estadual, sem atuação das autoridades e estruturas do próprio Município, de seu controle interno ou da participação popular.",
          "apenas por auditoria privada anual, vedado ao cidadão acompanhar informações ou participar do controle.",
          "pelos fornecedores contratados, que substituem a autoridade administrativa em decisões e fiscalização.",
        ],
        explicacao: "O art. 9º da LC nº 1.253/2024 combina controle hierárquico, controle interno, acesso à informação e participação popular.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-controle-da-administracao-direta",
      },
      {
        pergunta: "a efetividade no acesso e na prestação dos serviços públicos municipais deve ser buscada por meio de",
        correta: "programas de governo, gestão de equipamentos, modernização, regionalização e avaliação permanente de resultados com metas de melhoria.",
        distratores: [
          "centralização obrigatória de todos os atendimentos e eliminação de indicadores quantitativos e qualitativos.",
          "suspensão dos programas de governo e manutenção dos equipamentos sem avaliação de uso, qualidade ou resultado.",
          "substituição dos serviços públicos por comunicação institucional, sem metas, inovação ou melhoria de gestão.",
          "redução do acesso dos cidadãos para preservar rotinas existentes, ainda que elas não atendam às necessidades locais ou revelem resultados inferiores às metas definidas.",
        ],
        explicacao: "O art. 10 da LC nº 1.253/2024 relaciona acesso e efetividade a programas, equipamentos, inovação, regionalização e avaliação permanente.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-acesso-e-efetividade",
      },
      {
        pergunta: "para promover desenvolvimento social e econômico, a LC nº 1.253/2024 prevê",
        correta: "incentivo à formação de redes de colaboração entre governo e sociedade civil para executar programas e projetos.",
        distratores: [
          "proibição de cooperação com a sociedade civil, reservando toda execução a unidades internas da Prefeitura.",
          "transferência automática do poder decisório municipal a entidades privadas participantes de qualquer projeto.",
          "substituição do planejamento público por iniciativas isoladas sem objetivos, acompanhamento ou interesse coletivo.",
          "restrição da articulação social aos períodos eleitorais, vedados fóruns permanentes, projetos colaborativos e conselhos vinculados a políticas públicas.",
        ],
        explicacao: "O art. 11 da LC nº 1.253/2024 determina o incentivo a redes de colaboração entre governo e sociedade civil.",
        sourceKey: "santos_lc_1253",
        subassunto: "lc-1253-redes-de-colaboracao",
      },
    ],
    administracao: [
      {
        pergunta: "em protocolo administrativo, registrar data, origem e assunto do documento favorece",
        correta: "rastreabilidade e controle da tramitação.",
        distratores: [
          "definição automática do prazo de guarda, sem consulta à tabela de temporalidade aplicável.",
          "comprovação isolada da autenticidade do conteúdo, independentemente de assinatura ou cadeia de custódia.",
          "substituição do plano de classificação por uma descrição livre feita no momento do recebimento.",
          "autorização para eliminar o original assim que seus dados básicos forem incluídos no sistema.",
        ],
        explicacao: "Metadados básicos ajudam localizar, acompanhar e auditar documentos.",
      },
      {
        pergunta: "arquivo corrente é composto, em regra, por documentos",
        correta: "em uso frequente pela unidade produtora.",
        distratores: [
          "transferidos para guarda intermediária, embora ainda sejam consultados diariamente pela unidade produtora.",
          "selecionados exclusivamente por valor histórico e recolhidos de forma definitiva ao arquivo permanente.",
          "recebidos de particulares, independentemente de vínculo com as funções ou atividades administrativas do órgão.",
          "cujo prazo de guarda terminou e cuja eliminação já foi formalmente autorizada e executada.",
        ],
        explicacao: "Arquivo corrente apoia atividades em andamento e consultas frequentes.",
      },
      {
        pergunta: "gestão de materiais deve considerar",
        correta: "consumo, estoque mínimo, reposição, armazenamento e controle patrimonial.",
        distratores: [
          "somente o consumo do mês anterior, sem considerar prazo de entrega, variação da demanda ou criticidade.",
          "manutenção do maior estoque possível para todos os itens, ainda que custo, validade e espaço sejam limitados.",
          "reposição iniciada apenas depois da ruptura, pois estoque de segurança representa desperdício em qualquer situação.",
          "tratamento idêntico de materiais de consumo e permanentes, dispensando inventário e controle patrimonial específico.",
        ],
        explicacao: "Materiais exigem planejamento, controle, conservação e prestação de contas.",
      },
      {
        pergunta: "na redação oficial, impessoalidade significa",
        correta: "priorizar a finalidade institucional, sem opiniões pessoais indevidas.",
        distratores: [
          "omitir a identificação do órgão e da autoridade para que nenhuma responsabilidade institucional seja atribuída.",
          "empregar avaliações pessoais do redator sempre que elas tornarem a mensagem mais persuasiva ao destinatário.",
          "evitar a indicação objetiva do assunto para que o mesmo texto possa ser reutilizado em qualquer procedimento.",
          "substituir a motivação baseada em fatos por impressões do agente, desde que o documento mantenha tratamento formal.",
        ],
        explicacao: "A comunicação oficial representa o órgão e deve ser objetiva e institucional.",
      },
      {
        pergunta: "a classificação de documentos por assunto auxilia",
        correta: "organização, localização e recuperação coerente dos registros.",
        distratores: [
          "definição do prazo de guarda sem considerar função, atividade ou tabela de temporalidade aprovada.",
          "reunião de processos que compartilham uma palavra, mesmo quando pertencem a funções administrativas diferentes.",
          "dispensa dos metadados de origem e data, pois o assunto passa a ser o único elemento necessário à pesquisa.",
          "autorização de descarte de todos os documentos associados ao mesmo descritor assim que o primeiro processo terminar.",
        ],
        explicacao: "Um plano de classificação relaciona documentos às funções e atividades, facilitando controle e recuperação.",
      },
      {
        pergunta: "a tabela de temporalidade documental define",
        correta: "prazos de guarda e destinação conforme valor e uso dos documentos.",
        distratores: [
          "códigos de classificação por assunto, sem estabelecer prazos ou destinação ao fim de cada fase documental.",
          "localização física exata de cada caixa, independentemente da série documental e do valor dos registros.",
          "nível de acesso de cada usuário ao sistema, sem relação com retenção, eliminação ou guarda permanente.",
          "forma e conteúdo obrigatórios da correspondência, substituindo os instrumentos de redação e comunicação oficial.",
        ],
        explicacao: "Temporalidade orienta permanência nas fases documentais, eliminação autorizada ou guarda permanente.",
      },
      {
        pergunta: "ao encontrar diferença entre saldo registrado e estoque físico, a unidade deve",
        correta: "apurar a divergência, documentar o resultado e realizar ajuste autorizado.",
        distratores: ["alterar o número sem registrar justificativa.", "ignorar a diferença quando o item tiver baixo valor.", "descartar os comprovantes anteriores.", "atribuir a falta a qualquer servidor sem investigação."],
        explicacao: "Divergências exigem conferência e registro para preservar controle patrimonial e responsabilização adequada.",
      },
      {
        pergunta: "o ponto de pedido de um material deve considerar",
        correta: "consumo esperado, prazo de reposição e margem de segurança.",
        distratores: ["somente o espaço vazio no almoxarifado.", "apenas a data da última compra realizada.", "a preferência pessoal de quem faz o pedido.", "o preço unitário sem observar consumo ou prazo."],
        explicacao: "O ponto de pedido busca iniciar reposição antes da ruptura, conforme demanda e tempo necessário para entrega.",
      },
      {
        pergunta: "uma comunicação interna clara deve apresentar",
        correta: "assunto, contexto, providência esperada e prazo quando aplicável.",
        distratores: ["opiniões pessoais sem relação com a demanda.", "abreviações desconhecidas sem explicação.", "ordens vagas sem responsável ou referência.", "informações essenciais distribuídas apenas verbalmente."],
        explicacao: "Elementos objetivos permitem compreender a demanda, executar a providência e acompanhar seu cumprimento.",
      },
      {
        pergunta: "antes de arquivar um processo concluído, é adequado",
        correta: "conferir integridade, ordenação, registros de encerramento e destinação prevista.",
        distratores: ["retirar peças consideradas pouco importantes sem autorização.", "misturar o processo com documentos de outro assunto.", "apagar a identificação para liberar espaço.", "manter pendências abertas sem anotação de encerramento."],
        explicacao: "A conferência final preserva contexto, autenticidade, recuperação e cumprimento das regras de gestão documental.",
      },
    ],
    pmspConhecimentosGerais: [
      {
        pergunta: "sobre a Primeira Guerra Mundial, assinale a alternativa correta.",
        correta: "O conflito ocorreu entre 1914 e 1918, envolveu sistemas de alianças e teve na guerra de trincheiras uma característica marcante da Frente Ocidental.",
        distratores: [
          "O conflito ocorreu depois de 1945 e opôs exclusivamente Estados Unidos e União Soviética em batalhas diretas.",
          "A guerra ficou restrita aos Bálcãs, sem participação de impérios ou mobilização econômica das grandes potências.",
          "A Frente Ocidental foi marcada apenas por guerra naval, sem linhas fortificadas ou trincheiras terrestres.",
          "O armistício de 1918 iniciou a guerra e antecedeu em quatro anos o atentado de Sarajevo.",
        ],
        explicacao: "A guerra começou em 1914, terminou em 1918 e mobilizou alianças rivais; a estabilização de frentes fortificadas tornou as trincheiras símbolo do combate no oeste europeu.",
        sourceKey: "parlamento_uk_primeira_guerra",
        subassunto: "primeira-guerra-mundial",
      },
      {
        pergunta: "a respeito do nazismo e da Segunda Guerra Mundial, é correto afirmar que",
        correta: "o nazismo implantou na Alemanha uma ditadura de partido único, racista e antissemita, associada a uma política expansionista e ao genocídio durante a guerra.",
        distratores: [
          "o regime nazista preservou o pluripartidarismo, protegeu minorias perseguidas e rejeitou conquistas territoriais.",
          "a ideologia nazista defendia igualdade racial e democracia parlamentar como fundamentos obrigatórios do Estado.",
          "a Segunda Guerra terminou antes da chegada de Hitler ao poder e não teve relação com a expansão alemã.",
          "o antissemitismo foi combatido pelo Estado nazista, que garantiu cidadania plena aos judeus durante todo o regime.",
        ],
        explicacao: "O regime nazista suprimiu a democracia, perseguiu opositores e grupos definidos por sua ideologia racial e conduziu uma política expansionista ligada à guerra e ao Holocausto.",
        sourceKey: "ushmm_nazismo",
        subassunto: "nazifascismo-e-segunda-guerra",
      },
      {
        pergunta: "qual descrição caracteriza adequadamente a Guerra Fria?",
        correta: "Foi uma rivalidade global entre Estados Unidos e União Soviética, com blocos, corrida armamentista, disputa ideológica e conflitos indiretos, sem guerra total direta entre as duas superpotências.",
        distratores: [
          "Foi uma guerra convencional contínua travada apenas em território norte-americano entre 1914 e 1918.",
          "Foi uma aliança política permanente entre Estados Unidos e União Soviética, sem corrida nuclear ou disputa por influência.",
          "Foi um conflito medieval encerrado com a formação dos Estados nacionais europeus.",
          "Foi uma disputa exclusivamente comercial, sem dimensões militares, tecnológicas ou ideológicas.",
        ],
        explicacao: "A Guerra Fria estruturou relações internacionais após a Segunda Guerra em torno da rivalidade entre as superpotências, seus aliados e áreas de influência, com dissuasão nuclear e guerras por procuração.",
        sourceKey: "us_state_guerra_fria",
        subassunto: "guerra-fria",
      },
      {
        pergunta: "sobre globalização e políticas neoliberais, assinale a alternativa correta.",
        correta: "A globalização intensifica fluxos de mercadorias, capitais, informações e tecnologia, enquanto políticas neoliberais tendem a favorecer abertura econômica, desregulamentação e privatizações.",
        distratores: [
          "A globalização elimina automaticamente fronteiras políticas, desigualdades e conflitos entre todos os países.",
          "Políticas neoliberais têm como traço necessário a estatização integral das empresas e o fechamento do comércio externo.",
          "A integração tecnológica impede a formação de cadeias produtivas transnacionais e reduz todos os fluxos financeiros.",
          "A abertura econômica torna desnecessárias políticas públicas e extingue juridicamente o Estado nacional.",
        ],
        explicacao: "Globalização designa integração crescente de circuitos econômicos, informacionais e produtivos; reformas neoliberais costumam ampliar mecanismos de mercado, mas não apagam Estados nem desigualdades.",
        sourceKey: "ipea_globalizacao",
        subassunto: "globalizacao-e-politicas-neoliberais",
      },
      {
        pergunta: "a Revolução de 1930 e a Era Vargas podem ser corretamente relacionadas a",
        correta: "ruptura da ordem política da Primeira República, instalação de Governo Provisório e posterior passagem por fases constitucional e ditatorial do Estado Novo.",
        distratores: [
          "restauração da monarquia, dissolução do governo central e retorno imediato de Pedro II ao poder.",
          "manutenção integral da política oligárquica anterior, sem mudanças institucionais ou centralização federal.",
          "implantação direta da Constituição de 1988 e encerramento definitivo da intervenção estatal na economia.",
          "início do regime militar de 1964, com posse de presidentes-generais já em 1930.",
        ],
        explicacao: "O movimento de 1930 encerrou a Primeira República e levou Vargas ao Governo Provisório; a Era Vargas incluiu o período constitucional e o Estado Novo autoritário, iniciado em 1937.",
        sourceKey: "arquivo_nacional_vargas",
        subassunto: "revolucao-de-1930-e-era-vargas",
      },
      {
        pergunta: "quanto às Constituições republicanas brasileiras, assinale a alternativa correta.",
        correta: "A Constituição de 1891 inaugurou a ordem republicana federal, e a de 1988 marcou a redemocratização com ampla proteção de direitos e garantias.",
        distratores: [
          "A Constituição de 1891 preservou oficialmente a monarquia hereditária, e a de 1988 suprimiu eleições diretas.",
          "A Constituição de 1937 ampliou o pluralismo democrático e encerrou o Estado Novo antes de sua instalação.",
          "A Constituição de 1946 institucionalizou o regime militar iniciado em 1964 e extinguiu o Congresso.",
          "A Constituição de 1967 foi promulgada após a redemocratização de 1985 como substituta imediata da Constituição de 1988.",
        ],
        explicacao: "A história constitucional republicana inclui textos associados a mudanças de regime; 1891 consolidou República e federalismo, enquanto 1988 encerrou a transição democrática e ampliou direitos.",
        sourceKey: "senado_constituicoes",
        subassunto: "constituicoes-republicanas",
      },
      {
        pergunta: "sobre a estrutura política e os movimentos sociais durante o regime militar brasileiro, é correto afirmar que",
        correta: "o período combinou autoritarismo, atos institucionais, censura e bipartidarismo imposto com diferentes formas de oposição e mobilização social.",
        distratores: [
          "o período manteve pluripartidarismo irrestrito e ausência completa de censura ou perseguição política.",
          "os atos institucionais ampliaram a separação de poderes e impediram cassações ou suspensão de direitos.",
          "não houve oposição estudantil, sindical, cultural, parlamentar ou armada ao regime em nenhum momento.",
          "o bipartidarismo foi criado pela Constituição de 1988 e permaneceu obrigatório depois da redemocratização.",
        ],
        explicacao: "O regime restringiu liberdades e reorganizou o sistema político, enquanto setores da sociedade desenvolveram formas variadas de resistência e reivindicação democrática.",
        sourceKey: "senado_redemocratizacao",
        subassunto: "regime-militar-politica-e-movimentos",
      },
      {
        pergunta: "a abertura política e a redemocratização do Brasil envolveram",
        correta: "uma transição gradual, a campanha Diretas Já, a eleição indireta de Tancredo Neves em 1985 e o processo constituinte que resultou na Constituição de 1988.",
        distratores: [
          "uma mudança instantânea em 1964, seguida de eleição presidencial direta e promulgação da Constituição de 1967 por assembleia popular.",
          "a extinção dos movimentos civis por consenso e a manutenção definitiva dos atos institucionais após 1988.",
          "a posse de Tancredo Neves por eleição direta em 1984 e a dissolução do Congresso Constituinte.",
          "o retorno à Constituição monárquica de 1824 como fundamento da Nova República.",
        ],
        explicacao: "A redemocratização foi processual: a mobilização por eleições diretas não venceu a votação de 1984, Tancredo foi eleito indiretamente, e a Constituição de 1988 consolidou a nova ordem democrática.",
        sourceKey: "senado_redemocratizacao",
        subassunto: "abertura-politica-e-redemocratizacao",
      },
      {
        pergunta: "no estudo da nova ordem mundial e do espaço geopolítico, uma interpretação adequada é que",
        correta: "o fim da bipolaridade da Guerra Fria ampliou a centralidade dos Estados Unidos, mas também conviveu com blocos regionais, potências emergentes e organizações internacionais.",
        distratores: [
          "a dissolução da União Soviética eliminou disputas geopolíticas e tornou todos os Estados equivalentes em poder.",
          "a nova ordem mundial aboliu fronteiras, organismos multilaterais e alianças econômicas regionais.",
          "globalização e geopolítica são fenômenos incompatíveis, pois fluxos econômicos impedem qualquer disputa territorial.",
          "apenas empresas privadas passaram a atuar internacionalmente, sem participação de Estados ou organizações multilaterais.",
        ],
        explicacao: "O pós-Guerra Fria não suprimiu relações de poder: combinou primazia norte-americana em várias dimensões com novos polos, redes econômicas, blocos e instituições multilaterais.",
        sourceKey: "ipea_geopolitica",
        subassunto: "nova-ordem-mundial-e-geopolitica",
      },
      {
        pergunta: "a respeito dos principais problemas ambientais globais, assinale a alternativa correta.",
        correta: "mudança climática, perda de biodiversidade e poluição estão interligadas e podem produzir efeitos transfronteiriços que exigem cooperação entre países.",
        distratores: [
          "a perda de biodiversidade é sempre local e não se relaciona a clima, uso do solo ou cadeias produtivas.",
          "a poluição atmosférica não atravessa fronteiras e pode ser enfrentada apenas por decisões domésticas isoladas.",
          "mudança climática significa somente variação diária do tempo e não envolve tendências de longo prazo.",
          "problemas ambientais cessam automaticamente quando cresce a produção econômica, independentemente de políticas públicas.",
        ],
        explicacao: "As crises do clima, da biodiversidade e da poluição se reforçam mutuamente e ultrapassam limites nacionais, razão pela qual demandam políticas articuladas em diferentes escalas.",
        sourceKey: "onu_ambiente",
        subassunto: "problemas-ambientais-globais",
      },
      {
        pergunta: "sobre relevo e hidrografia do Brasil, assinale a alternativa correta.",
        correta: "o relevo brasileiro reúne planaltos, planícies e depressões, e sua extensa rede hidrográfica é alimentada predominantemente por chuvas.",
        distratores: [
          "o território brasileiro é formado apenas por altas cadeias montanhosas recentes e não possui planícies.",
          "a maioria dos rios brasileiros depende do degelo anual de geleiras situadas no próprio país.",
          "o Brasil não possui bacias hidrográficas interiores nem rios que deságuem no oceano Atlântico.",
          "planaltos e depressões são inexistentes no relevo nacional, que apresenta altitude uniforme.",
        ],
        explicacao: "A classificação do relevo reconhece diferentes compartimentos, e o regime predominantemente pluvial dos rios reflete a importância das chuvas para as bacias brasileiras.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "natureza-relevo-e-hidrografia",
      },
      {
        pergunta: "sobre clima e vegetação no território brasileiro, é correto afirmar que",
        correta: "latitude, altitude, relevo e massas de ar influenciam os climas, que se relacionam à diversidade de formações vegetais e biomas do país.",
        distratores: [
          "a longitude é o único fator climático, de modo que todo o Brasil possui temperatura e chuva idênticas.",
          "clima e vegetação não apresentam relação, pois os biomas independem de água, temperatura e solo.",
          "a altitude nunca altera temperatura ou circulação do ar em nenhuma região brasileira.",
          "o território nacional possui um único bioma contínuo e sem variações sazonais.",
        ],
        explicacao: "A grande extensão territorial e a combinação de controles climáticos ajudam a explicar a variedade de regimes de chuva, temperatura, paisagens e biomas brasileiros.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "natureza-clima-e-vegetacao",
      },
      {
        pergunta: "quanto à população brasileira, assinale a alternativa correta.",
        correta: "ela é majoritariamente urbana, distribui-se de forma desigual pelo território e passa por transição demográfica associada à queda da fecundidade e ao envelhecimento.",
        distratores: [
          "ela permanece majoritariamente rural e se distribui de maneira uniforme entre todos os municípios.",
          "os movimentos migratórios internos cessaram com a industrialização e não afetam cidades médias.",
          "o envelhecimento populacional decorre necessariamente do aumento contínuo da fecundidade.",
          "densidade demográfica e população absoluta são medidas idênticas e não dependem da área territorial.",
        ],
        explicacao: "Urbanização, concentração espacial e mudanças na estrutura etária são processos simultâneos; a distribuição populacional e os fluxos migratórios permanecem desiguais e dinâmicos.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "populacao-distribuicao-e-transicao",
      },
      {
        pergunta: "a relação entre industrialização e urbanização no Brasil caracteriza-se por",
        correta: "forte concentração inicial no Sudeste, expansão das cidades e posterior desconcentração relativa de atividades, sem eliminação das desigualdades regionais.",
        distratores: [
          "industrialização homogênea em todo o território desde o início e ausência de migração para áreas urbanas.",
          "redução permanente das cidades, pois a indústria brasileira se instalou exclusivamente em áreas rurais isoladas.",
          "desaparecimento das metrópoles após a desconcentração industrial e distribuição igual de infraestrutura.",
          "inexistência de ligação entre emprego industrial, redes de transporte e crescimento urbano.",
        ],
        explicacao: "A industrialização impulsionou urbanização e metropolização, sobretudo no Sudeste; movimentos posteriores de desconcentração não apagaram hierarquias urbanas e disparidades territoriais.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "industrializacao-e-urbanizacao",
      },
      {
        pergunta: "sobre energia, agropecuária e impactos ambientais no Brasil, assinale a alternativa correta.",
        correta: "a matriz energética combina fontes fósseis e renováveis, e tanto a produção de energia quanto a modernização agropecuária podem gerar impactos que exigem planejamento e controle.",
        distratores: [
          "toda fonte renovável é isenta de efeitos territoriais, sociais ou ecológicos em qualquer escala.",
          "a agropecuária moderna não utiliza água, solo, energia ou infraestrutura logística e não altera o uso da terra.",
          "o Brasil utiliza exclusivamente petróleo, sem participação de hidreletricidade, biomassa, vento ou sol.",
          "a elevação da produtividade elimina automaticamente desmatamento, erosão, poluição e conflitos pelo uso de recursos.",
        ],
        explicacao: "Diversificação energética e ganhos de produtividade não tornam as atividades livres de efeitos ambientais; localização, tecnologia, manejo e regulação condicionam seus impactos.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "energia-agropecuaria-e-impactos",
      },
      {
        pergunta: "o armistício assinado em 11 de novembro de 1918 representou",
        correta: "a interrupção dos combates entre os Aliados e a Alemanha, embora os acordos de paz tenham sido negociados posteriormente.",
        distratores: [
          "a declaração inicial de guerra da Áustria-Hungria à Sérvia, anterior ao funcionamento do sistema de alianças.",
          "a entrada simultânea dos Estados Unidos e da Rússia no conflito ao lado das Potências Centrais.",
          "a assinatura do tratado que criou imediatamente a Organização das Nações Unidas e dividiu a Alemanha em quatro zonas de ocupação no mesmo dia.",
          "a rendição dos Aliados e a restauração integral das fronteiras europeias existentes antes de 1914.",
        ],
        explicacao: "O armistício de 11 de novembro de 1918 encerrou os combates na Frente Ocidental; os termos de paz foram definidos em negociações e tratados posteriores.",
        sourceKey: "parlamento_uk_primeira_guerra",
        subassunto: "primeira-guerra-armisticio-e-paz",
      },
      {
        pergunta: "as Leis de Nuremberg, editadas pelo regime nazista em 1935,",
        correta: "institucionalizaram a perseguição racial, retirando direitos de cidadania dos judeus e proibindo casamentos classificados como inter-raciais pelo regime.",
        distratores: [
          "restabeleceram a igualdade jurídica plena entre judeus e não judeus e revogaram medidas antissemitas anteriores.",
          "foram impostas aos nazistas pelos Aliados depois da guerra para organizar os julgamentos de crimes contra a humanidade.",
          "limitaram-se a regras econômicas temporárias, sem interferir em cidadania, vida familiar ou classificação racial.",
          "garantiram liberdade partidária e religiosa e impediram o Estado alemão de usar critérios raciais em suas políticas.",
        ],
        explicacao: "As Leis de Nuremberg converteram o antissemitismo nazista em normas de cidadania e de suposta proteção racial, aprofundando a exclusão dos judeus.",
        sourceKey: "ushmm_nazismo",
        subassunto: "nazismo-leis-de-nuremberg",
      },
      {
        pergunta: "no início da Guerra Fria, a Doutrina Truman e o Plano Marshall relacionaram-se, respectivamente, a",
        correta: "contenção da expansão soviética e ajuda econômica norte-americana à reconstrução europeia.",
        distratores: [
          "dissolução da Organização do Tratado do Atlântico Norte e transferência da Europa Ocidental à influência soviética.",
          "desarmamento nuclear completo das superpotências e criação de um governo único para a Alemanha reunificada.",
          "apoio dos Estados Unidos ao bloqueio de Berlim Ocidental e encerramento dos programas de recuperação econômica.",
          "formação do Pacto de Varsóvia pelos países capitalistas e retirada política norte-americana do continente europeu.",
        ],
        explicacao: "A política norte-americana combinou contenção político-estratégica e apoio à recuperação econômica da Europa Ocidental no contexto da rivalidade com a União Soviética.",
        sourceKey: "us_state_guerra_fria",
        subassunto: "guerra-fria-contencao-e-reconstrucao",
      },
      {
        pergunta: "a formação de cadeias globais de valor significa que",
        correta: "etapas de projeto, produção, montagem e distribuição podem ser realizadas em países diferentes e coordenadas por redes transnacionais.",
        distratores: [
          "todas as etapas produtivas precisam permanecer no mesmo município para que um bem possa circular internacionalmente, ainda que fornecedores e consumidores estejam em outros continentes.",
          "a circulação de tecnologia e capitais deixa de existir quando empresas distribuem funções entre vários territórios.",
          "a integração produtiva elimina riscos logísticos, assimetrias de poder e dependência entre fornecedores e mercados.",
          "somente Estados, e nunca empresas, participam da organização internacional da produção e do comércio.",
        ],
        explicacao: "A globalização produtiva fragmenta e coordena etapas em diferentes territórios, ampliando conexões e também dependências logísticas, tecnológicas e financeiras.",
        sourceKey: "ipea_globalizacao",
        subassunto: "globalizacao-cadeias-de-valor",
      },
      {
        pergunta: "entre as transformações institucionais do Governo Provisório de Getúlio Vargas esteve",
        correta: "a centralização do poder federal e a criação de estruturas administrativas voltadas ao trabalho, à indústria e à reorganização do Estado.",
        distratores: [
          "a imediata restauração da política dos governadores e a devolução irrestrita do poder às antigas oligarquias estaduais, sem criação de órgãos federais ou alteração administrativa.",
          "a extinção dos órgãos federais e a proibição de qualquer atuação estatal nas relações de trabalho e na economia.",
          "a implantação da Constituição de 1988 e a eleição presidencial direta de Vargas para mandato iniciado em 1930.",
          "a transferência da capital para Brasília e a criação do bipartidarismo que marcou o regime posterior a 1964.",
        ],
        explicacao: "O Governo Provisório promoveu centralização política e reforma administrativa, com novos órgãos e maior intervenção federal em áreas econômicas e sociais.",
        sourceKey: "arquivo_nacional_vargas",
        subassunto: "era-vargas-centralizacao-e-administracao",
      },
      {
        pergunta: "a Constituição brasileira de 1937 esteve associada",
        correta: "ao Estado Novo, à concentração de poderes no Executivo e à restrição da representação política e das liberdades públicas.",
        distratores: [
          "à redemocratização posterior à Segunda Guerra, ao restabelecimento imediato de eleições presidenciais livres e à plena autonomia dos partidos de oposição.",
          "à proclamação da República e à adoção inaugural do federalismo e do presidencialismo em 1891.",
          "à Assembleia Constituinte de 1987–1988 e à ampliação contemporânea dos direitos fundamentais.",
          "ao fim do regime militar em 1985 e à eleição direta de Tancredo Neves pela população brasileira.",
        ],
        explicacao: "A Carta de 1937 forneceu base jurídico-política ao Estado Novo autoritário e concentrou poderes na Presidência, restringindo instituições representativas.",
        sourceKey: "senado_constituicoes",
        subassunto: "constituicao-1937-estado-novo",
      },
      {
        pergunta: "o Ato Institucional nº 5, de 1968, aprofundou o autoritarismo ao",
        correta: "permitir medidas como fechamento do Congresso, cassações e suspensão de garantias, ampliando a repressão política.",
        distratores: [
          "restabelecer eleições presidenciais diretas e revogar todos os instrumentos de exceção então vigentes.",
          "convocar a Assembleia Constituinte que promulgaria a Constituição de 1988 no ano seguinte.",
          "encerrar a censura e assegurar habeas corpus sem restrições para crimes políticos e contra a segurança nacional, impedindo cassações pelo Executivo.",
          "abolir a possibilidade de intervenção federal e devolver aos partidos o pluripartidarismo irrestrito.",
        ],
        explicacao: "O AI-5 concentrou poderes e marcou a fase mais repressiva do regime, com fechamento do Legislativo, cassações, censura e restrições a garantias.",
        sourceKey: "senado_redemocratizacao",
        subassunto: "regime-militar-ai-5",
      },
      {
        pergunta: "a Lei da Anistia de 1979 inseriu-se no processo de abertura política porque",
        correta: "permitiu o retorno de exilados e alcançou pessoas punidas por atos de natureza política, embora seus limites permaneçam objeto de debate.",
        distratores: [
          "instituiu imediatamente eleições presidenciais diretas, encerrou o mandato do último presidente do regime militar e convocou a Constituinte no mesmo ato.",
          "manteve todos os exilados fora do país e proibiu a reorganização de movimentos e partidos políticos.",
          "promulgou a Constituição de 1988 e criou no mesmo ato a Assembleia Nacional Constituinte.",
          "revogou a República e restaurou a Constituição de 1824 como fundamento da transição democrática.",
        ],
        explicacao: "A anistia foi um marco da abertura ao permitir retornos e recomposição da vida política, sem representar por si só a conclusão da redemocratização.",
        sourceKey: "senado_redemocratizacao",
        subassunto: "redemocratizacao-anistia-1979",
      },
      {
        pergunta: "a dissolução da União Soviética, em 1991,",
        correta: "encerrou a estrutura bipolar da Guerra Fria, mas não eliminou rivalidades interestatais, conflitos regionais ou disputas por influência.",
        distratores: [
          "criou uma autoridade mundial única e tornou desnecessárias alianças militares e organizações multilaterais.",
          "reconstituiu imediatamente o Império Russo com as mesmas fronteiras e instituições existentes antes de 1917.",
          "transformou todos os antigos membros soviéticos em integrantes automáticos da União Europeia e da OTAN.",
          "encerrou os processos de globalização econômica e isolou permanentemente as economias nacionais umas das outras.",
        ],
        explicacao: "O desaparecimento da União Soviética encerrou um polo da bipolaridade, mas a ordem posterior continuou marcada por assimetrias, novos polos e conflitos.",
        sourceKey: "ipea_geopolitica",
        subassunto: "nova-ordem-fim-da-urss",
      },
      {
        pergunta: "a perda de biodiversidade pode agravar a mudança climática porque",
        correta: "a degradação de ecossistemas reduz estoques e sumidouros de carbono e enfraquece serviços ambientais que aumentam a resiliência.",
        distratores: [
          "espécies e ecossistemas não participam dos ciclos de carbono, água ou nutrientes e, portanto, não afetam o clima.",
          "a conversão de florestas sempre aumenta a captura de carbono e torna eventos extremos menos prováveis.",
          "a biodiversidade só tem valor estético e não interfere em proteção costeira, polinização, disponibilidade de água ou capacidade de adaptação a eventos extremos.",
          "mudança climática e biodiversidade ocorrem em escalas totalmente separadas e não compartilham causas ou soluções.",
        ],
        explicacao: "Clima e biodiversidade estão conectados: ecossistemas armazenam carbono e oferecem serviços que reduzem vulnerabilidades, enquanto sua degradação amplia emissões e riscos.",
        sourceKey: "onu_ambiente",
        subassunto: "ambiente-biodiversidade-e-clima",
      },
      {
        pergunta: "uma bacia hidrográfica corresponde",
        correta: "à área drenada por um rio principal e seus afluentes, delimitada por divisores de água associados ao relevo.",
        distratores: [
          "ao trecho de oceano situado diante da foz, sem relação com afluentes, relevo ou escoamento continental.",
          "a qualquer limite político estadual, ainda que os rios atravessem fronteiras e sigam para outra rede de drenagem.",
          "somente ao leito ocupado pelo rio durante a estiagem, excluídas vertentes e áreas que contribuem com água.",
          "a uma formação vegetal definida pela temperatura, independentemente da direção do escoamento superficial.",
        ],
        explicacao: "A bacia integra o território cujas águas convergem para um curso principal e seus tributários, e seus limites naturais acompanham divisores do relevo.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "hidrografia-bacia-e-divisor",
      },
      {
        pergunta: "a atuação das massas de ar ajuda a explicar",
        correta: "variações de temperatura e precipitação e a ocorrência de eventos como frentes frias em diferentes regiões brasileiras.",
        distratores: [
          "a inexistência de mudanças sazonais, pois uma única massa de ar permanece sobre todo o país durante o ano e impede a passagem de sistemas frontais.",
          "a distribuição fixa da população, sem relação com temperatura, umidade, relevo ou circulação atmosférica.",
          "a formação exclusiva do relevo geológico, sem qualquer influência sobre o tempo e os regimes de chuva.",
          "a igualdade climática entre litoral, interior e áreas de diferentes latitudes e altitudes.",
        ],
        explicacao: "Massas de ar com distintas origens e características térmicas e de umidade interagem e modificam o tempo, contribuindo para a diversidade climática do Brasil.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "clima-massas-de-ar",
      },
      {
        pergunta: "densidade demográfica e população absoluta diferem porque",
        correta: "a primeira relaciona número de habitantes e área, enquanto a segunda expressa o total de moradores de um território.",
        distratores: [
          "a primeira mede apenas nascimentos anuais, e a segunda representa exclusivamente a população economicamente ativa.",
          "ambas indicam exatamente o mesmo valor, independentemente da extensão territorial considerada no cálculo.",
          "a população absoluta é obtida dividindo habitantes pela área, enquanto densidade é apenas o total sem referência espacial.",
          "densidade só pode ser calculada para áreas rurais, e população absoluta somente para municípios totalmente urbanos.",
        ],
        explicacao: "População absoluta é um total; densidade é uma razão espacial, geralmente expressa em habitantes por quilômetro quadrado.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "populacao-absoluta-e-densidade",
      },
      {
        pergunta: "a desconcentração industrial brasileira significa",
        correta: "redução relativa da concentração em áreas tradicionais por deslocamento e expansão de atividades, sem produzir distribuição homogênea pelo território.",
        distratores: [
          "desaparecimento da indústria no Sudeste e transferência integral das fábricas para uma única região periférica.",
          "igualdade imediata de infraestrutura, renda e emprego industrial entre todos os municípios do país.",
          "retorno obrigatório das atividades urbanas ao campo e encerramento das redes metropolitanas e logísticas.",
          "fim da especialização regional, pois todas as cidades passam a produzir os mesmos bens em igual quantidade.",
        ],
        explicacao: "A atividade industrial expandiu-se para novas regiões e cidades, mas a desconcentração é relativa e convive com desigualdades e especializações territoriais.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "industrializacao-desconcentracao-relativa",
      },
      {
        pergunta: "a matriz energética e a matriz elétrica de um país não são sinônimas porque",
        correta: "a energética abrange todas as fontes usadas em transportes, indústria, eletricidade e outros fins, enquanto a elétrica considera a geração de energia elétrica.",
        distratores: [
          "a matriz elétrica inclui todos os combustíveis usados por veículos, e a energética se restringe às usinas hidrelétricas.",
          "ambas contabilizam apenas petróleo e gás natural e excluem biomassa, vento, sol e recursos hídricos.",
          "a matriz energética mede somente reservas ainda não exploradas, sem considerar consumo ou transformação de energia.",
          "a matriz elétrica representa toda energia consumida pela economia, mesmo quando não há conversão em eletricidade.",
        ],
        explicacao: "A matriz energética tem escopo amplo sobre oferta e uso de energia; a elétrica é o recorte das fontes utilizadas para produzir eletricidade.",
        sourceKey: "ibge_atlas_escolar",
        subassunto: "energia-matriz-energetica-e-eletrica",
      },
    ],
    informaticaBasica: [
      {
        pergunta: "sobre segurança da informação no uso de computadores, assinale a alternativa correta.",
        correta: "Senhas fortes, autenticação adicional e atualização de sistemas reduzem riscos de acesso indevido.",
        distratores: [
          "Uma senha institucional forte pode ser compartilhada entre colegas do mesmo setor, desde que todos mantenham sigilo externo.",
          "Atualizações devem ser adiadas indefinidamente em equipamentos conectados, pois corrigir falhas tende a ampliar a exposição.",
          "Um antivírus atualizado torna desnecessários a autenticação adicional, o controle de acesso e a atenção do usuário.",
          "Uma senha forte dispensa o segundo fator enquanto permanecer secreta.",
        ],
        explicacao: "Segurança depende de controles técnicos e comportamento preventivo do usuário.",
      },
      {
        pergunta: "em planilhas eletrônicas, a finalidade de uma fórmula é",
        correta: "realizar cálculos ou operações automáticas com base em valores e referências de células.",
        distratores: [
          "bloquear a edição de todas as células da planilha, independentemente das permissões e da proteção configurada.",
          "converter automaticamente textos e números em imagens para impedir que os valores sejam usados em novos cálculos.",
          "eliminar os dados de origem depois de exibir o resultado, mantendo apenas o último valor calculado na célula.",
          "fórmulas apenas exibem textos, sem calcular valores ou referências.",
        ],
        explicacao: "Fórmulas automatizam cálculos, referências e funções em planilhas.",
      },
      {
        pergunta: "quanto a navegadores de internet, é correto afirmar que",
        correta: "o protocolo HTTPS indica comunicação criptografada entre navegador e servidor, embora não garanta sozinho a legitimidade do conteúdo.",
        distratores: [
          "a presença de HTTPS confirma simultaneamente a identidade comercial do responsável, a veracidade do conteúdo e a ausência de código malicioso.",
          "HTTP e HTTPS oferecem a mesma proteção do tráfego, pois a criptografia depende apenas do modo privativo do navegador.",
          "o cadeado exibido pelo navegador autoriza fornecer dados pessoais sem conferir domínio, finalidade ou reputação do serviço.",
          "HTTPS comprova que o conteúdo publicado é verdadeiro e seguro.",
        ],
        explicacao: "HTTPS protege a comunicação, mas o usuário ainda deve verificar domínio, contexto e finalidade da página.",
      },
      {
        pergunta: "em editores de texto, o recurso de localizar e substituir serve para",
        correta: "encontrar ocorrências de uma expressão e, se desejado, trocá-las por outro conteúdo.",
        distratores: [
          "transformar automaticamente todos os parágrafos em uma tabela, ainda que o usuário não defina linhas, colunas ou critérios.",
          "excluir o arquivo original depois da primeira pesquisa, preservando somente as ocorrências encontradas em novo documento.",
          "converter o documento inteiro em imagem não editável para destacar visualmente cada termo localizado pelo usuário.",
          "o recurso apenas destaca o termo localizado e não permite substituí-lo.",
        ],
        explicacao: "Localizar/substituir é recurso básico de produtividade e revisão de documentos.",
      },
      {
        pergunta: "ao receber uma mensagem que solicita senha por um link encurtado, a conduta mais segura é",
        correta: "não usar o link e confirmar a solicitação por canal oficial independente.",
        distratores: [
          "informar parte da senha no endereço recebido para testar a página, completando os demais caracteres somente se houver erro.",
          "abrir o link em janela anônima e fornecer os dados, pois esse modo impede que a página transmita credenciais ao servidor.",
          "encaminhar a mensagem aos colegas antes de verificar a origem, usando as respostas deles como confirmação de legitimidade.",
          "o modo anônimo torna seguro preencher a senha no link recebido.",
        ],
        explicacao: "Solicitações inesperadas de credenciais são sinal de phishing; a confirmação deve ocorrer por canal oficial conhecido, sem usar o link recebido.",
      },
      {
        pergunta: "o princípio do menor privilégio recomenda",
        correta: "conceder a cada usuário apenas os acessos necessários para suas tarefas.",
        distratores: [
          "atribuir perfil de administrador a toda a equipe para evitar pedidos posteriores de elevação temporária de acesso.",
          "compartilhar uma conta única entre os setores, desde que a senha seja alterada periodicamente por um responsável.",
          "manter permissões anteriores após mudança de função, porque retirar acessos pode dificultar consultas futuras do usuário.",
          "o menor privilégio concede perfil de administrador por padrão.",
        ],
        explicacao: "Restringir permissões ao mínimo necessário reduz a superfície de risco e limita o impacto de erros ou credenciais comprometidas.",
      },
      {
        pergunta: "em uma planilha, a referência $A$1 é classificada como",
        correta: "absoluta, pois fixa coluna e linha ao copiar a fórmula.",
        distratores: [
          "relativa, porque os dois sinais de cifrão determinam que coluna e linha se ajustem quando a fórmula for copiada.",
          "mista, porque o primeiro cifrão fixa somente a coluna A e o segundo funciona apenas como separador da linha.",
          "mista, porque o cifrão anterior à linha 1 a fixa, enquanto o cifrão anterior à coluna A não produz efeito.",
          "relativa, pois os cifrões não fixam a referência ao copiar a fórmula.",
        ],
        explicacao: "Os dois sinais de cifrão fixam a coluna A e a linha 1, mantendo a referência ao copiar ou preencher a fórmula.",
      },
      {
        pergunta: "ao aplicar um filtro em uma tabela de planilha, o programa",
        correta: "oculta temporariamente linhas que não atendem ao critério, sem apagá-las.",
        distratores: [
          "exclui definitivamente as linhas que não atendem ao critério, ainda que o arquivo não tenha sido salvo depois da filtragem.",
          "altera os valores das linhas para que todos passem a atender ao critério escolhido, preservando a exibição integral.",
          "converte os dados filtrados em gráfico e substitui a tabela original para impedir resultados incompatíveis com o critério.",
          "apaga as linhas que não atendem ao critério escolhido pelo usuário.",
        ],
        explicacao: "Filtrar modifica a visualização dos registros segundo critérios; os dados não exibidos permanecem na planilha.",
      },
      {
        pergunta: "sobre sincronização em nuvem e cópia de segurança, é correto afirmar que",
        correta: "sincronização replica alterações e não substitui, sozinha, um backup com versões recuperáveis.",
        distratores: [
          "sincronização impede que exclusões acidentais se propaguem a outros dispositivos, mesmo quando a remoção é uma alteração válida.",
          "qualquer pasta sincronizada conserva versões ilimitadas por tempo indeterminado, independentemente das regras do serviço contratado.",
          "backup e sincronização são operações idênticas, pois ambos garantem isolamento contra corrupção, exclusão e sobrescrita de arquivos.",
          "sincronizar e fazer backup são operações equivalentes em qualquer serviço.",
        ],
        explicacao: "Uma exclusão ou corrupção pode ser sincronizada; backups independentes, versionados e testados oferecem proteção adicional.",
      },
      {
        pergunta: "a finalidade principal do cache de um navegador é",
        correta: "armazenar temporariamente recursos para acelerar carregamentos posteriores.",
        distratores: [
          "validar a autoria e a veracidade do conteúdo de cada página antes de permitir que seus recursos sejam apresentados ao usuário.",
          "criptografar automaticamente qualquer dado salvo no navegador, independentemente do protocolo e da configuração do site.",
          "substituir o histórico por uma cópia permanente da internet, mantendo disponíveis inclusive páginas que nunca foram acessadas.",
          "validar a segurança das páginas que já foram acessadas pelo usuário.",
        ],
        explicacao: "O cache guarda cópias locais temporárias de recursos, como imagens e folhas de estilo, para reduzir transferências futuras.",
      },
      {
        pergunta: "antes de restaurar uma cópia de segurança institucional, é importante",
        correta: "verificar integridade, data, escopo e procedimento de restauração.",
        distratores: ["apagar todas as cópias anteriores sem conferência.", "presumir que o arquivo mais recente sempre está íntegro.", "desativar controles de acesso durante toda a recuperação.", "restaurar diretamente em produção sem teste ou plano de retorno."],
        explicacao: "A validação prévia reduz o risco de restaurar dados corrompidos, incompletos ou incompatíveis com o objetivo da recuperação.",
      },
      {
        pergunta: "ao compartilhar um documento para edição colaborativa, a medida mais adequada é",
        correta: "definir permissões por necessidade e revisar quem mantém acesso.",
        distratores: ["publicar o link sem restrição para facilitar alterações.", "usar uma senha coletiva no próprio nome do arquivo.", "desativar o histórico de versões para ocultar mudanças.", "conceder permissão de edição mesmo a quem só precisa ler."],
        explicacao: "Permissões proporcionais à necessidade e revisões periódicas ajudam a proteger conteúdo, autoria e rastreabilidade das alterações.",
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

  const MC_SUBJECTS = new Map([
    [MC_FACTS.portugues, ["clareza-textual", "concordancia-verbal", "pontuacao", "coesao", "verbo-fazer-impessoal", "ambiguidade", "virgula-entre-sujeito-e-predicado", "emprego-dos-porques", "concessao", "voz-passiva", "paralelismo", "reescrita-e-condicao"]],
    [MC_FACTS.matematica, ["porcentagem", "proporcionalidade-inversa", "media-aritmetica", "negacao-logica", "desconto-percentual", "razao", "probabilidade", "minimo-multiplo-comum", "equacao-do-primeiro-grau", "mediana", "area-do-retangulo", "juros-simples"]],
    [MC_FACTS.geografia, ["densidade-demografica", "cartografia-tematica", "urbanizacao", "territorio", "escala-cartografica", "saldo-migratorio", "transicao-demografica", "regionalizacao", "coordenadas-geograficas", "rede-urbana"]],
    [MC_FACTS.ibgeTecnicos, ["controle-de-qualidade", "sigilo-estatistico", "consistencia", "supervisao-de-campo", "omissao-de-cobertura", "georreferenciamento", "nao-resposta", "valores-atipicos", "metadados", "padronizacao-do-treinamento"]],
    [MC_FACTS.tiDados, ["chave-primaria", "normalizacao", "api-rest", "validacao-de-modelos", "controle-de-versao", "criptografia-em-transito", "chave-estrangeira", "atomicidade", "http-404", "vazamento-entre-treino-e-teste", "revisao-de-merge", "hashing-de-senha"]],
    [MC_FACTS.santosLegislacao, ["lei-organica-principios-administrativos", "lei-organica-poderes-municipais", "lei-organica-natureza-do-municipio", "lei-organica-transparencia-mensal", "lei-organica-cargos-e-regime", "lei-4623-funcionario-e-cargo", "lei-4623-exercicio-e-registro", "lei-4623-direito-de-peticao", "lei-4623-deveres-funcionais", "lei-4623-proibicoes-funcionais", "lc-1253-principios-de-organizacao", "lc-1253-enfases-da-atuacao", "lc-1253-orgao-e-entidade", "lc-1253-modernizacao-administrativa", "lc-1253-administracao-indireta"]],
    [MC_FACTS.administracao, ["protocolo", "arquivo-corrente", "gestao-de-materiais", "impessoalidade-na-redacao", "classificacao-documental", "tabela-de-temporalidade", "inventario", "ponto-de-pedido", "comunicacao-interna", "arquivamento"]],
    [MC_FACTS.pmspConhecimentosGerais, ["primeira-guerra-mundial", "nazifascismo-e-segunda-guerra", "guerra-fria", "globalizacao-e-politicas-neoliberais", "revolucao-de-1930-e-era-vargas", "constituicoes-republicanas", "regime-militar-politica-e-movimentos", "abertura-politica-e-redemocratizacao", "nova-ordem-mundial-e-geopolitica", "problemas-ambientais-globais", "natureza-relevo-e-hidrografia", "natureza-clima-e-vegetacao", "populacao-distribuicao-e-transicao", "industrializacao-e-urbanizacao", "energia-agropecuaria-e-impactos"]],
    [MC_FACTS.informaticaBasica, ["seguranca-da-informacao", "formulas-em-planilhas", "https", "localizar-e-substituir", "phishing", "menor-privilegio", "referencia-absoluta", "filtros-em-planilhas", "sincronizacao-e-backup", "cache", "restauracao-de-backup", "permissoes-de-compartilhamento"]],
    [MC_FACTS.pmspAdministracaoPublica, ["legalidade", "lei-de-acesso-a-informacao", "impessoalidade", "eficiencia"]],
  ]);

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

  function ceDifficulty(factIndex, cognitiveMode) {
    if (cognitiveMode === 0) return ["facil", "medio", "medio", "dificil"][factIndex % 4];
    if (cognitiveMode === 1) return ["medio", "dificil", "medio", "dificil"][factIndex % 4];
    return "dificil";
  }

  function mcDifficulty(factIndex, round) {
    if (round === 0) return ["facil", "medio", "medio", "dificil"][factIndex % 4];
    if (round === 1) return ["medio", "medio", "dificil", "dificil"][factIndex % 4];
    if (round === 2) return ["medio", "dificil", "medio", "dificil"][factIndex % 4];
    return "dificil";
  }

  function addQuestion(question) {
    const contest = contestById[question.concurso_id];
    const primaryRole = roleById(question.concurso_id, question.cargo_id);
    const source = sourceFor(question.sourceKey);
    const rawExplanation = String(question.explicacao || "").trim();
    const detailedExplanation = rawExplanation.length >= 45
      ? rawExplanation
      : `${rawExplanation} Esse fundamento permite distinguir a resposta correta das demais alternativas.`.trim();

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
      explicacao: detailedExplanation,
      status: "ativo",
      tags: question.tags || [],
      criado_em: CREATED_AT,
      atualizado_em: UPDATED_AT,
    });
  }

  function sentenceCase(value) {
    const text = String(value).trim();
    return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;
  }

  function lowerInitial(value) {
    const text = String(value).trim();
    return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : text;
  }

  function withoutTerminalPunctuation(value) {
    return String(value).trim().replace(/[.;:!?]+$/u, "");
  }

  function asSentence(value) {
    const text = withoutTerminalPunctuation(value);
    return text ? `${sentenceCase(text)}.` : text;
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const character of String(value)) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;
    return hash >>> 0;
  }

  function seededPermutation(length, seedText) {
    const values = Array.from({ length }, (_, index) => index);
    let state = stableHash(seedText) || 1;
    for (let index = values.length - 1; index > 0; index -= 1) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const target = state % (index + 1);
      [values[index], values[target]] = [values[target], values[index]];
    }
    return values;
  }

  function hasShortPeriod(sequence) {
    for (let period = 1; period <= Math.min(8, Math.floor(sequence.length / 2)); period += 1) {
      if (sequence.every((value, index) => value === sequence[index % period])) return true;
    }
    return false;
  }

  function wouldCreateRepeatedCycle(sequence, candidate) {
    const prospective = [...sequence, candidate];
    for (let period = 1; period <= Math.min(6, Math.floor(prospective.length / 3)); period += 1) {
      const start = prospective.length - (period * 3);
      let repeats = true;
      for (let index = start + period; index < prospective.length; index += 1) {
        if (prospective[index] !== prospective[index - period]) {
          repeats = false;
          break;
        }
      }
      if (repeats) return true;
    }
    return false;
  }

  function buildAnswerSequence(groupId, length, optionCount) {
    const quotas = Array(optionCount).fill(Math.floor(length / optionCount));
    seededPermutation(optionCount, `${groupId}:cotas`)
      .slice(0, length % optionCount)
      .forEach((index) => { quotas[index] += 1; });
    const remaining = [...quotas];
    const sequence = [];

    function fill(position) {
      if (position === length) return !hasShortPeriod(sequence);
      const ranked = seededPermutation(optionCount, `${groupId}:gabarito:${position}`)
        .sort((left, right) => remaining[right] - remaining[left]);

      for (const candidate of ranked) {
        if (remaining[candidate] === 0) continue;
        if (sequence.length >= 2 && sequence.at(-1) === candidate && sequence.at(-2) === candidate) continue;
        if (wouldCreateRepeatedCycle(sequence, candidate)) continue;
        sequence.push(candidate);
        remaining[candidate] -= 1;
        if (fill(position + 1)) return true;
        remaining[candidate] += 1;
        sequence.pop();
      }
      return false;
    }

    if (!fill(0)) throw new Error(`Não foi possível distribuir os gabaritos de ${groupId}.`);
    return sequence;
  }

  function arrangeAlternatives(questionId, labels, correctText, distractorTexts, correctIndex) {
    const normalizedCorrect = withoutTerminalPunctuation(correctText).toLocaleLowerCase("pt-BR");
    const uniqueDistractors = [];
    const seen = new Set([normalizedCorrect]);

    distractorTexts.forEach((value) => {
      const text = asSentence(value);
      const signature = withoutTerminalPunctuation(text).toLocaleLowerCase("pt-BR");
      if (!signature || seen.has(signature)) return;
      seen.add(signature);
      uniqueDistractors.push(text);
    });

    if (uniqueDistractors.length < labels.length - 1) {
      throw new Error(`Distratores insuficientes para ${questionId}.`);
    }

    const order = seededPermutation(uniqueDistractors.length, `${questionId}:distratores`);
    const selectedDistractors = order
      .slice(0, labels.length - 1)
      .map((index) => uniqueDistractors[index]);
    let distractorOffset = 0;

    return labels.map((label, index) => ({
      label,
      text: index === correctIndex ? asSentence(correctText) : selectedDistractors[distractorOffset++],
    }));
  }

  function scenarioLead(audience, context) {
    const setting = String(audience)
      .replace(/^Em uma\s+/u, "Considere uma ")
      .replace(/^Em um\s+/u, "Considere um ")
      .replace(/^Na\s+/u, "Considere a ")
      .replace(/^No\s+/u, "Considere o ");
    const completeSetting = setting === audience
      ? `Considere o seguinte cenário: ${lowerInitial(audience)}`
      : setting;
    const action = String(context).replace(/^ao\s+/u, "");
    return `${asSentence(completeSetting)} A tarefa exige ${lowerInitial(asSentence(action))}`;
  }

  function buildMultipleChoiceVariant({ fact, round, questionId, audience, context, optionCount }) {
    const directDistractors = [...fact.distratores];
    const misconceptionIndex = stableHash(`${questionId}:erro-analisado`) % directDistractors.length;
    const misconception = directDistractors[misconceptionIndex];
    const secondaryMisconception = directDistractors[(misconceptionIndex + 1) % directDistractors.length];
    const lead = scenarioLead(audience, context);
    const referencedPrompt = sentenceCase(withoutTerminalPunctuation(fact.pergunta));
    const variantMode = round % 6;
    const correctFirst = stableHash(`${questionId}:ordem`) % 2 === 0;
    const quoteAnswer = (value) => `“${sentenceCase(withoutTerminalPunctuation(value))}”`;
    const correctQuoted = quoteAnswer(fact.correta);
    const misconceptionQuoted = quoteAnswer(misconception);
    const secondaryMisconceptionQuoted = quoteAnswer(secondaryMisconception);

    if (variantMode === 0) {
      return {
        enunciado: round === 0
          ? `${lead} ${sentenceCase(fact.pergunta)}`
          : `${lead} Em uma nova revisão do conteúdo, ${lowerInitial(sentenceCase(fact.pergunta))}`,
        correta: fact.correta,
        distratores: directDistractors,
        explicacao: fact.explicacao,
      };
    }

    if (variantMode === 1) {
      const appliedMisconceptionIndex = stableHash(`${questionId}:aplicacao`) % directDistractors.length;
      const appliedMisconception = directDistractors[appliedMisconceptionIndex];
      const comparisonAlternativeQuoted = quoteAnswer(
        directDistractors[(appliedMisconceptionIndex + 1) % directDistractors.length],
      );
      const first = correctFirst ? fact.correta : appliedMisconception;
      const second = correctFirst ? appliedMisconception : fact.correta;
      const firstQuoted = quoteAnswer(first);
      const secondQuoted = quoteAnswer(second);
      const combinationCorrect = correctFirst
        ? `Apenas a resposta I atende ao comando: ${firstQuoted} é adequada, ao contrário de ${secondQuoted}.`
        : `Apenas a resposta II atende ao comando: ${secondQuoted} é adequada, ao contrário de ${firstQuoted}.`;
      const combinationDistractors = [
        `As duas respostas atendem ao comando; ${firstQuoted} e ${secondQuoted} seriam igualmente aceitáveis.`,
        `Nenhuma das respostas atende ao comando; a solução adequada seria ${comparisonAlternativeQuoted}.`,
        correctFirst
          ? `Apenas a resposta II atende ao comando: ${secondQuoted} deve prevalecer sobre ${firstQuoted}.`
          : `Apenas a resposta I atende ao comando: ${firstQuoted} deve prevalecer sobre ${secondQuoted}.`,
        `As respostas I e II são equivalentes, pois ${firstQuoted} e ${secondQuoted} expressam o mesmo conteúdo.`,
      ];
      return {
        enunciado: `${lead} Considere o comando do item: “${referencedPrompt}”. Foram propostas duas respostas: I — ${asSentence(first)} II — ${asSentence(second)} Assinale a avaliação correta.`,
        correta: combinationCorrect,
        distratores: combinationDistractors,
        explicacao: `${fact.explicacao} ${correctFirst ? "A resposta I" : "A resposta II"} aplica esse fundamento; a outra introduz uma conclusão incompatível.`,
      };
    }

    if (variantMode === 2) {
      const alternativeCorrections = directDistractors
        .filter((_, index) => index !== misconceptionIndex)
        .map((alternative) => `A resposta deve ser revista; a formulação adequada é “${sentenceCase(withoutTerminalPunctuation(alternative))}”.`);
      return {
        enunciado: `${lead} Ao responder ao item “${referencedPrompt}”, foi registrada a solução ${misconceptionQuoted}. Qual parecer apresenta a correção adequada?`,
        correta: `A resposta deve ser revista; a formulação adequada é “${sentenceCase(withoutTerminalPunctuation(fact.correta))}”.`,
        distratores: [
          `A solução ${misconceptionQuoted} está correta e pode ser mantida como resposta ao item.`,
          ...alternativeCorrections,
        ],
        explicacao: `${fact.explicacao} A solução registrada não aplica esse fundamento; a revisão indicada no gabarito restabelece o critério correto.`,
      };
    }

    if (variantMode === 3) {
      const first = correctFirst ? fact.correta : misconception;
      const second = correctFirst ? misconception : fact.correta;
      const firstQuoted = quoteAnswer(first);
      const secondQuoted = quoteAnswer(second);
      const assertionCorrect = correctFirst
        ? `Apenas a afirmativa I está correta: ${firstQuoted} corresponde ao conteúdo, mas ${secondQuoted} não.`
        : `Apenas a afirmativa II está correta: ${secondQuoted} corresponde ao conteúdo, mas ${firstQuoted} não.`;
      const assertionDistractors = [
        `As afirmativas I e II estão corretas; tanto ${firstQuoted} quanto ${secondQuoted} atendem ao conteúdo.`,
        `As afirmativas I e II estão incorretas; a resposta adequada seria ${secondaryMisconceptionQuoted}.`,
        correctFirst
          ? `Apenas a afirmativa II está correta: ${secondQuoted} deve prevalecer sobre ${firstQuoted}.`
          : `Apenas a afirmativa I está correta: ${firstQuoted} deve prevalecer sobre ${secondQuoted}.`,
        `As afirmativas I e II são equivalentes, pois ${firstQuoted} e ${secondQuoted} expressam a mesma regra.`,
      ];
      return {
        enunciado: `${lead} Para responder ao item “${referencedPrompt}”, avalie as afirmativas: I — ${asSentence(first)} II — ${asSentence(second)} Assinale a alternativa correta.`,
        correta: assertionCorrect,
        distratores: assertionDistractors,
        explicacao: `${fact.explicacao} ${correctFirst ? "A afirmativa I" : "A afirmativa II"} preserva esse fundamento; a outra o contradiz.`,
      };
    }

    if (variantMode === 4) {
      return {
        enunciado: `${lead} Uma revisão rejeitou a solução ${misconceptionQuoted} para o item “${referencedPrompt}”. Qual alternativa deve constar na versão corrigida?`,
        correta: fact.correta,
        distratores: directDistractors,
        explicacao: `${fact.explicacao} A alternativa do gabarito substitui a solução rejeitada por uma formulação compatível com o conteúdo cobrado.`,
      };
    }

    return {
      enunciado: `${lead} O gabarito preliminar indicou ${correctQuoted} para o item “${referencedPrompt}”. Qual justificativa confirma essa escolha?`,
      correta: `A escolha se justifica porque ${lowerInitial(asSentence(fact.explicacao))}`,
      distratores: (fact.justificativasIncorretas || directDistractors)
        .map((alternative) => `A escolha se justifica porque ${lowerInitial(asSentence(alternative))}`),
      explicacao: `${fact.explicacao} As demais justificativas partem de conclusões que não atendem ao comando do item.`,
    };
  }

  function generateCE(spec) {
    const answerSequence = buildAnswerSequence(spec.prefix, spec.count, 2);
    for (let index = 0; index < spec.count; index += 1) {
      const fact = spec.facts[index % spec.facts.length];
      const questionId = `${spec.prefix}-${pad(index + 1)}`;
      const isCorrect = answerSequence[index] === 0;
      const round = Math.floor(index / spec.facts.length);
      const context = CE_CONTEXTS[stableHash(`${questionId}:contexto`) % CE_CONTEXTS.length];
      const subjectSequence = CE_SUBJECTS.get(spec.facts) || spec.subassuntos;
      const subassunto = fact.subassunto || subjectSequence[index % spec.facts.length];
      const resposta = isCorrect ? "C" : "E";
      const statement = asSentence(isCorrect ? fact.certo : fact.errado);
      const trueStatement = asSentence(fact.certo);
      const falseStatement = asSentence(fact.errado);
      const cognitiveMode = round % 4;
      let enunciado;
      let explicacao;

      if (cognitiveMode === 0) {
        enunciado = `${context}, no conteúdo de ${spec.materia}, julgue o item a seguir. ${statement}`;
        explicacao = `${fact.exp} A afirmação apresentada ${isCorrect ? "preserva" : "contraria"} esse fundamento.`;
      } else if (cognitiveMode === 1) {
        enunciado = `${context}, uma equipe adotou como orientação que ${lowerInitial(statement)} Julgue se essa orientação é tecnicamente adequada.`;
        explicacao = `${fact.exp} Aplicado ao procedimento descrito, o entendimento registrado ${isCorrect ? "é adequado" : "precisa ser corrigido"}.`;
      } else if (cognitiveMode === 2) {
        const first = isCorrect ? trueStatement : falseStatement;
        const second = isCorrect ? falseStatement : trueStatement;
        enunciado = `${context}, foram comparadas duas orientações: I — ${first} II — ${second} Julgue o item: somente a primeira orientação está de acordo com o conteúdo cobrado.`;
        explicacao = `${fact.exp} ${isCorrect ? "A primeira orientação aplica a regra, enquanto a segunda a distorce." : "A ordem foi invertida: a segunda orientação aplica a regra, e a primeira a distorce."}`;
      } else {
        const original = isCorrect ? falseStatement : trueStatement;
        const replacement = isCorrect ? trueStatement : falseStatement;
        enunciado = `${context}, uma minuta registra: “${original}” Julgue o item: a revisão deve substituir esse trecho por “${replacement}”`;
        explicacao = `${fact.exp} A substituição proposta ${isCorrect ? "corrige a minuta" : "introduziria o erro em um trecho que estava correto"}.`;
      }

      addQuestion({
        id: questionId,
        concurso_id: "crt-sp",
        cargo_id: spec.cargo_id || "crt-tecnico-administrativo-bs",
        cargos_compativeis: spec.cargos || ["crt-tecnico-administrativo-bs"],
        materia_id: spec.materia_id,
        materia: spec.materia,
        assunto_id: spec.assunto_id,
        assunto: spec.assunto,
        subassunto,
        bloco: spec.bloco,
        dificuldade: ceDifficulty(index % spec.facts.length, cognitiveMode),
        tipo: "certo_errado",
        sourceKey: fact.sourceKey || spec.sourceKey,
        fonte_inspiracao: spec.inspiracao,
        enunciado,
        resposta_correta: resposta,
        explicacao,
        tags: [spec.assunto_id, subassunto, ...(spec.tags || [])],
      });
    }
  }

  function generateMC(spec) {
    const optionCount = spec.concurso_id === "santos-oficial" ? 4 : 5;
    const answerSequence = buildAnswerSequence(spec.prefix, spec.count, optionCount);
    for (let index = 0; index < spec.count; index += 1) {
      const fact = spec.facts[index % spec.facts.length];
      const questionId = `${spec.prefix}-${pad(index + 1)}`;
      const round = Math.floor(index / spec.facts.length);
      const roleKey = `${spec.concurso_id}::${spec.cargo_id}`;
      const contexts = MC_CONTEXTS_BY_ROLE[roleKey] || MC_CONTEXTS;
      const context = contexts[stableHash(`${questionId}:contexto`) % contexts.length];
      const audience = MC_AUDIENCES[roleKey] || "Em uma situação compatível com o edital";
      const subjectSequence = MC_SUBJECTS.get(spec.facts) || spec.subassuntos;
      const subassunto = fact.subassunto || subjectSequence[index % spec.facts.length];
      const optionLabels = spec.concurso_id === "santos-oficial" ? LETTERS.slice(0, 4) : LETTERS;
      const correctIndex = answerSequence[index];
      const correctLabel = optionLabels[correctIndex];
      const variant = buildMultipleChoiceVariant({
        fact,
        round,
        questionId,
        audience,
        context,
        optionCount: optionLabels.length,
      });
      const alternativas = arrangeAlternatives(
        questionId,
        optionLabels,
        variant.correta,
        variant.distratores,
        correctIndex,
      );

      addQuestion({
        id: questionId,
        concurso_id: spec.concurso_id,
        cargo_id: spec.cargo_id,
        cargos_compativeis: spec.cargos || [spec.cargo_id],
        materia_id: spec.materia_id,
        materia: spec.materia,
        assunto_id: spec.assunto_id,
        assunto: spec.assunto,
        subassunto,
        bloco: spec.bloco,
        dificuldade: mcDifficulty(index % spec.facts.length, round),
        tipo: "multipla_escolha",
        sourceKey: fact.sourceKey || spec.sourceKey,
        fonte_inspiracao: spec.inspiracao,
        enunciado: variant.enunciado,
        alternativas,
        resposta_correta: correctLabel,
        explicacao: variant.explicacao,
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
    { prefix: "CRT-LIC", count: 6, materia_id: "crt-licitacoes", materia: "Licitações e contratos", assunto_id: "licitacoes", assunto: "Contratações públicas", subassuntos: ["pregao", "inexigibilidade", "segregacao"], bloco: "Conhecimentos específicos", facts: CE_FACTS.licitacoes, sourceKey: "lei_14133", inspiracao: "Base legal: Lei 14.133/2021", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-SIS", count: 15, materia_id: "crt-sistema", materia: "Sistema CFT/CRT-SP", assunto_id: "sistema-cft-crt", assunto: "Legislação do Sistema CFT/CRTs", subassuntos: ["lei-13639", "lei-5524", "decretos", "resolucoes"], bloco: "Conhecimentos específicos", facts: CE_FACTS.sistemaCft, sourceKey: "lei_13639", inspiracao: "Lei 13.639/2018, Lei 5.524/1968, decretos e resoluções CFT", cargos: ["crt-tecnico-administrativo-bs", "crt-fiscal-bs"] },
    { prefix: "CRT-FIS", count: 30, cargo_id: "crt-fiscal-bs", materia_id: "crt-fiscalizacao", materia: "Fiscalização profissional", assunto_id: "fiscalizacao-profissional", assunto: "Planejamento, inspeção e relatório de fiscalização", subassuntos: ["rastreabilidade", "atribuicoes", "nao-conformidade", "evidencias", "protecao-de-dados", "planejamento", "orientacao", "comunicacao", "relatorio", "competencia", "reincidencia", "checklist", "cadeia-documental", "motivacao", "risco"], bloco: "Conhecimentos específicos", facts: CE_FACTS.fiscalizacao, sourceKey: "crt_edital", inspiracao: "Edital CRT-SP 2026, Lei 13.639/2018 e princípios do processo administrativo", cargos: ["crt-fiscal-bs"] },
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
    { prefix: "SAN-INF", count: 30, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-informatica", materia: "Informática e rotinas", assunto_id: "informatica-rotinas", assunto: "Informática aplicada à rotina administrativa", subassuntos: ["seguranca", "planilhas", "internet", "editor-texto"], bloco: "Conhecimentos gerais", facts: MC_FACTS.informaticaBasica, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026 e padrão IBAM", tags: ["santos", "ibam", "informatica"] },
    { prefix: "SAN-ADM", count: 45, concurso_id: "santos-oficial", cargo_id: "santos-oficial-administracao", materia_id: "santos-especificos", materia: "Conhecimentos específicos administrativos", assunto_id: "administracao", assunto: "Rotinas administrativas municipais", subassuntos: ["protocolo", "arquivo", "materiais", "redacao"], bloco: "Conhecimentos específicos", facts: MC_FACTS.administracao, sourceKey: "santos_pdf", inspiracao: "Edital Santos 71/2026 e provas administrativas no padrão IBAM", tags: ["santos", "ibam"] },
    { prefix: "PMSP-POR", count: 40, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-portugues", materia: "Língua Portuguesa e Interpretação de Texto", assunto_id: "portugues", assunto: "Português e interpretação para PM-SP", subassuntos: ["interpretacao", "concordancia", "pontuacao", "coesao"], bloco: "Prova objetiva", facts: MC_FACTS.portugues, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-MAT", count: 30, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-matematica", materia: "Matemática", assunto_id: "matematica", assunto: "Matemática para PM-SP", subassuntos: ["porcentagem", "regra-de-tres", "media", "logica"], bloco: "Prova objetiva", facts: MC_FACTS.matematica, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-CGE", count: 30, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-conhecimentos-gerais", materia: "Conhecimentos Gerais", assunto_id: "conhecimentos-gerais", assunto: "História, Geografia e Atualidades", subassuntos: ["historia-do-brasil", "geografia-do-brasil", "atualidades", "cidadania"], bloco: "Prova objetiva", facts: MC_FACTS.pmspConhecimentosGerais, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26, conteúdo programático oficial e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-INF", count: 10, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-informatica", materia: "Noções Básicas de Informática", assunto_id: "informatica", assunto: "Informática básica", subassuntos: ["seguranca", "planilhas", "internet", "editor-texto"], bloco: "Prova objetiva", facts: MC_FACTS.informaticaBasica, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
    { prefix: "PMSP-ADM", count: 10, concurso_id: "pm-sp", cargo_id: "pmsp-aluno-soldado-qp", materia_id: "pmsp-administracao-publica", materia: "Noções de Administração Pública", assunto_id: "administracao-publica", assunto: "Constituição, Constituição paulista e LAI", subassuntos: ["legalidade", "impessoalidade", "eficiencia", "lai"], bloco: "Prova objetiva", facts: MC_FACTS.pmspAdministracaoPublica, sourceKey: "pmsp_vunesp", inspiracao: "Edital PM-SP DP-3/321/26, Lei 12.527/2011 e padrão VUNESP", tags: ["pmsp", "vunesp"] },
  ].forEach(generateMC);

  [
    {
      id: "IBGE-ANA-TI-049",
      subassunto: "linux",
      dificuldade: "medio",
      enunciado: "Em um ambiente Linux usado para processar arquivos de coleta, o analista precisa verificar rapidamente o uso de espaço das partições em formato legível. O comando mais adequado é",
      alternativas: [
        { label: "A", text: "df -h" },
        { label: "B", text: "du -sh /dados" },
        { label: "C", text: "lsblk -f" },
        { label: "D", text: "free -h" },
        { label: "E", text: "findmnt" },
      ],
      resposta_correta: "A",
      explicacao: "O comando df exibe o uso de espaço em sistemas de arquivos; a opção -h apresenta os valores em formato legível, como MB e GB.",
      tags: ["ibge", "analista", "ti", "linux"],
    },
    {
      id: "IBGE-ANA-TI-050",
      subassunto: "redes",
      dificuldade: "medio",
      enunciado: "Em uma rede institucional, a equipe precisa dividir a mesma infraestrutura de comutação em domínios de broadcast lógicos distintos. O recurso adequado é",
      alternativas: [
        { label: "A", text: "VPN" },
        { label: "B", text: "VLAN" },
        { label: "C", text: "NAT" },
        { label: "D", text: "STP" },
        { label: "E", text: "DNS" },
      ],
      resposta_correta: "B",
      explicacao: "VLANs permitem segmentar logicamente uma rede local, separando tráfego e domínios de broadcast sem exigir redes físicas totalmente independentes.",
      tags: ["ibge", "analista", "ti", "redes", "vlan"],
    },
    {
      id: "IBGE-ANA-TI-051",
      subassunto: "postgresql",
      dificuldade: "facil",
      enunciado: "Para administrar visualmente um banco PostgreSQL em uma estação de trabalho, criando consultas e inspecionando tabelas, uma ferramenta associada diretamente a esse SGBD é",
      alternativas: [
        { label: "A", text: "SQL Server Management Studio" },
        { label: "B", text: "MySQL Workbench" },
        { label: "C", text: "Oracle SQL Developer" },
        { label: "D", text: "pgAdmin" },
        { label: "E", text: "MongoDB Compass" },
      ],
      resposta_correta: "D",
      explicacao: "O pgAdmin é uma ferramenta gráfica amplamente utilizada para administração e consulta de bancos PostgreSQL.",
      tags: ["ibge", "analista", "ti", "postgresql", "banco-de-dados"],
    },
    {
      id: "IBGE-ANA-TI-052",
      subassunto: "python",
      dificuldade: "facil",
      enunciado: "Em um script Python de validação de dados, o bloco normalmente usado para capturar uma exceção e tratar a falha sem encerrar imediatamente o programa é",
      alternativas: [
        { label: "A", text: "if-else" },
        { label: "B", text: "for-else" },
        { label: "C", text: "try-except" },
        { label: "D", text: "with-as" },
        { label: "E", text: "match-case" },
      ],
      resposta_correta: "C",
      explicacao: "Em Python, try-except envolve operações que podem falhar e define como tratar exceções quando elas ocorrem.",
      tags: ["ibge", "analista", "ti", "python", "excecoes"],
    },
    {
      id: "IBGE-ANA-TI-053",
      subassunto: "sql",
      dificuldade: "medio",
      enunciado: "Considere uma tabela coleta com as colunas municipio_id e total_questionarios. Para somar os questionários por município, a consulta SQL correta é",
      alternativas: [
        { label: "A", text: "SELECT municipio_id, SUM(total_questionarios) AS total FROM coleta GROUP BY municipio_id;" },
        { label: "B", text: "SELECT municipio_id, COUNT(total_questionarios) AS total FROM coleta GROUP BY municipio_id;" },
        { label: "C", text: "SELECT municipio_id, AVG(total_questionarios) AS total FROM coleta GROUP BY municipio_id;" },
        { label: "D", text: "SELECT municipio_id, SUM(total_questionarios) AS total FROM coleta GROUP BY total_questionarios;" },
        { label: "E", text: "SELECT SUM(total_questionarios) AS total FROM coleta;" },
      ],
      resposta_correta: "A",
      explicacao: "A função SUM agrega os valores, e GROUP BY municipio_id agrupa o resultado por município.",
      tags: ["ibge", "analista", "ti", "sql", "agregacao"],
    },
  ].forEach((question) => addQuestion({
    concurso_id: "ibge",
    cargo_id: "ibge-analista-ti-dados",
    cargos_compativeis: ["ibge-analista-ti-dados"],
    materia_id: "ibge-ana-especificos",
    materia: "Conhecimentos específicos de TI e Dados",
    assunto_id: "ti-dados",
    assunto: "Tecnologia da informação e ciência de dados",
    bloco: "Conhecimentos específicos",
    tipo: "multipla_escolha",
    sourceKey: "ibge_conteudo",
    fonte_inspiracao: "Questão autoral baseada no conteúdo programático oficial do IBGE para TI e Dados.",
    ...question,
  }));

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
    version: "2026.08.20-quality-audit",
    generatedAt: UPDATED_AT,
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
