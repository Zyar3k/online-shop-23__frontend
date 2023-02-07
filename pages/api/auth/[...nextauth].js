import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "EzzyShop",
      credentials: {},
      async authorize(credentials) {
        const authResponse = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content=Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
