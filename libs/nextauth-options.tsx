import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { AuthOptions, NextAuthOptions, User } from "next-auth";
import md5 from "md5";

export const options = {
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
	debug: true,
	callbacks: {
		async jwt(params) {
			if (params) {
				params.token.userid = params.user.id;
				params.token.role = params.user.role;
			}
			return params.token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				userid: token.userid as string,
				role: token.role as string,
			};
			return session;
		},
	},
} satisfies AuthOptions;
