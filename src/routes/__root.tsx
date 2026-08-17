import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { SupportProvider } from '#/lib/support'
import { UnlockSheet } from '#/components/monetization/UnlockSheet'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        title: 'OJ — Only Jokes',
      },
      {
        name: 'description',
        content:
          'Unfiltered stand-up, raw road work, and animated comedy without corporate censorship.',
      },
      { name: 'theme-color', content: '#07090e' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-[var(--bg)] font-sans text-[var(--ink)] antialiased">
        <SupportProvider>
          {children}
          <UnlockSheet />
        </SupportProvider>
        <Scripts />
      </body>
    </html>
  )
}
