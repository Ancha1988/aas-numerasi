import React, { useState } from 'react';
import { X, Sparkles, BarChart3, PieChart as PieChartIcon, TrendingUp, Move, Link2, Droplets, BookOpen, Layers } from 'lucide-react';
import { DragDropCategorizer } from './interactive/DragDropCategorizer';
import { ConceptMatcher } from './interactive/ConceptMatcher';
import { InteractiveBarSimulation } from './interactive/InteractiveBarSimulation';
import { InteractivePieSimulation } from './interactive/InteractivePieSimulation';
import { GraphReadingLab } from './interactive/GraphReadingLab';
import { ContextualProblemChallenge } from './interactive/ContextualProblemChallenge';

interface InteractiveLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'dragdrop' | 'matching' | 'bar' | 'pie' | 'graph' | 'challenge';
}

export const InteractiveLabModal: React.FC<InteractiveLabModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'bar',
}) => {
  const [activeTab, setActiveTab] = useState<'dragdrop' | 'matching' | 'bar' | 'pie' | 'graph' | 'challenge'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#EFF5F8] w-full max-w-[1720px] max-h-[94vh] rounded-3xl border-3 border-[#244369] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-[#19304E] text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-[#244369] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00848B] to-[#E6A637] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-[#00848B] text-white">
                  PID INTERACTIVE SANDBOX
                </span>
                <span className="text-xs font-extrabold text-[#E6A637] uppercase tracking-wider">
                  8 FITUR INTERAKTIF & PEMBAHASAN PROSES BERPIKIR
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white mt-0.5">
                Laboratorium Simulasi & Aktivitas Interaktif Numerasi SMP
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-[#0B1728] hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer border border-[#244369] active:scale-95 shrink-0"
            title="Tutup Laboratorium"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selector Ribbon - Large Touch Targets for PID */}
        <div className="bg-white border-b-2 border-slate-300 p-2 sm:p-3 shrink-0 overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveTab('bar')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'bar'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#E6A637]" />
              <span className="line-clamp-1">1. Simulasi Diagram Batang</span>
            </button>

            <button
              onClick={() => setActiveTab('pie')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'pie'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <PieChartIcon className="w-4 h-4 text-[#00848B]" />
              <span className="line-clamp-1">2. Simulasi Diagram Lingkaran</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'graph'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#00848B]" />
              <span className="line-clamp-1">3. Lab Membaca Grafik</span>
            </button>

            <button
              onClick={() => setActiveTab('dragdrop')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'dragdrop'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <Move className="w-4 h-4 text-[#E6A637]" />
              <span className="line-clamp-1">4. Drag & Drop Domain AKM</span>
            </button>

            <button
              onClick={() => setActiveTab('matching')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'matching'
                  ? 'bg-[#19304E] text-white border-[#19304E] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <Link2 className="w-4 h-4 text-[#00848B]" />
              <span className="line-clamp-1">5. Mencocokkan Konsep</span>
            </button>

            <button
              onClick={() => setActiveTab('challenge')}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all flex items-center justify-center gap-2 border-2 ${
                activeTab === 'challenge'
                  ? 'bg-[#00848B] text-white border-[#00848B] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-[#00848B]'
              }`}
            >
              <Droplets className="w-4 h-4 text-[#6CE5EC]" />
              <span className="line-clamp-1">6. Kasus Nyata: Audit Air</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'bar' && <InteractiveBarSimulation />}
          {activeTab === 'pie' && <InteractivePieSimulation />}
          {activeTab === 'graph' && <GraphReadingLab />}
          {activeTab === 'dragdrop' && <DragDropCategorizer />}
          {activeTab === 'matching' && <ConceptMatcher />}
          {activeTab === 'challenge' && <ContextualProblemChallenge />}
        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 border-t-2 border-slate-300 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Setiap aktivitas dilengkapi umpan balik otomatis &amp; pembahasan proses berpikir numerasi.</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#19304E] hover:bg-[#244369] text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer active:scale-95 transition-all"
          >
            Tutup Laboratorium
          </button>
        </div>
      </div>
    </div>
  );
};
