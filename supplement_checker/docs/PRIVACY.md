# Privacy Policy (draft)

**Status:** Draft for product engineering — **not counsel-approved**.  
**Product:** ClearDose Research / Supplement Research Platform  
**Effective (draft):** 2026-09-24  
**Notice version alignment:** Gaps & Knowledge Limits `2026-08-24.gaps-knowledge-limits.v1`

## 1. Who we are

This platform is an independent **research and data-aggregation** tool for informational and educational purposes. It is **not** a medical device, diagnostic service, or substitute for professional medical advice.

## 2. Data we collect

| Category | Examples | Storage |
| --- | --- | --- |
| Account | Email, display name, password hash | D1 / SQLite |
| Session | Bearer token hash, expiry | D1 / SQLite |
| Health profile | Demographics, conditions, meds, allergies, goals | D1 / SQLite |
| History evidence metadata | Source type, R2 object keys, sync timestamps | D1 / SQLite |
| Medical documents | PDFs / lab uploads | R2 (private) |
| Label images | Supplement Facts photos | R2 (private) |
| Analysis jobs | OCR/compare/literature inputs & results (non-raw PHI preferred) | D1 / SQLite |
| Legal acceptance | Notice version, accepted_at | D1 / SQLite |

We do **not** intend to log raw medical PDF contents in application logs.

## 3. How we use data

- Verify health-history completeness before analysis (`profile_verified`)
- Extract label ingredients (vision OCR)
- Cross-reference indexed literature (e.g. PubMed)
- Show exploratory research findings and explicit data gaps

## 4. Legal bases / consent (high level)

- Account creation and use of the service  
- Explicit acceptance of the Gaps & Knowledge Limits notice  
- OS-level consent for Apple HealthKit / Google Health Connect (when enabled)

## 5. Sharing

- **NCBI / PubMed** may receive ingredient search terms (not your full medical record) when live literature is enabled  
- **Vision providers** (OpenAI / Anthropic) may receive label images when live OCR is enabled  
- Cloudflare (or hosting subprocessors) for storage/compute  

No sale of personal health information.

## 6. Retention & deletion

- Profiles and documents retained until account deletion or documented retention window  
- Users may request export/deletion of account-linked data via product support channels (API export endpoint when enabled)  
- Session tokens expire and may be revoked on logout  

## 7. Security

- Passwords hashed (PBKDF2)  
- Private object storage for documents/images  
- Transport encryption (TLS) in production  
- Analysis locked until terms + verified profile  

## 8. Children’s data

Not directed at children under 18. Do not submit minors’ medical records.

## 9. Contact

Replace with operator contact email before production launch.

## 10. Changes

Material changes will bump policy version and may require re-acceptance of related notices.
