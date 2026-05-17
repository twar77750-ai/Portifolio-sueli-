# 🌿 Guia de Personalização — Portfólio Terapeuta

## Estrutura de arquivos

```
portfolio-terapeuta/
│
├── index.html              ← Estrutura e conteúdo do site
│
├── css/
│   ├── reset.css           ← Reset de estilos (não editar)
│   ├── variables.css       ← ✏️  CORES, FONTES — edite aqui!
│   ├── layout.css          ← Grid e estrutura base
│   ├── components.css      ← Botões, navbar, formulário, etc.
│   ├── sections.css        ← Estilos por seção
│   ├── animations.css      ← Animações e transições
│   └── responsive.css      ← Adaptações mobile/tablet
│
└── js/
    └── main.js             ← Lógica: slider, menu, contador, form
```

---

## ✏️  O que personalizar

### 1. Cores (css/variables.css)
Procure a seção `PALETA PRINCIPAL` e troque:

```css
--color-primary:        #7A6652;   /* Cor principal (botões, destaques) */
--color-primary-dark:   #5C4D3E;   /* Versão escura */
--color-primary-light:  #D4C4B0;   /* Versão clara */
--color-primary-pale:   #F5EFE8;   /* Fundo suave */
--color-accent:         #B9956C;   /* Cor de destaque secundária */
```

**Paletas sugeridas por perfil:**
| Perfil                | Primary    | Accent     |
|----------------------|------------|------------|
| Calma / Acolhimento  | `#7A6652`  | `#B9956C`  |
| Confiança / Sério    | `#3D6B8C`  | `#6EA8C8`  |
| Gentileza / Afeto    | `#8C5A7A`  | `#C48AB0`  |
| Natureza / Equilíbrio| `#5A7A5A`  | `#8AAE8A`  |
| Clareza / Leveza     | `#6B7A9C`  | `#9EB0D4`  |

### 2. Fontes (css/variables.css)
```css
--font-display: 'Cormorant Garamond', Georgia, serif;  /* Títulos */
--font-body:    'DM Sans', system-ui, sans-serif;       /* Textos */
```
Troque pelo nome de qualquer fonte do Google Fonts e atualize o `<link>` no `index.html`.

---

## 🔑  Dados para substituir no index.html

| O que substituir               | Onde encontrar              |
|--------------------------------|-----------------------------|
| `Ana Beatriz`                  | Buscar e substituir todo    |
| `Psicóloga & Terapeuta`        | `<title>` e seções          |
| `CRP 00/00000`                 | Navbar, footer, hero badge  |
| `(00) 00000-0000`              | Canal WhatsApp e footer     |
| `5500000000000`                | Links do WhatsApp (wa.me)   |
| `@seu_usuario`                 | Links do Instagram          |
| `contato@email.com`            | Canal e-mail                |
| `Rua ___, N — Cidade/UF`       | Canal localização           |
| `Universidade Federal ___`     | Seção Sobre                 |

---

## 📸  Adicionar foto real

**Na seção Hero**, substitua o bloco:
```html
<div class="hero__photo-placeholder">
  <i data-lucide="user-round"></i>
  <span>Sua foto aqui</span>
</div>
```
Por:
```html
<img src="imagens/foto-perfil.jpg" alt="Nome da Terapeuta" />
```

**Na seção Sobre**, faça o mesmo com `.sobre__photo-placeholder`.

> 💡 Use fotos com fundo neutro ou desfocado, proporção 3:4 para o Hero.

---

## 📱  WhatsApp — Mensagem personalizada

No link do WhatsApp, edite o texto após `?text=`:
```
https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.
```
Espaços = `%20` | Use [este codificador](https://www.urlencoder.org/)

---

## 📋  Formulário de contato

O formulário está configurado para **simulação**. Para ativá-lo de verdade:

### Opção 1 — Formspree (gratuito, sem servidor)
1. Acesse [formspree.io](https://formspree.io) e crie uma conta
2. Crie um novo formulário e copie o ID (ex: `xvgepzkq`)
3. Em `js/main.js`, descomente o bloco "INTEGRAÇÃO REAL" e substitua `SEU_ID`

### Opção 2 — EmailJS (gratuito)
Siga a documentação em [emailjs.com](https://www.emailjs.com)

---

## 🌐  Publicar o site

**Opções gratuitas:**
- **Vercel**: arraste a pasta para [vercel.com](https://vercel.com)
- **Netlify**: arraste para [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: suba para um repositório público e ative Pages

**Com domínio próprio:**
Após publicar em Vercel/Netlify, configure um domínio como `dranomesobrenome.com.br`

---

## ✅  Checklist antes de publicar

- [ ] Nome, CRP e especialidade atualizados
- [ ] Foto profissional adicionada
- [ ] Número de WhatsApp correto
- [ ] Usuário do Instagram correto
- [ ] E-mail correto
- [ ] Endereço do consultório atualizado
- [ ] Horários de atendimento corretos
- [ ] Formulário configurado (Formspree ou similar)
- [ ] Áreas de atuação revisadas e personalizadas
- [ ] Depoimentos reais adicionados (com autorização dos pacientes)
- [ ] Cores alinhadas com a identidade visual
- [ ] Testado no celular

---

*Desenvolvido com HTML5 · CSS3 · JavaScript Vanilla — sem dependências pesadas.*
