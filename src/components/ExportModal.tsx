import React, { useState } from 'react';
import { X, Printer, Download, FileText, CheckCircle2, Copy, Sparkles, MessageSquare, Award, BarChart3 } from 'lucide-react';
import { LessonDesign, BrainstormNote, RubricScore, ReflectionData } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonDesign: LessonDesign;
  brainstormNotes: BrainstormNote[];
  rubricScore: RubricScore;
  reflectionData: ReflectionData;
  onOpenEvaluationDashboard?: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  lessonDesign,
  brainstormNotes,
  rubricScore,
  reflectionData,
  onOpenEvaluationDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'brainstorm' | 'rubric' | 'reflection'>('worksheet');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const fullData = {
      workshop: 'NUMERACY LAB SMP - Workshop Penguatan Numerasi',
      exportTimestamp: new Date().toISOString(),
      lessonDesign,
      brainstormNotes,
      rubricScore,
      reflectionData,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NumeracyLab_SMP_Artifacts_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    let content = '';
    if (activeTab === 'worksheet') {
      content = `RANCANGAN PEMBELAJARAN PENGUATAN NUMERASI SMP\n` +
        `Kelompok: ${lessonDesign.groupName}\n` +
        `Mata Pelajaran: ${lessonDesign.subject} (${lessonDesign.gradeLevel})\n` +
        `Topik: ${lessonDesign.topic}\n` +
        `Tujuan: ${lessonDesign.learningGoal}\n` +
        `Konteks Nyata: ${lessonDesign.realContext}\n` +
        `Stimulus Data: ${lessonDesign.dataStimulus}\n` +
        `Konten Matematika: ${lessonDesign.mathContent.join(', ')}\n` +
        `Proses Kognitif Dominan: ${lessonDesign.cognitiveProcess}\n` +
        `Produk Siswa: ${lessonDesign.studentProduct}\n` +
        `Strategi Asesmen: ${lessonDesign.assessmentStrategy}\n\n` +
        `TAHAPAN AKTIVITAS SISWA:\n` +
        lessonDesign.studentActivities.map((a, i) => `${i + 1}. [${a.cognitiveProcess}] ${a.title} (${a.timeAllocation})\n   - ${a.description}\n   - Tindakan Siswa: ${a.studentAction}`).join('\n\n');
    } else if (activeTab === 'brainstorm') {
      content = `HASIL BRAINSTORMING NUMERASI GURU SMP:\n` +
        brainstormNotes.map((n, i) => `${i + 1}. [${n.author} - ${n.subject}] (Sikap: ${n.stance})\n   Gagasan: "${n.content}"\n`).join('\n');
    } else if (activeTab === 'rubric') {
      content = `PENILAIAN RUBRIK RANCANGAN PEMBELAJARAN:\n` +
        `Penilai: ${rubricScore.evaluatorGroup}\n` +
        `1. Relevansi Tujuan: ${rubricScore.relevance}/4\n` +
        `2. Kualitas Konteks: ${rubricScore.contextQuality}/4\n` +
        `3. Integrasi Matematika: ${rubricScore.mathIntegration}/4\n` +
        `4. Pengembangan Penalaran: ${rubricScore.reasoningDev}/4\n` +
        `5. Kualitas Asesmen: ${rubricScore.assessmentQuality}/4\n` +
        `Total Skor: ${rubricScore.relevance + rubricScore.contextQuality + rubricScore.mathIntegration + rubricScore.reasoningDev + rubricScore.assessmentQuality} / 20\n` +
        `Apresiasi: ${rubricScore.appreciation}\n` +
        `Saran: ${rubricScore.recommendations}\n`;
    } else {
      content = `REFLEKSI & KARTU KOMITMEN GURU NUMERASI SMP:\n` +
        `Nama Guru: ${reflectionData.participantName}\n` +
        `Sekolah: ${reflectionData.schoolName} (${reflectionData.subjectTaught})\n\n` +
        `1. Hal Paling Penting: ${reflectionData.mostImportantLearning}\n` +
        `2. Perubahan Pemahaman: ${reflectionData.understandingShift}\n` +
        `3. Penerapan di Kelas: ${reflectionData.classroomApplication}\n` +
        `4. Tantangan & Solusi: ${reflectionData.potentialChallenges}\n\n` +
        `KOMITMEN SAYA: "${reflectionData.commitmentPledge}"\n`;
    }

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalRubricScore =
    rubricScore.relevance +
    rubricScore.contextQuality +
    rubricScore.mathIntegration +
    rubricScore.reasoningDev +
    rubricScore.assessmentQuality;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#19304E] text-white p-5 flex items-center justify-between border-b border-[#244369]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00848B] text-white">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6A637]">
                EXPORT & PRINT CENTER
              </span>
              <h2 className="text-lg font-bold text-white font-heading">
                Unduh & Cetak Berkas Hasil Workshop Numerasi
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#244369] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector - Enlarged Touch Targets */}
        <div className="bg-slate-50 border-b-2 border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('worksheet')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'worksheet'
                  ? 'bg-[#19304E] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              1. Lembar Kerja LKPD
            </button>
            <button
              onClick={() => setActiveTab('brainstorm')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'brainstorm'
                  ? 'bg-[#19304E] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              2. Hasil Brainstorming
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'rubric'
                  ? 'bg-[#19304E] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              3. Skor Rubrik
            </button>
            <button
              onClick={() => setActiveTab('reflection')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'reflection'
                  ? 'bg-[#19304E] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              4. Refleksi & Komitmen
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenEvaluationDashboard && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEvaluationDashboard();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
              >
                <BarChart3 className="w-4 h-4 text-amber-300" />
                <span>Dashboard Evaluasi</span>
              </button>
            )}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer transition-colors"
              title="Unduh seluruh data workshop dalam format JSON"
            >
              <Download className="w-4 h-4 text-[#00848B]" />
              <span>Unduh JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00848B] hover:bg-[#009da5] text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Cetak PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
          <div className="bg-white p-8 rounded-xl shadow border border-slate-200 max-w-3xl mx-auto text-slate-800 printable-document">
            {activeTab === 'worksheet' && (
              <div className="space-y-6">
                {/* Document Header */}
                <div className="border-b-2 border-[#19304E] pb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#00848B]">
                    KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
                  </span>
                  <h1 className="text-xl font-bold text-[#19304E] mt-1 font-heading">
                    LEMBAR KERJA PERANCANGAN PEMBELAJARAN PENGUATAN NUMERASI SMP
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    NUMERACY LAB SMP · Workshop Fasilitasi 120 Menit Berbasis PID
                  </p>
                </div>

                {/* Identity Table */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-[#EFF5F8] p-4 rounded-lg border border-[#B8D5E5]">
                  <div>
                    <span className="text-slate-500 block">Nama Kelompok / Guru:</span>
                    <strong className="text-slate-900 text-sm">{lessonDesign.groupName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Mata Pelajaran & Kelas:</span>
                    <strong className="text-slate-900 text-sm">{lessonDesign.subject} ({lessonDesign.gradeLevel})</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Topik Pembelajaran:</span>
                    <strong className="text-[#19304E] text-sm">{lessonDesign.topic}</strong>
                  </div>
                </div>

                {/* Core Curriculum Alignment */}
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">1. Tujuan Pembelajaran (Numerasi):</span>
                    <p className="text-slate-700 leading-relaxed">{lessonDesign.learningGoal}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-[#19304E] block mb-1">2. Konteks Permasalahan Nyata:</span>
                      <p className="text-slate-700 leading-relaxed">{lessonDesign.realContext}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-[#19304E] block mb-1">3. Data / Informasi yang Digunakan:</span>
                      <p className="text-slate-700 leading-relaxed">{lessonDesign.dataStimulus}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-[#19304E] block mb-1">4. Konten Matematika yang Dilibatkan:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lessonDesign.mathContent.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-teal-50 text-[#00848B] border border-teal-200 text-[11px] font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-[#19304E] block mb-1">5. Proses Kognitif Dominan:</span>
                      <span className="inline-block px-2.5 py-1 rounded bg-[#E6A637]/20 text-[#19304E] font-bold text-xs border border-[#E6A637]/40">
                        {lessonDesign.cognitiveProcess}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Student Activities */}
                <div>
                  <h3 className="font-bold text-sm text-[#19304E] border-b pb-2 mb-3">
                    6. Alur Aktivitas Numerasi Siswa (Terstruktur)
                  </h3>
                  <div className="space-y-3">
                    {lessonDesign.studentActivities.map((act, idx) => (
                      <div key={act.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span>{act.title}</span>
                          <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border">
                            {act.timeAllocation} · Level: {act.cognitiveProcess}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-1.5">{act.description}</p>
                        <div className="bg-white p-2 rounded border border-slate-200 text-slate-700">
                          <strong>Tindakan Siswa:</strong> {act.studentAction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product & Assessment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">7. Produk Belajar Siswa:</span>
                    <p className="text-slate-700">{lessonDesign.studentProduct}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">8. Asesmen & Umpan Balik Numerasi:</span>
                    <p className="text-slate-700">{lessonDesign.assessmentStrategy}</p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-xs text-center">
                  <div>
                    <p className="text-slate-500 mb-12">Ketua Kelompok Guru,</p>
                    <p className="font-bold text-slate-900 border-t border-slate-300 pt-1 inline-block px-8">
                      {lessonDesign.groupName}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-12">Fasilitator Penguatan Numerasi,</p>
                    <p className="font-bold text-slate-900 border-t border-slate-300 pt-1 inline-block px-8">
                      Tim Pengembang Numerasi SMP
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'brainstorm' && (
              <div className="space-y-6">
                <div className="border-b-2 border-[#19304E] pb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#00848B]">
                    DOKUMEN CURAH GAGASAN PESERTA
                  </span>
                  <h1 className="text-xl font-bold text-[#19304E] mt-1 font-heading">
                    HASIL BRAINSTORMING: NUMERASI ITU URUSAN SIAPA?
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Kompilasi Sticky Notes Digital Guru SMP Peserta Workshop
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brainstormNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
                      style={{ backgroundColor: note.color || '#F8FAFC' }}
                    >
                      <p className="text-xs text-slate-800 italic leading-relaxed mb-3">
                        "{note.content}"
                      </p>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-300/40 text-slate-600">
                        <strong className="text-[#19304E]">{note.author}</strong>
                        <span>Mapel: {note.subject}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rubric' && (
              <div className="space-y-6">
                <div className="border-b-2 border-[#19304E] pb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#00848B]">
                    LEMBAR EVALUASI DAN PENILAIAN RUBRIK
                  </span>
                  <h1 className="text-xl font-bold text-[#19304E] mt-1 font-heading">
                    HASIL ASESMEN RANCANGAN PEMBELAJARAN
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Penilai: {rubricScore.evaluatorGroup} · Total Skor: {totalRubricScore} / 20 ({Math.round((totalRubricScore / 20) * 100)}%)
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                    <span>1. Relevansi Tujuan Pembelajaran Numerasi:</span>
                    <strong className="font-mono text-[#00848B] text-sm">{rubricScore.relevance} / 4</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                    <span>2. Kualitas Konteks Permasalahan Nyata:</span>
                    <strong className="font-mono text-[#00848B] text-sm">{rubricScore.contextQuality} / 4</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                    <span>3. Integrasi Konten Matematika yang Relevan:</span>
                    <strong className="font-mono text-[#00848B] text-sm">{rubricScore.mathIntegration} / 4</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                    <span>4. Pengembangan Proses Berpikir & Penalaran:</span>
                    <strong className="font-mono text-[#00848B] text-sm">{rubricScore.reasoningDev} / 4</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                    <span>5. Kualitas Strategi Asesmen Numerasi:</span>
                    <strong className="font-mono text-[#00848B] text-sm">{rubricScore.assessmentQuality} / 4</strong>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-900 block mb-1">Apresiasi Pengamat / Fasilitator:</strong>
                    <p className="text-emerald-800">{rubricScore.appreciation}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <strong className="text-amber-900 block mb-1">Rekomendasi Peningkatan:</strong>
                    <p className="text-amber-800">{rubricScore.recommendations}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reflection' && (
              <div className="space-y-6">
                <div className="border-b-2 border-[#19304E] pb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6A637]">
                    KARTU KOMITMEN TRANSFORMASI
                  </span>
                  <h1 className="text-xl font-bold text-[#19304E] mt-1 font-heading">
                    DARI WORKSHOP MENUJU KELAS SMP
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Guru: {reflectionData.participantName} · {reflectionData.schoolName} ({reflectionData.subjectTaught})
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">
                      1. Hal Paling Penting yang Dipelajari:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{reflectionData.mostImportantLearning}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">
                      2. Perubahan Pemahaman Tentang Numerasi:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{reflectionData.understandingShift}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">
                      3. Aktivitas Numerasi yang Siap Diterapkan:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{reflectionData.classroomApplication}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-[#19304E] block mb-1">
                      4. Tantangan yang Dihadapi & Strategi Mitigasi:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{reflectionData.potentialChallenges}</p>
                  </div>

                  {/* Highlighted Digital Commitment Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#19304E] to-[#244369] text-white shadow-lg border border-[#E6A637]/40 text-center space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6A637]">
                      IKRAR KOMITMEN GURU NUMERASI SMP
                    </span>
                    <p className="text-base font-semibold leading-relaxed text-amber-100 italic">
                      "{reflectionData.commitmentPledge}"
                    </p>
                    <div className="pt-2 text-xs text-slate-300">
                      Tertanda, <strong>{reflectionData.participantName}</strong> ({reflectionData.dateCompleted})
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Dokumen siap dicetak ke printer kertas atau disimpan sebagai PDF (Ctrl+P).
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
