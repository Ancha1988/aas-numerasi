import React, { useState } from 'react';
import { Droplets, RotateCcw, KeyRound, Sparkles, Check, HelpCircle, CheckCircle2, ArrowRight, DollarSign, ShieldAlert, Award } from 'lucide-react';

export const ContextualProblemChallenge: React.FC = () => {
  // Step 1 Inputs
  const [wudhuDailyVolume, setWudhuDailyVolume] = useState<string>('');
  const [monthlyLeakVolume, setMonthlyLeakVolume] = useState<string>('');

  // Step 2 Inputs
  const [monthlyWaterSaved, setMonthlyWaterSaved] = useState<string>('');
  const [monthlyCostSaved, setMonthlyCostSaved] = useState<string>('');

  // Step 3 Inputs
  const [paybackDecision, setPaybackDecision] = useState<string>('');
  const [policyRecommendation, setPolicyRecommendation] = useState<string>('');

  // Evaluation states
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Validation logic
  // 600 students * 9 liters = 5400
  const isWudhuCorrect = wudhuDailyVolume.trim() === '5400' || wudhuDailyVolume.includes('5400');
  // 4 taps * 0.5 L * 24 h * 30 days = 1440
  const isLeakCorrect = monthlyLeakVolume.trim() === '1440' || monthlyLeakVolume.includes('1440');

  // Saving: (600 students * 3 L * 25 school days) + 1440 L = 45000 + 1440 = 46440
  // Accept 45000 (if only school days wudhu) or 46440 (with leak)
  const isWaterSavedCorrect =
    monthlyWaterSaved.trim() === '46440' ||
    monthlyWaterSaved.trim() === '45000' ||
    monthlyWaterSaved.includes('46440') ||
    monthlyWaterSaved.includes('45000');

  // Cost: 46.44 m3 * 10,000 = 464400 (or 450000)
  const isCostSavedCorrect =
    monthlyCostSaved.trim() === '464400' ||
    monthlyCostSaved.trim() === '450000' ||
    monthlyCostSaved.includes('464400') ||
    monthlyCostSaved.includes('450000') ||
    monthlyCostSaved.includes('464') ||
    monthlyCostSaved.includes('450');

  // Step 3 Decision
  const isPaybackCorrect = paybackDecision === 'sangat-layak';
  const isPolicyFilled = policyRecommendation.trim().length >= 15;

  const allCorrect = isWudhuCorrect && isLeakCorrect && isWaterSavedCorrect && isCostSavedCorrect && isPaybackCorrect;

  const handleReset = () => {
    setWudhuDailyVolume('');
    setMonthlyLeakVolume('');
    setMonthlyWaterSaved('');
    setMonthlyCostSaved('');
    setPaybackDecision('');
    setPolicyRecommendation('');
    setHasEvaluated(false);
    setShowExplanation(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 7 & 8 · TANTANGAN PENYELESAIAN MASALAH KONTEKSTUAL LENGKAP
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Audit Konservasi Air Bersih & Efisiensi Anggaran Sekolah
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Selesaikan studi kasus 3 tahap: mulai dari ekstraksi data empiris, formulasi perhitungan numerasi,
            hingga pengambilan keputusan investasi lingkungan sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Isian</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Rasionil' : 'Lihat Kunci & Alur Berpikir'}</span>
          </button>
        </div>
      </div>

      {/* Case Scenario Narrative Stimulus Banner */}
      <div className="bg-[#EFF5F8] p-6 sm:p-7 rounded-3xl border-2 border-[#B8D5E5] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B] flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#00848B]" />
            STUDI KASUS NYATA: SMP MERDEKA (600 SISWA & 40 GURU)
          </span>
          <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-lg border border-slate-300 text-slate-700">
            Tarif PDAM: Rp 10.000 / m³ (1 m³ = 1.000 Liter)
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
          Tim Adiwiyata SMP Merdeka menemukan bahwa debit kran wudhu sekolah saat dibuka penuh adalah <strong>6 liter/menit</strong>.
          Rata-rata siswa berwudhu selama <strong>1,5 menit</strong> (mengalirkan 9 liter air per siswa saat salat dzuhur).
          Selain itu, audit fisik mendapati <strong>4 kran wastafel bocor menetes konstan</strong> dengan laju <strong>0,5 liter per jam per kran</strong> selama 24 jam nonstop (30 hari per bulan).
          <br /><br />
          Sekolah berencana memasang <em>nozzle aerator</em> penghemat air (mengurangi konsumsi menjadi hanya 6 liter per siswa, atau hemat <strong>3 liter per siswa</strong> selama 25 hari sekolah aktif)
          dan mengganti seal 4 kran bocor dengan total biaya pengadaan hanya <strong>Rp 300.000</strong>.
        </p>
      </div>

      {/* 3 Step Interactive Workflow */}
      <div className="space-y-6">
        {/* Step 1: Data Extraction */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#19304E] text-white flex items-center justify-center font-mono font-extrabold text-xs">
                1
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-[#19304E] font-heading">
                Tahap 1: Ekstraksi Data Kuantitatif
              </h4>
            </div>
            {hasEvaluated && (
              <span className={`text-xs sm:text-sm font-extrabold ${isWudhuCorrect && isLeakCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isWudhuCorrect && isLeakCorrect ? '✓ Tahap 1 Tepat' : 'Periksa kembali'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                a. Berapa total volume air yang digunakan 600 siswa saat salat dzuhur per hari?
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={wudhuDailyVolume}
                  onChange={(e) => setWudhuDailyVolume(e.target.value)}
                  placeholder="Ketik angka (misal: 5400)..."
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                />
                <span className="text-sm font-extrabold text-slate-700 shrink-0">Liter / hari</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                b. Berapa volume air bersih yang terbuang percuma akibat 4 kran bocor dalam 1 bulan (30 hari)?
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={monthlyLeakVolume}
                  onChange={(e) => setMonthlyLeakVolume(e.target.value)}
                  placeholder="Ketik angka (misal: 1440)..."
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                />
                <span className="text-sm font-extrabold text-slate-700 shrink-0">Liter / bulan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Math Formulation */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#00848B] text-white flex items-center justify-center font-mono font-extrabold text-xs">
                2
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-[#19304E] font-heading">
                Tahap 2: Solusi Perhitungan Matematika Terapan
              </h4>
            </div>
            {hasEvaluated && (
              <span className={`text-xs sm:text-sm font-extrabold ${isWaterSavedCorrect && isCostSavedCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isWaterSavedCorrect && isCostSavedCorrect ? '✓ Tahap 2 Tepat' : 'Periksa kembali'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                a. Berapa total liter air bersih yang berhasil dihemat per bulan (25 hari sekolah + perbaikan kran)?
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={monthlyWaterSaved}
                  onChange={(e) => setMonthlyWaterSaved(e.target.value)}
                  placeholder="Ketik angka (misal: 46440)..."
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                />
                <span className="text-sm font-extrabold text-slate-700 shrink-0">Liter hemat</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                b. Berapa potensi penghematan tagihan PDAM sekolah per bulan (Rp 10.000 / m³)?
              </label>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-700 shrink-0">Rp</span>
                <input
                  type="text"
                  value={monthlyCostSaved}
                  onChange={(e) => setMonthlyCostSaved(e.target.value)}
                  placeholder="Ketik angka (misal: 464400)..."
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-base font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                />
                <span className="text-sm font-extrabold text-slate-700 shrink-0">/ bulan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Strategic Decision Making */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#E6A637] text-[#19304E] flex items-center justify-center font-mono font-extrabold text-xs">
                3
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-[#19304E] font-heading">
                Tahap 3: Keputusan Kebijakan Berbasis Bukti
              </h4>
            </div>
            {hasEvaluated && (
              <span className={`text-xs sm:text-sm font-extrabold ${isPaybackCorrect && isPolicyFilled ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isPaybackCorrect && isPolicyFilled ? '✓ Tahap 3 Lengkap' : 'Isi rekomendasi'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                a. Dengan biaya renovasi Rp 300.000, apakah investasi ini layak (Payback Period &lt; 1 bulan)?
              </label>
              <select
                value={paybackDecision}
                onChange={(e) => setPaybackDecision(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-sm font-extrabold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              >
                <option value="">-- Pilih Keputusan Kelayakan --</option>
                <option value="sangat-layak">Sangat Layak (Balik modal dalam ~20 hari, penghematan tahunan &gt; Rp 5 Juta)</option>
                <option value="tidak-layak">Tidak Layak (Biaya terlalu mahal dan penghematan tidak signifikan)</option>
                <option value="ragu">Ragu-ragu / Perlu data tambahan</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                b. Rekomendasi kebijakan apa yang dapat disampaikan dalam rapat komite sekolah?
              </label>
              <textarea
                rows={3}
                value={policyRecommendation}
                onChange={(e) => setPolicyRecommendation(e.target.value)}
                placeholder="Tuliskan rekomendasi berbasis angka di atas..."
                className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation and Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setHasEvaluated(true)}
          className="px-8 py-4 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
        >
          Periksa Solusi Kasus Lengkap
        </button>

        {hasEvaluated && (
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
            {allCorrect ? (
              <span className="bg-emerald-50 text-emerald-900 border-2 border-emerald-400 px-5 py-3 rounded-2xl flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                Luar Biasa! Seluruh kalkulasi numerasi dan keputusan kebijakan 100% tepat dan komprehensif.
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-950 border-2 border-amber-300 px-5 py-3 rounded-2xl flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                Sebagian angka perlu disesuaikan. Sentuh "Lihat Kunci & Alur Berpikir" untuk menelaah langkah perhitungannya!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Detailed Thought Process Explanation Panel */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Alur Berpikir Numerasi: Dari Data Mentah Menuju Keputusan Finansial & Lingkungan
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-800">
            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">Langkah 1: Mengubah Laju ke Volume</strong>
              <div className="font-mono text-emerald-800 space-y-1 font-bold">
                <p>• Wudhu harian = 600 × (6 L/mnt × 1,5 mnt) = 600 × 9 = 5.400 L/hari.</p>
                <p>• Kebocoran = 4 kran × 0,5 L × 24 jam × 30 hari = 1.440 L/bulan.</p>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal">
                Siswa mengonversi laju waktu (menit dan jam) menjadi besaran volume agregat harian dan bulanan.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">Langkah 2: Menghitung Penghematan Moneter</strong>
              <div className="font-mono text-emerald-800 space-y-1 font-bold">
                <p>• Hemat Wudhu = 600 × 3 L × 25 hari = 45.000 L.</p>
                <p>• Total Hemat = 45.000 + 1.440 = 46.440 L = 46,44 m³.</p>
                <p>• Rupiah = 46,44 m³ × Rp 10.000 = Rp 464.400 / bulan.</p>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal">
                Menghubungkan satuan fisika volume dengan nilai ekonomi rupiah tagihan rekening air sekolah.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">Langkah 3: Return on Investment (ROI)</strong>
              <div className="font-mono text-emerald-800 space-y-1 font-bold">
                <p>• Payback = Rp 300.000 / Rp 464.400 = 0,65 bulan (~20 hari).</p>
                <p>• Hemat Setahun = 12 × Rp 464.400 = Rp 5.572.800.</p>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal">
                Inilah puncak kompetensi AKM Menalar: angka matematika menjadi dasar argumen tak terbantahkan untuk meyakinkan kepala sekolah dan komite mendanai program konservasi air.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
