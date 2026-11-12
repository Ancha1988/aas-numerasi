import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Sparkles, BookOpen, KeyRound, RefreshCw, Check } from 'lucide-react';

interface Modul02IceBreakingProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

interface NumberCard {
  number: number;
  label: string;
  examples: {
    Pendidikan: string;
    Kesehatan: string;
    Lingkungan: string;
    Ekonomi: string;
    'Kehidupan sosial': string;
  };
}

const NUMBER_CARDS: NumberCard[] = [
  {
    number: 30,
    label: 'Tiga Puluh',
    examples: {
      Pendidikan: 'Rasio maksimal 1 rombel 32 siswa (atau 30 siswa per kelas di SMP)',
      Kesehatan: '30 menit aktivitas fisik aerobik sedang per hari yang dianjurkan Kemenkes',
      Lingkungan: 'Target 30% Ruang Terbuka Hijau (RTH) kota atau konservasi pohon',
      Ekonomi: 'Diskon 30% saat pameran buku sekolah atau porsi tabungan dari uang saku',
      'Kehidupan sosial': '30 hari kalender dalam sebulan untuk jadwal ronda warga',
    },
  },
  {
    number: 60,
    label: 'Enam Puluh',
    examples: {
      Pendidikan: '60 menit durasi satu jam pelajaran (JP) atau batas KKM kelulusan awal',
      Kesehatan: '60 bpm denyut nadi istirahat yang sangat bugar bagi atlet pelajar',
      Lingkungan: '60 desibel batas kebisingan maksimum lingkungan belajar yang kondusif',
      Ekonomi: 'Porsi 60% anggaran operasional sekolah untuk sarana belajar murid',
      'Kehidupan sosial': 'Batas usia pensiun tenaga pendidik 60 tahun',
    },
  },
  {
    number: 80,
    label: 'Delapan Puluh',
    examples: {
      Pendidikan: 'Target nilai 80 untuk predikat capaian kompetensi sangat baik',
      Kesehatan: 'Tekanan darah diastolik normal 80 mmHg atau 80% hidrasi tubuh ideal',
      Lingkungan: 'Target reduksi 80% emisi karbon atau pemilahan sampah organik',
      Ekonomi: 'Rasio 80/20 (Prinsip Pareto) dalam efisiensi belanja kegiatan',
      'Kehidupan sosial': '80 siswa dari 100 siswa yang membawa kendaraan roda dua',
    },
  },
  {
    number: 100,
    label: 'Seratus',
    examples: {
      Pendidikan: 'Skor sempurna 100 pada penilaian sumatif atau persentase kehadiran 100%',
      Kesehatan: '100% bebas jentik nyamuk di toilet sekolah (Sekolah Sehat)',
      Lingkungan: '100 kg timbulan sampah per minggu di sebuah SMP berukuran sedang',
      Ekonomi: 'Nominal pecahan uang seratus rupiah atau kelipatan basis persentase',
      'Kehidupan sosial': 'Partisipasi 100 warga dalam kerja bakti RT membersihkan parit',
    },
  },
  {
    number: 250,
    label: 'Dua Ratus Lima Puluh',
    examples: {
      Pendidikan: '250 halaman ketebalan novel sastra yang dibaca dalam proyek literasi',
      Kesehatan: '250 ml volume standar satu gelas air putih untuk hidrasi harian',
      Lingkungan: '250 pohon bibit mahoni ditanam siswa saat peringatan Hari Bumi',
      Ekonomi: 'Rp 250.000 perkiraan biaya seragam batik khas sekolah',
      'Kehidupan sosial': 'Kapasitas 250 kursi aula sekolah saat pertemuan orang tua murid',
    },
  },
];

type ContextCategory = 'Pendidikan' | 'Kesehatan' | 'Lingkungan' | 'Ekonomi' | 'Kehidupan sosial';

export const Modul02IceBreaking: React.FC<Modul02IceBreakingProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
}) => {
  // Game state
  const [selectedNumber, setSelectedNumber] = useState<number | null>(80);
  const [selectedContext, setSelectedContext] = useState<ContextCategory>('Kehidupan sosial');
  const [userMeaningText, setUserMeaningText] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Case study state
  const [caseAns1, setCaseAns1] = useState<string>('');
  const [caseAns2, setCaseAns2] = useState<string>('');
  const [caseAns3, setCaseAns3] = useState<string>('');
  const [checkedCase, setCheckedCase] = useState<boolean>(false);

  const activeCard = NUMBER_CARDS.find((c) => c.number === selectedNumber) || NUMBER_CARDS[2];

  const handleSelectNumber = (num: number) => {
    setSelectedNumber(num);
    setUserMeaningText('');
  };

  const handleCheckCase = () => {
    setCheckedCase(true);
  };

  const isAns1Correct = caseAns1.trim() === '20' || caseAns1.trim().toLowerCase().includes('20');
  const isAns2Correct = caseAns2.trim() === '80' || caseAns2.trim().includes('80%') || caseAns2.trim() === '80%';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Module Title Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            MODUL 02 · ICE BREAKING & APERSEPSI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Tebak Angka, Temukan Makna
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-3xl leading-relaxed">
            Tujuan: Membangun suasana belajar yang menyenangkan dan menyadarkan peserta bahwa
            angka tidak pernah berdiri sendiri—angka senantiasa hidup dan bermakna dalam konteks kehidupan.
          </p>
        </div>

        {/* Action Controls - Large Touch Targets */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer active:scale-95"
          >
            <HelpCircle className="w-5 h-5 text-[#00848B]" />
            <span>{showInstructions ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
          </button>

          <button
            onClick={() => {
              const random = NUMBER_CARDS[Math.floor(Math.random() * NUMBER_CARDS.length)].number;
              setSelectedNumber(random);
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-teal-300 bg-teal-50 hover:bg-teal-100 text-xs sm:text-sm font-extrabold text-[#00848B] cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Acak Angka</span>
          </button>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer active:scale-95"
          >
            <KeyRound className="w-5 h-5" />
            <span>{showExplanation ? 'Tutup Pembahasan' : 'Lihat Pembahasan'}</span>
          </button>
        </div>
      </div>

      {/* Instructions Box */}
      {showInstructions && (
        <div className="bg-[#EFF5F8] p-6 rounded-3xl border-2 border-[#B8D5E5] space-y-3 animate-in fade-in duration-150">
          <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#19304E] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00848B]" />
            Petunjuk Aktivitas Permainan Interaktif (PID Touch Friendly)
          </h3>
          <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <li>Sentuh salah satu dari 5 kartu angka raksasa di bawah ini.</li>
            <li>Ajak audiens menebak: "Kira-kira angka ini mewakili fakta apa di lingkungan sekitar kita?"</li>
            <li>Pilih salah satu dari 5 domain konteks (Pendidikan, Kesehatan, Lingkungan, Ekonomi, Sosial).</li>
            <li>Ketikkan gagasan audiens di kolom jawaban atau cermati inspirasi makna kontekstualnya.</li>
            <li>Selesaikan tantangan studi kasus 100 siswa bermotor dan periksa hasilnya secara otomatis!</li>
          </ol>
        </div>
      )}

      {/* Part 1: Interactive Number Cards Deck */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
              BAGIAN 1: PERMAINAN SENTUH ANGKA DI PID
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
              "Angka ini bisa menggambarkan apa dalam kehidupan?"
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-600">
            Sentuh salah satu kartu angka di bawah:
          </span>
        </div>

        {/* 5 Giant Touch Cards (Ergonomic PID Target) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-5">
          {NUMBER_CARDS.map((item) => {
            const isSelected = selectedNumber === item.number;
            return (
              <button
                key={item.number}
                onClick={() => handleSelectNumber(item.number)}
                className={`p-6 sm:p-8 rounded-3xl border-2 text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center min-h-[160px] ${
                  isSelected
                    ? 'bg-[#19304E] text-white border-[#19304E] shadow-2xl scale-[1.03] ring-4 ring-[#00848B]/40 z-10'
                    : 'bg-[#EFF5F8] text-slate-800 border-[#B8D5E5] hover:border-[#00848B] hover:bg-white'
                }`}
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                  KARTU ANGKA
                </span>
                <div
                  className={`font-heading text-5xl sm:text-6xl font-extrabold tracking-tight ${
                    isSelected ? 'text-[#E6A637]' : 'text-[#19304E]'
                  }`}
                >
                  {item.number}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-400 mt-1 block">
                  {item.label}
                </span>

                {isSelected && (
                  <div className="absolute -top-3 -right-2 bg-[#00848B] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    Dipilih ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Context Selector & Meaning Viewer */}
        <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
                Eksplorasi Konteks Nyata untuk Angka {selectedNumber}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Pilih konteks untuk melihat contoh bagaimana angka {selectedNumber} memiliki implikasi nyata:
              </p>
            </div>

            {/* Context Pills - Larger Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs">
              {(['Pendidikan', 'Kesehatan', 'Lingkungan', 'Ekonomi', 'Kehidupan sosial'] as ContextCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedContext(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedContext === cat
                        ? 'bg-[#00848B] text-white shadow-md'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Reveal Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                CONTOH MAKNA DALAM KONTEKS: {selectedContext.toUpperCase()}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {activeCard.examples[selectedContext]}
              </p>
            </div>

            <div className="shrink-0 bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-300 text-xs sm:text-sm text-[#00848B] font-extrabold">
              Konteks: {selectedContext}
            </div>
          </div>

          {/* User Custom Meaning Input */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              Gagasan Peserta Workshop: Menurut Anda, apa makna lain dari angka {selectedNumber} ini?
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={userMeaningText}
                onChange={(e) => setUserMeaningText(e.target.value)}
                placeholder={`Contoh: Di sekolah saya, angka ${selectedNumber} adalah kapasitas ruang perpustakaan...`}
                className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
              {userMeaningText && (
                <div className="px-5 py-3 bg-emerald-50 text-emerald-800 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Tercatat di Papan</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Studi Kasus 100 Siswa & Sepeda Motor */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
            BAGIAN 2: STUDI KASUS KONTEKSTUAL SMP
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Kasus: Transportasi & Keselamatan Siswa
          </h2>
          <div className="mt-3 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-slate-900 text-sm sm:text-base leading-relaxed">
            <strong className="text-amber-950 block mb-1">Stimulus Data:</strong>
            "Berdasarkan survei kedisiplinan pagi hari di gerbang sekolah: Dari <strong>100 siswa</strong> yang disurvei, <strong>80 siswa</strong> menggunakan sepeda motor untuk pergi ke sekolah."
          </div>
        </div>

        {/* 3 Questions */}
        <div className="space-y-5">
          {/* Question 1 */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
              1. Berapa siswa yang TIDAK menggunakan sepeda motor?
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="number"
                value={caseAns1}
                onChange={(e) => setCaseAns1(e.target.value)}
                placeholder="Tuliskan jumlah..."
                className="w-48 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-base font-mono font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
              <span className="text-sm text-slate-600 font-bold">siswa</span>
              {checkedCase && (
                <span
                  className={`text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl ${
                    isAns1Correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isAns1Correct ? '✓ Tepat! (100 - 80 = 20 siswa)' : 'Belum tepat (Hitung: 100 - 80)'}
                </span>
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
              2. Berapa persentase pengguna sepeda motor dari total siswa?
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={caseAns2}
                onChange={(e) => setCaseAns2(e.target.value)}
                placeholder="Contoh: 80 atau 80%..."
                className="w-48 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-base font-mono font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
              <span className="text-sm text-slate-600 font-bold">%</span>
              {checkedCase && (
                <span
                  className={`text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl ${
                    isAns2Correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isAns2Correct ? '✓ Tepat! (80/100 × 100% = 80%)' : 'Belum tepat (80 dari 100 adalah 80%)'}
                </span>
              )}
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
              3. Informasi apa lagi yang diperlukan sekolah untuk mengambil keputusan terkait keselamatan siswa?
            </label>
            <textarea
              rows={2}
              value={caseAns3}
              onChange={(e) => setCaseAns3(e.target.value)}
              placeholder="Contoh: Usia siswa (apakah sudah 17 tahun/punya SIM?), kepemilikan helm SNI, jarak tempuh rumah ke sekolah, ketersediaan angkutan umum..."
              className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons to Check and Reveal */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCheckCase}
              className="px-6 py-3.5 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              Periksa Jawaban Otomatis
            </button>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300"
            >
              {showExplanation ? 'Sembunyikan Pembahasan' : 'Buka Kunci & Pembahasan Lengkap'}
            </button>
          </div>

          {checkedCase && isAns1Correct && isAns2Correct && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 font-extrabold bg-emerald-50 px-4 py-2.5 rounded-2xl border-2 border-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Luar biasa! Seluruh kalkulasi numerik terverifikasi benar.</span>
            </div>
          )}
        </div>

        {/* Detailed Explanation Drawer */}
        {showExplanation && (
          <div className="p-6 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-3 animate-in fade-in duration-150">
            <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
              <KeyRound className="w-5 h-5" />
              Pembahasan Pedagogis & Kunci Keputusan Sekolah
            </h4>
            <div className="text-xs sm:text-sm text-slate-800 space-y-2.5 leading-relaxed">
              <p>
                <strong>1. Pemahaman Eksplisit:</strong> 100 - 80 = <strong>20 siswa (20%)</strong> pergi ke sekolah dengan berjalan kaki, sepeda kayuh, diantar orang tua, atau naik angkutan umum.
              </p>
              <p>
                <strong>2. Penafsiran Rasio:</strong> <strong>80% siswa</strong> menggunakan kendaraan bermotor roda dua. Ini adalah proporsi mayoritas yang sangat tinggi di jenjang SMP.
              </p>
              <p>
                <strong>3. Penalaran Numerasi Tingkat Tinggi (Menalar):</strong> Mengapa angka 80% ini sangat krusial?
                Karena siswa SMP berusia rata-rata 12–15 tahun (belum memenuhi syarat kepemilikan SIM C usia 17 tahun menurut UU Lalu Lintas).
                Sekolah tidak cukup hanya tahu "80 siswa", tetapi harus mengumpulkan data pelengkap:
                <span className="block mt-2 pl-4 border-l-4 border-[#00848B] text-slate-900 font-medium">
                  • Berapa jarak rata-rata rumah siswa ke sekolah? <br />
                  • Apakah jalur yang dilewati adalah jalan raya provinsi rawan truk besar? <br />
                  • Apakah ada angkutan perintis atau bus sekolah gratis yang bisa diadvokasikan ke Pemda?
                </span>
                <em>Inilah esensi numerasi: Angka digunakan untuk melindungi nyawa dan mengambil kebijakan pendidikan!</em>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 01</span>
        </button>

        <div className="flex items-center gap-3.5">
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Modul 02 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 03: Brainstorming</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
