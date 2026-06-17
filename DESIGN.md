---
version: public-reference-v1
name: realty-blueprint
description: "지역 기반 탐색과 상담 전환을 위한 부동산 제작 기준서. 매물/지역/상담 흐름을 빠르게 스캔하게 한다."
colors:
  primary: "hsl(215 60% 22%)"
  secondary: "hsl(215 15% 93%)"
  tertiary: "hsl(168 38% 38%)"
  neutral: "hsl(220 15% 97%)"
  background: "hsl(0 0% 100%)"
  surface: "hsl(220 20% 98%)"
  foreground: "hsl(220 25% 12%)"
  muted: "hsl(215 12% 50%)"
  accent: "hsl(168 30% 93%)"
typography:
  h1:
    fontFamily: "Pretendard"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  body-md:
    fontFamily: "Pretendard"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
rounded:
  sm: 4px
  md: 8px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
components:
  guide-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 20px
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px
  accent-card:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: 20px
  muted-note:
    backgroundColor: "{colors.muted}"
    textColor: "#000000"
    rounded: "{rounded.sm}"
    padding: 12px
  neutral-panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# DESIGN.md

## Overview

부동산/공인중개 웹 제작 가이드 시스템 is a public reference system for 부동산/공인중개 homepage production. This document captures the implementation-facing visual contract needed to recreate the same site style, color behavior, spacing rhythm, and guide/tool surface from source alone.

The project should feel like a practical industry workbench: a curated guide, a client brief tool, a site blueprint generator, and implementation rules in one interface. It is not a marketing landing page. Preserve the source system's dense but readable documentation rhythm.

## Source-Derived Identity

지역 기반 탐색과 상담 전환을 위한 부동산 제작 기준서. 매물/지역/상담 흐름을 빠르게 스캔하게 한다.

Core visual rules:

- Use deep navy for credibility and teal trust states for verification/proof.
- Warm gold is for caution, review, or commercial emphasis; do not let it dominate.
- Real estate pages must prioritize region, transaction type, contact path, and proof.

## Palette

Use semantic HSL tokens from `src/index.css` and Tailwind aliases from `tailwind.config.ts`. Do not hard-code unrelated one-off colors into pages.

- Primary: `hsl(215 60% 22%)`
- Secondary: `hsl(215 15% 93%)`
- Tertiary: `hsl(168 38% 38%)`
- Neutral: `hsl(220 15% 97%)`
- Background: `hsl(0 0% 100%)`
- Surface: `hsl(220 20% 98%)`
- Foreground: `hsl(220 25% 12%)`
- Muted text: `hsl(215 12% 50%)`
- Accent: `hsl(168 30% 93%)`

### Local CSS Variable Evidence

- `background` = `0 0% 100%`
- `foreground` = `220 25% 12%`
- `card` = `220 20% 98%`
- `card-foreground` = `220 25% 12%`
- `popover` = `0 0% 100%`
- `popover-foreground` = `220 25% 12%`
- `primary` = `215 60% 22%`
- `primary-foreground` = `210 40% 98%`
- `secondary` = `215 15% 93%`
- `secondary-foreground` = `215 25% 30%`
- `muted` = `220 14% 96%`
- `muted-foreground` = `215 12% 50%`
- `accent` = `168 30% 93%`
- `accent-foreground` = `168 40% 22%`
- `destructive` = `0 84% 60%`
- `destructive-foreground` = `0 0% 100%`
- `border` = `215 18% 89%`
- `input` = `215 18% 89%`
- `ring` = `215 60% 22%`
- `radius` = `0.5rem`
- `trust` = `168 38% 38%`
- `trust-foreground` = `0 0% 100%`
- `warm` = `38 70% 50%`
- `warm-foreground` = `38 80% 15%`
- `info-color` = `205 75% 48%`
- `info-foreground` = `0 0% 100%`
- `surface` = `220 15% 97%`
- `success` = `145 55% 42%`

## Typography

Use `Pretendard` for page titles and `Pretendard` for body/UI text. Preserve Korean readability over decorative density: body copy uses at least `1.55` line-height, stable letter spacing, and no viewport-width font scaling.

Headings may be strong and compact, but guide pages should keep H1 around `2.25rem` desktop and avoid oversized hero treatment. Cards, sidebars, and tool panels use tighter headings so dense Korean content remains scannable.

## Layout

Primary shell: dark navy sidebar, sticky top header, content pages with card/grid guide modules.

Rules:

- Keep sidebar navigation and top command/search affordances persistent on desktop.
- Keep content width constrained; current source centers guide content around `max-w-4xl` to `max-w-5xl`.
- Cards are for repeated guide objects, status blocks, summary cards, and generated outputs. Do not nest broad page sections inside decorative cards.
- Mobile order: sidebar trigger/header, command/search where available, page title, summary/quick-apply, content, previous/next navigation.
- Long Korean labels, business names, menu names, course names, regions, and CTA labels must wrap without clipping.

## Components

| Component | Contract | Confidence |
|---|---|---|
| `AppSidebar` | Preserve source behavior and state language from current implementation. | high |
| `AppLayout` | Preserve source behavior and state language from current implementation. | high |
| `SEOHead` | Preserve source behavior and state language from current implementation. | high |
| `CommandSearch` | Preserve source behavior and state language from current implementation. | high |
| `PageHeader` | Preserve source behavior and state language from current implementation. | high |
| `SectionBlock` | Preserve source behavior and state language from current implementation. | high |
| `StatusBadge` | Preserve source behavior and state language from current implementation. | high |

Common component rules:

- Navigation items need active, hover, and focus-visible states.
- Command search must remain keyboard reachable and visually stable.
- Copyable prompt/meta/code blocks need clear label, monospaced output, and copied feedback.
- Status/proof/review states cannot rely on color alone; use label text or border/shape difference too.
- Icon buttons require accessible labels. Text buttons must not overflow on mobile.

## States And Accessibility

- Normal text contrast target: 4.5:1 or higher.
- Large text and non-text UI indicators: 3:1 minimum.
- Focus-visible styles must be present on sidebar links, command search, buttons, copy controls, form fields, and TOC links.
- A selected nav route needs both color and active styling.
- Form validation in client brief tools must use visible text and cannot rely only on red color.
- Motion must be subtle and non-blocking; prefer opacity/transform only. Honor reduced-motion expectations when adding new animation.

## Content And Copy Rules

- Keep Korean labels direct and specific.
- Do not show hidden implementation instructions in the UI.
- Guide pages should use evidence-oriented headings: industry traits, design guide, UI guide, UX guide, page templates, content guide, SEO/GEO, checklist, client brief, site blueprint, implementation rules.
- Public-site generation outputs must be copyable and source-grounded.

## Routes And Information Architecture

Detected route/page evidence:

- `/`
- `/industry-overview`
- `/design-guide`
- `/ui-guide`
- `/ux-guide`
- `/page-templates`
- `/content-guide`
- `/proof-system`
- `/seo-geo`
- `/checklist`
- `/client-brief`
- `/site-blueprint`
- `/implementation-rules`
- `*`

## Verification Gates

Before publishing style changes:

1. Run `npm run build`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `design-md-lint DESIGN.md`.
5. Inspect mobile widths for Korean text wrapping, sidebar collapse, command search, copy blocks, and generated blueprint cards.
6. Re-run secret scan before public GitHub publication if new files include external integrations.

## Evidence Map

| Rule | Evidence | Confidence |
|---|---|---|
| Palette and semantic token names | `src/index.css`, `tailwind.config.ts` | high |
| Industry positioning and trust/CTA rules | industry config and README | high |
| Layout shell and navigation behavior | layout/sidebar components | high |
| Component state vocabulary | guide components and shadcn/ui wrappers | high |
| Route and information architecture | App/routes/navigation data | high |
| Public reproduction guidance | this DESIGN.md synthesized from source on 2026-06-18 | derived |

## Local Evidence Files

- `src/index.css`
- `tailwind.config.ts`
- `src/data/industry-config.ts`
- `src/data/navigation.ts`
- `src/data/seo-config.ts`
- `src/components/layout/AppLayout.tsx`
- `src/components/layout/AppSidebar.tsx`
- `src/pages/DesignGuide.tsx`
