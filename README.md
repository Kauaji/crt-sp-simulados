# CRT-SP Simulados

Plataforma estática, diária e gamificada de preparação para o concurso CRT-SP 2026, cargo Técnico Administrativo da Baixada Santista. Os itens autorais seguem o formato Certo/Errado e a regra de pontuação líquida associada à banca Quadrix: `+1` por acerto, `−1` por erro e `0` em branco.

**Site público:** [https://crt-sp-simulados.vercel.app/](https://crt-sp-simulados.vercel.app/)

O projeto usa somente HTML, CSS e JavaScript, sem dependências, backend ou etapa de build.

## Perfis Kauã e Vitória

A tela inicial oferece dois perfis sem senha. O perfil escolhido fica salvo no `localStorage`, e o botão **Trocar usuário** retorna à seleção sem apagar os dados.

Cada perfil possui estatísticas independentes:

- pontos totais;
- acessos em dias distintos;
- simulados finalizados;
- melhor, última e média das pontuações líquidas;
- streak atual e maior streak;
- histórico dos dez resultados mais recentes.

O dashboard apresenta essas métricas e uma frase motivacional diária. O ranking compara pontos, acessos, streak e simulados dos dois perfis no navegador atual.

## Foguinho e pontos

No primeiro acesso do dia, o sistema atualiza o streak:

- dia consecutivo: soma um;
- mesmo dia: não altera;
- um ou mais dias sem acesso: reinicia em um.

Ao finalizar um simulado:

```text
pontos ganhos = max(0, pontuação líquida) + acertos + min(streak atual, 10)
```

A pontuação gamificada não substitui a pontuação líquida da prova; as duas aparecem separadamente no resultado.

## Simulado diário

`getDailyQuestions()` usa a data local no formato `AAAA-MM-DD` como semente de um gerador pseudoaleatório determinístico. Assim:

- a mesma data gera a mesma prova para Kauã e Vitória;
- a seleção e a ordem mudam automaticamente no dia seguinte;
- cada prova tem exatamente 40 itens;
- são 12 básicos, 8 complementares e 20 específicos.

O banco possui 80 itens autorais, permitindo rotação diária. Conhecimentos específicos e legislação do Sistema CFT/CRTs ocupam metade de cada prova.

## Arquivos

- `index.html`: login, dashboard, ranking, prova e resultados.
- `styles.css`: identidade visual e layout responsivo.
- `simulados.js`: banco de questões, gabaritos e comentários.
- `app.js`: perfis, persistência, streak, ranking, sorteio e correção.
- `vercel.json`: configuração mínima do deploy estático.

## Rodar localmente

Abra `index.html` diretamente ou inicie um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Adicionar ou atualizar questões

Edite o array `BANCO_QUESTOES` em `simulados.js`. Cada objeto deve ter:

```js
{
  id: 81,
  bloco: "Conhecimentos específicos",
  assunto: "Resolução CFT nº 288/2025",
  enunciado: "Texto autoral do item.",
  gabarito: "C",
  comentario: "Justificativa exibida após a finalização."
}
```

Regras importantes:

1. use um `id` único;
2. use somente `"C"` ou `"E"` no gabarito;
3. mantenha pelo menos 12 itens básicos, 8 complementares e 20 específicos;
4. confira legislação e resoluções em fontes oficiais;
5. não copie questões de provas ou materiais protegidos.

Depois envie a atualização:

```bash
git add .
git commit -m "Atualiza banco de questões"
git push origin main
```

O Vercel publica automaticamente a nova versão no mesmo domínio.

## Configuração do Supabase no Vercel

O projeto agora tem uma etapa de build estática mínima. O Vercel executa `npm run build`, copia os arquivos para `dist/` e gera `dist/supabase-config.js` com as variáveis do Supabase.

No projeto `crt-sp-simulados` da Vercel, configure em **Settings > Environment Variables**:

```text
SUPABASE_URL=https://yzgmpjkuimzkerumsxls.supabase.co
SUPABASE_PUBLISHABLE_KEY=sua_chave_publishable_do_supabase
```

Marque as três environments: **Production**, **Preview** e **Development**.

Importante: use somente a chave pública/publishable do Supabase. Nunca coloque `service_role`, `secret key` ou senha do banco em site estático.

Para testar localmente o build:

```bash
npm run build
cd dist
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Limitação do armazenamento local

O `localStorage` salva os dados apenas no navegador e dispositivo atuais. Kauã e Vitória só compartilham o placar quando usam esse mesmo navegador. Limpar os dados do site também apaga os perfis e resultados.

Para sincronizar um ranking real entre celulares e computadores diferentes, uma versão futura precisará de autenticação e backend, como Supabase, Vercel KV ou banco equivalente. As operações de perfil e estatísticas já estão separadas em funções (`getCurrentUser`, `setCurrentUser`, `loadStats`, `saveStats`, `registerAccess`, `updateStreak` e `updateStatsAfterExam`) para facilitar essa migração.
