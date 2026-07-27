# Mailbox

Mailbox is a modern email client for students in grades 1–12.

It is not a “kids mode” or a simplified toy version of email. It is a full email experience that introduces professional communication concepts from the start of a student’s education and matures with them through elementary school, middle school, and high school.

## Why Mailbox

- Simple and familiar — everyone understands the word
- Approachable without sounding childish
- Timeless enough that the product — not a trendy name — carries the brand

When someone hears **Mailbox**, they should think: “That’s an email app.”

## Design philosophy

Maturity comes from the interface, not the name. One product; one name; a learning stage that evolves:

| Stage | Grades | Experience |
| --- | --- | --- |
| Elementary | 1–5 | Larger targets, guided language, warmer visual cues |
| Middle | 6–8 | Cleaner chrome, fewer prompts, more independence |
| High | 9–12 | Professional density, productivity-forward layout |

**Guiding principle:** We do not make email easier by removing features. We present features at the right time, in the right way, for the student’s stage of learning.

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
2. **Compose** — focused writing with Send / Attach / Format
3. **Safety indicators** — verified folders and Safe Contacts woven into the UI
4. **Learning stage switcher** — preview how the same product matures across K–12
