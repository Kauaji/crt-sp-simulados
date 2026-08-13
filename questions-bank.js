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

  window.QUESTION_BANK = QUESTION_BANK;
})();
