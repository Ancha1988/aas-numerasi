import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Save, Printer, Sparkles, Award, Heart, Check, BarChart3 } from 'lucide-react';
import { ReflectionData } from '../../types';
import { Storage } from '../../utils/storage';

interface Modul09ReflectionProps {
  onPrev: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  reflectionData: ReflectionData;
  onUpdateReflection: (data: ReflectionData) => void;
  onOpenExportCenter: () => void;
  onOpenEvaluationDashboard?: () => void;
}

export const Modul09Reflection: React.FC<Modul09ReflectionProps> = ({
  onPrev,
  isCompleted,
  onToggleComplete,
  reflectionData,
  onUpdateReflection,
  onOpenExportCenter,
  onOpenEvaluationDashboard,
}) => {
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [showFinishedCelebration, setShowFinishedCelebration] = useState<boolean>(false);

  const handleFieldChange = (field: keyof ReflectionData, val: string) => {
    const updated = {
      ...reflectionData,
      [field]: val,
      dateCompleted: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    onUpdateReflection(updated);
    Storage.setReflection(updated);
  };

  const handleSave = () => {
    Storage.setReflection(reflectionData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleFinishWorkshop = () => {
    if (!isCompleted) {
      onToggleComplete();
    }
    setShowFinishedCelebration(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Heart className="w-4 h-4 text-[#E6A637]" />
            MODUL 09 · REFLEKSI & KOMITMEN TRANSFORMASI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Dari Workshop Menuju Kelas
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-2xl leading-relaxed">
            Tujuan: Mengintegrasikan seluruh pemahaman 120 menit, merumuskan resolusi aksi pedagogis nyata,
            dan menerbitkan Kartu Komitmen Guru Numerasi SMP.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
          {onOpenEvaluationDashboard && (
            <button
              onClick={onOpenEvaluationDashboard}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
            >
              <BarChart3 className="w-5 h-5 text-amber-300" />
              <span>Dashboard Evaluasi</span>
            </button>
          )}

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Refleksi</span>
          </button>

          <button
            onClick={onOpenExportCenter}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-extrabold cursor-pointer transition-all active:scale-95"
          >
            <Printer className="w-5 h-5 text-[#19304E]" />
            <span>Cetak Kartu</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs sm:text-sm font-extrabold flex items-center gap-2.5 animate-in fade-in duration-150 shadow-sm">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Refleksi dan Ikrar Komitmen berhasil disimpan di memori lokal PID!</span>
        </div>
      )}

      {/* Main Grid: 4 Reflection Questions (7 cols) + Digital Commitment Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 4 Reflection Questions Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              4 PERTANYAAN REFLEKSI MENDALAM GURU
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-0.5">
              Refleksi Praktik Pembelajaran
            </h2>
          </div>

          {/* Identity inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-[#EFF5F8] p-5 rounded-3xl border-2 border-[#B8D5E5] text-xs sm:text-sm">
            <div>
              <label className="font-extrabold text-slate-800 block mb-1">Nama Lengkap Guru</label>
              <input
                type="text"
                value={reflectionData.participantName}
                onChange={(e) => handleFieldChange('participantName', e.target.value)}
                placeholder="Nama & Gelar..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B]"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-800 block mb-1">Asal Sekolah SMP</label>
              <input
                type="text"
                value={reflectionData.schoolName}
                onChange={(e) => handleFieldChange('schoolName', e.target.value)}
                placeholder="Contoh: SMPN 1..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B]"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-800 block mb-1">Mata Pelajaran</label>
              <input
                type="text"
                value={reflectionData.subjectTaught}
                onChange={(e) => handleFieldChange('subjectTaught', e.target.value)}
                placeholder="Contoh: IPA / Bahasa..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B]"
              />
            </div>
          </div>

          {/* 4 Questions */}
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                1. Apa hal paling penting yang saya pelajari dari workshop ini?
              </label>
              <textarea
                rows={3}
                value={reflectionData.mostImportantLearning}
                onChange={(e) => handleFieldChange('mostImportantLearning', e.target.value)}
                placeholder="Tuliskan wawasan baru yang paling berkesan..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            {/* Question 2 */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                2. Bagaimana perubahan pemahaman saya tentang hakikat numerasi?
              </label>
              <textarea
                rows={3}
                value={reflectionData.understandingShift}
                onChange={(e) => handleFieldChange('understandingShift', e.target.value)}
                placeholder="Dulu saya mengira numerasi adalah ..., sekarang saya paham bahwa ..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            {/* Question 3 */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                3. Aktivitas numerasi konkret apa yang akan saya terapkan di kelas saya minggu depan?
              </label>
              <textarea
                rows={3}
                value={reflectionData.classroomApplication}
                onChange={(e) => handleFieldChange('classroomApplication', e.target.value)}
                placeholder="Rencana tindakan praktis pada bab terdekat..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>

            {/* Question 4 */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2.5">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-snug">
                4. Apa tantangan yang mungkin saya hadapi dan bagaimana strategi saya mengatasinya?
              </label>
              <textarea
                rows={3}
                value={reflectionData.potentialChallenges}
                onChange={(e) => handleFieldChange('potentialChallenges', e.target.value)}
                placeholder="Tantangan respon siswa, alokasi waktu, atau ketersediaan data..."
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Digital Commitment Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-[#19304E] via-[#1D3B61] to-[#0F2036] text-white p-7 sm:p-8 rounded-3xl border-2 border-[#E6A637]/50 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E6A637] text-[#19304E] flex items-center justify-center font-bold font-heading text-base">
                  NL
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#E6A637] block">
                    KARTU KOMITMEN DIGITAL GURU
                  </span>
                  <span className="font-heading font-extrabold text-base text-white">
                    NUMERACY LAB SMP
                  </span>
                </div>
              </div>

              <span className="text-xs bg-white/15 px-3 py-1 rounded-lg font-mono font-bold text-slate-200">
                120 MENIT
              </span>
            </div>

            {/* Pledge Builder */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-extrabold text-amber-200 block">
                Ikrar Komitmen Guru Menuju Ruang Kelas:
              </label>
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border-2 border-white/20">
                <span className="text-xs sm:text-sm text-[#E6A637] font-bold block mb-1.5">
                  "Mulai pembelajaran berikutnya, saya akan mencoba ..."
                </span>
                <textarea
                  rows={4}
                  value={reflectionData.commitmentPledge}
                  onChange={(e) => handleFieldChange('commitmentPledge', e.target.value)}
                  placeholder="Ketikkan ikrar komitmen Anda di sini..."
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none resize-none leading-relaxed italic font-medium"
                />
              </div>
            </div>

            {/* Sign-off Information */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm text-slate-300">
              <div>
                <strong className="text-white block text-sm sm:text-base font-bold">{reflectionData.participantName}</strong>
                <span className="text-slate-300 font-medium">{reflectionData.schoolName} · {reflectionData.subjectTaught}</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#E6A637]">{reflectionData.dateCompleted}</span>
            </div>

            {/* Commitment Pledge Badge */}
            <div className="p-4 bg-[#0B1728] rounded-2xl border border-white/15 flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
              <Sparkles className="w-5 h-5 text-[#E6A637] shrink-0" />
              <span>Komitmen ini menjadi langkah awal menyalakan nalar numerasi murid-murid SMP!</span>
            </div>
          </div>

          {/* Big Finish Workshop Trigger Button */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3.5 text-center">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#19304E]">
              Selesaikan Sesi Workshop 120 Menit
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Pastikan seluruh 9 modul telah Anda eksplorasi bersama rekan guru dan fasilitator di layar PID.
            </p>
            <button
              onClick={handleFinishWorkshop}
              className="w-full py-5 px-6 bg-gradient-to-r from-[#E6A637] via-[#f0b54f] to-[#e6a637] hover:from-[#d99827] hover:to-[#e6a637] text-[#19304E] font-heading font-extrabold text-base sm:text-lg rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95"
            >
              🎉 SELESAI WORKSHOP PENGUATAN NUMERASI
            </button>
          </div>
        </div>
      </div>

      {/* Finished Celebration Modal */}
      {showFinishedCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 max-w-xl w-full p-8 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00848B]">
                SELAMAT ATAS DEDIKASI ANDA!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
                Workshop 120 Menit Berhasil Diselesaikan
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed font-medium">
                Terima kasih atas partisipasi aktif Bapak/Ibu guru dalam <strong>NUMERACY LAB SMP</strong>.
                Seluruh karya berupa rancangan LKPD, hasil brainstorming, nilai asesmen rubrik, dan kartu komitmen Anda
                telah tersimpan rapi dan siap dicetak/diunduh.
              </p>
            </div>

            <div className="p-5 bg-[#EFF5F8] rounded-2xl border-2 border-[#B8D5E5] text-xs sm:text-sm text-slate-800">
              <strong className="text-[#19304E] block mb-1 font-extrabold">Ikrar Komitmen Anda:</strong>
              <p className="italic font-bold">"{reflectionData.commitmentPledge}"</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              {onOpenEvaluationDashboard && (
                <button
                  onClick={() => {
                    setShowFinishedCelebration(false);
                    onOpenEvaluationDashboard();
                  }}
                  className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-amber-300" />
                  <span>Buka Dashboard Evaluasi</span>
                </button>
              )}
              <button
                onClick={onOpenExportCenter}
                className="w-full sm:w-auto px-6 py-4 bg-[#00848B] hover:bg-[#009da5] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
              >
                Cetak & Unduh Dokumen Lengkap
              </button>
              <button
                onClick={() => setShowFinishedCelebration(false)}
                className="w-full sm:w-auto px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl cursor-pointer transition-all border border-slate-300"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onPrev}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer border border-slate-300 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Modul 08</span>
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
            <span>{isCompleted ? 'Modul 09 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onOpenExportCenter}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-5 h-5" />
            <span>Pusat Ekspor & Cetak Berkas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
