-- CreateEnum
CREATE TYPE "namaBank" AS ENUM ('BCA', 'BNI', 'BRI', 'MANDIRI');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(100) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telp" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alamat" (
    "id" VARCHAR(100) NOT NULL,
    "desa" VARCHAR(100) NOT NULL,
    "kecamatan" VARCHAR(100) NOT NULL,
    "kota" VARCHAR(100) NOT NULL,
    "provinsi" VARCHAR(100) NOT NULL,
    "kode_pos" VARCHAR(10) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "akun_bank" (
    "id" VARCHAR(100) NOT NULL,
    "nama_bank" "namaBank" NOT NULL,
    "no_rekening" VARCHAR(100) NOT NULL,
    "saldo" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "akun_bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telp_key" ON "users"("telp");

-- CreateIndex
CREATE UNIQUE INDEX "alamat_user_id_key" ON "alamat"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "akun_bank_no_rekening_key" ON "akun_bank"("no_rekening");

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_bank" ADD CONSTRAINT "akun_bank_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
