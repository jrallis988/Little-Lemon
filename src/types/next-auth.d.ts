import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      membershipTier: string;
      membershipStatus: string | null;
      allowPersonalizedTips: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    membershipTier?: string;
    membershipStatus?: string | null;
    allowPersonalizedTips?: boolean;
  }
}
