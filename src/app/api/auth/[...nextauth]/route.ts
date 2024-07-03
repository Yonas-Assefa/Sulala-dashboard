import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
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
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      try {
        if (!account) {
          throw new Error("Account details not found");
        }

        const login = await googleSingIn(account.access_token as string);
        console.error("errors:", login);

        if (login?.status === "ERROR") {
          console.log("Login response: ", login, typeof login);

          return "/auth/setup-account?stage=one";
        }

        return true;
      } catch (error: any) {
        console.error("Error during sign-in:", error.message);
        throw new Error(error.message || "Sign in error");
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("url 0: ", baseUrl, url);

      return `${baseUrl}/auth/setup-account?stage=one`;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
