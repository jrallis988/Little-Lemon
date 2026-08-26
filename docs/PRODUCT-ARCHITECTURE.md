# TrumpRx product architecture (revision)

## Product definition

TrumpRx is a **medication savings, eligibility, comparison, and access platform for select medications**.

It helps users:

1. See whether a TrumpRx pricing option is available  
2. Compare that option with what they currently pay  
3. Understand eligibility requirements  
4. Determine exactly how to obtain the medication  

It is **not** a universal pharmacy, universal prescription database, or replacement for CVS / Walgreens / GoodRx / the user’s existing pharmacy.

## Primary flow

HOME → CHECK COVERAGE (search / A–Z) →  
unavailable: NOT INCLUDED → request / browse  
available: MEDICATION DETAIL → what you receive → price → compare → eligibility → how to get it → Get this price pathway → Help / Report issue

## Priorities

**CLARITY → SCOPE → COMPARISON → ELIGIBILITY → ACCESS → SUPPORT** over feature count.

## Feature disposition

| Feature | Disposition |
|---|---|
| Checkout / order confirmation | Reframed — not ecommerce; `/access` pathways; legacy `/checkout` explains non-seller model |
| Membership | Optional account tools — not a drug storefront |
| Rx transfer | Connection to participating pharmacy — TrumpRx does not own the Rx |
| Refill tracker | Saved meds & reminders — not pharmacy of record |
| Family / billing / insurance plan | Account tools; eligibility explained on medication pages |
| Pharmacy partners / transfer queue | Ops only — not patient “we are a pharmacy” UX |

## Implementation anchors

- Program metadata: `src/lib/program-catalog.ts`
- Coverage search: `src/app/search/page.tsx`, `src/lib/coverage.ts`
- Medication detail: `src/app/drugs/[id]/page.tsx`
- Access pathways: `src/app/access/page.tsx`
- Requests / issues: `MedicationRequest`, `IssueReport` + APIs
- FAQ: `src/app/faq/page.tsx`
- Automated Help: `src/components/chat/support-chat-widget.tsx`, `src/lib/chat.ts`
