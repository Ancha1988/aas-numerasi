import React from 'react';
import { ArrowRight, CheckCircle, Monitor, Sparkles } from 'lucide-react';
import { WorkshopMode } from '../../types';

interface Modul01WelcomeProps {
  onNext: () => void;
  onOpenPIDGuide: () => void;
  onSetMode: (mode: WorkshopMode) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Modul01Welcome: React.FC<Modul01WelcomeProps> = ({
  onNext,
  onOpenPIDGuide,
  onSetMode,
  isCompleted,
  onToggleComplete,
}) => {
  const goals = [
    {
      num: 1,
      title: 'Memahami Hakikat Numerasi',
      desc: 'Membongkar miskonsepsi berhitung murni dan memahami numerasi sebagai nalar hidup kontekstual.',
    },
    {
      num: 2,
      title: 'Mengidentifikasi Numerasi Lintas Mapel',
      desc: 'Menemukan titik temu numerasi dalam 9 rumpun mata pelajaran kurikulum SMP.',
    },
    {
      num: 3,
      title: 'Menganalisis Masalah Kontekstual',
      desc: 'Membaca dan membedah data riil lingkungan sekolah (kantin, sampah, debit air, denyut nadi).',
    },
    {
      num: 4,
      title: 'Merancang Pembelajaran Berbasis Numerasi',
      desc: 'Menyusun Lembar Kerja Peserta Didik (LKPD) dengan 11 komponen rancangan terstruktur.',
    },
    {
      num: 5,
      title: 'Mengembangkan Asesmen Numerasi',
      desc: 'Menilai kualitas rancangan pembelajaran menggunakan rubrik 5 kriteria berbobot 1-4.',
    },
    {
      num: 6,
      title: 'Merefleksikan Praktik Pembelajaran',
      desc: 'Merumuskan ikrar komitmen transformasi pedagogis nyata di kelas masing-masing.',
    },
  ];

  const workflowSteps = [
    { step: '01', name: 'EXPERIENCE', desc: 'Merasakan kekuatan angka dalam kehidupan nyata' },
    { step: '02', name: 'UNDERSTAND', desc: 'Membedah hakikat 3 komponen & proses kognitif' },
    { step: '03', name: 'EXPLORE', desc: 'Menjelajahi stimulus data pada 9 mapel SMP' },
    { step: '04', name: 'DESIGN', desc: 'Membangun rancangan LKPD di Worksheet Builder' },
    { step: '05', name: 'PRESENT', desc: 'Memamerkan karya tim & penilaian rubrik 4-skala' },
    { step: '06', name: 'REFLECT', desc: 'Mengunci komitmen aksi guru menuju kelas' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner Section (Optimized for 1920x1080 Widescreen) */}
      <div className="relative bg-gradient-to-br from-[#19304E] via-[#1D3B61] to-[#0F2036] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#244369] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#00848B]/40 border border-[#00848B]/70 text-[#6CE5EC] text-xs sm:text-sm font-extrabold tracking-wide mb-5 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E6A637]" />
                WORKSHOP PENGUATAN NUMERASI DALAM PEMBELAJARAN SMP
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                NUMERACY LAB <span className="text-[#E6A637]">SMP</span>
              </h1>

              <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-100 leading-snug">
                Menghidupkan Numerasi dalam Pembelajaran: <br className="hidden sm:inline" />
                <span className="text-[#6CE5EC]">Dari Memahami Konsep Menuju Praktik Nyata.</span>
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                Selamat datang di laboratorium digital interaktif bagi guru SMP semua mata pelajaran.
                Selama 120 menit, mari bereksplorasi, bernalar kritis, dan merancang pengalaman belajar bermakna
                langsung melalui Papan Interaktif Digital (PID).
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <span className="font-extrabold text-[#E6A637] uppercase tracking-wider">TAGLINE:</span>
                <span className="bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/20 font-mono font-bold tracking-wider">
                  EXPLORE · THINK · SOLVE · CREATE · REFLECT
                </span>
              </div>
            </div>

            {/* Quick Action Buttons - Extra Large Touch Targets */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onNext}
                className="flex items-center gap-3 px-8 py-4 bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] font-heading font-extrabold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95"
              >
                <span>MULAI WORKSHOP</span>
                <ArrowRight className="w-5 h-5 font-bold stroke-[3]" />
              </button>

              <button
                onClick={onOpenPIDGuide}
                className="flex items-center gap-2.5 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-2xl border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                <Monitor className="w-5 h-5 text-[#6CE5EC]" />
                <span>Petunjuk Layar PID</span>
              </button>

              <div className="flex items-center gap-1.5 bg-[#0F2036] p-1.5 rounded-2xl border border-white/20 text-xs sm:text-sm">
                <button
                  onClick={() => onSetMode('facilitator')}
                  className="px-4 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 font-bold transition-colors cursor-pointer"
                >
                  Mode Fasilitator
                </button>
                <button
                  onClick={() => onSetMode('participant')}
                  className="px-4 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 font-bold transition-colors cursor-pointer"
                >
                  Mode Peserta
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Zone */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l-2 border-white/20">
            <img
              src="/src/assets/images/hero_numeracy_collaboration_1794484082137.jpg"
              alt="Kolaborasi Guru dan Siswa SMP di Depan Papan Interaktif Digital"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#19304E]/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-5 right-5 bg-[#19304E]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs sm:text-sm font-semibold text-slate-100 shadow-lg">
              Media Interaktif Flat Panel (PID) · SMP
            </div>
          </div>
        </div>
      </div>

      {/* 6 Objectives Grid - Large High Contrast Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
              CAPAIAN WORKSHOP
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-0.5">
              6 Sasaran Utama Penguatan Numerasi Guru SMP
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            Durasi Terstruktur: 120 Menit Efektif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((g) => (
            <div
              key={g.num}
              className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-[#00848B] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#EFF5F8] text-[#00848B] font-heading font-extrabold flex items-center justify-center text-base border-2 border-[#B8D5E5] group-hover:bg-[#00848B] group-hover:text-white transition-colors mb-4 shadow-xs">
                  0{g.num}
                </div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#19304E] leading-snug mb-2">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {g.desc}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00848B]">
                <CheckCircle className="w-4 h-4 text-[#00848B] shrink-0" />
                <span>Terintegrasi dalam 9 Modul</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alur Workshop Flow - 6-column Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E6A637]">
            DESAIN INSTRUKSIONAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#19304E] font-heading mt-1">
            Alur Belajar 6 Tahap (The Learning Journey)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Alur pembelajaran transformatif dari pengalaman konkret menuju komitmen aksi nyata di kelas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {workflowSteps.map((wf, idx) => (
            <div
              key={wf.step}
              className="p-5 rounded-2xl bg-[#EFF5F8] border-2 border-[#B8D5E5] flex flex-col justify-between hover:bg-[#E2EDF3] hover:border-[#00848B] transition-all relative"
            >
              <div>
                <span className="text-xs font-mono font-extrabold text-[#00848B] block mb-1">
                  TAHAP {wf.step}
                </span>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#19304E] tracking-tight">
                  {wf.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Bar - Ergonomic Large Buttons */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            <CheckCircle className={`w-5 h-5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Modul 01 Selesai ✓' : 'Tandai Modul Selesai'}</span>
          </button>
          <span className="text-xs sm:text-sm text-slate-600 font-medium hidden md:inline">
            Modul Selanjutnya: <strong className="text-[#19304E]">Modul 02 — Ice Breaking (Tebak Angka)</strong>
          </span>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Modul 02: Ice Breaking</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
