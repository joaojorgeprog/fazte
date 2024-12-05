import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    pages: {
        signIn: "/"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // Expiração da sessão em 60 segundos * 15 minutos
    },
    jwt: {
        maxAge: 60 * 60, // Expiração do token em 60 segundos * 15 minutos
    },
    callbacks: {
      async jwt({ token, account, user }) {
        if (account && user) {
          token.accessToken = account.access_token;
          token.idToken = account.id_token;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.idToken = token.idToken;
        return session;
      },
    }
}