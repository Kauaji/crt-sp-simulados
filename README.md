# Plataforma de Estudos — CRT-SP, Santos IBAM, DP-600, Programação e Dados

Site estático em HTML, CSS e JavaScript puro publicado no Vercel:

```text
https://crt-sp-simulados.vercel.app
```

O foco principal continua sendo o concurso CRT-SP 2026 para Técnico Administrativo, com simulados Certo/Errado no estilo Quadrix. A plataforma também mantém o banco multi-concurso existente e adiciona trilhas de certificações, programação, dados, Academia de Dados e Concursos Santos — IBAM com gamificação local.

## Funcionalidades

- Seleção obrigatória de usuário ao abrir ou recarregar o site: Kauã, Vitória, Caio ou Mequis.
- Dados separados por usuário via `localStorage`.
- Dashboard com foguinho, maior streak, pontos, acessos, média, taxa de acerto e últimas tentativas.
- Ranking dos perfis por pontos, acessos, foguinho, atividades e média.
- Switch animado entre **Concursos públicos** e **Tech**.
- No modo Concursos, a interface fica mais clara e mostra Dashboard, Concursos Santos — IBAM, Estudos e Histórico.
- No modo Tech, a interface fica escura e mostra Dashboard, Certificações, Programação, Dados, Academia de Dados, Estudos e Histórico.
- Botão “Trocar usuário” disponível no topo.
- Botão “Zerar meus dados locais”.
- Recomendações personalizadas com base em erros, brancos e trilhas estudadas.

## Estrutura

```text
crt-sp-simulados/
├── index.html
├── styles.css
├── app.js
├── simulados.js
├── questions-bank.js
├── data/
├── docs/
├── scripts/
│   ├── build.mjs
│   └── rotate-daily-questions.mjs
└── vercel.json
```

## CRT-SP

A aba CRT-SP possui:

- Simulado diário com 40 itens.
- Distribuição: 12 básicos, 8 complementares e 20 específicos.
- Certo, Errado e Em branco.
- Pontuação Quadrix: +1 por acerto, -1 por erro e 0 em branco.
- Seed determinística por data no fuso `America/Sao_Paulo`.
- Gabarito comentado apenas após finalizar.
- Botão “Gerar outro questionário CRT-SP”, evitando repetir exatamente o simulado diário.

## Prova real CRT-SP

Modo com 120 itens:

- 40 conhecimentos básicos.
- 30 conhecimentos complementares.
- 50 conhecimentos específicos.
- Duração sugerida de 3 horas.
- Relatório por bloco/disciplina.
- Mínimos configuráveis:

```js
MINIMOS_PROVA_REAL = { basicos: 10, complementares: 8, especificos: 17, total: 36 }
```

O relatório informa zona segura, atenção ou risco de eliminação.

## Certificações

Trilha inicial:

- Microsoft DP-600 — Fabric Analytics Engineer Associate.

Modos:

- Questões rápidas.
- Simulado 30 questões.
- Revisão por tema.
- Modo difícil.
- Erros frequentes.

O banco usa questões autorais baseadas nos tópicos públicos do guia de estudo da Microsoft Learn, sem copiar questões oficiais protegidas.

## Programação

Subtrilhas iniciais:

- Python.
- SQL.
- Java.
- JavaScript.
- HTML.
- CSS.
- Git/GitHub.
- Lógica.
- Estruturas de dados.

Tipos de treino incluem múltipla escolha, Certo/Errado, saída de código e identificação de erro.

## Dados

Trilhas práticas:

- Fundamentos de Dados.
- SQL para Dados.
- Python para Dados.
- Power BI.
- Engenharia de Dados.
- Analytics e Negócio.
- Desafios práticos.

Inclui cenários sobre qualidade, métricas, joins, pandas, Power BI, modelagem, ETL/ELT e indicadores.

## Tipos de questões

O sistema suporta:

- `trueFalse`
- `multipleChoice`
- `codeOutput`
- `findError`
- `completeCode`
- `explainCode`
- `sqlQuery`
- `daxMeasure`
- `caseStudy`
- `orderSteps`

Correção automática completa na primeira versão:

- `trueFalse`
- `multipleChoice`
- `codeOutput`
- `findError`

Tipos abertos são exibidos em `textarea` e preparados para autoavaliação.

## Rotação

A função principal é:

```js
selectRotatingQuestions({ pool, count, difficulty, seedKey, avoidIds })
```

Ela:

- usa seed por data, usuário, trilha, dificuldade e tentativa;
- evita IDs recentes salvos por usuário;
- permite repetição quando o banco filtrado é pequeno;
- usa dificuldade Fácil, Médio, Difícil ou Misto.

O simulado diário CRT-SP usa seed por data para manter o mesmo conjunto durante todo o dia.

Além disso, o repositório mantém a rotação agendada em GitHub Actions para os arquivos:

- `data/daily-selection.json`
- `data/daily-history.json`

## Banco de questões

Arquivos:

- `simulados.js`: banco CRT-SP e concursos existentes.
- `questions-bank.js`: banco de certificações, Programação, Dados e Academia de Dados.
- `santos-ibam-bank.js`: banco e metadados dos concursos Santos — IBAM.

Quantidade atual usada pela plataforma (2.143 itens ativos):

- Banco principal: 685 questões em `simulados.js`, incluindo 180 registros CRT-SP, 205 IBGE, 180 Santos e 120 PM-SP.
- Certificações: 360 questões distribuídas entre DP-600, PL-300, AZ-900, PL-900, DP-900 e DP-700.
- Programação: 192 questões.
- Dados: 192 questões.
- Academia de Dados: 384 questões, 48 em cada uma das oito trilhas.
- Santos IBAM: 100 questões para Agente de Portaria, 100 para Inspetor de Alunos e 120 objetivas + 10 propostas de redação para Oficial de Administração.

## Auditoria de qualidade

Execute a auditoria completa do banco com:

```bash
npm run audit:questions
```

Ela bloqueia IDs ou conteúdos duplicados, gabaritos inválidos ou concentrados, alternativas repetidas, textos corrompidos ou sem acentuação, explicações insuficientes, pistas pelo tamanho da resposta, pools menores que o questionário e distribuições incompatíveis com a prova. O comando também roda automaticamente antes de `npm run build`.

## Academia de Dados

A aba Academia de Dados é uma área prática para preparação de estágio/júnior em dados. Ela não é só um quiz: combina treinos, desafios, perguntas de raciocínio, análise de código, correção de erro, estudos de caso e projetos.

Trilhas:

- Fundamentos de Dados.
- SQL para Análise.
- Python/Pandas.
- Power BI e DAX.
- Modelagem de Dados.
- ETL, ELT e Engenharia de Dados.
- Microsoft Fabric e DP-600.
- Analytics e Negócio.
- Desafios de Portfólio.
- Revisão Inteligente.

Modos:

- Treino rápido: 10 questões mistas.
- Treino por trilha: 10, 20 ou 40 questões.
- Desafio prático: estudos de caso e questões abertas.
- Modo entrevista: explicação de conceitos, código e decisões.
- Modo erro: prioriza assuntos com mais erro no histórico.
- Modo portfólio: sugere atividade prática e como explicar no GitHub/LinkedIn.

O mini-dashboard mostra:

- trilha mais estudada;
- melhor trilha;
- trilha com mais erros;
- total respondido;
- taxa de acerto;
- último treino;
- recomendação do próximo treino;
- progresso por trilha.

Projetos sugeridos:

- Dashboard de chamados de TI.
- Análise de ordens de serviço.
- Inventário de máquinas.
- Análise de derrotas do Santos.
- Análise de estoque.
- Dashboard de estudos.

## Concursos Santos — IBAM

A aba **Concursos Santos — IBAM** cobre três cargos da Prefeitura de Santos:

- **Agente de Portaria** — Edital nº 73/2026 — SEPLA-RH — código 601.
- **Inspetor de Alunos** — Edital nº 73/2026 — SEPLA-RH — código 606.
- **Oficial de Administração** — Edital nº 71/2026 — SEPLA-RH — código 1101.

O banco dedicado combina questões autorais com **60 adaptações inéditas de provas anteriores oficiais do IBAM** — 20 por cargo. Cada adaptação registra o caderno, o número da questão usada como inspiração e o gabarito definitivo. Enunciados, dados e alternativas são reescritos; os cadernos de 2026 ainda não existem porque as provas estão previstas para setembro e outubro de 2026.

Links oficiais usados para consulta:

- Edital 73/2026: https://www.ibamsp-concursos.org.br/informacoes/178/
- Edital 71/2026: https://www.ibamsp-concursos.org.br/informacoes/176/

Cadernos anteriores de referência:

- Inspetor de Alunos — Arraial do Cabo/RJ — IBAM — Edital nº 01/2025.
- Técnico Administrativo — Câmara de Paraíba do Sul/RJ — IBAM — Edital nº 01/2025.
- Auxiliar Administrativo — Arraial do Cabo/RJ — IBAM — Edital nº 02/2025, prova aplicada em 2026.

### Diferença entre CRT-SP/Quadrix e Santos/IBAM

- CRT-SP/Quadrix: itens **Certo/Errado**, pontuação líquida `+1 / -1 / 0`.
- Santos/IBAM: questões de **múltipla escolha**, 4 alternativas, apenas uma correta.
- Santos/IBAM usa **pontuação ponderada por peso** conforme o edital do cargo.

Exemplo: se uma questão de Conhecimentos Específicos de Agente de Portaria tem peso 5, um acerto soma 5 pontos; erro ou branco soma 0. O relatório final mostra acertos, erros, brancos, pontuação ponderada, percentual ponderado, desempenho por disciplina e assuntos para revisar.

### Distribuição IBAM

Os três cargos têm 40 questões objetivas:

- Língua Portuguesa: 10 questões.
- Matemática: 6 questões.
- Legislação Municipal e Serviço Público: 8 questões.
- Informática e Rotinas: 6 questões.
- Conhecimentos Específicos: 10 questões.

Os pesos mudam por cargo:

- Agente de Portaria: Português 1, Matemática 1, Legislação 2, Informática/Rotinas 3, Específicos 5.
- Inspetor de Alunos: Português 1, Matemática 1, Legislação/Atendimento Escolar 4, Informática/Rotinas 2, Específicos 4.
- Oficial de Administração: Português 2, Matemática 2, Legislação 2, Informática/Rotinas 2, Específicos 4.

### Redação administrativa do Oficial

O cargo de Oficial de Administração possui módulo de redação administrativa. O sistema gera propostas autorais com textarea para treino e mostra um modelo de resposta após finalizar.

Critérios exibidos no gabarito: atendimento ao tema, clareza, objetividade, impessoalidade, formalidade, estrutura, correção gramatical, adequação administrativa, sigilo e proteção de dados.

### Como adicionar novas questões IBAM

As questões de Santos ficam em `santos-ibam-bank.js`. Para adicionar uma questão manual, use o mesmo padrão do banco:

```js
{
  id: "IBAM-AGP-101",
  area: "concursos-santos-ibam",
  concurso: "Prefeitura de Santos",
  concurso_id: "santos-ibam",
  banca: "IBAM",
  edital: "73/2026",
  cargo: "Agente de Portaria",
  cargo_id: "santos-agente-portaria",
  cargos_compativeis: ["santos-agente-portaria"],
  bloco: "Conhecimentos Específicos",
  disciplina: "Conhecimentos Específicos",
  assunto: "Controle de acesso",
  subassunto: "controle-de-acesso",
  tipo: "multipleChoice",
  dificuldade: "medio",
  peso: 5,
  enunciado: "...",
  alternativas: ["correta", "distrator", "distrator", "distrator"],
  gabarito: 0,
  comentario: "...",
  fonte: "Questão autoral baseada no Edital nº 73/2026 — SEPLA-RH.",
  link: "https://www.ibamsp-concursos.org.br/informacoes/178/",
  tags: ["ibam", "santos", "agente-portaria"]
}
```

Não copie literalmente questões de provas anteriores. Para uma adaptação, reescreva enunciado, dados e distratores e registre `origem_tipo`, `prova_origem`, `ano_prova_origem`, `questao_origem`, `fonte_gabarito`, `tipo_raciocinio_referencia` e `criterio_dificuldade`, sempre com links oficiais verificáveis.

Para manter um nível próximo ao das provas mais recentes do IBAM:

- priorize cadernos oficiais de 2024 a 2026 e substitua a referência quando houver prova mais nova e compatível com o cargo;
- preserve a habilidade cobrada e o número de etapas de raciocínio do item de referência, sem copiar seu texto;
- classifique como `facil` a cobrança direta ou de uma etapa, `medio` a aplicação contextualizada ou de duas etapas e `dificil` a integração de conceitos ou de várias etapas;
- produza distratores plausíveis a partir de erros comuns, sem pegadinhas ambíguas;
- confirme a questão de origem no gabarito oficial antes de incluir a adaptação.

A auditoria bloqueia adaptações sem prova recente identificada, número da questão, gabarito oficial, descrição da habilidade preservada e justificativa verificável da dificuldade.

Para adicionar novas questões em `questions-bank.js`, use campos como:

```js
{
  id: "DP600-061",
  area: "certificacoes",
  trilha: "DP-600",
  disciplina: "Microsoft Fabric",
  assunto: "Lakehouse",
  tipo: "multipleChoice",
  dificuldade: "medio",
  enunciado: "...",
  alternativas: [{ label: "A", text: "..." }],
  gabarito: 0,
  comentario: "...",
  tags: ["dp-600", "fabric"]
}
```

## Como rodar localmente

```bash
npm run build
npm start
```

Abra:

```text
http://localhost:8080
```

## Deploy no Vercel

O projeto é estático:

- Build Command: `npm run build`
- Output Directory: `dist`
- Production Branch: `main`

Ao fazer push na `main`, o Vercel atualiza automaticamente o projeto conectado.

## Limitações do localStorage

Os dados ficam apenas no navegador atual. Se limpar cache, trocar de navegador ou acessar em outro aparelho, o histórico local não acompanha.

Ideias futuras:

- Supabase para sincronizar usuários e histórico.
- Vercel KV ou banco serverless para ranking compartilhado.
- Painel administrativo para cadastrar questões.

## Cuidados

- Não usar senha real.
- Não inserir dados sensíveis.
- Não copiar questões oficiais protegidas.
- Manter CRT-SP com Certo/Errado, diário com 40 itens e prova real com 120 itens.
