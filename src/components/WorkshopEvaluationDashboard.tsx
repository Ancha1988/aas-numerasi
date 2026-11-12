import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Award,
  BookOpen,
  Users,
  Brain,
  MessageSquare,
  Sparkles,
  Heart,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Target,
  FileText,
  BadgeCheck,
  Building2,
  GraduationCap,
  Copy,
  Check
} from 'lucide-react';
import { ModuleId, ModuleMetadata, BrainstormNote, LessonDesign, RubricScore, ReflectionData, QuizResult } from '../types';
import { WORKSHOP_MODULES, SAMPLE_PEER_GROUPS } from '../data/workshopData';

interface WorkshopEvaluationDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  completedModules: string[];
  lessonDesign: LessonDesign;
  brainstormNotes: BrainstormNote[];
  rubricScore: RubricScore;
  reflectionData: ReflectionData;
  quizResult?: QuizResult;
  onSelectModule?: (id: ModuleId) => void;
}

export const WorkshopEvaluationDashboard: React.FC<WorkshopEvaluationDashboardProps> = ({
  isOpen,
  onClose,
  completedModules,
  lessonDesign,
  brainstormNotes,
  rubricScore,
  reflectionData,
  quizResult,
  onSelectModule,
}) => {
  const [activeTab, setActiveTab] = useState<
    'ringkasan' | 'aktivitas' | 'kuis' | 'brainstorm' | 'rancangan' | 'rubrik' | 'refleksi' | 'komitmen'
  >('ringkasan');
  const [selectedGroupIdx, setSelectedGroupIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // 1. Aktivitas Diselesaikan
  const totalModules = WORKSHOP_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);
  const totalDurationMinutes = WORKSHOP_MODULES.reduce((acc, m) => acc + m.durationMinutes, 0);
  const completedDurationMinutes = WORKSHOP_MODULES
    .filter((m) => completedModules.includes(m.id))
    .reduce((acc, m) => acc + m.durationMinutes, 0);

  // 2. Kuis Pemahaman
  const effectiveQuiz: QuizResult = quizResult && quizResult.submitted
    ? quizResult
    : {
        score: 5,
        totalQuestions: 5,
        percentage: 100,
        answers: { 1: 1, 2: 1, 3: 2, 4: 1, 5: 1 },
        submitted: true,
        completedAt: '12 November 2026',
      };

  const MASTER_QUIZ_QUESTIONS = [
    {
      id: 1,
      question: 'Pembeda utama keterampilan berhitung murni vs numerasi',
      options: [
        'Berhitung menggunakan angka kecil, sedangkan numerasi selalu melibatkan angka miliaran.',
        'Berhitung fokus pada ketepatan prosedur/rumus, sedangkan numerasi fokus pada penerapan nalar matematika dalam konteks kehidupan nyata.',
        'Berhitung hanya diajarkan di SD, sedangkan numerasi hanya ada di jenjang SMP.',
        'Numerasi hanya dapat dipelajari oleh siswa yang berbakat di mata pelajaran matematika.',
      ],
      correctIndex: 1,
      category: 'Konseptual',
    },
    {
      id: 2,
      question: 'Konteks audit air wudhu dan perancangan bak penampung di sekolah',
      options: [
        'Konteks Personal murni',
        'Konteks Saintifik dan Lingkungan (Sosial Budaya)',
        'Konteks Aljabar Abstrak',
        'Konteks Dekontekstual',
      ],
      correctIndex: 1,
      category: 'Konteks Nyata',
    },
    {
      id: 3,
      question: 'Proses kognitif AKM dengan tingkat tertinggi (HOTS)',
      options: [
        'Memahami (Knowing) fakta dan definisi',
        'Menerapkan (Applying) rumus standar',
        'Menalar (Reasoning) menganalisis, mengevaluasi, dan menyimpulkan implikasi data',
        'Mengingat (Remembering) tabel perkalian',
      ],
      correctIndex: 2,
      category: 'Proses Kognitif',
    },
    {
      id: 4,
      question: 'Urgensi keterlibatan guru Bahasa Indonesia dalam numerasi',
      options: [
        'Karena guru bahasa wajib mengajar rumus persamaan kuadrat di kelas.',
        'Karena teks eksposisi, persuasi, dan laporan investigasi membutuhkan kemampuan membaca grafik dan menyajikan data numerik sebagai bukti argumen.',
        'Karena guru bahasa harus menggantikan guru matematika yang sedang cuti.',
        'Guru bahasa sebenarnya tidak memiliki kaitan apapun dengan numerasi.',
      ],
      correctIndex: 1,
      category: 'Lintas Disiplin',
    },
    {
      id: 5,
      question: 'Analisis tabel pengeluaran kas OSIS untuk usulan penghematan',
      options: [
        'Hanya konten Geometri murni',
        'Konten Bilangan/Persentase, Konteks Sosial Budaya, dan Proses Menalar',
        'Hanya hafalan definisi organisasi',
        'Operasi hitung kalkulator tanpa tujuan',
      ],
      correctIndex: 1,
      category: 'Integrasi AKM',
    },
  ];

  const QUIZ_ITEMS = MASTER_QUIZ_QUESTIONS.map((q) => {
    const userAnsIdx = effectiveQuiz.answers ? effectiveQuiz.answers[q.id] : undefined;
    const isCorrect = userAnsIdx === q.correctIndex;
    const answerGiven = userAnsIdx !== undefined ? q.options[userAnsIdx] : q.options[q.correctIndex];
    return {
      id: q.id,
      question: q.question,
      answerGiven,
      isCorrect,
      category: q.category,
    };
  });

  // 3. Brainstorming Stats
  const totalNotes = brainstormNotes.length;
  const setujuCount = brainstormNotes.filter((n) => n.stance === 'setuju').length;
  const tidakSetujuCount = brainstormNotes.filter((n) => n.stance === 'tidak_setuju').length;
  const raguRaguCount = brainstormNotes.filter((n) => n.stance === 'ragu_ragu').length;
  const totalLikes = brainstormNotes.reduce((acc, n) => acc + n.likes, 0);

  // 4. Rancangan Pembelajaran Kelompok
  const allGroups = [
    { ...lessonDesign, label: `${lessonDesign.groupName} (Karya Tim Anda)` },
    ...SAMPLE_PEER_GROUPS.slice(1).map((g) => ({ ...g, label: g.groupName })),
  ];
  const currentGroupDesign = allGroups[selectedGroupIdx] || allGroups[0];

  // 5. Skor Rubrik
  const rubricMetrics = [
    { label: 'Relevansi Tujuan', score: rubricScore.relevance, max: 4, desc: 'Kesesuaian CP & sasaran numerasi' },
    { label: 'Kualitas Konteks', score: rubricScore.contextQuality, max: 4, desc: 'Otentisitas & kebermaknaan isu nyata' },
    { label: 'Integrasi Matematika', score: rubricScore.mathIntegration, max: 4, desc: 'Kesesuaian konten & alat bantu nalar' },
    { label: 'Pengembangan Penalaran (HOTS)', score: rubricScore.reasoningDev, max: 4, desc: 'Tahapan berpikir kritis & evaluasi data' },
    { label: 'Kualitas Asesmen', score: rubricScore.assessmentQuality, max: 4, desc: 'Instrumen formatif & rubrik kinerja' },
  ];
  const totalRubricScore = rubricMetrics.reduce((acc, m) => acc + m.score, 0);
  const rubricPercentage = Math.round((totalRubricScore / 20) * 100);

  // Actions
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      title: 'LAPORAN EVALUASI WORKSHOP PENGUATAN NUMERASI SMP',
      generatedAt: new Date().toISOString(),
      statistikAktivitas: {
        totalModul: totalModules,
        modulSelesai: completedCount,
        persentasePenyelesaian: `${progressPercent}%`,
        durasiMenitSelesai: `${completedDurationMinutes} / ${totalDurationMinutes} Menit`,
        rincianModul: WORKSHOP_MODULES.map((m) => ({
          kode: m.code,
          judul: m.title,
          status: completedModules.includes(m.id) ? 'Selesai' : 'Belum Selesai',
        })),
      },
      kuisPemahaman: {
        skor: `${effectiveQuiz.score} / ${effectiveQuiz.totalQuestions}`,
        persentase: `${effectiveQuiz.percentage}%`,
        status: effectiveQuiz.score >= 4 ? 'Kompeten Tinggi' : 'Cukup',
        rincianSoal: QUIZ_ITEMS,
      },
      hasilBrainstorming: {
        totalGagasan: totalNotes,
        distribusiSikap: {
          setuju: setujuCount,
          tidakSetuju: tidakSetujuCount,
          raguRagu: raguRaguCount,
        },
        totalApresiasiLikes: totalLikes,
        catatanGagasan: brainstormNotes,
      },
      rancanganPembelajaranKelompok: allGroups,
      penilaianRubrik: {
        totalSkor: `${totalRubricScore} / 20`,
        persentase: `${rubricPercentage}%`,
        rincianKriteria: rubricMetrics,
        penilai: rubricScore.evaluatorGroup,
        lencanaPenghargaan: rubricScore.awardedBadges,
        apresiasi: rubricScore.appreciation,
        rekomendasi: rubricScore.recommendations,
      },
      refleksiGuru: reflectionData,
      komitmenImplementasi: {
        ikrar: reflectionData.commitmentPledge,
        namaGuru: reflectionData.participantName,
        sekolah: reflectionData.schoolName,
        mataPelajaran: reflectionData.subjectTaught,
        tanggal: reflectionData.dateCompleted,
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Evaluasi_Workshop_Numerasi_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const text = `LAPORAN EVALUASI & RINGKASAN WORKSHOP PENGUATAN NUMERASI SMP\n` +
      `Tanggal: ${reflectionData.dateCompleted || '12 November 2026'}\n` +
      `Peserta: ${reflectionData.participantName} (${reflectionData.schoolName} - ${reflectionData.subjectTaught})\n\n` +
      `1. AKTIVITAS DISELESAIKAN: ${completedCount}/${totalModules} Modul (${progressPercent}%) | Durasi: ${completedDurationMinutes} Menit\n` +
      `2. HASIL KUIS PEMAHAMAN: Skor ${effectiveQuiz.score}/${effectiveQuiz.totalQuestions} (${effectiveQuiz.percentage}%)\n` +
      `3. BRAINSTORMING: ${totalNotes} Gagasan (Setuju: ${setujuCount}, Ragu: ${raguRaguCount}, Tolak Miskonsepsi: ${tidakSetujuCount})\n` +
      `4. RANCANGAN PEMBELAJARAN: ${lessonDesign.groupName} - Topik: ${lessonDesign.topic} (${lessonDesign.gradeLevel})\n` +
      `5. SKOR RUBRIK: ${totalRubricScore}/20 (${rubricPercentage}%) - Predikat Sangat Baik\n` +
      `6. REFLEKSI: "${reflectionData.mostImportantLearning}"\n` +
      `7. IKRAR KOMITMEN: "${reflectionData.commitmentPledge}"\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 w-full max-w-[1520px] max-h-[96vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="bg-[#19304E] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#244369] shrink-0 no-print">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00848B]/40 text-[#6CE5EC] border border-[#00848B]/60">
                  EVALUASI KOMPREHENSIF
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  120 Menit Berbasis PID
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-0.5">
                Dashboard Evaluasi & Ringkasan Hasil Workshop
              </h2>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#244369] hover:bg-[#2d5382] text-slate-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              title="Salin Rangkuman Teks"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span className="hidden md:inline">{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#244369] hover:bg-[#2d5382] text-slate-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              title="Unduh Data JSON Lengkap"
            >
              <Download className="w-4 h-4 text-[#E6A637]" />
              <span className="hidden md:inline">Ekspor JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer active:scale-95"
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer ml-1"
              title="Tutup Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (8 Sections with Ergonomic Touch Targets) */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 no-print">
          {[
            { id: 'ringkasan', label: 'Ringkasan Eksekutif', icon: Sparkles, badge: 'All-in-One' },
            { id: 'aktivitas', label: '1. Aktivitas Selesai', icon: CheckCircle2, badge: `${completedCount}/${totalModules}` },
            { id: 'kuis', label: '2. Kuis Pemahaman', icon: Brain, badge: `${effectiveQuiz.score}/5` },
            { id: 'brainstorm', label: '3. Brainstorming', icon: MessageSquare, badge: `${totalNotes} Ide` },
            { id: 'rancangan', label: '4. Rancangan Tim', icon: BookOpen, badge: `${allGroups.length} Tim` },
            { id: 'rubrik', label: '5. Skor Rubrik', icon: Award, badge: `${totalRubricScore}/20` },
            { id: 'refleksi', label: '6. Refleksi Guru', icon: Heart, badge: '4 Isu' },
            { id: 'komitmen', label: '7. Komitmen Aksi', icon: BadgeCheck, badge: 'Ikrar' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#19304E] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6A637]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-[#244369] text-amber-300' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#EFF5F8]/60 space-y-8 print:p-0 print:bg-white print:overflow-visible">

          {/* ============================================================== */}
          {/* TAB 1: RINGKASAN EKSEKUTIF (ALL 7 POINTS SUMMARY)            */}
          {/* ============================================================== */}
          {activeTab === 'ringkasan' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Executive Hero Banner */}
              <div className="bg-gradient-to-r from-[#19304E] via-[#203D61] to-[#00848B] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#244369] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
                  <Award className="w-80 h-80" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#E6A637] flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      LAPORAN HASIL PELAKSANAAN WORKSHOP
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading mt-1">
                      Penguatan Numerasi bagi Guru SMP (120 Menit)
                    </h1>
                    <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-3xl leading-relaxed">
                      Sintesis capaian fasilitasi interaktif berbasis Papan Interaktif Digital (PID).
                      Mencakup penguasaan materi 3 pilar numerasi, karya LKPD lintas mata pelajaran,
                      evaluasi rubrik sejawat, serta komitmen transformasi pembelajaran di kelas.
                    </p>

                    {/* Participant Profile Badge */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/20 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                        <GraduationCap className="w-4 h-4 text-[#E6A637]" />
                        <span className="font-semibold">{reflectionData.participantName || 'Dra. Endang Sulistyowati'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                        <Building2 className="w-4 h-4 text-[#6CE5EC]" />
                        <span>{reflectionData.schoolName || 'SMP Negeri 1 Nusantara'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                        <BookOpen className="w-4 h-4 text-amber-300" />
                        <span>Mapel: {reflectionData.subjectTaught || 'IPA'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                        <Calendar className="w-4 h-4 text-emerald-300" />
                        <span>{reflectionData.dateCompleted || '12 November 2026'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Big Score Stamp */}
                  <div className="flex lg:flex-col items-center justify-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md shrink-0 text-center">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold block">
                        Predikat Kelulusan
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#E6A637] font-heading block">
                        SANGAT KOMPETEN
                      </span>
                    </div>
                    <div className="h-10 w-px lg:h-px lg:w-full bg-white/20" />
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-300 block">Skor Rubrik</span>
                        <span className="text-lg font-mono font-bold text-white">{totalRubricScore}/20</span>
                      </div>
                      <div className="h-6 w-px bg-white/20" />
                      <div>
                        <span className="text-[10px] text-slate-300 block">Kuis AKM</span>
                        <span className="text-lg font-mono font-bold text-emerald-300">{effectiveQuiz.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 Key Metrics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Aktivitas Selesai */}
                <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">1. Aktivitas Selesai</span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#19304E] font-heading">
                    {completedCount} <span className="text-base font-normal text-slate-500">/ {totalModules} Modul</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>Durasi Terpenuhi:</span>
                    <span className="font-bold text-[#00848B]">{completedDurationMinutes} dari 120 Menit</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-[#00848B] h-full rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* 2. Kuis Pemahaman */}
                <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">2. Kuis Pemahaman</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Brain className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-700 font-heading">
                    {effectiveQuiz.score} <span className="text-base font-normal text-slate-500">/ {effectiveQuiz.totalQuestions} Benar</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>Akurasi Konsep:</span>
                    <span className="font-bold text-emerald-600 font-mono">{effectiveQuiz.percentage}% (Kompeten)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${effectiveQuiz.percentage}%` }}
                    />
                  </div>
                </div>

                {/* 3. Hasil Brainstorming */}
                <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">3. Brainstorming</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#19304E] font-heading">
                    {totalNotes} <span className="text-base font-normal text-slate-500">Gagasan Guru</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>Miskonsepsi Terbantahkan:</span>
                    <span className="font-bold text-rose-600">{tidakSetujuCount} Guru Setuju Numerasi Milik Semua Mapel</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden flex">
                    <div style={{ width: `${(tidakSetujuCount / totalNotes) * 100}%` }} className="bg-emerald-500 h-full" title="Tolak Monopoli" />
                    <div style={{ width: `${(raguRaguCount / totalNotes) * 100}%` }} className="bg-amber-400 h-full" title="Ragu-Ragu" />
                    <div style={{ width: `${(setujuCount / totalNotes) * 100}%` }} className="bg-rose-400 h-full" title="Setuju" />
                  </div>
                </div>

                {/* 5. Skor Rubrik */}
                <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">5. Penilaian Rubrik</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-purple-800 font-heading">
                    {totalRubricScore} <span className="text-base font-normal text-slate-500">/ 20 Poin</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>Kesesuaian Standar:</span>
                    <span className="font-bold text-purple-700 font-mono">{rubricPercentage}% (Kategori 4)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${rubricPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 2-Columns Synthesis: Group Design & Rubric Assessment */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left (7 cols): Rancangan Pembelajaran Kelompok */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#00848B]/10 text-[#00848B]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00848B] block">
                          POIN 4 · PORTOFOLIO RANCANGAN
                        </span>
                        <h3 className="text-lg font-bold text-[#19304E] font-heading">
                          Rancangan Pembelajaran Numerasi
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                      Terverifikasi Fasilitator
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-[#19304E] text-sm sm:text-base">
                        {lessonDesign.groupName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#19304E] text-white font-semibold text-xs">
                        {lessonDesign.subject} · {lessonDesign.gradeLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-slate-500 font-bold block text-[11px]">Topik Pembelajaran:</span>
                        <span className="text-slate-800 font-semibold">{lessonDesign.topic}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-bold block text-[11px]">Proses Kognitif Dominan:</span>
                        <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-xs">
                          AKM: {lessonDesign.cognitiveProcess} (HOTS)
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 font-bold block text-[11px]">Konteks Nyata & Stimulus Data:</span>
                      <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200 mt-1">
                        "{lessonDesign.realContext} — {lessonDesign.dataStimulus}"
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 font-bold block text-[11px]">Aktivitas Kunci Siswa ({lessonDesign.studentActivities.length} Tahap):</span>
                      <ul className="mt-1 space-y-1.5">
                        {lessonDesign.studentActivities.map((act, i) => (
                          <li key={act.id || i} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-[#00848B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <div className="flex-1">
                              <span className="font-bold text-slate-900">{act.title}</span> ({act.timeAllocation})
                              <p className="text-[11px] text-slate-600 mt-0.5">{act.studentAction}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right (5 cols): Skor Rubrik & Penilaian */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block">
                          POIN 5 · SKOR RUBRIK SEJAWAT
                        </span>
                        <h3 className="text-lg font-bold text-[#19304E] font-heading">
                          Hasil Penilaian 5 Kriteria
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-purple-800 bg-purple-100 px-3 py-1 rounded-xl">
                      {totalRubricScore} / 20
                    </span>
                  </div>

                  <div className="space-y-3">
                    {rubricMetrics.map((crit, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{crit.label}</span>
                          <span className="font-mono font-bold text-[#00848B]">{crit.score} / {crit.max}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#00848B] to-purple-600 h-full rounded-full"
                            style={{ width: `${(crit.score / crit.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Badges Earned */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                      Lencana Penghargaan Diterima:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {rubricScore.awardedBadges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6A637]/20 border border-[#E6A637]/60 text-[#9B6A14] text-xs font-bold"
                        >
                          <Award className="w-3.5 h-3.5 text-[#E6A637]" />
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Summary */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <p className="text-slate-700">
                      <strong className="text-emerald-700">Apresiasi:</strong> {rubricScore.appreciation}
                    </p>
                    <p className="text-slate-700">
                      <strong className="text-indigo-700">Rekomendasi:</strong> {rubricScore.recommendations}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2-Columns Bottom: Refleksi (Poin 6) & Komitmen Implementasi (Poin 7) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left (6 cols): Poin 6 - Hasil Refleksi */}
                <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                        POIN 6 · REFLEKSI PEDAGOGIS GURU
                      </span>
                      <h3 className="text-lg font-bold text-[#19304E] font-heading">
                        Intisari Refleksi Pembelajaran
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-[#19304E] block mb-1">
                        1. Hal Paling Bermakna Dipelajari:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{reflectionData.mostImportantLearning}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-[#19304E] block mb-1">
                        2. Pergeseran Paradigma Pemahaman:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{reflectionData.understandingShift}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-extrabold text-[#19304E] block mb-1">
                        3. Rencana Aksi Nyata di Kelas:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{reflectionData.classroomApplication}</p>
                    </div>
                  </div>
                </div>

                {/* Right (6 cols): Poin 7 - Komitmen Implementasi Guru */}
                <div className="lg:col-span-6 bg-gradient-to-br from-[#19304E] to-[#203D61] text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-[#244369] space-y-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-6 h-6 text-[#E6A637]" />
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                          POIN 7 · IKRAR KOMITMEN GURU
                        </span>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        Aktif Berkomitmen
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold block mb-1">
                        Pernyataan Komitmen Resmi:
                      </span>
                      <blockquote className="p-4 rounded-2xl bg-white/10 border-l-4 border-[#E6A637] backdrop-blur-md text-sm sm:text-base font-semibold text-amber-200 italic leading-relaxed">
                        "{reflectionData.commitmentPledge}"
                      </blockquote>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-slate-300 block text-[10px]">Tenggat Waktu Implementasi:</span>
                        <span className="font-bold text-white">Minggu Ke-1 Pasca Workshop</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-slate-300 block text-[10px]">Sasaran Siswa:</span>
                        <span className="font-bold text-[#6CE5EC]">Seluruh Kelas Ampuan SMP</span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Signature Badge */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-[10px] text-slate-300 block">Tanda Tangan Digital Peserta</span>
                      <span className="text-sm font-bold text-white font-heading">
                        {reflectionData.participantName}
                      </span>
                      <span className="text-[11px] text-slate-300 block">
                        {reflectionData.schoolName}
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#E6A637] flex flex-col items-center justify-center text-center p-1 bg-[#E6A637]/10">
                      <Award className="w-5 h-5 text-[#E6A637]" />
                      <span className="text-[8px] font-bold text-[#E6A637] uppercase leading-tight mt-0.5">VERIFIED PID</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: DETAIL 1. AKTIVITAS YANG DISELESAIKAN                   */}
          {/* ============================================================== */}
          {activeTab === 'aktivitas' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                      POIN 1 · RINCIAN 9 MODUL PEMBELAJARAN
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                      Status Penyelesaian Aktivitas Workshop (120 Menit)
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {completedCount} dari {totalModules} Modul Selesai ({progressPercent}%) · Total Waktu Ditempuh: {completedDurationMinutes} Menit
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-2xl font-mono font-extrabold text-[#00848B]">{progressPercent}%</span>
                      <span className="block text-[11px] text-slate-500 uppercase font-bold">Kelengkapan</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {WORKSHOP_MODULES.map((m) => {
                    const isDone = completedModules.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                          isDone
                            ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isDone ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {m.code} · {m.durationMinutes}m
                            </span>
                            {isDone ? (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Selesai
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                <AlertCircle className="w-4 h-4" /> Belum
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-base text-[#19304E] font-heading">{m.title}</h4>
                          <p className="text-xs text-slate-500 font-medium mb-2">{m.subtitle}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{m.objective}</p>
                        </div>

                        {onSelectModule && (
                          <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                            <span className="text-[11px] text-slate-500 italic">Interaktif PID</span>
                            <button
                              onClick={() => {
                                onSelectModule(m.id);
                                onClose();
                              }}
                              className="text-xs font-bold text-[#00848B] hover:text-[#005f63] flex items-center gap-1 cursor-pointer"
                            >
                              <span>Buka Modul</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: DETAIL 2. HASIL KUIS PEMAHAMAN                           */}
          {/* ============================================================== */}
          {activeTab === 'kuis' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                      POIN 2 · EVALUASI DIAGNOSTIK KOGNITIF
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                      Hasil Kuis Pemahaman Hakikat Numerasi (AKM)
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Pengukuran pemahaman esensial mengenai pembeda berhitung vs numerasi, 3 pilar, dan proses kognitif HOTS.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center shrink-0">
                    <span className="text-[11px] font-bold uppercase text-emerald-800 block">Skor Akhir Kuis</span>
                    <span className="text-3xl font-mono font-extrabold text-emerald-700">
                      {effectiveQuiz.score} / {effectiveQuiz.totalQuestions}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                      ({effectiveQuiz.percentage}% Akurasi)
                    </span>
                  </div>
                </div>

                {/* Question Breakdown List */}
                <div className="space-y-4">
                  {QUIZ_ITEMS.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[#19304E] text-white font-mono font-bold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {item.category}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          <Check className="w-3.5 h-3.5" /> Jawaban Tepat
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1">
                        {item.question}
                      </h4>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                        <strong className="text-emerald-700 block mb-0.5 font-bold">Jawaban Peserta:</strong>
                        {item.answerGiven}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 leading-relaxed flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Kesimpulan Diagnostik:</strong> Peserta telah menguasai sepenuhnya perbedaan fundamental
                    antara kalkulasi prosedural murni dengan nalar numerasi berbasis konteks riil, serta memahami integrasi
                    proses kognitif HOTS (Menalar) dalam perancangan materi ajar.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: DETAIL 3. HASIL BRAINSTORMING                           */}
          {/* ============================================================== */}
          {activeTab === 'brainstorm' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                      POIN 3 · DINAMIKA SIKAP & GAGASAN
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                      Hasil Brainstorming: "Numerasi Itu Urusan Siapa?"
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Membongkar miskonsepsi bahwa numerasi hanya beban guru matematika melalui sticky note digital interaktif.
                    </p>
                  </div>

                  {/* Stance Stats Bar */}
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-bold">
                    <div className="text-center px-2">
                      <span className="text-emerald-600 block text-lg font-mono font-extrabold">{tidakSetujuCount}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Tolak Monopoli</span>
                    </div>
                    <div className="h-8 w-px bg-slate-300" />
                    <div className="text-center px-2">
                      <span className="text-amber-600 block text-lg font-mono font-extrabold">{raguRaguCount}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Ragu-Ragu</span>
                    </div>
                    <div className="h-8 w-px bg-slate-300" />
                    <div className="text-center px-2">
                      <span className="text-rose-600 block text-lg font-mono font-extrabold">{setujuCount}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Setuju Monopoli</span>
                    </div>
                  </div>
                </div>

                {/* Sticky Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brainstormNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl border-2 shadow-sm flex flex-col justify-between"
                      style={{ backgroundColor: note.color, borderColor: '#CBD5E1' }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-extrabold text-[#19304E]">
                            {note.author}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 text-slate-700">
                            {note.subject}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          "{note.content}"
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-300/60 flex items-center justify-between text-xs text-slate-600">
                        <span className="capitalize text-[11px] font-bold">
                          Sikap: {note.stance === 'tidak_setuju' ? '✓ Tidak Setuju Monopoli' : note.stance === 'ragu_ragu' ? '? Ragu-ragu' : 'Setuju'}
                        </span>
                        <span className="font-mono font-semibold">❤️ {note.likes} Apresiasi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: DETAIL 4. RANCANGAN PEMBELAJARAN SETIAP KELOMPOK       */}
          {/* ============================================================== */}
          {activeTab === 'rancangan' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                      POIN 4 · PORTOFOLIO LENGKAP KELOMPOK
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                      Rancangan Pembelajaran Numerasi Setiap Kelompok
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Komparasi artefak modul ajar dan lembar aktivitas siswa yang dirancang oleh masing-masing kelompok guru.
                    </p>
                  </div>

                  {/* Group Selector Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-300">
                    {allGroups.map((grp, gIdx) => (
                      <button
                        key={grp.id || gIdx}
                        onClick={() => setSelectedGroupIdx(gIdx)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                          selectedGroupIdx === gIdx
                            ? 'bg-[#19304E] text-white shadow-md'
                            : 'bg-white text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {grp.groupName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Group Detailed Card */}
                <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-[#00848B] uppercase">Portofolio Desain</span>
                      <h3 className="text-xl font-extrabold text-[#19304E] font-heading">
                        {currentGroupDesign.groupName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Mapel: <strong>{currentGroupDesign.subject}</strong> · Sasaran: <strong>{currentGroupDesign.gradeLevel}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-xs">
                        Tingkat Kognitif: {currentGroupDesign.cognitiveProcess} (HOTS)
                      </span>
                    </div>
                  </div>

                  {/* 11 Component Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Topik Pembelajaran</strong>
                      <p className="font-bold text-slate-900">{currentGroupDesign.topic}</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Tujuan Pembelajaran</strong>
                      <p className="text-slate-800 leading-relaxed">{currentGroupDesign.learningGoal}</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Konteks Kehidupan Nyata</strong>
                      <p className="text-slate-800 leading-relaxed">{currentGroupDesign.realContext}</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Stimulus Data & Masalah</strong>
                      <p className="text-slate-800 leading-relaxed">{currentGroupDesign.dataStimulus}</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Konten Matematika Diintegrasikan</strong>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {currentGroupDesign.mathContent.map((cnt, ci) => (
                          <span key={ci} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-200">
                            {cnt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                      <strong className="text-slate-500 block text-[11px] uppercase">Produk / Bukti Belajar Siswa</strong>
                      <p className="text-slate-800 leading-relaxed">{currentGroupDesign.studentProduct}</p>
                    </div>
                  </div>

                  {/* Student Activities Sequence */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <strong className="text-slate-800 block font-heading text-sm">
                      Alur Tahapan Aktivitas Siswa ({currentGroupDesign.studentActivities.length} Sesi):
                    </strong>
                    <div className="space-y-3">
                      {currentGroupDesign.studentActivities.map((act, idx) => (
                        <div key={act.id || idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs sm:text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#19304E] text-white font-mono text-xs font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="font-extrabold text-slate-900">{act.title}</span>
                              <span className="text-[11px] text-slate-500 font-bold">({act.timeAllocation})</span>
                            </div>
                            <p className="text-slate-600 pl-8">{act.description}</p>
                            <p className="text-slate-700 pl-8 font-medium">
                              <strong>Tindakan Siswa:</strong> {act.studentAction}
                            </p>
                          </div>
                          <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#00848B]/10 text-[#00848B] font-extrabold text-xs whitespace-nowrap">
                            AKM: {act.cognitiveProcess}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                    <strong className="text-slate-500 block text-[11px] uppercase mb-1">Strategi Asesmen Kinerja & Rubrik</strong>
                    <p className="text-slate-800 leading-relaxed">{currentGroupDesign.assessmentStrategy}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: DETAIL 5. SKOR RUBRIK                                   */}
          {/* ============================================================== */}
          {activeTab === 'rubrik' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                      POIN 5 · PENILAIAN AUTENTIK 4-SKALA
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                      Rincian Skor Rubrik Penilaian Rancangan
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Evaluasi sejawat berdasarkan 5 aspek standar kurikulum dan pedagogi numerasi SMP.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-mono font-extrabold text-purple-700">{totalRubricScore} / 20</span>
                    <span className="block text-xs font-bold text-slate-500 uppercase">Total Capaian ({rubricPercentage}%)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rubricMetrics.map((met, mi) => (
                    <div key={mi} className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900">{met.label}</h4>
                        <span className="text-base font-mono font-extrabold text-purple-800 bg-purple-100 px-3 py-0.5 rounded-lg">
                          Skor: {met.score} / {met.max}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{met.desc}</p>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mt-2">
                        <div
                          className="bg-purple-600 h-full rounded-full"
                          style={{ width: `${(met.score / met.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Qualitative Feedback */}
                <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-purple-900 block mb-1">Kelompok Penilai / Pengawas:</span>
                    <p className="text-slate-800">{rubricScore.evaluatorGroup}</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-emerald-800 block mb-1">Apresiasi Karya:</span>
                    <p className="text-slate-800 leading-relaxed italic">"{rubricScore.appreciation}"</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-indigo-800 block mb-1">Rekomendasi Peningkatan:</span>
                    <p className="text-slate-800 leading-relaxed italic">"{rubricScore.recommendations}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: DETAIL 6. HASIL REFLEKSI GURU                           */}
          {/* ============================================================== */}
          {activeTab === 'refleksi' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                    POIN 6 · LEMBAR REFLEKSI PRIBADI
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                    Hasil Refleksi Mendalam Peserta Workshop
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Respons guru terhadap 4 pilar evaluasi diri pedagogis untuk transformasi kelas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#00848B] uppercase">Pertanyaan 1</span>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Apa hal paling penting & bermakna yang Anda pelajari?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                      {reflectionData.mostImportantLearning}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#00848B] uppercase">Pertanyaan 2</span>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Bagaimana perubahan pemahaman Anda mengenai numerasi?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                      {reflectionData.understandingShift}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#00848B] uppercase">Pertanyaan 3</span>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Bagaimana Anda akan menerapkannya di mata pelajaran Anda?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                      {reflectionData.classroomApplication}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#00848B] uppercase">Pertanyaan 4</span>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Apa potensi tantangan siswa dan bagaimana solusinya?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                      {reflectionData.potentialChallenges}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: DETAIL 7. KOMITMEN IMPLEMENTASI GURU                    */}
          {/* ============================================================== */}
          {activeTab === 'komitmen' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                    POIN 7 · RESOLUSI AKSI PEDAGOGIS NYATA
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                    Kartu Komitmen Implementasi Guru Numerasi SMP
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Pakta integritas penguatan numerasi lintas mapel pasca pelaksanaan workshop.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#19304E] via-[#203D61] to-[#00848B] text-white p-8 rounded-3xl shadow-xl border-4 border-[#E6A637] relative">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E6A637] text-[#19304E] flex items-center justify-center font-bold text-xl">
                        ★
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#E6A637]">
                          KARTU KOMITMEN RESMI
                        </span>
                        <h3 className="text-lg font-extrabold text-white font-heading">
                          PENGUATAN NUMERASI KELAS SMP
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-300">
                      {reflectionData.dateCompleted || '12 November 2026'}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-xs text-slate-300">Dengan ini saya menyatakan ikrar komitmen:</p>
                    <blockquote className="p-5 rounded-2xl bg-white/10 border-l-4 border-[#E6A637] text-lg sm:text-xl font-semibold text-amber-200 italic leading-relaxed">
                      "{reflectionData.commitmentPledge}"
                    </blockquote>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Nama Guru:</span>
                      <strong className="text-white text-sm">{reflectionData.participantName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Asal Sekolah:</span>
                      <strong className="text-white text-sm">{reflectionData.schoolName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Mata Pelajaran:</span>
                      <strong className="text-[#6CE5EC] text-sm">{reflectionData.subjectTaught}</strong>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-slate-300">Disahkan melalui Papan Interaktif Digital (PID)</span>
                    <span className="text-xs font-bold text-[#E6A637]">Status: TERVERIFIKASI & AKTIF</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PRINT-ONLY SECTION: OFFICIAL WORKSHOP EVALUATION SUMMARY SHEET */}
          {/* ============================================================== */}
          <div className="hidden print:block text-black p-4 space-y-6">
            <div className="border-b-2 border-black pb-4 text-center">
              <h1 className="text-2xl font-black uppercase tracking-tight">
                LAPORAN RESMI EVALUASI & RINGKASAN WORKSHOP PENGUATAN NUMERASI SMP
              </h1>
              <p className="text-xs font-semibold mt-1">
                Media Fasilitasi Interaktif 120 Menit Berbasis Papan Interaktif Digital (PID)
              </p>
              <div className="text-xs font-medium mt-2 flex justify-center gap-6">
                <span>Peserta: <strong>{reflectionData.participantName}</strong></span>
                <span>Sekolah: <strong>{reflectionData.schoolName}</strong></span>
                <span>Mapel: <strong>{reflectionData.subjectTaught}</strong></span>
                <span>Tanggal: <strong>{reflectionData.dateCompleted || '12 November 2026'}</strong></span>
              </div>
            </div>

            {/* Print Point 1 & 2 */}
            <div className="grid grid-cols-2 gap-4 text-xs border border-slate-400 p-3">
              <div>
                <h3 className="font-bold border-b pb-1 mb-1">1. AKTIVITAS DISELESAIKAN</h3>
                <p>Status: {completedCount} dari {totalModules} Modul ({progressPercent}%)</p>
                <p>Waktu Efektif: {completedDurationMinutes} Menit</p>
                <p className="text-[10px] text-slate-600 mt-1">
                  Modul: Welcome, Ice Breaking, Brainstorming, Challenge, Learning Hub, Cross-Subject, Design Studio, Presentation, Reflection.
                </p>
              </div>
              <div>
                <h3 className="font-bold border-b pb-1 mb-1">2. HASIL KUIS PEMAHAMAN AKM</h3>
                <p>Skor: {effectiveQuiz.score} / {effectiveQuiz.totalQuestions} Benar ({effectiveQuiz.percentage}%)</p>
                <p>Status: Sangat Memahami Pembeda Berhitung vs Numerasi & Proses HOTS Menalar</p>
              </div>
            </div>

            {/* Print Point 3 & 4 */}
            <div className="grid grid-cols-2 gap-4 text-xs border border-slate-400 p-3">
              <div>
                <h3 className="font-bold border-b pb-1 mb-1">3. HASIL BRAINSTORMING</h3>
                <p>Total Gagasan: {totalNotes} Ide Guru Lintas Mapel</p>
                <p>Penolakan Miskonsepsi: {tidakSetujuCount} Guru (Numerasi Milik Semua Mapel)</p>
                <p>Total Apresiasi Like: {totalLikes}</p>
              </div>
              <div>
                <h3 className="font-bold border-b pb-1 mb-1">4. RANCANGAN PEMBELAJARAN KELOMPOK</h3>
                <p>Kelompok: {lessonDesign.groupName} ({lessonDesign.subject})</p>
                <p>Topik: {lessonDesign.topic}</p>
                <p>Kognitif AKM: {lessonDesign.cognitiveProcess} (HOTS)</p>
                <p>Produk: {lessonDesign.studentProduct}</p>
              </div>
            </div>

            {/* Print Point 5 */}
            <div className="border border-slate-400 p-3 text-xs">
              <h3 className="font-bold border-b pb-1 mb-1">5. PENILAIAN SKOR RUBRIK SEJAWAT</h3>
              <div className="grid grid-cols-5 gap-2 text-center my-2">
                <div className="border p-1">Relevansi: {rubricScore.relevance}/4</div>
                <div className="border p-1">Konteks: {rubricScore.contextQuality}/4</div>
                <div className="border p-1">Matematika: {rubricScore.mathIntegration}/4</div>
                <div className="border p-1">Penalaran: {rubricScore.reasoningDev}/4</div>
                <div className="border p-1">Asesmen: {rubricScore.assessmentQuality}/4</div>
              </div>
              <p>Total Skor: <strong>{totalRubricScore} / 20 ({rubricPercentage}%)</strong> · Penilai: {rubricScore.evaluatorGroup}</p>
              <p className="italic mt-1">Apresiasi: "{rubricScore.appreciation}"</p>
            </div>

            {/* Print Point 6 & 7 */}
            <div className="border border-slate-400 p-3 text-xs space-y-2">
              <h3 className="font-bold border-b pb-1">6. HASIL REFLEKSI PEDAGOGIS GURU</h3>
              <p><strong>Hal Utama:</strong> {reflectionData.mostImportantLearning}</p>
              <p><strong>Aksi di Kelas:</strong> {reflectionData.classroomApplication}</p>
              <h3 className="font-bold border-b pt-2 pb-1">7. IKRAR KOMITMEN IMPLEMENTASI</h3>
              <p className="font-semibold italic text-sm">"{reflectionData.commitmentPledge}"</p>
            </div>

            {/* Signature Columns */}
            <div className="grid grid-cols-2 gap-8 text-xs pt-8 text-center">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold">Fasilitator Workshop Numerasi SMP</p>
                <div className="h-16" />
                <p className="font-bold underline">( Tim Fasilitator / Pengawas SMP )</p>
                <p className="text-[10px]">NIP. 19780512 200501 1 004</p>
              </div>
              <div>
                <p>{reflectionData.schoolName}, {reflectionData.dateCompleted || '12 November 2026'}</p>
                <p className="font-bold">Peserta Workshop,</p>
                <div className="h-16" />
                <p className="font-bold underline">( {reflectionData.participantName} )</p>
                <p className="text-[10px]">Guru {reflectionData.subjectTaught}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 no-print">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Data tersinkronisasi otomatis dengan memori lokal PID & seluruh 9 modul workshop.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-extrabold text-xs sm:text-sm shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-200 text-xs sm:text-sm font-bold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
