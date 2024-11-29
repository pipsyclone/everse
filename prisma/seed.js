const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");

const prisma = new PrismaClient();

async function main() {
	await prisma.users.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			name: "Admin Ganteng",
			username: "admin",
			email: "admin@mail.com",
			nophone: "085155467817",
			password: md5("admin123"),
			role: "ADMIN",
			provider:"Credentials",
			providerid:md5(new Date().toISOString())
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.log(err);
		await prisma.$disconnect();
		process.exit(1);
	});
