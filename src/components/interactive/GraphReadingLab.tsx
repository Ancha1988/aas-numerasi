import React, { useState } from 'react';
import { Activity, RotateCcw, KeyRound, Sparkles, Check, HelpCircle, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface DataPoint {
  timeLabel: string;
  hour: number;
  pulseBpm: number; // Denyut nadi per menit (bpm)
  activityState: string;
  note: string;
}

const GRAPH_DATA: DataPoint[] = [
  { timeLabel: '07:00', hour: 7, pulseBpm: 72, activityState: 'Istirahat Awal', note: 'Kondisi istirahat normal sebelum aktivitas fisik dimulai' },
  { timeLabel: '07:15', hour: 7.25, pulseBpm: 88, activityState: 'Pemanasan Statis & Dinamis', note: 'Sirkulasi darah mulai meningkat perlahan' },
  { timeLabel: '07:30', hour: 7.5, pulseBpm: 125, activityState: 'Lari Keliling Lapangan (Jogging)', note: 'Memasuki zona pembakaran kalori intensitas sedang' },
  { timeLabel: '07:45', hour: 7.75, pulseBpm: 168, activityState: 'Sprint Cepat 100m (Puncak Latihan)', note: 'Zona anaerobik intensitas tinggi mendekati kapasitas maksimal' },
  { timeLabel: '08:00', hour: 8, pulseBpm: 142, activityState: 'Pendinginan & Peregangan Otot', note: 'Penurunan bertahap untuk mencegah penumpukan asam laktat' },
  { timeLabel: '08:15', hour: 8.25, pulseBpm: 95, activityState: 'Istirahat Minum Air', note: 'Fase pemulihan aktif (active recovery)' },
  { timeLabel: '08:30', hour: 8.5, pulseBpm: 76, activityState: 'Kembali Masuk Kelas', note: 'Mendekati denyut normal siswa (kondisi homeostasis)' },
];

export const GraphReadingLab: React.FC = () => {
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(3); // Default to peak (07:45)
  const [q1Answer, setQ1Answer] = useState<string>('');
  const [q2Answer, setQ2Answer] = useState<string>('');
  const [q3Answer, setQ3Answer] = useState<string>('');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // SVG Chart dimensions
  const svgWidth = 640;
  const svgHeight = 280;
  const paddingX = 60;
  const paddingY = 40;

  const minBpm = 60;
  const maxBpm = 180;

  // Convert data points to SVG coordinates
  const points = GRAPH_DATA.map((d, i) => {
    const x = paddingX + (i / (GRAPH_DATA.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - ((d.pulseBpm - minBpm) / (maxBpm - minBpm)) * (svgHeight - 2 * paddingY);
    return { ...d, x, y, index: i };
  });

  // Polyline path string
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Gradient area path string
  const areaPath = `M ${points[0].x},${svgHeight - paddingY} L ${polylinePoints.split(' ').join(' L ')} L ${points[points.length - 1].x},${svgHeight - paddingY} Z`;

  // Selected Point details
  const activePt = points[selectedPointIndex] || points[0];

  // Rate of change calculation
  let rateOfChangeText = '-';
  if (selectedPointIndex > 0) {
    const prevPt = points[selectedPointIndex - 1];
    const deltaBpm = activePt.pulseBpm - prevPt.pulseBpm;
    const deltaMin = 15; // 15 minutes
    const ratePerMin = (deltaBpm / deltaMin).toFixed(2);
    rateOfChangeText = `${deltaBpm > 0 ? '+' : ''}${deltaBpm} bpm / 15 mnt (${ratePerMin} bpm/menit)`;
  }

  // Answer validation
  const isQ1Correct = q1Answer === '07:45' || q1Answer.toLowerCase().includes('07:45') || q1Answer.includes('168');
  const isQ2Correct = q2Answer === '07:30 - 07:45' || q2Answer.toLowerCase().includes('sprint') || q2Answer.includes('07:30');
  const isQ3Correct = q3Answer.trim().length >= 10;

  const handleEvaluate = () => {
    setIsEvaluated(true);
  };

  const handleReset = () => {
    setQ1Answer('');
    setQ2Answer('');
    setQ3Answer('');
    setIsEvaluated(false);
    setShowExplanation(false);
    setSelectedPointIndex(3);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 6 · MEMBACA & MENGINTERPRETASIKAN GRAFIK KONTINU
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Laboratorium Membaca Grafik: Dinamika Fisiologis Siswa SMP
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sentuh setiap titik koordinat (waktu, denyut) pada grafik garis di bawah ini untuk melihat nilai,
            kemiringan kurva (gradien Δy / Δx), dan jawab 3 tantangan penalaran berjenjang.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Jawaban</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Analisis' : 'Analisis Gradien & Nalar'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Coordinate SVG Graph + Selected Point Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive SVG Graph (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#19304E] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00848B]" />
              GRAFIK TREN DENYUT NADI (PJOK & IPA BIOLOGI)
            </span>
            <span className="text-xs font-bold text-slate-500">Sumbu Y: BPM · Sumbu X: Waktu</span>
          </div>

          {/* SVG Canvas */}
          <div className="py-2 overflow-x-auto">
            <svg
              className="w-full h-auto min-w-[500px] select-none"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
              {/* Grid Horizontal Lines & Y-axis labels */}
              {[60, 90, 120, 150, 180].map((val) => {
                const y = svgHeight - paddingY - ((val - minBpm) / (maxBpm - minBpm)) * (svgHeight - 2 * paddingY);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#CBD5E1"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 4}
                      fill="#64748B"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="end"
                      className="font-mono"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaPath} fill="url(#pulseGradient)" opacity="0.4" />

              <defs>
                <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00848B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00848B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Line graph */}
              <polyline
                fill="none"
                stroke="#00848B"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
              />

              {/* Interactive Data Points */}
              {points.map((pt) => {
                const isSelected = selectedPointIndex === pt.index;
                return (
                  <g
                    key={pt.index}
                    onClick={() => setSelectedPointIndex(pt.index)}
                    className="cursor-pointer group"
                  >
                    {/* Hit area */}
                    <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                    {/* Outer pulse circle when selected */}
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="#00848B"
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Point Circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '9' : '6'}
                      fill={isSelected ? '#E6A637' : '#19304E'}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? '3' : '2'}
                      className="transition-all duration-200"
                    />

                    {/* Value Badge above point */}
                    <text
                      x={pt.x}
                      y={pt.y - 14}
                      fill="#19304E"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono pointer-events-none"
                    >
                      {pt.pulseBpm}
                    </text>

                    {/* X-axis time label */}
                    <text
                      x={pt.x}
                      y={svgHeight - paddingY + 20}
                      fill={isSelected ? '#00848B' : '#64748B'}
                      fontSize="11"
                      fontWeight={isSelected ? '900' : 'bold'}
                      textAnchor="middle"
                      className="font-mono pointer-events-none"
                    >
                      {pt.timeLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-semibold">💡 Tips PID: Sentuh langsung titik koordinat emas/biru pada garis kurva!</span>
            <span className="font-mono font-bold text-[#00848B]">Total 7 Observasi Waktu</span>
          </div>
        </div>

        {/* Right: Point Inspector & Slope Rate (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                INSPEKTOR TITIK KOORDINAT (X, Y)
              </span>
              <span className="font-mono text-xs font-extrabold bg-teal-50 text-teal-900 px-3 py-1 rounded-xl border border-teal-300">
                Pukul {activePt.timeLabel} WIB
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktivitas Fase Ini:</span>
              <h4 className="text-lg font-extrabold text-[#19304E] font-heading">{activePt.activityState}</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                {activePt.note}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#EFF5F8] border border-[#B8D5E5]">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Frekuensi Nadi (Y):</span>
                <span className="font-mono text-xl font-extrabold text-[#19304E]">
                  {activePt.pulseBpm} <span className="text-xs font-sans text-slate-600">bpm</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300">
                <span className="text-[11px] font-bold text-amber-900 block uppercase">Laju Perubahan (Δy/Δx):</span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-amber-950">
                  {rateOfChangeText}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-xs text-teal-950 space-y-1">
            <span className="font-extrabold block">Makna Pedagogis Membaca Grafik:</span>
            <p className="leading-relaxed">
              Membaca grafik bukan sekadar menyebut angka tertinggi, melainkan menafsirkan <em>kecepatan lonjakan</em> (gradien) dan <em>durasi pemulihan</em> (kemiringan turun) sebagai indikator kesehatan jantung siswa.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Guided Interpretation Questions */}
      <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 space-y-5">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              3 TANTANGAN MEMBACA & MENALAR GRAFIK
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#19304E] font-heading mt-0.5">
              Uji Kemampuan Interpretasi Data Kontinu
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#00848B]">TANTANGAN 1 (LEVEL 1: MEMAHAMI)</span>
              {isEvaluated && (
                <span className={isQ1Correct ? 'text-emerald-700' : 'text-rose-700'}>
                  {isQ1Correct ? '✓ Tepat' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Pukul berapa titik puncak (ekstrim maksimum) denyut nadi tercapai?
            </label>
            <select
              value={q1Answer}
              onChange={(e) => setQ1Answer(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
            >
              <option value="">-- Pilih Jam Puncak --</option>
              <option value="07:15">07:15 (88 bpm)</option>
              <option value="07:30">07:30 (125 bpm)</option>
              <option value="07:45">07:45 (168 bpm)</option>
              <option value="08:00">08:00 (142 bpm)</option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#00848B]">TANTANGAN 2 (LEVEL 2: MENERAPKAN)</span>
              {isEvaluated && (
                <span className={isQ2Correct ? 'text-emerald-700' : 'text-rose-700'}>
                  {isQ2Correct ? '✓ Tepat' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Interval waktu mana yang memiliki laju kenaikan denyut nadi paling curam (gradien terbesar)?
            </label>
            <select
              value={q2Answer}
              onChange={(e) => setQ2Answer(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#00848B] focus:outline-none"
            >
              <option value="">-- Pilih Rentang Waktu --</option>
              <option value="07:00 - 07:15">07:00 - 07:15 (Kenaikan +16 bpm)</option>
              <option value="07:15 - 07:30">07:15 - 07:30 (Kenaikan +37 bpm)</option>
              <option value="07:30 - 07:45">07:30 - 07:45 (Kenaikan +43 bpm - Sprint)</option>
              <option value="08:00 - 08:15">08:00 - 08:15 (Penurunan -47 bpm)</option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#E6A637]">TANTANGAN 3 (LEVEL 3: MENALAR)</span>
              {isEvaluated && (
                <span className={isQ3Correct ? 'text-emerald-700' : 'text-amber-700'}>
                  {isQ3Correct ? '✓ Lengkap' : 'Isi analisis'}
                </span>
              )}
            </div>
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
              Mengapa siswa perlu pendinginan (08:00) sebelum kembali masuk ruang kelas?
            </label>
            <textarea
              rows={2}
              value={q3Answer}
              onChange={(e) => setQ3Answer(e.target.value)}
              placeholder="Jelaskan alasan fisiologis penurunan denyut nadi..."
              className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#00848B] focus:outline-none"
            />
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <button
            onClick={handleEvaluate}
            className="px-8 py-3.5 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            Periksa Analisis Grafik
          </button>

          {isEvaluated && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
              {isQ1Correct && isQ2Correct ? (
                <span className="bg-emerald-50 text-emerald-900 border-2 border-emerald-400 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                  Hebat! Interpretasi nilai ekstrim dan laju perubahan (gradien) 100% akurat.
                </span>
              ) : (
                <span className="bg-amber-50 text-amber-950 border-2 border-amber-300 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  Periksa kembali laju perubahan di interval sprint! Buka Analisis Gradien untuk rinciannya.
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Thought Process Explanation Panel */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Pembahasan & Proses Berpikir Numerasi: Membedakan Nilai Titik vs Kemiringan (Slope)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">1. Menemukan Nilai Puncak (Tantangan 1):</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Pukul 07:45 tercatat 168 bpm saat siswa melakukan sprint 100 meter. Ini adalah nilai koordinat Y tertinggi (Y maksimum). Siswa membaca nilai absolut pada sumbu ordinat.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">2. Menghitung Gradien / Laju Kenaikan (Tantangan 2):</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Dari 07:30 (125 bpm) ke 07:45 (168 bpm), Δy = 168 - 125 = +43 bpm dalam rentang Δx = 15 menit. Kemiringannya adalah +2.87 bpm/menit, merupakan segmen tanjakan paling terjal dari seluruh kurva.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">3. Fisiologi Homeostasis (Tantangan 3):</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Pendinginan menurunkan laju aliran darah secara teratur dari 168 bpm menuju 76 bpm. Tanpa pendinginan, penumpukan asam laktat dapat menyebabkan pusing, kram, atau penurunan oksigen mendadak saat siswa duduk belajar di kelas.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-1.5 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">4. Keterkaitan Kurikulum SMP:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Kegiatan ini mengawinkan Konsep Gradien Garis Lurus (Matematika Kelas 8), Sistem Peredaran Darah Manusia (IPA Biologi Kelas 8), dan Kebugaran Jasmani (PJOK).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
