# Verificação — 08/10/2026

## Resultado funcional

- `npm.cmd run build`: TypeScript, build cliente e pré-renderização PT/EN passaram.
- `npm.cmd run check`: teste das duas páginas estáticas, título principal único, âncoras existentes e disclosures passou.
- Chrome headless: português e inglês em 320, 390, 768, 1024 e 1440 px, sem overflow horizontal.
- Skip link, menu mobile via teclado, Escape retornando foco, disclosure via teclado, troca de idioma, histórico e reload direto em inglês passaram.
- Movimento reduzido aplicado; zero erros de console, erros de hidratação ou respostas HTTP com falha na rodada final.
- Contraste calculado sobre fundo marfim: tinta 13.82:1, texto secundário 5.75:1, azul 6.00:1.
- Inspeção visual: desktop, mobile, ambos os idiomas, menu aberto e estudo técnico expandido.
- Detector mecânico Impeccable: nenhuma ocorrência.

## Revisão independente

`impeccable_finish_reviewer` confirmou as correções de escala, geometria da abertura, alinhamento dos botões, contexto persistido e localização dos rótulos.

O fluxo automático de fidelidade permanece incompleto. A comparação do mockup compacto com os primeiros 1536 px do documento expandido atingiu 59.96%; a prova recortada somente da abertura atingiu 67.14%, abaixo do limite de 72%. Nenhum gate foi forçado e isso não é apresentado como aprovação de fidelidade. A revisão final classificou os ajustes visuais como resolvidos e a persistência do fluxo automático como parcial.

Evidências em `.impeccable/review`, incluindo capturas, métricas do DOM, resultados e comparações. Na abertura a 1024 px, o divisor está em x623.86; formação e botões iniciam em x693.66; ambos os botões medem 274.34 px, próximos da coluna aprovada do mockup. A página inclui as seções adicionais requeridas pelo briefing.

## Pendências para lançamento

- E-mail, LinkedIn e GitHub reais não fornecidos.
- PDFs ou URLs dos currículos PT/EN não fornecidos.
- Domínio público não definido; configurar `VITE_SITE_URL` para canonical, hreflang e sitemap.
- Decisão do usuário: aceitar a adaptação funcional entregue ou investir em outra rodada de fidelidade ao mockup, conforme a exigência da skill para encerrar um fluxo com comparação pendente.

Nenhuma publicação externa realizada. Não houve teste em dispositivo físico nem auditoria com leitor de tela; os resultados acima têm o escopo indicado.
# Theme and motion — 2026-10-14

Added a persistent system-aware dark theme, localized accessible toggle, early theme initialization, and bounded CSS motion without dependencies. `npm run build` (including type-check and PT/EN prerender) and `npm run check` passed.

Production preview checked with `scripts/theme-check.cjs` and Playwright/Edge: system dark preference, manual light preference persisted after reload, PT/EN labels, no horizontal overflow at 390/768/1440px, mobile menu Escape, reduced-motion animation removal, and no browser page errors. Dark desktop and mobile screenshots were inspected. Physical-phone testing remains pending. Impeccable detector reported advisory palette/documentation and existing type-ramp findings; dark palette and motion are now recorded in DESIGN.md. The prior mockup-fidelity gate was not rerun.
