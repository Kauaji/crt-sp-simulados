# CRT-SP Simulados

Site estático e gamificado para estudo do concurso CRT-SP 2026, cargo Técnico Administrativo da Baixada Santista.

Site público: [https://crt-sp-simulados.vercel.app/](https://crt-sp-simulados.vercel.app/)

O projeto usa HTML, CSS e JavaScript puro. A etapa `npm run build` apenas copia os arquivos para `dist/` e gera `supabase-config.js` quando existirem variáveis públicas do Supabase.

## O que existe no site

- tela inicial “Quem vai estudar hoje?”;
- perfis locais separados para Kauã, Vitória e Caio;
- foguinho/streak individual por usuário;
- dashboard com pontos, acessos, histórico, taxa de acerto e médias;
- ranking Kauã × Vitória × Caio;
- abas: Simulado diário, Questionário extra, Prova real, Estudos e Dashboard;
- simulado diário com 40 itens Certo/Errado/Em branco;
- questionário extra com 10, 20 ou 40 itens e seletor de dificuldade;
- prova real com 120 itens e cronômetro sugerido de 3 horas;
- relatório com acertos, erros, brancos, pontuação líquida, desempenho por bloco/disciplina e revisão;
- gabarito comentado somente depois de finalizar;
- questões corrigidas visualmente após finalizar, com explicação, fonte/base de inspiração e links de estudo ao clicar;
- lista de assuntos para revisar com base nos erros e itens em branco;
- quadro “Fidelidade ao estilo Quadrix”;
- distribuição das inspirações por tipo de fonte;
- tabela “Transparência das questões” com origem/base legal item a item;
- aba Estudos com teoria resumida, macetes, pegadinhas da Quadrix, fontes utilizadas e pesos de incidência por assunto.

## Pontuação

Todos os modos usam a regra:

```text
+1 por acerto
-1 por erro
0 em branco
```

Os pontos gamificados são calculados assim:

```text
pontos ganhos = max(0, pontuação líquida) + acertos + min(streak atual, 10)
```

## Camada Quadrix avançada

O site não copia questões reais protegidas. As questões são autorais, em estilo Certo/Errado, com contextualização de conselho profissional e base em:

- edital CRT-SP 2026;
- legislação oficial vigente;
- resoluções oficiais do CFT/CRT-SP;
- padrão de provas Quadrix para Conselhos Profissionais;
- matriz de temas recorrentes para nível médio administrativo.

Cada item finalizado mostra:

- gabarito;
- comentário;
- fonte de inspiração ou base legal;
- pegadinhas comuns da Quadrix naquele assunto;
- links de estudo.

O sorteio não é totalmente uniforme: os pesos de incidência priorizam temas mais prováveis e mais recorrentes, como Sistema CFT/CRT, Lei 9.784/1999, LAI, LGPD, Administração Pública, protocolo, atendimento, redação oficial e legislação profissional.

## Fontes oficiais configuradas

- [Edital CRT-SP 2026 — Quadrix](https://quadrix.org.br/informacoes/3048/)
- [Acervo de provas anteriores Quadrix](https://ajuda.quadrix.org.br/pt-BR/articles/8185732-acesso-as-provas-de-concursos-anteriores)
- [Lei 13.639/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13639.htm)
- [Lei 5.524/1968](https://www.planalto.gov.br/ccivil_03/leis/l5524.htm)
- [Decreto 90.922/1985](https://www.planalto.gov.br/ccivil_03/decreto/antigos/d90922.htm)
- [Decreto 4.560/2002](https://www.planalto.gov.br/ccivil_03/decreto/2002/D4560.htm)
- [Lei 9.784/1999](https://www.planalto.gov.br/ccivil_03/leis/l9784.htm)
- [Lei 12.527/2011 — LAI](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm)
- [Lei 13.709/2018 — LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Lei 8.429/1992](https://www.planalto.gov.br/ccivil_03/leis/l8429.htm)
- [Regimento Interno CRT-SP](https://crtsp.gov.br/regimento-interno-crt-sp/)
- [Resoluções oficiais do CFT](https://cft.org.br/category/resolucoes/)

## Banco de questões

O arquivo [simulados.js](</C:/Users/Kauã Marques/Documents/New project/crt-sp-simulados/simulados.js>) contém itens autorais com:

- `id`;
- `bloco`;
- `disciplina`;
- `assunto`;
- `dificuldade`;
- `enunciado`;
- `gabarito`;
- `comentario`;
- `tags`.

As cotas atuais permitem:

- Simulado diário: 12 Básicos, 8 Complementares e 20 Específicos;
- Prova real: 40 Básicos, 30 Complementares e 50 Específicos.

## Como rodar localmente

```bash
npm run build
cd dist
python -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Como atualizar as questões diariamente

1. Abra [simulados.js](</C:/Users/Kauã Marques/Documents/New project/crt-sp-simulados/simulados.js>).
2. Adicione novos itens usando a função `q(...)`.
3. Use tags já existentes sempre que possível, pois elas alimentam os pesos de incidência, fontes de inspiração, pegadinhas e links de estudo.
4. Consulte fonte oficial antes de criar questão legal.
5. Não copie enunciado de prova real, apostila ou banco pago. Reescreva o item com contexto novo.
6. Rode `npm run build`.
7. Faça commit e push para `main`.

Exemplo:

```js
q(
  "ESP-CFT-999",
  BLOCOS.ESPECIFICOS,
  "Sistema CFT/CRTs",
  "Lei 13.639/2018",
  "medio",
  "C",
  "Enunciado autoral em formato Certo/Errado, contextualizado para o CRT-SP.",
  "Comentário objetivo do gabarito, com base legal ou explicação técnica.",
  ["cft", "crt", "lei-13639"]
)
```

Regras rápidas:

1. use `id` único;
2. use `gabarito` como `"C"` ou `"E"`;
3. use dificuldade `"facil"`, `"medio"` ou `"dificil"`;
4. inclua tags específicas, como `lei-13639`, `processo-administrativo`, `lgpd`, `lai`, `protocolo`, `atendimento`, `redacao-oficial`, `licitacoes`, `materiais`, `logistica`;
5. mantenha comentários curtos, mas explicativos.

## Supabase / Vercel

Nesta versão, o site não depende de backend. Os dados ficam no `localStorage`.

O build já aceita variáveis futuras:

```text
SUPABASE_URL=https://yzgmpjkuimzkerumsxls.supabase.co
SUPABASE_PUBLISHABLE_KEY=sua_chave_publishable_do_supabase
```

Use somente chave pública/publishable no frontend. Nunca coloque `service_role`, secret key ou senha do banco.

## Limitação do localStorage

Os dados de pontos, acessos, histórico e foguinho ficam salvos apenas neste navegador. Se Kauã, Vitória ou Caio abrirem em outro celular/computador, o ranking local não sincroniza.

Para ranking real entre dispositivos, a próxima evolução pode usar Supabase.

## Deploy automático no Vercel

O projeto está conectado ao GitHub/Vercel. Para publicar:

```bash
git add .
git commit -m "Atualiza plataforma de simulados"
git push origin main
```

Quando houver push na branch `main`, o Vercel atualiza automaticamente o mesmo domínio:

[https://crt-sp-simulados.vercel.app/](https://crt-sp-simulados.vercel.app/)
