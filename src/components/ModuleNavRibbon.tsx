import React from 'react';
import { ModuleId, ModuleMetadata } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface ModuleNavRibbonProps {
  modules: ModuleMetadata[];
  activeModuleId: ModuleId;
  completedModules: string[];
  onSelectModule: (id: ModuleId) => void;
}

export const ModuleNavRibbon: React.FC<ModuleNavRibbonProps> = ({
  modules,
  activeModuleId,
  completedModules,
  onSelectModule,
}) => {
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="bg-white border-b-2 border-slate-200 shadow-xs select-none">
      <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Progress summary bar with high contrast */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2.5 text-[#19304E]">
            <span className="font-extrabold uppercase tracking-wide text-[#00848B]">ALUR 9 MODUL WORKSHOP:</span>
            <span className="text-slate-600 font-bold">
              {completedCount} dari {modules.length} Selesai ({progressPercent}%)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-44 sm:w-64 bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#00848B] via-[#00A4AD] to-[#E6A637] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-[#19304E] text-sm tabular-nums">{progressPercent}%</span>
          </div>
        </div>

        {/* 9 Modules Grid — ZERO Horizontal Scrolling on 1920x1080 and wide PID displays */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-2.5">
          {modules.map((m) => {
            const isActive = m.id === activeModuleId;
            const isCompleted = completedModules.includes(m.id);

            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`min-h-[72px] p-2.5 sm:p-3 rounded-2xl border-2 transition-all text-left relative cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#19304E] text-white border-[#19304E] shadow-lg ring-4 ring-[#00848B]/30 scale-[1.02] z-10'
                    : isCompleted
                    ? 'bg-[#EFF5F8] text-[#19304E] border-[#A8CCE0] hover:bg-[#E2EDF3] hover:border-[#00848B]'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full mb-1">
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider ${
                      isActive ? 'text-[#E6A637]' : isCompleted ? 'text-[#00848B]' : 'text-slate-600'
                    }`}
                  >
                    {m.code}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#E6A637]' : 'text-[#00848B]'
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#244369] text-slate-100'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {m.durationMinutes}m
                    </span>
                  )}
                </div>

                <div
                  className={`text-xs sm:text-[13px] font-extrabold leading-snug line-clamp-2 ${
                    isActive ? 'text-white' : 'text-slate-900'
                  }`}
                  title={m.title}
                >
                  {m.title}
                </div>

                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-8 h-1.5 bg-[#E6A637] rounded-full shadow" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
