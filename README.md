<div align="center">

# Plataforma Multi-Concurso

### Simulados, treinos e acompanhamento de desempenho para concursos públicos

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/status-em%20evolução-orange)

Aplicação web estática criada para organizar estudos, aplicar simulados autocorrigíveis e manter o progresso separado por usuário, concurso e cargo.

[Ver aplicação](https://crt-sp-simulados.vercel.app)

</div>

## Visão geral

A **Plataforma Multi-Concurso** reúne questões, treinos, simulados, revisão e indicadores de desempenho em uma interface única e responsiva.

O projeto começou como uma ferramenta de preparação para o CRT-SP e evoluiu para suportar diferentes concursos, cargos, bancas e formatos de prova sem misturar o progresso dos usuários.

Como a versão atual não depende de backend, os dados são armazenados no navegador por meio do `localStorage`. Essa abordagem permite publicação simples e rápida no Vercel, mantendo o projeto acessível e funcional.

## Concursos disponíveis

- **CRT-SP** — Técnico Administrativo e Fiscal da Baixada Santista.
- **IBGE** — Agente Censitário de Qualidade e Analista Censitário em TI/Dados.
- **Prefeitura de Santos** — Oficial de Administração.
- **PM-SP** — Aluno-Soldado do Quadro de Praças.

## Funcionalidades

- Seleção independente de usuário, concurso e cargo.
- Dashboard com progresso e indicadores de estudo.
- Treinos por matéria e assunto.
- Simulados autocorrigíveis.
- Histórico de desempenho.
- Questões marcadas para revisão.
- Metas e acompanhamento de evolução.
- Explicação e fonte associadas às questões.
- Layout responsivo para computador e celular.
- Persistência local sem necessidade de cadastro em servidor.

## Banco de questões

A base inicial possui **620 questões objetivas autorais**, distribuídas da seguinte forma:

| Concurso e cargo | Quantidade inicial |
|---|---:|
| CRT-SP | 150 |
| IBGE — Agente Censitário de Qualidade | 120 |
| IBGE — Analista em TI/Dados | 80 |
| Prefeitura de Santos | 150 |
| PM-SP — Aluno-Soldado | 120 |

As questões são inspiradas no conteúdo dos editais e no estilo das bancas, sem reprodução integral de provas protegidas. As principais referências estão documentadas em [`docs/editais/`](docs/editais/).

## Arquitetura

```text
Navegador
   |
   ├── Interface HTML e CSS
   ├── Lógica da aplicação em JavaScript
   ├── Banco de questões estático
   └── Progresso salvo no localStorage
```

Estrutura principal:

```text
crt-sp-simulados/
├── index.html           Estrutura principal da aplicação
├── styles.css           Layout, componentes e responsividade
├── app.js               Estado, navegação, simulados e progresso
├── simulados.js         Usuários, concursos, cargos e questões
├── scripts/
│   └── build.mjs        Geração do diretório de produção
├── docs/                Arquitetura, editais e fontes
├── dist/                Build estático publicado
└── vercel.json          Configuração de deploy
```

## Tecnologias

| Área | Tecnologias |
|---|---|
| Interface | HTML5 e CSS3 |
| Aplicação | JavaScript puro |
| Persistência | localStorage |
| Build | Node.js e script próprio |
| Hospedagem | Vercel |
| Versionamento | Git e GitHub |

## Executar localmente

### Requisitos

- Node.js
- npm
- Git

### Instalação

```bash
git clone https://github.com/Kauaji/crt-sp-simulados.git
cd crt-sp-simulados
npm install
npm run build
npm start
```

Depois, acesse:

```text
http://localhost:8080
```

Por ser uma aplicação estática, também é possível servir a raiz do projeto com outro servidor HTTP local.

## Deploy no Vercel

Configuração recomendada:

| Campo | Valor |
|---|---|
| Framework Preset | Other |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

O arquivo `vercel.json` já contém a configuração necessária:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false
}
```

Cada atualização mesclada na branch `main` inicia um novo deploy de produção no projeto conectado ao Vercel.

## Estrutura das questões

Cada questão mantém os principais campos de identificação, conteúdo e rastreabilidade:

```text
id
concurso_id
cargo_id
cargos_compativeis
materia_id
assunto_id
enunciado
alternativas
resposta_correta
explicacao
dificuldade
banca
ano
origem
fonte
link
status
criado_em
atualizado_em
```

## Atualização do conteúdo

Após editar o banco de questões, valide o build antes de publicar:

```bash
npm run build
git checkout -b content/atualiza-questoes
git add .
git commit -m "content: atualiza banco de questões"
git push -u origin content/atualiza-questoes
```

Em seguida, abra um Pull Request para a branch `main`. Essa prática mantém o histórico organizado e permite revisar as alterações antes do deploy.

## Limitações atuais

- Os dados ficam armazenados somente no navegador utilizado.
- Não existe sincronização automática entre dispositivos.
- Os perfis locais não possuem autenticação real por senha.
- Ranking em nuvem e administração centralizada exigirão backend.
- Exercícios de redação podem ser registrados, mas não possuem correção automática.

## Próximos passos

- Adicionar backend e autenticação real.
- Sincronizar progresso entre dispositivos.
- Criar painel administrativo para questões e fontes.
- Aprimorar auditoria de duplicidade e qualidade do conteúdo.
- Expandir relatórios de desempenho por matéria e assunto.
- Adicionar novos concursos de forma modular.

## Autor

**Kauã Marques**  
Técnico de Informática e estudante de Análise e Desenvolvimento de Sistemas.

O projeto combina desenvolvimento web, organização de dados, automação de conteúdo e uma necessidade real de preparação para concursos públicos.
