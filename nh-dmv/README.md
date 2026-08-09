# NH DMV Redesign (Concept)

Task-first rebuild of [dmv.nh.gov](https://www.dmv.nh.gov) as a DriveSkill-inspired service portal — Artistic Fountain concept.

**Not an official State of New Hampshire site.** Demo account, appointments, and form submits are simulated in-app.

## Data sources (public)

Mirrored for the demo from official pages:

- Hours & locations — [dmv.nh.gov/hours-and-locations](https://www.dmv.nh.gov/hours-and-locations)
- Licensing fees — [dmv.nh.gov/.../licensing-fees](https://www.dmv.nh.gov/drivers-licensenon-driver-ids/licensing-fees)
- Notices / REAL ID / new-resident rules — [dmv.nh.gov](https://www.dmv.nh.gov/)

## Product features

1. Guest vs signed-in home (demo Sign in)
2. Dashboard with active appointments / renewals
3. Inline booking → printable confirmation receipt
4. Document checklist wizard
5. Branch finder with live-status simulation + empty states
6. Fees page with official schedule figures
7. Empty / error states (no slots, no branch matches, incomplete docs)

## Preview

```bash
npm start
```

Open [http://localhost:3000/nh-dmv/](http://localhost:3000/nh-dmv/).
