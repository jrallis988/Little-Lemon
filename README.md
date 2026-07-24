# MailNest

A desktop-class, kid-friendly email client for ages 6–12. Inspired by the clarity of Apple Mail and Gmail, redesigned for younger readers with safety cues, oversized actions, and an offline-first local store.

## Stack

- **Desktop:** Tauri v2 (native webview + Rust)
- **UI:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui primitives
- **State & storage:** Zustand + Dexie (IndexedDB)

## Getting started

```bash
npm install
npm run dev          # Vite frontend at http://localhost:1420
npm run tauri:dev    # Full desktop shell (requires Rust + OS webview deps)
```

## Core views

1. **Split-pane inbox** — folder sidebar, message list, reading pane
2. **Compose** — distraction-free writing with large Send / Attach / Format actions
3. **Safety indicators** — verified folders and safe-contact badges woven into the UI

## Project layout

```
src/
  components/   # layout, mail, compose, ui primitives
  pages/        # routed screens
  store/        # Zustand mail store
  lib/          # IndexedDB (Dexie), utilities
  types/        # shared domain types
src-tauri/      # Tauri v2 Rust shell
```
