const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			providerid: md5(new Date().toDateString()),
			provider: "credentials",
			name: "Admin Ganteng",
			username: "admin",
			email: "admin@mail.com",
			nophone: "0851554678178",
			password: md5("admin123"),
			role: "ADMIN",
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
