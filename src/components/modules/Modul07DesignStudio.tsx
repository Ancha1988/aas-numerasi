import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Save, Printer, Eye, Plus, Trash2, Sparkles, FileText, Check } from 'lucide-react';
import { LessonDesign, ActivityStep, CognitiveProcess } from '../../types';
import { Storage } from '../../utils/storage';
import { INITIAL_LESSON_DESIGN, SAMPLE_PEER_GROUPS } from '../../data/workshopData';

interface Modul07DesignStudioProps {
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  lessonDesign: LessonDesign;
  onUpdateDesign: (design: LessonDesign) => void;
  onOpenExportCenter: () => void;
}

export const Modul07DesignStudio: React.FC<Modul07DesignStudioProps> = ({
  onPrev,
  onNext,
  isCompleted,
  onToggleComplete,
  lessonDesign,
  onUpdateDesign,
  onOpenExportCenter,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // New activity form inline
  const [newActTitle, setNewActTitle] = useState<string>('');
  const [newActDesc, setNewActDesc] = useState<string>('');
  const [newActTime, setNewActTime] = useState<string>('20 Menit');
  const [newActLevel, setNewActLevel] = useState<CognitiveProcess>('Menerapkan');
  const [newActAction, setNewActAction] = useState<string>('');
  const [isAddingActivity, setIsAddingActivity] = useState<boolean>(false);

  // Math content helper checkbox options
  const MATH_CONTENT_OPTIONS = [
    'Bilangan bulat & pecahan',
    'Persentase & proporsi rasio',
    'Penyajian data diagram batang/lingkaran',
    'Grafik garis tren waktu',
    'Geometri & pengukuran skala',
    'Estimasi biaya & aritmetika sosial',
    'Peluang & ketidakpastian',
    'Aljabar substitusi rumus',
  ];

  const handleFieldChange = (field: keyof LessonDesign, value: any) => {
    const updated = {
      ...lessonDesign,
      [field]: value,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    onUpdateDesign(updated);
    Storage.setLessonDesign(updated);
  };

  const handleToggleMathContent = (content: string) => {
    const current = lessonDesign.mathContent || [];
    const next = current.includes(content)
      ? current.filter((c) => c !== content)
      : [...current, content];
    handleFieldChange('mathContent', next);
  };

  const handleAddActivityStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const newStep: ActivityStep = {
      id: `act-${Date.now()}`,
      title: newActTitle.trim(),
      description: newActDesc.trim() || 'Aktivitas eksplorasi data kontekstual.',
      timeAllocation: newActTime.trim() || '20 Menit',
      cognitiveProcess: newActLevel,
      studentAction: newActAction.trim() || 'Siswa menganalisis angka dan merumuskan kesimpulan.',
    };

    const updatedActivities = [...(lessonDesign.studentActivities || []), newStep];
    handleFieldChange('studentActivities', updatedActivities);

    setNewActTitle('');
    setNewActDesc('');
    setNewActAction('');
    setIsAddingActivity(false);
  };

  const handleDeleteActivityStep = (id: string) => {
    const updated = (lessonDesign.studentActivities || []).filter((a) => a.id !== id);
    handleFieldChange('studentActivities', updated);
  };

  const handleLoadTemplate = (templateIndex: number) => {
    const template = SAMPLE_PEER_GROUPS[templateIndex] || INITIAL_LESSON_DESIGN;
    const cloned = { ...template, id: `desain-${Date.now()}` };
    onUpdateDesign(cloned);
    Storage.setLessonDesign(cloned);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSaveDraft = () => {
    Storage.setLessonDesign(lessonDesign);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00848B]">
            <Sparkles className="w-4 h-4 text-[#E6A637]" />
            MODUL 07 · THE DESIGN STUDIO (FITUR UTAMA)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
            Worksheet Builder: Merancang Pembelajaran Berbasis Numerasi
          </h1>
          <p className="text-xs sm:text-base text-slate-700 mt-1 max-w-2xl leading-relaxed">
            Tujuan: Menyusun Lembar Kerja Pembelajaran Penguatan Numerasi terstandar kurikulum dengan 11 komponen esensial.
            Tersimpan otomatis di memori lokal PID dan siap dicetak/diekspor ke PDF.
          </p>
        </div>

        {/* Action Controls - Extra Large Touch Targets */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 ${
              isPreviewMode
                ? 'bg-[#19304E] text-white shadow-md'
                : 'border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
            }`}
          >
            <Eye className="w-5 h-5 text-[#00848B]" />
            <span>{isPreviewMode ? 'Kembali ke Formulir' : 'Pratinjau Dokumen'}</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Rancangan</span>
          </button>

          <button
            onClick={onOpenExportCenter}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#E6A637] hover:bg-[#efb24a] text-[#19304E] text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Printer className="w-5 h-5" />
            <span>Cetak / Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {saveToast && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs sm:text-sm font-extrabold flex items-center gap-2.5 animate-in fade-in duration-150 shadow-sm">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Rancangan berhasil disimpan ke memori lokal peramban. Data aman saat berpindah modul!</span>
        </div>
      )}

      {/* Template Quick Loader Bar */}
      <div className="bg-[#EFF5F8] p-4 sm:p-5 rounded-3xl border-2 border-[#B8D5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-slate-800">
          <FileText className="w-5 h-5 text-[#00848B]" />
          <span className="font-extrabold text-[#19304E]">Muat Template Contoh SMP:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleLoadTemplate(0)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 hover:border-[#00848B] text-slate-800 text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-xs"
          >
            IPA: Audit Air Sekolah
          </button>
          <button
            onClick={() => handleLoadTemplate(1)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 hover:border-[#00848B] text-slate-800 text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-xs"
          >
            Bhs Indonesia: Persuasi Sampah
          </button>
          <button
            onClick={() => handleLoadTemplate(2)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 hover:border-[#00848B] text-slate-800 text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-xs"
          >
            IPS: Dinamika Penduduk
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Worksheet Builder Form (11 Components) */}
      {!isPreviewMode ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
              FORMULIR 11 KOMPONEN RANCANGAN PEMBELAJARAN NUMERASI
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#19304E] font-heading mt-1">
              Desain Pembelajaran Kelompok Guru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sentuh dan isi kolom formulir di bawah ini. Anda dapat menambahkan tahapan aktivitas siswa secara dinamis.
            </p>
          </div>

          <div className="space-y-6">
            {/* Identity Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  Nama Kelompok / Tim Guru
                </label>
                <input
                  type="text"
                  value={lessonDesign.groupName}
                  onChange={(e) => handleFieldChange('groupName', e.target.value)}
                  placeholder="Contoh: Kelompok 1 (Sains Berdaya)"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  1. Nama Mata Pelajaran
                </label>
                <input
                  type="text"
                  value={lessonDesign.subject}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  placeholder="Contoh: Ilmu Pengetahuan Alam (IPA)"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  2. Sasaran Kelas Jenjang SMP
                </label>
                <select
                  value={lessonDesign.gradeLevel}
                  onChange={(e) => handleFieldChange('gradeLevel', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                >
                  <option value="Kelas VII SMP">Kelas VII SMP (Fase D)</option>
                  <option value="Kelas VIII SMP">Kelas VIII SMP (Fase D)</option>
                  <option value="Kelas IX SMP">Kelas IX SMP (Fase D)</option>
                </select>
              </div>
            </div>

            {/* 3. Materi & 4. Tujuan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  3. Materi / Topik Pembelajaran
                </label>
                <input
                  type="text"
                  value={lessonDesign.topic}
                  onChange={(e) => handleFieldChange('topic', e.target.value)}
                  placeholder="Contoh: Audit Penggunaan Air & Konservasi Sekolah"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  4. Tujuan Pembelajaran (Fokus Numerasi)
                </label>
                <textarea
                  rows={2}
                  value={lessonDesign.learningGoal}
                  onChange={(e) => handleFieldChange('learningGoal', e.target.value)}
                  placeholder="Peserta didik mampu menganalisis pola data konsumsi air melalui tabel dan merumuskan solusi efisiensi..."
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Konteks & 6. Data Stimulus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  5. Konteks Permasalahan Nyata (Dunia Siswa)
                </label>
                <textarea
                  rows={3}
                  value={lessonDesign.realContext}
                  onChange={(e) => handleFieldChange('realContext', e.target.value)}
                  placeholder="Jelaskan situasi riil: tagihan air sekolah membengkak, sampah plastik berserakan, denyut nadi setelah lari..."
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  6. Data atau Informasi Stimulus yang Digunakan
                </label>
                <textarea
                  rows={3}
                  value={lessonDesign.dataStimulus}
                  onChange={(e) => handleFieldChange('dataStimulus', e.target.value)}
                  placeholder="Tuliskan data angka/tabel yang disediakan: 500 liter air terbagi toilet 200L, wastafel 120L, kebun 100L..."
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* 7. Konten Matematika & 9. Proses Kognitif */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-7 rounded-3xl bg-[#EFF5F8] border-2 border-[#B8D5E5]">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-[#19304E] block mb-2.5">
                  7. Konten Matematika yang Dilibatkan (Pilih yang Sesuai)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  {MATH_CONTENT_OPTIONS.map((opt) => {
                    const isChecked = (lessonDesign.mathContent || []).includes(opt);
                    return (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-white border-[#00848B] text-[#19304E] font-extrabold shadow-xs'
                            : 'bg-white/70 border-slate-300 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleMathContent(opt)}
                          className="w-5 h-5 text-[#00848B] rounded-lg focus:ring-0 cursor-pointer shrink-0"
                        />
                        <span className="leading-tight">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-[#19304E] block mb-2.5">
                  9. Proses Kognitif Utama yang Dikembangkan
                </label>
                <div className="space-y-2.5">
                  {(['Memahami', 'Menerapkan', 'Menalar'] as CognitiveProcess[]).map((proc) => {
                    const isSelected = lessonDesign.cognitiveProcess === proc;
                    return (
                      <button
                        key={proc}
                        type="button"
                        onClick={() => handleFieldChange('cognitiveProcess', proc)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#19304E] text-white border-[#19304E] shadow-md font-extrabold scale-[1.01]'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 font-bold'
                        }`}
                      >
                        <div>
                          <span className="text-sm sm:text-base block">{proc}</span>
                          <span className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                            {proc === 'Memahami'
                              ? 'Level 1: Mengenali informasi eksplisit dan fakta matematis'
                              : proc === 'Menerapkan'
                              ? 'Level 2: Menggunakan konsep dan algoritma untuk menghitung solusi'
                              : 'Level 3: Menganalisis, mengevaluasi, dan merumuskan keputusan strategis'}
                          </span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#E6A637] stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 8. Aktivitas Numerasi Siswa */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#00848B]">
                    8. ALUR AKTIVITAS NUMERASI SISWA
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#19304E]">
                    Tahapan Belajar Siswa di Kelas ({lessonDesign.studentActivities?.length || 0} Langkah)
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddingActivity(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah Aktivitas Baru</span>
                </button>
              </div>

              {/* Activity List */}
              <div className="space-y-3.5">
                {(lessonDesign.studentActivities || []).map((act, idx) => (
                  <div
                    key={act.id}
                    className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs sm:text-sm space-y-2 relative group hover:border-[#00848B] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#19304E] text-white flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <strong className="text-slate-900 text-sm sm:text-base font-extrabold">{act.title}</strong>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-white border border-slate-300 text-slate-700">
                          {act.timeAllocation}
                        </span>
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-950 border border-amber-300">
                          {act.cognitiveProcess}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteActivityStep(act.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus aktivitas"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-slate-700 leading-relaxed pl-9 font-normal">{act.description}</p>
                    <div className="pl-9 pt-1 text-slate-900 font-semibold">
                      <strong>Tindakan Konkret Siswa:</strong> {act.studentAction}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Activity Form Inline */}
              {isAddingActivity && (
                <form
                  onSubmit={handleAddActivityStep}
                  className="p-6 rounded-3xl bg-teal-50 border-2 border-teal-300 space-y-4 text-xs sm:text-sm animate-in slide-in-from-top-2 duration-150 shadow-sm"
                >
                  <h4 className="font-extrabold text-[#00848B] text-sm uppercase tracking-wide">
                    Formulir Tambah Langkah Aktivitas Siswa
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="font-extrabold text-slate-800 block mb-1">Judul Aktivitas</label>
                      <input
                        type="text"
                        required
                        value={newActTitle}
                        onChange={(e) => setNewActTitle(e.target.value)}
                        placeholder="Contoh: Mengukur Laju Tetesan Kran Bocor"
                        className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Alokasi Waktu</label>
                      <input
                        type="text"
                        value={newActTime}
                        onChange={(e) => setNewActTime(e.target.value)}
                        placeholder="Contoh: 25 Menit"
                        className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="font-extrabold text-slate-800 block mb-1">Level Kognitif</label>
                      <select
                        value={newActLevel}
                        onChange={(e) => setNewActLevel(e.target.value as CognitiveProcess)}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00848B] focus:outline-none font-semibold"
                      >
                        <option value="Memahami">Memahami (Knowing)</option>
                        <option value="Menerapkan">Menerapkan (Applying)</option>
                        <option value="Menalar">Menalar (Reasoning)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-extrabold text-slate-800 block mb-1">Tindakan Konkret Siswa</label>
                      <input
                        type="text"
                        value={newActAction}
                        onChange={(e) => setNewActAction(e.target.value)}
                        placeholder="Contoh: Mengalikan tetesan air per menit ke estimasi jam dan rupiah..."
                        className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-extrabold text-slate-800 block mb-1">Deskripsi Kegiatan Siswa</label>
                    <textarea
                      rows={2}
                      value={newActDesc}
                      onChange={(e) => setNewActDesc(e.target.value)}
                      placeholder="Jelaskan instruksi yang akan diberikan guru kepada kelompok siswa..."
                      className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00848B] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingActivity(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#00848B] text-white font-extrabold shadow cursor-pointer active:scale-95"
                    >
                      Simpan Aktivitas
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 10. Produk Belajar & 11. Asesmen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  10. Produk Belajar Siswa (Karya yang Dihasilkan)
                </label>
                <textarea
                  rows={3}
                  value={lessonDesign.studentProduct}
                  onChange={(e) => handleFieldChange('studentProduct', e.target.value)}
                  placeholder="Contoh: Poster infografik kampanye hemat air sekolah lengkap dengan kalkulasi rupiah yang dihemat..."
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-extrabold text-slate-900 block mb-1">
                  11. Asesmen Numerasi (Bentuk & Instrumen)
                </label>
                <textarea
                  rows={3}
                  value={lessonDesign.assessmentStrategy}
                  onChange={(e) => handleFieldChange('assessmentStrategy', e.target.value)}
                  placeholder="Contoh: Rubrik penilaian kinerja penyajian grafik dan tes formatif 3 butir soal pemecahan masalah numerasi..."
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#00848B] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Clean Document Layout Preview */
        <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto">
          {/* Document Header */}
          <div className="border-b-2 border-[#19304E] pb-5 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00848B]">
              FORMAT RESMI RANCANGAN PEMBELAJARAN PENGUATAN NUMERASI SMP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19304E] font-heading mt-1">
              {lessonDesign.topic || 'Rancangan Pembelajaran Numerasi'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Disusun oleh: {lessonDesign.groupName} · Terakhir diperbarui: {lessonDesign.lastUpdated}
            </p>
          </div>

          {/* Identity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#EFF5F8] p-5 rounded-2xl border-2 border-[#B8D5E5] text-xs sm:text-sm">
            <div>
              <span className="text-slate-600 block font-semibold">Mata Pelajaran:</span>
              <strong className="text-slate-900 text-sm sm:text-base">{lessonDesign.subject}</strong>
            </div>
            <div>
              <span className="text-slate-600 block font-semibold">Sasaran:</span>
              <strong className="text-slate-900 text-sm sm:text-base">{lessonDesign.gradeLevel}</strong>
            </div>
            <div>
              <span className="text-slate-600 block font-semibold">Proses Kognitif Utama:</span>
              <strong className="text-[#00848B] text-sm sm:text-base font-extrabold">{lessonDesign.cognitiveProcess}</strong>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50">
              <strong className="text-[#19304E] block mb-1 text-sm sm:text-base font-extrabold">Tujuan Pembelajaran:</strong>
              <p className="text-slate-800 leading-relaxed font-medium">{lessonDesign.learningGoal}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 border-slate-200">
                <strong className="text-[#19304E] block mb-1 font-bold">Konteks Masalah Nyata:</strong>
                <p className="text-slate-800 leading-relaxed">{lessonDesign.realContext}</p>
              </div>
              <div className="p-5 rounded-2xl border-2 border-slate-200">
                <strong className="text-[#19304E] block mb-1 font-bold">Data / Informasi Stimulus:</strong>
                <p className="text-slate-800 leading-relaxed">{lessonDesign.dataStimulus}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50">
              <strong className="text-[#19304E] block mb-2 font-bold">Konten Matematika yang Dilibatkan:</strong>
              <div className="flex flex-wrap gap-2">
                {(lessonDesign.mathContent || []).map((c, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-teal-50 border border-teal-300 text-[#00848B] font-extrabold text-xs sm:text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-[#19304E] block mb-2 font-extrabold text-sm sm:text-base">Alur Aktivitas Siswa:</strong>
              <div className="space-y-2.5">
                {(lessonDesign.studentActivities || []).map((act, i) => (
                  <div key={act.id} className="p-4 rounded-xl border-2 border-slate-200 bg-white">
                    <div className="flex justify-between font-extrabold text-slate-900">
                      <span>{i + 1}. {act.title} ({act.timeAllocation})</span>
                      <span className="text-[#00848B]">Level: {act.cognitiveProcess}</span>
                    </div>
                    <p className="text-slate-700 mt-1">{act.description}</p>
                    <p className="text-slate-900 mt-1"><strong>Tindakan Siswa:</strong> {act.studentAction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 border-slate-200">
                <strong className="text-[#19304E] block mb-1 font-bold">Produk Belajar Siswa:</strong>
                <p className="text-slate-800">{lessonDesign.studentProduct}</p>
              </div>
              <div className="p-5 rounded-2xl border-2 border-slate-200">
                <strong className="text-[#19304E] block mb-1 font-bold">Strategi Asesmen Numerasi:</strong>
                <p className="text-slate-800">{lessonDesign.assessmentStrategy}</p>
              </div>
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
          <span>Kembali ke Modul 06</span>
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
            <span>{isCompleted ? 'Modul 07 Selesai ✓' : 'Tandai Selesai'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#19304E] hover:bg-[#244369] text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Modul 08: Presentation & Rubrik</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
