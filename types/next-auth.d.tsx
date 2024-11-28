import { type DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			userid: string;
			role: string;
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
		role: string;
	}

	interface JWT {
		userid: string;
		role: string;
	}
}
