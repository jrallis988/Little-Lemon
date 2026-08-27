/**
 * Marshalls prototype — 21 core screens & views.
 *
 * Component hierarchy (high level):
 *
 * App
 * └─ AppShell (global chrome)
 *    ├─ SiteHeader (+ SearchTypeahead, Shop mega-menu)
 *    ├─ <Outlet> → page routes below
 *    ├─ SiteFooter
 *    ├─ BagDrawer
 *    ├─ SupportChat (slide-over utility — not a route)
 *    ├─ ToastHost
 *    └─ WelcomeEmailModal
 *
 * Page → feature components:
 *  HomePage          → hero carousel, department tiles, ProductCard rails
 *  CatalogPage       → CatalogView → FilterSidebar, CatalogToolbar, ProductCard
 *  ProductDetailPage → gallery, size/color, StoreStockPanel, ProductCard rails
 *  DepartmentLanding → hero + category chips + ProductCard grid
 *  MerchLandingPage  → Designer / Under $50 / Clearance edits
 *  FitQuizPage       → multi-step questionnaire + ProductCard results
 *  BagPage / CheckoutPage / AccountPage / …
 */

export type ScreenGroup =
  | "Global & Core Navigation"
  | "Product & Discovery"
  | "Account & Utilities"
  | "Cart, Checkout & Edge Cases"

export type ScreenDefinition = {
  id: string
  number: string
  title: string
  group: ScreenGroup
  description: string
  /** In-app route to open this view */
  path: string
  /** Optional preview thumbnail under /previews */
  preview?: string
  /** Viewport notes for the contact sheet */
  viewport?: "desktop" | "mobile" | "both"
  /** True when the view is a global overlay rather than a full page */
  overlay?: boolean
  page: string
}

export const SCREEN_GROUPS: ScreenGroup[] = [
  "Global & Core Navigation",
  "Product & Discovery",
  "Account & Utilities",
  "Cart, Checkout & Edge Cases",
]

export const SCREENS: ScreenDefinition[] = [
  {
    id: "design-system",
    number: "00",
    title: "Design System / Contact Sheet",
    group: "Global & Core Navigation",
    description:
      "Typography, color tokens, and a navigable index of every core surface.",
    path: "/design-system",
    preview: "/previews/01-home.png",
    viewport: "both",
    page: "DesignSystemPage",
  },
  {
    id: "home",
    number: "01",
    title: "Home",
    group: "Global & Core Navigation",
    description:
      "Brand-first hero, department highlights, merchandising rails, and quick navigation.",
    path: "/",
    preview: "/previews/01-home.png",
    viewport: "desktop",
    page: "HomePage",
  },
  {
    id: "home-mobile",
    number: "19",
    title: "Home · Mobile",
    group: "Global & Core Navigation",
    description: "Thumb-friendly home layout — same route, mobile viewport.",
    path: "/",
    preview: "/previews/19-home-mobile.png",
    viewport: "mobile",
    page: "HomePage",
  },
  {
    id: "catalog-women",
    number: "02",
    title: "Catalog · Women",
    group: "Global & Core Navigation",
    description: "Grid PLP with filters, sorting, and category refinement.",
    path: "/catalog?department=Women",
    preview: "/previews/02-catalog.png",
    viewport: "desktop",
    page: "CatalogPage",
  },
  {
    id: "department-women",
    number: "04",
    title: "Department · Women",
    group: "Global & Core Navigation",
    description: "Sub-category landing with hero, chips, and curated product rows.",
    path: "/department/women",
    preview: "/previews/04-department-women.png",
    viewport: "desktop",
    page: "DepartmentLandingPage",
  },
  {
    id: "pdp",
    number: "03",
    title: "Product Detail",
    group: "Product & Discovery",
    description:
      "Gallery, pricing, size/color, stock, sticky Add to Bag, Complete the Look.",
    path: "/product/structured-wool-blazer-camel",
    preview: "/previews/03-pdp.png",
    viewport: "desktop",
    page: "ProductDetailPage",
  },
  {
    id: "pdp-mobile",
    number: "20",
    title: "Product Detail · Mobile",
    group: "Product & Discovery",
    description: "Stacked PDP with sticky purchase bar for mobile.",
    path: "/product/structured-wool-blazer-camel",
    preview: "/previews/20-pdp-mobile.png",
    viewport: "mobile",
    page: "ProductDetailPage",
  },
  {
    id: "fit-quiz",
    number: "05",
    title: "Fit Quiz",
    group: "Product & Discovery",
    description: "Multi-step questionnaire that surfaces a personalized edit.",
    path: "/fit-quiz",
    preview: "/previews/05-fit-quiz.png",
    viewport: "both",
    page: "FitQuizPage",
  },
  {
    id: "designer-shop",
    number: "06",
    title: "Designer Shop",
    group: "Product & Discovery",
    description: "Boutique-style landing for designer and contemporary labels.",
    path: "/designer-shop",
    preview: "/previews/06-designer-shop.png",
    viewport: "desktop",
    page: "MerchLandingPage",
  },
  {
    id: "under-50",
    number: "07",
    title: "Under $50",
    group: "Product & Discovery",
    description: "Value-driven curated edit of budget-friendly finds.",
    path: "/under-50",
    preview: "/previews/07-under-50.png",
    viewport: "desktop",
    page: "MerchLandingPage",
  },
  {
    id: "clearance",
    number: "08",
    title: "Clearance",
    group: "Product & Discovery",
    description: "Deepest markdowns with clear compare-at and % off signals.",
    path: "/clearance",
    preview: "/previews/08-clearance.png",
    viewport: "desktop",
    page: "MerchLandingPage",
  },
  {
    id: "stores",
    number: "09",
    title: "Store Finder",
    group: "Account & Utilities",
    description: "Location search with store cards, hours, and services.",
    path: "/stores",
    preview: "/previews/09-stores.png",
    viewport: "both",
    page: "StoreFinderPage",
  },
  {
    id: "wishlist",
    number: "10",
    title: "Wishlist",
    group: "Account & Utilities",
    description: "Saved items with move-to-bag and remove actions.",
    path: "/wishlist",
    preview: "/previews/10-wishlist.png",
    viewport: "both",
    page: "WishlistPage",
  },
  {
    id: "account",
    number: "11",
    title: "Account · Magic Link",
    group: "Account & Utilities",
    description: "Passwordless sign-in plus order history and support tickets.",
    path: "/account",
    preview: "/previews/11-account.png",
    viewport: "both",
    page: "AccountPage",
  },
  {
    id: "gift-cards",
    number: "12",
    title: "Gift Cards",
    group: "Account & Utilities",
    description: "Purchase options and inline balance checker.",
    path: "/gift-cards",
    preview: "/previews/12-gift-cards.png",
    viewport: "both",
    page: "GiftCardsPage",
  },
  {
    id: "shipping-returns",
    number: "13",
    title: "Shipping & Returns",
    group: "Account & Utilities",
    description: "Delivery tiers, return windows, and policy breakdown.",
    path: "/shipping-returns",
    preview: "/previews/13-shipping-returns.png",
    viewport: "both",
    page: "ShippingReturnsPage",
  },
  {
    id: "order-status",
    number: "14",
    title: "Order Status",
    group: "Account & Utilities",
    description: "Tracking lookup with order number and email / ZIP verification.",
    path: "/order-status",
    preview: "/previews/14-order-status.png",
    viewport: "both",
    page: "OrderStatusPage",
  },
  {
    id: "bag",
    number: "15",
    title: "Bag",
    group: "Cart, Checkout & Edge Cases",
    description: "Itemized cart, qty controls, free-shipping progress, checkout CTA.",
    path: "/bag",
    preview: "/previews/15-bag.png",
    viewport: "both",
    page: "BagPage",
  },
  {
    id: "checkout",
    number: "17",
    title: "Checkout",
    group: "Cart, Checkout & Edge Cases",
    description: "Multi-step shipping → payment → review with order summary.",
    path: "/checkout",
    preview: "/previews/17-checkout.png",
    viewport: "both",
    page: "CheckoutPage",
  },
  {
    id: "chat",
    number: "18",
    title: "Support Chat",
    group: "Cart, Checkout & Edge Cases",
    description: "Global slide-over chat (Maya) with quick prompts and handoff.",
    path: "/design-system#support-chat",
    preview: "/previews/18-chat.png",
    viewport: "both",
    overlay: true,
    page: "SupportChat",
  },
  {
    id: "not-found",
    number: "16",
    title: "404 Error",
    group: "Cart, Checkout & Edge Cases",
    description: "Minimalist fallback with links back to key hubs.",
    path: "/this-page-does-not-exist",
    preview: "/previews/16-404.png",
    viewport: "both",
    page: "NotFoundPage",
  },
]

export function screensByGroup() {
  return SCREEN_GROUPS.map((group) => ({
    group,
    screens: SCREENS.filter((s) => s.group === group),
  }))
}
