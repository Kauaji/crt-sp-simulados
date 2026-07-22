# Simulados CRT-SP, IBGE, Prefeitura de Santos e PM-SP

Site estático em HTML, CSS e JavaScript puro para publicar simulados e treinos autocorrigíveis no Vercel.

O projeto começou focado no CRT-SP, mas agora funciona como plataforma multi-concurso:

- CRT-SP — Técnico Administrativo (Baixada Santista) e Fiscal (Baixada Santista)
- IBGE — Agente Censitário de Qualidade e Analista Censitário em TI/Dados
- Prefeitura de Santos — Oficial de Administração
- PM-SP — Aluno-Soldado PM do Quadro de Praças

Não há backend obrigatório. O progresso fica salvo no navegador via `localStorage`, separado por usuário, concurso e cargo.

## Arquitetura

- `index.html`: estrutura principal da aplicação.
- `styles.css`: layout responsivo e identidade visual.
- `simulados.js`: carregador modular que consolida fontes, concursos e questões canônicas no navegador.
- `app.js`: estado da aplicação, login local, seleção de concurso, treino, simulados, revisão, histórico e metas.
- `data/sources/`: fontes oficiais e referências públicas.
- `data/contests/`: concursos, cargos, formatos, pontuação e distribuição por edital.
- `data/questions/`: fonte de verdade das questões usadas pelo site.
- `data/questoes/`: cópia exportada para compatibilidade, auditoria e futura importação.
- `scripts/build.mjs`: build estático para `dist/`.
- `scripts/audit-questions.mjs`: auditoria de duplicidade, fonte, explicação, alternativas e gabarito.
- `docs/`: documentação de arquitetura e editais/fontes.

## Usuários locais

Perfis sem senha:

- `kaua` — Kauã
- `vitoria` — Vitória
- `caio` — Caio
- `mequis` — Mequis

Como não existe autenticação real, não há senha. Cada perfil é um namespace local no navegador.

## Como rodar localmente

```bash
npm install
npm run build
npm start
```

Depois abra:

```text
http://localhost:8080
```

Se quiser abrir sem build, também é possível servir a raiz do projeto com qualquer servidor estático.

## Comandos de validação

```bash
npm run lint
npm test
npm run audit:questions
npm run build
```

A auditoria gera:

- `reports/question-audit.json`
- `reports/question-audit.md`

## Como publicar no Vercel

Configurações recomendadas:

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Production Branch: `main`

O arquivo `vercel.json` já define:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false
}
```

Para manter o mesmo link público, use sempre o mesmo projeto Vercel:

```text
crt-sp-simulados
https://crt-sp-simulados.vercel.app
```

Quando fizer push na branch `main` do GitHub, o Vercel atualiza automaticamente o deploy de produção.

## Como conectar GitHub ao Vercel

1. Suba este repositório no GitHub em `Kauaji/crt-sp-simulados`.
2. No Vercel, clique em Add New → Project.
3. Importe o repositório `Kauaji/crt-sp-simulados`.
4. Confirme as configurações:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Branch de produção: `main`
5. Faça o primeiro deploy.
6. Em Settings → Domains, mantenha o domínio `crt-sp-simulados.vercel.app`.

## Como atualizar questões diariamente

Edite os arquivos canônicos em `data/questions/` e, quando necessário, os metadados em `data/contests/` e `data/sources/`.

Cada questão precisa manter os campos:

- `id`
- `concurso_id`
- `cargo_id`
- `cargos_compativeis`
- `materia_id`
- `assunto_id`
- `enunciado`
- `alternativas`, quando for múltipla escolha
- `resposta_correta`
- `explicacao`
- `dificuldade`
- `banca`
- `ano`
- `origem`
- `fonte`
- `link`
- `status`
- `criado_em`
- `atualizado_em`

Depois rode:

```bash
npm run lint
npm test
npm run audit:questions
npm run export:data
npm run build
git checkout -b fix/atualiza-questoes-do-dia
git add .
git commit -m "Atualiza questões do dia"
git push -u origin fix/atualiza-questoes-do-dia
```

Abra um Pull Request para `main`. Quando o PR for mesclado, o Vercel fará o redeploy automaticamente no projeto conectado.

## Quantidade inicial de questões

- CRT-SP: 150 questões inéditas no estilo Certo/Errado Quadrix.
- IBGE ACQ: 120 questões inéditas de múltipla escolha.
- IBGE Analista TI/Dados: 80 questões inéditas de múltipla escolha.
- Prefeitura de Santos: 150 questões inéditas de múltipla escolha.
- PM-SP Aluno-Soldado: 120 questões inéditas de múltipla escolha no estilo VUNESP.

Total inicial: 620 questões objetivas.

## Observações importantes

- As questões são autorais/inéditas e inspiradas no estilo das bancas, sem cópia de provas protegidas.
- As fontes principais estão documentadas em `docs/editais/`.
- O site suporta redação como treino manual quando o edital exige, mas não corrige texto automaticamente.
- Para sincronização entre dispositivos, ranking real em nuvem ou administração de questões por painel, será necessário backend/Supabase no futuro.
