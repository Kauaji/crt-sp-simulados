# Simulados CRT-SP, IBGE e Prefeitura de Santos

Site estático em HTML, CSS e JavaScript puro para publicar simulados e treinos autocorrigíveis no Vercel.

O projeto começou focado no CRT-SP, mas agora funciona como plataforma multi-concurso:

- CRT-SP — Técnico Administrativo (Baixada Santista) e Fiscal (Baixada Santista)
- IBGE — Agente Censitário de Qualidade e Analista Censitário em TI/Dados
- Prefeitura de Santos — Oficial de Administração

Não há backend obrigatório. O progresso fica salvo no navegador via `localStorage`, separado por usuário, concurso e cargo.

## Arquitetura

- `index.html`: estrutura principal da aplicação.
- `styles.css`: layout responsivo e identidade visual.
- `simulados.js`: cadastro estático de usuários, concursos, cargos, matérias, fontes e banco de questões.
- `app.js`: estado da aplicação, login local, seleção de concurso, treino, simulados, revisão, histórico e metas.
- `scripts/build.mjs`: build estático para `dist/`.
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

Edite `simulados.js`.

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
npm run build
git add .
git commit -m "Atualiza questões do dia"
git push origin main
```

O Vercel fará o redeploy automaticamente no projeto conectado.

## Quantidade inicial de questões

- CRT-SP: 150 questões inéditas no estilo Certo/Errado Quadrix.
- IBGE ACQ: 120 questões inéditas de múltipla escolha.
- IBGE Analista TI/Dados: 80 questões inéditas de múltipla escolha.
- Prefeitura de Santos: 150 questões inéditas de múltipla escolha.

Total inicial: 500 questões objetivas.

## Observações importantes

- As questões são autorais/inéditas e inspiradas no estilo das bancas, sem cópia de provas protegidas.
- As fontes principais estão documentadas em `docs/editais/`.
- O site suporta redação como treino manual quando o edital exige, mas não corrige texto automaticamente.
- Para sincronização entre dispositivos, ranking real em nuvem ou administração de questões por painel, será necessário backend/Supabase no futuro.
