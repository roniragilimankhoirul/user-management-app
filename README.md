# User-Management-App

## Deskripsi
Repositori GitHub ini adalah proyek "User-Management-App," yang merupakan pre-test saya sebagai calon yang melamar posisi Internship Backend Engineer secara remote di DOT Indonesia.

## Daftar Isi

- [Instalasi](#instalasi)

## Instalasi

1. Klon repositori ini:

```shell
git clone https://github.com/roniragilimankhoirul/user-management-app.git
```
2. Navigasi ke Direktori Proyek:

```shell
cd user management app
```

3. Mengatur Environment Variables:

Buat file .env di akar proyek dan konfigurasikan Environment Variables Anda.

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/dots"
PORT = 3000
JWT_SECRET="xxx"
```

4. Instal dependensi:

```shell
npm install
```
5. Migrasi Database:

```shell
npx prisma migrate deploy
```

6. Menjalankan aplikasi:

```shell
npm start
```

Aplikasi akan berjalan di http://localhost:{port}.
