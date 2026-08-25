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
├── index.html
├── css/          # tokens, base, components, layout
├── js/
│   ├── chrome.js # shared header / footer
│   ├── data.js   # products, pets, stores, articles
│   ├── ui.js     # render helpers
│   └── app.js    # cart, favorites, search, a11y
├── shop/         # commerce (incl. filters, cart)
├── services/     # grooming, training, day camp, vet
├── adopt/        # charities + adoptable pets grid
├── care/         # learning hub + articles
├── stores/       # locator + detail
├── account/      # sign in, orders, favorites
└── checkout/     # checkout + confirmation
```

## Recent depth additions

- Shared header/footer via `chrome.js` across all pages
- Working category filters (price + brand) with mobile filter drawer
- Product quantity stepper + real favorites (localStorage)
- Adoptable pets grid on Adopt (filter Dogs / Cats)
- Veterinary services page
- Checkout confirmation page
- Linked from Artistic Fountain portfolio homepage

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
| 8b | Order confirmation | `/petsmart/checkout/confirmation.html` |
| 9 | Services landing | `/petsmart/services/` |
| 10 | Grooming | `/petsmart/services/grooming.html` |
| 11 | Training | `/petsmart/services/training.html` |
| 12 | Doggie Day Camp | `/petsmart/services/day-camp.html` |
| 12b | Veterinary | `/petsmart/services/vet.html` |
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
