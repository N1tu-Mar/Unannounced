# PROMPT.md — (un)announced. Website Build Specification

> **Purpose**: This document is the single source of truth for building the (un)announced. website from scratch. Follow every section precisely. Do not deviate from the design system, layout specifications, or interaction patterns described here.

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System & Brand Kit](#4-design-system--brand-kit)
5. [Global Layout & Components](#5-global-layout--components)
6. [Page-by-Page Specifications](#6-page-by-page-specifications)
7. [Animations & Interactions](#7-animations--interactions)
8. [Responsive Behavior](#8-responsive-behavior)
9. [Accessibility](#9-accessibility)
10. [Deployment Notes](#10-deployment-notes)

---

## 1. PROJECT OVERVIEW

**(un)announced.** is a Gen Z-led media brand that spotlights builders, creators, entrepreneurs, and thinkers _before they're everywhere_. The website is a **digital content house** — a collaborative space made up of themed "rooms," each dedicated to a different form of content (video, writing, podcasts, founder stories).

### Brand Personality

- **Tone**: Understated confidence. Not loud, not trying too hard. Cool by default.
- **Aesthetic**: Textured, editorial, slightly retro. Think: a moody magazine meets a vintage desktop interface.
- **Audience**: Gen Z creators, builders, founders, thinkers.

### Site Map

```
/                   → Home (landing page)
/about              → About page (culture, spotlight, the shift)
/concept            → Concept page (what the content house is)
/rooms              → Rooms hub (the 4 doors)
/rooms/studio       → The Studio (video content)
/rooms/library      → The Library (written content)
/rooms/living-room  → The Living Room (podcasts)
/rooms/basement     → The Basement (founder stories)
/team               → Team page (grid of members)
/apply              → Apply page (application form / CTA)
```

---

## 2. TECH STACK

| Layer               | Technology                          | Rationale                                                                                                           |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Framework**       | **Next.js 14 (App Router)**         | File-based routing, SSR/SSG, image optimization, great DX                                                           |
| **Language**        | **TypeScript**                      | Type safety, better IDE support, fewer runtime bugs                                                                 |
| **Styling**         | **Tailwind CSS v3**                 | Utility-first, rapid development, easy responsive design                                                            |
| **Animations**      | **Framer Motion**                   | Declarative React animations, scroll-triggered reveals, page transitions                                            |
| **Fonts**           | **Google Fonts + local @font-face** | Anonymous Pro from Google Fonts; Futura via @font-face (host locally); Chloe (logo only) via @font-face or SVG logo |
| **Package Manager** | **pnpm** (or npm)                   | Fast, disk-efficient                                                                                                |
| **Deployment**      | **Vercel**                          | Native Next.js support, edge functions, instant deploys                                                             |

### Key Dependencies

```json
{
  "next": "^14",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "@tailwindcss/typography": "latest"
}
```

### Installation Commands

```bash
npx create-next-app@latest unannounced --typescript --tailwind --app --src-dir
cd unannounced
npm install framer-motion
```

---

## 3. PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              # Root layout (nav, footer, background texture)
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── concept/
│   │   └── page.tsx            # Concept page
│   ├── rooms/
│   │   ├── page.tsx            # Rooms hub (ENTER? screen → doors)
│   │   ├── studio/
│   │   │   └── page.tsx        # The Studio
│   │   ├── library/
│   │   │   └── page.tsx        # The Library
│   │   ├── living-room/
│   │   │   └── page.tsx        # The Living Room
│   │   └── basement/
│   │       └── page.tsx        # The Basement
│   ├── team/
│   │   └── page.tsx            # Team page
│   └── apply/
│       └── page.tsx            # Apply page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Global navigation bar
│   │   ├── Footer.tsx          # Global footer (if needed)
│   │   └── PageWrapper.tsx     # Framer Motion page transition wrapper
│   ├── ui/
│   │   ├── NavPill.tsx         # Individual nav pill button
│   │   ├── Logo.tsx            # (u)a. abbreviated logo component
│   │   ├── LogoFull.tsx        # (un)announced. full logo component
│   │   ├── DoorCard.tsx        # Clickable door component for rooms page
│   │   ├── TeamCard.tsx        # Team member photo card
│   │   ├── RetroComputer.tsx   # The retro CRT monitor SVG/component
│   │   └── SectionHeading.tsx  # Reusable heading with Anonymous Pro styling
│   └── animations/
│       ├── FadeIn.tsx          # Fade-in-on-scroll wrapper
│       └── StaggerChildren.tsx # Staggered children animation wrapper
├── styles/
│   └── globals.css             # Tailwind directives, @font-face, CSS custom properties
├── public/
│   ├── fonts/
│   │   ├── Chloe-Regular.woff2      # Chloe font file (for logo)
│   │   └── Futura-Medium.woff2      # Futura font file (body)
│   ├── textures/
│   │   └── paper-grain.png          # The gray paper/concrete texture (tileable)
│   └── images/
│       ├── retro-computer.png        # Halftone retro CRT monitor image
│       ├── door.png                  # Dark door image used for rooms
│       └── team/                     # Team member headshots (placeholder)
│           └── placeholder.png
└── lib/
    ├── constants.ts            # Site-wide constants (nav links, room data, team data)
    └── types.ts                # TypeScript interfaces
```

---

## 4. DESIGN SYSTEM & BRAND KIT

### 4.1 Color Palette

Define these as CSS custom properties in `globals.css` AND as Tailwind theme extensions in `tailwind.config.ts`:

| Token              | Hex       | Usage                                                           |
| ------------------ | --------- | --------------------------------------------------------------- |
| `--color-charcoal` | `#4A4A4A` | Primary background tone, medium gray                            |
| `--color-ink`      | `#1F1F1F` | Darkest tone — text emphasis, dark accents                      |
| `--color-stone`    | `#8C8C8C` | Lighter gray — secondary text, muted elements                   |
| `--color-fog`      | `#B0B0B0` | Tertiary — subtle labels, placeholder text                      |
| `--color-cream`    | `#E8E4DF` | Off-white — for text on dark backgrounds                        |
| `--color-white`    | `#FFFFFF` | Pure white — nav pill borders, bright accents                   |
| `--color-accent`   | `#6B8CCE` | Muted blue — used for "ENTER?" text on CRT, links, hover states |

#### Tailwind Config Extension

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      charcoal: '#4A4A4A',
      ink: '#1F1F1F',
      stone: '#8C8C8C',
      fog: '#B0B0B0',
      cream: '#E8E4DF',
      accent: '#6B8CCE',
    },
  },
},
```

### 4.2 Typography

#### Font Stack

| Role         | Font Family     | Weight                    | Fallback                                 | Usage                                                                                                                   |
| ------------ | --------------- | ------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Logo**     | `Chloe`         | Regular (400)             | `'Playfair Display', Georgia, serif`     | Only used for "(un)announced." wordmark and "(u)a." abbreviation. High-contrast serif with dramatic thick/thin strokes. |
| **Headings** | `Anonymous Pro` | Regular (400), Bold (700) | `'Courier New', monospace`               | All section headings, page titles, nav labels, room names. Monospaced. Gives the editorial/zine feel.                   |
| **Body**     | `Futura`        | Medium (500), Book (400)  | `'Century Gothic', 'Avenir', sans-serif` | All paragraph text, descriptions, body copy. Clean geometric sans-serif.                                                |

> **IMPORTANT**: If Chloe is unavailable as a web font, use **Playfair Display** (available on Google Fonts) as the closest substitute — it has similar high-contrast serif characteristics with dramatic ball terminals. The "(un)" portion of the logo should render in a lighter opacity or lighter color (#8C8C8C) while "announced." renders in the dark ink color (#1F1F1F) or slightly lighter on the textured background.

#### Font Loading (globals.css)

```css
@font-face {
  font-family: "Chloe";
  src: url("/fonts/Chloe-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Futura";
  src: url("/fonts/Futura-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Anonymous Pro — load from Google Fonts in layout.tsx <head> */
/* https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap */

/* Playfair Display fallback for Chloe — load from Google Fonts */
/* https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap */
```

#### Typography Scale

```
Logo (full):       80px–120px desktop / 40px–60px mobile  | Chloe / Playfair Display
Logo (abbrev):     48px–64px desktop / 32px–40px mobile   | Chloe / Playfair Display
Page Title:        48px–72px desktop / 32px–40px mobile   | Anonymous Pro 400
Section Heading:   28px–36px desktop / 22px–28px mobile   | Anonymous Pro 700
Sub-heading:       20px–24px desktop / 18px–20px mobile   | Anonymous Pro 400
Body:              16px–18px desktop / 15px–16px mobile   | Futura 400/500
Caption/Label:     13px–14px                              | Futura 400
Nav Label:         16px–18px                              | Anonymous Pro 400
```

### 4.3 Background Texture

The entire site uses a **gray paper/concrete texture** as its background. This is THE defining visual element of the brand — every page sits on this texture.

#### Implementation

```css
body {
  background-color: #4a4a4a;
  background-image: url("/textures/paper-grain.png");
  background-repeat: repeat;
  background-size: 400px 400px;
  /* The texture tile should be a subtle gray noise/paper texture.
     It should NOT be heavy — just enough grain to feel tactile.
     Overall tone should match #4A4A4A to #555555 range. */
}
```

> **If no texture image is available**: Generate the grain effect with CSS:
>
> ```css
> body {
>   background-color: #4a4a4a;
>   position: relative;
> }
> body::before {
>   content: "";
>   position: fixed;
>   inset: 0;
>   opacity: 0.08;
>   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
>   background-size: 256px 256px;
>   pointer-events: none;
>   z-index: 0;
> }
> ```

### 4.4 Spacing System

Use Tailwind's default spacing scale. Key patterns:

- **Page padding**: `px-6 md:px-12 lg:px-20 xl:px-32`
- **Section vertical spacing**: `py-20 md:py-32 lg:py-40`
- **Element gaps**: `gap-6 md:gap-8 lg:gap-12`
- **Max content width**: `max-w-7xl mx-auto` (1280px)

### 4.5 Border & Shape Language

- **Nav pills**: `rounded-full border border-white/40` with `px-6 py-2`
- **Doors/cards**: Subtle rounded corners `rounded-md` or sharp rectangles
- **No heavy drop shadows** — the texture IS the depth. Use subtle `shadow-sm` or `shadow-md` only for interactive hover states.
- **Dividers**: Thin `border-b border-white/10` if needed.

---

## 5. GLOBAL LAYOUT & COMPONENTS

### 5.1 Root Layout (`app/layout.tsx`)

The root layout wraps every page. It includes:

1. The `<body>` with the background texture applied
2. The `<Navbar />` component (fixed or sticky at top)
3. A `<main>` content area
4. Page transition wrapper using Framer Motion

```
┌──────────────────────────────────────────────────────────────────┐
│  BODY (bg: textured gray #4A4A4A)                                │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  NAVBAR (sticky top, z-50, backdrop-blur)                  │  │
│  │  ┌──────┐ ┌──────┐ ┌───────┐ ┌──────┐ ┌─────┐ ┌──────┐  │  │
│  │  │ home │ │about │ │concept│ │rooms │ │team │ │apply │  │  │
│  │  └──────┘ └──────┘ └───────┘ └──────┘ └─────┘ └──────┘  │  │
│  │                                                            │  │
│  │  (u)a. logo — top-left corner                              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  <main> — Page content renders here                        │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Navbar Component (`components/layout/Navbar.tsx`)

#### Visual Spec

- **Position**: `fixed top-0 left-0 right-0 z-50`
- **Background**: `bg-transparent` default. On scroll: `bg-charcoal/80 backdrop-blur-md` (add class via scroll listener)
- **Height**: `h-16 md:h-20`
- **Layout**: Flexbox — logo left, nav pills center-right
- **Padding**: `px-6 md:px-12 lg:px-20`

#### Logo (Top-Left)

- Show abbreviated logo `(u)a.` on all pages
- Font: Chloe / Playfair Display
- Size: `text-3xl md:text-4xl`
- The `(u)` portion: `text-stone` (#8C8C8C) or `opacity-50`
- The `a.` portion: `text-cream` (#E8E4DF)
- Clickable — links to `/` (home)

#### Nav Pills

- Each nav link is a **pill-shaped button**
- Styling: `rounded-full border border-white/30 px-5 py-1.5 md:px-6 md:py-2`
- Text: `font-heading text-sm md:text-base text-cream/80` (Anonymous Pro)
- Hover: `bg-white/10 border-white/60 text-white` — transition 200ms
- Active page: `bg-white/15 border-white/50` — slightly more opaque fill
- Font: Anonymous Pro 400

#### Nav Links Array

```ts
const navLinks = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "concept", href: "/concept" },
  { label: "rooms", href: "/rooms" },
  { label: "team", href: "/team" },
  { label: "apply", href: "/apply" },
];
```

#### Mobile Navigation

- On screens < 768px: Replace pills with a **hamburger menu** (three horizontal lines, `text-cream`)
- The hamburger triggers a **full-screen overlay** menu
- Overlay: `fixed inset-0 bg-ink/95 backdrop-blur-lg z-50`
- Links stack vertically, centered, `text-2xl font-heading`
- Close button: `X` in top-right, same position as hamburger
- Animate overlay: slide in from right or fade in (Framer Motion)

### 5.3 Page Transition Wrapper (`components/layout/PageWrapper.tsx`)

Wrap every page's content in this component for consistent enter/exit animations.

```tsx
// Framer Motion AnimatePresence + motion.div
// Enter: opacity 0 → 1, y: 20 → 0, duration 0.5s, ease: easeOut
// Exit: opacity 1 → 0, duration 0.3s
```

### 5.4 Reusable Components

#### `FadeIn.tsx`

- Wraps any element. Fades in + slides up on scroll into viewport.
- Uses Framer Motion `useInView` hook + `motion.div`
- Props: `delay?: number`, `direction?: 'up' | 'left' | 'right'`, `duration?: number`

#### `SectionHeading.tsx`

- Renders a page/section title in Anonymous Pro
- Props: `text: string`, `size?: 'lg' | 'xl' | '2xl'`
- Default: `font-heading text-cream text-4xl md:text-6xl tracking-wide`

---

## 6. PAGE-BY-PAGE SPECIFICATIONS

---

### 6.1 HOME PAGE (`/`)

#### Purpose

The landing page. First impression. Big logo, big energy, minimal content.

#### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│                         [NAVBAR]                                 │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│           (un)announced.                                         │
│                        before it's everywhere                    │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Container**: Full viewport height (`min-h-screen`). Content vertically + horizontally centered using `flex items-center justify-center`.

**Logo — `(un)announced.`**:

- Font: Chloe / Playfair Display
- Size: `text-7xl md:text-8xl lg:text-[120px] xl:text-[140px]`
- The `(un)` characters: `text-stone/60` — lighter, muted gray, slightly transparent. The parentheses `()` should appear in a lighter weight or lighter color than the `un` inside them.
- The `announced.` characters: `text-ink` on light bg OR `text-charcoal` — darker, heavier. On the textured gray background they should be slightly darker than the bg (#3A3A3A or #333333) to create a subtle embossed/debossed look.
- The period `.` at the end is part of the wordmark. Always include it.
- **Letter-spacing**: `tracking-tight` or `-0.02em`
- **Line-height**: `leading-none`

**Tagline — `before it's everywhere`**:

- Position: Below and to the right of the logo, right-aligned with the end of "announced."
- Font: Anonymous Pro
- Size: `text-lg md:text-xl lg:text-2xl`
- Color: `text-stone/50` — very muted, ghostly
- Letter-spacing: `tracking-[0.2em]` — wide, airy monospace feel

**Animation**:

1. Page loads → 0.3s delay → Logo fades in from `opacity-0` to `opacity-1` + subtle `scale(0.97)` to `scale(1)` — duration 0.8s, ease `[0.25, 0.46, 0.45, 0.94]`
2. 0.6s delay → Tagline fades in from `opacity-0, y: 10` to `opacity-1, y: 0` — duration 0.6s

**NO scroll content on home page**. It is a single viewport. Clean.

---

### 6.2 ABOUT PAGE (`/about`)

#### Purpose

Explains who (un)announced is through three pillars: culture, spotlight, the shift.

#### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│  about                                                           │
│  (un)announced.                                                  │
│                                                                  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   culture    │  │  spotlight   │  │  the shift   │           │
│  │              │  │              │  │              │           │
│  │  (un)anno... │  │  We spot-   │  │  We're       │           │
│  │  is a Gen Z  │  │  light      │  │  focused on  │           │
│  │  media brand │  │  builders   │  │  the shift   │           │
│  │  for Gen Z,  │  │  creators,  │  │  — how vis-  │           │
│  │  by Gen Z    │  │  entrepre-  │  │  ibility...  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Section 1 — Header**:

- `about` in Anonymous Pro, `text-5xl md:text-7xl`, `text-cream`, positioned top-left of content area
- Below it: `(un)announced.` in Chloe/Playfair Display, `text-4xl md:text-5xl`, same color treatment as home logo (lighter `(un)`, darker `announced.`)
- Padding: `pt-32 md:pt-40` (below navbar)

**Section 2 — Three Pillars**:

- Layout: `grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12`
- Each pillar is a column with:
  - **Title**: Anonymous Pro Bold, `text-2xl md:text-3xl`, `text-cream`
  - **Description**: Futura, `text-base md:text-lg`, `text-cream/70`, `leading-relaxed`
  - Text centered within each column on desktop

**Pillar Content**:

1. **culture**: "(un)announced is a Gen Z-led media brand for Gen Z, by Gen Z"
2. **spotlight**: "We spotlight builders, creators, entrepreneurs and thinkers before they're everywhere"
3. **the shift**: "We're focused on the shift — how visibility, networking and credibility are changing because of young people"

**Animation**:

- Header fades in on load (0.3s delay)
- Three pillars stagger in from bottom: each column delays by 0.15s
- Use `FadeIn` component with `delay` prop

---

### 6.3 CONCEPT PAGE (`/concept`)

#### Purpose

Explains the "digital content house" concept in more detail.

#### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│                          our  concept                            │
│                                                                  │
│                          (un)announced wants to curate           │
│                          high-quality Gen Z voices.              │
│                                                                  │
│                          Across the internet, a new              │
│                          generation of thinkers, builders,       │
│                          and storytellers is emerging — but      │
│                          too often their ideas get lost in       │
│                          the noise.                              │
│                                                                  │
│                          (un)announced is a Gen Z media          │
│                          brand built to surface those voices.    │
│                          At the heart of it is our digital       │
│                          content house — a collaborative space   │
│                          made up of themed rooms, each           │
│                          dedicated to a different form of        │
│                          content.                                │
│                                                                  │
│                          From ideas and entrepreneurship to      │
│                          culture, storytelling, and design,      │
│                          every room showcases creators shaping   │
│                          the conversations of our generation.    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Layout**: Content is **right-aligned** on desktop. The text block sits in the right ~60% of the viewport. Left side is open space.

- Container: `max-w-7xl mx-auto`, content pushed right with `ml-auto max-w-2xl`

**Title — `our concept`**:

- Font: Anonymous Pro 400
- Size: `text-5xl md:text-7xl`
- Color: `text-cream`
- Spacing: `tracking-wide`
- The two words should have a visible gap (natural word spacing or `gap-4` in a flex row)

**Body Text**:

- Font: Futura (body font)
- Size: `text-base md:text-lg`
- Color: `text-cream/75`
- Line-height: `leading-relaxed` (~1.7)
- Paragraphs separated by `mb-6`
- Max-width: `max-w-xl` or `max-w-2xl`

**Body Copy** (exact text):

```
(un)announced wants to curate high-quality Gen Z voices.

Across the internet, a new generation of thinkers, builders, and storytellers is emerging — but too often their ideas get lost in the noise.

(un)announced is a Gen Z media brand built to surface those voices. At the heart of it is our digital content house — a collaborative space made up of themed rooms, each dedicated to a different form of content.

From ideas and entrepreneurship to culture, storytelling, and design, every room showcases creators shaping the conversations of our generation.
```

**Animation**:

- Title fades in first (0.2s delay)
- Each paragraph fades in sequentially with staggered delays (0.1s between each)

---

### 6.4 ROOMS HUB PAGE (`/rooms`)

This page has **TWO STATES**: an entry screen and the actual rooms view.

#### STATE 1 — "ENTER?" Screen

##### Purpose

A gateway/interstitial. User sees a retro CRT computer monitor with "ENTER?" on the screen. Clicking it reveals the rooms.

##### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│                                                                  │
│                    ┌─────────────────────┐                       │
│                    │  ┌───────────────┐  │                       │
│                    │  │               │  │                       │
│                    │  │   ENTER?      │  │  ← CRT Monitor       │
│                    │  │               │  │                       │
│                    │  └───────────────┘  │                       │
│                    │   ▫️  ═══════  ▫️   │                       │
│                    └────────┬────────────┘                       │
│                    ┌────────┴────────────┐                       │
│                    │ ⌨️ KEYBOARD          │                       │
│                    └─────────────────────┘                       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

##### Specifications

**Computer Image**:

- Use the halftone/dithered retro CRT monitor image from the design file (`/public/images/retro-computer.png`)
- If image unavailable: Build a **CSS/SVG retro computer** — rounded rectangle monitor on a stand, with a darkened screen area
- Center horizontally and vertically in the viewport
- Size: `w-[300px] md:w-[450px] lg:w-[550px]` — scaled proportionally

**"ENTER?" Text**:

- Positioned INSIDE the monitor screen area (absolutely positioned overlay)
- Color: `text-accent` (#6B8CCE) — muted blue
- Font: Anonymous Pro Bold
- Size: `text-3xl md:text-5xl`
- **Blinking cursor effect**: After "ENTER?" show a blinking `_` character with CSS animation:
  ```css
  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
  ```
- The entire monitor area is **clickable** (`cursor-pointer`)

**Click Behavior**:

- On click → transition to STATE 2 (the doors view)
- Transition: The monitor fades out + scales down slightly, then the doors view fades in
- Use React state: `const [entered, setEntered] = useState(false)`
- Use Framer Motion `AnimatePresence` to handle the swap

**Hover on monitor**:

- Subtle screen glow: `shadow-[0_0_30px_rgba(107,140,206,0.15)]` on the screen area
- "ENTER?" text slightly increases opacity

#### STATE 2 — Rooms / Doors View

##### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│                                                                  │
│   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐            │
│   │        │   │        │   │        │   │        │            │
│   │  DOOR  │   │  DOOR  │   │  DOOR  │   │  DOOR  │            │
│   │        │   │        │   │        │   │        │            │
│   │   🚪   │   │   🚪   │   │   🚪   │   │   🚪   │            │
│   │        │   │        │   │        │   │        │            │
│   └────────┘   └────────┘   └────────┘   └────────┘            │
│   The Studio   The Library  The Living   The Basement           │
│                              Room                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

##### Specifications

**Layout**: `grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8`, centered, with generous `pt-32 pb-20`

**Door Cards** (`DoorCard.tsx`):
Each card consists of:

1. A **door image** — dark gray door with a subtle frame and handle (`/public/images/door.png`)
   - If image unavailable: CSS door — `bg-ink rounded-sm` rectangle with a small circle for the handle
   - Aspect ratio: approximately 2:3 (portrait orientation)
   - Size: `w-full max-w-[200px] md:max-w-[240px]` per card
2. A **label** below the door
   - Font: Anonymous Pro 400
   - Size: `text-sm md:text-base`
   - Color: `text-cream`
   - Centered below each door

**Door Data**:

```ts
const rooms = [
  { name: "The Studio", slug: "studio" },
  { name: "The Library", slug: "library" },
  { name: "The Living Room", slug: "living-room" },
  { name: "The Basement", slug: "basement" },
];
```

**Hover on Door**:

- Door image: `scale(1.03)` + subtle glow/lighten `brightness(1.1)`
- Transition: 300ms ease
- Cursor: `cursor-pointer`
- Label: shifts to `text-white`

**Click**: Navigate to `/rooms/[slug]`

**Animation on entry**:

- Four doors stagger in from bottom: each door delays by 0.12s
- `opacity: 0 → 1`, `y: 30 → 0`

---

### 6.5 INDIVIDUAL ROOM PAGES (`/rooms/[room]`)

All four room pages share the **same layout template**. Only the content changes.

#### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│                                                                  │
│   ┌────────┐                                                     │
│   │        │              the studio                             │
│   │  DOOR  │                                                     │
│   │        │              Where creativity meets videography.    │
│   │   🚪   │                                                     │
│   │        │              This is where ideas turn into visuals. │
│   └────────┘              long-form, short-form, and everything  │
│                           in between.                            │
│                                                                  │
│                           This room focuses on video content     │
│                           and visual storytelling.               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Layout**: Two-column on desktop, stacked on mobile.

- `grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16`
- Left column: Door image (smaller than the hub page doors, ~200–250px wide)
- Right column: Room name + description text

**Room Title**:

- Font: Anonymous Pro 400
- Size: `text-4xl md:text-6xl`
- Color: `text-cream`

**Description Text**:

- Font: Futura
- Size: `text-base md:text-lg`
- Color: `text-cream/70`
- Line-height: `leading-relaxed`

**Room Content Data**:

```ts
const roomData = {
  studio: {
    title: "the studio",
    tagline: "Where creativity meets videography.",
    description: [
      "This is where ideas turn into visuals. long-form, short-form, and everything in between.",
      "This room focuses on video content and visual storytelling.",
    ],
  },
  library: {
    title: "the library",
    tagline: "Where ideas slow down and thinking goes deeper.",
    description: [
      "This is where thoughts turn into words. essays, reflections, analysis, and long-form writing that delve deeper into ideas.",
      "This room focuses on written work and intentional thinking.",
    ],
  },
  "living-room": {
    title: "the living room",
    tagline: "Where conversations are sparked and ideas are explained.",
    description: [
      "This is where the conversation starts. from big ideas to quiet thoughts.",
      "This room focuses on discussions, reflections and connections in real time via podcasts.",
    ],
  },
  basement: {
    title: "the basement",
    tagline:
      "where the behind-the-scenes of ideas, finished and unfinished, come to life.",
    description: [
      "This is where you find out more about what people are building.",
      "This room focuses on the highs and lows of the founder life: what worked and what went wrong.",
    ],
  },
};
```

**Animation**: Door fades in from left, text fades in from right. Staggered 0.2s.

---

### 6.6 TEAM PAGE (`/team`)

#### Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│  meet the team                                                   │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │ IMG  │  │ IMG  │  │ IMG  │  │ IMG  │                        │
│  │      │  │      │  │      │  │      │                        │
│  └──────┘  └──────┘  └──────┘  └──────┘                        │
│  [NAME]    [NAME]    [NAME]    [NAME]                           │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │ IMG  │  │ IMG  │  │ IMG  │  │ IMG  │                        │
│  │      │  │      │  │      │  │      │                        │
│  └──────┘  └──────┘  └──────┘  └──────┘                        │
│  [NAME]    [NAME]    [NAME]    [NAME]                           │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │ IMG  │  │ IMG  │  │ IMG  │  │ IMG  │                        │
│  │      │  │      │  │      │  │      │                        │
│  └──────┘  └──────┘  └──────┘  └──────┘                        │
│  [NAME]    [NAME]    [NAME]    [NAME]                           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Title — `meet the team`**:

- Font: Anonymous Pro 400
- Size: `text-4xl md:text-6xl`
- Color: `text-cream`
- Position: Top-left, `pt-28 md:pt-36 pb-12`

**Team Grid**:

- Layout: `grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8`
- 12 team members total (3 rows × 4 columns on desktop)

**Team Card** (`TeamCard.tsx`):

- **Photo**: Square aspect ratio `aspect-square`, `rounded-md`, `object-cover`
  - Placeholder: Light gradient placeholder image (the sky/hills placeholder from the mockup, or a neutral gray `bg-stone/30` with an icon)
  - On hover: slight scale `scale(1.02)`, subtle overlay glow
- **Name**: Below photo, centered
  - Font: Anonymous Pro 400
  - Size: `text-sm md:text-base`
  - Color: `text-cream`
  - Placeholder text: `[INSERT NAME]` — in production this will be replaced with real names

**Team Data Structure**:

```ts
interface TeamMember {
  name: string;
  role?: string; // optional subtitle
  image: string; // path to headshot
}

const teamMembers: TeamMember[] = [
  { name: "[INSERT NAME]", image: "/images/team/placeholder.png" },
  // ... repeat 12 times
];
```

**Animation**: Cards stagger in — each card delays by 0.05s, fading up from `y: 20`.

---

### 6.7 APPLY PAGE (`/apply`)

> **NOTE**: The PDF mockup does not show the apply page layout in detail. Design this as a **clean, minimal application form or CTA page** that fits the brand.

#### Recommended Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  (u)a.                    [NAVBAR]                               │
│                                                                  │
│                                                                  │
│                      apply                                       │
│                                                                  │
│                      think you belong here?                      │
│                      we're always looking for                    │
│                      builders, creators, and thinkers.           │
│                                                                  │
│                      ┌─────────────────────────────┐             │
│                      │  Name                        │             │
│                      ├─────────────────────────────┤             │
│                      │  Email                       │             │
│                      ├─────────────────────────────┤             │
│                      │  What do you create?         │             │
│                      ├─────────────────────────────┤             │
│                      │  Link to your work           │             │
│                      ├─────────────────────────────┤             │
│                      │  Why (un)announced?          │             │
│                      │  (textarea)                  │             │
│                      ├─────────────────────────────┤             │
│                      │      [ submit ]              │             │
│                      └─────────────────────────────┘             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Specifications

**Title — `apply`**:

- Font: Anonymous Pro 400
- Size: `text-5xl md:text-7xl`
- Color: `text-cream`

**Subtitle**:

- Font: Futura
- Size: `text-lg md:text-xl`
- Color: `text-cream/60`
- Copy: "think you belong here? we're always looking for builders, creators, and thinkers."

**Form**:

- Max-width: `max-w-lg mx-auto`
- Fields stacked vertically with `space-y-4`
- Input styling:
  - `bg-transparent border-b border-cream/30 text-cream py-3 px-1`
  - Placeholder: `placeholder:text-stone/50`
  - Font: Futura, `text-base`
  - Focus: `border-cream/70 outline-none`
  - NO rounded corners, NO background fill — just bottom-border, minimal
- Textarea: Same styling, `min-h-[120px] resize-none`
- Submit button:
  - `rounded-full border border-cream/40 px-8 py-2.5`
  - Text: `font-heading text-cream text-base` (Anonymous Pro)
  - Hover: `bg-cream/10 border-cream/60`
  - Centered below form

**Form Submission**:

- For now: `console.log` the form data or show a success message
- Success state: Replace form with "thanks for applying. we'll be in touch." message
- In production: Wire to an API route, email service, or Airtable

---

## 7. ANIMATIONS & INTERACTIONS

### 7.1 Global Animation Principles

- **Easing**: Use `[0.25, 0.46, 0.45, 0.94]` (easeOutQuad) for most animations. Never use linear.
- **Duration**: 0.4–0.8s for entrance animations. 0.2–0.3s for hover transitions.
- **Stagger**: When multiple elements animate in, stagger by 0.08–0.15s.
- **Scroll-triggered**: Elements should animate in when they enter the viewport (use Framer Motion `useInView` or `whileInView`).
- **Respect reduced motion**: Wrap animations in `@media (prefers-reduced-motion: no-preference)` or check via JS.

### 7.2 Page Transitions

Use Framer Motion `AnimatePresence` in the root layout:

```
Enter: { opacity: 0, y: 15 } → { opacity: 1, y: 0 } — 0.5s
Exit:  { opacity: 1 } → { opacity: 0 } — 0.25s
```

### 7.3 Hover States Summary

| Element         | Hover Effect                                         |
| --------------- | ---------------------------------------------------- |
| Nav pills       | `bg-white/10`, border brightens, text goes white     |
| Logo `(u)a.`    | Slight opacity increase on the `(u)` portion         |
| Door cards      | `scale(1.03)`, brightness increase, label goes white |
| Team cards      | `scale(1.02)`, subtle shadow/glow                    |
| Submit button   | `bg-cream/10`, border brightens                      |
| Links (general) | Underline appears, color shifts to `text-cream`      |

### 7.4 Special Effects

**Paper texture parallax** (optional enhancement):

- On mouse move, the background texture shifts very slightly (1–3px) in the opposite direction of the cursor
- This creates a subtle depth/parallax effect
- Implement with a `mousemove` event listener on `body`
- Keep subtle: `transform: translate(calc(var(--mx) * -2px), calc(var(--my) * -2px))`

**CRT scanline effect** (rooms ENTER? screen):

- Over the monitor screen area, overlay a repeating horizontal line pattern at low opacity
- ```css
  .crt-overlay {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.05) 2px,
      rgba(0, 0, 0, 0.05) 4px
    );
  }
  ```

---

## 8. RESPONSIVE BEHAVIOR

### Breakpoints (Tailwind defaults)

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Per-Component Responsive Rules

| Component     | Mobile (< 768px)                  | Tablet (768–1024px)    | Desktop (> 1024px)         |
| ------------- | --------------------------------- | ---------------------- | -------------------------- |
| Navbar        | Hamburger menu                    | Pill nav, smaller text | Full pill nav              |
| Home logo     | `text-5xl`, centered              | `text-7xl`             | `text-[120px]+`            |
| About pillars | Stacked single column             | 3 columns              | 3 columns, wider gaps      |
| Concept text  | Full-width, left-aligned          | Right-aligned block    | Right-aligned, `max-w-2xl` |
| Rooms grid    | 2×2 grid                          | 4×1 row                | 4×1 row                    |
| Room detail   | Stacked (door on top, text below) | Side by side           | Side by side               |
| Team grid     | 2 columns                         | 4 columns              | 4 columns                  |
| Apply form    | Full-width with `px-6`            | Centered `max-w-lg`    | Centered `max-w-lg`        |

### Mobile-Specific Adjustments

- All text sizes scale down ~30–40% on mobile
- Generous `px-6` padding on all pages
- Touch targets: All clickable elements minimum `44px × 44px`
- Hamburger menu replaces nav pills
- The ENTER? computer on rooms page scales to fit `w-[280px]`

---

## 9. ACCESSIBILITY

- **Semantic HTML**: Use `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`–`<h3>` properly
- **Alt text**: All images must have descriptive `alt` attributes
- **Keyboard navigation**: All interactive elements focusable with visible focus rings (`outline-2 outline-offset-2 outline-accent`)
- **ARIA labels**: Nav links, hamburger menu button, form fields
- **Color contrast**: `text-cream` (#E8E4DF) on `bg-charcoal` (#4A4A4A) = ~3.7:1 ratio. For body text, ensure cream/fog colors pass WCAG AA for large text. Consider bumping body text to `#F0ECE8` if needed.
- **Reduced motion**: Respect `prefers-reduced-motion` — disable entrance animations, keep hover states
- **Form labels**: Every input must have an associated `<label>` (visually hidden is OK for the borderless design)
- **Skip to content**: Add a "Skip to main content" link before the navbar

---

## 10. DEPLOYMENT NOTES

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables (if needed later)

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://unannounced.com
# Future: form submission API key, analytics ID, etc.
```

### Performance Targets

- Lighthouse score: 90+ across all categories
- First Contentful Paint: < 1.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Use `next/image` for all images (automatic optimization)
- Use `next/font` for Google Fonts (automatic self-hosting)

### SEO

- Each page gets unique `<title>` and `<meta description>` via Next.js `metadata` export
- OpenGraph and Twitter card meta tags
- Favicon: Create a small `(u)a.` favicon in the brand style

### Font Acquisition Notes

- **Anonymous Pro**: Free on Google Fonts — load via `next/font/google`
- **Futura**: Commercial font. Options: (a) Purchase license and self-host, (b) Use **Century Gothic** as a free alternative (very similar geometric sans), (c) Use **Jost** from Google Fonts (free Futura-like geometric sans)
- **Chloe**: Specialty/display serif. Options: (a) Source the font file, (b) Use **Playfair Display** from Google Fonts as the fallback (free, similar high-contrast serif), (c) Create the logo as an SVG so the font only needs to render in one place

---

## APPENDIX A — CONSTANTS FILE (`lib/constants.ts`)

```ts
export const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "concept", href: "/concept" },
  { label: "rooms", href: "/rooms" },
  { label: "team", href: "/team" },
  { label: "apply", href: "/apply" },
] as const;

export const ROOMS = [
  {
    name: "The Studio",
    slug: "studio",
    title: "the studio",
    tagline: "Where creativity meets videography.",
    description: [
      "This is where ideas turn into visuals. long-form, short-form, and everything in between.",
      "This room focuses on video content and visual storytelling.",
    ],
  },
  {
    name: "The Library",
    slug: "library",
    title: "the library",
    tagline: "Where ideas slow down and thinking goes deeper.",
    description: [
      "This is where thoughts turn into words. essays, reflections, analysis, and long-form writing that delve deeper into ideas.",
      "This room focuses on written work and intentional thinking.",
    ],
  },
  {
    name: "The Living Room",
    slug: "living-room",
    title: "the living room",
    tagline: "Where conversations are sparked and ideas are explained.",
    description: [
      "This is where the conversation starts. from big ideas to quiet thoughts.",
      "This room focuses on discussions, reflections and connections in real time via podcasts.",
    ],
  },
  {
    name: "The Basement",
    slug: "basement",
    title: "the basement",
    tagline:
      "where the behind-the-scenes of ideas, finished and unfinished, come to life.",
    description: [
      "This is where you find out more about what people are building.",
      "This room focuses on the highs and lows of the founder life: what worked and what went wrong.",
    ],
  },
] as const;

export const TEAM_MEMBERS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "[INSERT NAME]",
  role: "",
  image: "/images/team/placeholder.png",
}));

export const BRAND = {
  name: "(un)announced.",
  abbreviation: "(u)a.",
  tagline: "before it's everywhere",
} as const;
```

---

## APPENDIX B — TAILWIND CONFIG (`tailwind.config.ts`)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#4A4A4A",
        ink: "#1F1F1F",
        stone: "#8C8C8C",
        fog: "#B0B0B0",
        cream: "#E8E4DF",
        accent: "#6B8CCE",
      },
      fontFamily: {
        logo: ["Chloe", "Playfair Display", "Georgia", "serif"],
        heading: ["Anonymous Pro", "Courier New", "monospace"],
        body: ["Futura", "Jost", "Century Gothic", "Avenir", "sans-serif"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## APPENDIX C — GLOBALS CSS (`styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* === FONT FACES === */
/* Chloe — logo only. Self-host if available, otherwise Playfair Display covers it. */
/* If you have the font file: */
/*
@font-face {
  font-family: 'Chloe';
  src: url('/fonts/Chloe-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
*/

/* Futura — body. Self-host if licensed, otherwise Jost (Google Fonts) is the fallback. */
/*
@font-face {
  font-family: 'Futura';
  src: url('/fonts/Futura-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
*/

/* === BASE STYLES === */
@layer base {
  body {
    @apply bg-charcoal text-cream antialiased;
    font-family: theme("fontFamily.body");
  }

  /* Paper grain texture overlay */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  /* Ensure all content sits above texture */
  body > * {
    position: relative;
    z-index: 2;
  }

  /* Selection color */
  ::selection {
    background-color: rgba(107, 140, 206, 0.3);
    color: #e8e4df;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #3a3a3a;
  }
  ::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 3px;
  }
}

/* === COMPONENT CLASSES === */
@layer components {
  .nav-pill {
    @apply rounded-full border border-white/30 px-5 py-1.5 md:px-6 md:py-2
           font-heading text-sm md:text-base text-cream/80
           transition-all duration-200 ease-out
           hover:bg-white/10 hover:border-white/60 hover:text-white;
  }

  .nav-pill-active {
    @apply bg-white/15 border-white/50 text-white;
  }

  .section-padding {
    @apply px-6 md:px-12 lg:px-20 xl:px-32;
  }

  .page-padding-top {
    @apply pt-28 md:pt-36 lg:pt-40;
  }
}
```

---

## APPENDIX D — IMPLEMENTATION CHECKLIST

Use this to track build progress:

- [ ] Initialize Next.js project with TypeScript + Tailwind
- [ ] Install Framer Motion
- [ ] Set up Tailwind config (colors, fonts, animations)
- [ ] Set up globals.css (texture, base styles, component classes)
- [ ] Load fonts (Anonymous Pro via next/font, Playfair Display via next/font, Jost via next/font)
- [ ] Build `Navbar.tsx` (desktop pills + mobile hamburger)
- [ ] Build `Logo.tsx` and `LogoFull.tsx`
- [ ] Build `PageWrapper.tsx` (Framer Motion transitions)
- [ ] Build `FadeIn.tsx` animation component
- [ ] Build Home page
- [ ] Build About page
- [ ] Build Concept page
- [ ] Build Rooms hub page (ENTER? + doors)
- [ ] Build individual room pages (template + data)
- [ ] Build Team page
- [ ] Build Apply page (form)
- [ ] Add responsive behavior / test all breakpoints
- [ ] Add keyboard/accessibility audit
- [ ] Create placeholder assets (door image, team placeholders, retro computer)
- [ ] Add SEO metadata to all pages
- [ ] Deploy to Vercel

---

_This document is complete. Follow it section by section. Every visual decision, every CSS property, every interaction is specified. Build it exactly as described._
