import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "./prisma";
import NextAuth, { User } from "next-auth";
import md5 from "md5";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username/Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { identifier, password } = credentials;

        if (!identifier || !password) {
          throw new Error("Missing identifier or password");
        }

        // Cari user berdasarkan jenis input
        const user = await prisma.users.findFirst({
          where: { username: identifier },
        });
        // if (/^\S+@\S+\.\S+$/.test(identifier)) {
        // 	// Input adalah email
        // 	user = await prisma.users.findFirst({
        // 		where: { email: identifier },
        // 	});
        // } else if (/^\d{10,15}$/.test(identifier)) {
        // 	// Input adalah nomor telepon
        // 	user = await prisma.users.findFirst({
        // 		where: { nophone: identifier },
        // 	});
        // } else {
        // 	// Input adalah username
        // 	user = await prisma.users.findFirst({
        // 		where: { username: identifier },
        // 	});
        // }

        // Validate user and password
        if (user && md5(password) === user.password) {
          return {
            id: user.userid,
            role: user.role,
          };
        }

        return null; // If authentication fails
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {
    async session({ session, token, user }) {
      // Attach the user information to the session
      session.user.userid = token.userId as string;
      console.log("Session Callback:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
  },
});
