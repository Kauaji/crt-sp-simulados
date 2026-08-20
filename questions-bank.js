"use strict";

(function bootstrapQuestionBank() {
  const QUESTION_BANK = [];
  // A dificuldade acompanha a operação cognitiva de cada variante: reconhecer,
  // aplicar/interpretar e, por fim, diagnosticar/corrigir uma decisão.
  const variantDifficulty = ["facil", "medio", "medio", "dificil", "medio", "dificil"];
  const numericAnswerCounters = new Map();
  const answerPermutationCache = new Map();

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

  function answerPermutation(length, scope, block) {
    const key = `${length}::${scope}::${block}`;
    if (answerPermutationCache.has(key)) return answerPermutationCache.get(key);
    const permutation = stablePermutation(length, key);
    if (block > 0) {
      const previous = answerPermutation(length, scope, block - 1);
      if (permutation.every((value, index) => value === previous[index])) {
        [permutation[0], permutation[1]] = [permutation[1], permutation[0]];
      }
    }
    answerPermutationCache.set(key, permutation);
    return permutation;
  }

  function slug(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function labelOptions(options) {
    return options.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    }));
  }

  function completeComment(text) {
    const clean = String(text || "").trim();
    if (clean.length >= 45) return clean;
    return `${clean} A justificativa depende do comportamento descrito no enunciado e da documentação indicada.`;
  }

  function rotateCorrectOption(question) {
    if (!Number.isInteger(question.gabarito) || !Array.isArray(question.alternativas)) return question;

    const scope = `${question.area}::${question.trilha}`;
    const count = numericAnswerCounters.get(scope) || 0;
    const block = Math.floor(count / question.alternativas.length);
    const position = count % question.alternativas.length;
    const target = answerPermutation(question.alternativas.length, scope, block)[position];
    numericAnswerCounters.set(scope, count + 1);

    const correct = question.alternativas[question.gabarito];
    const distractors = question.alternativas.filter((_, index) => index !== question.gabarito);
    const reordered = [];
    let distractorIndex = 0;
    for (let index = 0; index < question.alternativas.length; index += 1) {
      reordered.push(index === target ? correct : distractors[distractorIndex++]);
    }

    return {
      ...question,
      alternativas: reordered.map((option, index) => ({
        ...option,
        label: String.fromCharCode(65 + index),
      })),
      gabarito: target,
    };
  }

  function add(question) {
    const normalized = rotateCorrectOption({
      status: "ativo",
      ...question,
      comentario: completeComment(question.comentario),
      tags: question.tags || [],
    });
    QUESTION_BANK.push(normalized);
  }

  function addChoice(base, tipo, enunciado, codigo, correta, incorretas, comentario) {
    const options = [correta, ...incorretas];
    add({
      ...base,
      tipo,
      enunciado,
      codigo: codigo || "",
      alternativas: labelOptions(options),
      gabarito: 0,
      comentario,
    });
  }

  function relatedConcepts(topics, currentIndex) {
    const result = [];
    for (let offset = 1; result.length < 3; offset += 1) {
      const concept = topics[(currentIndex + offset) % topics.length].conceito;
      if (!result.includes(concept) && concept !== topics[currentIndex].conceito) result.push(concept);
    }
    return result;
  }

  function relatedValues(topics, currentIndex, field) {
    const result = [];
    for (let offset = 1; result.length < 3; offset += 1) {
      const value = topics[(currentIndex + offset) % topics.length][field];
      if (!result.includes(value) && value !== topics[currentIndex][field]) result.push(value);
    }
    return result;
  }

  function lowerInitial(value) {
    const text = String(value || "").trim();
    // Depois de dois-pontos, manter a grafia original evita corromper siglas,
    // nomes de produtos e identificadores de código (RLS, Power Query, DimData).
    return text;
  }

  function scopedOptions(assunto, values, lead) {
    return values.map((value) => `${lead} ${assunto}: ${lowerInitial(value)}`);
  }

  // Mantém a proposição falsa, mas retira absolutos que funcionavam como uma
  // pista de gabarito. As trocas preservam o erro técnico central da frase.
  function naturalFalseStatement(statement) {
    return String(statement)
      .replace(/automaticamente qualquer/gi, "por padrão uma")
      .replace(/\bsempre que\b/gi, "quando")
      .replace(/\bsempre\b/gi, "em geral")
      .replace(/\bnunca\b/gi, "não")
      .replace(/\bapenas\b/gi, "principalmente")
      .replace(/\bsomente\b/gi, "principalmente")
      .replace(/\bdispensam\b/gi, "prescindem de")
      .replace(/\bdispensa\b/gi, "prescinde de")
      .replace(/\bautomaticamente\b/gi, "por padrão")
      .replace(/\bobrigatoriamente\b/gi, "por padrão")
      .replace(/\bexclusivamente\b/gi, "diretamente")
      .replace(/\bTodo valor nulo\b/gi, "Valor nulo")
      .replace(/\bTodo outlier\b/gi, "Outlier")
      .replace(/\bTodo fluxo\b/gi, "O fluxo")
      .replace(/\bTodo git commit\b/gi, "git commit")
      .replace(/\bTodos precisam\b/gi, "A equipe precisa")
      .replace(/\bTodas as linhas\b/gi, "as linhas")
      .replace(/\btodos os\b/gi, "os")
      .replace(/\btodas as\b/gi, "as")
      .replace(/\btodo o\b/gi, "o")
      .replace(/\btoda a\b/gi, "a")
      .replace(/\bsem necessidade de\b/gi, "sem exigir")
      .replace(/\bem os\b/gi, "nos")
      .replace(/\bem as\b/gi, "nas")
      .replace(/\bde os\b/gi, "dos")
      .replace(/\bde as\b/gi, "das")
      .replace(/\bpor os\b/gi, "pelos")
      .replace(/\bpor as\b/gi, "pelas")
      .replace(/\s+/g, " ")
      .trim();
  }

  const truthOrientationPlans = new Map();

  function hasShortCycle(values) {
    const limit = Math.min(8, Math.floor(values.length / 2));
    for (let period = 1; period <= limit; period += 1) {
      if (values.every((value, index) => value === values[index % period])) return true;
    }
    return false;
  }

  function truthOrientationPlan(scope, topicCount) {
    const cacheKey = `${scope}::${topicCount}`;
    if (truthOrientationPlans.has(cacheKey)) return truthOrientationPlans.get(cacheKey);

    const candidates = [];
    const targetTrueFirst = Math.floor(topicCount / 2);
    for (let mask = 0; mask < 2 ** topicCount; mask += 1) {
      const orientations = Array.from({ length: topicCount }, (_, index) => Boolean(mask & (1 << index)));
      if (orientations.filter(Boolean).length !== targetTrueFirst) continue;
      const answers = orientations.flatMap((trueFirst) => (trueFirst ? ["C", "E"] : ["E", "C"]));
      if (!hasShortCycle(answers)) candidates.push(orientations);
    }

    const plan = candidates[stableHash(`${scope}::truth-order`) % candidates.length];
    truthOrientationPlans.set(cacheKey, plan);
    return plan;
  }

  function balancedTruthPair(scope, topicIndex, topicCount, trueStatement, falseStatement, trueComment, falseComment) {
    const trueFirst = truthOrientationPlan(scope, topicCount)[topicIndex];
    const truth = { statement: trueStatement, answer: "C", comment: trueComment };
    const falsehood = { statement: falseStatement, answer: "E", comment: falseComment };
    return trueFirst ? [truth, falsehood] : [falsehood, truth];
  }

  function certificationTopic(disciplina, assunto, conceito, falsa, cenario, artefato) {
    return { disciplina, assunto, conceito, falsa, cenario, artefato };
  }

  const certificationSets = [
    {
      code: "DP-600",
      name: "Microsoft Fabric Analytics Engineer Associate",
      source: "Microsoft Learn — guia oficial do exame DP-600",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600",
      topics: [
        certificationTopic("Microsoft Fabric", "cargas de trabalho integradas", "O Fabric reúne ingestão, engenharia, warehouse, ciência de dados, tempo real e BI em uma experiência SaaS integrada.", "Cada carga de trabalho do Fabric exige uma conta de armazenamento externa e isolada.", "A empresa quer reduzir integrações manuais entre engenharia e consumo analítico.", "Data Factory -> Lakehouse -> Semantic model -> Power BI"),
        certificationTopic("OneLake", "armazenamento unificado", "O OneLake oferece uma camada lógica de armazenamento para os dados dos workspaces da organização no Fabric.", "O OneLake cria um data lake físico sem compartilhamento para cada item publicado.", "Duas equipes precisam reutilizar os mesmos dados sem manter cópias divergentes.", "Workspace A --shortcut--> dados no Workspace B"),
        certificationTopic("Lakehouse", "tabelas Delta", "Um lakehouse combina arquivos e tabelas Delta com acesso por mecanismos como Spark e endpoint SQL.", "Tabelas Delta não registram transações e só podem ser consultadas por notebooks.", "A equipe precisa processar arquivos e também consultar tabelas com SQL.", "Files/ + Tables/Delta + SQL analytics endpoint"),
        certificationTopic("Warehouse", "modelagem relacional analítica", "O Warehouse do Fabric atende cargas relacionais analíticas com T-SQL, tabelas e modelos dimensionais.", "O Warehouse é indicado apenas para arquivos e não oferece consultas T-SQL.", "Analistas precisam de um esquema estrela governado e consultas SQL previsíveis.", "SELECT d.Regiao, SUM(f.Valor) FROM Fato f JOIN Dim d ..."),
        certificationTopic("Arquitetura medalhão", "camadas bronze, silver e gold", "A arquitetura medalhão separa dados brutos, dados validados e dados preparados para consumo de negócio.", "A camada bronze deve conter apenas indicadores finais já agregados.", "A origem envia arquivos variáveis e o relatório exige dados certificados.", "bronze/raw -> silver/validated -> gold/business"),
        certificationTopic("Modelo semântico", "esquema estrela", "Um modelo semântico eficiente separa fatos e dimensões, define relacionamentos e centraliza medidas reutilizáveis.", "Duplicar dimensões em cada visual é a forma recomendada de criar um modelo semântico.", "Vários relatórios precisam compartilhar métricas e regras de filtro.", "DimData 1 -> * FatoVendas * <- 1 DimProduto"),
        certificationTopic("Direct Lake", "modo de armazenamento", "O Direct Lake permite consultar tabelas Delta no OneLake sem uma importação tradicional completa.", "O Direct Lake exige exportar todas as tabelas Delta para CSV antes de cada consulta.", "O modelo precisa de baixa latência sobre dados do lakehouse com menos cópias.", "Semantic model --Direct Lake--> Delta tables"),
        certificationTopic("DAX", "contexto de filtro", "Medidas DAX são avaliadas no contexto de filtro, e CALCULATE pode modificar esse contexto.", "Uma medida DAX retorna sempre o mesmo valor, independentemente dos filtros do relatório.", "O total deve mudar quando o usuário seleciona ano, região ou produto.", "Vendas Ano = CALCULATE([Vendas], DimData[Ano] = 2026)"),
        certificationTopic("Segurança", "RLS e OLS", "RLS restringe linhas e OLS pode ocultar objetos do modelo; ambas devem ser testadas com as identidades previstas.", "RLS protege automaticamente todos os metadados e torna OLS desnecessária.", "Gerentes regionais devem ver suas linhas sem acessar uma coluna sensível.", "RLS: Permissões[Email] = USERPRINCIPALNAME() e relacionamento filtra a região | OLS: ocultar Margem"),
        certificationTopic("Ciclo de vida", "deployment pipelines e monitoramento", "Pipelines de implantação promovem conteúdo entre estágios, enquanto monitoramento revela falhas e gargalos operacionais.", "A implantação também concede o acesso de leitura necessário e valida as dependências por conta própria.", "A equipe precisa promover alterações e acompanhar atualizações atrasadas.", "Development -> Test -> Production | Run status and duration"),
      ],
    },
    {
      code: "PL-300",
      name: "Microsoft Power BI Data Analyst",
      source: "Microsoft Learn — guia oficial do exame PL-300",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300",
      topics: [
        certificationTopic("Power Query", "perfil de colunas", "O perfil de colunas ajuda a localizar erros, nulos, valores distintos e distribuições antes da modelagem.", "O perfil de colunas avalia apenas a cor escolhida para cada visual.", "Uma coluna de data contém texto, nulos e valores fora do intervalo.", "Valid 92% | Error 3% | Empty 5%"),
        certificationTopic("Power Query", "tipos e transformações", "Tipos devem ser definidos antes de operações dependentes de número, data ou texto e registrados em etapas reproduzíveis.", "Alterar o tipo somente no visual corrige a origem e todas as consultas.", "Valores monetários chegaram como texto com separadores locais.", "Source -> Change Type with Locale -> Replace Errors"),
        certificationTopic("Modelagem", "esquema estrela", "O esquema estrela usa dimensões para filtrar uma tabela fato em uma granularidade bem definida.", "Relacionar fatos diretamente entre si é sempre mais previsível que usar dimensões.", "Vendas e metas precisam ser analisadas por data, produto e região.", "DimData 1:* FatoVendas; DimProduto 1:* FatoVendas"),
        certificationTopic("Modelagem", "relacionamentos", "Cardinalidade, direção de filtro e integridade das chaves determinam como filtros se propagam.", "Ao ativar filtro bidirecional, a revisão de chaves e caminhos de propagação deixa de ser necessária.", "Um filtro de produto não alcança a medida de vendas como esperado.", "DimProduto[Id] 1 -> * FatoVendas[ProdutoId]"),
        certificationTopic("DAX", "CALCULATE", "CALCULATE avalia uma expressão em um contexto de filtro modificado.", "CALCULATE modifica fisicamente os valores armazenados na origem.", "O relatório precisa comparar vendas totais com vendas de uma categoria.", "Vendas Bikes = CALCULATE([Vendas], Produto[Categoria] = \"Bikes\")"),
        certificationTopic("DAX", "inteligência temporal", "Cálculos temporais confiáveis dependem de uma tabela de datas contínua, marcada e relacionada.", "Funções temporais dispensam uma coluna de data válida e relacionamentos ativos.", "A área quer comparar o acumulado do ano com o período anterior.", "Vendas YTD = TOTALYTD([Vendas], DimData[Data])"),
        certificationTopic("Visualização", "escolha do visual", "O visual deve corresponder à pergunta: linha para tendência, barras para comparação e cartões para indicadores pontuais.", "Gráficos de pizza são sempre a melhor opção para séries temporais longas.", "A diretoria quer ver evolução mensal e desvios de meta.", "Eixo X: Mês | Valor: Receita | Linha de meta"),
        certificationTopic("Acessibilidade", "contraste e navegação", "Contraste, ordem de tabulação, títulos claros e texto alternativo tornam relatórios mais acessíveis.", "Acessibilidade se limita a aumentar o tamanho da página no modo de edição.", "Usuários de teclado e leitor de tela precisam navegar pelo relatório.", "Tab order: filtro -> KPI -> gráfico -> tabela"),
        certificationTopic("Segurança", "RLS dinâmica", "RLS dinâmica pode usar a identidade e uma tabela de autorização para filtrar dados por responsabilidade.", "RLS dinâmica deve codificar cada usuário dentro de todas as medidas.", "Cada gerente deve acessar apenas as regiões atribuídas a seu e-mail.", "Permissões[Email] = USERPRINCIPALNAME()"),
        certificationTopic("Serviço do Power BI", "workspaces e atualização", "Workspaces, gateways, credenciais e agendas devem ser configurados conforme fontes e responsabilidades.", "Depois da publicação, uma fonte local passa a atualizar sem gateway configurado.", "Um modelo usa SQL Server local e precisa atualizar diariamente.", "Gateway -> credentials -> scheduled refresh"),
      ],
    },
    {
      code: "AZ-900",
      name: "Microsoft Azure Fundamentals",
      source: "Microsoft Learn — guia oficial do exame AZ-900",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
      topics: [
        certificationTopic("Conceitos de nuvem", "IaaS, PaaS e SaaS", "IaaS, PaaS e SaaS distribuem de forma diferente a responsabilidade por infraestrutura, runtime, aplicação e dados.", "Em SaaS, o cliente administra o sistema operacional físico do provedor.", "A equipe compara VMs, uma plataforma gerenciada e software pronto.", "IaaS | PaaS | SaaS -> shared responsibility"),
        certificationTopic("Economia de nuvem", "CapEx e OpEx", "Nuvem pode trocar parte do investimento inicial por consumo operacional mensurado e escalável.", "OpEx significa comprar antecipadamente toda a capacidade física para cinco anos.", "Uma empresa sazonal quer pagar por capacidade adicional apenas em campanhas.", "usage x unit price = operational cost"),
        certificationTopic("Infraestrutura global", "regiões e zonas", "Regiões agrupam datacenters, e zonas de disponibilidade oferecem isolamento físico dentro de regiões compatíveis.", "Zonas são cópias lógicas no mesmo rack e não oferecem isolamento físico.", "A aplicação exige resiliência contra falha de um datacenter.", "Region A: Zone 1 + Zone 2 + Zone 3"),
        certificationTopic("Computação", "VMs e serviços gerenciados", "VMs oferecem maior controle do sistema operacional; serviços gerenciados reduzem tarefas da plataforma.", "Uma VM transfere ao provedor todos os patches do sistema convidado.", "O time compara controle do SO com menor carga operacional.", "VM scale set | App Service | Functions"),
        certificationTopic("Armazenamento", "redundância", "A redundância deve considerar durabilidade, escopo da réplica, recuperação e residência dos dados.", "LRS replica dados em diversas regiões geográficas por padrão.", "O negócio definiu RTO, RPO e tolerância à perda regional.", "LRS | ZRS | GRS | GZRS"),
        certificationTopic("Rede", "VNet", "VNets isolam redes lógicas e permitem sub-redes, regras de tráfego e conectividade privada ou híbrida.", "Criar uma VNet publica automaticamente todas as VMs na internet.", "Aplicação e banco devem se comunicar por endereços privados.", "VNet 10.0.0.0/16 -> app subnet -> data subnet"),
        certificationTopic("Identidade", "Entra ID e RBAC", "Microsoft Entra ID autentica identidades, enquanto Azure RBAC autoriza ações em escopos definidos.", "RBAC substitui autenticação e cria senhas sem uma identidade.", "Um grupo precisa ler um resource group sem alterar recursos.", "Group -> Reader -> Resource group"),
        certificationTopic("Segurança", "defesa em profundidade", "Defesa em profundidade combina controles de identidade, perímetro, rede, computação, aplicação e dados.", "Ao implantar um firewall, controles adicionais de identidade e de dados deixam de ser necessários.", "A arquitetura precisa reduzir o impacto se uma camada for contornada.", "Identity + Network + Compute + Application + Data"),
        certificationTopic("Governança", "Policy e locks", "Azure Policy avalia ou impõe conformidade; locks ajudam a impedir exclusão ou alteração acidental.", "Um lock corrige automaticamente qualquer configuração não conforme.", "A organização exige tags e quer proteger um recurso contra exclusão.", "Policy: require tag | Lock: CanNotDelete"),
        certificationTopic("Custos", "calculadora, budgets e SLA", "Calculadoras estimam custos, budgets alertam sobre consumo e SLAs descrevem compromissos de disponibilidade.", "Um budget interrompe obrigatoriamente todos os recursos ao atingir o limite.", "Finanças quer estimar e receber alertas antes de exceder a meta.", "Estimate -> Cost analysis -> Budget alert"),
      ],
    },
    {
      code: "PL-900",
      name: "Microsoft Power Platform Fundamentals",
      source: "Microsoft Learn — guia oficial do exame PL-900",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900",
      topics: [
        certificationTopic("Power Platform", "valor de negócio", "Power Platform combina aplicativos, automação, análise, páginas e agentes para digitalizar processos com governança.", "Power Platform serve apenas para criar apresentações sem conexão com dados.", "A empresa quer substituir planilhas por um processo rastreável.", "Dataverse -> Power Apps -> Power Automate -> Power BI"),
        certificationTopic("Power Apps", "canvas apps", "Canvas apps priorizam composição visual e controle da interface conectada a diferentes fontes.", "Canvas apps exigem interface gerada exclusivamente por uma tabela do Dataverse.", "A equipe precisa de experiência móvel com layout específico.", "Screen -> Gallery -> EditForm -> Connector"),
        certificationTopic("Power Apps", "model-driven apps", "Model-driven apps partem do modelo do Dataverse e geram experiências orientadas a processos e registros.", "Model-driven apps não usam tabelas, relações, formulários ou views.", "O atendimento gerencia casos relacionados em processo consistente.", "Dataverse tables -> forms/views -> model-driven app"),
        certificationTopic("Power Automate", "fluxos", "Fluxos automatizados executam ações após gatilhos e podem aplicar condições, aprovações e conectores.", "Todo fluxo precisa ser iniciado manualmente e não admite eventos.", "Uma aprovação começa quando um novo pedido é criado.", "When item is created -> approval -> update status"),
        certificationTopic("Power BI", "análise", "Power BI conecta, transforma, modela e apresenta dados para apoiar decisões.", "Power BI substitui o sistema transacional e edita cada registro operacional.", "Gestores acompanham prazo, volume e qualidade do processo.", "Source -> semantic model -> report -> dashboard"),
        certificationTopic("Dataverse", "tabelas e segurança", "Dataverse oferece tabelas, relações, regras, APIs e segurança baseada em funções.", "Dataverse armazena apenas arquivos e não permite relações entre tabelas.", "Apps diferentes compartilham clientes, solicitações e permissões.", "Account 1:* Request | Security role: Agent"),
        certificationTopic("Conectores", "integração", "Conectores expõem ações e gatilhos respeitando autenticação e políticas.", "Um conector ignora credenciais e concede acesso irrestrito às fontes.", "O fluxo lê um formulário e registra dados em outro serviço.", "Trigger connector -> transformation -> action connector"),
        certificationTopic("Copilot Studio", "agentes", "Copilot Studio permite criar e governar agentes conectados a conhecimentos, ações e canais.", "Um agente dispensa testar fontes, respostas e permissões antes da publicação.", "Atendimento quer responder dúvidas e abrir solicitações controladas.", "Topic -> answers -> action -> escalation"),
        certificationTopic("AI Builder", "modelos de IA", "AI Builder oferece recursos de IA integráveis a apps e fluxos, como processamento de documentos.", "AI Builder só funciona fora da Power Platform com código nativo obrigatório.", "Notas fiscais precisam ter campos extraídos para aprovação.", "Document processing -> fields -> approval"),
        certificationTopic("Governança", "ambientes e DLP", "Ambientes separam recursos e políticas DLP controlam combinações de conectores.", "Políticas DLP definem a aparência do app e não afetam conectores.", "TI quer impedir dados corporativos em um serviço pessoal.", "Business | Non-business | Blocked connectors"),
      ],
    },
    {
      code: "DP-900",
      name: "Microsoft Azure Data Fundamentals",
      source: "Microsoft Learn — guia oficial do exame DP-900",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
      topics: [
        certificationTopic("Dados relacionais", "tabelas e chaves", "Bancos relacionais estruturam entidades em tabelas e usam chaves para relações e integridade.", "Em uma tabela filha, a chave estrangeira ocupa o lado único do relacionamento.", "Pedidos referenciam clientes sem repetir todos os dados do cliente.", "Cliente(Id PK) 1 -> * Pedido(ClienteId FK)"),
        certificationTopic("SQL", "DDL e DML", "DDL define estruturas; DML consulta ou altera os dados armazenados.", "SELECT é DDL porque cria a estrutura física de uma tabela.", "A equipe cria uma tabela e depois insere e consulta registros.", "CREATE TABLE; INSERT; SELECT"),
        certificationTopic("Serviços relacionais", "Azure SQL", "Azure SQL oferece opções gerenciadas para cargas relacionais e reduz tarefas de infraestrutura.", "Azure SQL Database exige administrar o hardware físico do datacenter.", "Uma aplicação precisa de SQL gerenciado com backups do serviço.", "Application -> Azure SQL Database"),
        certificationTopic("Dados não relacionais", "documentos e chave-valor", "Modelos não relacionais atendem estruturas flexíveis e padrões como documento, chave-valor, grafo e coluna larga.", "Bancos de documentos exigem propriedades idênticas em todos os registros.", "Um catálogo recebe atributos diferentes por categoria.", "{ id, category, attributes: { ... } }"),
        certificationTopic("Cosmos DB", "particionamento", "Uma boa chave de partição distribui armazenamento e requisições e atende consultas frequentes.", "Uma chave com o mesmo valor em todos os documentos maximiza distribuição.", "A coleção cresce e recebe consultas por cliente.", "partition key: /customerId"),
        certificationTopic("Armazenamento", "Blob e data lake", "Object storage guarda grandes volumes não estruturados, e data lakes organizam dados para análise.", "Blob Storage é um banco relacional que exige esquema estrela na gravação.", "Logs, imagens e dados brutos precisam ser armazenados.", "container/raw/year=2026/month=08"),
        certificationTopic("Processamento", "batch e streaming", "Batch processa conjuntos em intervalos; streaming trata eventos continuamente ou com baixa latência.", "Streaming só produz resultado após carregar todos os eventos do ano.", "Sensores geram alertas em minutos e histórico diário.", "events -> stream -> alert | daily batch"),
        certificationTopic("Analytics", "data warehouse", "Um data warehouse integra dados históricos estruturados para consultas analíticas.", "Warehouses são otimizados principalmente para transações unitárias operacionais.", "Diretoria analisa anos de vendas por produto e região.", "Dimensions -> FactSales -> aggregates"),
        certificationTopic("Power BI", "modelo e visualização", "Power BI usa consultas, modelos semânticos e visuais para análises interativas.", "Um visual corrige automaticamente chaves e regras de negócio incorretas.", "Analistas publicam indicadores filtráveis.", "Power Query -> model -> measures -> visuals"),
        certificationTopic("Funções de dados", "responsabilidades", "DBAs, engenheiros e analistas têm responsabilidades diferentes e colaboram no ciclo de dados.", "O analista sempre instala e troca discos físicos do banco gerenciado.", "O projeto separa ingestão, administração e análise.", "Engineer | DBA | Analyst"),
      ],
    },
    {
      code: "DP-700",
      name: "Microsoft Fabric Data Engineer Associate",
      source: "Microsoft Learn — certificação oficial Fabric Data Engineer Associate",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/",
      topics: [
        certificationTopic("Ingestão", "pipelines", "Pipelines coordenam cópia, transformação, dependências, parâmetros e tratamento de falhas.", "Uma pipeline concluída dispensa validar quantidade e qualidade das linhas.", "Fontes diárias precisam de retentativa e alerta.", "Copy -> validation -> notebook -> notification"),
        certificationTopic("Transformação", "Dataflows Gen2", "Dataflows Gen2 usam Power Query para transformações reutilizáveis e destinos no Fabric.", "Dataflows Gen2 servem apenas para desenhar relatórios e não gravam destinos.", "Analistas reutilizam uma limpeza sem código Spark.", "Source -> Power Query -> Lakehouse"),
        certificationTopic("Spark", "notebooks", "Notebooks Spark processam dados distribuídos e leem ou gravam tabelas Delta.", "Um notebook Spark executa tudo em uma única linha sem paralelismo.", "Arquivos volumosos precisam de transformação distribuída.", "spark.read.format('delta').load(path)"),
        certificationTopic("Delta Lake", "transações", "Tabelas Delta combinam Parquet com log transacional e manutenção controlada.", "Excluir Parquet manualmente mantém o log Delta consistente.", "Uma tabela recebe atualizações e precisa de leituras consistentes.", "Delta log + Parquet + maintenance"),
        certificationTopic("Arquitetura", "medalhão", "Bronze, silver e gold separam origem, validação e produtos de dados.", "Gold deve repetir integralmente arquivos corrompidos da origem.", "O pipeline precisa permitir reprocessamento rastreável.", "bronze -> silver -> gold"),
        certificationTopic("Warehouse", "cargas T-SQL", "Warehouses atendem modelagem relacional analítica e consultas T-SQL.", "O Warehouse incorpora a orquestração necessária para ingerir fontes sem configurar conexões.", "Consumidores precisam de fatos e dimensões previsíveis.", "COPY/CTAS -> dimensions -> facts"),
        certificationTopic("OneLake", "shortcuts", "Shortcuts referenciam dados compatíveis sem duplicá-los fisicamente no destino.", "Criar shortcut sempre move e apaga os dados na origem.", "Uma equipe consulta dados mantidos por outro domínio.", "Lakehouse --shortcut--> source"),
        certificationTopic("Segurança", "menor privilégio", "Acesso deve seguir menor privilégio em workspace, item, mecanismo de consulta e dados.", "Todos precisam de administrador para executar consultas SQL.", "Engenheiros gravam e analistas apenas consultam produtos.", "Contributor | Viewer + SQL permissions"),
        certificationTopic("Otimização", "partições e arquivos", "Particionamento e compactação devem considerar leitura, volume e tamanho dos arquivos.", "Criar uma partição por linha sempre melhora consultas.", "Milhões de arquivos pequenos degradam leitura Delta.", "partition by date + compact files"),
        certificationTopic("Operação", "monitoramento e CI/CD", "Monitoramento, parâmetros, versão e implantação tornam pipelines reproduzíveis.", "Copiar notebooks manualmente equivale a versionar e testar mudanças.", "A equipe quer promoção rastreável e rollback.", "Git -> test -> deploy -> monitor"),
      ],
    },
  ];

  // Alguns cenários vizinhos do mesmo exame podem parecer aplicáveis quando a
  // pergunta é genérica. Estas alternativas delimitam o requisito avaliado e
  // mantêm apenas uma resposta defensável nos dois casos identificados.
  const certificationScenarioOverrides = {
    "AZ-900::IaaS, PaaS e SaaS": {
      architecturePrompt: "O esquema resume a divisão de responsabilidades entre cliente e provedor. Qual análise ele permite realizar?",
      architectureOptions: [
        "Comparar, em IaaS, PaaS e SaaS, quais camadas ficam sob gestão do cliente e quais ficam sob gestão do provedor.",
        "Escolher uma região e suas zonas de disponibilidade exclusivamente pela latência entre datacenters.",
        "Definir se uma conta de armazenamento deve usar LRS, ZRS, GRS ou GZRS para replicar os dados.",
        "Estimar o custo mensal dos recursos a partir do consumo previsto e configurar alertas de orçamento.",
      ],
      correctionOptions: [
        "Distinguir, para cada modelo de serviço, as camadas administradas pelo cliente das camadas administradas pelo provedor.",
        "Determinar o número de zonas necessário para tolerar a falha física de um datacenter.",
        "Selecionar o tipo de redundância da conta de armazenamento conforme o escopo geográfico das réplicas.",
        "Configurar um budget para emitir alertas quando o consumo se aproximar do limite financeiro definido.",
      ],
    },
    "DP-600::esquema estrela": {
      architecturePrompt: "O diagrama representa um esquema estrela. Qual necessidade de modelagem ele atende diretamente?",
      architectureOptions: [
        "Organizar fatos e dimensões com relacionamentos um-para-muitos para que filtros e medidas sejam reutilizados de forma consistente.",
        "Consultar tabelas Delta no OneLake pelo modo Direct Lake, sem realizar uma importação tradicional completa.",
        "Restringir linhas por identidade e ocultar objetos sensíveis do modelo com RLS e OLS.",
        "Promover itens entre desenvolvimento, teste e produção por meio de uma pipeline de implantação.",
      ],
      correctionOptions: [
        "Definir o grão da fato, separar dimensões compartilhadas e validar os relacionamentos usados pelos filtros e pelas medidas.",
        "Trocar o modo de armazenamento por Direct Lake para consultar tabelas Delta sem importação completa.",
        "Criar funções de RLS e OLS para restringir linhas e ocultar objetos conforme a identidade do usuário.",
        "Usar uma pipeline de implantação para promover o conteúdo entre os ambientes de desenvolvimento, teste e produção.",
      ],
    },
  };

  function generateCertificationBank() {
    certificationSets.forEach((cert) => {
      cert.topics.forEach((topic, topicIndex) => {
        const scenarioOverride = certificationScenarioOverrides[`${cert.code}::${topic.assunto}`];
        const conceptOptions = scopedOptions(topic.assunto, [topic.conceito, ...relatedConcepts(cert.topics, topicIndex)], "Sobre");
        const scenarioOptions = scopedOptions(topic.assunto, [topic.cenario, ...relatedValues(cert.topics, topicIndex, "cenario")], "Necessidade associada a");
        const artifactOptions = scopedOptions(topic.assunto, [topic.artefato, ...relatedValues(cert.topics, topicIndex, "artefato")], "Desenho aplicável a");
        const falseStatement = naturalFalseStatement(topic.falsa);
        const truthItems = balancedTruthPair(
          `certificacoes::${cert.code}`,
          topicIndex,
          cert.topics.length,
          topic.conceito,
          falseStatement,
          `${topic.conceito} A afirmação respeita o papel e os limites do recurso descrito.`,
          `${topic.conceito} A afirmação apresentada troca ou ignora uma condição importante do recurso.`,
        );
        for (let variant = 0; variant < 6; variant += 1) {
          const sequence = topicIndex * 6 + variant;
          const base = {
            id: `${cert.code.replace("-", "")}-${String(sequence + 1).padStart(3, "0")}`,
            area: "certificacoes",
            trilha: cert.code,
            disciplina: topic.disciplina,
            assunto: topic.assunto,
            dificuldade: variantDifficulty[variant],
            fonte: cert.source,
            link: cert.link,
            tags: ["certificacao", cert.code.toLowerCase(), slug(topic.assunto)],
          };
          const explanation = (lead) => `${lead}: ${topic.conceito} No cenário apresentado, essa distinção é decisiva para selecionar e operar o recurso corretamente.`;

          if (variant === 0) {
            addChoice(base, "multipleChoice", `Na preparação para ${cert.code}, qual opção define ${topic.assunto} sem confundi-lo com recursos próximos?`, "", conceptOptions[0], conceptOptions.slice(1), explanation("Conceito central"));
          } else if (variant === 1) {
            add({ ...base, tipo: "trueFalse", enunciado: `No contexto de ${cert.name}, julgue: ${truthItems[0].statement}`, gabarito: truthItems[0].answer, comentario: truthItems[0].comment });
          } else if (variant === 2) {
            const architecturePrompt = scenarioOverride?.architecturePrompt || (cert.code === "DP-600" && topic.assunto === "cargas de trabalho integradas"
              ? "Considere a cadeia completa, e não um componente isolado. Qual necessidade de negócio ela atende?"
              : `Qual necessidade é atendida pelo artefato completo no contexto de ${topic.assunto}?`);
            const architectureOptions = scenarioOverride?.architectureOptions || (cert.code === "DP-600" && topic.assunto === "cargas de trabalho integradas"
              ? [
                "Integrar ingestão, transformação, modelagem semântica e consumo analítico em um fluxo governável.",
                "Compartilhar uma tabela já preparada por atalho entre workspaces, sem orquestrar sua ingestão.",
                "Consultar com T-SQL um esquema dimensional já carregado, sem criar a camada de consumo no Power BI.",
                "Aplicar segurança por linha a um modelo existente, sem modificar o fluxo que carrega os dados.",
              ]
              : scenarioOptions);
            addChoice(base, "codeOutput", architecturePrompt, topic.artefato, architectureOptions[0], architectureOptions.slice(1), `${explanation("Leitura da arquitetura")} O gabarito relaciona o desenho completo à necessidade, não apenas a um componente citado.`);
          } else if (variant === 3) {
            const correctionOptions = (scenarioOverride?.correctionOptions || scenarioOptions).map((value) => `Correção proposta — ${value}`);
            addChoice(base, "findError", `Revise a decisão técnica sobre ${topic.assunto} e escolha o requisito que precisa orientar a correção.`, `${topic.cenario}\nDecisão registrada: ${falseStatement}`, correctionOptions[0], correctionOptions.slice(1), `Correção técnica: ${topic.conceito} A decisão registrada não atende ao requisito do cenário e deve ser revista antes da implantação.`);
          } else if (variant === 4) {
            add({ ...base, tipo: "trueFalse", enunciado: `Em um cenário de ${topic.assunto}, julgue: ${truthItems[1].statement}`, gabarito: truthItems[1].answer, comentario: truthItems[1].comment });
          } else {
            addChoice(base, "multipleChoice", `${topic.cenario} Qual desenho deve ser implementado e testado para atender especificamente a necessidade?`, "", artifactOptions[0], artifactOptions.slice(1), `${explanation("Aplicação ao cenário")} O desenho escolhido materializa a decisão e permite validar suas dependências.`);
          }
        }
      });
    });
  }

  const programmingReferences = {
    Python: ["Python Documentation", "https://docs.python.org/3/"],
    JavaScript: ["MDN Web Docs — JavaScript", "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"],
    HTML: ["MDN Web Docs — HTML", "https://developer.mozilla.org/pt-BR/docs/Web/HTML"],
    CSS: ["MDN Web Docs — CSS", "https://developer.mozilla.org/pt-BR/docs/Web/CSS"],
    SQL: ["PostgreSQL Documentation", "https://www.postgresql.org/docs/current/"],
    Java: ["Oracle Java Tutorials", "https://docs.oracle.com/javase/tutorial/"],
    Git: ["Git Documentation", "https://git-scm.com/docs"],
  };

  const programmingTopicReferences = {
    "Java::encapsulamento": ["Oracle Java Tutorials — controle de acesso", "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html"],
    "Java::equals": ["Oracle Java SE 21 — String.equals", "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#equals(java.lang.Object)"],
    "Java::try-with-resources": ["Oracle Java Tutorials — try-with-resources", "https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html"],
    "Java::interface": ["Oracle Java Tutorials — interfaces", "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html"],
  };

  function programmingReference(topic) {
    return programmingTopicReferences[`${topic.tecnologia}::${topic.assunto}`]
      || programmingReferences[topic.tecnologia];
  }

  function programmingTopic(tecnologia, assunto, codigo, correta, incorretas, conceito, falsa) {
    return { tecnologia, assunto, codigo, correta, incorretas, conceito, falsa };
  }

  const programmingTopics = [
    programmingTopic("Python", "índice negativo", "valores = [1, 2, 3]\nprint(valores[-1])", "Imprime 3.", ["Imprime 1.", "Imprime -1.", "Lança IndexError."], "Em sequências Python, -1 acessa o último elemento sem alterar a coleção.", "Em uma sequência Python, acessar o índice -1 causa IndexError."),
    programmingTopic("Python", "dict.get", "dados = {'setor': 'TI'}\nprint(dados.get('status'))", "Imprime None.", ["Lança KeyError.", "Imprime status.", "Adiciona a chave status."], "dict.get retorna o padrão informado, ou None, quando a chave não existe.", "dict.get sempre lança KeyError para uma chave ausente."),
    programmingTopic("Python", "enumerate", "nomes = ['Ana', 'Bia']\nprint(list(enumerate(nomes, start=1)))", "Imprime [(1, 'Ana'), (2, 'Bia')].", ["Imprime [(0, 'Ana'), (1, 'Bia')].", "Imprime ['Ana', 'Bia', 1].", "Lança TypeError por causa de start."], "enumerate produz pares de índice e valor; start define o primeiro índice.", "start altera o primeiro elemento da coleção original."),
    programmingTopic("Python", "compreensão de listas", "resultado = [n * 2 for n in range(4) if n % 2 == 0]\nprint(resultado)", "Imprime [0, 4].", ["Imprime [0, 2, 4, 6].", "Imprime [2, 6].", "Imprime [0, 2]."], "A condição seleciona 0 e 2; a expressão multiplica esses valores por 2.", "O filtro de uma compreensão é aplicado depois de gerar todos os resultados."),
    programmingTopic("Python", "tratamento de exceções", "try:\n    int('x')\nexcept ValueError:\n    print('inválido')", "Imprime inválido.", ["Imprime 0.", "Lança ValueError sem tratamento.", "Imprime x."], "int('x') lança ValueError, capturada pelo except compatível.", "except ValueError captura somente erros de sintaxe anteriores à execução."),
    programmingTopic("Python", "cópia de lista", "origem = [1, 2]\ncopia = origem.copy()\ncopia.append(3)\nprint(origem)", "Imprime [1, 2].", ["Imprime [1, 2, 3].", "Imprime [3].", "Lança AttributeError."], "list.copy cria uma cópia rasa; adicionar um inteiro à cópia não muda a original.", "list.copy cria apenas outro nome para o mesmo objeto lista."),
    programmingTopic("JavaScript", "const e arrays", "const itens = [10];\nitens.push(20);\nconsole.log(itens.length);", "Imprime 2.", ["Lança erro ao chamar push.", "Imprime 1.", "Imprime undefined."], "const impede reatribuir a variável, mas não impede mutar o array referenciado.", "Declarar um array com const torna seus elementos imutáveis."),
    programmingTopic("JavaScript", "escopo de let", "let total = 1;\nif (true) { let total = 2; }\nconsole.log(total);", "Imprime 1.", ["Imprime 2.", "Lança ReferenceError.", "Imprime undefined."], "let possui escopo de bloco; a declaração interna não substitui a variável externa.", "Uma declaração let interna sempre redefine a variável externa."),
    programmingTopic("JavaScript", "Array.map", "const dobro = [1, 2, 3].map(n => n * 2);\nconsole.log(dobro);", "Imprime [2, 4, 6].", ["Imprime [1, 2, 3].", "Imprime 12.", "Imprime [1, 4, 9]."], "map cria um novo array com o retorno da função aplicado a cada item.", "map altera obrigatoriamente o array original e não retorna outro array."),
    programmingTopic("JavaScript", "microtarefas", "console.log('A');\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');", "Imprime A, C e B, nessa ordem.", ["Imprime A, B e C.", "Imprime B, A e C.", "Imprime apenas A e C."], "O callback de then roda na fila de microtarefas após a pilha síncrona atual.", "Callbacks de Promise interrompem a instrução síncrona em execução."),
    programmingTopic("JavaScript", "igualdade estrita", "console.log(5 === '5');", "Imprime false.", ["Imprime true.", "Imprime 5.", "Lança TypeError."], "A igualdade estrita compara valor e tipo sem converter a string em número.", "O operador === converte os operandos para o mesmo tipo antes de comparar."),
    programmingTopic("JavaScript", "encadeamento opcional", "const usuario = {};\nconsole.log(usuario.endereco?.cidade);", "Imprime undefined.", ["Lança TypeError.", "Imprime cidade.", "Cria o objeto endereco."], "O encadeamento opcional retorna undefined quando a referência do caminho está ausente.", "O operador ?. cria automaticamente objetos ausentes no caminho."),
    programmingTopic("HTML", "label associado", "<label for=\"email\">E-mail</label>\n<input id=\"email\" type=\"email\">", "Associa o rótulo ao campo e amplia sua área acionável.", ["Usa o texto do label como valor inicial enviado pelo controle.", "Relaciona o rótulo à propriedade name usada no envio do formulário.", "Cria associação visual, mas não inclui o campo na ordem de foco."], "for no label deve corresponder ao id do controle para uma associação acessível.", "for deve apontar para name, e não para id."),
    programmingTopic("HTML", "elemento main", "<header>...</header>\n<main><h1>Relatório</h1></main>\n<footer>...</footer>", "Identifica o conteúdo principal único da página.", ["Converte o cabeçalho em landmark principal de navegação.", "Remove o conteúdo principal da árvore de acessibilidade.", "Autoriza vários elementos main visíveis no mesmo documento."], "main representa o conteúdo dominante e cria um landmark de navegação.", "main deve conter apenas links repetidos em todas as páginas."),
    programmingTopic("HTML", "tipo de button", "<form><button type=\"button\">Prévia</button></form>", "O clique não envia o formulário por padrão.", ["Envia o formulário usando o método e a action definidos.", "Adota o comportamento implícito de submit do elemento button.", "Fica inativo até receber um listener de clique via JavaScript."], "type=button evita o envio e serve a ações controladas por script.", "Dentro de form, type=button equivale a type=submit."),
    programmingTopic("HTML", "elemento picture", "<picture>\n <source media=\"(min-width:800px)\" srcset=\"wide.webp\">\n <img src=\"base.webp\" alt=\"Equipe\">\n</picture>", "Seleciona uma fonte por condição e mantém img como fallback.", ["Carrega e exibe simultaneamente todas as fontes declaradas.", "Torna desnecessário o texto alternativo definido no elemento img.", "Restringe a seleção de fontes a arquivos no formato SVG."], "picture oferece fontes condicionais, enquanto img continua sendo o fallback obrigatório.", "Ao usar picture, o elemento img deve ser removido."),
    programmingTopic("CSS", "Flexbox", ".toolbar { display:flex; justify-content:space-between; align-items:center; }", "Distribui no eixo principal e alinha no eixo transversal.", ["Cria duas dimensões independentes para linhas e colunas da toolbar.", "Retira os itens do fluxo e os posiciona pelas bordas do contêiner.", "Reordena os elementos no DOM conforme o espaço disponível."], "justify-content atua no eixo principal e align-items no transversal.", "justify-content sempre controla o eixo vertical."),
    programmingTopic("CSS", "Grid responsivo", ".cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(16rem,1fr)); }", "Cria colunas fluidas respeitando o mínimo informado.", ["Mantém uma coluna única até que um breakpoint seja declarado.", "Posiciona os cards de forma absoluta dentro do contêiner.", "Mantém colunas fixas de 16rem, mesmo quando sobra espaço."], "auto-fit com minmax permite uma grade fluida sem largura fixa por breakpoint.", "grid-template-columns define apenas linhas, nunca colunas."),
    programmingTopic("CSS", "especificidade", "#app .card { color:navy; }\n.card { color:black; }", "A primeira regra tende a vencer pela maior especificidade.", ["A segunda regra vence porque aparece depois na folha de estilos.", "As duas regras têm a mesma especificidade e dependem da ordem.", "As cores declaradas são combinadas quando ambos os seletores casam."], "Um seletor de id contribui mais para a especificidade que uma classe.", "A ordem sempre supera a especificidade dos seletores."),
    programmingTopic("CSS", "media query", "@media (max-width:600px) { .menu { flex-direction:column; } }", "Aplica coluna quando a viewport atende à largura máxima.", ["Aplica a regra apenas na mídia de impressão até 600 pontos.", "Altera a largura física do dispositivo para o limite declarado.", "Aplica coluna quando a viewport ultrapassa 600px de largura."], "Media queries condicionam estilos a características como largura da viewport.", "max-width:600px seleciona somente larguras maiores que 600px."),
    programmingTopic("SQL", "GROUP BY", "SELECT setor, COUNT(*) AS total\nFROM chamados\nGROUP BY setor;", "Retorna uma contagem por setor.", ["Retorna o primeiro chamado de cada setor.", "Conta setores distintos sem exibi-los.", "Atualiza a coluna setor."], "GROUP BY forma grupos por setor e COUNT(*) conta as linhas em cada grupo.", "GROUP BY altera os registros armazenados na tabela."),
    programmingTopic("SQL", "INNER JOIN", "SELECT p.id, c.nome\nFROM pedidos p\nJOIN clientes c ON c.id=p.cliente_id;", "Retorna pedidos com cliente correspondente.", ["Retorna clientes sem pedido.", "Cria uma tabela física.", "Combina cada pedido com todos os clientes."], "INNER JOIN preserva combinações que satisfazem a condição ON.", "INNER JOIN preserva todas as linhas mesmo sem correspondência."),
    programmingTopic("SQL", "LEFT JOIN e nulos", "SELECT c.id FROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id=c.id\nWHERE p.id IS NULL;", "Retorna clientes sem pedido correspondente.", ["Retorna clientes com dois pedidos.", "Remove clientes sem pedido.", "Grava zero nos ids nulos."], "LEFT JOIN preserva clientes e IS NULL identifica ausência de correspondência.", "IS NULL após LEFT JOIN retorna somente linhas correspondentes."),
    programmingTopic("SQL", "ROW_NUMBER", "SELECT setor, valor,\n ROW_NUMBER() OVER(PARTITION BY setor ORDER BY valor DESC) AS pos\nFROM vendas;", "Numera linhas em cada setor do maior para o menor valor.", ["Reduz cada setor a uma linha.", "Soma os valores por setor.", "Ordena nomes de setores."], "ROW_NUMBER atribui posições sem colapsar as linhas do resultado.", "ROW_NUMBER exige GROUP BY e reduz cada partição a uma linha."),
    programmingTopic("Java", "encapsulamento", "class Conta { private double saldo; public double getSaldo(){ return saldo; } }", "O campo não pode ser acessado diretamente por código externo.", ["Qualquer classe do pacote altera o campo.", "getSaldo é automaticamente privado.", "A classe não pode ter métodos públicos."], "private restringe acesso à própria classe e permite operações controladas.", "Outra classe acessa um membro private diretamente por meio da instância."),
    programmingTopic("Java", "equals", "String a=new String(\"ok\");\nString b=new String(\"ok\");\nSystem.out.println(a.equals(b));", "Imprime true.", ["Imprime false.", "Lança NullPointerException.", "Não compila."], "String sobrescreve equals para comparar conteúdo textual.", "equals de String compara somente identidade de referência."),
    programmingTopic("Java", "try-with-resources", "try (var leitor=Files.newBufferedReader(caminho)) { return leitor.readLine(); }", "Fecha o leitor automaticamente ao sair do bloco.", ["Mantém o leitor aberto até o encerramento da JVM.", "Suprime a IOException e retorna uma linha vazia.", "Fecha o leitor apenas se readLine terminar sem exceção."], "try-with-resources fecha recursos AutoCloseable mesmo quando ocorre exceção.", "O recurso só é fechado quando o bloco termina sem exceção."),
    programmingTopic("Java", "interface", "interface Auditavel { void auditar(); }\nclass Pedido implements Auditavel { public void auditar(){} }", "Pedido fornece uma implementação pública do contrato.", ["Pedido herda estado concreto declarado pela interface.", "Auditavel pode ser instanciada diretamente como classe concreta.", "Pedido herda uma implementação pronta de auditar da interface."], "Uma interface define contrato implementado pela classe concreta.", "implements permite omitir métodos abstratos sem tornar a classe abstrata."),
    programmingTopic("Git", "git status", "git status --short", "Mostra o estado resumido da árvore e do índice.", ["Envia ao remoto as alterações preparadas no índice local.", "Restaura arquivos modificados para o conteúdo do último commit.", "Cria uma branch temporária para representar as mudanças locais."], "git status inspeciona arquivos rastreados, preparados e não rastreados sem alterar conteúdo.", "git status restaura arquivos para o último commit."),
    programmingTopic("Git", "commit e push", "git commit -m \"fix: corrige validação\"", "Cria um commit local com o conteúdo no índice.", ["Publica o commit recém-criado no remoto configurado como origin.", "Inclui no snapshot arquivos modificados que não passaram por git add.", "Mescla a branch main antes de registrar o novo snapshot local."], "git commit registra o snapshot preparado; git push é uma operação separada.", "Todo git commit executa push para origin."),
    programmingTopic("Git", "branches", "git switch -c feature/auditoria", "Cria a branch local e muda para ela.", ["Renomeia a branch main no repositório remoto e atualiza seu upstream.", "Remove as outras branches locais antes de trocar o HEAD.", "Cria um commit inicial vazio sem alterar a branch atual."], "switch -c cria uma branch no ponto atual e atualiza HEAD.", "switch -c altera a branch padrão do repositório remoto."),
    programmingTopic("Git", "rebase", "git rebase main", "Reaplica os commits atuais sobre o topo de main.", ["Cria um merge commit para preservar a topologia anterior.", "Substitui o repositório remoto pelo histórico da cópia local.", "Remove da branch os commits feitos depois do ponto de divergência."], "rebase reescreve a base dos commits e exige cuidado quando eles já foram compartilhados.", "rebase preserva os identificadores de todos os commits reaplicados."),
  ];

  function programmingConceptDistractors(topicIndex) {
    const current = programmingTopics[topicIndex];
    const peers = programmingTopics.filter((topic) => topic.tecnologia === current.tecnologia && topic.assunto !== current.assunto);
    const start = topicIndex % peers.length;
    return peers.slice(start).concat(peers).slice(0, 3).map((topic) => topic.conceito);
  }

  function generateProgrammingBank() {
    programmingTopics.forEach((topic, topicIndex) => {
      const [fonte, link] = programmingReference(topic);
      const conceptDistractors = programmingConceptDistractors(topicIndex);
      const falseStatement = naturalFalseStatement(topic.falsa);
      const truthItems = balancedTruthPair(
        `programacao::${topic.tecnologia}`,
        programmingTopics.filter((candidate) => candidate.tecnologia === topic.tecnologia).findIndex((candidate) => candidate === topic),
        programmingTopics.filter((candidate) => candidate.tecnologia === topic.tecnologia).length,
        topic.conceito,
        falseStatement,
        `${topic.conceito} O comportamento também é confirmado pelo trecho mostrado.`,
        `${topic.conceito} A afirmação contradiz a regra aplicada pelo trecho mostrado.`,
      );
      for (let variant = 0; variant < 6; variant += 1) {
        const sequence = topicIndex * 6 + variant;
        const base = {
          id: `PROG-${String(sequence + 1).padStart(3, "0")}`,
          area: "programacao",
          trilha: topic.tecnologia,
          linguagem: topic.tecnologia,
          disciplina: topic.tecnologia,
          assunto: topic.assunto,
          dificuldade: variantDifficulty[variant],
          fonte,
          link,
          tags: ["programacao", slug(topic.tecnologia), slug(topic.assunto)],
        };
        const explanation = (lead) => `${lead}: ${topic.conceito} O resultado decorre da sintaxe e das regras documentadas da tecnologia mostrada.`;
        const conceptOptions = scopedOptions(topic.assunto, [topic.conceito, ...conceptDistractors], "Regra aplicável a");
        if (variant === 0) {
          addChoice(base, "multipleChoice", `Em ${topic.tecnologia}, qual regra explica ${topic.assunto} no trecho apresentado?`, topic.codigo, conceptOptions[0], conceptOptions.slice(1), explanation("Regra da linguagem"));
        } else if (variant === 1) {
          add({ ...base, tipo: "trueFalse", enunciado: `Sobre ${topic.assunto} em ${topic.tecnologia}, julgue: ${truthItems[0].statement}`, codigo: topic.codigo, gabarito: truthItems[0].answer, comentario: truthItems[0].comment });
        } else if (variant === 2) {
          addChoice(base, "codeOutput", `Qual é o resultado ou efeito observável do trecho de ${topic.tecnologia} sobre ${topic.assunto}?`, topic.codigo, topic.correta, topic.incorretas, explanation("Execução do trecho"));
        } else if (variant === 3) {
          const outputCorrections = [topic.correta, ...topic.incorretas].map((value) => `A revisão deve reconhecer o efeito observado: ${lowerInitial(value)}`);
          addChoice(base, "findError", `Uma revisão atribuiu ao trecho a conclusão abaixo. Qual efeito observado corrige o equívoco sobre ${topic.assunto}?`, `${topic.codigo}\nConclusão: ${falseStatement}`, outputCorrections[0], outputCorrections.slice(1), `Correção do code review: ${topic.conceito} O efeito correto é “${topic.correta}”, por isso a conclusão anexada ao código deve ser rejeitada.`);
        } else if (variant === 4) {
          add({ ...base, tipo: "trueFalse", enunciado: `Ao revisar ${topic.assunto} em ${topic.tecnologia}, julgue: ${truthItems[1].statement}`, codigo: topic.codigo, gabarito: truthItems[1].answer, comentario: truthItems[1].comment });
        } else {
          const reviewOptions = scopedOptions(topic.assunto, [topic.conceito, ...conceptDistractors], "Critério de revisão para");
          addChoice(base, "multipleChoice", `Durante um code review de ${topic.tecnologia}, qual critério deve ser preservado ao refatorar ${topic.assunto}?`, "", reviewOptions[0], reviewOptions.slice(1), `${explanation("Aplicação no code review")} A refatoração deve manter a regra, não apenas reproduzir a aparência do trecho.`);
        }
      }
    });
  }

  const dataReferences = {
    "Fundamentos de Dados": ["Microsoft Learn — conceitos fundamentais de dados", "https://learn.microsoft.com/en-us/training/paths/azure-data-fundamentals-explore-core-data-concepts/"],
    "SQL para Dados": ["PostgreSQL Documentation", "https://www.postgresql.org/docs/current/"],
    "Python para Dados": ["pandas Documentation", "https://pandas.pydata.org/docs/"],
    "Power BI": ["Microsoft Learn — documentação do Power BI", "https://learn.microsoft.com/en-us/power-bi/"],
    "Engenharia de Dados": ["Microsoft Learn — carreira de engenharia de dados", "https://learn.microsoft.com/en-us/training/career-paths/data-engineer"],
    "Analytics e Negócio": ["Microsoft Learn — dashboards do Power BI", "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards"],
    "Estatística Aplicada": ["NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/"],
    "Visualização de Dados": ["Microsoft Learn — tipos de visualização", "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a"],
  };

  const dataTopicReferences = {
    "Fundamentos de Dados::qualidade": ["Microsoft Purview — dimensões de qualidade de dados", "https://learn.microsoft.com/en-us/purview/unified-catalog-reports-data-quality-health"],
    "Fundamentos de Dados::tratamento de nulos": ["Microsoft Purview — completude e valores ausentes", "https://learn.microsoft.com/en-us/purview/unified-catalog-reports-data-quality-health"],
    "Fundamentos de Dados::granularidade": ["Microsoft Learn — granularidade em esquema estrela", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"],
    "Fundamentos de Dados::linhagem": ["Microsoft Purview — linhagem de dados", "https://learn.microsoft.com/en-us/purview/data-gov-classic-lineage"],
    "Engenharia de Dados::ETL e ELT": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "Engenharia de Dados::carga incremental": ["Microsoft Learn — atualização incremental em dataflows", "https://learn.microsoft.com/en-us/power-query/dataflows/incremental-refresh"],
    "Engenharia de Dados::idempotência": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "Engenharia de Dados::observabilidade": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "Analytics e Negócio::SLA": ["Microsoft Learn — definição e condições de SLA", "https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/create-standard-sla"],
    "Analytics e Negócio::churn": ["Microsoft Learn — retenção, churn e coortes", "https://learn.microsoft.com/en-us/kusto/query/user-analytics?view=microsoft-fabric"],
    "Analytics e Negócio::coortes": ["Microsoft Learn — retenção, churn e coortes", "https://learn.microsoft.com/en-us/kusto/query/user-analytics?view=microsoft-fabric"],
    "Analytics e Negócio::teste de hipótese": ["NIST/SEMATECH — introdução a testes de hipótese", "https://www.itl.nist.gov/div898/handbook/prc/section1/prc1.htm"],
  };

  function dataReference(topic) {
    return dataTopicReferences[`${topic.trilha}::${topic.assunto}`]
      || dataReferences[topic.trilha];
  }

  function dataTopic(trilha, assunto, conceito, falsa, artefato) {
    return { trilha, assunto, conceito, falsa, artefato };
  }

  const dataTopics = [
    dataTopic("Fundamentos de Dados", "qualidade", "Qualidade deve ser medida por completude, validade, consistência, unicidade e atualidade.", "Abrir o arquivo sem erro confirma o formato e, por si, atesta a qualidade do indicador calculado.", "nulls=8% | duplicates=3% | invalid_dates=2%"),
    dataTopic("Fundamentos de Dados", "tratamento de nulos", "Nulos devem ser investigados por origem e significado antes de remover ou imputar valores.", "Preencher nulos com zero é uma limpeza neutra que preserva o significado da variável.", "tempo_resolucao: NULL em chamados ainda abertos"),
    dataTopic("Fundamentos de Dados", "granularidade", "A granularidade define o que cada linha representa e condiciona agregações e relações.", "Misturar linhas por pedido e por item na mesma fato nunca altera somas.", "linha A = pedido | linha B = item do pedido"),
    dataTopic("Fundamentos de Dados", "linhagem", "Linhagem registra origem, transformações e produtos que dependem de cada dado.", "Linhagem é apenas o nome visual de cada coluna no dashboard.", "ERP -> bronze -> silver -> semantic model -> KPI"),
    dataTopic("SQL para Dados", "agregações", "Funções agregadas resumem linhas, e GROUP BY define dimensões mantidas no resultado.", "COUNT(*) com GROUP BY altera as linhas gravadas na origem.", "SELECT setor, COUNT(*) FROM chamados GROUP BY setor;"),
    dataTopic("SQL para Dados", "funções de janela", "Funções de janela calculam rankings e acumulados sem reduzir cada grupo a uma linha.", "ROW_NUMBER depende de GROUP BY para eliminar o detalhe antes da numeração.", "ROW_NUMBER() OVER(PARTITION BY setor ORDER BY valor DESC)"),
    dataTopic("SQL para Dados", "cardinalidade de JOIN", "A cardinalidade das chaves deve ser verificada porque relações 1:N podem multiplicar linhas.", "Um JOIN nunca aumenta o número de linhas do lado esquerdo.", "clientes(1) JOIN pedidos(N) JOIN itens(N)"),
    dataTopic("SQL para Dados", "CTE", "CTEs nomeiam resultados intermediários e tornam etapas complexas mais legíveis.", "Uma CTE materializa uma tabela persistente no banco ao término da consulta.", "WITH base AS (SELECT ...) SELECT ... FROM base;"),
    dataTopic("Python para Dados", "groupby", "groupby separa linhas por chaves e aplica agregações a cada grupo.", "groupby apenas ordena valores e não permite resumir grupos.", "df.groupby('setor', as_index=False)['valor'].sum()"),
    dataTopic("Python para Dados", "merge", "merge combina DataFrames por chaves, e validate explicita a cardinalidade esperada.", "merge corresponde linhas somente pela posição mesmo quando on define uma chave.", "pedidos.merge(clientes, on='cliente_id', validate='many_to_one')"),
    dataTopic("Python para Dados", "tipos de data", "Converter texto para datetime permite ordenar, filtrar períodos e calcular intervalos.", "Datas em texto com formatos variáveis sempre ordenam cronologicamente.", "pd.to_datetime(df['abertura'], errors='coerce')"),
    dataTopic("Python para Dados", "duplicidades", "drop_duplicates depende das colunas que definem unicidade no processo.", "Remover linhas visualmente idênticas garante que nenhuma entidade duplicada permaneça.", "df.drop_duplicates(subset=['pedido_id'], keep='last')"),
    dataTopic("Power BI", "modelo estrela", "Um modelo estrela organiza fatos e dimensões para filtros previsíveis e medidas reutilizáveis.", "Relacionar todas as tabelas diretamente entre si é sempre mais seguro.", "DimData -> FatoVendas <- DimProduto"),
    dataTopic("Power BI", "contexto de filtro", "Medidas DAX são recalculadas conforme filtros e expressões como CALCULATE.", "Uma medida com SUM ignora todos os filtros do relatório.", "Receita = SUM(Vendas[Valor])"),
    dataTopic("Power BI", "RLS", "RLS restringe linhas para identidades e funções e deve ser testada com a estratégia de compartilhamento.", "RLS oculta colunas e respectivos metadados dos consumidores do modelo.", "Regiao[GestorEmail] = USERPRINCIPALNAME()"),
    dataTopic("Power BI", "atualização", "Atualização depende de credenciais, gateway quando necessário, fonte disponível e agenda configurada.", "Após a publicação, uma fonte local passa a atualizar sem gateway configurado.", "SQL local -> gateway -> semantic model refresh"),
    dataTopic("Engenharia de Dados", "ETL e ELT", "ETL transforma antes da carga; ELT usa o destino para transformar após carregar.", "ETL e ELT executam as etapas exatamente na mesma ordem.", "ETL: E->T->L | ELT: E->L->T"),
    dataTopic("Engenharia de Dados", "carga incremental", "Carga incremental processa dados novos ou alterados usando uma marca confiável.", "Carga incremental nunca precisa lidar com registros atualizados ou atrasados.", "WHERE updated_at > last_watermark"),
    dataTopic("Engenharia de Dados", "idempotência", "Um processo idempotente pode ser repetido sem duplicar efeitos além do resultado esperado.", "Idempotência significa que o pipeline só pode executar uma vez.", "MERGE target USING staging ON business_key"),
    dataTopic("Engenharia de Dados", "observabilidade", "Logs, métricas, alertas e reconciliação detectam atraso, falha e perda de dados.", "Status de sucesso prova que todas as regras de qualidade foram atendidas.", "rows_read=10000 | rows_written=9800 | rejected=200"),
    dataTopic("Analytics e Negócio", "SLA", "Um SLA precisa definir início, fim, pausas, calendário e população elegível.", "SLA é sempre a média do tempo de todos os registros, inclusive abertos.", "no_prazo / elegiveis * 100"),
    dataTopic("Analytics e Negócio", "churn", "Churn exige definir entidade, saída, janela temporal e base elegível no denominador.", "Churn pode ser calculado apenas contando novos clientes do período.", "clientes_perdidos / clientes_no_inicio"),
    dataTopic("Analytics e Negócio", "coortes", "Coortes acompanham grupos formados por evento ou período comum ao longo do tempo.", "Coorte mistura todos os usuários sem preservar o período de entrada.", "cohort_month x months_since_signup x retention"),
    dataTopic("Analytics e Negócio", "teste de hipótese", "Um teste declara hipótese, métrica, significância, poder e critérios antes do resultado.", "Se a média de B for maior, o efeito está provado sem avaliar incerteza.", "H0: delta=0 | alpha=0.05 | confidence interval"),
    dataTopic("Estatística Aplicada", "média e mediana", "A mediana é resistente a extremos; a escolha depende da distribuição e da pergunta.", "Conhecer a média de um conjunto determina também sua mediana.", "tempos = [2, 3, 4, 5, 90]"),
    dataTopic("Estatística Aplicada", "variabilidade", "Desvio padrão e intervalo interquartil descrevem dispersão e reagem diferente a outliers.", "Duas séries que têm a mesma média também possuem igual variabilidade.", "A=[9,10,11] | B=[1,10,19]"),
    dataTopic("Estatística Aplicada", "correlação e causalidade", "Correlação descreve associação e, isoladamente, não demonstra causalidade.", "Uma correlação alta prova que alterar uma variável causará mudança na outra.", "corr(X,Y)=0.91 | possible confounder Z"),
    dataTopic("Estatística Aplicada", "amostragem", "Uma amostra precisa representar a população e ter seleção coerente com a inferência desejada.", "Aumentar o tamanho de uma amostra enviesada corrige o viés de seleção.", "survey sent only to active premium users"),
    dataTopic("Visualização de Dados", "série temporal", "Gráficos de linha preservam a ordem do tempo e evidenciam tendência e sazonalidade.", "Ordenar meses alfabeticamente mantém a sequência temporal correta.", "jan=12 | fev=15 | mar=11 | abr=20"),
    dataTopic("Visualização de Dados", "comparação de categorias", "Barras em uma base comum facilitam comparar magnitudes e ordenar categorias.", "Uma pizza com vinte categorias sempre facilita comparações precisas.", "20 categorias (C01 a C20) | valores entre 9 e 42 | visual atual: pizza com 20 fatias"),
    dataTopic("Visualização de Dados", "escala e eixo", "Escalas, unidades e limites de eixo devem ser explícitos para evitar distorção.", "Cortar o eixo sem sinalização nunca altera a interpretação.", "eixo Y: 98 a 102 | valores: 99 e 101"),
    dataTopic("Visualização de Dados", "acessibilidade", "Cor não deve ser o único canal; contraste, rótulos, títulos e texto alternativo apoiam leitura.", "Verde e vermelho sem rótulos atendem ao requisito de não depender exclusivamente de cor.", "status: cor + ícone + texto"),
  ];

  function dataDistractors(topicIndex) {
    const current = dataTopics[topicIndex];
    return dataTopics
      .filter((topic) => topic.trilha === current.trilha && topic.assunto !== current.assunto)
      .map((topic) => topic.conceito)
      .slice(0, 3);
  }

  function dataPeerValues(topicIndex, field) {
    const current = dataTopics[topicIndex];
    return dataTopics
      .filter((topic) => topic.trilha === current.trilha && topic.assunto !== current.assunto)
      .map((topic) => topic[field])
      .slice(0, 3);
  }

  function generateDataBank() {
    dataTopics.forEach((topic, topicIndex) => {
      const [fonte, link] = dataReference(topic);
      const distractors = dataDistractors(topicIndex);
      const falseStatement = naturalFalseStatement(topic.falsa);
      const truthItems = balancedTruthPair(
        `dados::${topic.trilha}`,
        dataTopics.filter((candidate) => candidate.trilha === topic.trilha).findIndex((candidate) => candidate === topic),
        dataTopics.filter((candidate) => candidate.trilha === topic.trilha).length,
        topic.conceito,
        falseStatement,
        `${topic.conceito} O artefato fornece contexto suficiente para aplicar esse princípio.`,
        `${topic.conceito} A afirmação ignora uma condição capaz de alterar o resultado analítico.`,
      );
      for (let variant = 0; variant < 6; variant += 1) {
        const sequence = topicIndex * 6 + variant;
        const base = {
          id: `DADOS-${String(sequence + 1).padStart(3, "0")}`,
          area: "dados",
          trilha: topic.trilha,
          disciplina: topic.trilha,
          assunto: topic.assunto,
          dificuldade: variantDifficulty[variant],
          fonte,
          link,
          tags: ["dados", slug(topic.trilha), slug(topic.assunto)],
        };
        const explanation = (lead) => `${lead}: ${topic.conceito} A decisão deve ser confirmada com dados de teste e regra de negócio documentada.`;
        const definitionOptions = scopedOptions(topic.assunto, [topic.conceito, ...distractors], "Definição de");
        const artifactSubjects = [topic.assunto, ...dataPeerValues(topicIndex, "assunto")];
        const artifactConcepts = [topic.conceito, ...distractors];
        const artifactReadings = artifactConcepts.map((concept, index) => `Leitura do artefato como ${artifactSubjects[index]}: ${lowerInitial(concept)}`);
        const diagnosticTests = scopedOptions(topic.assunto, [topic.artefato, ...dataPeerValues(topicIndex, "artefato")], "Teste para corrigir");
        const publicationOptions = scopedOptions(topic.assunto, [topic.conceito, ...distractors], "Critério de publicação para");
        if (variant === 0) {
          addChoice(base, "multipleChoice", `Qual opção delimita corretamente ${topic.assunto} na trilha ${topic.trilha}?`, "", definitionOptions[0], definitionOptions.slice(1), explanation("Fundamento analítico"));
        } else if (variant === 1) {
          add({ ...base, tipo: "trueFalse", enunciado: `Na análise de ${topic.assunto}, julgue: ${truthItems[0].statement}`, codigo: topic.artefato, gabarito: truthItems[0].answer, comentario: truthItems[0].comment });
        } else if (variant === 2) {
          const artifactPrompt = topic.trilha === "Fundamentos de Dados" && topic.assunto === "qualidade"
            ? "O artefato apresenta nulos, duplicidades e datas inválidas. Qual leitura cobre conjuntamente os três sinais, em vez de tratar apenas um deles?"
            : `Qual leitura identifica a finalidade principal do artefato no diagnóstico de ${topic.assunto}?`;
          addChoice(base, "codeOutput", artifactPrompt, topic.artefato, artifactReadings[0], artifactReadings.slice(1), `${explanation("Leitura do artefato")} A opção correta explica a finalidade principal, enquanto as demais tratam outro diagnóstico.`);
        } else if (variant === 3) {
          addChoice(base, "findError", `A equipe registrou a conclusão abaixo sobre ${topic.assunto}. Qual teste reproduzível deve iniciar a correção?`, `${topic.artefato}\nConclusão: ${falseStatement}`, diagnosticTests[0], diagnosticTests.slice(1), `Correção do diagnóstico: ${topic.conceito} Reproduzir o teste associado ao tema permite confrontar a conclusão com evidência verificável.`);
        } else if (variant === 4) {
          add({ ...base, tipo: "trueFalse", enunciado: `No tema ${topic.assunto}, julgue: ${truthItems[1].statement}`, codigo: topic.artefato, gabarito: truthItems[1].answer, comentario: truthItems[1].comment });
        } else {
          const publicationPrompt = topic.trilha === "Fundamentos de Dados" && topic.assunto === "qualidade"
            ? "Antes de publicar, qual critério avalia o conjunto de completude, validade e unicidade mostrado no resumo?"
            : `Ao revisar a entrega de ${topic.assunto}, qual critério deve orientar a decisão de publicação?`;
          addChoice(base, "multipleChoice", publicationPrompt, topic.artefato, publicationOptions[0], publicationOptions.slice(1), `${explanation("Aplicação na entrega")} O critério escolhido deve corresponder ao objetivo declarado da entrega.`);
        }
      }
    });
  }

  const academyTracks = [
    {
      trilha: "Fundamentos de Dados", disciplina: "Fundamentos", nivel: "iniciante",
      fonte: "Microsoft Learn — conceitos fundamentais de dados", link: "https://learn.microsoft.com/en-us/training/paths/azure-data-fundamentals-explore-core-data-concepts/",
      topics: [
        ["tipos de dados", "Classificar campos como número, categoria, data ou texto evita operações e visuais incompatíveis."],
        ["qualidade de dados", "Qualidade envolve completude, validade, consistência, unicidade, integridade e atualidade."],
        ["dados nulos", "Nulos precisam ser investigados antes de remover linhas ou preencher valores automaticamente."],
        ["duplicidade", "Duplicidade pode inflar contagens, somas e indicadores operacionais."],
        ["outliers", "Outliers podem representar erro, evento raro real ou mudança relevante no processo."],
        ["granularidade", "Granularidade é o nível de detalhe de cada linha e muda o significado das métricas."],
        ["KPIs", "Um KPI liga uma métrica a objetivo, período, responsável e regra de cálculo documentada."],
        ["dado, informação e insight", "Dados são registros; informação os organiza; insight conecta a análise a uma decisão possível."],
      ],
    },
    {
      trilha: "SQL para Análise", disciplina: "SQL", nivel: "iniciante a intermediário",
      fonte: "PostgreSQL Documentation", link: "https://www.postgresql.org/docs/current/tutorial-sql.html",
      topics: [
        ["SELECT", "SELECT define as colunas e expressões retornadas sem alterar, por si só, os dados armazenados."],
        ["WHERE", "WHERE filtra linhas antes de agrupamentos e funções agregadas."],
        ["GROUP BY", "GROUP BY preserva dimensões enquanto funções agregadas resumem cada grupo."],
        ["HAVING", "HAVING filtra grupos depois que a agregação foi calculada."],
        ["JOIN", "JOIN combina tabelas; a cardinalidade das chaves determina se linhas serão multiplicadas."],
        ["LEFT JOIN", "LEFT JOIN preserva todas as linhas da esquerda e adiciona correspondências da direita."],
        ["CTE", "CTEs nomeiam resultados intermediários e tornam etapas complexas mais legíveis."],
        ["funções de janela", "Funções de janela calculam ranking, acumulado ou média sem colapsar linhas."],
      ],
    },
    {
      trilha: "Python/Pandas", disciplina: "Python/Pandas", nivel: "iniciante a intermediário",
      fonte: "pandas Documentation", link: "https://pandas.pydata.org/docs/",
      topics: [
        ["read_csv", "read_csv carrega CSV e permite controlar separador, tipos, datas e valores ausentes."],
        ["DataFrame", "DataFrame representa dados tabulares com linhas, colunas, índice e tipos por coluna."],
        ["filtros booleanos", "Máscaras booleanas selecionam linhas que satisfazem condições explícitas."],
        ["loc e iloc", "loc seleciona por rótulos; iloc seleciona por posições inteiras."],
        ["groupby", "groupby separa dados por chaves e aplica agregações a cada grupo."],
        ["merge", "merge combina DataFrames por chaves e permite validar a cardinalidade esperada."],
        ["drop_duplicates", "drop_duplicates remove duplicidades conforme o subconjunto de colunas escolhido."],
        ["to_datetime", "to_datetime converte datas para filtros, ordenação e intervalos confiáveis."],
      ],
    },
    {
      trilha: "Power BI e DAX", disciplina: "Power BI/DAX", nivel: "intermediário",
      fonte: "Microsoft Learn — documentação do Power BI", link: "https://learn.microsoft.com/en-us/power-bi/",
      topics: [
        ["Power Query", "Power Query executa etapas reproduzíveis de conexão, limpeza e transformação antes da carga no modelo."],
        ["modelo estrela", "O modelo estrela separa fatos e dimensões para filtros previsíveis e análise eficiente."],
        ["relacionamentos", "Cardinalidade e direção de filtro controlam como tabelas afetam medidas."],
        ["medidas", "Medidas DAX são avaliadas no contexto de filtro em vez de gravar valores por linha."],
        ["CALCULATE", "CALCULATE avalia uma expressão em um contexto de filtro modificado."],
        ["SUMX", "SUMX percorre uma tabela, avalia uma expressão por linha e soma os resultados."],
        ["DISTINCTCOUNT", "DISTINCTCOUNT conta valores únicos e diferencia linhas de entidades."],
        ["storytelling", "Storytelling organiza perguntas, visuais, contexto e destaque para apoiar decisões."],
      ],
    },
    {
      trilha: "Modelagem de Dados", disciplina: "Modelagem", nivel: "intermediário",
      fonte: "Microsoft Learn — modelagem dimensional", link: "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
      topics: [
        ["tabela fato", "Uma tabela fato armazena eventos mensuráveis em uma granularidade declarada."],
        ["dimensão", "Dimensões descrevem contexto como tempo, cliente, produto, setor ou técnico."],
        ["granularidade", "Misturar granularidades pode duplicar medidas e tornar relações ambíguas."],
        ["relacionamento 1:N", "Relacionamentos 1:N ligam uma chave única da dimensão às ocorrências da fato."],
        ["relacionamento N:N", "Relações muitos-para-muitos exigem entender filtros e, muitas vezes, uma ponte."],
        ["chave substituta", "Uma chave substituta é técnica, sem significado descritivo, e estabiliza relações quando chaves naturais mudam."],
        ["normalização", "Normalização reduz redundância e anomalias em modelos transacionais."],
        ["desnormalização", "Desnormalização controlada pode simplificar leituras com custo de redundância."],
      ],
    },
    {
      trilha: "ETL, ELT e Engenharia de Dados", disciplina: "Engenharia de Dados", nivel: "intermediário",
      fonte: "Microsoft Learn — carreira de engenharia de dados", link: "https://learn.microsoft.com/en-us/training/career-paths/data-engineer",
      topics: [
        ["ETL", "ETL transforma os dados antes de carregá-los no destino de consumo."],
        ["ELT", "ELT carrega no destino e usa a capacidade da plataforma para transformar."],
        ["pipeline", "Uma pipeline orquestra ingestão, validação, transformação, carga e falhas."],
        ["carga incremental", "Carga incremental processa registros novos ou alterados usando uma marca confiável."],
        ["particionamento", "Particionamento deve refletir padrões de leitura e evitar fragmentação excessiva."],
        ["lakehouse", "Lakehouse combina armazenamento aberto com tabelas e mecanismos analíticos."],
        ["bronze, silver e gold", "Bronze preserva a origem, silver valida e gold oferece produtos de negócio."],
        ["monitoramento", "Logs, métricas e alertas evitam consumo de dados atrasados ou incompletos."],
      ],
    },
    {
      trilha: "Microsoft Fabric e DP-600", disciplina: "Fabric/DP-600", nivel: "intermediário a avançado",
      fonte: "Microsoft Learn — documentação do Fabric", link: "https://learn.microsoft.com/en-us/fabric/",
      topics: [
        ["OneLake", "OneLake fornece a camada lógica de armazenamento unificado dos workspaces."],
        ["Lakehouse", "Lakehouses combinam arquivos e tabelas Delta com acesso Spark e SQL."],
        ["Warehouse", "Warehouses atendem cenários relacionais analíticos e consultas T-SQL."],
        ["modelo semântico", "Modelos semânticos centralizam medidas, relações e segurança para Power BI."],
        ["Dataflows Gen2", "Dataflows Gen2 usam Power Query para transformações e destinos reutilizáveis."],
        ["Direct Lake", "Direct Lake consulta Delta no OneLake sem importação tradicional completa."],
        ["shortcuts", "Shortcuts referenciam dados compatíveis sem nova cópia física no destino."],
        ["deployment pipelines", "Deployment pipelines promovem itens entre estágios e comparam mudanças."],
      ],
    },
    {
      trilha: "Analytics e Negócio", disciplina: "Analytics", nivel: "iniciante a intermediário",
      fonte: "Microsoft Learn — dashboards do Power BI", link: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards",
      topics: [
        ["SLA", "Um SLA define nível de serviço, início, fim, pausas, calendário e elegibilidade; um indicador mede seu cumprimento."],
        ["produtividade", "Produtividade relaciona volume, tempo, capacidade e qualidade do resultado."],
        ["churn", "Churn mede perdas dentro de uma população e janela temporal definidas."],
        ["coorte", "Coortes acompanham grupos com origem comum ao longo de períodos comparáveis."],
        ["ticket médio", "Ticket médio por pedido divide a receita líquida pelos pedidos válidos; receita média por cliente é outro indicador."],
        ["funil", "Um funil mostra quantidades e conversão entre etapas de uma jornada."],
        ["estoque", "Análise de estoque combina giro, cobertura, ruptura, prazo e criticidade."],
        ["pergunta de negócio", "Uma boa análise começa com pergunta, métrica verificável e ação possível."],
      ],
    },
  ];

  const academyTopicReferences = {
    "Fundamentos de Dados::qualidade de dados": ["Microsoft Purview — dimensões de qualidade de dados", "https://learn.microsoft.com/en-us/purview/unified-catalog-reports-data-quality-health"],
    "Fundamentos de Dados::dados nulos": ["Microsoft Purview — completude e valores ausentes", "https://learn.microsoft.com/en-us/purview/unified-catalog-reports-data-quality-health"],
    "Fundamentos de Dados::duplicidade": ["Microsoft Purview — dimensão de unicidade", "https://learn.microsoft.com/en-us/purview/unified-catalog-reports-data-quality-health"],
    "Fundamentos de Dados::outliers": ["NIST/SEMATECH — análise exploratória e outliers", "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h.htm"],
    "Fundamentos de Dados::granularidade": ["Microsoft Learn — granularidade em esquema estrela", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"],
    "Fundamentos de Dados::KPIs": ["Microsoft Learn — indicadores KPI no Power BI", "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-kpi"],
    "Fundamentos de Dados::dado, informação e insight": ["Microsoft Learn — insights em relatórios Power BI", "https://learn.microsoft.com/en-us/power-bi/create-reports/insights"],
    "ETL, ELT e Engenharia de Dados::ETL": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "ETL, ELT e Engenharia de Dados::ELT": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "ETL, ELT e Engenharia de Dados::pipeline": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "ETL, ELT e Engenharia de Dados::carga incremental": ["Microsoft Learn — atualização incremental em dataflows", "https://learn.microsoft.com/en-us/power-query/dataflows/incremental-refresh"],
    "ETL, ELT e Engenharia de Dados::particionamento": ["Microsoft Fabric — particionamento e desempenho", "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-understand-storage"],
    "ETL, ELT e Engenharia de Dados::lakehouse": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "ETL, ELT e Engenharia de Dados::bronze, silver e gold": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "ETL, ELT e Engenharia de Dados::monitoramento": ["Microsoft Fabric — documentação de engenharia de dados", "https://learn.microsoft.com/en-us/fabric/data-engineering/"],
    "Analytics e Negócio::SLA": ["Microsoft Learn — definição e condições de SLA", "https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/create-standard-sla"],
    "Analytics e Negócio::produtividade": ["Microsoft Learn — indicadores KPI no Power BI", "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-kpi"],
    "Analytics e Negócio::churn": ["Microsoft Learn — retenção, churn e coortes", "https://learn.microsoft.com/en-us/kusto/query/user-analytics?view=microsoft-fabric"],
    "Analytics e Negócio::coorte": ["Microsoft Learn — retenção, churn e coortes", "https://learn.microsoft.com/en-us/kusto/query/user-analytics?view=microsoft-fabric"],
    "Analytics e Negócio::ticket médio": ["Microsoft Learn — KPIs e medidas de vendas", "https://learn.microsoft.com/en-us/dynamics365/business-central/sales-powerbi-sales-kpis"],
    "Analytics e Negócio::funil": ["Microsoft Learn — gráficos de funil no Power BI", "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-funnel-charts"],
    "Analytics e Negócio::estoque": ["Microsoft Learn — KPIs financeiros e giro de estoque", "https://learn.microsoft.com/en-gb/dynamics365/business-central/finance-powerbi-kpis"],
    "Analytics e Negócio::pergunta de negócio": ["Microsoft Learn — indicadores KPI no Power BI", "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-kpi"],
  };

  function academyReference(spec, assunto) {
    return academyTopicReferences[`${spec.trilha}::${assunto}`]
      || [spec.fonte, spec.link];
  }

  const academyFalseStatements = {
    "Fundamentos de Dados": {
      "tipos de dados": "Armazenar datas e valores numéricos como texto não afeta ordenação, cálculo ou validação.",
      "qualidade de dados": "Atingir 100% de completude também comprova validade, consistência, unicidade e atualidade.",
      "dados nulos": "Todo valor nulo representa zero e deve ser preenchido antes de investigar sua origem.",
      duplicidade: "Linhas duplicadas não alteram contagens, somas nem taxas calculadas sobre a base.",
      outliers: "Todo outlier é erro e deve ser removido automaticamente antes de conversar com a área responsável.",
      granularidade: "O significado de uma métrica permanece igual quando cada linha muda de pedido para item de pedido.",
      KPIs: "Um número se torna KPI mesmo sem objetivo, período, meta ou responsável associados.",
      "dado, informação e insight": "Um registro isolado já constitui insight e determina sozinho qual ação deve ser tomada.",
    },
    "SQL para Análise": {
      SELECT: "SELECT altera permanentemente os valores das colunas listadas sempre que a consulta é executada.",
      WHERE: "WHERE filtra os grupos somente depois que GROUP BY e as agregações terminam.",
      "GROUP BY": "GROUP BY serve apenas para ordenar o resultado e não define grupos para agregação.",
      HAVING: "HAVING filtra cada linha da tabela antes da formação dos grupos.",
      JOIN: "A condição de JOIN não pode multiplicar linhas, ainda que uma chave tenha várias correspondências.",
      "LEFT JOIN": "LEFT JOIN descarta as linhas da tabela esquerda que não têm correspondência na direita.",
      CTE: "Uma CTE cria obrigatoriamente uma tabela permanente que permanece após o fim da consulta.",
      "funções de janela": "Funções de janela reduzem cada partição a uma única linha, como um GROUP BY convencional.",
    },
    "Python/Pandas": {
      read_csv: "read_csv identifica corretamente todos os tipos e separadores sem que parâmetros ou validação sejam necessários.",
      DataFrame: "Um DataFrame não possui índice nem tipos por coluna; ele é apenas uma lista comum do Python.",
      "filtros booleanos": "Uma máscara booleana altera definitivamente as linhas do DataFrame original ao ser avaliada.",
      "loc e iloc": "loc seleciona exclusivamente por posição inteira, enquanto iloc usa rótulos do índice.",
      groupby: "groupby apenas ordena as linhas e não permite calcular agregações por categoria.",
      merge: "merge combina linhas sempre pela posição e ignora as chaves informadas no parâmetro on.",
      drop_duplicates: "drop_duplicates consegue identificar entidades duplicadas sem que se definam as colunas de unicidade.",
      to_datetime: "to_datetime converte texto inválido em uma data válida em vez de sinalizar erro ou NaT.",
    },
    "Power BI e DAX": {
      "Power Query": "Power Query executa suas transformações depois que um visual aplica o contexto de filtro DAX.",
      "modelo estrela": "Um modelo estrela dispensa relacionamentos entre dimensões e fatos para propagar filtros.",
      relacionamentos: "Cardinalidade e direção de filtro não alteram o resultado das medidas.",
      medidas: "Uma medida DAX grava antecipadamente um valor fixo em cada linha da tabela.",
      CALCULATE: "CALCULATE avalia a expressão sem adicionar, remover ou substituir filtros.",
      SUMX: "SUMX soma uma coluna pronta sem avaliar uma expressão para cada linha da tabela.",
      DISTINCTCOUNT: "DISTINCTCOUNT conta todas as linhas, inclusive repetições do mesmo valor.",
      storytelling: "Storytelling consiste apenas em decorar o relatório e dispensa pergunta de negócio ou sequência narrativa.",
    },
    "Modelagem de Dados": {
      "tabela fato": "Uma tabela fato pode misturar eventos em granularidades diferentes sem afetar suas medidas.",
      dimensão: "Uma dimensão deve armazenar principalmente os valores numéricos de cada evento transacional.",
      granularidade: "A granularidade pode ser definida depois dos relacionamentos porque não interfere nas agregações.",
      "relacionamento 1:N": "No lado 1 de uma relação 1:N, a chave pode se repetir livremente sem criar ambiguidade.",
      "relacionamento N:N": "Relações N:N nunca exigem ponte nem análise da propagação de filtros.",
      "chave substituta": "Uma chave substituta deve carregar significado de negócio e mudar sempre que um atributo descritivo mudar.",
      normalização: "Normalização aumenta deliberadamente a redundância para repetir todos os atributos em cada tabela.",
      desnormalização: "Desnormalizar não cria redundância nem exige controlar atualização dos atributos repetidos.",
    },
    "ETL, ELT e Engenharia de Dados": {
      ETL: "No ETL, a carga no destino antecede a etapa de transformação.",
      ELT: "No ELT, a transformação termina na origem antes da carga na plataforma de destino.",
      pipeline: "Uma pipeline bem-sucedida dispensa dependências, retentativas, validações e alertas.",
      "carga incremental": "Carga incremental processa apenas inserções e pode ignorar atualizações ou registros atrasados.",
      particionamento: "Criar uma partição por linha sempre reduz custo de leitura e simplifica manutenção.",
      lakehouse: "Um lakehouse aceita apenas tabelas relacionais e não trabalha com arquivos ou mecanismos Spark.",
      "bronze, silver e gold": "A camada bronze deve conter somente métricas finais já agregadas para o relatório.",
      monitoramento: "Status de sucesso prova que volume, qualidade e prazo foram atendidos, sem necessidade de outras métricas.",
    },
    "Microsoft Fabric e DP-600": {
      OneLake: "O OneLake exige uma conta de armazenamento isolada e sem compartilhamento para cada item do Fabric.",
      Lakehouse: "Um lakehouse no Fabric não oferece tabelas Delta nem endpoint analítico SQL.",
      Warehouse: "O Warehouse do Fabric é destinado apenas a arquivos brutos e não aceita consultas T-SQL.",
      "modelo semântico": "O modelo semântico funciona sem relacionamentos, medidas ou regras de segurança.",
      "Dataflows Gen2": "Dataflows Gen2 servem somente para desenhar visuais e não gravam dados em destinos.",
      "Direct Lake": "Direct Lake exige exportar tabelas Delta para CSV antes de atualizar o modelo.",
      shortcuts: "Criar um shortcut move os dados para o workspace de destino e apaga a origem.",
      "deployment pipelines": "Deployment pipelines concedem permissões automaticamente e dispensam validar dependências entre estágios.",
    },
    "Analytics e Negócio": {
      SLA: "A taxa de conformidade ao SLA permanece comparável quando relatórios adotam início, pausas, calendário e população elegível diferentes.",
      produtividade: "Produtividade deve considerar apenas volume e ignorar tempo, capacidade, qualidade e retrabalho.",
      churn: "Churn corresponde ao número de novos clientes adquiridos, sem relação com perdas no período.",
      coorte: "Uma análise de coorte mistura todos os usuários e descarta o período ou evento de entrada.",
      "ticket médio": "Ticket médio por pedido usa a quantidade de clientes como denominador, ainda que um cliente faça vários pedidos.",
      funil: "As taxas entre etapas de um funil podem usar populações diferentes sem documentar os critérios.",
      estoque: "Cobertura, giro e ruptura são equivalentes e podem compartilhar a mesma fórmula.",
      "pergunta de negócio": "Uma boa pergunta de negócio dispensa métrica verificável, ação possível e responsável pela decisão.",
    },
  };

  function academyFalse(track, assunto) {
    return academyFalseStatements[track]?.[assunto]
      || `Em ${assunto}, a validação pode ser omitida sem afetar a qualidade do resultado.`;
  }

  const academyArtifacts = {
    "Fundamentos de Dados": {
      "tipos de dados": "id: inteiro | categoria: texto | data_evento: data | valor: decimal",
      "qualidade de dados": "completude=96% | validade=98% | duplicidade=2% | atualização=D-1",
      "dados nulos": "tempo_resolucao=NULL quando status='aberto' | responsável=NULL em 4% das linhas",
      duplicidade: "pedido_id=1042 aparece 3 vezes | chave de negócio: pedido_id + item_id",
      outliers: "tempo_minutos: P25=12 | mediana=24 | P75=41 | máximo=1440",
      granularidade: "cada linha representa um item de pedido | pedido_id pode aparecer em várias linhas",
      KPIs: "KPI: taxa de atendimento no prazo | numerador, denominador, janela e meta documentados",
      "dado, informação e insight": "registro: 37 chamados | contexto: +18% no mês | decisão: revisar escala do turno",
    },
    "SQL para Análise": {
      SELECT: "SELECT chamado_id, setor, abertura FROM chamados;",
      WHERE: "SELECT * FROM chamados WHERE status = 'aberto' AND abertura >= DATE '2026-08-01';",
      "GROUP BY": "SELECT setor, COUNT(*) AS total FROM chamados GROUP BY setor;",
      HAVING: "SELECT setor, COUNT(*) AS total FROM chamados GROUP BY setor HAVING COUNT(*) >= 10;",
      JOIN: "SELECT p.id, c.nome FROM pedidos p JOIN clientes c ON c.id = p.cliente_id;",
      "LEFT JOIN": "SELECT c.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id WHERE p.id IS NULL;",
      CTE: "WITH atrasados AS (SELECT * FROM chamados WHERE prazo < CURRENT_DATE) SELECT setor, COUNT(*) FROM atrasados GROUP BY setor;",
      "funções de janela": "SELECT setor, valor, ROW_NUMBER() OVER (PARTITION BY setor ORDER BY valor DESC) AS posição FROM vendas;",
    },
    "Python/Pandas": {
      read_csv: "df = pd.read_csv('chamados.csv', sep=';', parse_dates=['abertura'])",
      DataFrame: "df = pd.DataFrame({'setor': ['TI', 'RH'], 'total': [12, 8]})",
      "filtros booleanos": "abertos = df.loc[(df['status'] == 'aberto') & (df['prioridade'] == 'alta')]",
      "loc e iloc": "por_rotulo = df.loc[10, 'setor']\npor_posicao = df.iloc[0, 2]",
      groupby: "resultado = df.groupby('setor', as_index=False)['valor'].sum()",
      merge: "base = pedidos.merge(clientes, on='cliente_id', how='left', validate='many_to_one')",
      drop_duplicates: "unicos = df.drop_duplicates(subset=['pedido_id', 'item_id'], keep='last')",
      to_datetime: "df['abertura'] = pd.to_datetime(df['abertura'], errors='coerce', dayfirst=True)",
    },
    "Power BI e DAX": {
      "Power Query": "let Fonte = Excel.Workbook(File.Contents(\"vendas.xlsx\"), null, true), Vendas = Fonte{[Item=\"Vendas\", Kind=\"Table\"]}[Data], Tipos = Table.TransformColumnTypes(Vendas, {{\"Data\", type date}}) in Tipos",
      "modelo estrela": "DimData (1) -> (*) FatoVendas (*) <- (1) DimProduto",
      relacionamentos: "DimCliente[ClienteId] (1) -> (*) FatoVendas[ClienteId] | filtro em uma direção",
      medidas: "Receita = SUM(FatoVendas[Valor])",
      CALCULATE: "Receita Ativa = CALCULATE([Receita], DimCliente[Status] = \"Ativo\")",
      SUMX: "Receita = SUMX(FatoItens, FatoItens[Quantidade] * FatoItens[PreçoUnitário])",
      DISTINCTCOUNT: "Clientes Distintos = DISTINCTCOUNT(FatoVendas[ClienteId])",
      storytelling: "pergunta -> KPI principal -> tendência -> detalhamento -> ação recomendada",
    },
    "Modelagem de Dados": {
      "tabela fato": "FatoVendas: DataKey | ProdutoKey | ClienteKey | Quantidade | Valor | grão=item vendido",
      dimensão: "DimProduto: ProdutoKey | Código | Categoria | Marca | Vigência",
      granularidade: "FatoChamadoDiário: uma linha por chamado por dia | FatoChamado: uma linha por chamado",
      "relacionamento 1:N": "DimCliente[ClienteKey] (1) -> (*) FatoVendas[ClienteKey]",
      "relacionamento N:N": "DimConsultor (1) -> (*) PonteConsultorConta (*) <- (1) DimConta",
      "chave substituta": "ProdutoKey=58123 | CódigoNatural='ABC-19' | DataInício | DataFim",
      normalização: "Pedido -> Cliente | PedidoItem -> Produto | cada atributo depende de sua chave",
      desnormalização: "Produto inclui CategoriaNome para leitura analítica | redundância controlada no processo de carga",
    },
    "ETL, ELT e Engenharia de Dados": {
      ETL: "origem -> extrair -> validar e transformar -> carregar no destino",
      ELT: "origem -> extrair -> carregar no lakehouse -> transformar no destino",
      pipeline: "ingestão -> teste de qualidade -> transformação -> publicação -> alerta",
      "carga incremental": "watermark anterior=2026-08-19T23:59:59 | filtrar updated_at > watermark",
      particionamento: "path=/vendas/ano=2026/mes=08/ | consultas filtram principalmente data_venda",
      lakehouse: "arquivos brutos + tabelas Delta + processamento Spark + endpoint SQL",
      "bronze, silver e gold": "bronze/original -> silver/validado e deduplicado -> gold/métrica de negócio",
      monitoramento: "execução=8421 | lidas=10000 | gravadas=9800 | rejeitadas=200 | duração=7m12s",
    },
    "Microsoft Fabric e DP-600": {
      OneLake: "workspace A --shortcut--> tabela Delta mantida pelo workspace B no OneLake",
      Lakehouse: "Files/raw/*.parquet -> Tables/Vendas (Delta) -> SQL analytics endpoint",
      Warehouse: "DimData + DimProduto + FatoVendas | consultas T-SQL e segurança SQL",
      "modelo semântico": "dimensões -> fatos -> medidas DAX -> RLS -> relatório Power BI",
      "Dataflows Gen2": "fonte -> etapas Power Query -> destino Lakehouse/TabelaClientes",
      "Direct Lake": "modelo semântico --Direct Lake--> tabelas Delta no OneLake",
      shortcuts: "Lakehouse/Files/externo é referência à origem; nenhum arquivo é copiado para o destino",
      "deployment pipelines": "Development -> Test -> Production | comparar itens e regras de implantação",
    },
    "Analytics e Negócio": {
      SLA: "Conformidade ao SLA (%) = atendimentos concluídos no prazo / atendimentos elegíveis * 100",
      produtividade: "entregas válidas / horas disponíveis | acompanhar também retrabalho e qualidade",
      churn: "clientes perdidos no período / clientes ativos no início do período",
      coorte: "mês de entrada x meses desde a entrada x percentual retido",
      "ticket médio": "receita líquida / pedidos válidos no período",
      funil: "visitas=10000 -> cadastros=2200 -> propostas=750 -> contratos=180",
      estoque: "giro=consumo/estoque médio | cobertura=estoque atual/consumo diário | ruptura=3,2%",
      "pergunta de negócio": "pergunta: quais atrasos podem ser reduzidos? | métrica | segmento | decisão | responsável",
    },
  };

  function academyArtifact(track, assunto) {
    return academyArtifacts[track]?.[assunto]
      || `Cenário de ${assunto}: entrada, regra de processamento, resultado esperado e teste de validação.`;
  }

  const academyCodeExercises = {
    "SQL para Análise::SELECT": {
      prompt: "Escreva uma consulta que retorne chamado_id, setor e abertura, sem alterar a tabela.",
      code: "Tabela: chamados(chamado_id, setor, abertura, status, prazo)",
      expected: "SELECT chamado_id, setor, abertura FROM chamados; Valide nomes, ordem e quantidade de colunas em uma amostra conhecida.",
    },
    "SQL para Análise::WHERE": {
      prompt: "Consulte os chamados abertos desde 1º de agosto de 2026.",
      code: "Tabela: chamados(status, abertura, setor) | parâmetros: status='aberto', data inicial=2026-08-01",
      expected: "SELECT * FROM chamados WHERE status = 'aberto' AND abertura >= DATE '2026-08-01'; Valide casos na fronteira da data e outros status.",
    },
    "SQL para Análise::GROUP BY": {
      prompt: "Produza a quantidade de chamados por setor.",
      code: "Tabela: chamados(chamado_id, setor) | saída: setor, total",
      expected: "SELECT setor, COUNT(*) AS total FROM chamados GROUP BY setor; Compare a soma dos totais com a contagem da tabela.",
    },
    "SQL para Análise::HAVING": {
      prompt: "Liste apenas setores com dez ou mais chamados.",
      code: "Tabela: chamados(chamado_id, setor) | saída: setor, total | corte: total >= 10",
      expected: "SELECT setor, COUNT(*) AS total FROM chamados GROUP BY setor HAVING COUNT(*) >= 10; Teste grupos com 9, 10 e 11 linhas.",
    },
    "SQL para Análise::JOIN": {
      prompt: "Retorne o id do pedido e o nome do cliente correspondente.",
      code: "pedidos(id, cliente_id) | clientes(id, nome) | relação: pedidos.cliente_id = clientes.id",
      expected: "SELECT p.id, c.nome FROM pedidos p JOIN clientes c ON c.id = p.cliente_id; Valide a cardinalidade e pedidos com chave inválida.",
    },
    "SQL para Análise::LEFT JOIN": {
      prompt: "Encontre clientes que não possuem pedido correspondente.",
      code: "clientes(id) | pedidos(id, cliente_id) | preservar todos os clientes",
      expected: "SELECT c.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id WHERE p.id IS NULL; Valide com clientes com zero, um e vários pedidos.",
    },
    "SQL para Análise::CTE": {
      prompt: "Use uma CTE para contar, por setor, chamados cujo prazo já venceu.",
      code: "chamados(setor, prazo) | atrasado quando prazo < CURRENT_DATE",
      expected: "WITH atrasados AS (SELECT * FROM chamados WHERE prazo < CURRENT_DATE) SELECT setor, COUNT(*) FROM atrasados GROUP BY setor; Compare com uma consulta direta equivalente.",
    },
    "SQL para Análise::funções de janela": {
      prompt: "Numere as vendas de cada setor da maior para a menor, preservando todas as linhas.",
      code: "vendas(setor, valor) | saída: setor, valor, posição",
      expected: "SELECT setor, valor, ROW_NUMBER() OVER (PARTITION BY setor ORDER BY valor DESC) AS posição FROM vendas; Teste empates e reinício da numeração por setor.",
    },
    "Python/Pandas::read_csv": {
      prompt: "Complete a leitura de chamados.csv usando ponto e vírgula e convertendo abertura em data.",
      code: "import pandas as pd\n# TODO: carregar chamados.csv; separador=';'; coluna de data='abertura'",
      expected: "df = pd.read_csv('chamados.csv', sep=';', parse_dates=['abertura'])\nValide df.dtypes, número de linhas e datas inválidas.",
    },
    "Python/Pandas::DataFrame": {
      prompt: "Crie um DataFrame com os setores TI e RH e totais 12 e 8.",
      code: "import pandas as pd\nsetores = ['TI', 'RH']\ntotais = [12, 8]\n# TODO: construir df",
      expected: "df = pd.DataFrame({'setor': setores, 'total': totais})\nValide df.shape == (2, 2), nomes das colunas e valores.",
    },
    "Python/Pandas::filtros booleanos": {
      prompt: "Selecione chamados simultaneamente abertos e de prioridade alta.",
      code: "# df contém as colunas status e prioridade\n# TODO: criar o DataFrame abertos",
      expected: "abertos = df.loc[(df['status'] == 'aberto') & (df['prioridade'] == 'alta')]\nValide que nenhuma linha resultante viola uma das duas condições.",
    },
    "Python/Pandas::loc e iloc": {
      prompt: "Leia setor pelo rótulo 10 e a célula da primeira linha/terceira coluna por posição.",
      code: "# df possui índice rotulado e pelo menos três colunas\n# TODO: criar por_rotulo e por_posicao",
      expected: "por_rotulo = df.loc[10, 'setor']\npor_posicao = df.iloc[0, 2]\nValide com índice não sequencial para comprovar a diferença entre rótulo e posição.",
    },
    "Python/Pandas::groupby": {
      prompt: "Some valor por setor e mantenha setor como coluna do resultado.",
      code: "# df contém setor e valor\n# TODO: criar resultado agregado",
      expected: "resultado = df.groupby('setor', as_index=False)['valor'].sum()\nCompare a soma total antes e depois da agregação.",
    },
    "Python/Pandas::merge": {
      prompt: "Associe pedidos a clientes por cliente_id preservando pedidos e validando muitos-para-um.",
      code: "# pedidos e clientes possuem cliente_id\n# TODO: criar base combinada",
      expected: "base = pedidos.merge(clientes, on='cliente_id', how='left', validate='many_to_one')\nValide quantidade de pedidos, chaves sem correspondência e duplicidade na dimensão.",
    },
    "Python/Pandas::drop_duplicates": {
      prompt: "Mantenha a ocorrência mais recente de cada par pedido_id e item_id.",
      code: "# df contém pedido_id, item_id e está ordenado do mais antigo ao mais recente\n# TODO: criar unicos",
      expected: "unicos = df.drop_duplicates(subset=['pedido_id', 'item_id'], keep='last')\nValide unicidade da chave composta e quais linhas foram removidas.",
    },
    "Python/Pandas::to_datetime": {
      prompt: "Converta abertura para data no formato dia primeiro e transforme textos inválidos em NaT.",
      code: "# df['abertura'] contém textos de data\n# TODO: converter a coluna",
      expected: "df['abertura'] = pd.to_datetime(df['abertura'], errors='coerce', dayfirst=True)\nConte NaT e teste datas ambíguas antes de publicar.",
    },
    "Power BI e DAX::medidas": {
      prompt: "Crie a medida Receita somando FatoVendas[Valor] e explique o teste por filtro.",
      code: "Modelo: FatoVendas[Valor] | nome esperado: Receita | TODO: escrever a medida",
      expected: "Receita = SUM(FatoVendas[Valor])\nValide o total sem filtro e por produto/data para confirmar a propagação do contexto.",
    },
    "Power BI e DAX::CALCULATE": {
      prompt: "Crie Receita Ativa restringindo a medida Receita a clientes com status Ativo.",
      code: "Medida existente: [Receita] | filtro: DimCliente[Status] = \"Ativo\" | TODO: escrever a medida",
      expected: "Receita Ativa = CALCULATE([Receita], DimCliente[Status] = \"Ativo\")\nValide com uma tabela por status e compare com [Receita].",
    },
    "Power BI e DAX::SUMX": {
      prompt: "Calcule Receita multiplicando quantidade por preço unitário em cada linha de FatoItens.",
      code: "FatoItens[Quantidade], FatoItens[PreçoUnitário] | TODO: escrever a medida iteradora",
      expected: "Receita = SUMX(FatoItens, FatoItens[Quantidade] * FatoItens[PreçoUnitário])\nValide com três linhas calculadas manualmente e depois com filtros.",
    },
    "Power BI e DAX::DISTINCTCOUNT": {
      prompt: "Conte os clientes distintos presentes em FatoVendas.",
      code: "Coluna: FatoVendas[ClienteId] | nome esperado: Clientes Distintos | TODO: escrever a medida",
      expected: "Clientes Distintos = DISTINCTCOUNT(FatoVendas[ClienteId])\nValide repetindo um cliente em várias vendas e verificando o tratamento de BLANK.",
    },
  };

  const academyBusinessAnswers = {
    "Fundamentos de Dados::qualidade de dados": "Pergunta-modelo: qual percentual de registros atende simultaneamente às regras obrigatórias de completude, validade e unicidade por fonte? Decisão: priorizar a fonte e a regra com maior impacto no indicador.",
    "Fundamentos de Dados::duplicidade": "Pergunta-modelo: quanto as chaves duplicadas inflam volume, soma e taxa por processo? Decisão: corrigir a origem e deduplicar pela chave de negócio validada.",
    "Fundamentos de Dados::granularidade": "Pergunta-modelo: como o indicador muda quando calculado por item, pedido ou cliente? Decisão: fixar o grão que corresponde à pergunta e impedir dupla contagem.",
    "Fundamentos de Dados::dado, informação e insight": "Pergunta-modelo: qual variação de chamados, em qual turno e período, exige ajuste de escala? Decisão: testar o ajuste no segmento responsável pelo aumento observado.",
    "Modelagem de Dados::dimensão": "Pergunta-modelo: quais atributos de cliente precisam filtrar vendas sem duplicar eventos? Decisão: consolidá-los em uma dimensão com chave única.",
    "Modelagem de Dados::relacionamento 1:N": "Pergunta-modelo: a chave do lado 1 é única e cada fato encontra uma dimensão? Decisão: corrigir duplicidades ou órfãos antes de ativar o relacionamento.",
    "Modelagem de Dados::chave substituta": "Pergunta-modelo: a chave natural muda ou possui versões históricas? Decisão: adotar chave substituta e controlar vigência das versões.",
    "Modelagem de Dados::desnormalização": "Pergunta-modelo: a redução de junções compensa o custo de sincronizar atributos repetidos? Decisão: desnormalizar somente os atributos com benefício medido.",
    "Analytics e Negócio::produtividade": "Pergunta-modelo: quantas entregas válidas são concluídas por hora disponível, por equipe, incluindo retrabalho? Decisão: tratar o gargalo sem premiar volume com perda de qualidade.",
    "Analytics e Negócio::coorte": "Pergunta-modelo: qual retenção cada coorte de entrada mantém após 1, 2 e 3 meses? Decisão: investigar o período de entrada cuja curva deteriora mais cedo.",
    "Analytics e Negócio::funil": "Pergunta-modelo: em qual transição do funil ocorre a maior perda relativa usando a mesma população elegível? Decisão: testar melhoria na etapa com maior queda.",
    "Analytics e Negócio::pergunta de negócio": "Pergunta-modelo: quais atrasos elegíveis podem ser reduzidos neste mês, em qual segmento e por qual ação? Decisão: atribuir responsável, meta e prazo ao segmento prioritário.",
  };

  function academyOpenExercise(spec, assunto, conceito, falsa, artefato, tipoAberto) {
    const key = `${spec.trilha}::${assunto}`;
    const codeExercise = academyCodeExercises[key];
    if (codeExercise) {
      return {
        prompt: codeExercise.prompt,
        codigo: codeExercise.code,
        expected: codeExercise.expected,
        comment: `${conceito} A solução-modelo apresenta uma implementação verificável e um teste específico para o resultado.`,
      };
    }

    if (tipoAberto === "businessQuestion") {
      const expected = academyBusinessAnswers[key]
        || `Pergunta-modelo: como ${assunto} varia por período e segmento usando a regra “${artefato}”? Decisão: agir no segmento com maior distância da meta após validar a base.`;
      return {
        prompt: `Formule uma pergunta mensurável sobre ${assunto}, identifique a métrica e associe uma decisão concreta.`,
        codigo: artefato,
        expected,
        comment: `${conceito} A resposta deve ligar população, período, métrica, segmento e decisão; uma pergunta sem ação associada fica incompleta.`,
      };
    }

    if (tipoAberto === "caseStudy") {
      return {
        prompt: `A partir do artefato de ${assunto}, descreva diagnóstico, implementação e monitoramento com um critério de aceite.`,
        codigo: artefato,
        expected: `Diagnóstico: verificar entradas, dependências e risco indicado por “${naturalFalseStatement(falsa)}”. Implementação: aplicar o princípio “${conceito}”. Monitoramento: reconciliar volume, qualidade, duração e resultado esperado em uma amostra conhecida antes da promoção.`,
        comment: `Uma resposta completa separa diagnóstico, mudança, evidência de teste, indicador operacional e condição de aceite para ${assunto}.`,
      };
    }

    return {
      prompt: `Explique ${assunto} com um exemplo extraído do artefato, um risco concreto e um critério de validação.`,
      codigo: artefato,
      expected: `Definição: ${conceito} Exemplo: “${artefato}”. Risco: adotar a interpretação “${naturalFalseStatement(falsa)}”. Validação: preparar um caso conhecido que diferencie as duas interpretações e registrar o resultado esperado.`,
      comment: `A resposta deve conter definição, aplicação no artefato, risco e teste reproduzível; repetir apenas o nome de ${assunto} não demonstra domínio.`,
    };
  }

  function academyOpenType(track, topicIndex, assunto) {
    if (track.includes("SQL")) return "sqlQuery";
    if (track.includes("Power BI")) {
      return ["medidas", "CALCULATE", "SUMX", "DISTINCTCOUNT"].includes(assunto) ? "daxMeasure" : "caseStudy";
    }
    if (track.includes("Python")) return "completeCode";
    if (track.includes("ETL") || track.includes("Fabric")) return "caseStudy";
    return topicIndex % 2 === 0 ? "explainConcept" : "businessQuestion";
  }

  function academyPeerTopics(spec, topicIndex) {
    const current = spec.topics[topicIndex][1];
    return spec.topics
      .map((topic, index) => ({ assunto: topic[0], concept: topic[1], index }))
      .filter(({ concept }) => concept !== current)
      .sort((left, right) => {
        const lengthDifference = Math.abs(left.concept.length - current.length) - Math.abs(right.concept.length - current.length);
        if (lengthDifference !== 0) return lengthDifference;
        return ((left.index - topicIndex + spec.topics.length) % spec.topics.length)
          - ((right.index - topicIndex + spec.topics.length) % spec.topics.length);
      })
      .slice(0, 3);
  }

  function academyDistractors(spec, topicIndex) {
    return academyPeerTopics(spec, topicIndex).map(({ concept }) => concept);
  }

  function generateAcademyBank() {
    let academyIndex = 1;
    for (const spec of academyTracks) {
      spec.topics.forEach(([assunto, conceito], topicIndex) => {
        const peerTopics = academyPeerTopics(spec, topicIndex);
        const distractors = academyDistractors(spec, topicIndex);
        const falsa = naturalFalseStatement(academyFalse(spec.trilha, assunto));
        const codigo = academyArtifact(spec.trilha, assunto);
        const [fonte, link] = academyReference(spec, assunto);
        const truthItems = balancedTruthPair(
          `academia-dados::${spec.trilha}`,
          topicIndex,
          spec.topics.length,
          conceito,
          falsa,
          `${conceito} O princípio deve ser confirmado na entrega com um teste reproduzível.`,
          `${conceito} A afirmação omite fatores que alteram materialmente a qualidade da entrega.`,
        );
        for (let variant = 0; variant < 6; variant += 1) {
          const tipoAberto = academyOpenType(spec.trilha, topicIndex, assunto);
          const base = {
            id: `ACD-${String(academyIndex).padStart(3, "0")}`,
            area: "academia-dados",
            trilha: spec.trilha,
            disciplina: spec.disciplina,
            assunto,
            dificuldade: variantDifficulty[variant],
            fonte,
            link,
            tags: ["academia-dados", slug(spec.trilha), slug(assunto), slug(spec.nivel)],
          };
          academyIndex += 1;
          const explanation = (lead) => `${lead}: ${conceito} Em uma entrega profissional, valide o resultado com amostra conhecida e registre a regra aplicada.`;
          const definitionOptions = scopedOptions(assunto, [conceito, ...distractors], "Definição de");
          const validationOptions = scopedOptions(assunto, [conceito, ...distractors], "Regra de validação para");
          const correctionArtifacts = scopedOptions(assunto, [codigo, ...peerTopics.map((peer) => academyArtifact(spec.trilha, peer.assunto))], "Teste de correção para");
          if (variant === 0) {
            addChoice(base, "multipleChoice", `Na trilha ${spec.trilha}, qual opção delimita ${assunto} sem confundi-lo com outra etapa?`, "", definitionOptions[0], definitionOptions.slice(1), explanation("Fundamento da etapa"));
          } else if (variant === 1) {
            add({ ...base, tipo: "trueFalse", enunciado: `Em uma atividade de ${spec.trilha}, julgue sobre ${assunto}: ${truthItems[0].statement}`, codigo, gabarito: truthItems[0].answer, comentario: truthItems[0].comment });
          } else if (variant === 2) {
            addChoice(base, "codeOutput", `Examine o artefato de ${assunto}. Qual regra deve ser testada para validar sua finalidade principal?`, codigo, validationOptions[0], validationOptions.slice(1), `${explanation("Leitura técnica do artefato")} As demais opções descrevem etapas vizinhas, mas não a finalidade principal indicada.`);
          } else if (variant === 3) {
            const exercise = academyOpenExercise(spec, assunto, conceito, falsa, codigo, tipoAberto);
            add({
              ...base,
              tipo: tipoAberto,
              enunciado: exercise.prompt,
              codigo: exercise.codigo,
              resposta_esperada: exercise.expected,
              comentario: exercise.comment,
            });
          } else if (variant === 4) {
            add({ ...base, tipo: "trueFalse", enunciado: `No exercício de ${assunto} da trilha ${spec.trilha}, julgue: ${truthItems[1].statement}`, codigo, gabarito: truthItems[1].answer, comentario: truthItems[1].comment });
          } else {
            addChoice(base, "findError", `A equipe adotou a conclusão abaixo em ${assunto}. Qual teste deve ser executado primeiro para corrigir o erro?`, `${codigo}\nConclusão: ${falsa}`, correctionArtifacts[0], correctionArtifacts.slice(1), `Correção da etapa: ${conceito} O teste correto reproduz o artefato do próprio tema antes de aceitar a entrega.`);
          }
        }
      });
    }
  }

  generateCertificationBank();
  generateProgrammingBank();
  generateDataBank();
  generateAcademyBank();

  window.QUESTION_BANK = QUESTION_BANK;
})();
