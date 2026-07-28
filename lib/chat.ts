/**
 * Live campaign support chat configuration.
 * Flip `liveSupportEnabled` / `liveSupportOnline` when a real provider is wired.
 * The UI already supports online chat vs offline leave-a-message without redesign.
 */
export const chatConfig = {
  /** When true, show “Chat with Campaign Staff” as available path. */
  liveSupportEnabled: true,
  /**
   * When false, staff chat shows Offline + leave-a-message.
   * Set true once a human queue / Intercom / similar is connected.
   */
  liveSupportOnline: false,
  expectedResponse: "We aim to reply within 1–2 business days.",
  privacyNote:
    "Messages may be stored to respond to your request. See our Privacy Policy. Do not send Social Security numbers, passwords, or payment card details in chat.",
};
