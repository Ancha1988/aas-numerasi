import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Award, Star, Check } from 'lucide-react';
import { RubricScore, LessonDesign } from '../../types';
import { Storage } from '../../utils/storage';
import { SAMPLE_PEER_GROUPS } from '../../data/workshopData';

interface Modul08PresentationProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  rubricScore: RubricScore;
  onUpdateRubric: (score: RubricScore) => void;
  currentDesign: LessonDesign;
}

interface RubricAspect {
  key: keyof Pick<RubricScore, 'relevance' | 'contextQuality' | 'mathIntegration' | 'reasoningDev' | 'assessmentQuality'>;
  title: string;
  description: string;
  levels: { [score: number]: string };
}

const RUBRIC_ASPECTS: RubricAspect[] = [
  {
    key: 'relevance',
    title: '1. Relevansi Tujuan Pembelajaran Numerasi',
    description: 'Keterikatan antara Capaian Pembelajaran mata pelajaran dengan penguatan numerasi kontekstual.',
    levels: {
      1: 'Tujuan pembelajaran belum memuat unsur numerasi atau terkesan dipaksakan tanpa relevansi materi.',
      2: 'Unsur numerasi mulai tampak namun masih dominan berhitung kalkulatif tanpa kaitan erat dengan materi.',
      3: 'Tujuan pembelajaran numerasi jelas dan selaras dengan kompetensi dasar kurikulum mata pelajaran.',
      4: 'Sangat relevan, integratif, dan menginspirasi siswa untuk melihat keterhubungan disiplin ilmu dengan matematika.',
    },
  },
  {
    key: 'contextQuality',
    title: '2. Kualitas Konteks Permasalahan Nyata',
    description: 'Kebermaknaan stimulus, otentisitas situasi, dan kedekatan masalah dengan kehidupan siswa SMP.',
    levels: {
      1: 'Masalah artifisial / dekontekstual tanpa data yang jelas.',
      2: 'Konteks ada namun kurang otentik atau kurang relevan dengan keseharian remaja jenjang SMP.',
      3: 'Konteks nyata dan bermakna (misal kantin, sampah, debit kran air sekolah).',
      4: 'Konteks sangat kaya, menggugah kepedulian sosial/ekologis, dan memantik rasa ingin tahu siswa untuk menyelidiki data.',
    },
  },
  {
    key: 'mathIntegration',
    title: '3. Integrasi Konten Matematika yang Tepat',
    description: 'Kesesuaian konten matematika (bilangan, aljabar, geometri, data) dengan taraf kognitif SMP.',
    levels: {
      1: 'Konten matematika tidak jelas atau terlalu rumit di luar kapasitas materi jenjang SMP.',
      2: 'Konten matematika tepat namun perannya hanya sebagai tempelan penghitungan singkat.',
      3: 'Konten matematika tepat sasaran dan menjadi alat utama untuk menyelesaikan masalah.',
      4: 'Integrasi konten matematika harmonis, elegan, dan memperkuat pemahaman substansi mata pelajaran itu sendiri.',
    },
  },
  {
    key: 'reasoningDev',
    title: '4. Pengembangan Proses Berpikir & Penalaran (HOTS)',
    description: 'Aktivitas mengarahkan siswa dari sekadar tahu (Knowing) menuju menganalisis & menalar (Reasoning).',
    levels: {
      1: 'Hanya meminta siswa berhitung satu langkah tanpa ada proses bernalar.',
      2: 'Mulai ada interpretasi data sederhana namun belum menuntut pengambilan keputusan alternatif.',
      3: 'Mendorong siswa membandingkan data, membaca tren, dan merumuskan argumen bukti.',
      4: 'Menuntut penalaran kritis mendalam, evaluasi variabel yang belum lengkap, dan rekomendasi solusi strategis.',
    },
  },
  {
    key: 'assessmentQuality',
    title: '5. Kualitas Strategi Asesmen Numerasi',
    description: 'Instrumen penilaian kinerja, rubrik pengamatan, dan butir soal formatif yang terukur.',
    levels: {
      1: 'Belum ada rencana asesmen atau hanya berupa tes pilihan ganda berhitung hafalan.',
      2: 'Asesmen ada namun kriteria keberhasilan penalaran numerasi belum terinci secara adil.',
      3: 'Terdapat kriteria penilaian kinerja produk dan pemecahan masalah numerasi yang jelas.',
      4: 'Strategi asesmen autentik lengkap dengan rubrik analitik bertingkat dan umpan balik formatif yang memberdayakan.',
    },
  },
];

export const Modul08Presentation: React.FC<Modul08PresentationProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
  rubricScore,
  onUpdateRubric,
  currentDesign,
}) => {
  const [selectedGroupIdx, setSelectedGroupIdx] = useState<number>(0);

  // Group portfolio options
  const displayGroups = [
    { ...currentDesign, label: `${currentDesign.groupName} (Karya Anda)` },
    ...SAMPLE_PEER_GROUPS.slice(1).map((g) => ({ ...g, label: g.groupName })),
  ];

  const activeGroup = displayGroups[selectedGroupIdx] || displayGroups[0];

  const handleScoreChange = (
    key: keyof Pick<RubricScore, 'relevance' | 'contextQuality' | 'mathIntegration' | 'reasoningDev' | 'assessmentQuality'>,
    val: number
  ) => {
    const updated = { ...rubricScore, [key]: val };
    onUpdateRubric(updated);
    Storage.setRubricScore(updated);
  };

  const handleTextChange = (field: 'appreciation' | 'recommendations' | 'evaluatorGroup', val: string) => {
    const updated = { ...rubricScore, [field]: val };
    onUpdateRubric(updated);
    Storage.setRubricScore(updated);
  };

  const handleToggleBadge = (badge: string) => {
    const currentBadges = rubricScore.awardedBadges || [];
    const nextBadges = currentBadges.includes(badge)
      ? currentBadges.filter((b) => b !== badge)
      : [...currentBadges, badge];
    const updated = { ...rubricScore, awardedBadges: nextBadges };
    onUpdateRubric(updated);
    Storage.setRubricScore(updated);
  };

  const totalScore =
    rubricScore.relevance +
    rubricScore.contextQuality +
    rubricScore.mathIntegration +
    rubricScore.reasoningDev +
    rubricScore.assessmentQuality;

  const scorePercentage = Math.round((totalScore / 20) * 100);

  const getScoreInterpretation = (score: number) => {
    if (score >= 18) {
      return {
        tier: 'Sangat Baik (Exemplary Design)',
        desc: 'Rancangan sangat matang, kontekstual, dan siap menjadi model percontohan numerasi di sekolah.',
        color: 'text-emerald-900 bg-emerald-50 border-2 border-emerald-400',
      };
    }
    if (score >= 14) {
      return {
        tier: 'Baik (Proficient Design)',
        desc: 'Komponen numerasi telah terintegrasi dengan baik, dengan sedikit penyempurnaan pada variasi instrumen asesmen.',
        color: 'text-teal-900 bg-teal-50 border-2 border-teal-400',
      };
    }
    if (score >= 10) {
      return {
        tier: 'Cukup (Developing Design)',
        desc: 'Konsep dasar sudah ada, namun perlu penguatan konteks nyata dan peningkatan proses kognitif ke tahap menalar.',
        color: 'text-amber-950 bg-amber-50 border-2 border-amber-400',
      };
    }
    return {
      tier: 'Perlu Pendampingan (Beginning Design)',
      desc: 'Perlu review mendalam pada perumusan tujuan dan pemilahan data stimulus yang lebih dekat dengan kehidupan murid.',
      color: 'text-rose-950 bg-rose-50 border-2 border-rose-400',
    };
  };

  const interpretation = getScoreInterpretation(totalScore);

  const AVAILABLE_BADGES = [
    'Inspiratif & Kontekstual',
    'Penalaran HOTS Tinggi',
    'Kaya Stimulus Data',
    'Solutif & Ramah Lingkungan',
    'Kolaborasi Interaktif',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Award className="w-4 h-4 text-[#E6A637]" />
            MODUL 08 · PRESENTASI & ASESMEN RUBRIK
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Galeri Presentasi & Penilaian Rubrik 5 Aspek
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-2xl leading-relaxed">
            Tujuan: Menampilkan karya rancangan kelompok guru di layar PID, saling memberikan apresiasi bermakna,
            serta mengevaluasi kualitas instruksional menggunakan rubrik standar 4-skala.
          </p>
        </div>

        {/* Total Score Badge - High Contrast */}
        <div className="bg-[#19304E] text-white p-5 rounded-3xl border-2 border-[#244369] flex items-center gap-5 shrink-0 shadow-lg">
          <div className="text-center">
            <span className="text-xs uppercase font-extrabold text-slate-300 block">Total Skor Rubrik</span>
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#E6A637] leading-none mt-1">
              {totalScore} <span className="text-base font-normal text-slate-300">/ 20</span>
            </div>
          </div>
          <div className="h-12 w-px bg-slate-600" />
          <div>
            <span className="text-xs uppercase font-extrabold text-slate-300 block">Kualifikasi Mutu</span>
            <span className="text-sm sm:text-base font-extrabold text-white font-mono">{scorePercentage}% ({interpretation.tier.split(' ')[0]})</span>
          </div>
        </div>
      </div>

      {/* Group Selector Bar - Big Touch Buttons */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <span className="font-extrabold text-[#19304E]">Pilih Kelompok yang Sedang Tampil di Layar PID:</span>
        <div className="flex flex-wrap items-center gap-2.5">
          {displayGroups.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setSelectedGroupIdx(idx)}
              className={`px-4 py-2.5 rounded-2xl font-extrabold transition-all cursor-pointer ${
                selectedGroupIdx === idx
                  ? 'bg-[#19304E] text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Group Presentation (5 cols) + Right Rubric Scoring (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Group Presentation Visual Sheet (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 sticky top-24">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              KARYA YANG SEDANG DIPRESENTASIKAN
            </span>
            <h3 className="font-heading font-extrabold text-lg text-[#19304E] mt-0.5">
              {activeGroup.topic}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              {activeGroup.groupName} · {activeGroup.subject} ({activeGroup.gradeLevel})
            </p>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <strong className="text-[#19304E] block mb-1 font-extrabold">Tujuan Pembelajaran:</strong>
              <p className="leading-relaxed font-medium">{activeGroup.learningGoal}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <strong className="text-[#19304E] block mb-1 font-extrabold">Konteks & Stimulus Data:</strong>
              <p className="leading-relaxed mb-1.5">{activeGroup.realContext}</p>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#00848B] bg-white p-3 rounded-xl border border-slate-300">
                {activeGroup.dataStimulus}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <strong className="text-[#19304E] block mb-1.5 font-extrabold">Aktivitas Siswa ({activeGroup.studentActivities?.length || 0} Langkah):</strong>
              <ul className="space-y-1.5 text-slate-700">
                {(activeGroup.studentActivities || []).map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00848B] font-extrabold">•</span>
                    <span><strong>{a.title}</strong>: {a.studentAction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border-2 border-teal-300 text-slate-900">
              <strong className="text-[#00848B] block mb-1 font-extrabold">Produk Akhir Siswa:</strong>
              <p className="font-medium">{activeGroup.studentProduct}</p>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Rubric Criteria Scoring (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                RUBRIK PENILAIAN AUTENTIK (1 - 4 POIN)
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
                Lembar Evaluasi Performa Desain Pembelajaran
              </h2>
            </div>
            <div className="bg-[#EFF5F8] border-2 border-[#00848B] text-[#00848B] px-3.5 py-1.5 rounded-xl text-xs font-extrabold self-start sm:self-auto shadow-xs">
              Menilai: {activeGroup.groupName}
            </div>
          </div>

          {/* 5 Aspects */}
          <div className="space-y-6">
            {RUBRIC_ASPECTS.map((aspect) => {
              const currentVal = rubricScore[aspect.key];

              return (
                <div key={aspect.key} className="p-5 sm:p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                      {aspect.title}
                    </h4>
                    <span className="font-mono text-sm font-extrabold text-[#00848B] bg-white px-3 py-1 rounded-xl border border-slate-300 self-start sm:self-auto shadow-xs">
                      Skor: {currentVal} / 4
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {aspect.description}
                  </p>

                  {/* 4 Large Score Touch Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {[1, 2, 3, 4].map((val) => {
                      const isSelected = currentVal === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleScoreChange(aspect.key, val)}
                          className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer min-h-[90px] flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.03] ring-4 ring-[#00848B]/30'
                              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 hover:border-slate-400 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs sm:text-sm font-heading font-extrabold">Skor {val}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#E6A637] stroke-[3]" />}
                          </div>
                          <p className={`text-[11px] sm:text-xs leading-snug line-clamp-3 ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                            {aspect.levels[val]}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Qualitative Feedback & Appreciation */}
          <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-extrabold text-[#19304E] block mb-1.5">
                Apresiasi Kekuatan Rancangan:
              </label>
              <textarea
                rows={2}
                value={rubricScore.appreciation}
                onChange={(e) => handleTextChange('appreciation', e.target.value)}
                placeholder="Tuliskan apresiasi: apa yang paling menarik dari ide rancangan ini..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-extrabold text-[#19304E] block mb-1.5">
                Saran Konstruktif untuk Penyempurnaan:
              </label>
              <textarea
                rows={2}
                value={rubricScore.recommendations}
                onChange={(e) => handleTextChange('recommendations', e.target.value)}
                placeholder="Tuliskan saran: bagaimana meningkatkan aspek asesmen atau variasi data..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            {/* Badges of Honor */}
            <div>
              <label className="font-extrabold text-[#19304E] block mb-2.5">
                Sematkan Lencana Penghargaan (Peer Badges):
              </label>
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_BADGES.map((b) => {
                  const isAwarded = (rubricScore.awardedBadges || []).includes(b);
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleToggleBadge(b)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                        isAwarded
                          ? 'bg-[#E6A637] text-[#19304E] shadow-sm'
                          : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isAwarded ? 'fill-current' : ''}`} />
                      <span>{b}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interpretasi Hasil Evaluasi */}
          <div className={`p-5 rounded-2xl border-2 text-xs sm:text-sm ${interpretation.color}`}>
            <strong className="block mb-1 font-extrabold text-sm sm:text-base uppercase tracking-wide">
              Hasil Asesmen: {interpretation.tier} ({totalScore} / 20 Poin)
            </strong>
            <p className="leading-relaxed font-medium">{interpretation.desc}</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 07</span>
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
            <span>{isCompleted ? 'Modul 08 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 09: Reflection</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
