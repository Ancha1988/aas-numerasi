import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Compass, Droplets, Globe, ShieldCheck, Activity, Palette, Languages, Cpu, ChevronDown, ChevronUp, TrendingUp, Sparkles } from 'lucide-react';
import { CROSS_SUBJECT_LIST } from '../../data/workshopData';
import { CrossSubjectData } from '../../types';
import { GraphReadingLab } from '../interactive/GraphReadingLab';

interface Modul06CrossSubjectLabProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Modul06CrossSubjectLab: React.FC<Modul06CrossSubjectLabProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
}) => {
  const [viewMode, setViewMode] = useState<'subjects' | 'graph-lab'>('subjects');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('bahasa-indonesia');
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(null);

  const activeSubject: CrossSubjectData =
    CROSS_SUBJECT_LIST.find((s) => s.id === selectedSubjectId) || CROSS_SUBJECT_LIST[0];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Compass className="w-4 h-4 text-[#E6A637]" />
            MODUL 06 · LABORATORIUM EKSPLORASI MULTI-DISIPLIN
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Numerasi Lintas Mata Pelajaran (9 Rumpun Mapel SMP)
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-3xl leading-relaxed">
            Tujuan: Menemukan dan membuktikan titik temu penguatan numerasi dalam seluruh mata pelajaran SMP,
            serta melatih kemampuan membaca kurva grafik kontinu secara interaktif.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-300 shrink-0">
          <button
            onClick={() => setViewMode('subjects')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
              viewMode === 'subjects'
                ? 'bg-[#19304E] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-[#E6A637]" />
            <span>9 Rumpun Mapel</span>
          </button>
          <button
            onClick={() => setViewMode('graph-lab')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
              viewMode === 'graph-lab'
                ? 'bg-[#00848B] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#E6A637]" />
            <span>Lab Membaca Grafik</span>
          </button>
        </div>
      </div>

      {/* Render Graph Reading Lab or 9 Subjects Grid */}
      {viewMode === 'graph-lab' ? (
        <GraphReadingLab />
      ) : (
        <>

      {/* 9 Subject Responsive Grid (Zero Horizontal Scroll!) */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-2.5">
        {CROSS_SUBJECT_LIST.map((subj) => {
          const isSelected = subj.id === selectedSubjectId;
          return (
            <button
              key={subj.id}
              onClick={() => {
                setSelectedSubjectId(subj.id);
                setOpenQuestionIdx(null);
              }}
              className={`p-3 sm:p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-1.5 min-h-[70px] ${
                isSelected
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-lg scale-[1.03] ring-4 ring-[#00848B]/30'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-[#00848B] hover:bg-slate-50'
              }`}
            >
              <span className={isSelected ? 'text-[#E6A637]' : 'text-[#00848B]'}>
                {getSubjectIcon(subj.iconName)}
              </span>
              <span className="leading-tight line-clamp-2">{subj.subjectName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Subject Showcase Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        {/* Subject Header & Topic Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                MATA PELAJARAN: {activeSubject.subjectName.toUpperCase()}
              </span>
              <span className="bg-teal-50 text-[#00848B] text-xs font-extrabold px-3 py-1 rounded-full border border-teal-300">
                Konteks: {activeSubject.contextType}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
              Topik: {activeSubject.topic}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
              Domain Kurikulum: {activeSubject.curriculumDomain}
            </p>
          </div>

          <div className="bg-[#EFF5F8] p-4 rounded-2xl border-2 border-[#B8D5E5] text-xs sm:text-sm max-w-md">
            <strong className="text-[#19304E] block mb-1 font-extrabold">Konten Matematika yang Terintegrasi:</strong>
            <span className="text-slate-700 font-medium leading-relaxed">{activeSubject.mathContent}</span>
          </div>
        </div>

        {/* Stimulus & Data Points Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Narrative Stimulus */}
          <div className="lg:col-span-7 bg-amber-50 p-6 sm:p-7 rounded-3xl border-2 border-amber-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 block mb-1">
                STIMULUS KONTEKSTUAL RIIL
              </span>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-2">
                {activeSubject.stimulusTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                "{activeSubject.stimulusDescription}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200 text-xs sm:text-sm text-amber-900 font-bold">
              Stimulus berbasis data autentik lingkungan sekolah dan masyarakat.
            </div>
          </div>

          {/* Quantitative Data Points */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B] block">
              DATA KUANTITATIF EKSTRAK
            </span>
            <div className="space-y-2.5">
              {activeSubject.dataPoints.map((dp, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-white border-2 border-slate-200 text-xs sm:text-sm">
                  <span className="text-slate-700 font-bold">{dp.label}:</span>
                  <strong className="font-mono text-base font-extrabold text-[#19304E] bg-slate-50 px-3 py-1 rounded-xl border border-slate-300">
                    {dp.value} {dp.unit || ''}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Cognitive Level Questions Accordion */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                PERTANYAAN PENGUATAN NUMERASI (3 LEVEL BERJENJANG)
              </span>
              <h3 className="font-extrabold text-lg sm:text-xl text-[#19304E] font-heading">
                Dari Memahami Data Menuju Penalaran Keputusan
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              Sentuh pertanyaan untuk membuka petunjuk & pembahasan
            </span>
          </div>

          <div className="space-y-3.5">
            {activeSubject.questions.map((q, idx) => {
              const isOpen = openQuestionIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border-2 border-slate-300 overflow-hidden transition-all bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenQuestionIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-xs font-mono font-extrabold px-3 py-1.5 rounded-xl uppercase shrink-0 ${
                          q.level === 'Memahami'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : q.level === 'Menerapkan'
                            ? 'bg-amber-100 text-amber-950 border border-amber-300'
                            : 'bg-rose-100 text-rose-950 border border-rose-300'
                        }`}
                      >
                        {q.level}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {q.question}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-teal-50/60 border-t-2 border-slate-200 space-y-3 text-xs sm:text-sm">
                      <div className="flex items-start gap-2.5 text-slate-700">
                        <strong className="text-[#00848B] shrink-0 font-extrabold">Petunjuk Berpikir:</strong>
                        <span className="leading-relaxed">{q.hint}</span>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border-2 border-teal-200 text-slate-900 leading-relaxed shadow-xs">
                        <strong className="text-emerald-800 block mb-1 font-extrabold">Contoh Respon & Pembahasan:</strong>
                        {q.sampleAnswer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Activity & Competence Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-6 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5] space-y-1.5 text-xs sm:text-sm">
            <span className="font-extrabold text-[#19304E] block uppercase tracking-wider text-xs">
              Contoh Aktivitas Siswa di Kelas:
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">{activeSubject.studentActivity}</p>
          </div>

          <div className="p-6 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-1.5 text-xs sm:text-sm">
            <span className="font-extrabold text-[#00848B] block uppercase tracking-wider text-xs">
              Capaian Kompetensi Numerasi:
            </span>
            <p className="text-slate-900 leading-relaxed font-medium">{activeSubject.numeracyCompetence}</p>
          </div>
        </div>
      </div>
      </>
      )}

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 05</span>
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
            <span>{isCompleted ? 'Modul 06 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 07: Design Studio</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
