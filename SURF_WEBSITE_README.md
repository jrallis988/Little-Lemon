# Surf — Kids Safe Search Engine

Safe search for kids in grades 1–8. Clean, minimal, search-first. Not a browser app — a website.

## Open the site

Open these files in a browser (or serve the folder):

- `surf_home.html` — homepage + topic explore + autocomplete
- `surf_results.html` — results, Kid Dictionary, AI Instant Answer, filters
- `surf_article_math_mode.html` — sample article with Math Mode

```bash
# optional local server
python3 -m http.server 5175
# then visit http://localhost:5175/surf_home.html
```

## Design system

- Blue `#1B6FF8`
- Orange `#F97316`
- Fonts: Nunito (logo/display), Poppins (body)
- White background, soft cards, rounded search

## AI follow-ups

On `surf_results.html`, live Claude follow-ups use:

- Model: `claude-sonnet-4-6`
- Key via `localStorage.setItem('SURF_ANTHROPIC_API_KEY', 'sk-...')`

For production, proxy Anthropic through a backend so keys are never exposed in the browser.

## Note

Your brief cut off mid-sentence on the Math Mode article page. The sample article was completed as a fractions Math Mode lesson consistent with the rest of the design system.
