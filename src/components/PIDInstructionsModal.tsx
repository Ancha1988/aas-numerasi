import React from 'react';
import { X, Monitor, Hand, Eye, Zap, Maximize, Touchpad, Check } from 'lucide-react';

interface PIDInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PIDInstructionsModal: React.FC<PIDInstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-300 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#19304E] text-white p-6 flex items-center justify-between border-b-2 border-[#244369]">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#00848B] text-white shadow-sm">
              <Monitor className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6A637]">
                PANDUAN OPERASIONAL PERANGKAT
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Optimalisasi Papan Interaktif Digital (PID) & Layar Sentuh
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-[#244369] text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm sm:text-base text-slate-800">
          {/* Quick Action: Fullscreen */}
          <div className="bg-[#EFF5F8] p-5 sm:p-6 rounded-3xl border-2 border-[#B8D5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-[#19304E] text-base sm:text-lg flex items-center gap-2">
                <Maximize className="w-5 h-5 text-[#00848B]" />
                Mode Layar Penuh (Fullscreen Presentation)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                Sangat disarankan saat menampilkan aplikasi di PID 65"-86" agar peramban tidak mengganggu pandangan audiens.
              </p>
            </div>
            <button
              onClick={toggleFullscreen}
              className="px-6 py-3.5 bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md shrink-0 cursor-pointer transition-all active:scale-95"
            >
              Layar Penuh (F11)
            </button>
          </div>

          {/* Grid of PID Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#00848B] transition-colors">
              <div className="flex items-center gap-2 font-extrabold text-[#19304E] text-xs sm:text-sm uppercase mb-2">
                <Touchpad className="w-5 h-5 text-[#00848B]" />
                1. Area Sentuh Ergonomis
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Seluruh tombol, kartu angka, sticky notes, dan tab materi didesain dengan area sentuh nyaman (minimal 48px), responsif disentuh dengan jari maupun stylus PID.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#00848B] transition-colors">
              <div className="flex items-center gap-2 font-extrabold text-[#19304E] text-xs sm:text-sm uppercase mb-2">
                <Eye className="w-5 h-5 text-[#E6A637]" />
                2. Resolusi 1920x1080 & 1366x768
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Tata letak responsif penuh otomatis mengisi layar monitor Full HD PID di aula workshop tanpa memunculkan bilah geser horizontal (zero horizontal scrolling).
              </p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#00848B] transition-colors">
              <div className="flex items-center gap-2 font-extrabold text-[#19304E] text-xs sm:text-sm uppercase mb-2">
                <Hand className="w-5 h-5 text-[#00848B]" />
                3. Interaksi Multi-Peserta di Papan
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Fasilitator dapat mengundang 2-3 guru maju bersamaan ke depan papan untuk memilih kartu angka, menyematkan sticky notes, atau mengisi diagram tantangan.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#00848B] transition-colors">
              <div className="flex items-center gap-2 font-extrabold text-[#19304E] text-xs sm:text-sm uppercase mb-2">
                <Zap className="w-5 h-5 text-[#E6A637]" />
                4. Ketahanan Data Mandiri
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Semua isian formulir LKPD, curah gagasan, dan skor asesmen disimpan otomatis ke memori lokal peramban tanpa memerlukan koneksi server atau login.
              </p>
            </div>
          </div>

          {/* Facilitator Tips */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-slate-200">
            <h4 className="font-extrabold text-[#19304E] text-xs sm:text-sm uppercase tracking-wider mb-2.5">
              Tips Praktis Fasilitasi 120 Menit:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00848B] mt-0.5 shrink-0" />
                <span>Gunakan tab <strong>Mode Fasilitator</strong> di kanan atas untuk membaca panduan dan kunci jawaban tanpa membuka tab baru.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00848B] mt-0.5 shrink-0" />
                <span>Nyalakan <strong>Workshop Timer</strong> saat sesi dibuka untuk menjaga ketepatan alur 9 modul workshop.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00848B] mt-0.5 shrink-0" />
                <span>Sentuh tombol <strong>Ekspor & Cetak</strong> sebelum penutupan sesi untuk mengunduh bukti karya seluruh peserta.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t-2 border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            Saya Siap Memulai Workshop
          </button>
        </div>
      </div>
    </div>
  );
};
