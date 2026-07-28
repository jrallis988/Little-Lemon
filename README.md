# River Valley Community College

A modern marketing site for [River Valley Community College](https://www.rivervalley.edu), built with React, React Router, and Tailwind CSS.

## Scripts

- `npm start` — run the development server
- `npm test` — run tests
- `npm run build` — create a production build

## Pages

- `/` — brand-forward home with happening strip
- `/programs` — filterable catalog (area, credential, campus, search)
- `/programs/:slug` — pathway details + official requirements bridge
- `/admissions` — steps, Formspree inquiry form, team, portal links
- `/financial-aid` — FAFSA code, aid steps, tuition rates + calculator
- `/student-life` — EasyLogin · Register · Pay strip, supports, portals
- `/about` — history, campuses, and maps

## Activate Formspree (required for form delivery)

1. Open this claim link and sign in / create a Formspree account:  
   [Claim RVCC Admissions form](https://formspree.io/claim?name=RVCC+Admissions+Inquiry&project=river-valley-website&field.name=text,required,maxlength:100,prettyName:Full+name&field.email=email,required&field.phone=text,maxlength:40,prettyName:Phone&field.interest=text,maxlength:100,prettyName:Area+of+interest&field.campus=text,maxlength:40,prettyName:Preferred+campus&field.startTerm=text,maxlength:40,prettyName:Preferred+start+term&field.message=text,maxlength:2000&action.email=jjrallis%40unh.edu)
2. Copy `.env.example` → `.env`
3. Set `REACT_APP_FORMSPREE_ID` to the id after `/f/` in your endpoint
4. Optionally set `REACT_APP_SITE_URL` to your deployed origin for absolute OG tags
5. Restart `npm start`

Without a Formspree id, the inquiry form stays on-page (no `mailto:` popup) and asks the visitor to email or call admissions.

## Official links used on the site

- Apply: https://www.rivervalley.edu/admissions/welcome/
- My RVCC: https://myrvcc.rivervalley.edu
- CCSNH Online Resources: https://www.ccsnh.edu/online-resources/
- Catalog: https://catalog.rivervalley.edu/
- FAFSA school code: **007560**
