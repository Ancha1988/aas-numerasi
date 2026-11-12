import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Layers, BrainCircuit, Compass, Check, Sparkles, Move, Link2 } from 'lucide-react';
import { DragDropCategorizer } from '../interactive/DragDropCategorizer';
import { ConceptMatcher } from '../interactive/ConceptMatcher';
import { Storage } from '../../utils/storage';

interface Modul05LearningHubProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pernyataan mana yang PALING TEPAT membedakan antara keterampilan berhitung murni dan numerasi?',
    options: [
      'Berhitung menggunakan angka kecil, sedangkan numerasi selalu melibatkan angka miliaran.',
      'Berhitung fokus pada ketepatan prosedur/rumus, sedangkan numerasi fokus pada penerapan nalar matematika dalam konteks kehidupan nyata.',
      'Berhitung hanya diajarkan di SD, sedangkan numerasi hanya ada di jenjang SMP.',
      'Numerasi hanya dapat dipelajari oleh siswa yang berbakat di mata pelajaran matematika.',
    ],
    correctIndex: 1,
    explanation: 'Numerasi adalah kemampuan mengaplikasikan konsep matematis untuk memecahkan masalah praktis sehari-hari, bukan sekadar ketepatan operasi aritmetika mekanis tanpa konteks.',
  },
  {
    id: 2,
    question: 'Guru IPA mengajak siswa mengukur volume air wudhu yang terbuang dan merancang bak penampungan berskala. Konteks numerasi apa yang sedang dikembangkan?',
    options: [
      'Konteks Personal murni',
      'Konteks Saintifik dan Lingkungan (Sosial Budaya)',
      'Konteks Aljabar Abstrak',
      'Konteks Dekontekstual',
    ],
    correctIndex: 1,
    explanation: 'Aktivitas audit air dan konservasi lingkungan sekolah melibatkan penyelidikan ilmiah (saintifik) serta tanggung jawab sosial budaya di lingkungan sekolah.',
  },
  {
    id: 3,
    question: 'Manakah dari 3 proses kognitif AKM yang berada pada level tertinggi (HOTS)?',
    options: [
      'Memahami (Knowing) fakta dan definisi',
      'Menerapkan (Applying) rumus standar',
      'Menalar (Reasoning) menganalisis, mengevaluasi, dan menyimpulkan implikasi data',
      'Mengingat (Remembering) tabel perkalian',
    ],
    correctIndex: 2,
    explanation: 'Level Menalar (Reasoning) menuntut siswa untuk menganalisis variabel yang tidak lengkap, menghubungkan bukti data dengan kebijakan, dan mengevaluasi alternatif solusi.',
  },
  {
    id: 4,
    question: 'Mengapa guru mata pelajaran Bahasa Indonesia tetap memiliki peran krusial dalam penguatan numerasi?',
    options: [
      'Karena guru bahasa wajib mengajar rumus persamaan kuadrat di kelas.',
      'Karena teks eksposisi, persuasi, dan laporan investigasi membutuhkan kemampuan membaca grafik dan menyajikan data numerik sebagai bukti argumen.',
      'Karena guru bahasa harus menggantikan guru matematika yang sedang cuti.',
      'Guru bahasa sebenarnya tidak memiliki kaitan apapun dengan numerasi.',
    ],
    correctIndex: 1,
    explanation: 'Dalam teks faktual dan persuasif, angka statistik berfungsi sebagai bukti valid (evidence-based argumentation) untuk meyakinkan pembaca.',
  },
  {
    id: 5,
    question: 'Seorang guru menyajikan tabel data pengeluaran kas OSIS dan meminta siswa mengusulkan penghematan untuk piala turnamen. Aktivitas ini menyentuh komponen:',
    options: [
      'Hanya konten Geometri murni',
      'Konten Bilangan/Persentase, Konteks Sosial Budaya, dan Proses Menalar',
      'Hanya hafalan definisi organisasi',
      'Operasi hitung kalkulator tanpa tujuan',
    ],
    correctIndex: 1,
    explanation: 'Tugas tersebut mengintegrasikan konten persentase, konteks kehidupan sosial sekolah, dan menuntut penalaran siswa untuk memprioritaskan anggaran.',
  },
];

export const Modul05LearningHub: React.FC<Modul05LearningHubProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'pengertian' | 'komponen' | 'versus' | 'kehidupan' | 'kuis' | 'dragdrop' | 'matching'>('pengertian');
  const [selectedPillar, setSelectedPillar] = useState<'konten' | 'konteks' | 'kognitif'>('konten');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>(() => {
    return Storage.getQuizResult().answers || {};
  });
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(() => {
    return Storage.getQuizResult().submitted ?? false;
  });

  const handleSelectQuizAnswer = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => {
      const next = { ...prev, [qId]: optIdx };
      return next;
    });
  };

  const calculateScore = (answers = quizAnswers) => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
          <BookOpen className="w-4 h-4 text-[#E6A637]" />
          MODUL 05 · RUANG PENGETAHUAN ESENSIAL & LABORATORIUM INTERAKTIF
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
          Memahami Hakikat Numerasi & Laboratorium Konsep
        </h1>
        <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-3xl leading-relaxed">
          Tujuan: Menguasai landasan konseptual numerasi, 3 pilar utama AKM (Konten, Konteks, Proses Kognitif),
          menguji pemahaman lewat aktivitas drag-and-drop, mencocokkan konsep, serta kuis diagnostik interaktif.
        </p>

        {/* Tab Switcher - Large Touch Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-5 border-t border-slate-200">
          <button
            onClick={() => setActiveTab('pengertian')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'pengertian'
                ? 'bg-[#19304E] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            1. Pengertian Numerasi
          </button>
          <button
            onClick={() => setActiveTab('komponen')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'komponen'
                ? 'bg-[#19304E] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            2. Tiga Komponen Numerasi
          </button>
          <button
            onClick={() => setActiveTab('versus')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'versus'
                ? 'bg-[#19304E] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            3. Berhitung vs Numerasi
          </button>
          <button
            onClick={() => setActiveTab('kehidupan')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'kehidupan'
                ? 'bg-[#19304E] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            4. Numerasi dalam Kehidupan
          </button>
          <button
            onClick={() => setActiveTab('dragdrop')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'dragdrop'
                ? 'bg-[#00848B] text-white shadow-md'
                : 'bg-teal-50 text-teal-900 border-2 border-teal-300 hover:bg-teal-100'
            }`}
          >
            <Move className="w-4 h-4 text-[#E6A637]" />
            <span>5. Drag & Drop Domain AKM</span>
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-[#00848B] text-white shadow-md'
                : 'bg-teal-50 text-teal-900 border-2 border-teal-300 hover:bg-teal-100'
            }`}
          >
            <Link2 className="w-4 h-4 text-[#E6A637]" />
            <span>6. Mencocokkan Konsep</span>
          </button>
          <button
            onClick={() => setActiveTab('kuis')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'kuis'
                ? 'bg-[#E6A637] text-[#19304E] shadow-md font-black'
                : 'bg-amber-100 text-amber-950 border-2 border-amber-300 hover:bg-amber-200'
            }`}
          >
            7. Kuis Diagnostik (5 Soal)
          </button>
        </div>
      </div>

      {/* Tab 1: Pengertian Numerasi */}
      {activeTab === 'pengertian' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              MATERI 1: DEFINISI & PARADIGMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-1">
              Apa Sesungguhnya Hakikat Numerasi?
            </h2>
          </div>

          {/* Definition Callout Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#EFF5F8] to-[#E2EDF3] border-2 border-[#B8D5E5] space-y-3.5 shadow-sm">
            <p className="text-lg sm:text-xl font-bold text-[#19304E] leading-relaxed">
              "Numerasi adalah kemampuan, kepercayaan diri, dan kecakapan seseorang untuk
              menggunakan <strong>konsep, prosedur, fakta, dan alat matematika</strong> guna
              menjelaskan kejadian, menyelesaikan permasalahan kontekstual, dan mengambil
              <strong> keputusan yang tepat</strong> dalam berbagai dimensi kehidupan bermasyarakat."
            </p>
            <div className="text-xs sm:text-sm text-slate-600 font-mono font-bold">
              — Rujukan Standar Asesmen Nasional (Kemendikbudristek) & OECD PISA Mathematics Framework
            </div>
          </div>

          {/* Contrast Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="p-6 sm:p-7 rounded-3xl border-2 border-rose-300 bg-rose-50/70 space-y-3">
              <span className="text-xs sm:text-sm font-extrabold text-rose-900 uppercase tracking-wide block">
                ❌ BUKAN SEKADAR BERHITUNG (MISKONSEPSI UMUM)
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                <li>• Menghafal rumus luas tanpa tahu mengapa rumus itu bekerja.</li>
                <li>• Kecepatan menyelesaikan puluhan soal perkalian angka abstrak di kertas.</li>
                <li>• Monopoli pelajaran matematika yang berhenti di ruang kelas.</li>
                <li>• Menganggap siswa yang lambat berhitung tidak memiliki kemampuan bernalar.</li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl border-2 border-emerald-300 bg-emerald-50/70 space-y-3">
              <span className="text-xs sm:text-sm font-extrabold text-emerald-900 uppercase tracking-wide block">
                ✓ INILAH NUMERASI SEJATI (ESENSI PENDIDIKAN)
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                <li>• Mampu membaca grafik nutrisi makanan di kantin sekolah.</li>
                <li>• Menafsirkan tren kepadatan penduduk di mapel IPS untuk tata ruang.</li>
                <li>• Menggunakan data sampah plastik sebagai bukti teks persuasi Bahasa Indonesia.</li>
                <li>• Menghitung rasio denyut nadi sebelum dan sesudah olahraga di PJOK.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Komponen Numerasi */}
      {activeTab === 'komponen' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              MATERI 2: 3 PILAR AKM NUMERASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-1">
              Komponen Pembentuk Soal & Aktivitas Numerasi
            </h2>
            <p className="text-xs sm:text-base text-slate-700 mt-1">
              Sentuh salah satu kartu di bawah ini untuk melihat rincian dan penerapannya di jenjang SMP:
            </p>
          </div>

          {/* 3 Interactive Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card A: Konten Matematika */}
            <button
              onClick={() => setSelectedPillar('konten')}
              className={`p-7 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[180px] ${
                selectedPillar === 'konten'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-xl scale-[1.02] ring-4 ring-[#00848B]/40'
                  : 'bg-[#EFF5F8] text-slate-800 border-[#B8D5E5] hover:bg-white'
              }`}
            >
              <div>
                <span className={`text-xs font-extrabold uppercase tracking-widest block mb-2 ${
                  selectedPillar === 'konten' ? 'text-[#E6A637]' : 'text-[#00848B]'
                }`}>
                  PILAR A
                </span>
                <h3 className="font-heading text-xl font-extrabold">KONTEN MATEMATIKA</h3>
                <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                  selectedPillar === 'konten' ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Domain matematika yang digunakan sebagai alat analisis.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 text-xs sm:text-sm font-bold">
                Bilangan, Aljabar, Geometri, Data.
              </div>
            </button>

            {/* Card B: Konteks */}
            <button
              onClick={() => setSelectedPillar('konteks')}
              className={`p-7 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[180px] ${
                selectedPillar === 'konteks'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-xl scale-[1.02] ring-4 ring-[#00848B]/40'
                  : 'bg-[#EFF5F8] text-slate-800 border-[#B8D5E5] hover:bg-white'
              }`}
            >
              <div>
                <span className={`text-xs font-extrabold uppercase tracking-widest block mb-2 ${
                  selectedPillar === 'konteks' ? 'text-[#E6A637]' : 'text-[#00848B]'
                }`}>
                  PILAR B
                </span>
                <h3 className="font-heading text-xl font-extrabold">KONTEKS PERMASALAHAN</h3>
                <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                  selectedPillar === 'konteks' ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Latar situasi nyata di mana angka itu hidup dan relevan.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 text-xs sm:text-sm font-bold">
                Personal, Sosial Budaya, Saintifik, Pekerjaan.
              </div>
            </button>

            {/* Card C: Proses Kognitif */}
            <button
              onClick={() => setSelectedPillar('kognitif')}
              className={`p-7 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[180px] ${
                selectedPillar === 'kognitif'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-xl scale-[1.02] ring-4 ring-[#00848B]/40'
                  : 'bg-[#EFF5F8] text-slate-800 border-[#B8D5E5] hover:bg-white'
              }`}
            >
              <div>
                <span className={`text-xs font-extrabold uppercase tracking-widest block mb-2 ${
                  selectedPillar === 'kognitif' ? 'text-[#E6A637]' : 'text-[#00848B]'
                }`}>
                  PILAR C
                </span>
                <h3 className="font-heading text-xl font-extrabold">PROSES KOGNITIF</h3>
                <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                  selectedPillar === 'kognitif' ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Aktivitas mental nalar yang digerakkan pada diri peserta didik.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 text-xs sm:text-sm font-bold">
                Memahami, Menerapkan, Menalar.
              </div>
            </button>
          </div>

          {/* Details for Selected Pillar */}
          <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border-2 border-slate-200">
            {selectedPillar === 'konten' && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm sm:text-base text-[#19304E] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#00848B]" />
                  4 Domain Konten Matematika Jenjang SMP:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">1. Bilangan (Number):</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Representasi bilangan bulat, pecahan, desimal, persentase, rasio, serta operasi hitung aplikatif.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">2. Aljabar (Algebra):</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Persamaan linear sederhana, pola barisan, relasi dan fungsi, substitusi rumus kecepatan/debit.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">3. Geometri & Pengukuran:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Perbandingan skala denah, keliling, luas permukaan, volume wadah, dan transformasi simetri batik.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">4. Data & Ketidakpastian:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Membaca diagram batang, lingkaran, garis tren waktu, nilai rata-rata, peluang cuaca dan risiko.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPillar === 'konteks' && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm sm:text-base text-[#19304E] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#00848B]" />
                  4 Domain Konteks Kehidupan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">1. Personal:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Kesehatan tubuh sendiri, denyut nadi, pengelolaan uang jajan, jadwal waktu harian, kebiasaan belanja.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">2. Sosial Budaya:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Masalah sampah sekolah, ornamen ragam hias daerah, pemilu OSIS, tradisi gotong royong, fasilitas umum.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">3. Saintifik:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Fenomena alam, perubahan iklim, laju tetesan kran bocor, fotosintesis, orbit tata surya, sensor IoT.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <strong className="text-[#19304E] block mb-1 text-sm font-extrabold">4. Pekerjaan:</strong>
                    <p className="text-slate-700 leading-relaxed font-medium">Arsitektur tata ruang, penganggaran kas bendahara, analisis data spreadsheet, logistik pengiriman.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPillar === 'kognitif' && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm sm:text-base text-[#19304E] flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#00848B]" />
                  3 Tingkat Proses Kognitif Siswa:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <span className="font-mono text-[#00848B] font-extrabold block mb-1">LEVEL 1: MEMAHAMI (KNOWING)</span>
                    <p className="text-slate-700 leading-relaxed font-medium">Mengenali fakta, membaca nilai eksplisit tabel secara langsung tanpa kalkulasi kompleks.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <span className="font-mono text-[#E6A637] font-extrabold block mb-1">LEVEL 2: MENERAPKAN (APPLYING)</span>
                    <p className="text-slate-700 leading-relaxed font-medium">Memilih dan menggunakan operasi hitung yang sesuai untuk menghitung selisih, persentase, atau rasio.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
                    <span className="font-mono text-rose-600 font-extrabold block mb-1">LEVEL 3: MENALAR (REASONING)</span>
                    <p className="text-slate-700 leading-relaxed font-medium">Menganalisis data, memproyeksikan tren, mengevaluasi validitas, dan mengambil keputusan strategis.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Berhitung vs Numerasi */}
      {activeTab === 'versus' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              MATERI 3: KOMPARASI KONTRASTIF
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-1">
              Studi Perbandingan: Soal A vs Soal B
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Soal A */}
            <div className="p-7 rounded-3xl border-2 border-slate-300 bg-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-3">
                  CONTOH SOAL A (BERHITUNG MURNI / DEKONTEKSTUAL)
                </span>
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-300 mb-4 font-mono text-xl font-bold text-slate-900 text-center shadow-xs">
                  "Hitunglah 25% dari 200!"
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>• <strong>Karakteristik:</strong> Angka berdiri sendiri tanpa subjek, lokasi, atau tujuan.</p>
                  <p>• <strong>Respon Siswa:</strong> Siswa hanya mengingat algoritma mekanik: (25/100) × 200 = 50.</p>
                  <p>• <strong>Dampak Pembelajaran:</strong> Setelah selesai dihitung, siswa tidak tahu apa gunanya angka 50 tersebut bagi kehidupannya.</p>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-slate-300 text-xs sm:text-sm text-slate-600 font-extrabold">
                Dominan Level Kognitif: Memahami / Prosedural Teknis
              </div>
            </div>

            {/* Soal B */}
            <div className="p-7 rounded-3xl border-2 border-teal-300 bg-teal-50/70 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B] block mb-3">
                  CONTOH SOAL B (NUMERASI KONTEKSTUAL & MENALAR)
                </span>
                <div className="bg-white p-6 rounded-2xl border-2 border-teal-300 mb-4 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed shadow-xs">
                  "Sebuah sekolah memiliki <strong>200 siswa</strong>. Berdasarkan survei awal Adiwiyata, sebanyak <strong>25% siswa</strong> belum membawa botol minum sendiri dan masih membeli kemasan plastik sekali pakai. <br /><br />
                  1. Berapa siswa yang menjadi sasaran awal program tumblerisasi? <br />
                  2. Informasi apa lagi yang diperlukan sekolah untuk merancang program tersebut agar berjalan sukses?"
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <p>• <strong>Karakteristik:</strong> Ada konteks lingkungan sekolah, tujuan moral, dan dampak nyata.</p>
                  <p>• <strong>Respon Siswa:</strong> Selain menghitung 50 siswa, siswa tertantang memikirkan: "Apakah di sekolah ada dispenser air gratis? Berapa kapasitas galon yang harus disediakan setiap hari?"</p>
                  <p>• <strong>Dampak Pembelajaran:</strong> Siswa melihat matematika sebagai lensa untuk menyelesaikan krisis sampah di sekolahnya.</p>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-teal-300 text-xs sm:text-sm text-[#00848B] font-extrabold">
                Mencakup 3 Level: Memahami → Menerapkan → Menalar Solusi
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Numerasi dalam Kehidupan */}
      {activeTab === 'kehidupan' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              MATERI 4: SPEKTRUM SEHARI-HARI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-1">
              Contoh Nyata Numerasi di 6 Sektor Kehidupan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">1. Belanja & Konsumsi</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Membandingkan harga per gram antara kemasan hemat 500g vs kemasan 200g, serta menghitung diskon bertingkat (50% + 20%).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">2. Transportasi & Perjalanan</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Menghitung estimasi waktu tiba (ETA) berdasarkan kecepatan rata-rata jalan raya, tarif bensin per kilometer, dan jam berangkat.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">3. Kesehatan & Kebugaran</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Menghitung indeks massa tubuh (IMT), membaca takaran dosis sirup obat berdasarkan berat badan anak, dan denyut nadi aerobik.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">4. Lingkungan & Konservasi</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Audit konsumsi listrik kWh peralatan rumah tangga, menghitung pengurangan jejak karbon, dan debit penghematan air wudhu.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">5. Pendidikan & Asesmen</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Membaca grafik Rapor Pendidikan sekolah, interpretasi distribusi skor tes siswa, dan alokasi waktu JP per semester.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-2">
              <span className="font-heading font-extrabold text-base text-[#19304E] block">6. Ekonomi Keluarga</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Menyusun pos anggaran 50/30/20 (kebutuhan/keinginan/tabungan), menghitung bunga cicilan kredit riil, dan dana darurat.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Drag & Drop Domain AKM */}
      {activeTab === 'dragdrop' && <DragDropCategorizer />}

      {/* Tab 6: Concept Matcher */}
      {activeTab === 'matching' && <ConceptMatcher />}

      {/* Tab 7: Kuis Pemahaman */}
      {activeTab === 'kuis' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                KUIS DIAGNOSTIK PEMAHAMAN (5 BUTIR SOAL)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
                Uji Pemahaman Hakikat Numerasi Guru SMP
              </h2>
            </div>

            {quizSubmitted && (
              <div className="px-5 py-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-sm font-extrabold">
                Skor Anda: {calculateScore()} / {QUIZ_QUESTIONS.length} ({Math.round((calculateScore() / QUIZ_QUESTIONS.length) * 100)}%)
              </div>
            )}
          </div>

          {/* Questions list */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-6 sm:p-7 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-extrabold text-xs sm:text-sm text-[#00848B]">
                      SOAL #{idx + 1}
                    </span>
                    {quizSubmitted && (
                      <span className={`text-xs sm:text-sm font-extrabold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isCorrect ? '✓ Jawaban Tepat' : '✗ Perlu Ditinjau'}
                      </span>
                    )}
                  </div>

                  <p className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {q.question}
                  </p>

                  {/* Options - Large Rows */}
                  <div className="space-y-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100';

                      if (isSelected) {
                        btnStyle = 'bg-[#19304E] text-white border-2 border-[#19304E] shadow-md';
                      }

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-600 text-white border-2 border-emerald-700';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-2 border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3.5 ${btnStyle}`}
                        >
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Diagnostic Explanation */}
                  {quizSubmitted && (
                    <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                      <strong className="text-[#00848B] block mb-1 font-extrabold">Penjelasan Pedagogis:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Quiz Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                setQuizSubmitted(true);
                const score = calculateScore();
                Storage.setQuizResult({
                  score,
                  totalQuestions: QUIZ_QUESTIONS.length,
                  percentage: Math.round((score / QUIZ_QUESTIONS.length) * 100),
                  answers: quizAnswers,
                  submitted: true,
                  completedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                });
              }}
              className="px-8 py-4 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              Kirim & Periksa Kuis
            </button>

            {quizSubmitted && (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                  Storage.setQuizResult({
                    score: 0,
                    totalQuestions: QUIZ_QUESTIONS.length,
                    percentage: 0,
                    answers: {},
                    submitted: false,
                  });
                }}
                className="px-6 py-4 border-2 border-slate-300 text-slate-800 hover:bg-slate-100 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
              >
                Ulangi Kuis
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 04</span>
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
            <span>{isCompleted ? 'Modul 05 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 06: Cross Subject Lab</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
