import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

/**
 * Edge-safe auth config (no Prisma). Used by middleware.
 * Full authorize + DB enrichment live in auth.ts.
 */
const providers: NextAuthConfig["providers"] = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    // Implemented in auth.ts via providers override
    authorize: async () => null,
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

export const authConfig = {
  providers,
  pages: {
    signIn: "/login",
    newUser: "/profile",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (
        path.startsWith("/profile") ||
        path.startsWith("/api/me") ||
        path.startsWith("/admin")
      ) {
        return !!auth?.user;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.membershipTier =
          (user as { membershipTier?: string }).membershipTier ?? "free";
        token.membershipStatus =
          (user as { membershipStatus?: string | null }).membershipStatus ?? null;
        token.allowPersonalizedTips = Boolean(
          (user as { allowPersonalizedTips?: boolean }).allowPersonalizedTips
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.membershipTier =
          (token.membershipTier as string) ?? "free";
        session.user.membershipStatus =
          (token.membershipStatus as string | null) ?? null;
        session.user.allowPersonalizedTips = Boolean(
          token.allowPersonalizedTips
        );
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
