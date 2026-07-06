# Simulados CRT-SP — Técnico Administrativo

Site estático e responsivo com 40 itens inéditos no formato Certo/Errado, correção automática, pontuação líquida, desempenho por bloco, gabarito comentado e indicação de temas para revisão.

O projeto usa apenas HTML, CSS e JavaScript. Não há backend, banco de dados ou etapa de build.

## Arquivos

- `index.html`: estrutura e conteúdo fixo da página.
- `styles.css`: identidade visual e responsividade.
- `simulados.js`: banco de questões, gabaritos e comentários.
- `app.js`: renderização, correção, métricas e reinício.
- `vercel.json`: configuração mínima do site estático.

## Rodar localmente

É possível abrir `index.html` diretamente no navegador. Para simular melhor um servidor web, abra o terminal nesta pasta e use uma das opções:

```bash
npx serve .
```

ou, se o Python estiver instalado:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:3000` (serve) ou `http://localhost:8080` (Python).

## Publicar automaticamente no Vercel via GitHub

1. Crie um repositório no GitHub.
2. Na raiz do repositório atual, envie os arquivos para a branch `main`.
3. Entre em [vercel.com](https://vercel.com), clique em **Add New > Project** e importe o repositório.
4. Em **Root Directory**, escolha `crt-sp-simulados`.
5. Em **Framework Preset**, selecione **Other**.
6. Deixe **Build Command** vazio e **Output Directory** como `.`.
7. Clique em **Deploy**.

O Vercel passa a observar a branch de produção (`main`). Cada `git push origin main` cria um novo deploy de produção automaticamente, sem mudar o endereço público.

Para tentar usar `https://crt-sp-simulados.vercel.app`, defina o nome do projeto como `crt-sp-simulados`. O nome precisa estar disponível. Depois de criado, o domínio permanece o mesmo em todos os deploys. Também é possível configurar um domínio próprio em **Settings > Domains**.

## Atualizar as questões diariamente

Abra `simulados.js` e altere o objeto `SIMULADO`:

- `atualizadoEm`: data da nova versão;
- `enunciado`: texto do item;
- `gabarito`: use `"C"` ou `"E"`;
- `comentario`: justificativa exibida após finalizar;
- `bloco` e `assunto`: usados nos resultados e na lista de revisão.

Mantenha identificadores (`id`) únicos e sequenciais. Para adicionar ou remover itens, basta editar o array `questoes`; a página calcula o total automaticamente.

Depois teste localmente, faça commit e push:

```bash
git add crt-sp-simulados
git commit -m "Atualiza simulado do dia"
git push origin main
```

O Vercel detectará o push e publicará a nova versão no mesmo domínio.

## Observação editorial

As questões são autorais e não reproduzem itens de provas. Antes de publicar uma atualização, confira normas que possam ter sido alteradas e compare o conteúdo com as fontes oficiais: Portal da Legislação, CFT e CRT-SP.
