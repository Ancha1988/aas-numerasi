import React, { useState } from 'react';
import { BarChart3, RotateCcw, KeyRound, Sparkles, CheckCircle2, AlertTriangle, ArrowUpDown, Sliders } from 'lucide-react';

interface FoodCategory {
  id: string;
  name: string;
  defaultPortions: number;
  color: string;
  healthyTargetPercent: number; // e.g. fruit >= 30%, instant noodles <= 15%
  isUpperLimit: boolean; // true if upper limit, false if minimum target
  desc: string;
}

const CATEGORIES: FoodCategory[] = [
  {
    id: 'nasi',
    name: 'Nasi dan Lauk Pauk',
    defaultPortions: 80,
    color: '#19304E',
    healthyTargetPercent: 40,
    isUpperLimit: false,
    desc: 'Menu utama bergizi seimbang dengan karbohidrat dan protein lengkap',
  },
  {
    id: 'mi',
    name: 'Mi Instan Siap Saji',
    defaultPortions: 60,
    color: '#DC2626',
    healthyTargetPercent: 15,
    isUpperLimit: true,
    desc: 'Tinggi natrium, pengawet, dan kalori kosong tanpa serat',
  },
  {
    id: 'camilan',
    name: 'Makanan Ringan & Gorengan',
    defaultPortions: 40,
    color: '#D97706',
    healthyTargetPercent: 15,
    isUpperLimit: true,
    desc: 'Tinggi lemak jenuh dan garam berlebih yang memicu kantuk belajar',
  },
  {
    id: 'buah',
    name: 'Buah-buahan Segar',
    defaultPortions: 20,
    color: '#00848B',
    healthyTargetPercent: 30,
    isUpperLimit: false,
    desc: 'Kaya serat, mikronutrien, dan vitamin alami untuk daya konsentrasi otak',
  },
];

export const InteractiveBarSimulation: React.FC = () => {
  const [portions, setPortions] = useState<Record<string, number>>({
    nasi: 80,
    mi: 60,
    camilan: 40,
    buah: 20,
  });

  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Handlers for sliders
  const handleSliderChange = (id: string, val: number) => {
    setPortions((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(150, val)),
    }));
  };

  const handleStep = (id: string, delta: number) => {
    setPortions((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(150, (prev[id] || 0) + delta)),
    }));
  };

  // Preset Configurations
  const applyPreset = (preset: 'baseline' | 'intervensi' | 'ideal') => {
    if (preset === 'baseline') {
      setPortions({ nasi: 80, mi: 60, camilan: 40, buah: 20 });
    } else if (preset === 'intervensi') {
      setPortions({ nasi: 90, mi: 30, camilan: 30, buah: 50 });
    } else if (preset === 'ideal') {
      setPortions({ nasi: 85, mi: 20, camilan: 25, buah: 70 });
    }
  };

  // Calculations
  const totalPortions = Object.values(portions).reduce((sum, val) => sum + val, 0);

  // Maximum portion for relative bar scaling
  const maxPortion = Math.max(1, ...Object.values(portions), 100);

  // Health checks
  const fruitPercent = totalPortions > 0 ? ((portions.buah || 0) / totalPortions) * 100 : 0;
  const noodlePercent = totalPortions > 0 ? ((portions.mi || 0) / totalPortions) * 100 : 0;
  const snackPercent = totalPortions > 0 ? ((portions.camilan || 0) / totalPortions) * 100 : 0;

  const isFruitTargetMet = fruitPercent >= 30;
  const isNoodleControlled = noodlePercent <= 15;
  const isSnackControlled = snackPercent <= 20;
  const isCanteenHealthy = isFruitTargetMet && isNoodleControlled && isSnackControlled;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 4 · SIMULASI DIAGRAM BATANG DINAMIS
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Simulasi Portofolio Menu Kantin Sehat & Audit Gizi Berkelanjutan
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Geser slider porsi untuk melihat pergeseran tinggi batang diagram, perubahan proporsi persentase otomatis,
            dan kepatuhan terhadap Standar Kantin Sehat SMP.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => applyPreset('baseline')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kondisi Awal</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Analisis' : 'Analisis Berpikir Numerasi'}</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Switcher */}
      <div className="bg-[#EFF5F8] p-4 sm:p-5 rounded-2xl border-2 border-[#B8D5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#19304E] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#00848B]" />
          Uji Skenario Intervensi Cepat:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('baseline')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            Skenario 1: Data Eksisting (200 Porsi)
          </button>
          <button
            onClick={() => applyPreset('intervensi')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-teal-300 text-teal-900 hover:bg-teal-50 cursor-pointer"
          >
            Skenario 2: Transisi Sehat (200 Porsi)
          </button>
          <button
            onClick={() => applyPreset('ideal')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00848B] text-white hover:bg-[#009da5] cursor-pointer shadow-xs"
          >
            Skenario 3: Kantin Gizi Optimal (200 Porsi)
          </button>
        </div>
      </div>

      {/* Main Simulation Layout: Left Controls + Right Dynamic SVG Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Sliders & Steppers (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                PENGATURAN PORSI HARIAN
              </span>
              <span className="text-xs font-mono font-extrabold text-[#19304E] bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                Total: {totalPortions} Porsi
              </span>
            </div>

            {CATEGORIES.map((cat) => {
              const currentVal = portions[cat.id] || 0;
              const percent = totalPortions > 0 ? (currentVal / totalPortions) * 100 : 0;

              return (
                <div key={cat.id} className="bg-white p-4 rounded-2xl border-2 border-slate-200 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </span>
                    <span className="font-mono font-extrabold text-[#19304E] text-base">
                      {currentVal} <span className="text-xs text-slate-500 font-sans">porsi ({percent.toFixed(1)}%)</span>
                    </span>
                  </div>

                  {/* Stepper + Slider */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleStep(cat.id, -5)}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold text-slate-800 flex items-center justify-center text-lg active:scale-95 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={120}
                      step={5}
                      value={currentVal}
                      onChange={(e) => handleSliderChange(cat.id, Number(e.target.value))}
                      className="w-full accent-[#00848B] h-2.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => handleStep(cat.id, 5)}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold text-slate-800 flex items-center justify-center text-lg active:scale-95 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Target Summary Card */}
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 text-xs space-y-1.5">
            <span className="font-extrabold text-[#19304E] block">Target Standar Gizi Sekolah:</span>
            <div className="flex items-center justify-between">
              <span>Buah-buahan:</span>
              <strong className={isFruitTargetMet ? 'text-emerald-700' : 'text-rose-700'}>
                {fruitPercent.toFixed(1)}% / Min 30% {isFruitTargetMet ? '✓' : '✗'}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Mi Instan:</span>
              <strong className={isNoodleControlled ? 'text-emerald-700' : 'text-rose-700'}>
                {noodlePercent.toFixed(1)}% / Maks 15% {isNoodleControlled ? '✓' : '✗'}
              </strong>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Bar Chart Visual Area (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#19304E] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00848B]" />
                VISUALISASI DIAGRAM BATANG REAL-TIME
              </span>
              <span className="text-xs font-bold text-slate-500">Skala Dinamis Otomatis</span>
            </div>

            {/* Vertical Bars SVG Container */}
            <div className="pt-6 pb-2 min-h-[260px] flex items-end justify-around gap-4 border-b-2 border-slate-300">
              {CATEGORIES.map((cat) => {
                const currentVal = portions[cat.id] || 0;
                const percent = totalPortions > 0 ? (currentVal / totalPortions) * 100 : 0;
                // Height percentage normalized relative to max allowable or current highest
                const barHeightPercent = Math.min(100, (currentVal / Math.max(maxPortion, 100)) * 100);

                return (
                  <div key={cat.id} className="flex-1 flex flex-col items-center justify-end h-64 group">
                    {/* Portion value on top of bar */}
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#19304E] mb-1.5 transition-transform group-hover:scale-110">
                      {currentVal}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 mb-1">
                      {percent.toFixed(0)}%
                    </span>

                    {/* Bar graphic */}
                    <div className="w-full max-w-[70px] bg-slate-100 rounded-t-2xl h-full flex items-end overflow-hidden shadow-inner">
                      <div
                        className="w-full rounded-t-2xl transition-all duration-300 ease-out shadow-sm"
                        style={{
                          height: `${Math.max(6, barHeightPercent)}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>

                    {/* Label underneath */}
                    <div className="mt-3 text-center">
                      <span className="text-xs font-extrabold text-slate-800 block line-clamp-1">
                        {cat.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Health Status Indicator */}
          <div
            className={`p-5 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
              isCanteenHealthy
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            {isCanteenHealthy ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isCanteenHealthy
                  ? 'Status Kantin: SEHAT & MEMENUHI STANDAR GIZI SMP'
                  : 'Status Kantin: BELUM MEMENUHI AMBANG BATAS IDEAL'}
              </h4>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90 font-medium">
                {isCanteenHealthy
                  ? `Porsi buah mencapai ${fruitPercent.toFixed(1)}% (≥ 30%) dan konsumsi mi instan terkontrol di angka ${noodlePercent.toFixed(1)}% (≤ 15%). Sekolah siap mendeklarasikan program Kantin Sehat Adiwiyata!`
                  : `Proporsi buah saat ini ${fruitPercent.toFixed(1)}% (target ≥ 30%). Diperlukan penambahan porsi buah dan substitusi bertahap pada mi instan (${noodlePercent.toFixed(1)}%).`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thought Process Explanation Panel */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Proses Berpikir Numerasi: Bagaimana Membaca dan Memanipulasi Diagram Batang?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">1. Relativitas vs Nilai Mutlak:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Menambah porsi nasi tidak hanya menaikkan tinggi batang nasi, namun otomatis menurunkan persentase bagian menu lainnya karena penyebut total porsi membesar (Persen = Porsi / Total × 100%).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">2. Skala Sumbu Vertikal:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Dalam diagram batang yang baik, titik dasar sumbu vertikal wajib dimulai dari 0 agar perbedaan visual tinggi batang secara jujur merepresentasikan rasio perbandingan proporsional.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">3. Pengambilan Keputusan Nyata:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Bukan sekadar menggambar balok, numerasi menuntun guru dan siswa melihat bahwa 20 porsi buah vs 60 porsi mi instan adalah kesenjangan 1:3 yang berdampak langsung pada stamina belajar siswa.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">4. Rekomendasi Solutif:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Menerapkan sistem bundling "Nasi + Sayur + Semangka Segar" agar target 30% buah tercapai tanpa menurunkan pendapatan omzet pemilik tenant kantin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
