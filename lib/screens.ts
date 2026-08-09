/**
 * Master screen registry for the Planet Fitness ecosystem.
 * Web = acquisition / discovery. App = day-to-day member utility.
 */

export type ScreenSurface = "web" | "app";

export type ScreenDef = {
  id: number;
  code: string;
  name: string;
  surface: ScreenSurface;
  route: string;
  status: "live" | "scaffold" | "planned";
};

export const SCREENS: ScreenDef[] = [
  // —— Public Web 01–20 ——
  { id: 1, code: "01", name: "Join offer", surface: "web", route: "/#offer", status: "live" },
  { id: 2, code: "02", name: "Club locator", surface: "web", route: "/#clubs", status: "live" },
  { id: 3, code: "03", name: "Memberships", surface: "web", route: "/#pricing", status: "live" },
  { id: 4, code: "04", name: "Summer Pass", surface: "web", route: "/#summer-pass", status: "live" },
  { id: 5, code: "05", name: "Welcome perks", surface: "web", route: "/", status: "live" },
  { id: 6, code: "06", name: "App promo", surface: "web", route: "/", status: "live" },
  { id: 7, code: "07", name: "App highlights", surface: "web", route: "/", status: "live" },
  { id: 8, code: "08", name: "Virtual tour", surface: "web", route: "/#tour", status: "live" },
  { id: 9, code: "09", name: "Get Started", surface: "web", route: "/", status: "live" },
  { id: 10, code: "10", name: "Footer", surface: "web", route: "/", status: "live" },
  { id: 11, code: "11", name: "Club page", surface: "web", route: "/gyms/[slug]", status: "live" },
  { id: 12, code: "12", name: "Join confirm", surface: "web", route: "/join", status: "live" },
  { id: 13, code: "13", name: "Join identity", surface: "web", route: "/join", status: "live" },
  { id: 14, code: "14", name: "Join payment", surface: "web", route: "/join", status: "live" },
  { id: 15, code: "15", name: "Mobile join offer", surface: "web", route: "/", status: "live" },
  { id: 16, code: "16", name: "Mobile club locator", surface: "web", route: "/#clubs", status: "live" },
  { id: 17, code: "17", name: "Mobile memberships", surface: "web", route: "/#pricing", status: "live" },
  { id: 18, code: "18", name: "Mobile Summer Pass", surface: "web", route: "/#summer-pass", status: "live" },
  { id: 19, code: "19", name: "Mobile app promo", surface: "web", route: "/", status: "live" },
  { id: 20, code: "20", name: "Mobile footer", surface: "web", route: "/", status: "live" },

  // —— Member App Core 21–65 ——
  { id: 21, code: "21", name: "Splash", surface: "app", route: "/app/login", status: "live" },
  { id: 22, code: "22", name: "Authentication", surface: "app", route: "/app/login", status: "live" },
  { id: 23, code: "23", name: "Home dashboard", surface: "app", route: "/app", status: "live" },
  { id: 24, code: "24", name: "Home shortcuts", surface: "app", route: "/app", status: "live" },
  { id: 25, code: "25", name: "Notifications inbox", surface: "app", route: "/app", status: "scaffold" },
  { id: 26, code: "26", name: "Crowd Meter", surface: "app", route: "/app/crowd", status: "scaffold" },
  { id: 27, code: "27", name: "Crowd history", surface: "app", route: "/app/crowd", status: "scaffold" },
  { id: 28, code: "28", name: "Check-in idle", surface: "app", route: "/app/check-in", status: "live" },
  { id: 29, code: "29", name: "Check-in scanning", surface: "app", route: "/app/check-in", status: "live" },
  { id: 30, code: "30", name: "Check-in success", surface: "app", route: "/app/check-in", status: "live" },
  { id: 31, code: "31", name: "Check-in offline", surface: "app", route: "/app/check-in", status: "live" },
  { id: 32, code: "32", name: "Check-in club full", surface: "app", route: "/app/check-in", status: "live" },
  { id: 33, code: "33", name: "Digital keytag", surface: "app", route: "/app/keytag", status: "live" },
  { id: 34, code: "34", name: "Keytag brightness", surface: "app", route: "/app/keytag", status: "scaffold" },
  { id: 35, code: "35", name: "Keytag offline cache", surface: "app", route: "/app/keytag", status: "scaffold" },
  { id: 36, code: "36", name: "Guest pass home", surface: "app", route: "/app/guests", status: "scaffold" },
  { id: 37, code: "37", name: "Guest pass create", surface: "app", route: "/app/guests", status: "scaffold" },
  { id: 38, code: "38", name: "Guest pass QR", surface: "app", route: "/app/guests", status: "scaffold" },
  { id: 39, code: "39", name: "Guest pass history", surface: "app", route: "/app/guests", status: "scaffold" },
  { id: 40, code: "40", name: "Workout library", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 41, code: "41", name: "Workout detail", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 42, code: "42", name: "Video player", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 43, code: "43", name: "PF+ collections", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 44, code: "44", name: "Favorites", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 45, code: "45", name: "Workout history", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 46, code: "46", name: "Guide step-through", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 47, code: "47", name: "Form tutorial", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 48, code: "48", name: "Workout complete", surface: "app", route: "/app/workouts", status: "scaffold" },
  { id: 49, code: "49", name: "Equipment scanner", surface: "app", route: "/app/equipment", status: "scaffold" },
  { id: 50, code: "50", name: "Equipment permission", surface: "app", route: "/app/equipment", status: "scaffold" },
  { id: 51, code: "51", name: "Equipment tutorial", surface: "app", route: "/app/equipment", status: "scaffold" },
  { id: 52, code: "52", name: "Equipment favorites", surface: "app", route: "/app/equipment", status: "scaffold" },
  { id: 53, code: "53", name: "Billing home", surface: "app", route: "/app/billing", status: "live" },
  { id: 54, code: "54", name: "Billing history", surface: "app", route: "/app/billing", status: "scaffold" },
  { id: 55, code: "55", name: "Update payment method", surface: "app", route: "/app/billing/retry", status: "scaffold" },
  { id: 56, code: "56", name: "Freeze membership", surface: "app", route: "/app/billing/freeze", status: "live" },
  { id: 57, code: "57", name: "Cancel guide", surface: "app", route: "/app/billing/cancel", status: "live" },
  { id: 58, code: "58", name: "Cancel confirm", surface: "app", route: "/app/billing/cancel", status: "live" },
  { id: 59, code: "59", name: "Account home", surface: "app", route: "/app/account", status: "live" },
  { id: 60, code: "60", name: "Partner perks", surface: "app", route: "/app/perks", status: "scaffold" },
  { id: 61, code: "61", name: "Perk detail", surface: "app", route: "/app/perks", status: "scaffold" },
  { id: 62, code: "62", name: "Perk redeem", surface: "app", route: "/app/perks", status: "scaffold" },
  { id: 63, code: "63", name: "Refer a friend", surface: "app", route: "/app/perks", status: "scaffold" },
  { id: 64, code: "64", name: "Profile edit", surface: "app", route: "/app/account/profile", status: "live" },
  { id: 65, code: "65", name: "Notification prefs", surface: "app", route: "/app/account", status: "scaffold" },

  // —— Advanced / edge 66–85 ——
  { id: 66, code: "66", name: "Failed payment retry", surface: "app", route: "/app/billing/retry", status: "live" },
  { id: 67, code: "67", name: "Home gym transfer", surface: "app", route: "/app/account/transfer", status: "live" },
  { id: 68, code: "68", name: "Social fitness streaks", surface: "app", route: "/app/streaks", status: "live" },
  { id: 69, code: "69", name: "Streak share card", surface: "app", route: "/app/streaks", status: "live" },
  { id: 70, code: "70", name: "Language picker", surface: "app", route: "/app/account/language", status: "live" },
  { id: 71, code: "71", name: "Accessibility text size", surface: "app", route: "/app/account/accessibility", status: "live" },
  { id: 72, code: "72", name: "Accessibility contrast", surface: "app", route: "/app/account/accessibility", status: "live" },
  { id: 73, code: "73", name: "Screen reader prefs", surface: "app", route: "/app/account/accessibility", status: "live" },
  { id: 74, code: "74", name: "Reduced motion", surface: "app", route: "/app/account/accessibility", status: "live" },
  { id: 75, code: "75", name: "Club transfer status", surface: "app", route: "/app/account/transfer/status", status: "live" },
  { id: 76, code: "76", name: "Black Card spa booking", surface: "app", route: "/app/spa", status: "live" },
  { id: 77, code: "77", name: "Class / training booking", surface: "app", route: "/app/book", status: "live" },
  { id: 78, code: "78", name: "Support chat", surface: "app", route: "/app/account/support", status: "live" },
  { id: 79, code: "79", name: "Store / gear", surface: "app", route: "/app/perks", status: "scaffold" },
  { id: 80, code: "80", name: "HealthKit connect", surface: "app", route: "/app/account/health", status: "live" },
  { id: 81, code: "81", name: "Wearable sync", surface: "app", route: "/app/account/health", status: "live" },
  { id: 82, code: "82", name: "Activity import", surface: "app", route: "/app/account/health", status: "scaffold" },
  { id: 83, code: "83", name: "Permission denied recovery", surface: "app", route: "/app/account/health", status: "live" },
  { id: 84, code: "84", name: "Session expired", surface: "app", route: "/app/login?reason=expired", status: "live" },
  { id: 85, code: "85", name: "Force update gate", surface: "app", route: "/app/login?reason=update", status: "live" },
];

export function screensBySurface(surface: ScreenSurface) {
  return SCREENS.filter((screen) => screen.surface === surface);
}
