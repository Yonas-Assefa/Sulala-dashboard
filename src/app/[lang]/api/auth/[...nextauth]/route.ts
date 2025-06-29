import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/actions/auth/signin";
import { googleSingIn } from "@/actions/auth/google-sign-in";
import { redirect } from "@/i18n/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID!;
const GOOGLE_CLEINT_SECRET = process.env.GOOGLE_SECRET!;
const NEXT_SECRET = process.env.SECRET;

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLEINT_SECRET,
    }),
  ],
  secret: NEXT_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) {
        throw new Error("Sign up error");
      }
      const login = await googleSingIn(account.access_token as string);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/auth/setup-account/`;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
