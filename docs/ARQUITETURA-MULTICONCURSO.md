# Arquitetura multi-concurso

## Estado encontrado antes da alteração

O projeto era um site estático para CRT-SP:

- HTML, CSS e JavaScript puro.
- Sem backend, API ou banco de dados operacional.
- Sem autenticação real; havia seleção local de perfis.
- Progresso, ranking, histórico e preferências eram salvos no navegador.
- O build do Vercel copiava os arquivos estáticos para `dist/`.

## Decisão de arquitetura atual

A nova versão mantém o site estático, porque o projeto atual não possui backend nem migrations reais.

Em vez de criar migrations falsas, a separação de dados foi implementada por escopo local:

```text
usuário -> concurso -> cargo -> progresso/estatísticas/histórico/favoritos/metas
```

Chave principal:

```text
localStorage["multiconcurso.study.v1"]
```

Sessão ativa:

```text
localStorage["multiconcurso.session.v1"]
```

## Coleções equivalentes às tabelas sugeridas

| Tabela sugerida | Implementação estática |
|---|---|
| `users` | `STUDY_DATA.users` |
| `concursos` | `STUDY_DATA.concursos` |
| `cargos` | `concursos[].roles` |
| `user_concursos` | `users[userId].selectedContestId` e `selectedRoleByContest` |
| `materias` | `concursos[].materias` |
| `assuntos` | `materias[].assuntos` e metadados das questões |
| `questoes` | `STUDY_DATA.questoes` |
| `alternativas` | `questoes[].alternativas` |
| `simulados` | `scope.mocks[]` |
| `simulado_questoes` | `mock.queueIds[]` durante a sessão |
| `respostas_usuario` | `scope.history[]` |
| `progresso_usuario` | `scope.answers{}` |
| `estatisticas_usuario` | calculadas em tempo real por escopo |
| `favoritos` | `scope.favorites{}` |
| `anotacoes` | `scope.notes{}` |
| `metas` | `scope.goals{}` |
| `revisoes` | `scope.revisionMarked{}` e seleção inteligente |
| `fontes_questoes` | `STUDY_DATA.sources` + campos `fonte`/`link` da questão |

## Escopo de isolamento

O app nunca consulta histórico global para montar dashboard ou revisão. Toda tela usa:

```text
scopeKey = `${concurso_id}::${cargo_id}`
```

Isso garante que o usuário `mequis`, por exemplo, possa ter:

- progresso próprio no CRT-SP;
- progresso próprio no IBGE ACQ;
- progresso próprio no IBGE Analista;
- progresso próprio na Prefeitura de Santos.

## Formatos de questão

Implementado:

- Certo/Errado
- Verdadeiro/Falso por compatibilidade de tipo
- Múltipla escolha
- Redação como treino manual, sem autocorreção
- Discursiva como tipo reservado para evolução futura

## Fonte de verdade dos dados

O arquivo `simulados.js` deixou de ser o banco gigante da aplicação. Ele agora é apenas um carregador modular.

Fonte canônica:

```text
data/sources/sources.js
data/contests/*.js
data/config/*.js
data/questions/*.json
```

Arquivos em `data/questoes/` são cópias exportadas para compatibilidade, auditoria e futura importação.

## Auditoria de questões

O script `scripts/audit-questions.mjs` gera:

```text
reports/question-audit.json
reports/question-audit.md
```

A auditoria analisa cada escopo `concurso_id::cargo_id` separadamente e verifica:

- IDs duplicados.
- Enunciados iguais após normalização.
- Enunciados muito semelhantes por tokens/n-grams.
- Mesmo gabarito e fato-base.
- Fonte, explicação, alternativas e gabarito.

## Simulado diário e persistência

O simulado completo usa seleção determinística por:

```text
YYYY-MM-DD no fuso America/Sao_Paulo
usuario_id
concurso_id
cargo_id
tipo_simulado
```

O mesmo usuário recebe a mesma fila no mesmo dia para o mesmo concurso/cargo. A seleção muda no dia seguinte e tenta evitar questões usadas nos últimos 14 dias, com fallback mínimo de 7 dias quando o banco não é suficiente.

O simulado em andamento é salvo em `scope.activeMock` e preserva:

- ID do simulado.
- Fila de questões.
- Respostas.
- Marcadas para revisão.
- Índice atual.
- Início e duração.
- Usuário, concurso e cargo.

## Limitações atuais

- Sem sincronização entre dispositivos.
- Sem login real com senha.
- Sem painel administrativo.
- Sem importador CSV visual.
- Sem correção automática de redação.
- Sem migrations porque não há banco ativo.

## Evolução recomendada

Quando quiser usar Supabase:

1. Criar tabelas reais equivalentes ao quadro acima.
2. Migrar `STUDY_DATA` para seeds JSON/SQL.
3. Trocar profile picker por Supabase Auth.
4. Sincronizar `history`, `answers`, `favorites`, `notes`, `goals` e `mocks`.
5. Criar painel administrativo de importação JSON/CSV com validação de duplicidade.
