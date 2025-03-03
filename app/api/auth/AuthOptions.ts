import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../apiClients";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          // Correctly access the nested 'data' object
          if (user && user.data && user.data.accessToken) {
            return {
              id: user.data.userId, // Accessing userId from 'data'
              email: credentials.email,
              accessToken: user.data.accessToken, // Corrected access to 'accessToken'
            };
          } else {
            throw new Error("Invalid login response. No access token found.");
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  // [...nextauth].ts
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Token:", token);
      console.log("JWT Callback - User:", user);
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback - Session:", session);
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "test",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
