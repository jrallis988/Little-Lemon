# Mobile & accessibility QA checklist

Portfolio proof notes for Weight Watchers 63. Re-run before demos.

## Keyboard & focus

- [ ] Skip link (`Skip to content`) appears on first Tab and moves focus to `#main-content`
- [ ] Header nav, Find Your Year form, and prototype buttons are reachable by keyboard
- [ ] Guided journey step list is announced; phone CTAs activate with Enter/Space
- [ ] Visible focus rings on cobalt buttons and form fields

## Screen reader / semantics

- [ ] Chapter headings use one `h1` per page; sections use `aria-labelledby`
- [ ] Hero carousel exposes `aria-roledescription`, live region, and tablist controls
- [ ] Prototype nav has `aria-label="Prototype app navigation"`
- [ ] Form errors use `role="alert"` / `aria-invalid` (Find Your Year, Finale, Kitchen cook)
- [ ] Toast / status messages use `role="status"` + `aria-live="polite"`
- [ ] Decorative images use empty alt + `aria-hidden` where appropriate

## Motion

- [ ] With `prefers-reduced-motion: reduce`, hero autoplay/ken-burns stop; CSS transitions collapse via `index.css`
- [ ] Guided journey `animate-rise` does not trap focus or flash aggressively under reduced motion

## Mobile (375–430px)

- [ ] First viewport: brand, one headline, support line, CTAs, full-bleed hero—no secondary clutter
- [ ] Guided walkthrough stacks copy above phone; phone stays ≤22rem and scrolls inside shell
- [ ] Flagship teaser grid collapses to one column; images use `.campaign-photo` crop
- [ ] Find Your Year share card buttons wrap without overflow
- [ ] Finale form usable with soft keyboard; no fixed footer covering inputs

## Prototype polish smoke

- [ ] Pathways: empty priorities show empty state + error if Continue forced
- [ ] Life: share/download on weekly reflection; pathway banner when launched from journey
- [ ] Kitchen: swap toast; grocery empty state when all checked; cook error if ingredients blank
- [ ] Guided journey carries Pathway name into Life and Kitchen, then shows completion state

## Known honest limits

- Finale email is a demo submission (no backend)
- Product flows are conceptual prototypes, not production WW software
- Share APIs depend on browser/device support; clipboard is the fallback
