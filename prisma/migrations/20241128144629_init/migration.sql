-- CreateTable
CREATE TABLE "users" (
    "userid" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "nophone" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'user.png',
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "productdetails" (
    "productid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "productcode" INTEGER NOT NULL,
    "productname" TEXT NOT NULL,
    "productstatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "productimagesquare" TEXT NOT NULL,
    "productimagelandscape" TEXT NOT NULL DEFAULT '-',
    "productimageinstructions" TEXT NOT NULL DEFAULT '-',
    "productinstructions" TEXT NOT NULL,

    CONSTRAINT "productdetails_pkey" PRIMARY KEY ("productid")
);

-- CreateTable
CREATE TABLE "transactions" (
    "trxid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "refid" TEXT NOT NULL,
    "productid" TEXT NOT NULL,
    "statuspayment" TEXT NOT NULL DEFAULT 'UNPAID',
    "statusitem" TEXT NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("trxid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nophone_key" ON "users"("nophone");

-- CreateIndex
CREATE UNIQUE INDEX "productdetails_productcode_key" ON "productdetails"("productcode");

-- AddForeignKey
ALTER TABLE "productdetails" ADD CONSTRAINT "productdetails_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
