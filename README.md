# Mailbox

Mailbox is a modern email client for students in grades 1–12.

A safe place to learn, connect, and communicate — not a kids toy, and not a consumer Gmail clone.

## Stack

- **Desktop:** Tauri v2
- **UI:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui primitives
- **State & storage:** Zustand + Dexie (IndexedDB)

## Getting started

```bash
npm install
npm run dev          # http://localhost:1420
npm run tauri:dev    # desktop shell
```

Teacher PIN: `1234`

## Screens

1. Onboarding — welcome + grade
2. Inbox — filters, verified senders, reading pane
3. Compose — writing starters, attach, send for review
4. Drafts / Sent / Pending
5. Safe Contacts — teachers, classmates, family
6. Teacher review — approve or return with comment
7. Settings & profile
