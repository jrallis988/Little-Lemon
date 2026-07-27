# Saltline Motel

A beachfront motel website with room listings, guest reviews, a location map, and a booking request form with availability checks.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Booking submissions

By default, **Request booking** opens a prefilled email to the motel.

To send requests through [Formspree](https://formspree.io) instead, copy `.env.example` to `.env` and set:

```bash
REACT_APP_FORMSPREE_ID=your_form_id
```

## Build

```bash
npm run build
```
