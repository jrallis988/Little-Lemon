# NH DMV Redesign (Concept)

Task-first rebuild of [dmv.nh.gov](https://www.dmv.nh.gov) as a calm utility portal — Artistic Fountain concept.

**Not an official State of New Hampshire site.** Demo account, appointments, and form submits are simulated in-app (no `forms.nh.gov` hops).

## Principles

1. **Task-first IA** — life-event nav (License, Vehicle, Records, Appointments, Branches)
2. **Warm civic UI** — spruce + soft canvas, not waiting-room gray
3. **One-click dashboard** — active appointments, renewals, credentials
4. **Zero dead-end redirects** — checklists, booking, renewals, records stay inline

## Pages

| Page | Role |
| --- | --- |
| `index.html` | Home + intent search + dashboard teaser |
| `dashboard.html` | Resident dashboard |
| `license.html` | Licensing & ID taxonomy |
| `vehicle.html` | Registrations, titles, specialty |
| `records.html` | MVR, tickets, restoration (inline demos) |
| `appointments.html` | In-app scheduling |
| `checklist.html` | What-to-bring wizard |
| `branches.html` | Branch finder + live status |
| `renew.html` / `real-id.html` | Renewal + REAL ID checker |

## Preview

```bash
npm start
```

Open [http://localhost:3000/nh-dmv/](http://localhost:3000/nh-dmv/).
