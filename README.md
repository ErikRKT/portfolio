# Erik Freitas Fontinele — portfólio

Vue 3 + TypeScript + Vite. Direção “Revista de engenharia” escolhida pelo usuário. Sem biblioteca de componentes, roteador ou serviço externo de fontes. Conteúdo profissional anonimizado; sem dados internos, métricas inventadas ou capturas de sistemas.

## Executar

Use Node 22.12 ou superior compatível com Vite e npm.

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra a URL indicada no terminal. As versões estão em `/` (português) e `/en/` (inglês). O menu mobile fecha com Escape. Estudos técnicos expandem com os controles nativos `<details>`.

## Verificar e gerar produção

```powershell
npm.cmd run build
npm.cmd run check
npm.cmd run preview
```

O build verifica TypeScript, gera assets e pré-renderiza as duas línguas em HTML. Não depende de um servidor Node em produção. `dist` contém apenas o site; mockups, documentação e ferramentas de desenvolvimento não são publicados.

## Configurar o conteúdo real

Edite `src/content.ts`. E-mail, LinkedIn e GitHub já estão configurados. Os currículos fornecidos por Erik estão disponíveis em `public/curriculo-erik-pt.pdf` (português) e `public/resume-erik-en.pdf` (inglês), com links na seção de contato. Para atualizar, substitua os PDFs mantendo esses nomes. Valores vazios continuam exibindo uma pendência explícita.

Os estudos selecionados são recortes do trabalho profissional, não projetos públicos pessoais. Não adicionar links para sistemas internos. Confirmar qualquer detalhe de decisão técnica com Erik antes de ampliar a narrativa.

Defina `VITE_SITE_URL` com o domínio HTTPS definitivo antes do build. Isso gera canonical, versões alternativas e sitemap. Não há domínio fictício embutido no site. `public/social.png` é a imagem de compartilhamento, renderizada a partir da arte vetorial original em `public/social.svg`.

## Publicar

1. Revise os links e currículos, e defina o domínio real nas variáveis do provedor.
2. **Netlify:** importe o repositório. `netlify.toml` configura `npm run build` e saída `dist`; headers de segurança vêm de `public/_headers`.
3. **Vercel:** importe como Vite, comando `npm run build`, saída `dist`. Não configure uma reescrita global que substitua `/en/index.html` pela página portuguesa. Os headers do arquivo `_headers` são específicos do Netlify; configure equivalentes no provedor se necessário.
4. **Hospedagem estática:** envie apenas o conteúdo de `dist` à raiz do domínio. Sirva `/en/` como `en/index.html`. O build atual assume publicação na raiz; subdiretórios como GitHub Pages de projeto exigem ajustar `base`, URLs de idioma e geração de metadados.
5. Verifique `/`, `/en/`, navegação, contatos e PDFs na URL pública. Com domínio definido, verifique `/sitemap.xml` e `/robots.txt`.

O código está no repositório público `ErikRKT/portfolio` no GitHub. Contatos e currículos estão configurados; a hospedagem e o domínio definitivo ainda estão pendentes.

`VERIFICATION.md` registra os testes executados e a pendência de comparação automática de fidelidade ao mockup. O funcionamento foi validado; o fluxo automático Impeccable permanece sem aprovação de fidelidade.

## Contexto durável

`PRODUCT.md`: fatos e limites. `.impeccable/surface.md`: direção aprovada e composição. `DESIGN.md`: sistema visual implementado. `.impeccable/mocks/decision/`: referências visuais, sem uso como imagens do site.
