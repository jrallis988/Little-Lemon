import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { SupportProvider } from '#/lib/support'
import { MembershipProvider } from '#/lib/membership'
import { DemoAuthProvider } from '#/lib/demo-auth'
import { PlayerProvider } from '#/lib/player'
import { PublishProvider } from '#/lib/oj/publish-store'
import { InboxProvider } from '#/lib/oj/inbox-store'
import { SafetyProvider } from '#/lib/oj/safety-store'
import { ActivityProvider } from '#/lib/oj/activity-store'
import { UnlockSheet } from '#/components/monetization/UnlockSheet'
import { PlaySheet } from '#/components/media/PlaySheet'
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
        title: 'only Jokes',
      },
      {
        name: 'description',
        content:
          'Unfiltered stand-up, raw road work, and animated comedy without corporate censorship.',
      },
      { name: 'theme-color', content: '#00AFF0' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { property: 'og:title', content: 'only Jokes' },
      {
        property: 'og:description',
        content:
          'Unfiltered stand-up, raw road work, and animated comedy without corporate censorship.',
      },
      { property: 'og:image', content: '/og.svg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/og.svg' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'apple-touch-icon', href: '/og.svg' },
    ],
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
        <DemoAuthProvider>
          <MembershipProvider>
            <ActivityProvider>
              <PublishProvider>
                <InboxProvider>
                  <SafetyProvider>
                    <PlayerProvider>
                      <SupportProvider>
                        {children}
                        <UnlockSheet />
                        <PlaySheet />
                      </SupportProvider>
                    </PlayerProvider>
                  </SafetyProvider>
                </InboxProvider>
              </PublishProvider>
            </ActivityProvider>
          </MembershipProvider>
        </DemoAuthProvider>
        <Scripts />
      </body>
    </html>
  )
}
