# Plataforma de Estudos — CRT-SP, DP-600, Programação e Dados

Site estático em HTML, CSS e JavaScript puro publicado no Vercel:

```text
https://crt-sp-simulados.vercel.app
```

O foco principal continua sendo o concurso CRT-SP 2026 para Técnico Administrativo, com simulados Certo/Errado no estilo Quadrix. A plataforma também mantém o banco multi-concurso existente e adiciona trilhas de certificações, programação e dados com gamificação local.

## Funcionalidades

- Seleção obrigatória de usuário ao abrir ou recarregar o site: Kauã ou Vitória.
- Dados separados por usuário via `localStorage`.
- Dashboard com foguinho, maior streak, pontos, acessos, média, taxa de acerto e últimas tentativas.
- Ranking Kauã x Vitória por pontos, acessos, foguinho, atividades e média.
- Abas: Dashboard, CRT-SP, Prova real CRT-SP, Certificações, Programação, Dados, Academia de Dados, Estudos e Histórico.
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
- `questions-bank.js`: banco inicial de DP-600, Programação, Dados e Academia de Dados.

Quantidade inicial usada pela plataforma:

- CRT-SP: 150 itens Certo/Errado vindos de `simulados.js`.
- DP-600: 60 questões.
- Programação: 80 questões.
- Dados: 80 questões.
- Academia de Dados: 220 questões geradas por templates autorais, distribuídas entre fundamentos, SQL, Python/Pandas, Power BI/DAX, modelagem, engenharia, Fabric/DP-600 e analytics.

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
