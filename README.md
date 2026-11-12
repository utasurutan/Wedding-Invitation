# Undangan Pernikahan Digital SPA (The Wedding of Rakha & Kinari)

Aplikasi Single Page Application (SPA) Undangan Pernikahan Digital modern, elegan, dan responsif. Dibuat menggunakan **React.js + Vite**, **Tailwind CSS**, dan **Framer Motion**.

---

## ✨ Fitur Utama

1. **Cover Depan & Personalisasi Tamu (`<Hero />`)**:
   - Mendukung URL Parameter `?to=Nama+Tamu` (contoh: `http://localhost:5173/?to=Budi+Santoso`).
   - Fitur **Scroll Lock**: Layar terkunci sebelum tombol **"Buka Undangan"** diklik.
   - Mengaktifkan pemutaran musik secara mulus saat undangan dibuka.

2. **Pemutar Musik & Navigasi Bawah (`<AudioPlayer />` & `<BottomNav />`)**:
   - Floating audio widget dengan animasi piringan berputar (vinyl record) dan kontrol Play/Pause (`useRef`).
   - Floating Dock / Bottom Navigation Bar dengan glassmorphism dan smooth scrolling ke setiap section.

3. **Profil Mempelai (`<Profiles />`)**:
   - Foto mempelai dengan bingkai estetik arch/lengkung.
   - Nama lengkap, nama panggilan, info orang tua, dan tautan sosial media kedua mempelai.
   - Desain responsif (vertikal di mobile, 2 kolom sejajar di desktop).

4. **Jadwal & Countdown (`<EventSchedule />`)**:
   - Real-time dynamic countdown timer menuju hari H (`useEffect` & `setInterval`).
   - Rincian Akad Nikah dan Resepsi Pernikahan.
   - Tombol integrasi **"Add to Google Calendar"** langsung ke kalender pengguna.

5. **Peta Lokasi Acara (`<LocationMaps />`)**:
   - Google Maps iframe embed yang responsif.
   - Tombol CTA native untuk membuka aplikasi Google Maps langsung.
   - Tombol salin alamat lengkap ke clipboard dengan notifikasi toast.

6. **Galeri Dokumentasi & Lightbox (`<Gallery />`)**:
   - Grid foto pre-wedding dengan efek zoom on hover.
   - Modal Lightbox layar penuh dengan tombol Navigasi Next/Prev dan keyboard shortcut (Esc, Panah Kanan/Kiri).

7. **Amplop Digital & QRIS (`<WeddingGift />`)**:
   - Tab switcher antara Transfer Rekening Bank (BCA & Mandiri) dan Barcode QRIS.
   - Tombol "Salin Rekening" dengan state `navigator.clipboard` (umpan balik "Berhasil Disalin!" selama 2 detik).
   - Info opsi kirim kado fisik ke alamat pengiriman.

8. **Buku Tamu & Form RSVP (`<RSVP />`)**:
   - Controlled Form Component (`useState`) untuk Nama, Kehadiran, Jumlah Tamu, dan Pesan Doa Restu.
   - Auto-fill nama tamu dari URL Parameter.
   - Fungsi `handleSubmit` yang mencegah reload, menyimpan ke state dan `localStorage`.
   - Menampilkan feed ucapan doa restu tamu secara real-time.

---

## 🚀 Cara Menjalankan Proyek di Komputer Lokal

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. **Buka di Browser**:
   ```
   http://localhost:5173/?to=Budi+Santoso
   ```
   *(Ganti `Budi+Santoso` dengan nama tamu yang ingin Anda tuju)*

3. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

