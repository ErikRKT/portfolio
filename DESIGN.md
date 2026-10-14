---
name: Erik Freitas Fontinele
description: Editorial engineering portfolio
colors:
  paper: "#f2efe7"
  ink: "#202320"
  blue: "#2249db"
  muted: "#5a5e59"
  rule: "#a6aba9"
  blue-hover: "#1834a0"
  blue-wash: "#e3e8fb"
typography:
  display:
    fontFamily: 'Gloock, Georgia, serif'
    fontSize: 'clamp(4.1rem,12.25vw,9.2rem)'
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: '-.04em'
  headline:
    fontFamily: 'Gloock, Georgia, serif'
    fontSize: 'clamp(2.25rem,4.5vw,3.7rem)'
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: '-.035em'
  title:
    fontFamily: 'Gloock, Georgia, serif'
    fontSize: 'clamp(1.9rem,3.7vw,3rem)'
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: '-.035em'
  body:
    fontFamily: 'DM Sans, sans-serif'
    lineHeight: 1.65
  case-body:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '.94rem'
    lineHeight: 1.7
  label:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '.75rem'
    fontWeight: 600
    letterSpacing: '.08em'
spacing:
  text-gap: '.6rem'
  paragraph-gap: '1rem'
  column-gap: '1.5rem'
  section: '3rem'
  section-desktop: '4rem'
components:
  button-primary:
    backgroundColor: '{colors.blue}'
    textColor: '{colors.paper}'
    padding: '1rem 1.1rem'
  button-primary-hover:
    backgroundColor: '{colors.blue-hover}'
    textColor: '{colors.paper}'
  button-secondary:
    textColor: '{colors.blue}'
    padding: '1rem 1.1rem'
  button-secondary-hover:
    backgroundColor: '{colors.blue-wash}'
    textColor: '{colors.blue}'
---

# Design System: Erik Freitas Fontinele

## Overview

**Creative North Star: "Revista de engenharia"**

An editorial engineering portfolio pairs a strong serif identity with functional sans-serif reading. Ivory paper, cobalt emphasis and dark ink make the work feel professional and personal. Portuguese and English share the same hierarchy.

Open articles, fine rules and asymmetric columns organize the evidence. The approved editorial direction is recorded in `.impeccable/surface.md`; this document records the implemented system rather than claiming pixel equivalence to the condensed mockup.

**Key Characteristics:**
- Cobalt identity on ivory paper.
- Editorial serif paired with functional sans-serif.
- Open articles and fine structural rules.
- Linear mobile reading and asymmetric desktop columns.
- Native disclosure and visible keyboard focus.

## Colors

### Dark theme and motion

The header theme button follows the system preference until the visitor chooses a theme. The choice persists locally and is applied in the document head before rendering, in both languages. Dark tokens: paper `#191c1b`, ink `#f2efe7`, blue `#91a7ff`, muted `#b6bcb6`, rule `#626a64`, action hover `#b2c1ff`, wash `#293344`. Native browser controls follow the active color scheme. Printing restores white paper and dark ink.

The name is typeset into place once with a 600ms transform/opacity entrance and 60ms line stagger. Menu and disclosure entrances use 180–200ms; action arrows and the theme icon use 160ms feedback. All use `cubic-bezier(.23,1,.32,1)`, without a motion dependency, scroll listeners, loops or hidden sections. Hover motion requires a fine pointer; reduced motion removes movement and preserves visible content and state feedback.

The frontmatter preserves the source palette, including the two button hover colors.

### Primary
- **Cobalt blue:** identity, major section rules, technical labels, actions, current language, text selection and keyboard focus.
- **Deep cobalt:** primary-action hover.
- **Pale cobalt wash:** secondary-action hover.

### Neutral
- **Ivory paper:** page background and reversed action text.
- **Dark ink:** primary reading text.
- **Muted ink:** supporting text and pending notices.
- **Fine rule:** article separators and column dividers.

**The Structural Color Rule.** Use cobalt to establish hierarchy and interaction; use muted rules to organize supporting material.

## Typography

**Display Font:** Gloock, with Georgia and serif fallbacks.
**Body Font:** DM Sans, with sans-serif fallback.

Both families are self-hosted through Fontsource: Gloock regular and DM Sans regular, medium and semibold. Serif headings use balanced wrapping. The frontmatter records the base display, headline, title, body and technical-label roles.

At desktop widths the hero overrides its base size with `min(13vw,25.5cqw,10rem)` and line-height `.94`; its own column is an inline-size container. The statement uses Gloock, `clamp(1.65rem,5.8vw,2.7rem)` and line-height `1.17`, becoming `clamp(2rem,4.3vw,3rem)` and `1.1` at desktop. Project titles use a smaller `clamp(1.85rem,3vw,2.6rem)` variant. Supporting reading measures include 68ch for about copy and 75ch for project contributions.

**The Two Voices Rule.** Use Gloock for editorial hierarchy and DM Sans for reading, navigation and technical labels.

## Layout

The centered shell is capped at 1320px. Its width subtracts 2.5rem on mobile, 4rem from 600px, and 7rem from 900px. Sections are separated by one-pixel cobalt rules; major vertical spacing expands from the section token to the desktop section token.

Below 600px, reading is linear. At 600px, case details use two columns with the last spanning both, skills use three columns, and project disclosure content uses `1fr 1.3fr`. At 900px, the header becomes a single row, the menu becomes persistent, case columns become `1fr 1.3fr .8fr`, and articles gain a 180px margin column. The hero uses `1.52fr 1fr` at 900px, then `1.65fr 1fr` and a 4rem gap at 1200px. About and education use `1fr 1.5fr`; contact uses equal columns.

## Elevation & Depth

There are no shadows. Space, type scale, rules and column boundaries convey hierarchy on a flat paper background.

**The Open Article Rule.** Present cases as open editorial articles with separators and columns, preserving the page's flat reading surface.

## Shapes

Actions have straight edges and one-pixel cobalt borders. There is no explicit radius scale in the stylesheet, so no rounded token is invented. Technical lists are unboxed text rather than pills. Icons are inline stroked SVGs; the EFF monogram is typography, not a generated crest.

## Components

### Buttons

Editorial anchor actions use Gloock, a minimum height of 58px and the frontmatter padding. Primary actions reverse paper text on cobalt; secondary actions retain the paper surface with a cobalt border. Hover colors transition over `.18s`. Focus uses the shared two-pixel cobalt outline with a five-pixel offset.

### Navigation

DM Sans navigation uses a minimum 44px target height and underlines on hover. Below 900px the menu opens into a two-column grid; Escape closes it and returns focus to the menu button. PT/EN controls use `aria-current` and an eight-pixel underline offset for the current language. A skip link becomes visible on focus.

### Technical lists

Technology names wrap as plain cobalt text with `.5rem 1.2rem` gaps and `.8rem` type. Do not reinterpret them as badges or controls.

### Case articles and project disclosure

Experience uses semantic definition-list columns for problem, contribution and technology. Project details use native `details`/`summary`, a minimum 48px summary target, a fine bottom rule and an SVG plus that rotates 45 degrees when open over `.2s`. Expanded content stays inside the article.

### Contact rows

Rows have fine bottom rules, minimum 60px height and `.92rem` type. Supplied destinations render as anchors; absent destinations render explicit pending text. External destinations use inline SVG arrows. Long email details wrap anywhere.

Text selection reverses paper on cobalt. Reduced-motion preference disables transitions and animations and restores automatic scrolling. Print removes navigation and actions, uses black on white and exposes disclosure content.

## Do's and Don'ts

### Do:
- **Do** preserve the self-hosted Gloock and DM Sans pairing.
- **Do** preserve visible keyboard focus, selection contrast and reduced-motion behavior.
- **Do** keep articles open and disclosures native.
- **Do** preserve equivalent hierarchy in Portuguese and English.

### Don't:
- **Don't** introduce shadows or generic card grids into this editorial surface.
- **Don't** convert plain technology lists into pills.
- **Don't** ship the generated crest or development mockups as site artwork.
- **Don't** claim that the automatic comp comparison passed: the expanded document differs from the condensed poster, as recorded in `.impeccable/review/final/report.json`.
