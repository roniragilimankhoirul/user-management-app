-- CreateEnum
CREATE TYPE "namaBank" AS ENUM ('BCA', 'BNI', 'BRI', 'MANDIRI');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(100) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telp" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "alamat_id" TEXT NOT NULL,

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

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "akun_bank" (
    "id" VARCHAR(100) NOT NULL,
    "nama_bank" "namaBank" NOT NULL,
    "no_rekening" VARCHAR(100) NOT NULL,
    "saldo" DECIMAL NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "akun_bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telp_key" ON "users"("telp");

-- CreateIndex
CREATE UNIQUE INDEX "users_alamat_id_key" ON "users"("alamat_id");

-- CreateIndex
CREATE UNIQUE INDEX "akun_bank_user_id_key" ON "akun_bank"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_alamat_id_fkey" FOREIGN KEY ("alamat_id") REFERENCES "alamat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_bank" ADD CONSTRAINT "akun_bank_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
