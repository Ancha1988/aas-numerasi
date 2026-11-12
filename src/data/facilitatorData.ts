export interface FacilitatorGuideItem {
  moduleId: string;
  moduleCode: string;
  title: string;
  targetDuration: string;
  facilitatorRole: string;
  pedagogicalKey: string;
  suggestedOpeningScript: string;
  facilitatorChecklist: string[];
  answerKey?: {
    title: string;
    items: { question: string; answer: string; pedagogicalInsight: string }[];
  };
}

export const FACILITATOR_GUIDES: Record<string, FacilitatorGuideItem> = {
  welcome: {
    moduleId: 'welcome',
    moduleCode: 'MODUL 01',
    title: 'Orientasi & Visi Numerasi',
    targetDuration: '10 Menit',
    facilitatorRole: 'Membangun atmosfir kolaboratif, mematahkan ketegangan awal, dan menegaskan bahwa numerasi adalah hak semua guru dan siswa.',
    pedagogicalKey: 'Numerasi adalah kemampuan berpikir kritis menggunakan matematika, bukan sekadar kecepatan menghitung rumus.',
    suggestedOpeningScript: '"Selamat datang Bapak/Ibu guru hebat SMP! Hari ini kita bukan belajar rumus matematika baru, melainkan bagaimana kita bersama-sama menyalakan nalar numerasi siswa kita melalui mata pelajaran yang Bapak/Ibu cintai."',
    facilitatorChecklist: [
      'Nyalakan layar sentuh PID dan pastikan volume audio cukup jelas.',
      'Sapa perwakilan guru dari masing-masing rumpun mapel.',
      'Jelaskan alur 120 menit: Experience → Understand → Explore → Design → Present → Reflect.',
    ],
  },
  icebreaking: {
    moduleId: 'icebreaking',
    moduleCode: 'MODUL 02',
    title: 'Tebak Angka, Temukan Makna',
    targetDuration: '10 Menit',
    facilitatorRole: 'Mengajak peserta menyentuh PID secara langsung dan mendiskusikan bahwa angka tanpa konteks adalah angka mati.',
    pedagogicalKey: 'Kontekstualisasi angka: Angka 80 bisa jadi nilai ujian, denyut nadi, persentase kelembapan, atau kecepatan kendaraan.',
    suggestedOpeningScript: '"Mari kita sentuh salah satu angka di layar ini. Coba tebak, dalam kehidupan nyata Bapak/Ibu guru, angka 80 ini bisa bercerita tentang apa?"',
    facilitatorChecklist: [
      'Minta 2-3 peserta maju ke depan PID untuk menyentuh kartu angka.',
      'Dorong variasi konteks: kesehatan, lingkungan, lalu lintas, pengeluaran.',
      'Buka studi kasus 100 siswa dan diskusikan implikasi keselamatan siswa.',
    ],
    answerKey: {
      title: 'Kunci Pembahasan Studi Kasus: 100 Siswa & Sepeda Motor',
      items: [
        {
          question: '1. Berapa siswa yang tidak menggunakan sepeda motor?',
          answer: '100 - 80 = 20 siswa (20% dari total populasi siswa).',
          pedagogicalInsight: 'Langkah awal: Pemahaman informasi eksplisit dasar.',
        },
        {
          question: '2. Berapa persentase pengguna sepeda motor?',
          answer: '(80 / 100) × 100% = 80%.',
          pedagogicalInsight: 'Menafsirkan perbandingan relatif proporsional.',
        },
        {
          question: '3. Informasi apa lagi yang diperlukan untuk mengambil keputusan keselamatan siswa?',
          answer: 'Usia siswa (apakah sudah 17 tahun / memiliki SIM C?), kepemilikan helm standar SNI, jarak rumah ke sekolah, kondisi jalur jalan raya, ketersediaan angkutan umum/sekolah, dan izin tertulis orang tua.',
          pedagogicalInsight: 'Inilah inti penalaran numerasi: Angka mengarahkan kita mencari variabel pelengkap sebelum mengambil kebijakan strategis di sekolah.',
        },
      ],
    },
  },
  brainstorming: {
    moduleId: 'brainstorming',
    moduleCode: 'MODUL 03',
    title: 'Numerasi Itu Urusan Siapa?',
    targetDuration: '15 Menit',
    facilitatorRole: 'Memantik perdebatan sehat dan membongkar mitos "Numerasi = Tanggung Jawab Guru Matematika Saja".',
    pedagogicalKey: 'Rapor Pendidikan dan Asesmen Nasional mengukur numerasi sebagai kecakapan lintas kurikulum.',
    suggestedOpeningScript: '"Ayo Bapak/Ibu, silakan klik tombol di layar atau ponsel Anda: Apakah penguatan numerasi HANYA menjadi tanggung jawab guru matematika?"',
    facilitatorChecklist: [
      'Tampilkan hasil voting langsung di layar PID.',
      'Fasilitasi pertukaran pendapat antara kelompok Setuju dan Tidak Setuju.',
      'Ajak peserta menyematkan sticky note digital contoh numerasi di mapel masing-masing.',
    ],
    answerKey: {
      title: 'Poin Kunci Brainstorming',
      items: [
        {
          question: 'Sikap yang Diharapkan',
          answer: 'TIDAK SETUJU.',
          pedagogicalInsight: 'Guru matematika mengajarkan konsep/alat matematikanya, namun guru mata pelajaran lain (IPA, IPS, Bahasa, PJOK, Seni, dll.) menyediakan konteks nyata di mana konsep tersebut hidup dan bermakna.',
        },
      ],
    },
  },
  challenge: {
    moduleId: 'challenge',
    moduleCode: 'MODUL 04',
    title: 'Tantangan Kantin Sehat Sekolah',
    targetDuration: '15 Menit',
    facilitatorRole: 'Memandu peserta membedah data distribusi 200 porsi kantin sekolah dan melakukan penalaran kebijakan.',
    pedagogicalKey: 'Menghubungkan data statistik dengan rekomendasi program nyata di sekolah (School Well-being).',
    suggestedOpeningScript: '"Kantin sekolah menyajikan 200 porsi makanan setiap hari. Mari kita teliti datanya: apakah pola konsumsi siswa kita sudah sehat?"',
    facilitatorChecklist: [
      'Arahkan peserta mengamati diagram batang & diagram lingkaran interaktif.',
      'Beri waktu 5 menit untuk mencoba menginput jawaban numerik.',
      'Buka tombol pembahasan langkah demi langkah.',
    ],
    answerKey: {
      title: 'Kunci Pembahasan Tantangan Kantin Sehat (Total 200 Porsi)',
      items: [
        {
          question: 'Tantangan 1: Berapa persentase siswa yang membeli buah?',
          answer: '10% (Perhitungan: 20 / 200 × 100% = 10%).',
          pedagogicalInsight: 'Hanya 1 dari 10 siswa yang mengonsumsi buah di sekolah.',
        },
        {
          question: 'Tantangan 2: Jenis makanan apa yang paling banyak diminati?',
          answer: 'Nasi dan lauk (80 porsi = 40% dari total konsumsi). Diikuti mi instan (60 porsi = 30%).',
          pedagogicalInsight: 'Makanan utama mendominasi, tetapi mi instan 30% merupakan porsi yang mengkhawatirkan bagi gizi remaja.',
        },
        {
          question: 'Tantangan 3: Jika target konsumsi buah 30% dari total 200 porsi, berapa porsi buah yang harus tersedia?',
          answer: '60 porsi buah (Kebutuhan tambahan = 60 - 20 = 40 porsi tambahan).',
          pedagogicalInsight: 'Menghitung 30% × 200 = 60 porsi. Artinya ketersediaan buah harus dinaikkan tiga kali lipat dari kondisi eksisting.',
        },
        {
          question: 'Tantangan 4: Rekomendasi kebijakan kantin sehat',
          answer: '1) Kebijakan paket hemat "Nasi + Lauk + Buah Potong" dengan harga subsidi sekolah; 2) Program "Jumat Sehat Bebas Mi Instan"; 3) Edukasi infografik kalori dan serat di dinding kantin; 4) Penyediaan dispenser air mineral gratis untuk menekan minuman manis.',
          pedagogicalInsight: 'Numerasi menghasilkan keputusan berbasis bukti (evidence-based policy).',
        },
      ],
    },
  },
  learninghub: {
    moduleId: 'learninghub',
    moduleCode: 'MODUL 05',
    title: 'Memahami Hakikat Numerasi',
    targetDuration: '20 Menit',
    facilitatorRole: 'Menjelaskan 3 dimensi numerasi AKM: Konten, Konteks, dan Proses Kognitif.',
    pedagogicalKey: 'Bedakan secara tegas: Berhitung murni (teknis dekontekstual) vs Numerasi (aplikatif kontekstual).',
    suggestedOpeningScript: '"Mari kita bedah apa bedanya Soal A (25% dari 200) dengan Soal B (Program Botol Minum Sekolah). Di situlah letak ruh numerasi!"',
    facilitatorChecklist: [
      'Buka tab materi satu per satu: Pengertian, 3 Komponen, Berhitung vs Numerasi, dan Numerasi Hidup.',
      'Jalankan kuis interaktif 5 soal bersama seluruh audiens di PID.',
      'Bahas feedback otomatis pada setiap butir soal.',
    ],
  },
  crosssubject: {
    moduleId: 'crosssubject',
    moduleCode: 'MODUL 06',
    title: 'Laboratorium Lintas Mata Pelajaran',
    targetDuration: '20 Menit',
    facilitatorRole: 'Memfasilitasi eksplorasi mandiri/kelompok rumpun mata pelajaran pada 9 mapel SMP.',
    pedagogicalKey: 'Setiap mata pelajaran memiliki kekayaan stimulus: teks, peta, grafik denyut nadi, koordinat batik, debit air, hingga data cuaca.',
    suggestedOpeningScript: '"Silakan kelompok guru memilih tab mata pelajarannya masing-masing. Pelajari stimulus dan pertanyaan pemantiknya!"',
    facilitatorChecklist: [
      'Keliling ke kelompok rumpun bahasa, sains, sosial, dan seni/pjok.',
      'Tunjukkan bahwa guru bahasa tidak perlu mengajar rumus aljabar rumit, melainkan mengajarkan cara membaca dan berargumen dengan angka.',
    ],
  },
  designstudio: {
    moduleId: 'designstudio',
    moduleCode: 'MODUL 07',
    title: 'Worksheet Builder Interaktif',
    targetDuration: '20 Menit',
    facilitatorRole: 'Membimbing peserta menyusun LKPD berbasis numerasi dengan 11 komponen kurikulum lengkap.',
    pedagogicalKey: 'Pastikan ada: Konteks nyata, Stimulus data, Proses kognitif (Memahami/Menerapkan/Menalar), dan Asesmen autentik.',
    suggestedOpeningScript: '"Waktunya berkarya! Buat 1 rancangan pembelajaran numerasi terbaik tim Anda. Anda bisa memuat template inspirasi kami atau mengetik baru."',
    facilitatorChecklist: [
      'Ingatkan bahwa data tersimpan otomatis di browser PID/laptop.',
      'Bantu peserta yang membutuhkan ide stimulus kontekstual.',
      'Ajak tim mencoba fitur Cetak/Pratinjau PDF.',
    ],
  },
  presentation: {
    moduleId: 'presentation',
    moduleCode: 'MODUL 08',
    title: 'Presentasi & Penilaian Rubrik',
    targetDuration: '10 Menit',
    facilitatorRole: 'Memfasilitasi 1-2 perwakilan kelompok untuk memaparkan karyanya di layar PID, lalu peserta lain memberi skor rubrik.',
    pedagogicalKey: 'Umpan balik berbasis rubrik 5 aspek (1-4) memberikan standar mutu desain pembelajaran.',
    suggestedOpeningScript: '"Mari kita simak presentasi Kelompok 1. Bapak/Ibu kelompok lain silakan mengisi rubrik penilaian di modul 08."',
    facilitatorChecklist: [
      'Tampilkan rancangan kelompok di layar utama.',
      'Gunakan rubrik: Relevansi, Kualitas Konteks, Integrasi Matematika, Penalaran, dan Asesmen.',
      'Berikan apresiasi dan ulasan konstruktif.',
    ],
  },
  reflection: {
    moduleId: 'reflection',
    moduleCode: 'MODUL 09',
    title: 'Dari Workshop Menuju Kelas',
    targetDuration: '10 Menit',
    facilitatorRole: 'Mengunci komitmen implementasi guru di kelas dan menutup workshop dengan penuh semangat.',
    pedagogicalKey: 'Transformasi pendidikan terjadi ketika guru berani mencoba 1 aktivitas numerasi kecil di kelas minggunya.',
    suggestedOpeningScript: '"Workshop berakhir, namun perjuangan numerasi baru saja dimulai. Tuliskan komitmen perubahan Anda!"',
    facilitatorChecklist: [
      'Pastikan setiap guru mengisi 4 pertanyaan refleksi.',
      'Cetak atau simpan Kartu Komitmen Guru Numerasi.',
      'Lakukan foto bersama di depan layar PID dengan menampilkan modul 09.',
    ],
  },
};
