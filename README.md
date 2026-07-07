# CRT-SP Simulados

Site estático e gamificado para estudo do concurso CRT-SP 2026, cargo Técnico Administrativo da Baixada Santista.

**Site público:** [https://crt-sp-simulados.vercel.app/](https://crt-sp-simulados.vercel.app/)

O projeto usa HTML, CSS e JavaScript puro. A etapa `npm run build` apenas copia os arquivos para `dist/` e gera `supabase-config.js` quando existirem variáveis de ambiente do Supabase.

## O que existe no site

- tela inicial obrigatória “Quem vai estudar hoje?”;
- perfis locais separados para Kauã e Vitória;
- foguinho/streak individual por usuário;
- dashboard com pontos, acessos, histórico, taxa de acerto e médias;
- ranking Kauã × Vitória;
- abas: Simulado diário, Questionário extra, Prova real, Estudos e Dashboard;
- simulado diário com 40 itens Certo/Errado/Em branco;
- questionário extra com 10, 20 ou 40 itens e seletor de dificuldade;
- prova real com 120 itens e cronômetro sugerido de 3 horas;
- relatório com acertos, erros, brancos, líquida, desempenho por bloco/disciplina e revisão;
- gabarito comentado somente depois de finalizar;
- aba Estudos com prioridades, resumos, links oficiais, buscas de videoaulas e revisão personalizada.

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

## Foguinho

Ao selecionar um usuário:

- primeiro acesso: streak = 1;
- acesso no dia seguinte: streak +1;
- novo acesso no mesmo dia: não aumenta;
- se pular um ou mais dias: streak volta para 1;
- cada usuário tem streak separado.

## Banco de questões

O arquivo [simulados.js](</C:/Users/Kauã Marques/Documents/New project/crt-sp-simulados/simulados.js>) contém 142 itens autorais com:

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

## Como adicionar questões

Edite [simulados.js](</C:/Users/Kauã Marques/Documents/New project/crt-sp-simulados/simulados.js>) e adicione novos itens usando a função `q(...)`.

Exemplo:

```js
q(
  "ESP-CFT-999",
  BLOCOS.ESPECIFICOS,
  "Sistema CFT/CRTs",
  "Lei 13.639/2018",
  "medio",
  "C",
  "Enunciado autoral em formato Certo/Errado.",
  "Comentário objetivo do gabarito.",
  ["cft", "crt"]
)
```

Regras:

1. use `id` único;
2. use `gabarito` como `"C"` ou `"E"`;
3. use dificuldade `"facil"`, `"medio"` ou `"dificil"`;
4. não copie questões reais protegidas;
5. confira legislação em fonte oficial antes de criar itens legais.

## Supabase / Vercel

Nesta versão, o site não depende de backend. Os dados ficam no `localStorage`.

O build já aceita variáveis futuras:

```text
SUPABASE_URL=https://yzgmpjkuimzkerumsxls.supabase.co
SUPABASE_PUBLISHABLE_KEY=sua_chave_publishable_do_supabase
```

Use somente chave pública/publishable no frontend. Nunca coloque `service_role`, secret key ou senha do banco.

## Limitação do localStorage

Os dados de pontos, acessos, histórico e foguinho ficam salvos apenas neste navegador. Se Kauã ou Vitória abrirem em outro celular/computador, o ranking local não sincroniza.

Para ranking real entre dispositivos, a próxima evolução pode usar Supabase ou Vercel KV.

## Deploy

O projeto está conectado ao GitHub/Vercel. Para publicar:

```bash
git add .
git commit -m "Atualiza plataforma de simulados"
git push origin main
```

O Vercel atualiza automaticamente o mesmo domínio:

[https://crt-sp-simulados.vercel.app/](https://crt-sp-simulados.vercel.app/)
