import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/actions/auth/signin";
import { googleSingIn } from "@/actions/auth/google-sign-in";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID!;
const GOOGLE_CLEINT_SECRET = process.env.GOOGLE_SECRET!;

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
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) {
        throw new Error("Sign up error");
      }
      const login = await googleSingIn(account.access_token as string);
      console.log("login respose: ", login);
      console.log("account: ", account);

      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
