import React, { useState } from 'react';
import { Sparkles, RotateCcw, KeyRound, Check, HelpCircle, ArrowRight, Link2, CheckCircle2 } from 'lucide-react';

export interface MatchPair {
  id: string;
  concept: string; // Left side: mathematical / statistical concept
  context: string; // Right side: real SMP context
  rationale: string;
  category: string;
}

const CONCEPTS_DATA: MatchPair[] = [
  {
    id: 'pair-1',
    concept: 'Laju Alir & Debit (Volume per Satuan Waktu)',
    context: 'Mengukur kebocoran kran wastafel sekolah menggunakan gelas ukur untuk menghitung pemborosan air bersih bulanan',
    rationale: 'Debit Q = V / t menghubungkan volume air yang hilang dengan durasi waktu, menjadi dasar audit air di sekolah.',
    category: 'Saintifik / IPA',
  },
  {
    id: 'pair-2',
    concept: 'Rasio Skala & Proporsi Geometri',
    context: 'Membuat denah lapangan upacara dan jalur evakuasi gempa berskala 1 : 200 pada mata pelajaran IPS dan Seni Rupa',
    rationale: 'Skala adalah perbandingan jarak pada gambar terhadap jarak sebenarnya, melatih penalaran spasial dan reduksi ukuran akurat.',
    category: 'Seni Rupa & IPS',
  },
  {
    id: 'pair-3',
    concept: 'Ukuran Pemusatan: Nilai Modus (Frekuensi Terbanyak)',
    context: 'Mengidentifikasi menu makanan yang paling laris dipesan siswa untuk menentukan prioritas stok bahan pangan kantin',
    rationale: 'Modus menunjukkan kategori dengan frekuensi kemunculan tertinggi, sangat esensial dalam pengambilan keputusan rantai pasok.',
    category: 'Prakarya / Kewirausahaan',
  },
  {
    id: 'pair-4',
    concept: 'Proporsi Persentase & Partisi Data',
    context: 'Menghitung porsi siswa yang membawa tumbler sendiri (75%) vs kemasan plastik sekali pakai (25%) dalam kampanye Adiwiyata',
    rationale: 'Persentase mengubah angka absolut menjadi per seratus, mempermudah komunikasi capaian program lingkungan kepada seluruh warga sekolah.',
    category: 'Bahasa Indonesia / Lingkungan',
  },
  {
    id: 'pair-5',
    concept: 'Transformasi Geometri (Refleksi & Simetri Lipat)',
    context: 'Menganalisis pola keteraturan geometri pada motif ragam hias kain batik Kawung dan Megamendung khas daerah',
    rationale: 'Etnomatematika menghubungkan prinsip cermin (refleksi), rotasi, dan translasi matematika dengan kearifan budaya nusantara.',
    category: 'Seni Budaya / Etnomatematika',
  },
];

export const ConceptMatcher: React.FC = () => {
  // Pairs: mapping conceptId -> contextId
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Shuffled right-side contexts for challenge (deterministic order to avoid SSR mismatch)
  const [shuffledContexts] = useState(() => {
    return [...CONCEPTS_DATA].sort((a, b) => b.id.localeCompare(a.id));
  });

  const handleConceptClick = (id: string) => {
    setSelectedConceptId(id === selectedConceptId ? null : id);
  };

  const handleContextClick = (contextId: string) => {
    if (!selectedConceptId) return;

    // Pair selected concept with this context
    setMatches((prev) => {
      const next = { ...prev };
      // Remove any previous match using this contextId
      Object.keys(next).forEach((cId) => {
        if (next[cId] === contextId) delete next[cId];
      });
      next[selectedConceptId] = contextId;
      return next;
    });

    setSelectedConceptId(null);
    setIsEvaluated(false);
  };

  const handleRemoveMatch = (conceptId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMatches((prev) => {
      const next = { ...prev };
      delete next[conceptId];
      return next;
    });
    setIsEvaluated(false);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedConceptId(null);
    setIsEvaluated(false);
    setShowExplanation(false);
  };

  const totalMatched = Object.keys(matches).length;
  let correctCount = 0;
  if (isEvaluated) {
    CONCEPTS_DATA.forEach((item) => {
      if (matches[item.id] === item.id) {
        correctCount++;
      }
    });
  }

  // Color mapping helper for connected pairs
  const getPairColor = (index: number) => {
    const colors = [
      'border-teal-500 bg-teal-50 text-teal-950',
      'border-indigo-500 bg-indigo-50 text-indigo-950',
      'border-amber-500 bg-amber-50 text-amber-950',
      'border-emerald-500 bg-emerald-50 text-emerald-950',
      'border-purple-500 bg-purple-50 text-purple-950',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title & Instructions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 2 · MENCOCOKKAN KONSEP KE SITUASI NYATA
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Menghubungkan Konsep Matematika dengan Masalah Kontekstual SMP
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sentuh <strong>Konsep Matematika</strong> di kolom kiri, lalu sentuh <strong>Situasi Nyata SMP</strong> yang bersesuaian di kolom kanan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Pasangan</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Rasionil' : 'Lihat Pembahasan Berpikir'}</span>
          </button>
        </div>
      </div>

      {/* Two Column Matching Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mathematical Concepts (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#19304E]">
              KOLOM A: KONSEP MATEMATIKA / STATISTIKA
            </span>
            <span className="text-xs text-slate-500 font-semibold">Sentuh untuk memilih</span>
          </div>

          <div className="space-y-3">
            {CONCEPTS_DATA.map((item, index) => {
              const isSelected = selectedConceptId === item.id;
              const matchedTargetId = matches[item.id];
              const isMatched = !!matchedTargetId;
              const isCorrect = isMatched && matchedTargetId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleConceptClick(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-[#19304E] text-white border-[#19304E] ring-4 ring-[#00848B]/30 scale-[1.02]'
                      : isEvaluated
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-rose-50 border-rose-400 text-rose-950'
                      : isMatched
                      ? getPairColor(index)
                      : 'bg-white border-slate-300 hover:border-[#00848B] text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider opacity-80">
                      Konsep #{index + 1}
                    </span>
                    {isMatched && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/80 text-slate-800 border border-slate-200">
                        Terhubung
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base leading-snug">
                    {item.concept}
                  </h4>
                  {isMatched && (
                    <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-xs">
                      <span className="font-semibold italic">Pasangan terpilih di sebelah kanan</span>
                      <button
                        onClick={(e) => handleRemoveMatch(item.id, e)}
                        className="text-rose-600 hover:text-rose-800 font-bold px-2 py-0.5 rounded hover:bg-rose-100 cursor-pointer"
                      >
                        Lepas ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Indicator */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center self-center py-8 text-slate-400">
          <Link2 className="w-8 h-8 text-[#00848B] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-[#00848B]">PASANGKAN</span>
        </div>

        {/* Right Column: Real-life SMP Contexts (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              KOLOM B: SITUASI NYATA DI SMP
            </span>
            <span className="text-xs text-slate-500 font-semibold">Sentuh untuk menghubungkan</span>
          </div>

          <div className="space-y-3">
            {shuffledContexts.map((contextItem, index) => {
              // Find which concept is currently matched to this context
              const matchedConceptId = Object.keys(matches).find((cId) => matches[cId] === contextItem.id);
              const isTargetOfSelection = !!selectedConceptId;
              const isMatched = !!matchedConceptId;
              const isCorrect = isMatched && matchedConceptId === contextItem.id;
              const conceptIndex = CONCEPTS_DATA.findIndex((c) => c.id === matchedConceptId);

              return (
                <div
                  key={contextItem.id}
                  onClick={() => handleContextClick(contextItem.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                    isEvaluated
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : isMatched
                        ? 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-300 text-slate-800'
                      : isMatched
                      ? getPairColor(conceptIndex >= 0 ? conceptIndex : index)
                      : isTargetOfSelection
                      ? 'border-[#00848B] hover:bg-teal-50/50 bg-white ring-2 ring-[#00848B]/30'
                      : 'bg-white border-slate-300 hover:border-slate-400 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      Rumpun: {contextItem.category}
                    </span>
                    {matchedConceptId && (
                      <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-900 border border-teal-300">
                        Dipasangkan ke Konsep #{CONCEPTS_DATA.findIndex((c) => c.id === matchedConceptId) + 1}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
                    "{contextItem.context}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Evaluation and Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
        <button
          onClick={() => setIsEvaluated(true)}
          disabled={totalMatched === 0}
          className={`px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
            totalMatched === 0
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-[#00848B] hover:bg-[#009da5] text-white'
          }`}
        >
          Periksa Kecocokan Pasangan
        </button>

        {isEvaluated && (
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
            {correctCount === CONCEPTS_DATA.length ? (
              <span className="bg-emerald-50 text-emerald-900 border-2 border-emerald-400 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                Luar Biasa! Semua 5 konsep matematika sukses dicocokkan 100% tepat.
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-950 border-2 border-amber-300 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                Capaian Anda: {correctCount} dari {CONCEPTS_DATA.length} Tepat. Buka Rasionil Berpikir untuk meninjau kuncinya!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Thought Process Explanation Panel */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Pembahasan & Proses Berpikir Numerasi: Menjembatani Teori ke Situasi Riil
          </h4>
          <div className="space-y-3 text-xs sm:text-sm text-slate-800">
            {CONCEPTS_DATA.map((item, index) => (
              <div key={item.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-teal-200 shadow-xs space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-900 font-extrabold">
                  <span className="text-[#19304E]">
                    #{index + 1}. {item.concept} ➔ {item.category}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-normal">
                  <strong>Penerapan Nyata:</strong> {item.context}
                </p>
                <p className="text-emerald-900 leading-relaxed font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <strong>Logika Berpikir Numerasi:</strong> {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
