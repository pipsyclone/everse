import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import md5 from "md5";

export const options = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {
				identifier: {},
				password: {},
			},
			async authorize(credentials, req, res) {
				const { identifier, password } = credentials;
				let user;

				if (/^\S+@\S+\.\S+$/.test(identifier)) {
					// Input adalah email
					user = await prisma.user.findFirst({
						where: { email: identifier },
					});
				} else if (/^\d{10,15}$/.test(identifier)) {
					// Input adalah nomor telepon
					user = await prisma.user.findFirst({
						where: { nophone: identifier },
					});
				} else {
					// Input adalah username
					user = await prisma.user.findFirst({
						where: { username: identifier },
					});
				}

				// Validate user and password
				if (user && md5(password) === user.password) {
					return user;
				}

				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 2 * 24 * 60 * 60, // 2 Days Expire
	},
	pages: {
		signIn: "/auth",
		signUp: "/auth",
		signOut: "/auth",
	},
	callbacks: {
		async jwt(params) {
			// Update Token
			if (params.user) {
				params.token.userid = params.user.userid;
				params.token.role = params.user.role;
			}

			// Return Final Token
			return params.token;
		},
		async session({ session, token }) {
			// Menyimpan username ke dalam session untuk dikirimkan ke client
			session.user.userid = token.userid;
			session.user.role = token.role;

			return session;
		},
	},
};
