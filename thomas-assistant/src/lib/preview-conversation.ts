/** UI-only preview messages for design review screenshots. Not used in production logic. */
export const PREVIEW_CONVERSATION = [
  {
    role: "assistant" as const,
    content: "Good evening, James. What shall we pour?",
    timestamp: "2026-08-23T20:00:00.000Z",
  },
  {
    role: "user" as const,
    content: "What pairs with grilled steak?",
    timestamp: "2026-08-23T20:00:12.000Z",
  },
  {
    role: "assistant" as const,
    content:
      "With grilled steak, I'd reach for a bold house IPA — roasted malts and bitterness that stand up beautifully to char. A Cabernet works if wine is preferred.",
    timestamp: "2026-08-23T20:00:18.000Z",
  },
  {
    role: "user" as const,
    content: "Something from our tap list?",
    timestamp: "2026-08-23T20:00:35.000Z",
  },
  {
    role: "assistant" as const,
    content:
      "Our House Porter would be my first recommendation — rich, slightly chocolatey, and it loves a good sear. The Session IPA is a lighter option if your guest prefers something brighter.",
    timestamp: "2026-08-23T20:00:42.000Z",
  },
];
