# Warehouse Inventory Scan

Handheld warehouse scanning UI prototype — barcode / RFID capture with a local scan log, framed in a rugged device shell.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

## Develop

```bash
cd warehouse-inventory-scan
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## What’s included

- `DeviceShell` — SwiftScan handset chrome (status bar, app title, floor footer)
- Active barcode / RFID input with **CAPTURE**
- Recent scans feed with local relative timestamps and a “Synced to Local DB” indicator
