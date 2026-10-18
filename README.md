# portfolio

Oi, eu sou o Rafael Dantas, o Danzokka. Sou engenheiro DevOps e um dos arquitetos de infraestrutura da Citiesoft. No dia a dia eu cuido de clusters Kubernetes, entrega com GitOps no Argo CD e observabilidade com Prometheus, Loki, Tempo e Grafana. Quando a ferramenta certa ainda não existe, eu escrevo uma em Rust ou Go.

Este repositório é o meu portfólio. Quis um site com a cara do que eu faço: fundo escuro, verde de terminal, cara de painel de monitoramento e um pouco de 3D por trás de cada seção. Aqui embaixo eu explico como ele funciona por dentro.

## Rodando aqui

Precisa de Node 20+ e pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Para conferir antes de subir:

```bash
pnpm lint
pnpm build && pnpm start
```

## Como ele funciona

É um app Next.js 16 (App Router, React 19 com o React Compiler) estilizado com Tailwind 4. A home é uma página só, com as seções em sequência, e cada projeto ganha a sua página em `/projetos/[slug]`, gerada estaticamente no build.

### O boot

Na primeira visita aparece uma tela de terminal "subindo" o site (`kubectl apply`, `argocd app sync`...). Enquanto ela está na tela, nada da página aparece. Quando o boot termina, os blocos visíveis entram em sequência e o resto vai sendo revelado conforme você rola. Quem controla isso é o `RevealRoot`: qualquer elemento com `data-reveal` entra com um desfoque subindo, e os títulos com `data-reveal="mask"` entram com uma máscara de baixo para cima. Clicar no boot pula a animação.

### As cenas 3D

Cada seção tem uma cena em Three.js puro no fundo (`src/lib/scenes.ts`):

- **Hero:** um terreno de pontos que ondula e reage ao mouse. Dá para arrastar e girar.
- **Sobre:** um cluster de pods hexagonais fazendo rollout, trocando de versão em onda.
- **Experiência:** painéis de métricas com gráficos que se atualizam sozinhos.
- **Projetos** e páginas de projeto: logs subindo, com as linhas de erro em verde.
- **Contato:** um globo com as regiões ligadas por arcos e pacotes viajando entre elas.

Para não pesar, uma cena só é criada quando a seção chega perto da tela e é destruída quando se afasta, então nunca tem mais que duas ou três rodando ao mesmo tempo. Todas leem a posição do mouse de um único listener (`src/lib/pointer.ts`), que também alimenta o cursor em forma de mira.

### As seções

- **Sobre:** as ferramentas que eu uso ficam numa esfera que gira sozinha. Dá para arrastar e jogar, e os filtros (infra, observabilidade, linguagens, apps) acendem só as daquela camada.
- **Experiência:** uma linha do tempo que vai se preenchendo com a rolagem. O ano grande à esquerda acompanha a experiência que está no meio da tela.
- **Projetos:** cards com filtro por área. Clicar abre a página do projeto atrás de uma cortina verde que cobre a tela, troca a rota e sai por cima.
- **Conteúdo:** os carrosséis que eu publico no [@dan_the_dev](https://instagram.com/dan_the_dev), desenhados pelo mesmo componente que monta os slides, com um lightbox para passar slide a slide.
- **Contato:** clicar no card copia o meu email.

### A página de cada projeto

Ela junta os prints (que abrem num visualizador em tela cheia, com setas e miniaturas), uma visão geral, a história do projeto, o que eu aprendi, a stack e a arquitetura em camadas. A numeração das seções se ajusta sozinha: se um projeto não tem prints ou não tem aprendizados, aquela parte some.

Os prints de sistemas internos foram tirados com os nomes de clientes, bancos, nós e serviços borrados, e sem nenhum painel de custo.

### Idioma

Tudo existe em português e em inglês. O botão PT/EN no topo troca na hora e a escolha fica salva no navegador.

## Onde mexer

Quase tudo o que aparece no site sai de `src/data/portfolio.ts`:

- `PROJECTS`: os projetos. Basta acrescentar um item com `slug`, `category`, `tech`, os textos em `pt` e `en` e, se tiver, `image` (capa) e `shots` (prints). O card e a página aparecem sozinhos.
- `EXP`: a experiência, com período, cargo e os tópicos nos dois idiomas.
- `POSTS`: os carrosséis, slide a slide.
- `I18N`: os textos da interface.

O resto está organizado assim:

```
src/
├── app/                  # home, páginas de projeto, CSS global e favicon
├── components/
│   ├── ds/               # peças visuais base: botão, gato, logo, slide
│   └── site/             # seções, cenas, cursor, boot e página de projeto
├── contexts/             # idioma, boot e a transição entre páginas
├── data/portfolio.ts     # o conteúdo
└── lib/                  # cenas Three.js e o ponteiro compartilhado
```

As cores, as fontes e os utilitários (como o `poster`, da tipografia condensada dos títulos) ficam no `@theme` de `src/app/globals.css`.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Three.js · fontes IBM Plex Sans, JetBrains Mono, Archivo e Big Shoulders via `next/font` · ícones do Simple Icons e do Iconify.

## Fala comigo

- Email: rafaeldantasboeira@gmail.com
- GitHub: [@Danzokka](https://github.com/Danzokka)
- LinkedIn: [rafael-dantas-boeira](https://www.linkedin.com/in/rafael-dantas-boeira/)
- Instagram: [@dan_the_dev](https://instagram.com/dan_the_dev)
