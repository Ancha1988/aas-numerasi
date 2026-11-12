import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Clock, HelpCircle, BookOpen, KeyRound, Compass, RotateCcw, AlertTriangle } from 'lucide-react';
import { FACILITATOR_GUIDES } from '../data/facilitatorData';
import { WORKSHOP_MODULES } from '../data/workshopData';
import { Storage } from '../utils/storage';
import { ModuleId } from '../types';

interface FacilitatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModuleId: ModuleId;
  onJumpModule: (id: ModuleId) => void;
}

export const FacilitatorDrawer: React.FC<FacilitatorDrawerProps> = ({
  isOpen,
  onClose,
  activeModuleId,
  onJumpModule,
}) => {
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  if (!isOpen) return null;

  const guide = FACILITATOR_GUIDES[activeModuleId] || FACILITATOR_GUIDES['welcome'];

  const handleResetSession = () => {
    Storage.resetAll();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l-2 border-slate-300 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#19304E] text-white p-6 flex items-center justify-between border-b-2 border-[#244369]">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#E6A637] text-[#19304E] shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                PANDUAN FASILITATOR WORKSHOP
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {guide.moduleCode}: {guide.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-[#244369] text-slate-200 hover:text-white transition-colors cursor-pointer active:scale-95 border border-white/20"
            title="Tutup Panduan"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-800">
          {/* Quick Module Jump for Facilitator */}
          <div className="bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-extrabold text-[#19304E] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#00848B]" />
                Navigasi Cepat Fasilitator (Pilih Modul)
              </span>
              <span className="text-[11px] font-bold text-slate-500">9 Modul Workshop</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {WORKSHOP_MODULES.map((m) => {
                const isActive = m.id === activeModuleId;
                return (
                  <button
                    key={m.id}
                    onClick={() => onJumpModule(m.id)}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#19304E] text-white border-[#19304E] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-extrabold opacity-75">{m.code}</div>
                    <div className="truncate font-semibold">{m.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Duration & Role */}
          <div className="bg-[#EFF5F8] p-5 rounded-2xl border-2 border-[#B8D5E5] space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#19304E]">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00848B]" />
                Alokasi Waktu yang Dianjurkan
              </span>
              <span className="font-mono bg-white px-3 py-1 rounded-xl border border-slate-300 shadow-xs">
                {guide.targetDuration}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <strong className="text-[#19304E]">Peran Fasilitator:</strong> {guide.facilitatorRole}
            </p>
          </div>

          {/* Pedagogical Key */}
          <div className="border-2 border-teal-300 bg-teal-50/80 p-5 sm:p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-[#00848B] font-extrabold text-xs sm:text-sm uppercase tracking-wide mb-1.5">
              <BookOpen className="w-5 h-5" />
              Kunci Pedagogis & Esensi Numerasi
            </div>
            <p className="text-slate-900 font-bold leading-relaxed text-sm sm:text-base">
              {guide.pedagogicalKey}
            </p>
          </div>

          {/* Suggested Opening Script */}
          <div className="border-2 border-amber-300 bg-amber-50/80 p-5 sm:p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs sm:text-sm uppercase tracking-wide mb-2">
              <HelpCircle className="w-5 h-5 text-[#E6A637]" />
              Inspirasi Pemantik / Script Fasilitasi
            </div>
            <p className="text-slate-800 italic bg-white p-4 rounded-xl border border-amber-200 text-xs sm:text-sm leading-relaxed font-medium">
              {guide.suggestedOpeningScript}
            </p>
          </div>

          {/* Facilitator Checklist */}
          <div>
            <h4 className="font-extrabold text-[#19304E] mb-3 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-[#00848B]" />
              Checklist Tindakan Fasilitator
            </h4>
            <div className="space-y-2.5">
              {guide.facilitatorChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-[#00848B] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-snug font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Key if available */}
          {guide.answerKey && (
            <div className="border-2 border-emerald-300 bg-emerald-50/80 p-5 sm:p-6 rounded-2xl space-y-3.5">
              <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                <KeyRound className="w-5 h-5 text-emerald-700" />
                {guide.answerKey.title}
              </div>
              <div className="space-y-3">
                {guide.answerKey.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-emerald-200 space-y-1.5 shadow-xs">
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900">{item.question}</p>
                    <p className="text-xs sm:text-sm text-emerald-900 font-extrabold">Kunci: {item.answer}</p>
                    <p className="text-xs text-slate-600 italic">
                      Tinjauan Pedagogis: {item.pedagogicalInsight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Reset Workshop Data */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-xs sm:text-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Reset Data Sesi Workshop
              </span>
            </div>
            <p className="text-rose-700 leading-snug">
              Kembalikan seluruh data sticky note, kuis, rancangan, dan skor ke setelan awal workshop.
            </p>
            {confirmReset ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleResetSession}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-extrabold cursor-pointer transition-colors shadow-xs"
                >
                  Ya, Reset Semua Data
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl font-bold cursor-pointer transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Data Sesi
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-slate-600">Mode Fasilitator Aktif</span>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#19304E] hover:bg-[#244369] text-white rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer active:scale-95 shadow"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
