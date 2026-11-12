import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, KeyRound, PieChart as PieChartIcon, BarChart3, Utensils, Sliders, Droplets, Sparkles } from 'lucide-react';
import { InteractiveBarSimulation } from '../interactive/InteractiveBarSimulation';
import { InteractivePieSimulation } from '../interactive/InteractivePieSimulation';
import { ContextualProblemChallenge } from '../interactive/ContextualProblemChallenge';

interface Modul04ChallengeProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const CANTEEN_DATA = [
  { label: 'Nasi dan lauk', portions: 80, percentage: 40, color: '#19304E' },
  { label: 'Mi instan', portions: 60, percentage: 30, color: '#DC2626' },
  { label: 'Makanan ringan', portions: 40, percentage: 20, color: '#D97706' },
  { label: 'Buah-buahan', portions: 20, percentage: 10, color: '#00848B' },
];

export const Modul04Challenge: React.FC<Modul04ChallengeProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
}) => {
  // Active sub-activity tab
  const [activeActivityTab, setActiveActivityTab] = useState<'kantin' | 'sim-bar' | 'sim-pie' | 'audit-air'>('kantin');

  // Chart visual type toggle
  const [chartType, setChartType] = useState<'bar' | 'donut'>('bar');
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  // Challenge answers
  const [ans1, setAns1] = useState<string>('');
  const [ans2, setAns2] = useState<string>('');
  const [ans3, setAns3] = useState<string>('');
  const [ans4, setAns4] = useState<string>('');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Check correctness with flexible input parsing (numbers, percent, text)
  const normalizedAns1 = ans1.trim().toLowerCase().replace('%', '').replace('persen', '').trim();
  const isAns1Correct =
    normalizedAns1 === '10' ||
    normalizedAns1 === '0.1' ||
    normalizedAns1 === '10/100' ||
    normalizedAns1.includes('10') ||
    normalizedAns1.includes('sepuluh');

  const isAns2Correct = ans2.toLowerCase().includes('nasi');

  const normalizedAns3 = ans3.trim().toLowerCase().replace('porsi', '').trim();
  const isAns3Correct =
    normalizedAns3 === '60' ||
    normalizedAns3.includes('60') ||
    normalizedAns3.includes('enam puluh');

  const isAns4Filled = ans4.trim().length >= 10;

  const handleEvaluate = () => {
    setHasEvaluated(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Utensils className="w-4 h-4 text-[#E6A637]" />
            MODUL 04 · TANTANGAN NUMERASI KONTEKSTUAL & SIMULASI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Tantangan Numerasi: Kantin Sehat & Laboratorium Simulasi
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-2xl leading-relaxed">
            Tujuan: Menganalisis data empiris kantin sekolah, menguji simulasi diagram batang & lingkaran secara dinamis,
            dan merumuskan kebijakan gizi serta konservasi berbasis bukti kuantitatif.
          </p>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <KeyRound className="w-5 h-5" />
          <span>{showExplanation ? 'Tutup Pembahasan' : 'Lihat Pembahasan Lengkap'}</span>
        </button>
      </div>

      {/* 4 Interactive Activity Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 p-2 bg-slate-200/70 rounded-2xl border border-slate-300">
        <button
          onClick={() => setActiveActivityTab('kantin')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
            activeActivityTab === 'kantin'
              ? 'bg-[#19304E] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          <Utensils className="w-4 h-4 text-[#E6A637]" />
          <span>1. Tantangan Kantin Sehat (Data Riil)</span>
        </button>

        <button
          onClick={() => setActiveActivityTab('sim-bar')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
            activeActivityTab === 'sim-bar'
              ? 'bg-[#00848B] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#00848B] group-hover:text-white" />
          <span>2. Simulasi Diagram Batang Dinamis</span>
        </button>

        <button
          onClick={() => setActiveActivityTab('sim-pie')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
            activeActivityTab === 'sim-pie'
              ? 'bg-[#00848B] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          <PieChartIcon className="w-4 h-4 text-[#00848B]" />
          <span>3. Simulasi Diagram Lingkaran (Sudut 360°)</span>
        </button>

        <button
          onClick={() => setActiveActivityTab('audit-air')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
            activeActivityTab === 'audit-air'
              ? 'bg-[#19304E] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          <Droplets className="w-4 h-4 text-[#6CE5EC]" />
          <span>4. Tantangan Multi-Tahap: Audit Air</span>
        </button>
      </div>

      {/* Render Active Sub-Activity */}
      {activeActivityTab === 'sim-bar' && <InteractiveBarSimulation />}
      {activeActivityTab === 'sim-pie' && <InteractivePieSimulation />}
      {activeActivityTab === 'audit-air' && <ContextualProblemChallenge />}

      {activeActivityTab === 'kantin' && (
        <>

      {/* Main Grid: Data & Visualization + Canteen Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive Charts & Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                  DISTRIBUSI DATA HARIAN KANTIN
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-[#19304E] font-heading">
                  Total Konsumsi: 200 Porsi per Hari
                </h3>
              </div>

              {/* Chart Toggle - Ergonomic Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300">
                <button
                  onClick={() => setChartType('bar')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                    chartType === 'bar' ? 'bg-[#19304E] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Diagram Batang</span>
                </button>
                <button
                  onClick={() => setChartType('donut')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                    chartType === 'donut' ? 'bg-[#19304E] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-4 h-4" />
                  <span>Diagram Lingkaran</span>
                </button>
              </div>
            </div>

            {/* Visual Chart Area */}
            <div className="py-6 min-h-[240px] flex items-center justify-center">
              {chartType === 'bar' ? (
                <div className="w-full space-y-4">
                  {CANTEEN_DATA.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => setActiveSegment(item.label)}
                      className={`p-3 sm:p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                        activeSegment === item.label
                          ? 'bg-[#EFF5F8] border-[#00848B] shadow-sm'
                          : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-800 mb-2">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-900 font-extrabold">{item.label}</span>
                        </span>
                        <span className="font-mono text-sm sm:text-base font-extrabold text-[#19304E]">
                          {item.portions} porsi ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden shadow-inner">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.portions / 80) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Donut Chart SVG */
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <svg className="w-52 h-52 -rotate-90 shrink-0" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#19304E"
                      strokeWidth="20"
                      strokeDasharray="88 132"
                      strokeDashoffset="0"
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => setActiveSegment('Nasi dan lauk')}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#DC2626"
                      strokeWidth="20"
                      strokeDasharray="66 154"
                      strokeDashoffset="-88"
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => setActiveSegment('Mi instan')}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#D97706"
                      strokeWidth="20"
                      strokeDasharray="44 176"
                      strokeDashoffset="-154"
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => setActiveSegment('Makanan ringan')}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#00848B"
                      strokeWidth="20"
                      strokeDasharray="22 198"
                      strokeDashoffset="-198"
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => setActiveSegment('Buah-buahan')}
                    />
                  </svg>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {CANTEEN_DATA.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => setActiveSegment(item.label)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer ${
                          activeSegment === item.label ? 'bg-slate-200 font-extrabold' : ''
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-800 font-semibold">{item.label}:</span>
                        <strong className="font-mono font-extrabold text-[#19304E]">{item.portions} porsi ({item.percentage}%)</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabular summary */}
          <div className="bg-[#EFF5F8] p-4 rounded-2xl border-2 border-[#B8D5E5] text-xs sm:text-sm">
            <span className="font-extrabold text-[#19304E] block mb-1">Catatan Pengamat Gizi Sekolah:</span>
            <p className="text-slate-700 leading-relaxed font-medium">
              Konsumsi buah segar hanya mencapai 20 porsi (10%), sedangkan makanan bergaram/camilan mencapai total 100 porsi (50% dari belanja siswa).
            </p>
          </div>
        </div>

        {/* Right: Real Canteen Atmosphere Photo (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="relative h-64 sm:h-76 overflow-hidden">
            <img
              src="/src/assets/images/canteen_healthy_food_1794484081980.jpg"
              alt="Display Buah Segar dan Menu Sehat Kantin Sekolah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637] block">
                  KONTEKS NYATA
                </span>
                <h4 className="font-heading font-extrabold text-base sm:text-lg leading-snug">
                  Program Transformasi Kantin Sehat Berkelanjutan
                </h4>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between text-xs sm:text-sm text-slate-700 space-y-4">
            <p className="leading-relaxed font-normal">
              Mewujudkan sekolah sehat tidak bisa hanya dengan slogan "Ayo Makan Sehat".
              Diperlukan kemampuan numerasi untuk menghitung rasio pasokan, subsidi harga buah potong,
              dan proyeksi penerimaan pengelola kantin agar perubahan menu tetap layak secara ekonomi.
            </p>
            <div className="p-4 rounded-2xl bg-teal-50 border-2 border-teal-300 text-[#00848B] font-extrabold">
              Kunci Numerasi: Menjembatani angka statistik konsumsi dengan aksi kebijakan kantin.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Challenges Form - Enlarged Touch Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
            4 TANTANGAN ANALISIS NUMERASI SISWA
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Uji Penalaran Data Kantin Sehat
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Lengkapi 4 tantangan di bawah ini, lalu sentuh tombol "Periksa Jawaban Otomatis".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Challenge 1 */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#00848B]">
                TANTANGAN 1 (Memahami Persentase)
              </span>
              {hasEvaluated && (
                <span className={`text-xs sm:text-sm font-extrabold ${isAns1Correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isAns1Correct ? '✓ Benar' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Berapa persentase siswa yang membeli buah-buahan dari total 200 porsi?
            </label>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="text"
                value={ans1}
                onChange={(e) => setAns1(e.target.value)}
                placeholder="Ketik angka (misal: 10)..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-base font-mono font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
              <span className="text-base font-extrabold text-slate-700">%</span>
            </div>
          </div>

          {/* Challenge 2 */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#00848B]">
                TANTANGAN 2 (Membaca Modus Data)
              </span>
              {hasEvaluated && (
                <span className={`text-xs sm:text-sm font-extrabold ${isAns2Correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isAns2Correct ? '✓ Benar' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Jenis makanan apa yang paling banyak diminati oleh siswa?
            </label>
            <div className="pt-1">
              <select
                value={ans2}
                onChange={(e) => setAns2(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-sm sm:text-base font-semibold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              >
                <option value="">-- Sentuh untuk Memilih --</option>
                <option value="Nasi dan lauk">Nasi dan lauk (80 porsi)</option>
                <option value="Mi instan">Mi instan (60 porsi)</option>
                <option value="Makanan ringan">Makanan ringan (40 porsi)</option>
                <option value="Buah-buahan">Buah-buahan (20 porsi)</option>
              </select>
            </div>
          </div>

          {/* Challenge 3 */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#00848B]">
                TANTANGAN 3 (Kalkulasi Target Proporsi)
              </span>
              {hasEvaluated && (
                <span className={`text-xs sm:text-sm font-extrabold ${isAns3Correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isAns3Correct ? '✓ Benar' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Jika target konsumsi buah adalah 30% dari total 200 porsi, berapa porsi buah yang harus tersedia?
            </label>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="number"
                value={ans3}
                onChange={(e) => setAns3(e.target.value)}
                placeholder="Jumlah porsi target..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-base font-mono font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
              <span className="text-sm font-bold text-slate-700 shrink-0">porsi</span>
            </div>
          </div>

          {/* Challenge 4 */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#E6A637]">
                TANTANGAN 4 (Penalaran Kebijakan Nyata)
              </span>
              {hasEvaluated && (
                <span className={`text-xs sm:text-sm font-extrabold ${isAns4Filled ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isAns4Filled ? '✓ Lengkap' : 'Isi rekomendasi'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Apa rekomendasi Anda agar kantin sekolah menjadi lebih sehat?
            </label>
            <textarea
              rows={2}
              value={ans4}
              onChange={(e) => setAns4(e.target.value)}
              placeholder="Contoh: Mengganti menu gorengan dengan buah potong dingin seharga Rp 2.000, membatasi penjualan mi instan..."
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
            />
          </div>
        </div>

        {/* Evaluation Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={handleEvaluate}
            className="px-8 py-4 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            Periksa Jawaban Otomatis
          </button>

          {hasEvaluated && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              {isAns1Correct && isAns2Correct && isAns3Correct ? (
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold bg-emerald-50 px-5 py-3 rounded-2xl border-2 border-emerald-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Sempurna! Seluruh perhitungan numerik 100% tepat.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-950 font-bold bg-amber-50 px-5 py-3 rounded-2xl border-2 border-amber-300">
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Beberapa nomor belum pas. Silakan buka Pembahasan untuk melihat logika penyelesaiannya!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detailed Explanation Panel */}
        {showExplanation && (
          <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
            <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
              <KeyRound className="w-5 h-5" />
              Runtutan Proses Penalaran & Kunci Tantangan Kantin Sehat
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
              <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
                <strong className="text-slate-900 block font-extrabold">Tantangan 1 (Persentase Buah):</strong>
                <p className="font-mono text-emerald-700 font-extrabold text-base">20 / 200 × 100% = 10%</p>
                <p className="text-slate-600">
                  Artinya, dari setiap 10 porsi makanan yang dibeli anak-anak di kantin, hanya 1 porsi yang merupakan buah segar. Ini adalah alarm kesehatan sekolah.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
                <strong className="text-slate-900 block font-extrabold">Tantangan 2 (Modus / Pilihan Terbanyak):</strong>
                <p className="font-mono text-emerald-700 font-extrabold text-base">Nasi dan lauk (80 porsi = 40%)</p>
                <p className="text-slate-600">
                  Nasi dan lauk merupakan porsi terbesar. Namun mi instan berada di peringkat kedua dengan 60 porsi (30%), yang memerlukan edukasi gizi seimbang.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
                <strong className="text-slate-900 block font-extrabold">Tantangan 3 (Target Kuantitatif 30%):</strong>
                <p className="font-mono text-emerald-700 font-extrabold text-base">30% × 200 = 60 porsi</p>
                <p className="text-slate-600">
                  Saat ini baru ada 20 porsi buah. Sekolah harus menambah <strong>40 porsi buah tambahan</strong> per hari untuk mencapai ambang batas gizi ideal 30%.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
                <strong className="text-slate-900 block font-extrabold">Tantangan 4 (Rekomendasi Berbasis Data):</strong>
                <p className="text-slate-700 leading-relaxed font-medium">
                  1) Buat paket <em>bundling</em> makanan (Nasi + Sayur + Buah Potong); <br />
                  2) Pajang infografik kalori & natrium mi instan di depan etalase; <br />
                  3) Kampanyekan program "Hari Buah Sekolah" setiap hari Rabu dan Jumat.
                </p>
              </div>
            </div>
          </div>
        )}
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
          <span>Kembali ke Modul 03</span>
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
            <span>{isCompleted ? 'Modul 04 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 05: Learning Hub</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
