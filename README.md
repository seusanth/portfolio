# Santh Designer — Portfólio

Site estático de portfólio criado a partir das informações públicas do Instagram [@santhdesigner](https://www.instagram.com/santhdesigner) e do portfólio anterior em `seusanth.github.io/portfolio`.

## Estrutura

- `index.html` — conteúdo e seções (hero, sobre, serviços, skills, projetos, contato)
- `styles.css` — estilos, tema escuro e responsividade
- `script.js` — menu mobile, animações, filtros e lightbox
- `assets/` — logo, foto, projetos e 12 imagens dos posts do Instagram (salvas localmente)
- `posts-data.json` — referência com os links e URLs originais dos posts extraídos

## Como visualizar

Abra `index.html` no navegador, ou sirva a pasta com um servidor estático:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar

O site é 100% estático. Para publicar no GitHub Pages:

1. Crie um repositório e envie todos os arquivos da pasta.
2. Em **Settings → Pages**, selecione **Deploy from a branch** → `main` / `/root`.
3. O site ficará disponível em `https://<usuario>.github.io/<repositorio>/`.

## Informações usadas

- Nome: Santh (Santiago) — *AI & Graphic Designer*
- Bio do Instagram: «Especialista em conteúdo visual · Carrosséis | Estampas | Layouts · Projetos e parcerias no direct»
- 21 posts, 48 seguidores (dados públicos do perfil)
- Experiência: 8 anos em design gráfico; Photoshop, Illustrator e Premiere
- Projetos: peças para Soul Fitness, FrameDrop, Fannice Senna e Strada Motors
- Posts do Instagram: 12 publicações com imagens, datas e legendas reais (carrosséis "Quem sou eu?", "Postfólio Psicologia", artes de games, flyers e conteúdo sobre IA/design)
- Canais: Instagram, Behance, WhatsApp e e-mail (conforme portfólio anterior)

> As URLs originais das imagens do Instagram expiram. Por isso as fotos foram baixadas para `assets/posts/`; para atualizar o feed, edite os cards da seção `#instagram` no `index.html`.

> Para atualizar textos, números ou imagens, edite diretamente o `index.html` e a pasta `assets/`.
