import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const providers = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(raw) {
      const parsed = credentialsSchema.safeParse(raw);
      if (!parsed.success) return null;
      const user = await prisma.user.findUnique({
        where: { email: parsed.data.email.toLowerCase() },
      });
      if (!user?.passwordHash) return null;
      const ok = await compare(parsed.data.password, user.passwordHash);
      if (!ok) return null;
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        membershipTier: user.membershipTier,
        membershipStatus: user.membershipStatus,
        allowPersonalizedTips: user.allowPersonalizedTips,
      };
    },
  }),
  ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
      ]
    : []),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.sub = user.id;
        token.membershipTier =
          (user as { membershipTier?: string }).membershipTier ?? "free";
        token.membershipStatus =
          (user as { membershipStatus?: string | null }).membershipStatus ??
          null;
        token.allowPersonalizedTips = Boolean(
          (user as { allowPersonalizedTips?: boolean }).allowPersonalizedTips
        );
      }

      if ((user || trigger === "update") && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            membershipTier: true,
            membershipStatus: true,
            allowPersonalizedTips: true,
            name: true,
          },
        });
        if (dbUser) {
          token.membershipTier = dbUser.membershipTier;
          token.membershipStatus = dbUser.membershipStatus;
          token.allowPersonalizedTips = dbUser.allowPersonalizedTips;
          token.name = dbUser.name;
        }
      }
      return token;
    },
  },
});
