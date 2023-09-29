# User-Management-App

## Deskripsi
Repositori GitHub ini adalah proyek "User-Management-App," yang merupakan pre-test saya sebagai calon yang melamar posisi Internship Backend Engineer secara remote di DOT Indonesia.

## Daftar Isi

- [Instalasi](#instalasi)
- [Struktur Proyek](#struktur-proyek)

## Struktur Proyek

Struktur proyek aplikasi ini menggunakan pendekatan "by layer", dimana pendekatan ini bertujuan untuk memisahkan komponen-komponen inti proyek ke dalam lapisan-lapisan yang berbeda berdasarkan tanggung jawab dan fungsi masing-masing. Keunggulan pendekatan "by layer" adalah sebagai berikut:

1. **Pemisahan Tanggung Jawab**: Memisahkan tanggung jawab komponen ke dalam lapisan yang jelas (route, controller, service), memudahkan manajemen kode dan kolaborasi tim.

2. **Skalabilitas**: Memungkinkan penambahan atau perubahan komponen tanpa mengganggu lapisan lainnya, baik untuk pengembangan bersamaan atau pertumbuhan proyek.

3. **Pemeliharaan yang Lebih Mudah**: Dengan pemisahan yang jelas, pemeliharaan proyek menjadi lebih sederhana, memungkinkan perbaikan atau perubahan di lapisan tertentu tanpa merusak yang lain.

4. **Pengujian yang Lebih Baik**: Struktur ini mendukung pengujian terpisah pada komponen, termasuk pengujian unit, integrasi, dan end-to-end, memastikan keakuratan dan kualitas kode.

5. **Keterbacaan Kode yang Lebih Baik**: Struktur ini meningkatkan keterbacaan kode, memudahkan pemahaman bagi pengembang baru tentang interaksi komponen-komponen.

    
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
