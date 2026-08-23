# PetSmart Redesign (Concept)

Conceptual redesign of [petsmart.com](https://www.petsmart.com) by Artistic Fountain.

**Not an official PetSmart site.** This is a design-system-driven prototype exploring a modern PetSmart digital ecosystem.

## Vision

PetSmart is more than an online pet-supply store. The experience unifies four pillars:

| Pillar | Focus |
| --- | --- |
| **Adopt** | PetSmart Charities, adoptable pets, rescue support |
| **Shop** | Food, toys, supplies, health, habitats |
| **Services** | Grooming, training, Doggie Day Camp, vet connections |
| **Learn & Care** | Trustworthy pet-care guides and resources |

## Architecture

```
petsmart/
├── index.html              # Homepage (adoption hero, pathways, ecosystem)
├── css/
│   ├── tokens.css          # Design tokens
│   ├── base.css            # Reset, typography, accessibility
│   ├── components.css      # Buttons, cards, forms, product cards
│   ├── layout.css          # Header, footer, hero, page shells
│   └── main.css            # Entry point
├── js/
│   ├── data.js             # Products, articles, stores (content layer)
│   ├── ui.js               # Reusable render helpers
│   └── app.js              # Navigation, cart, search, a11y
├── shop/                   # E-commerce pages
├── services/               # Grooming, training, day camp
├── adopt/                  # Adoption & charities
├── care/                   # Pet care hub & articles
├── stores/                 # Locator & store detail
├── account/                # Sign in, orders, favorites
└── checkout/               # Checkout flow
```

## Design system

- **Colors:** PetSmart red (`#e31837`) for primary actions; blue (`#0066b3`) for trust and navigation; white and pale blue environments
- **Typography:** Plus Jakarta Sans (display) + Source Sans 3 (body)
- **Components:** Reusable cards, product grids, forms, pathway cards, ecosystem links
- **Accessibility:** WCAG AA — semantic HTML, focus states, skip links, reduced motion, a11y panel

## Pages

| # | Page | Path |
| --- | --- | --- |
| 1 | Homepage | `/petsmart/` |
| 2 | Shop landing | `/petsmart/shop/` |
| 3 | Category | `/petsmart/shop/category.html?cat=dog-food` |
| 4 | Search results | `/petsmart/shop/search.html?q=food` |
| 5 | Product listing | (category + shop index) |
| 6 | Product detail | `/petsmart/shop/product.html?id=p1` |
| 7 | Cart | `/petsmart/shop/cart.html` |
| 8 | Checkout | `/petsmart/checkout/` |
| 9 | Services landing | `/petsmart/services/` |
| 10 | Grooming | `/petsmart/services/grooming.html` |
| 11 | Training | `/petsmart/services/training.html` |
| 12 | Doggie Day Camp | `/petsmart/services/day-camp.html` |
| 13 | Adoption | `/petsmart/adopt/` |
| 14 | Pet Care hub | `/petsmart/care/` |
| 15 | Pet Care article | `/petsmart/care/article.html?id=bringing-home` |
| 16 | Store locator | `/petsmart/stores/` |
| 17 | Store detail | `/petsmart/stores/detail.html?id=s1` |
| 18 | Account | `/petsmart/account/` |
| 19 | Orders | `/petsmart/account/orders.html` |
| 20 | Favorites | `/petsmart/account/favorites.html` |

## View locally

From the repo root:

```bash
npm start
```

Then open [http://localhost:3000/petsmart/](http://localhost:3000/petsmart/).

## Stack

Static HTML, CSS, and vanilla JS — matching the existing Artistic Fountain portfolio approach. No additional dependencies.
