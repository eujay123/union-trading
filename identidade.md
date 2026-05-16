# Identidade de Marca e Estrutura do Projeto: Union International Trading

Este documento detalha a fundação estratégica, o sistema de design e a arquitetura técnica da **Union International Trading**, consolidando a visão de um "instrumento digital" cinematográfico e de alta precisão.

---

## 1. A Marca: Union International Trading

A **Union International Trading** é uma empresa moçambicana de elite, parte do **Grupo Union**, especializada na importação e distribuição estratégica de lubrificantes e pneus de alto desempenho. A marca atua como a ponte vital entre a inovação global e as necessidades industriais de Moçambique.

### Pilar Estratégico
- **Propósito:** "Conectar Moçambique ao que há de melhor no mundo, garantindo que o movimento do país nunca pare."
- **Slogan:** *"Em cada movimento, confie na Union."*
- **Missão:** Ser o parceiro de referência em comércio internacional, entregando produtos de alta qualidade com excelência operacional.
- **Visão:** Liderar a distribuição de lubrificantes e pneus na África Austral.
- **Valores:** Integridade, Excelência, Confiabilidade, Inovação e Compromisso com o Desenvolvimento Sustentável.

---

## 2. Tom de Comunicação

O tom da Union é **Autoritário, Técnico e Cinematográfico**. Não é apenas marketing; é um manifesto de precisão industrial.

- **Voz:** Séria, confiável e direta. Evita superlativos vazios, focando em "Performance" e "Durabilidade".
- **Linguagem:** Uso frequente de termos técnicos (SKUs, performance, fundação, precisão).
- **Estilo Visual:** Inspirado na arquitetura brutalista e em salas de controle de alta tecnologia — densidade de informação com estética premium.

---

## 3. Design System (Preset: Brutalist Signal Custom)

A estética segue o preset **"Brutalist Signal"**, adaptado com a cor institucional azul para transmitir confiança e herança corporativa.

### Paleta de Cores (Tokens)
- **Background:** `#F5F3EE` (Off-white/Papel) — Uma base orgânica que evita o branco digital cansativo.
- **Primary / Accent:** `#154E9B` (Union Blue) — Um azul profundo e vibrante que simboliza autoridade e fluidez (lubrificantes).
- **Dark:** `#111111` (Preto Obsidiana) — Usado para contrastes dramáticos em seções de "Manifesto".
- **Textura:** Sobreposição de ruído (noise) global via SVG filter (opacidade 0.05) para eliminar gradientes chapados.

### Tipografia
- **Headings (Bold Sans):** `Space Grotesk` — Tipografia geométrica e moderna com tracking ajustado para máxima legibilidade técnica.
- **Drama (Massive Serif Italic):** `DM Serif Display` — Usada para palavras de impacto no Hero e na Filosofia, trazendo um contraste editorial de luxo.
- **Data (Monospace):** `Space Mono` — Utilizada para metadados, códigos de produtos (SKUs) e indicadores de status, reforçando a sensação de software industrial.

### Micro-Interações
- **Botões Magnéticos:** Efeito de atração física ao cursor com `scale(1.03)` e transições `cubic-bezier`.
- **Bordas:** Arredondamento generoso (`rounded-[2rem]` a `rounded-[3rem]`) em todos os contêineres, criando uma interface amigável apesar da rigidez brutalista.

---

## 4. Estrutura do Projeto

O projeto é construído sobre uma stack moderna focada em performance e animações de estado da arte.

### Stack Técnica
- **Core:** React 19 + Vite (HMR ultra-rápido).
- **Styling:** Tailwind CSS v3.4.17 (Design atômico).
- **Animações:** GSAP 3 (GreenSock) + ScrollTrigger (Sequenciamento cinematográfico).
- **Ícones:** Lucide React (Consistência geométrica).

### Arquitetura de Componentes
1.  **Navbar ("A Ilha Flutuante"):** Pill-shaped, fixa, com transição de transparência para desfoque de fundo (backdrop-blur) ao rolar.
2.  **Hero Section ("A Cena de Abertura"):** Vídeo de fundo em alta fidelidade com sequência de scroll que controla o desfoque e a reprodução do vídeo conforme o usuário navega.
3.  **Features ("Artefatos Funcionais"):** 
    - **Diagnostic Shuffler:** Cards de pneus, lubrificantes e obras com animação de pilha infinita.
4.  **Philosophy ("O Manifesto"):** Seção em modo escuro com marquee (letreiro digital) dos parceiros estratégicos (Volvo, Petronas, etc.).
5.  **Protocol ("Sticky Stacking"):** Cards de Missão, Visão e Valores que se empilham verticalmente com efeitos de escala e desfoque progressivo.
6.  **Sistema de Cotação:** Fluxo dinâmico para seleção de produtos e envio de pedidos direto para a equipe comercial.

---

## 5. Ativos e Recursos
- **Imagens/Vídeos:** Buscados para refletir o "Image Mood" de biotecnologia, infraestrutura pesada e logística internacional.
- **SEO:** Estrutura semântica rigorosa com títulos H1 únicos, meta-descrições focadas em conversão e performance otimizada para Core Web Vitals.

---
*Documento gerado para servir como a "Fonte da Verdade" (Single Source of Truth) do design e desenvolvimento da Union International Trading.*
