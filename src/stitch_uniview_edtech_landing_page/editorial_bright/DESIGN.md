---
name: Editorial Clarity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d1daf4'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8ff'
  surface-container-highest: '#d9e2fc'
  on-surface: '#121b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#172033'
  inverse-on-surface: '#edf0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#a93349'
  on-secondary: '#ffffff'
  secondary-container: '#fe7488'
  on-secondary-container: '#730425'
  tertiary: '#594100'
  on-tertiary: '#ffffff'
  tertiary-container: '#765700'
  on-tertiary-container: '#ffce63'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#ffdadc'
  secondary-fixed-dim: '#ffb2b9'
  on-secondary-fixed: '#400010'
  on-secondary-fixed-variant: '#891933'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f9f9ff'
  on-background: '#121b2e'
  surface-variant: '#d9e2fc'
  tile-rose: '#FFF1F2'
  tile-blue: '#EFF6FF'
  tile-amber: '#FFFBEB'
typography:
  display:
    fontFamily: Epilogue
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Epilogue
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter-sm: 1rem
  gutter: 1.5rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-md: 3rem
  margin-lg: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style
The brand voice is optimistic, reassuring, authoritative, and structured specifically for high school students and parents navigating higher education decisions. It combines the expressive warmth of modern editorial publishing with the grounded credibility of an academic guidance platform. 

The aesthetic is an editorial-modern hybrid: asymmetric grid arrangements, soft tinted container zones (soft rose, light tint blue, warm cream), airy negative space, and expressive typography paired with clear, approachable metadata.

## Colors
The palette balances an assertive academic Royal Blue (`#1D4ED8`) with an empathetic Coral/Rose (`#FB7185`) and an encouraging Warm Amber/Gold (`#FBBF24`). Deep Navy-Charcoal (`#172033` / `#121B2E`) provides grounding typography and high-contrast anchors.

Three soft container hues are used for asymmetrical modular editorial cards:
- Rose container tint (`#FFF1F2`) for self-reflection and exploratory prompts.
- Blue container tint (`#EFF6FF`) for academic criteria and programmatic matching.
- Amber container tint (`#FFFBEB`) for test scores, admissions, and financial guidance.

## Typography
Headlines utilize **Epilogue**, an architectural grotesque serif/sans hybrid that creates bold editorial character. Body text, navigational items, micro-copy, and labels use **Plus Jakarta Sans**, chosen for high legibility at smaller screen sizes.

Key rules:
- `display` and `headline-lg` should break into concise multi-line thoughts rather than run as solid blocks.
- Eyebrows, uppercase badges, and tags leverage `label-sm` and `label-md` with expanded letter-spacing (`0.03em` to `0.05em`) to balance the heavier headline weights.

## Layout & Spacing
The layout employs a 12-column fixed grid structure maxing out at `1440px` with responsive gutters and section margins.

- **Breakpoints:**
  - Mobile (`< 768px`): 1-column stack, `1.5rem` margins (`margin`), `1rem` gutters (`gutter-sm`).
  - Tablet (`768px - 1024px`): 6 or 12 columns, `3rem` margins (`margin-md`), `1.5rem` gutters (`gutter`).
  - Desktop (`≥ 1024px`): 12 columns, `5rem` margins (`margin-lg`), `2rem` gutters (`gutter-lg`).

Asymmetric editorial split columns (7:5 or 5:7) are preferred over equal 6:6 layouts to preserve visual tension and magazine pacing.

## Elevation & Depth
Depth is constructed through a layered tonal approach combined with ambient diffused drops and glassmorphism:
- **Glassmorphic Navigation:** The sticky header uses `rgba(255, 253, 251, 0.88)` backed by `backdrop-blur(12px)` and a subtle `border-b` in `slate-200/70`.
- **Card Tiers:** Standard surface cards rest at `shadow-sm` or `shadow-md`, elevating to `shadow-xl` with a gentle `-translate-y-0.5` transform on hover.
- **Atmospheric Glows:** Large, low-opacity organic color spheres (`blur-[100px]` to `blur-[120px]`) float behind foreground editorial content to establish dimension without solid borders.
- **Overlapping Deck Accents:** Cards in major showcases utilize gentle rotations (`-2deg`, `2deg`) to evoke tangible physical decks.

## Shapes
The design system establishes rounded geometry:
- Standard buttons and chip elements use pill-shapes (`rounded-full`) or smooth rounded rectangles (`rounded-xl` / `12px`).
- Feature cards, comparison blocks, and narrative tiles use generous corner radiuses (`rounded-2xl` / `16px` up to `rounded-3xl` / `24px`).
- Organic decorative background frames adopt extra-large rounded hulls (`rounded-[40px]` to `rounded-[48px]`).

## Components

### Buttons
- **Primary Action Button:** Fully rounded (`rounded-full`) pill, filled with `primary_container` (`#1D4ED8`), `on_primary` text, medium to bold weight (`label-lg`), with subtle shadow (`shadow-md`). Displays directional icon on the right with a hover micro-translate (`group-hover:translate-x-1`).
- **Secondary / Ghost Button:** `surface-container-lowest` background with faint `slate-200` outline, rounded-full or `rounded-xl`, subtle shadow.

### Badges & Chips
- **Eyebrow Pills:** `rounded-full` badge with small colored dot indicator (`w-2 h-2 rounded-full`) followed by `label-md` uppercase text.
- **Filter Chips:** Pill shape with `px-4 py-1`, active state filled with `primary_container` with check icon; inactive state uses `surface_container_highest` with `on_surface` text.

### Editorial & Product Cards
- **Editorial Scenario Tiles:** Asymmetric column cards with `rounded-3xl` corners, tinted container fills (`#FFF1F2`, `#EFF6FF`, `#FFFBEB`), inner corner accents, clear title hierarchy, and a bottom anchored CTA bar.
- **Discipline / Major Deck Cards:** `bg-surface-container-lowest` rounded with `rounded-2xl`, top category chip, large icon, bold title, one-sentence description, and bottom salary or job index metadata strip.
- **Comparison Cards:** Side-by-side vertical modules featuring comparative metric progress bars, location tags, and highlighted badge for the actively considered option.

### Search & Form Inputs
- **Exploration Search Bar:** Rounded pill or `rounded-xl` container with leading `search` Material icon, placeholder text in `on_surface_variant`, elevated with `shadow-sm` on a soft container backdrop.