import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, HelpCircle, KeyRound, Sparkles, Check, ArrowRight, Move } from 'lucide-react';

export interface DraggableItem {
  id: string;
  text: string;
  correctCategory: 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan';
  rationale: string;
}

const INITIAL_ITEMS: DraggableItem[] = [
  {
    id: 'item-1',
    text: 'Menghitung detak denyut nadi istirahat dan denyut nadi pasca senam untuk kebugaran pribadi',
    correctCategory: 'Personal',
    rationale: 'Fokus pada kesehatan fisik, fisiologi organ, dan pemantauan kondisi tubuh individu sendiri.',
  },
  {
    id: 'item-2',
    text: 'Menganalisis data komposisi 100 kg sampah mingguan sekolah untuk kampanye pengurangan botol plastik',
    correctCategory: 'Sosial Budaya',
    rationale: 'Melibatkan masalah komunitas sekolah, lingkungan bersama, dan aksi sosial bermasyarakat.',
  },
  {
    id: 'item-3',
    text: 'Mengukur debit kebocoran kran wastafel (liter/menit) dan laju tetesan menggunakan gelas ukur',
    correctCategory: 'Saintifik',
    rationale: 'Merupakan eksperimen penyelidikan ilmiah dengan variabel fluida, laju alir, dan hukum fisika/biologi.',
  },
  {
    id: 'item-4',
    text: 'Membuat RAB dan mengestimasi kebutuhan material semen instan untuk lapangan olahraga berskala',
    correctCategory: 'Pekerjaan',
    rationale: 'Terkait profesi teknik sipil, estimasi biaya logistik, dan perencanaan kerja arsitektural.',
  },
  {
    id: 'item-5',
    text: 'Mengatur alokasi uang saku mingguan menggunakan formula pos anggaran 50% kebutuhan dan 20% tabungan',
    correctCategory: 'Personal',
    rationale: 'Keputusan finansial perseorangan dalam mengatur kebutuhan hidup dan perencanaan tabungan pribadi.',
  },
  {
    id: 'item-6',
    text: 'Membaca data tren kepadatan penduduk kelurahan untuk memproyeksikan kebutuhan puskesmas dan RTH',
    correctCategory: 'Sosial Budaya',
    rationale: 'Kajian demografi masyarakat yang berdampak pada pemerataan fasilitas umum dan kebijakan publik.',
  },
  {
    id: 'item-7',
    text: 'Mencatat suhu inkubator bakteri lab setiap 15 menit untuk memodelkan kurva eksponensial pertumbuhan',
    correctCategory: 'Saintifik',
    rationale: 'Investigasi sains laboratorium dengan instrumen pengukuran suhu dan pemodelan matematis hayati.',
  },
  {
    id: 'item-8',
    text: 'Menghitung waktu siklus perputaran stok barang di gudang minimarket sekolah (inventory turnover)',
    correctCategory: 'Pekerjaan',
    rationale: 'Aktivitas dunia usaha, manajemen rantai pasok (supply chain), dan tata kelola ritel vokasi.',
  },
];

const CATEGORIES: { id: 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan'; label: string; desc: string; color: string; bg: string }[] = [
  {
    id: 'Personal',
    label: 'Konteks Personal',
    desc: 'Terkait diri sendiri, keluarga, kesehatan tubuh, dan keuangan pribadi',
    color: '#00848B',
    bg: '#E6F6F7',
  },
  {
    id: 'Sosial Budaya',
    label: 'Konteks Sosial Budaya',
    desc: 'Terkait masyarakat, lingkungan sekolah, komunitas, dan kearifan lokal',
    color: '#19304E',
    bg: '#EFF5F8',
  },
  {
    id: 'Saintifik',
    label: 'Konteks Saintifik',
    desc: 'Terkait fenomena alam, sains, ekologi, dan penyelidikan teknologi',
    color: '#0284C7',
    bg: '#F0F9FF',
  },
  {
    id: 'Pekerjaan',
    label: 'Konteks Pekerjaan',
    desc: 'Terkait profesi, industri, estimasi biaya proyek, dan vokasi kerja',
    color: '#D97706',
    bg: '#FEF3C7',
  },
];

export const DragDropCategorizer: React.FC = () => {
  // Placements state: mapping item ID to category
  const [placements, setPlacements] = useState<Record<string, 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan'>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Unplaced items
  const unplacedItems = INITIAL_ITEMS.filter((item) => !placements[item.id]);

  // Touch & Drag Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDropOnCategory = (e: React.DragEvent, category: 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      setPlacements((prev) => ({ ...prev, [id]: category }));
      setSelectedItemId(null);
      setIsEvaluated(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Tap-to-Place (Ergonomic for PID Touch Screens)
  const handleItemClick = (id: string) => {
    if (selectedItemId === id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(id);
    }
  };

  const handleCategoryClick = (category: 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan') => {
    if (selectedItemId) {
      setPlacements((prev) => ({ ...prev, [selectedItemId]: category }));
      setSelectedItemId(null);
      setIsEvaluated(false);
    }
  };

  const handleRemoveFromCategory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setIsEvaluated(false);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedItemId(null);
    setIsEvaluated(false);
    setShowExplanation(false);
  };

  // Evaluation
  const totalPlaced = Object.keys(placements).length;
  let correctCount = 0;
  if (isEvaluated) {
    INITIAL_ITEMS.forEach((item) => {
      if (placements[item.id] === item.correctCategory) {
        correctCount++;
      }
    });
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            AKTIVITAS INTERAKTIF 1 · DRAG & DROP / SENTUH & TEMPATKAN
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
            Pengelompokan 4 Domain Konteks Numerasi AKM
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Klasifikasikan 8 studi kasus numerasi ke dalam 4 kotak konteks: <strong>Personal</strong>, <strong>Sosial Budaya</strong>, <strong>Saintifik</strong>, atau <strong>Pekerjaan</strong>.
            <br />
            <span className="text-[#00848B] font-bold">Tips Layar Sentuh PID:</span> Sentuh kartu studi kasus di bawah, lalu sentuh kotak kategori tujuan!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Posisi</span>
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>{showExplanation ? 'Tutup Rasionil' : 'Lihat Pembahasan Berpikir'}</span>
          </button>
        </div>
      </div>

      {/* 4 Category Drop Bins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const itemsInCat = INITIAL_ITEMS.filter((item) => placements[item.id] === cat.id);
          const isTargetHighlight = selectedItemId !== null;

          return (
            <div
              key={cat.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnCategory(e, cat.id)}
              onClick={() => handleCategoryClick(cat.id)}
              className={`p-5 rounded-3xl border-2 transition-all min-h-[220px] flex flex-col justify-between cursor-pointer ${
                isTargetHighlight
                  ? 'border-[#00848B] ring-4 ring-[#00848B]/20 bg-teal-50/50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-xl text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.label}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    {itemsInCat.length} Kartu
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3 font-medium leading-snug">
                  {cat.desc}
                </p>

                {/* Placed Items in this category */}
                <div className="space-y-2">
                  {itemsInCat.map((item) => {
                    const isCorrect = item.correctCategory === cat.id;
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border-2 text-xs font-semibold leading-relaxed flex items-start justify-between gap-2 shadow-xs transition-all ${
                          isEvaluated
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                              : 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      >
                        <span className="flex-1">{item.text}</span>
                        <button
                          onClick={(e) => handleRemoveFromCategory(item.id, e)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-100 font-bold shrink-0 text-sm cursor-pointer"
                          title="Keluarkan dari kotak ini"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {itemsInCat.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 border-2 border-dashed border-slate-300 rounded-2xl mt-2 font-medium">
                  {selectedItemId ? 'Sentuh di sini untuk menempatkan kartu' : 'Tarik atau tempatkan kartu di sini'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Available Cards Pool */}
      <div className="bg-[#EFF5F8] p-5 sm:p-6 rounded-3xl border-2 border-[#B8D5E5] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#19304E] flex items-center gap-2">
            <Move className="w-4 h-4 text-[#00848B]" />
            Daftar Kartu Studi Kasus yang Belum Ditempatkan ({unplacedItems.length} Tersisa):
          </span>
          <span className="text-xs text-slate-600 font-medium">
            Sentuh kartu untuk memilih, lalu sentuh kotak kategori di atas.
          </span>
        </div>

        {unplacedItems.length === 0 ? (
          <div className="p-4 bg-white rounded-2xl border-2 border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Semua 8 kartu telah ditempatkan! Silakan tekan tombol <strong>"Periksa Pengelompokan"</strong> di bawah.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {unplacedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => handleItemClick(item.id)}
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold leading-relaxed cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#19304E] text-white border-[#19304E] shadow-xl scale-105 ring-4 ring-[#00848B]/40 z-10'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-[#00848B] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 mb-1">
                    <span>KARTU STUDI KASUS</span>
                    {isSelected && <span className="text-[#E6A637] font-extrabold">Terpilih</span>}
                  </div>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Check Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEvaluated(true)}
            disabled={totalPlaced === 0}
            className={`px-8 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
              totalPlaced === 0
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-[#00848B] hover:bg-[#009da5] text-white'
            }`}
          >
            Periksa Pengelompokan
          </button>
        </div>

        {isEvaluated && (
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
            {correctCount === INITIAL_ITEMS.length ? (
              <span className="bg-emerald-50 text-emerald-900 border-2 border-emerald-400 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                Luar Biasa! Seluruh 8 studi kasus dikelompokkan 100% tepat.
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-950 border-2 border-amber-300 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                Capaian Anda: {correctCount} dari {INITIAL_ITEMS.length} Tepat. Buka Rasionil Berpikir untuk menelaah letak perbedaannya!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Detailed Thought Process Explanation */}
      {showExplanation && (
        <div className="p-6 sm:p-7 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 animate-in fade-in duration-150">
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide text-[#00848B] flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Rasionil Proses Berpikir Numerasi (Mengapa Konteks Itu Penting?)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-800">
            {INITIAL_ITEMS.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-teal-200 space-y-1 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 line-clamp-1">{item.text.slice(0, 45)}...</span>
                  <span className="px-2 py-0.5 rounded-lg bg-teal-100 text-teal-900 font-extrabold shrink-0">
                    {item.correctCategory}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  <strong>Logika Berpikir:</strong> {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
