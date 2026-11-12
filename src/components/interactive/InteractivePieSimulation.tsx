import React, { useState } from 'react';
import { PieChart as PieChartIcon, RotateCcw, KeyRound, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface SliceItem {
  id: string;
  name: string;
  portions: number;
  color: string;
  desc: string;
}

const INITIAL_SLICES: SliceItem[] = [
  { id: 'nasi', name: 'Nasi & Lauk', portions: 80, color: '#19304E', desc: 'Makanan utama dengan protein & karbohidrat' },
  { id: 'mi', name: 'Mi Instan', portions: 60, color: '#DC2626', desc: 'Makanan olahan cepat saji tinggi natrium' },
  { id: 'camilan', name: 'Camilan & Gorengan', portions: 40, color: '#D97706', desc: 'Snack kemasan dan gorengan' },
  { id: 'buah', name: 'Buah Segar', portions: 20, color: '#00848B', desc: 'Buah potong segar kaya serat' },
];

export const InteractivePieSimulation: React.FC = () => {
  const [slices, setSlices] = useState<SliceItem[]>(INITIAL_SLICES);
  const [activeSliceId, setActiveSliceId] = useState<string>('buah');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [chartMode, setChartMode] = useState<'donut' | 'pie'>('donut');

  // Handle portion change
  const handlePortionChange = (id: string, delta: number) => {
    setSlices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, portions: Math.max(5, Math.min(120, s.portions + delta)) } : s))
    );
  };

  const handleReset = () => {
    setSlices(INITIAL_SLICES);
    setActiveSliceId('buah');
    setShowExplanation(false);
  };

  // Calculations
  const total = slices.reduce((sum, s) => sum + s.portions, 0);

  // Calculate angles and SVG paths
  // Center (150, 150), radius Outer = 120, radius Inner = 60 (for donut) or 0 (for pie)
  const cx = 150;
  const cy = 150;
  const rOuter = 120;
  const rInner = chartMode === 'donut' ? 65 : 0;

  let cumulativeAngle = -90; // Start at top (12 o'clock)

  const computedSlices = slices.map((slice) => {
    const fraction = total > 0 ? slice.portions / total : 0;
    const angleDegree = fraction * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angleDegree;
    cumulativeAngle += angleDegree;

    // Convert degrees to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Coordinates
    const x1Outer = cx + rOuter * Math.cos(startRad);
    const y1Outer = cy + rOuter * Math.sin(startRad);
    const x2Outer = cx + rOuter * Math.cos(endRad);
    const y2Outer = cy + rOuter * Math.sin(endRad);

    const x1Inner = cx + rInner * Math.cos(endRad);
    const y1Inner = cy + rInner * Math.sin(endRad);
    const x2Inner = cx + rInner * Math.cos(startRad);
    const y2Inner = cy + rInner * Math.sin(startRad);

    const largeArcFlag = angleDegree > 180 ? 1 : 0;

    // SVG path string
    let pathData = '';
    if (chartMode === 'donut') {
      pathData = [
        `M ${x1Outer} ${y1Outer}`,
        `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
        `L ${x1Inner} ${y1Inner}`,
        `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner}`,
        'Z',
      ].join(' ');
    } else {
      pathData = [
        `M ${cx} ${cy}`,
        `L ${x1Outer} ${y1Outer}`,
        `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
        'Z',
      ].join(' ');
    }

    // Mid angle for text positioning
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelRadius = chartMode === 'donut' ? (rOuter + rInner) / 2 : rOuter * 0.65;
    const lx = cx + labelRadius * Math.cos(midRad);
    const ly = cy + labelRadius * Math.sin(midRad);

    return {
      ...slice,
      fraction,
      percent: fraction * 100,
      angleDegree,
      pathData,
      lx,
      ly,
    };
  });

  const activeSlice = computedSlices.find((s) => s.id === activeSliceId) || computedSlices[0];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 5 · SIMULASI DIAGRAM LINGKARAN & KALKULASI SUDUT
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Eksplorasi Trigonometri & Pembagian Busur Derajat (360°)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sentuh irisan diagram untuk memeriksa kalkulasi sudut lingkaran (sudut = porsi / total × 360°)
            dan sesuaikan porsi untuk melihat reaksi bentuk busur secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-300">
            <button
              onClick={() => setChartMode('donut')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                chartMode === 'donut' ? 'bg-[#19304E] text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              Donat
            </button>
            <button
              onClick={() => setChartMode('pie')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                chartMode === 'pie' ? 'bg-[#19304E] text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              Pai Penuh
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Konsep' : 'Logika Sudut Busur'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive SVG Donut/Pie + Slice Detail Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Interactive Chart Canvas (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border-2 border-slate-200">
          <svg className="w-72 h-72 sm:w-80 sm:h-80 drop-shadow-md select-none" viewBox="0 0 300 300">
            {computedSlices.map((slice) => {
              const isSelected = activeSliceId === slice.id;
              return (
                <g key={slice.id} onClick={() => setActiveSliceId(slice.id)} className="cursor-pointer">
                  <path
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '4' : '2'}
                    className={`transition-all duration-300 ease-out ${
                      isSelected ? 'opacity-100 filter drop-shadow-xl scale-105 origin-center' : 'opacity-85 hover:opacity-100'
                    }`}
                  />
                  {slice.percent >= 8 && (
                    <text
                      x={slice.lx}
                      y={slice.ly}
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none font-mono"
                    >
                      {slice.percent.toFixed(0)}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center Label for Donut Mode */}
            {chartMode === 'donut' && (
              <g className="pointer-events-none">
                <circle cx={cx} cy={cy} r={rInner - 4} fill="#FFFFFF" />
                <text
                  x={cx}
                  y={cy - 6}
                  fill="#19304E"
                  fontSize="16"
                  fontWeight="900"
                  textAnchor="middle"
                  className="font-mono font-extrabold"
                >
                  {total}
                </text>
                <text
                  x={cx}
                  y={cy + 12}
                  fill="#64748B"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="uppercase tracking-wider"
                >
                  Porsi Total
                </text>
              </g>
            )}
          </svg>

          <span className="text-xs text-slate-500 font-semibold mt-3 text-center">
            Sentuh irisan warna untuk menelaah sudut busur dan rumus kalkulasinya.
          </span>
        </div>

        {/* Right: Active Slice Inspector & Stepper Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Slice Inspector Banner */}
          <div
            className="p-6 rounded-3xl border-2 text-white shadow-sm space-y-3"
            style={{ backgroundColor: activeSlice.color }}
          >
            <div className="flex items-center justify-between text-xs font-mono font-extrabold uppercase">
              <span className="bg-white/20 px-3 py-1 rounded-xl">IRISAN TERPILIH</span>
              <span className="bg-white/20 px-3 py-1 rounded-xl">{activeSlice.percent.toFixed(1)}% DARI TOTAL</span>
            </div>
            <div>
              <h4 className="text-2xl font-extrabold font-heading">{activeSlice.name}</h4>
              <p className="text-xs sm:text-sm text-white/90 mt-1 leading-snug">{activeSlice.desc}</p>
            </div>

            {/* Math Derivation Callout */}
            <div className="bg-black/25 p-4 rounded-2xl space-y-1.5 font-mono text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="opacity-80">Porsi Absolut:</span>
                <span className="font-bold">{activeSlice.portions} dari {total} porsi</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Rasio Persentase:</span>
                <span className="font-bold">({activeSlice.portions} ÷ {total}) × 100% = {activeSlice.percent.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-[#E6A637]">
                <span className="font-extrabold">Besar Sudut Lingkaran (θ):</span>
                <span className="font-extrabold">({activeSlice.percent.toFixed(1)}% × 360°) = {activeSlice.angleDegree.toFixed(1)}°</span>
              </div>
            </div>
          </div>

          {/* Steppers to modify portions */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B] block">
              ATUR BESARAN PORSI SEMUA KATEGORI
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {computedSlices.map((slice) => (
                <div
                  key={slice.id}
                  onClick={() => setActiveSliceId(slice.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    activeSliceId === slice.id
                      ? 'bg-white border-[#00848B] shadow-xs'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{slice.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePortionChange(slice.id, -5);
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold text-xs flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-extrabold text-[#19304E]">
                      {slice.portions}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePortionChange(slice.id, 5);
                      }}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold text-xs flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thought Process Explanation Panel */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Pembahasan & Proses Berpikir Numerasi: Memahami Diagram Lingkaran
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">1. Total 360 Derajat sebagai Representasi 100%:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Diagram lingkaran merepresentasikan data komposisi (bagian terhadap keseluruhan). Sudut satu lingkaran penuh adalah $360^\circ$. Maka setiap 1% setara dengan $3.6^\circ$ ($360^\circ / 100$).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">2. Kapan Diagram Lingkaran Tepat Digunakan?</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Diagram lingkaran sangat efektif untuk melihat proporsi pangsa pasar, pos anggaran kas OSIS, atau komposisi sampah. Hindari menggunakannya jika ada lebih dari 7 kategori karena irisan menjadi terlalu tipis dan sulit dibedakan.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">3. Hubungan Luas Juring dan Sudut Pusat:</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Luas juring sebanding dengan besar sudut pusatnya (Luas Juring = (sudut / 360°) × π × r²). Semakin besar porsi data, semakin lebar busur juring yang terbentuk di hadapan pengamat.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
              <strong className="text-slate-900 block font-extrabold">4. Mengapa Donut Chart Sering Lebih Disukai?</strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Donut chart menghilangkan titik pusat lingkaran, memaksa mata pengamat membandingkan panjang busur luar (arc length) daripada luas area segitiga juring, sehingga mengurangi bias ilusi optik.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
