import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, ShieldCheck, User, Monitor, Download, BookOpen, Sparkles, BarChart3 } from 'lucide-react';
import { WorkshopMode } from '../types';

interface HeaderProps {
  currentMode: WorkshopMode;
  onToggleMode: (mode: WorkshopMode) => void;
  onOpenPIDGuide: () => void;
  onOpenExportCenter: () => void;
  onOpenFacilitatorGuide: () => void;
  onOpenInteractiveLab?: () => void;
  onOpenEvaluationDashboard?: () => void;
  activeModuleTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onToggleMode,
  onOpenPIDGuide,
  onOpenExportCenter,
  onOpenFacilitatorGuide,
  onOpenInteractiveLab,
  onOpenEvaluationDashboard,
  activeModuleTitle,
}) => {
  // 120 minutes default = 7200 seconds
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const saved = localStorage.getItem('numeracylab_timer_seconds');
    return saved ? parseInt(saved, 10) : 120 * 60;
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          const next = prev - 1;
          localStorage.setItem('numeracylab_timer_seconds', next.toString());
          return next;
        });
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(120 * 60);
    localStorage.setItem('numeracylab_timer_seconds', (120 * 60).toString());
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLowTime = secondsLeft < 10 * 60; // under 10 minutes warning

  return (
    <header className="bg-[#19304E] text-white border-b-2 border-[#244369] sticky top-0 z-40 shadow-lg select-none">
      <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#00848B] to-[#00A4AD] flex items-center justify-center font-bold text-white shadow-md text-2xl font-heading tracking-wider border border-[#6CE5EC]/30">
            NL
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white drop-shadow-xs">
                NUMERACY LAB <span className="text-[#E6A637]">SMP</span>
              </span>
              <span className="hidden xl:inline-block text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-[#00848B]/40 text-[#6CE5EC] border border-[#00848B]/60 shadow-xs">
                120 MENIT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium hidden md:block tracking-wide">
              EXPLORE · THINK · SOLVE · CREATE · REFLECT
            </p>
          </div>
        </div>

        {/* Center / Timer Zone (Large PID High-Contrast Display) */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[#0B1728] px-4 sm:px-5 py-2.5 rounded-2xl border-2 border-[#244369] shadow-inner">
          <Clock className={`w-7 h-7 shrink-0 ${isLowTime ? 'text-amber-400 animate-pulse' : 'text-[#00848B]'}`} />
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300 leading-none">
              Workshop Timer
            </span>
            <span
              className={`font-mono text-2xl sm:text-3xl font-extrabold tracking-wider leading-tight tabular-nums ${
                isLowTime ? 'text-amber-300' : 'text-white'
              }`}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-1 sm:ml-2 border-l border-[#244369] pl-3">
            <button
              onClick={toggleTimer}
              title={isRunning ? 'Jeda Timer' : 'Jalankan Timer'}
              className="w-11 h-11 rounded-xl bg-[#19304E] hover:bg-[#00848B] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={resetTimer}
              title="Reset ke 120 Menit"
              className="w-11 h-11 rounded-xl bg-[#19304E] hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Tools Zone (Enlarged Ergonomic Touch Buttons) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0B1728] p-1.5 rounded-2xl border-2 border-[#244369]">
            <button
              onClick={() => onToggleMode('participant')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentMode === 'participant'
                  ? 'bg-[#00848B] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Peserta</span>
            </button>
            <button
              onClick={() => onToggleMode('facilitator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentMode === 'facilitator'
                  ? 'bg-[#E6A637] text-[#19304E] font-extrabold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Fasilitator</span>
            </button>
          </div>

          {/* Facilitator Guide Button */}
          {currentMode === 'facilitator' && (
            <button
              onClick={onOpenFacilitatorGuide}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#E6A637]/20 border-2 border-[#E6A637]/60 text-[#F5C26B] hover:bg-[#E6A637]/30 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Buka Panduan Fasilitator & Kunci Jawaban"
            >
              <BookOpen className="w-4 h-4 text-[#E6A637]" />
              <span className="hidden lg:inline">Panduan Fasilitator</span>
            </button>
          )}

          {/* Interactive Simulation Lab Button */}
          {onOpenInteractiveLab && (
            <button
              onClick={onOpenInteractiveLab}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#00848B] to-[#00A4AD] hover:from-[#009da5] hover:to-[#00b5bf] text-white text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-md active:scale-95"
              title="Buka Laboratorium Interaktif & Simulasi Numerasi"
            >
              <Sparkles className="w-4 h-4 text-[#E6A637]" />
              <span className="hidden md:inline">Lab Interaktif</span>
            </button>
          )}

          {/* PID Helper Button */}
          <button
            onClick={onOpenPIDGuide}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#0B1728] hover:bg-[#244369] border-2 border-[#244369] text-slate-100 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Petunjuk Operasional PID (Papan Interaktif Digital)"
          >
            <Monitor className="w-4 h-4 text-[#00848B]" />
            <span className="hidden md:inline">Panduan PID</span>
          </button>

          {/* Evaluation Dashboard Button */}
          {onOpenEvaluationDashboard && (
            <button
              onClick={onOpenEvaluationDashboard}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer active:scale-95"
              title="Buka Dashboard Evaluasi & Ringkasan Hasil Workshop"
            >
              <BarChart3 className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Evaluasi Workshop</span>
            </button>
          )}

          {/* Export Button */}
          <button
            onClick={onOpenExportCenter}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer active:scale-95"
            title="Ekspor & Cetak Berkas Workshop"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Ekspor & Cetak</span>
          </button>
        </div>
      </div>
    </header>
  );
};
