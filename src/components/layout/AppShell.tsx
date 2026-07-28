import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { BagDrawer } from "@/components/bag/BagDrawer"
import { SupportChat } from "@/components/support/SupportChat"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ErrorBoundary } from "@/components/system/ErrorBoundary"

export function AppShell() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <SiteFooter />
        <BagDrawer />
        <SupportChat />
      </div>
    </TooltipProvider>
  )
}
