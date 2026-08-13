"use strict";

(function bootstrapQuestionBank() {
  const QUESTION_BANK = [];

  const difficultyCycle = ["facil", "medio", "dificil"];
  const typeCycle = ["multipleChoice", "trueFalse", "codeOutput", "findError"];

  function add(question) {
    QUESTION_BANK.push({
      status: "ativo",
      ...question,
      tags: question.tags || [],
    });
  }

  function labelOptions(options) {
    return options.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    }));
  }

  const dpTopics = [
    ["Microsoft Fabric", "capacidades integradas", "Fabric reúne ingestão, engenharia, warehouse, semantic model e consumo analítico em uma experiência SaaS."],
    ["Lakehouse", "arquivos Delta", "Lakehouses em Fabric armazenam dados em OneLake e usam tabelas Delta para consulta e processamento."],
    ["Warehouse", "T-SQL analítico", "Warehouses em Fabric priorizam cargas SQL analíticas e modelagem relacional."],
    ["Semantic Model", "modelo semântico", "Modelos semânticos organizam medidas, relacionamentos, tabelas e segurança para consumo no Power BI."],
    ["Power BI", "relatórios", "Power BI consome modelos semânticos e permite criar relatórios interativos."],
    ["DAX", "medidas", "DAX é usado para medidas e cálculos no modelo semântico."],
    ["SQL", "consulta analítica", "SQL resume, filtra e combina dados em lakehouses e warehouses."],
    ["KQL", "consulta exploratória", "KQL é usado em cenários de logs, eventos e exploração rápida de dados."],
    ["Dataflows Gen2", "Power Query", "Dataflows Gen2 usam Power Query para ingestão e transformação reutilizável."],
    ["Pipelines", "orquestração", "Pipelines orquestram atividades de movimentação e transformação de dados."],
    ["OneLake", "armazenamento unificado", "OneLake é o data lake unificado do Fabric."],
    ["Segurança e governança", "permissões", "Governança envolve acesso, linhagem, endosso, sensibilidade e políticas de dados."],
    ["Performance", "otimização", "Performance melhora com bons modelos, redução de cardinalidade, agregações e filtros eficientes."],
    ["Deployment pipelines", "ciclo de vida", "Deployment pipelines promovem itens entre desenvolvimento, teste e produção."],
    ["Monitoramento", "observabilidade", "Monitorar atualização, uso e falhas ajuda a manter soluções analíticas confiáveis."],
    ["Workspaces", "organização", "Workspaces organizam itens, permissões e colaboração no Fabric."],
    ["Shortcuts", "atalhos", "Shortcuts permitem referenciar dados sem copiá-los fisicamente."],
    ["Direct Lake", "modo de conexão", "Direct Lake consulta dados Delta no OneLake com baixa latência para modelos semânticos."],
    ["Delta Parquet", "formato", "Delta Parquet combina arquivos Parquet com log transacional Delta."],
    ["Medallion Architecture", "bronze silver gold", "A arquitetura medalhão separa camadas bruta, tratada e curada."],
    ["Modelagem dimensional", "fatos e dimensões", "Modelagem dimensional separa fatos mensuráveis e dimensões descritivas."],
    ["Row-level security", "RLS", "RLS restringe linhas visíveis conforme regras e identidade do usuário."],
    ["Measures", "medidas", "Medidas são cálculos DAX avaliados conforme o contexto de filtro."],
    ["Relationships", "relacionamentos", "Relacionamentos definem como tabelas filtram umas às outras."],
    ["Star schema", "esquema estrela", "Esquema estrela simplifica análise usando uma tabela fato ligada a dimensões."],
  ];

  for (let index = 0; index < 60; index += 1) {
    const [disciplina, assunto, conceito] = dpTopics[index % dpTopics.length];
    const tipo = typeCycle[index % typeCycle.length];
    const dificuldade = difficultyCycle[index % difficultyCycle.length];
    const id = `DP600-${String(index + 1).padStart(3, "0")}`;
    const base = {
      id,
      area: "certificacoes",
      trilha: "DP-600",
      disciplina,
      assunto,
      dificuldade,
      fonte: "Microsoft Learn — Study guide for Exam DP-600",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600",
      tags: ["dp-600", "fabric", assunto.toLowerCase().replaceAll(" ", "-")],
    };

    if (tipo === "trueFalse") {
      add({
        ...base,
        tipo,
        enunciado: `${conceito} No contexto do DP-600, essa afirmação está correta.`,
        gabarito: "C",
        comentario: conceito,
      });
    } else if (tipo === "codeOutput") {
      add({
        ...base,
        tipo,
        enunciado: `Em ${disciplina}, escolha o resultado/conceito que melhor completa o cenário.`,
        codigo: disciplina === "DAX"
          ? "Total Vendas = SUM(Vendas[Valor])"
          : disciplina === "SQL"
            ? "SELECT setor, COUNT(*) AS qtd FROM chamados GROUP BY setor;"
            : disciplina === "KQL"
              ? "Eventos | summarize Total=count() by Categoria"
              : "Camada bronze -> limpeza -> camada silver -> métricas -> camada gold",
        alternativas: labelOptions([
          "Agrega ou organiza os dados respeitando o contexto da análise.",
          "Remove a necessidade de modelagem e governança.",
          "Cria senhas automaticamente para todos os usuários.",
          "Impede atualização incremental dos dados.",
        ]),
        gabarito: 0,
        comentario: conceito,
      });
    } else if (tipo === "findError") {
      add({
        ...base,
        tipo,
        enunciado: `Identifique o erro conceitual mais provável em um projeto DP-600 sobre ${assunto}.`,
        codigo: `Cenário: a equipe quer resolver ${assunto} duplicando todos os dados em vários workspaces sem governança.`,
        alternativas: labelOptions([
          "A abordagem aumenta cópias e dificulta governança; deve-se preferir organização, permissões e reutilização adequadas.",
          "Duplicar dados em qualquer workspace é sempre a prática recomendada.",
          "Governança só existe depois da publicação do relatório final.",
          "Modelagem semântica elimina a necessidade de segurança.",
        ]),
        gabarito: 0,
        comentario: "A prova costuma valorizar decisão arquitetural: reduzir cópias, organizar itens e aplicar segurança/governança.",
      });
    } else {
      add({
        ...base,
        tipo,
        enunciado: `Qual alternativa melhor descreve ${assunto} em uma solução Microsoft Fabric cobrada no DP-600?`,
        alternativas: labelOptions([
          conceito,
          "Um recurso exclusivo para envio de e-mails transacionais.",
          "Um mecanismo usado apenas para edição de imagens.",
          "Uma prática sem relação com análise, modelagem ou governança.",
        ]),
        gabarito: 0,
        comentario: conceito,
      });
    }
  }

  const programmingTopics = [
    ["Python", "Listas", "valores = [1, 2, 3]\nprint(valores[-1])", "3", "Índice -1 retorna o último item da lista."],
    ["Python", "Dicionários", "dados = {'setor': 'TI'}\nprint(dados['setor'])", "TI", "Dicionários acessam valores pela chave."],
    ["Python", "Loops", "total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)", "6", "O loop soma os três valores."],
    ["Python", "Exceções", "try:\n    int('x')\nexcept ValueError:\n    print('erro')", "erro", "ValueError é capturada no except."],
    ["SQL", "GROUP BY", "SELECT setor, COUNT(*) FROM chamados;", "Falta GROUP BY setor", "Ao selecionar setor com agregação, é necessário agrupar por setor."],
    ["SQL", "JOIN", "SELECT * FROM pedidos p JOIN clientes c ON p.cliente_id = c.id;", "Combina pedidos com clientes pela chave indicada", "JOIN relaciona linhas conforme a condição ON."],
    ["SQL", "WHERE", "SELECT * FROM vendas WHERE valor > 100;", "Filtra vendas com valor maior que 100", "WHERE aplica filtro antes da agregação."],
    ["Java", "Classes", "class Pessoa { private String nome; }", "Define uma classe com atributo encapsulado", "private restringe acesso direto ao atributo."],
    ["Java", "Exceptions", "try { metodo(); } catch (Exception e) { }", "Trata uma exceção lançada no bloco try", "catch captura exceções compatíveis."],
    ["JavaScript", "Arrays", "const x = [10, 20];\nconsole.log(x.length);", "2", "length retorna a quantidade de itens."],
    ["JavaScript", "Escopo", "let total = 1;\nif (true) { let total = 2; }\nconsole.log(total);", "1", "let tem escopo de bloco."],
    ["HTML", "Semântica", "<label for=\"email\">E-mail</label>\n<input id=\"email\">", "Associa o rótulo ao campo", "label com for melhora acessibilidade e usabilidade."],
    ["CSS", "Flexbox", ".cards { display: flex; gap: 1rem; }", "Organiza itens em eixo flexível", "Flexbox ajuda em alinhamento unidimensional."],
    ["Git/GitHub", "Commits", "git status", "Mostra arquivos modificados e staged", "git status resume o estado do repositório."],
    ["Lógica", "Condicionais", "if idade >= 18:", "Testa se a idade atende uma condição", "Condição decide qual bloco será executado."],
    ["Estruturas de dados", "Fila", "enqueue -> enqueue -> dequeue", "Remove o primeiro item inserido", "Fila segue FIFO."],
  ];

  for (let index = 0; index < 80; index += 1) {
    const [linguagem, assunto, codigo, correta, comentario] = programmingTopics[index % programmingTopics.length];
    const tipo = typeCycle[(index + 1) % typeCycle.length];
    const id = `PROG-${String(index + 1).padStart(3, "0")}`;
    const base = {
      id,
      area: "programacao",
      trilha: linguagem,
      linguagem,
      disciplina: linguagem,
      assunto,
      dificuldade: difficultyCycle[index % difficultyCycle.length],
      codigo,
      fonte: "Questão autoral baseada em fundamentos públicos de programação",
      link: "https://developer.mozilla.org/pt-BR/",
      tags: ["programacao", linguagem.toLowerCase().replaceAll("/", "-"), assunto.toLowerCase().replaceAll(" ", "-")],
    };

    if (tipo === "trueFalse") {
      add({
        ...base,
        tipo,
        enunciado: `Sobre ${linguagem} e ${assunto}, julgue a afirmação: ${comentario}`,
        gabarito: "C",
        comentario,
      });
    } else if (tipo === "findError") {
      add({
        ...base,
        tipo,
        enunciado: `Analise o trecho e escolha a melhor interpretação ou correção.`,
        alternativas: labelOptions([
          correta,
          "O trecho sempre apaga o banco de dados.",
          "O trecho não pode ser analisado sem instalar dependências.",
          "A única correção possível é trocar a linguagem.",
        ]),
        gabarito: 0,
        comentario,
      });
    } else {
      add({
        ...base,
        tipo: tipo === "codeOutput" ? "codeOutput" : "multipleChoice",
        enunciado: tipo === "codeOutput" ? "O que esse código imprime ou faz?" : `Qual alternativa está correta sobre ${assunto}?`,
        alternativas: labelOptions([
          correta,
          "Gera erro obrigatoriamente em qualquer contexto.",
          "Não tem relação com programação.",
          "Executa apenas em sistemas sem internet.",
        ]),
        gabarito: 0,
        comentario,
      });
    }
  }

  const dataTopics = [
    ["Fundamentos de Dados", "Qualidade de dados", "Dados completos, consistentes e válidos reduzem retrabalho e aumentam confiança nas análises."],
    ["Fundamentos de Dados", "Tratamento de nulos", "Nulos devem ser entendidos antes de substituir, remover ou imputar valores."],
    ["Fundamentos de Dados", "Granularidade", "Granularidade define o nível de detalhe de cada linha."],
    ["SQL para Dados", "Agregações", "SUM, COUNT e AVG resumem dados por grupos de análise."],
    ["SQL para Dados", "Window functions", "Funções de janela calculam métricas mantendo o nível de detalhe das linhas."],
    ["Python para Dados", "pandas groupby", "groupby permite agregar valores por categoria."],
    ["Python para Dados", "merge", "merge combina DataFrames por chaves."],
    ["Power BI", "Modelagem estrela", "Modelo estrela melhora legibilidade e desempenho analítico."],
    ["Power BI", "DAX", "Medidas DAX respondem a filtros do relatório."],
    ["Engenharia de Dados", "ETL/ELT", "ETL transforma antes de carregar; ELT carrega antes e transforma no destino."],
    ["Engenharia de Dados", "Medallion", "Bronze, silver e gold separam dados brutos, tratados e prontos para consumo."],
    ["Analytics e Negócio", "SLA", "SLA mede cumprimento de prazo acordado para atendimento ou entrega."],
    ["Analytics e Negócio", "Churn", "Churn mede perda de clientes, contratos ou usuários em um período."],
    ["Desafios práticos", "Escolha de gráfico", "Séries temporais costumam ser melhor analisadas em gráficos de linha."],
    ["Desafios práticos", "JOIN duplicando linhas", "Duplicidade após JOIN geralmente indica relação 1:N não controlada ou chave não única."],
    ["Desafios práticos", "Métrica correta", "Tempo médio de resolução usa diferença entre fechamento e abertura dos chamados finalizados."],
  ];

  for (let index = 0; index < 80; index += 1) {
    const [trilha, assunto, comentario] = dataTopics[index % dataTopics.length];
    const tipo = typeCycle[(index + 2) % typeCycle.length];
    const id = `DADOS-${String(index + 1).padStart(3, "0")}`;
    const code = assunto.includes("groupby")
      ? "df.groupby('setor')['valor'].sum()"
      : assunto.includes("Agregações")
        ? "SELECT setor, COUNT(*) AS qtd FROM chamados GROUP BY setor;"
        : "Tabela chamados: id, abertura, fechamento, setor, status";
    const base = {
      id,
      area: "dados",
      trilha,
      disciplina: trilha,
      assunto,
      dificuldade: difficultyCycle[index % difficultyCycle.length],
      codigo: code,
      fonte: "Questão autoral baseada em práticas públicas de análise e engenharia de dados",
      link: "https://learn.microsoft.com/pt-br/power-bi/",
      tags: ["dados", trilha.toLowerCase().replaceAll(" ", "-"), assunto.toLowerCase().replaceAll(" ", "-")],
    };

    if (tipo === "trueFalse") {
      add({
        ...base,
        tipo,
        enunciado: `${comentario} Julgue a afirmação.`,
        gabarito: "C",
        comentario,
      });
    } else if (tipo === "codeOutput") {
      add({
        ...base,
        tipo,
        enunciado: "O que o trecho ou cenário indica?",
        alternativas: labelOptions([
          comentario,
          "A base deve ser duplicada antes de qualquer análise.",
          "A métrica correta é sempre a soma de IDs.",
          "Não é possível analisar dados tabulares.",
        ]),
        gabarito: 0,
        comentario,
      });
    } else if (tipo === "findError") {
      add({
        ...base,
        tipo,
        enunciado: `Identifique o problema mais provável em ${assunto}.`,
        alternativas: labelOptions([
          comentario,
          "O erro é sempre causado pelo navegador.",
          "A solução é remover todas as dimensões.",
          "Nenhuma métrica deve ter definição de negócio.",
        ]),
        gabarito: 0,
        comentario,
      });
    } else {
      add({
        ...base,
        tipo,
        enunciado: `Em uma análise prática, qual alternativa está mais correta sobre ${assunto}?`,
        alternativas: labelOptions([
          comentario,
          "Toda decisão deve ignorar granularidade.",
          "Dados nulos e duplicados nunca afetam indicadores.",
          "Dashboards substituem validação de dados.",
        ]),
        gabarito: 0,
        comentario,
      });
    }
  }

  const academyTracks = [
    {
      trilha: "Fundamentos de Dados",
      disciplina: "Fundamentos",
      count: 30,
      nivel: "iniciante",
      topics: [
        ["tipos de dados", "Identificar se um campo é categórico, numérico, data ou texto evita análise e visualização inadequadas."],
        ["qualidade de dados", "Qualidade envolve completude, validade, consistência, unicidade, integridade e atualidade."],
        ["dados nulos", "Nulos precisam ser investigados antes de remover linhas ou preencher valores automaticamente."],
        ["duplicidade", "Duplicidade pode inflar contagens, somas e indicadores operacionais."],
        ["outliers", "Outliers podem ser erro de digitação, evento real raro ou sinal de processo fora do padrão."],
        ["granularidade", "Granularidade é o nível de detalhe de cada linha e muda o significado das métricas."],
        ["KPIs", "KPI é indicador ligado a objetivo de negócio e precisa de definição, período e regra de cálculo."],
        ["dado informação insight", "Dado é registro bruto; informação organiza o dado; insight orienta decisão."],
      ],
    },
    {
      trilha: "SQL para Análise",
      disciplina: "SQL",
      count: 30,
      nivel: "iniciante a intermediário",
      topics: [
        ["SELECT", "SELECT escolhe colunas e expressões que serão retornadas pela consulta."],
        ["WHERE", "WHERE filtra linhas antes de agregações e agrupamentos."],
        ["GROUP BY", "GROUP BY é necessário quando uma dimensão aparece junto de funções agregadas."],
        ["HAVING", "HAVING filtra grupos depois do GROUP BY."],
        ["JOIN", "JOIN combina tabelas; duplicidades surgem quando a chave do lado relacionado não é única."],
        ["LEFT JOIN", "LEFT JOIN preserva todas as linhas da tabela da esquerda e traz correspondências da direita."],
        ["CTE", "CTEs organizam consultas complexas e melhoram leitura de etapas intermediárias."],
        ["window functions", "Funções de janela calculam rankings, acumulados e médias sem colapsar linhas."],
      ],
    },
    {
      trilha: "Python/Pandas",
      disciplina: "Python/Pandas",
      count: 30,
      nivel: "iniciante a intermediário",
      topics: [
        ["read_csv", "read_csv carrega arquivos CSV em DataFrames para análise tabular."],
        ["DataFrame", "DataFrame representa dados tabulares com linhas, colunas e índice."],
        ["filtros", "Filtros booleanos selecionam linhas que satisfazem condições."],
        ["loc iloc", "loc usa rótulos; iloc usa posições inteiras."],
        ["groupby", "groupby agrupa dados por categorias para sumarização."],
        ["merge", "merge combina DataFrames por chaves, semelhante a JOIN em SQL."],
        ["drop_duplicates", "drop_duplicates remove duplicidades conforme colunas escolhidas."],
        ["to_datetime", "Conversão de datas permite filtros por período e cálculos de intervalo."],
      ],
    },
    {
      trilha: "Power BI e DAX",
      disciplina: "Power BI/DAX",
      count: 30,
      nivel: "intermediário",
      topics: [
        ["Power Query", "Power Query trata e transforma dados antes de carregar o modelo."],
        ["modelo estrela", "Modelo estrela separa tabela fato e dimensões para análise eficiente."],
        ["relacionamentos", "Relacionamentos controlam propagação de filtros entre tabelas."],
        ["medidas", "Medidas DAX são calculadas no contexto de filtro do relatório."],
        ["CALCULATE", "CALCULATE altera o contexto de filtro de uma expressão DAX."],
        ["SUMX", "SUMX itera linha a linha em uma tabela e soma uma expressão."],
        ["DISTINCTCOUNT", "DISTINCTCOUNT conta valores únicos, útil para clientes, chamados ou máquinas."],
        ["storytelling", "Storytelling escolhe visuais e narrativa para responder a pergunta de negócio."],
      ],
    },
    {
      trilha: "Modelagem de Dados",
      disciplina: "Modelagem",
      count: 25,
      nivel: "intermediário",
      topics: [
        ["tabela fato", "Tabela fato guarda eventos mensuráveis, como vendas, chamados ou ordens de serviço."],
        ["dimensão", "Dimensões descrevem contexto: tempo, cliente, produto, setor e técnico."],
        ["granularidade", "Misturar granularidades na mesma fato pode duplicar medidas e confundir análises."],
        ["relacionamento 1:N", "Relacionamento 1:N é base do modelo estrela para filtros previsíveis."],
        ["N:N", "Relacionamentos muitos-para-muitos exigem cuidado e, muitas vezes, tabela ponte."],
        ["chave substituta", "Chave substituta estabiliza relacionamento quando a chave natural muda."],
        ["normalização", "Normalização reduz redundância em modelos transacionais."],
        ["desnormalização", "Desnormalização pode favorecer leitura analítica quando bem controlada."],
      ],
    },
    {
      trilha: "ETL, ELT e Engenharia de Dados",
      disciplina: "Engenharia de Dados",
      count: 25,
      nivel: "intermediário",
      topics: [
        ["ETL", "ETL extrai, transforma e carrega dados já tratados no destino."],
        ["ELT", "ELT carrega dados no destino e transforma usando o poder da plataforma analítica."],
        ["pipeline", "Pipeline orquestra etapas de ingestão, validação, transformação e carga."],
        ["incremental load", "Carga incremental processa apenas dados novos ou alterados."],
        ["particionamento", "Particionamento melhora manutenção e leitura por período ou chave."],
        ["lakehouse", "Lakehouse combina armazenamento de lake com recursos analíticos próximos ao warehouse."],
        ["bronze silver gold", "Bronze guarda bruto, silver trata e gold serve consumo de negócio."],
        ["monitoramento", "Monitorar logs e falhas evita decisões baseadas em dados atrasados ou incompletos."],
      ],
    },
    {
      trilha: "Microsoft Fabric e DP-600",
      disciplina: "Fabric/DP-600",
      count: 25,
      nivel: "intermediário a avançado",
      topics: [
        ["OneLake", "OneLake centraliza armazenamento no Fabric e reduz cópias desnecessárias."],
        ["Lakehouse", "Lakehouse trabalha com arquivos Delta e análise por Spark/SQL."],
        ["Warehouse", "Warehouse atende cenários relacionais e T-SQL analítico."],
        ["Semantic Model", "Semantic Model organiza medidas, relações e segurança para consumo no Power BI."],
        ["Dataflows Gen2", "Dataflows Gen2 usam Power Query para ingestão e transformação reutilizável."],
        ["Direct Lake", "Direct Lake permite consulta ao Delta no OneLake com baixa latência."],
        ["shortcuts", "Shortcuts referenciam dados sem cópia física."],
        ["deployment pipelines", "Deployment pipelines promovem itens entre dev, teste e produção."],
      ],
    },
    {
      trilha: "Analytics e Negócio",
      disciplina: "Analytics",
      count: 25,
      nivel: "iniciante a intermediário",
      topics: [
        ["SLA", "SLA mede se o atendimento respeitou prazo acordado."],
        ["produtividade", "Produtividade cruza volume, tempo, qualidade e capacidade."],
        ["churn", "Churn mede perda de clientes, contratos ou usuários em um período."],
        ["cohort", "Cohort acompanha grupos com característica comum ao longo do tempo."],
        ["ticket médio", "Ticket médio divide receita por número de pedidos ou clientes."],
        ["funil", "Funil mostra conversão entre etapas de uma jornada."],
        ["estoque", "Análise de estoque cruza giro, cobertura, ruptura e itens críticos."],
        ["pergunta de negócio", "Boa análise começa com pergunta clara, métrica definida e ação possível."],
      ],
    },
  ];

  const academyTypeCycle = [
    "multipleChoice",
    "trueFalse",
    "codeOutput",
    "findError",
    "completeCode",
    "sqlQuery",
    "daxMeasure",
    "caseStudy",
    "explainConcept",
    "chooseBestChart",
    "businessQuestion",
  ];

  function academyCodeFor(track, assunto) {
    if (track.includes("SQL")) return "SELECT setor, COUNT(*) AS total\nFROM chamados;";
    if (track.includes("Python")) return "df.groupby('setor')['tempo_resolucao'].mean()";
    if (track.includes("Power BI")) return "SLA % = DIVIDE([Chamados no Prazo], [Total Chamados])";
    if (track.includes("Fabric")) return "bronze -> silver -> gold -> semantic model -> report";
    if (track.includes("ETL")) return "extrair -> validar -> transformar -> carregar -> monitorar";
    return `Cenário: ${assunto} em uma base de chamados, estoque ou vendas.`;
  }

  let academyIndex = 1;
  for (const spec of academyTracks) {
    for (let index = 0; index < spec.count; index += 1) {
      const [assunto, conceito] = spec.topics[index % spec.topics.length];
      const tipo = academyTypeCycle[index % academyTypeCycle.length];
      const dificuldade = difficultyCycle[(index + spec.trilha.length) % difficultyCycle.length];
      const id = `ACD-${String(academyIndex).padStart(3, "0")}`;
      academyIndex += 1;

      const base = {
        id,
        area: "academia-dados",
        trilha: spec.trilha,
        disciplina: spec.disciplina,
        assunto,
        tipo,
        dificuldade,
        codigo: ["codeOutput", "findError", "completeCode", "sqlQuery", "daxMeasure", "caseStudy"].includes(tipo)
          ? academyCodeFor(spec.trilha, assunto)
          : "",
        fonte: "Questão autoral da Academia de Dados baseada em práticas públicas de análise, BI, engenharia de dados e Microsoft Learn",
        link: spec.trilha.includes("Fabric")
          ? "https://learn.microsoft.com/en-us/fabric/"
          : spec.trilha.includes("Power BI")
            ? "https://learn.microsoft.com/en-us/power-bi/"
            : spec.trilha.includes("Python")
              ? "https://pandas.pydata.org/docs/"
              : spec.trilha.includes("SQL")
                ? "https://www.postgresql.org/docs/"
                : "https://dados.gov.br/",
        tags: ["academia-dados", spec.trilha.toLowerCase().replaceAll(" ", "-"), assunto.toLowerCase().replaceAll(" ", "-")],
      };

      if (tipo === "trueFalse") {
        add({
          ...base,
          enunciado: `${conceito} Julgue a afirmação no contexto de uma vaga júnior em dados.`,
          gabarito: "C",
          comentario: conceito,
        });
      } else if (["completeCode", "sqlQuery", "daxMeasure", "caseStudy", "explainConcept", "businessQuestion"].includes(tipo)) {
        add({
          ...base,
          enunciado: tipo === "sqlQuery"
            ? `Escreva ou explique a consulta necessária para resolver um problema de ${assunto}.`
            : tipo === "daxMeasure"
              ? `Descreva a medida DAX ou a lógica de cálculo adequada para ${assunto}.`
              : tipo === "caseStudy"
                ? `Miniestudo de caso: uma equipe precisa melhorar ${assunto}. Explique diagnóstico, métrica e ação.`
                : tipo === "businessQuestion"
                  ? `Qual pergunta de negócio você faria para transformar ${assunto} em decisão prática?`
                  : `Explique o conceito de ${assunto} com um exemplo prático.`,
          resposta_esperada: `${conceito} Uma boa resposta deve citar contexto, regra de cálculo, risco comum e como validar o resultado antes de publicar.`,
          comentario: `${conceito} Em questão aberta, compare sua resposta com a resposta esperada e marque Acertei, Parcial ou Errei.`,
        });
      } else {
        add({
          ...base,
          enunciado: tipo === "findError"
            ? `Identifique o erro mais provável no cenário sobre ${assunto}.`
            : tipo === "chooseBestChart"
              ? `Qual escolha visual ou analítica é mais adequada para ${assunto}?`
              : `Qual alternativa melhor resolve um cenário prático sobre ${assunto}?`,
          alternativas: labelOptions([
            conceito,
            "Ignorar a definição da métrica e publicar o gráfico mais bonito.",
            "Duplicar a base antes de validar chaves, nulos e granularidade.",
            "Usar apenas opinião pessoal, sem regra de cálculo ou validação.",
          ]),
          gabarito: 0,
          comentario: conceito,
        });
      }
    }
  }

  window.QUESTION_BANK = QUESTION_BANK;
})();
