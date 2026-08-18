# Mailbox

Mailbox is a modern email client for students in grades 1–12.

It is not a “kids mode” or a simplified toy version of email. It is a full email experience that introduces professional communication concepts from the start of a student’s education and matures with them through elementary school, middle school, and high school.

## Why Mailbox

- Simple and familiar — everyone understands the word
- Approachable without sounding childish
- Timeless enough that the product — not a trendy name — carries the brand

When someone hears **Mailbox**, they should think: “That’s an email app.”

## Design philosophy

Maturity comes from the interface, not the name. One product; one name; every grade from **1 through 12** selectable, with experience profiles that evolve:

| Band | Grades | Experience |
| --- | --- | --- |
| Elementary | 1, 2, 3, 4, 5 | Larger targets, guided language, warmer visual cues |
| Middle school | **6, 7, 8** | Cleaner chrome, growing independence (grade-specific guidance) |
| High school | 9, 10, 11, 12 | Professional density, productivity-forward layout |

The interface is framed as **classroom correspondence**, not a consumer inbox: course/class chrome, learning targets, and a writing-structure checklist (audience, subject, greeting, purpose, closing).

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

## Core views

1. **Split-pane inbox** — folders, message list, reading pane
2. **Compose** — message genres, writing checklist, Reply, drafts, attachments
3. **Safety indicators** — verified folders and Safe Contacts woven into the UI
4. **Grade selector (1–12)** — including middle school grades 6, 7, and 8
5. **Teacher controls** — PIN unlock (`1234`), send approval queue, Safe Contacts management
6. **Onboarding** — first-run orientation + grade selection
