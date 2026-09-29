# Warehouse Inventory Scan · Device OS

Rugged industrial handset UI (Zebra / Link-OS inspired) built with React, TypeScript, and Tailwind CSS.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (`@theme` design tokens)
- Context-based screen routing (14 screens)

## Develop

```bash
cd warehouse-inventory-scan
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Use the **☰ menu** or footer **Menu** to jump between all 14 screens. **Home** returns to the print status dashboard.

## Screen manifest

| # | Screen | Route id |
| --- | --- | --- |
| 1 | Print Status Dashboard | `home` |
| 2 | Printer & Device Info | `device-info` |
| 3 | Active Print Job Progress | `print-job` |
| 4 | Ribbon Calibration Wizard | `ribbon-calibration` |
| 5 | Printhead Assembly Wizard | `printhead-wizard` |
| 6 | ZBI Program Execution | `zbi-programs` |
| 7 | WLAN Security Configuration | `wlan-security` |
| 8 | Wireless IP Address Input | `wireless-ip` |
| 9 | WPA Credentials (QWERTY) | `wpa-credentials` |
| 10 | Label Offset Adjustment | `label-offset` |
| 11 | Darkness Level Control | `darkness` |
| 12 | Restore Network Prompt | `restore-network` |
| 13 | Network Restoration Status | `restore-status` |
| 14 | Touch Screen Calibration | `touch-calibration` |

## Architecture

- `src/index.css` — OLED / slate theme tokens + motion
- `src/navigation/` — screen registry + `NavigationProvider` state
- `src/components/DeviceShell.tsx` — bezel, status bar, menu, footer
- `src/components/ui.tsx` — Panel, Button, Metric, Slider shared primitives
- `src/screens/` — one module per screen
