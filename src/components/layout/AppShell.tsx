import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { BagDrawer } from "@/components/bag/BagDrawer"
import { SupportChat } from "@/components/support/SupportChat"
import { ToastHost } from "@/components/system/ToastHost"
import { WelcomeEmailModal } from "@/components/system/WelcomeEmailModal"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ErrorBoundary } from "@/components/system/ErrorBoundary"

export function AppShell() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-sm focus:text-navy-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <SiteFooter />
        <BagDrawer />
        <SupportChat />
        <ToastHost />
        <WelcomeEmailModal />
      </div>
    </TooltipProvider>
  )
}
